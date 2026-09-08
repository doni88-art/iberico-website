### Task 4: Hero logo lockup (Option C)

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `t.hero.eyebrow` (already widened in Task 2), `/brand/logo-mark.png` (existing asset).
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Discard the stale uncommitted edit**

The working tree has an abandoned edit to `Hero.tsx` from a prior session. Reset to the committed version first:
```bash
git checkout -- src/components/Hero.tsx
```

- [ ] **Step 2: Remove the unused import**

In `src/components/Hero.tsx`, delete the line:
```ts
import { LogoMark } from "./Logo";
```

- [ ] **Step 3: Replace the logo card block**

Replace this block:
```tsx
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          className="mb-7 flex items-center gap-4 rounded-2xl bg-cream px-7 py-4 shadow-xl"
        >
          <LogoMark className="h-12 w-12 shrink-0" />
          <Image
            src="/brand/logo-wordmark.png"
            alt="IBÉRICO Vinos y Tapas"
            width={908}
            height={530}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </motion.div>
```
with:
```tsx
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease }}
          className="mb-8 flex flex-col items-center gap-2.5"
        >
          <Image
            src="/brand/logo-mark.png"
            alt="IBÉRICO Vinos y Tapas"
            width={462}
            height={601}
            priority
            className="h-[52px] w-auto brightness-0 invert drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
          />
          <span className="h-px w-9 bg-cream/50" />
          <span className="font-display text-sm tracking-[0.34em] text-cream sm:text-base">
            <span className="pl-[0.34em]">IBÉRICO</span>
          </span>
        </motion.div>
```

(Note: this plan renders the crest with a direct `<Image>` for aspect-ratio
correctness rather than adding a `knockout` prop to `LogoMark` as the spec
sketched — `LogoMark` uses `fill` and would distort the portrait crest. `Logo.tsx`
is left untouched.)

- [ ] **Step 4: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS (no "LogoMark is not defined", no unused-import error).

- [ ] **Step 5: Preview check**

With `npm run dev` running, open `http://localhost:3000`:
- Hero shows: white crest → short hairline → letter-spaced `IBÉRICO`, all centered, **no white box**.
- The lockup sits above the eyebrow pill, which now reads `Vinos y Tapas · Saigon · Est. 2021`.
- Entrance animation plays (fade + slight scale).
- Resize to 375px wide: lockup still centered, crest not oversized, nothing clipped.
- DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, reload: no scale/slide on the lockup, it just appears.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "$(cat <<'EOF'
feat(hero): replace white logo card with crest + wordmark lockup

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

