import { Hero } from "@/components/hero/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Research } from "@/components/sections/research";
import { Arsenal } from "@/components/sections/arsenal";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Arsenal />
      <Projects />
      <Research />
      <Contact />
    </>
  );
}
