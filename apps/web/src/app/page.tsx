import { Contact } from "@/components/contact/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { PageMotion } from "@/components/motion/PageMotion";
import { Projects } from "@/components/projects/Projects";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/work/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <PageMotion />
    </>
  );
}
