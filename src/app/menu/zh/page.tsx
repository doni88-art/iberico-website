import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import {
  ZH_INTRO,
  ZH_NOTE,
  ZH_PROMOS,
  ZH_SECTIONS,
  formatVnd,
  type ZhGroup,
} from "@/lib/menu-zh";

export const metadata: Metadata = {
  title: "中文菜单 · 西贡",
  description:
    "IBÉRICO Tapas y Vino 西贡店中文菜单：伊比利亚火腿、西班牙小食、海鲜饭、甜点与西班牙葡萄酒。",
  alternates: { canonical: "/menu/zh" },
  openGraph: { locale: "zh_CN", url: "https://www.weareiberico.com/menu/zh" },
};

// Chinese glyphs aren't in Playfair/Karla, so fall back to the system CJK stack.
const CJK =
  '"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans CJK SC","Noto Sans SC",sans-serif';

function Prices({ group, prices }: { group: ZhGroup; prices: number[] }) {
  return (
    <div className="flex shrink-0 items-baseline gap-4 text-right">
      {prices.map((p, idx) => (
        <span key={idx} className="min-w-[4.5rem] whitespace-nowrap">
          {group.columns && group.columns.length > 1 && (
            <span className="block text-[11px] leading-tight text-cream/50">
              {group.columns[idx]}
            </span>
          )}
          <span className="font-display text-base text-gold-light sm:text-lg">
            {formatVnd(p)}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function MenuZh() {
  return (
    <div lang="zh-Hans" className="bg-ink-soft text-cream" style={{ fontFamily: CJK }}>
      <header className="sticky top-0 z-30 border-b border-cream/10 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <span className="font-display tracking-[0.08em]">IBÉRICO</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/#menu" className="text-cream/70 hover:text-cream">
              返回官网
            </Link>
            <Link
              href="/#reserve"
              className="rounded-full bg-wine px-4 py-2 font-semibold hover:bg-gold hover:text-ink"
            >
              预订
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-14 sm:pt-20">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            西贡 · 中文菜单
          </span>
          <h1 className="font-display mt-4 text-4xl sm:text-5xl">
            IBÉRICO <span className="text-gold-light">Vinos y Tapas</span>
          </h1>
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-cream/75 sm:text-base">
            {ZH_INTRO.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ZH_PROMOS.map((p) => (
            <div
              key={p.title}
              className="rounded-sm border border-gold-light/30 bg-wine/20 p-6 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                {p.title}
              </p>
              <p className="font-display mt-2 text-4xl text-cream">{p.big}</p>
              <p className="mt-2 text-sm text-cream/75">{p.line}</p>
            </div>
          ))}
        </div>

        <nav
          aria-label="菜单分类"
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {ZH_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-cream/20 px-4 text-sm text-cream/80 hover:border-gold-light hover:text-cream"
            >
              {s.title}
            </a>
          ))}
        </nav>

        {ZH_SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24 pt-16">
            <div className="border-b border-gold-light/30 pb-4">
              <h2 className="font-display text-3xl text-cream sm:text-4xl">
                {s.title}
                <span className="ml-3 text-base text-gold-light/80 sm:text-lg">
                  {s.original}
                </span>
              </h2>
              {s.intro && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/70">
                  {s.intro}
                </p>
              )}
              {s.note && (
                <p className="mt-3 text-sm italic text-cream/60">{s.note}</p>
              )}
            </div>

            {s.groups.map((g, gi) => (
              <div key={gi} className="mt-8">
                {g.title && (
                  <h3 className="font-display mb-4 text-xl text-gold-light">
                    {g.title}
                  </h3>
                )}
                {g.note && (
                  <p className="mb-4 text-sm italic text-cream/60">{g.note}</p>
                )}
                {g.columns && g.columns.length === 1 && (
                  <p className="mb-2 text-right text-xs text-cream/50">
                    {g.columns[0]}
                  </p>
                )}
                <ul className="grid grid-cols-1 gap-x-12 gap-y-5">
                  {g.items.map((it) => (
                    <li
                      key={it.name + it.prices.join("-")}
                      className="flex items-start justify-between gap-4 border-b border-cream/10 pb-4"
                    >
                      <div className="min-w-0">
                        <h4 className="text-base font-semibold text-cream sm:text-lg">
                          {it.zh}
                        </h4>
                        {it.zh !== it.name && (
                          <p className="font-display text-sm text-gold-light/80">
                            {it.name}
                          </p>
                        )}
                        {it.meta && (
                          <p className="mt-1 text-xs text-cream/50">{it.meta}</p>
                        )}
                        {it.desc && (
                          <p className="mt-1.5 text-sm leading-relaxed text-cream/65">
                            {it.desc}
                          </p>
                        )}
                      </div>
                      <Prices group={g} prices={it.prices} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {s.funFact && (
              <p className="mt-6 text-sm italic text-cream/60">{s.funFact}</p>
            )}
          </section>
        ))}

        <p className="mt-16 text-center text-xs text-cream/60">{ZH_NOTE}</p>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-cream/10 pt-10 text-center">
          <p className="font-display text-2xl">我们带来西班牙，你带来好胃口。</p>
          <Link
            href="/#reserve"
            className="rounded-full bg-wine px-8 py-3.5 text-sm font-semibold hover:bg-gold hover:text-ink"
          >
            立即预订
          </Link>
          <p className="max-w-md text-xs text-cream/50">
            中文菜单为翻译版本，菜品与价格以餐厅现场英文 / 越南文菜单为准。
          </p>
        </div>
      </main>
    </div>
  );
}
