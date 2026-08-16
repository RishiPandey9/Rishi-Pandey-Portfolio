import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { TechEcosystem } from "@/components/TechEcosystem";
import { TestimonialsContact } from "@/components/TestimonialsContact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Stats />
      <Services />
      <Projects />
      <TechEcosystem />
      <TestimonialsContact />
      <Footer />
    </main>
  );
}
