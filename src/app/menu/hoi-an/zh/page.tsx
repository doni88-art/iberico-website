import type { Metadata } from "next";
import { FullMenu } from "@/components/FullMenu";
import {
  HOIAN_INTRO_ZH,
  HOIAN_NOTE_ZH,
  HOIAN_PROMOS_ZH,
  HOIAN_ZH_SECTIONS,
} from "@/lib/menu-hoian";

export const metadata: Metadata = {
  title: "中文菜单 · 会安",
  description:
    "IBÉRICO Tapas y Vino 会安店中文菜单：套餐、伊比利亚火腿、巴斯克小串、西班牙小食、海鲜饭、甜点与西班牙葡萄酒。",
  alternates: { canonical: "/menu/hoi-an/zh" },
  openGraph: { locale: "zh_CN", url: "https://www.weareiberico.com/menu/hoi-an/zh" },
};

export default function MenuHoiAnZh() {
  return (
    <FullMenu
      lang="zh-Hans"
      cjk
      eyebrow="会安 · 中文菜单"
      intro={HOIAN_INTRO_ZH}
      promos={HOIAN_PROMOS_ZH}
      sections={HOIAN_ZH_SECTIONS}
      note={HOIAN_NOTE_ZH}
      labels={{
        back: "返回官网",
        reserve: "预订",
        nav: "菜单分类",
        closing: "我们带来西班牙，你带来好胃口。",
        reserveCta: "立即预订",
        disclaimer: "中文菜单为翻译版本，菜品与价格以餐厅现场英文 / 越南文菜单为准。",
      }}
    />
  );
}
