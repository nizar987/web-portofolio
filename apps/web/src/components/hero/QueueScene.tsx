"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const COLORS = {
  line: 0x3a3833,
  ring: 0x55524a,
  node: 0xedeae2,
  packet: 0xff6a2b
};

const PRODUCER_COUNT = 5;
const WORKER_COUNT = 4;
const PACKET_COUNT = 42;
const QUEUE_HALF_LENGTH = 1.7;
// World-space extent (with margin) the camera keeps in view.
const SCENE_HALF_WIDTH = 6.5;
const SCENE_HALF_HEIGHT = 3.4;

// Fraction of each packet's trip spent on each leg: inbound → buffered in queue → outbound.
const INBOUND_END = 0.36;
const QUEUE_END = 0.64;
const QUEUE_SLOWDOWN = 0.45;

interface Packet {
  producer: number;
  worker: number;
  slot: number;
  t: number;
  speed: number;
}

function circlePoints(radius: number, segments: number): THREE.Vector3[] {
  return Array.from({ length: segments }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2;
    return new THREE.Vector3(0, Math.cos(angle) * radius, Math.sin(angle) * radius);
  });
}

/**
 * The hero illustration: producers on the left publish jobs into a Redis-style
 * queue, which buffers them and dispatches to a worker pool on the right.
 */
export default function QueueScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      // No WebGL: the hero still reads fine without the illustration.
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.opacity = "0";
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const rig = new THREE.Group();
    rig.rotation.set(-0.16, -0.5, 0.02);
    // The y-rotation brings the worker side closer to the camera; nudge it back into frame.
    rig.position.x = -0.6;
    scene.add(rig);

    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    const lineMaterial = track(new THREE.LineBasicMaterial({ color: COLORS.line }));
    const ringMaterial = track(new THREE.LineBasicMaterial({ color: COLORS.ring }));
    const nodeMaterial = track(new THREE.MeshBasicMaterial({ color: COLORS.node }));
    const packetMaterial = track(new THREE.MeshBasicMaterial({ color: COLORS.packet }));
    const nodeGeometry = track(new THREE.SphereGeometry(0.085, 16, 16));
    const packetGeometry = track(new THREE.SphereGeometry(0.055, 12, 12));

    const producers = Array.from(
      { length: PRODUCER_COUNT },
      (_, i) => new THREE.Vector3(-5.2, (i - (PRODUCER_COUNT - 1) / 2) * 1.05, Math.sin(i * 1.7) * 0.9)
    );
    const workers = Array.from(
      { length: WORKER_COUNT },
      (_, i) => new THREE.Vector3(5.2, (i - (WORKER_COUNT - 1) / 2) * 1.3, Math.cos(i * 1.3) * 0.9)
    );
    const queueIn = new THREE.Vector3(-QUEUE_HALF_LENGTH, 0, 0);
    const queueOut = new THREE.Vector3(QUEUE_HALF_LENGTH, 0, 0);

    const inbound = producers.map(
      (p) => new THREE.QuadraticBezierCurve3(p, new THREE.Vector3(-3.1, p.y * 0.2, p.z * 0.4), queueIn)
    );
    const outbound = workers.map(
      (w) => new THREE.QuadraticBezierCurve3(queueOut, new THREE.Vector3(3.1, w.y * 0.2, w.z * 0.4), w)
    );

    for (const curve of [...inbound, ...outbound]) {
      const geometry = track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)));
      rig.add(new THREE.Line(geometry, lineMaterial));
    }

    // Queue body: a tube of rings with two rails, reading as a buffer.
    const ringGeometry = track(new THREE.BufferGeometry().setFromPoints(circlePoints(0.62, 64)));
    const ringCount = 9;
    for (let i = 0; i < ringCount; i += 1) {
      const ring = new THREE.LineLoop(ringGeometry, ringMaterial);
      ring.position.x = -QUEUE_HALF_LENGTH + (i / (ringCount - 1)) * QUEUE_HALF_LENGTH * 2;
      rig.add(ring);
    }
    for (const angle of [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]) {
      const y = Math.cos(angle) * 0.62;
      const z = Math.sin(angle) * 0.62;
      const rail = track(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-QUEUE_HALF_LENGTH, y, z),
          new THREE.Vector3(QUEUE_HALF_LENGTH, y, z)
        ])
      );
      rig.add(new THREE.Line(rail, ringMaterial));
    }

    for (const position of producers) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(position);
      rig.add(node);
    }

    const workerNodes = workers.map((position) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(position);
      rig.add(node);
      return node;
    });
    const workerPulse = workers.map(() => 0);

    const packetMesh = new THREE.InstancedMesh(packetGeometry, packetMaterial, PACKET_COUNT);
    rig.add(packetMesh);

    let nextWorker = 0;
    const packets: Packet[] = Array.from({ length: PACKET_COUNT }, (_, i) => ({
      producer: i % PRODUCER_COUNT,
      // Round-robin dispatch keeps the worker pool evenly loaded.
      worker: i % WORKER_COUNT,
      slot: i,
      t: i / PACKET_COUNT,
      speed: 0.075 + ((i * 7) % 5) * 0.006
    }));

    const scratch = new THREE.Object3D();
    const position = new THREE.Vector3();

    const placePacket = (packet: Packet) => {
      if (packet.t < INBOUND_END) {
        inbound[packet.producer].getPoint(packet.t / INBOUND_END, position);
      } else if (packet.t < QUEUE_END) {
        const progress = (packet.t - INBOUND_END) / (QUEUE_END - INBOUND_END);
        const angle = packet.slot * 2.4;
        position.set(
          -QUEUE_HALF_LENGTH + progress * QUEUE_HALF_LENGTH * 2,
          Math.cos(angle) * 0.3,
          Math.sin(angle) * 0.3
        );
      } else {
        outbound[packet.worker].getPoint((packet.t - QUEUE_END) / (1 - QUEUE_END), position);
      }
      scratch.position.copy(position);
      scratch.updateMatrix();
      packetMesh.setMatrixAt(packet.slot, scratch.matrix);
    };

    const step = (delta: number) => {
      for (const packet of packets) {
        const inQueue = packet.t >= INBOUND_END && packet.t < QUEUE_END;
        packet.t += delta * packet.speed * (inQueue ? QUEUE_SLOWDOWN : 1);

        if (packet.t >= 1) {
          workerPulse[packet.worker] = 1;
          packet.t -= 1;
          packet.producer = (packet.producer + 2) % PRODUCER_COUNT;
          packet.worker = nextWorker;
          nextWorker = (nextWorker + 1) % WORKER_COUNT;
        }
        placePacket(packet);
      }
      packetMesh.instanceMatrix.needsUpdate = true;

      workerNodes.forEach((node, i) => {
        workerPulse[i] = Math.max(0, workerPulse[i] - delta * 2.4);
        node.scale.setScalar(1 + workerPulse[i] * 1.1);
      });
    };

    const pointer = { x: 0, y: 0 };
    const baseRotation = { x: rig.rotation.x, y: rig.rotation.y };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const aspect = width / height;
      renderer.setSize(width, height, false);
      camera.aspect = aspect;
      // Back the camera off until the whole topology fits the frame on either axis.
      const halfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const distance = Math.max(SCENE_HALF_HEIGHT / halfFov, SCENE_HALF_WIDTH / (halfFov * aspect));
      camera.position.set(0, 0.3, distance);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    step(0);
    renderer.render(scene, camera);
    animate(renderer.domElement, { opacity: [0, 1], duration: reduceMotion ? 0 : 1400, delay: reduceMotion ? 0 : 350, ease: "out(3)" });

    if (reduceMotion) {
      return () => {
        resizeObserver.disconnect();
        disposables.forEach((item) => item.dispose());
        packetMesh.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    const clock = new THREE.Clock();
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(clock.getDelta(), 0.05);
      if (!isVisible || document.hidden) return;

      step(delta);
      rig.rotation.y += (baseRotation.y + pointer.x * 0.35 - rig.rotation.y) * 0.04;
      rig.rotation.x += (baseRotation.x + pointer.y * 0.18 - rig.rotation.x) * 0.04;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      disposables.forEach((item) => item.dispose());
      packetMesh.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" ref={containerRef} />;
}
