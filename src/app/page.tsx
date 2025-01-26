import Image from "next/image";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import Section4 from "./components/section4"
import Section5 from "./components/section5";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
};