### Task 2: i18n strings — `whatsOn` block + hero eyebrow

**Files:**
- Modify: `src/lib/i18n.tsx` — `Dict` interface (~L51, after the `hero` block); `en` dict (~L161); `vi` dict (~L1551); `es` dict (~L2941).

**Interfaces:**
- Produces on `t`: `t.whatsOn.{navLabel, close, maybeLater, whenLabel, whereLabel, priceLabel, bookingBannerPrefix, bookingClear}` (all `string`).
- Changes: `t.hero.eyebrow` value in all three languages.

- [ ] **Step 1: Add to the `Dict` interface**

In `src/lib/i18n.tsx`, immediately after the `hero: { ... }` block in `interface Dict` (the block ending `scroll: string; };` around L59), add:

```ts
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

- [ ] **Step 2: Add the `en` entry + change `en` hero eyebrow**

In `const en: Dict = { ... }`, change:
```ts
    eyebrow: "Saigon · Est. 2021",
```
to:
```ts
    eyebrow: "Vinos y Tapas · Saigon · Est. 2021",
```
and add a `whatsOn` block adjacent to the `hero` block:
```ts
  whatsOn: {
    navLabel: "What's On",
    close: "Close",
    maybeLater: "Maybe later",
    whenLabel: "When",
    whereLabel: "Where",
    priceLabel: "Price",
    bookingBannerPrefix: "You're booking for",
    bookingClear: "Clear",
  },
```

- [ ] **Step 3: Add the `vi` entry + change `vi` hero eyebrow**

In `const vi: Dict = { ... }`, change:
```ts
    eyebrow: "Sài Gòn · Thành lập 2021",
```
to:
```ts
    eyebrow: "Vinos y Tapas · Sài Gòn · Thành lập 2021",
```
and add:
```ts
  whatsOn: {
    navLabel: "Sự kiện",
    close: "Đóng",
    maybeLater: "Để sau",
    whenLabel: "Khi nào",
    whereLabel: "Ở đâu",
    priceLabel: "Giá",
    bookingBannerPrefix: "Bạn đang đặt bàn cho",
    bookingClear: "Xoá",
  },
```

- [ ] **Step 4: Add the `es` entry + change `es` hero eyebrow**

In `const es: Dict = { ... }`, change:
```ts
    eyebrow: "Saigón · Desde 2021",
```
to:
```ts
    eyebrow: "Vinos y Tapas · Saigón · Desde 2021",
```
and add:
```ts
  whatsOn: {
    navLabel: "Agenda",
    close: "Cerrar",
    maybeLater: "Quizás luego",
    whenLabel: "Cuándo",
    whereLabel: "Dónde",
    priceLabel: "Precio",
    bookingBannerPrefix: "Estás reservando para",
    bookingClear: "Borrar",
  },
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS. (If a dict is missing the `whatsOn` key, `tsc` fails here with "Property 'whatsOn' is missing" — that is the test.)

- [ ] **Step 6: Lint + commit**

```bash
npm run lint
git add src/lib/i18n.tsx
git commit -m "$(cat <<'EOF'
feat(i18n): add whatsOn strings; widen hero eyebrow to "Vinos y Tapas"

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

