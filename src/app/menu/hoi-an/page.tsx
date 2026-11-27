import type { Metadata } from "next";
import { FullMenu } from "@/components/FullMenu";
import {
  HOIAN_EN_SECTIONS,
  HOIAN_INTRO_EN,
  HOIAN_NOTE_EN,
  HOIAN_PROMOS_EN,
} from "@/lib/menu-hoian";

export const metadata: Metadata = {
  title: "Full Menu · Hội An",
  description:
    "The full IBÉRICO Tapas y Vino Hội An menu: set menus, jamón ibérico, pintxos, tapas, paella, desserts, Spanish wines and cocktails — with prices.",
  alternates: { canonical: "/menu/hoi-an" },
};

export default function MenuHoiAn() {
  return (
    <FullMenu
      lang="en"
      eyebrow="Hội An · Full menu"
      intro={HOIAN_INTRO_EN}
      promos={HOIAN_PROMOS_EN}
      sections={HOIAN_EN_SECTIONS}
      note={HOIAN_NOTE_EN}
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
