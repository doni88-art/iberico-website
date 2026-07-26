import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Story } from "@/components/Story";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Locations } from "@/components/Locations";
import { Events } from "@/components/Events";
import { Careers } from "@/components/Careers";
import { Reservation } from "@/components/Reservation";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Story />
        <Menu />
        <Gallery />
        <Locations />
        <Events />
        <Careers />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
