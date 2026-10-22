"use client";

import { animate, createTimeline, onScroll, scrambleText, splitText, stagger, svg, utils } from "animejs";
import { useEffect } from "react";

interface Revertible {
  revert: () => unknown;
}

const EASE_OUT = "out(4)";
const FLOW_DURATION_MS = 2600;

/**
 * Page-level choreography with anime.js. Sections stay server-rendered and
 * opt in through data attributes; this component only runs when the inline
 * motion gate in layout.tsx allowed motion.
 */
export function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion-ready")) return;

    const instances: Revertible[] = [];
    const keep = <T extends Revertible>(instance: T): T => {
      instances.push(instance);
      return instance;
    };

    introHero(keep);
    revealOnScroll(keep);
    drawDiagrams(keep);
    trackTimeline(keep);
    root.classList.add("motion-live");

    return () => {
      instances.reverse().forEach((instance) => instance.revert());
    };
  }, []);

  return null;
}

type Keep = <T extends Revertible>(instance: T) => T;

function introHero(keep: Keep) {
  const title = document.querySelector<HTMLElement>("[data-hero-title]");
  const items = document.querySelectorAll<HTMLElement>("[data-hero]");
  const timeline = keep(createTimeline({ defaults: { ease: EASE_OUT, duration: 1000 } }));

  if (title) {
    const splitter = keep(splitText(title, { words: { wrap: "clip" } }));
    utils.set(title, { opacity: 1 });
    timeline.add(splitter.words, { translateY: ["110%", "0%"], delay: stagger(38) }, 80);
  }

  timeline.add(items, { opacity: [0, 1], translateY: [14, 0], duration: 900, delay: stagger(90) }, 320);

  const scramble = document.querySelectorAll<HTMLElement>("[data-scramble]");
  if (scramble.length) {
    timeline.add(scramble, { innerHTML: scrambleText({ chars: "uppercase", cursor: true }) }, 520);
  }

  document.querySelectorAll<HTMLElement>("[data-count]").forEach((element) => {
    const target = Number(element.dataset.count ?? 0);
    const suffix = element.dataset.suffix ?? "";
    const counter = { value: 0 };
    keep(
      animate(counter, {
        value: target,
        duration: 1600,
        delay: 900,
        ease: "out(3)",
        onUpdate: () => {
          element.textContent = `${Math.round(counter.value)}${suffix}`;
        }
      })
    );
  });
}

const REVEAL_LINE = 0.9;

/*
 * One-shot triggers measure live positions on every scroll frame rather than
 * using anime's onScroll, which fixes its thresholds up front — content above
 * (fonts, the hero canvas, client-rendered lists) shifts the layout afterwards
 * and left sections stuck hidden. Anything at or above the reveal line fires,
 * so elements skipped by a fast scroll or an anchor jump never stay hidden.
 */
function onceVisible(targets: Element[], onVisible: (target: Element) => void): Revertible {
  const pending = new Set(targets);
  let frame = 0;

  const check = () => {
    frame = 0;
    const line = window.innerHeight * REVEAL_LINE;
    for (const target of pending) {
      if (target.getBoundingClientRect().top < line) {
        pending.delete(target);
        onVisible(target);
      }
    }
    if (pending.size === 0) stop();
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(check);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  check();
  return { revert: stop };
}

function revealOnScroll(keep: Keep) {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  keep(
    onceVisible(elements, (element) => {
      keep(animate(element, { opacity: [0, 1], translateY: [28, 0], duration: 1000, ease: EASE_OUT }));
    })
  );

  const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-group]"));
  keep(
    onceVisible(groups, (group) => {
      keep(
        animate(group.querySelectorAll("[data-reveal-item]"), {
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 800,
          delay: stagger(70),
          ease: EASE_OUT
        })
      );
    })
  );
}

function drawDiagrams(keep: Keep) {
  const diagrams = Array.from(document.querySelectorAll<SVGSVGElement>("[data-diagram]"));

  keep(
    onceVisible(diagrams, (target) => {
      const diagram = target as SVGSVGElement;
      keep(
        animate(svg.createDrawable(diagram.querySelectorAll("[data-draw]")), {
          draw: ["0 0", "0 1"],
          duration: 1300,
          delay: stagger(35),
          ease: "inOut(3)",
          onComplete: () => startFlow(diagram, keep)
        })
      );
    })
  );
}

// Jobs travelling through the diagram once its lines have drawn in.
function startFlow(diagram: SVGSVGElement, keep: Keep) {
  diagram.querySelectorAll<SVGCircleElement>("[data-flow-dot]").forEach((dot, index) => {
    const path = dot.dataset.path ? diagram.querySelector<SVGPathElement>(`#${dot.dataset.path}`) : null;
    if (!path) return;

    keep(
      animate(dot, {
        ...svg.createMotionPath(path),
        opacity: [
          { from: 0, to: 1, duration: 260 },
          { to: 1, duration: FLOW_DURATION_MS - 520 },
          { to: 0, duration: 260 }
        ],
        duration: FLOW_DURATION_MS,
        delay: index * 650,
        loopDelay: 400,
        loop: true,
        ease: "linear"
      })
    );
  });
}

function trackTimeline(keep: Keep) {
  const timeline = document.querySelector<HTMLElement>("[data-timeline]");
  const progress = timeline?.querySelector<HTMLElement>("[data-timeline-progress]");
  if (!timeline || !progress) return;

  const observer = keep(onScroll({ target: timeline, enter: "75% top", leave: "45% bottom", sync: true }));
  keep(animate(progress, { scaleY: [0, 1], ease: "linear", autoplay: observer }));

  // This one is scroll-synced, so keep its thresholds current as the page above it reflows.
  let frame = 0;
  const resizeObserver = new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => observer.refresh());
  });
  resizeObserver.observe(document.body);
  keep({
    revert: () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    }
  });
}
