import type { Metadata } from "next";
import { FullMenu } from "@/components/FullMenu";
import { ZH_INTRO, ZH_NOTE, ZH_PROMOS, ZH_SECTIONS } from "@/lib/menu-zh";

export const metadata: Metadata = {
  title: "中文菜单 · 西贡",
  description:
    "IBÉRICO Tapas y Vino 西贡店中文菜单：伊比利亚火腿、西班牙小食、海鲜饭、甜点与西班牙葡萄酒。",
  alternates: { canonical: "/menu/zh" },
  openGraph: { locale: "zh_CN", url: "https://www.weareiberico.com/menu/zh" },
};

export default function MenuZh() {
  return (
    <FullMenu
      lang="zh-Hans"
      cjk
      eyebrow="西贡 · 中文菜单"
      intro={ZH_INTRO}
      promos={ZH_PROMOS}
      sections={ZH_SECTIONS}
      note={ZH_NOTE}
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
