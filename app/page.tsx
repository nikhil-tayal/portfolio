import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SkySweep } from "@/components/SkySweep";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SelectedWork } from "@/components/SelectedWork";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-dvh">
      <SkySweep />
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <SelectedWork />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
