import type { Metadata } from "next";
import { FullMenu } from "@/components/FullMenu";
import { EN_INTRO, EN_NOTE, EN_PROMOS, EN_SECTIONS } from "@/lib/menu-en";

export const metadata: Metadata = {
  title: "Full Menu · Saigon",
  description:
    "The full IBÉRICO Tapas y Vino Saigon menu: jamón ibérico, cheeses, tapas, paella, desserts, Spanish wines, cocktails and spirits — with prices.",
  alternates: { canonical: "/menu" },
};

export default function MenuEn() {
  return (
    <FullMenu
      lang="en"
      eyebrow="Saigon · Full menu"
      intro={EN_INTRO}
      promos={EN_PROMOS}
      sections={EN_SECTIONS}
      note={EN_NOTE}
      labels={{
        back: "Back to site",
        reserve: "Reserve",
        nav: "Menu categories",
        closing: "We bring Spain, you bring the appetite.",
        reserveCta: "Reserve a table",
        disclaimer: "Menu and prices may change — the in-restaurant menu is the reference.",
      }}
    />
  );
}
