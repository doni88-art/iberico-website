# Task 2: i18n strings — Report

## Status
**DONE**

## Execution Summary

### Changes Made

#### 1. Dict Interface (`src/lib/i18n.tsx` ~L60)
Added the `whatsOn` block to the `Dict` interface after the `hero` block:
```typescript
whatsOn: {
  navLabel: string;
  close: string;
  maybeLater: string;
  whenLabel: string;
  whereLabel: string;
  priceLabel: string;
  bookingBannerPrefix: string;
  bookingClear: string;
};
```

#### 2. English Dict (`const en`)
- **Eyebrow change** (line 181): `"Saigon · Est. 2021"` → `"Vinos y Tapas · Saigon · Est. 2021"`
- **whatsOn object added** (lines 190–199):
  - navLabel: "What's On"
  - close: "Close"
  - maybeLater: "Maybe later"
  - whenLabel: "When"
  - whereLabel: "Where"
  - priceLabel: "Price"
  - bookingBannerPrefix: "You're booking for"
  - bookingClear: "Clear"

#### 3. Vietnamese Dict (`const vi`)
- **Eyebrow change** (line 1581): `"Sài Gòn · Thành lập 2021"` → `"Vinos y Tapas · Sài Gòn · Thành lập 2021"`
- **whatsOn object added** (lines 1590–1599):
  - navLabel: "Sự kiện"
  - close: "Đóng"
  - maybeLater: "Để sau"
  - whenLabel: "Khi nào"
  - whereLabel: "Ở đâu"
  - priceLabel: "Giá"
  - bookingBannerPrefix: "Bạn đang đặt bàn cho"
  - bookingClear: "Xoá"

#### 4. Spanish Dict (`const es`)
- **Eyebrow change** (line 2981): `"Saigón · Desde 2021"` → `"Vinos y Tapas · Saigón · Desde 2021"`
- **whatsOn object added** (lines 2990–2999):
  - navLabel: "Agenda"
  - close: "Cerrar"
  - maybeLater: "Quizás luego"
  - whenLabel: "Cuándo"
  - whereLabel: "Dónde"
  - priceLabel: "Precio"
  - bookingBannerPrefix: "Estás reservando para"
  - bookingClear: "Borrar"

### Verification

✓ **TypeScript Check**: `npx tsc --noEmit` — PASSED (no type errors)
✓ **Lint Check**: `npm run lint` — PASSED (no style violations)
✓ **Git Status**: Only `src/lib/i18n.tsx` staged and committed (no unrelated changes)

### Commit Details

- **SHA**: `6b6ba43dc236fb53561c1bfe7688d10847776c8e`
- **Subject**: `feat(i18n): add whatsOn strings; widen hero eyebrow to "Vinos y Tapas"`
- **Author**: IBERICO CHEF <admin@Admins-MBP-2.fpt>
- **Co-Author**: Claude Sonnet 5 <noreply@anthropic.com>
- **Stats**: 1 file changed, 43 insertions(+), 3 deletions(-)

### Self-Review Checklist

✓ All three `whatsOn` objects have identical key sets matching the interface
✓ All three `hero.eyebrow` values now start with `Vinos y Tapas · `
✓ No dict left unedited
✓ No trailing-comma or syntax errors
✓ whatsOn objects placed adjacent to hero blocks in each dict for structural consistency
✓ Verbatim strings used per brief (English, Vietnamese, Spanish with correct diacritics)
✓ No interference with unrelated `src/components/Hero.tsx` change

## Notes

- The task brief provided exact line-number hints and anchor strings, which proved invaluable for precise placement
- All diacritics were preserved (accents in Spanish/Vietnamese, dashes, etc.)
- The `whatsOn` interface is now a required key in all Dict instances, ensuring type safety for consuming components (navbar link, event popup, reservation banner)
- TypeScript's type system verified completeness: missing or mismatched keys would have failed the `tsc --noEmit` check

## Ready for Downstream Tasks

The i18n module is now complete. Downstream tasks (Task 3: event popup, navbar link, reservation banner) can safely consume `t.whatsOn` without type errors.
