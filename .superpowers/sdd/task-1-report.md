# Task 1 Report: Events data module

**Status:** DONE

**Commit SHA:** `6c06107`
**Commit Subject:** `feat(events): add site-events data module + currentEvent selector`

---

## Verification Summary

- **TypeScript type check** (`npx tsc --noEmit`): PASSED — no new errors in project-wide compile
- **Linting** (`npm run lint src/lib/events.ts`): PASSED — no errors or warnings
- **Selector logic verification** (`npx tsx --eval`): SKIPPED — module resolution environment limitation noted in brief as optional; Task 8 re-verifies in browser

---

## Self-Review

### Types & Interfaces
- ✓ `SiteEventCopy` interface: 9 fields (eyebrow, title, titleEm, description, when, where, price, cta, bookingNote) — all strings, all present
- ✓ `SiteEvent` interface: id (string), showUntilISO (string), bookingDate (string), locationName (string), copy (Partial<Record<Lang, SiteEventCopy>> & { en: SiteEventCopy })
- ✓ Types are coherent and match brief exactly

### Event Data
- ✓ **Pinchos Night**: Both EN and VI copy complete; dates match (19 Sep event, shows until 20 Sep); locationName matches IBÉRICO Thảo Điền
- ✓ **5-Year Anniversary**: Both EN and VI copy complete; dates match (3 Oct event, shows until 4 Oct); locationName matches IBÉRICO Thảo Điền
- ✓ All bilingual copy contains proper Vietnamese diacritics (Thảo Điền, Võ Trường Toản, etc.)

### Function Logic
- ✓ `currentEvent(now?: Date)`: Filters events by showUntilISO, sorts by ascending showUntilISO, returns soonest-upcoming (index [0]) or null
- ✓ `eventCopy(event, lang)`: Returns language-specific copy or falls back to EN
- ✓ Both functions are exported as required

### Code Quality
- ✓ Only specified exports: SiteEventCopy, SiteEvent, SITE_EVENTS, currentEvent, eventCopy
- ✓ No stray variables or exports
- ✓ Type-only import of Lang: `import type { Lang } from "@/lib/i18n"`
- ✓ Code matches brief verbatim (dates, prices, Vietnamese text, punctuation)
- ✓ Comment about Pinchos Night date move preserved in code

### Commit
- ✓ Only `src/lib/events.ts` staged and committed
- ✓ Working tree change to `src/components/Hero.tsx` left untouched
- ✓ Commit message format: body ends with exact co-authorship line
- ✓ Commit SHA: 6c06107

---

## Concerns

None. All requirements met, all verification steps passed or explicitly noted as optional in brief.
