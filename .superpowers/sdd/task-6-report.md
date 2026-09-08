# Task 6 Report: Navbar "What's On" link

**Status:** COMPLETE

**Commit:** `c32d24de10b80a81642707bc6730cb3dc5152d98`
`feat(nav): add conditional "What's On" link that reopens the event popup`
Branch: `feat/hero-logo-events-popup`. One file changed: `src/components/Navbar.tsx` (+40 lines).

## Changes made (per brief, verbatim)

1. `import { useWhatsOn } from "@/lib/whats-on";` added beside the `@/lib/i18n` import.
2. `const { event, openPopup } = useWhatsOn();` added just below `const { lang, setLang, t } = useLanguage();`.
3. Desktop `<ul className="hidden lg:flex ...">`: `{event && (<li><button type="button" onClick={openPopup} className={...}>{t.whatsOn.navLabel}</button></li>)}` inserted after the `{SECTIONS.map(...)}` block, before `</ul>`. The button's `className` expression is byte-identical to the sibling `<a>` nav items (the `relative cursor-pointer ... after:...` string switching on `scrolled`).
4. Mobile menu `<ul className="flex flex-col gap-1 text-2xl font-display">`: `{event && (<motion.li initial/animate/transition className="border-b border-border py-4"><button type="button" onClick={() => { setOpen(false); openPopup(); }} className="cursor-pointer text-left">{t.whatsOn.navLabel}</button></motion.li>)}` inserted after the `{SECTIONS.map((s, i) => ...)}` block. Transition delay uses `0.05 * SECTIONS.length + 0.1` matching the sibling stagger pattern.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run lint` — clean.
- Pre-flight check: desktop `<ul>` maps `SECTIONS.map((s) => <a>)`, mobile `<ul>` maps `SECTIONS.map((s, i) => <motion.li>)`, `SECTIONS` is a 6-entry array — all matched the brief.
- Dev server on `:3000`, verified with the Browser pane (animations throttle while the pane is hidden, so open/close state was confirmed via DOM, not just screenshots):
  - **Desktop nav:** "What's On" renders as the last item, after "Careers". Popup auto-opens on load; after clicking Close (`[role="dialog"]` gone, `body.overflow` cleared), clicking "What's On" reopens it (`[role="dialog"]` present, `body.overflow: hidden`).
  - **Desktop styling parity:** `Careers` `<a>.className` === `What's On` `<button>.className` in BOTH the un-scrolled state (`hover:text-gold-light after:bg-gold-light`) and the scrolled state (`hover:text-gold-deep after:bg-gold-deep`), confirmed by string equality after scrolling.
  - **Mobile (375x812):** hamburger menu opens; the mobile `<ul>` has 7 `<li>` children with "What's On" (a `<button>`, `li.className="border-b border-border py-4"`, `button.className="cursor-pointer text-left"`) as the LAST item. Tapping it: hamburger `aria-label` flips back to "Open menu" / `aria-expanded="false"` (menu closed via `setOpen(false)`) AND `[role="dialog"]` appears with full event content ("PINCHOS NIGHT · 1ST EDITION") — both actions fire.
  - **Event gating:** temporarily set `setEvent(currentEvent(new Date("2026-10-10")))` in `src/lib/whats-on.tsx`, reloaded — no popup auto-opens and zero "What's On" buttons in the DOM (desktop and mobile both gone). Edit reverted; `git diff` confirms `whats-on.tsx` unchanged.
  - Console: no key warnings, no React errors, no prop warnings.

## Self-review

- Link is wrapped in `{event && (...)}` in BOTH menus. ✅
- Desktop button `className` matches sibling nav-item styling for scrolled + un-scrolled (verified by string equality). ✅
- Mobile button closes the menu AND opens the popup. ✅
- No `key` warning: the desktop `<li>` is a lone conditional element, not inside a `.map()`, so no `key` is required; console is clean. ✅

## Concerns

None. The layered/ghosted popup appearance in screenshots is the documented Browser-pane animation-throttling artifact (AnimatePresence exit nodes not unmounting while the pane is hidden); logical state was verified via DOM and is correct.

## Committed files

Only `src/components/Navbar.tsx`. Untracked media (`*.MP4`, `*.HEIC`, `Iberico/`, `menu-extraction-notes.md`) left unstaged. `AGENTS.md` not regenerated/committed.
