import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/AboutIntro";
import { BeyondWork } from "@/components/about/BeyondWork";
import { Milestones } from "@/components/about/Milestones";
import { Principles } from "@/components/about/Principles";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageMotion } from "@/components/motion/PageMotion";

export const metadata: Metadata = {
  title: "About — Muhammad Nizar Aulia",
  description:
    "Muhammad Nizar Aulia is a Technical Lead in West Java, Indonesia, building backend systems for warehousing and fulfillment since 2019."
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main">
        <AboutIntro />
        <Principles />
        <Milestones />
        <BeyondWork />
      </main>
      <Footer />
      <PageMotion />
    </>
  );
}
