### Task 6: Navbar "What's On" link

**Files:**
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `useWhatsOn()` → `{ event, openPopup }` (Task 3); `t.whatsOn.navLabel` (Task 2).
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Import and read the context**

In `src/components/Navbar.tsx`, add the import beside the other `@/lib` import:
```ts
import { useWhatsOn } from "@/lib/whats-on";
```
Inside `export function Navbar()`, just below `const { lang, setLang, t } = useLanguage();`, add:
```ts
  const { event, openPopup } = useWhatsOn();
```

- [ ] **Step 2: Add the desktop link**

In the desktop `<ul className="hidden lg:flex ...">`, immediately after the `{SECTIONS.map((s) => ( ... ))}` block and before `</ul>`, add:
```tsx
            {event && (
              <li>
                <button
                  type="button"
                  onClick={openPopup}
                  className={`relative cursor-pointer transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    scrolled
                      ? "hover:text-gold-deep after:bg-gold-deep"
                      : "hover:text-gold-light after:bg-gold-light"
                  }`}
                >
                  {t.whatsOn.navLabel}
                </button>
              </li>
            )}
```

- [ ] **Step 3: Add the mobile-menu link**

In the mobile `<ul className="flex flex-col gap-1 text-2xl font-display">`, immediately after the `{SECTIONS.map((s, i) => ( ... ))}` block and before `</ul>`, add:
```tsx
              {event && (
                <motion.li
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 * SECTIONS.length + 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-border py-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openPopup();
                    }}
                    className="cursor-pointer text-left"
                  >
                    {t.whatsOn.navLabel}
                  </button>
                </motion.li>
              )}
```

- [ ] **Step 4: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 5: Preview check**

With `npm run dev`, open `http://localhost:3000`:
- Desktop nav shows `What's On` after `Careers`. Dismiss the popup, click `What's On` → popup reopens.
- Shrink to mobile, open the hamburger menu: `Sự kiện`/`What's On` is the last item; tapping it closes the menu and opens the popup.
- Temporarily edit `src/lib/whats-on.tsx` `setEvent(currentEvent())` → `setEvent(currentEvent(new Date("2026-10-10")))`, reload: no popup auto-opens **and** the nav link is gone. Revert the edit.

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "$(cat <<'EOF'
feat(nav): add conditional "What's On" link that reopens the event popup

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

