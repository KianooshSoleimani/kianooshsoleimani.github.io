import { CareerGraph } from "@/components/CareerGraph";
import { Contact } from "@/components/Contact";
import { EducationSection } from "@/components/EducationSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Repos } from "@/components/Repos";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <CareerGraph />
        <Repos />
        <Skills />
        <EducationSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
