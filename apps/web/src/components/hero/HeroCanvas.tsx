"use client";

import dynamic from "next/dynamic";

// Three.js stays out of the server bundle and the critical path.
const QueueScene = dynamic(() => import("./QueueScene"), { ssr: false });

export function HeroCanvas() {
  return <QueueScene />;
}
