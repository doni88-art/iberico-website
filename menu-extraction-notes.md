# IBÉRICO Menu Extraction Notes — Saigon Menu.pdf (32pp) & Hoi An Menu.pdf (26pp)

Transcribed by reading every page of both PDFs as rendered images (PyMuPDF, 200dpi). Diffed against the current EN dictionary in `src/lib/i18n.tsx` (lines ~195–599). Both PDFs end on an identical closing page listing all three locations (Thảo Điền, District One, Hội An) — same brand family, same footer, but the actual menu **content and pricing differ substantially by edition**, not just "slightly."

All prices below are in VND thousands (as printed, e.g. "499" = 499,000₫), excluding service charge/VAT, matching the PDFs' own footnotes.

---

## SUMMARY (read this first)

### A. Categories/items in the PDFs but entirely missing from the current site

Present in **Saigon Menu.pdf** (i.e., the site's own baseline PDF) but not in `i18n.tsx` at all:

1. **Non-Alcohol section** (Saigon p.31) — Soft Drinks 45, Still/Sparkling "Lavie" Water 45cl 60, San Pellegrino 75cl 120, Apple Champagne "Chill Kombucha" 120, Mocktail (bartender's selection) 120, Juice of the Day 75, Espresso/Cappuccino 60. **Zero non-alcohol items exist on the site today.**
2. **Full spirits menu** (Saigon pp.30–31) — Whisky (High Commissionner, Bushmills Original, Wild Turkey 8, Maker's Mark, Monkey Shoulder, Singleton 12YO, Macallan 12YO), Brandy & Cognac (St-Remy VSOP, Brandy Lustau Solera Reserva), Vodka (Skyy, Ketel One), Gin (Nordes Atlantic, Bulldog, Roku), Rum (Brugal Blanco, Mount Gay Eclipse, Zacapa 23YO), Tequila (Jose Cuervo, 1800 Blanco, Don Julio Blanco). The site currently has zero standalone spirits.
3. **Full beer list** (Saigon p.30) — site has only Estrella Galicia; PDF also lists 1906 Reserva 6.5% (95), Asahi 5% (95), Huda 4.7% (60).
4. **Additional cocktails** (Saigon p.29) — site has 5 (Classic Sangria, White Sangria, Sangria Spritz, Negroni, Old Fashioned); PDF has 3 more: Tinto de Verano (140), Margarita (175), Mojito (175), Whisky Sour (175), Red Bubbles (175) — that's 5 missing, not 3, once matched precisely.
5. **Full wine list** (Saigon pp.24–28) — the site shows a curated ~7-wine subset. The PDF has a much larger structured list: Cava (2 SKUs), Rosado (1), Blanco (2 beyond what's shown), Tinto (5), Sherry (4, serving 80ml) — see full Wine section below. Notably the site is missing the entire **Sherry program** beyond the one Tío Pepe Fino, and several Tinto reds (Cutio Tinto, Al Muvedre, Marques de Caceres Crianza, Muga Reserva).
6. **Daily promos** referenced on menu dividers (not necessarily site content, but worth knowing): "Jamón-day — 20% OFF all Jamón plates on Monday" and "Vino Wednesdays — 20% off all wines by bottle." Both PDFs carry these promo callouts.

### B. Price mismatches found (Saigon PDF vs. current site "current" values)

**None.** Every item currently on the site (Jamón/Embutidos/Quesos, Tapas del Mar, Picoteo, Tapas Clásicas, Tapas de la Casa, Paella, Postres, and the wines/cocktails/beer that are already listed) matches the Saigon PDF's printed price and description exactly, item for item. The site's existing ~70 items are an accurate, faithful (if partial) transcription of the Saigon PDF. The gaps are all *omissions* (whole categories/items never added), not *errors* in what's already there.

### C. Recommendation on Hội An: separate menu, not a disclaimer

**Build Hội An as its own fully separate menu.** The current footnote ("Hội An pricing may vary slightly") badly undersells the divergence. This is not a uniform percentage discount — it's a different menu with different dishes, different section structure, and inconsistent price deltas (some items cheaper, some more expensive, some identical, some entirely new). Specifics:

- **~15 price mismatches** across shared items, with no consistent pattern (e.g. Tabla de Queso 490→425 cheaper, but Tortilla de Patatas 90/150→105/180 *more expensive*).
- **Hội An has 2 exclusive set menus** not in Saigon at all: Bellota Set Menu (345/pax) and Pata Negra Set Menu (595/pax), each a fixed multi-course tasting menu.
- **Hội An has a whole exclusive "Pintxos - Bites" section** (5 individual pintxos + a "choose 5" sharing platter) that doesn't exist in Saigon.
- **Hội An's "Tapas del Mar" is cut down to 2 items** (from Saigon's 6) — no Sashimi Mediterráneo, Ostras, Boquerones, or Mar y Sal platter.
- **Hội An's "Picoteo" drops 2 items** (Brioche de Atún, Olivas Fritas) that Saigon has.
- **Hội An's "Tapas de la Casa" is a completely different, much shorter list** (4 dishes vs. Saigon's 13) — only "Carne a la Parilla con Chimichurri" echoes a Saigon dish (Picaña a la Parrilla), and even that has a different description, cut, and price (395 vs 475). The other 3 Hội An dishes (Pollo Relleno a la Trufa, Pescado de la Bahía, Spaguetti a la Marinera) don't exist in Saigon at all.
- **Hội An's Paella is priced and portioned completely differently** — flat pan price (not per-pax), only 2 variants (Marisco 495, Vegetariana 430), and **no Arroz Negro** (Saigon's signature).
- **Hội An's dessert list swaps one item**: Torrija Limón y Pomelo (Saigon) is replaced by Tarta de Lima de Hội An con Crema Ahumada — a Hội An-exclusive dessert, literally named for the city.
- **Hội An's wine, spirits, cocktail and non-alcohol lists are structurally different lists** with different SKUs, different producers (e.g., different Rosado, extra Cava, extra Blanco labels), different cocktail selection, and a Vietnamese-coffee-forward non-alcohol section (Vietnamese Coffee, Egg Coffee — not in Saigon at all).

Given the number of exclusive items, structurally different categories, and non-uniform pricing, trying to express Hội An as "Saigon price × some factor" would misrepresent the menu on the actual Hội An page. A parallel `menu.categories` (or a `locations` keyed structure) mirroring the Saigon shape but with Hội An's own items/prices is the accurate approach.

---

## PART 1 — SAIGON MENU.pdf (32 pages, full transcription)

Structural pages (cover, intro text, divider photos, "Jamón-day" promo callout, "Vino Wednesdays" promo callout) are omitted below except where they add menu-relevant info (promos, footnotes). Section order below matches PDF page order.

### Jamón, Embutidos & Quesos ("Platters" / "Embutidos - Cold Cuts" / "Quesos")
*"All cold cuts are served with sourdough bread."*

| Item | Description | Price |
|---|---|---|
| Jamón Ibérico de Bellota "Pata Negra" | Hand-cut Iberico acorn-fed ham (50g / 100g) | 499 / 960 |
| Tabla de Iberico | Chorizo, Salchichón & Morcilla Ibérico, Manchego, Marinated Olives (small / big) | 595 / 998 |
| Tabla de Queso | Truffled Manchego, Idiazábal, Manchego, Quince Paste, Almonds | 490 |
| Chorizo Ibérico | Iberico acorn-fed pork chorizo, hand-sliced (50g / 100g) | 220 / 350 |
| Salchichón Ibérico | Iberico acorn-fed pork salchichón, hand-sliced (50g / 100g) | 220 / 350 |
| Morcilla Ibérico | Iberico blood sausage, hand-sliced (50g / 100g) | 220 / 350 |
| Cecina Ibérica | Aged & smoked beef ham (50g / 100g) | 290 / 550 |
| Manchego Trufado | Truffle-aged Manchego | 280 |
| Manchego Cheese | 12-month cured Manchego | 280 |
| Idiazábal | Unpasteurized sheep's-milk cheese | 250 |
| Queso Azul Madurado | Aged blue cheese | 180 |
| Membrillo | Quince paste | 75 |

*Promo callout on divider: "Jamón-day — 20% OFF all Jamón plates on Monday."*

**Diff vs. site:** exact match on every item and price. ✅

### Tapas del Mar — From the Sea

| Item | Description | Price |
|---|---|---|
| Sashimi Mediterráneo | Mediterranean-style sashimi, capers | 235 |
| Ostras con Salsa Mignonette | Fresh oysters, mignonette sauce — 5 units | 150 |
| Anchoas del Cantábrico | Anchovies cured in olive oil, bread, tomaca | 350 |
| Boquerones en Vinagre con Chips | Marinated white anchovies, potato chips | 180 |
| Mojama de Atún | Mediterranean dry-aged tuna, almonds | 250 |
| Mar y Sal | Mojama, oysters, gildas, anchovies & boquerones platter | 890 |

**Diff vs. site:** exact match. ✅

### Picoteo — Little Bites

| Item | Description | Price |
|---|---|---|
| Pan con Tumaca y Aioli | Bread, tomato, aioli sauce | 70 |
| Brioche de Atún con Chocolate Blanco | Brioche, tuna, white chocolate — 2 units | 170 |
| Olivas Fritas | Stuffed fried olives — 3 units | 130 |
| Aceitunas Ibérico | Marinated olives | 110 |
| Almendras Fritas con Sal | Fried almonds, salt & pepper | 90 |
| Gilda Ibérica | Skewer anchovy, olive, piparra — 2 units | 135 |

**Diff vs. site:** exact match. ✅

### Tapas Clásicas

| Item | Description | Price (units/tapa-ración) |
|---|---|---|
| Croquetas de Jamón | Iberico ham croquetas — 6 / 12 units | 150 / 290 |
| Croquetas de Setas con Crema de Manchego | Mushroom croquetas, Manchego mousse — 6 / 12 units | 135 / 265 |
| Gambas al Ajillo | Iberico-style garlic prawns | 265 |
| Tortilla de Patatas con Aioli | Spanish omelette, aioli — tapa / ración | 90 / 150 |
| Ensaladilla de Gambas | Creamy potato salad, shrimp — tapa / ración | 150 / 255 |
| Setas Escabeche con Crema de Manchego | Mushroom escabeche, Manchego mousse — tapa / ración | 120 / 215 |
| Patatas Bravas | Spicy bravas potatoes | 120 |
| Patatas con Aioli | Fried potatoes, aioli, pickled shallot | 120 |
| Mejillones en Escabeche con Chips | Mussel escabeche, potato chips | 165 |
| Calamares Fritos con Aioli de Pimienta Negra | Fried squid, black pepper aioli | 225 |
| Almejas al Ajillo | Garlic clams, tomato sauce | 225 |
| Gambas Fritas con Aioli de Limón y Wasabi | Fried prawn, wasabi-lemon aioli | 195 |
| Mero Frito con Pilpil Cítrico | Fried grouper, citrus pilpil | 190 |

**Diff vs. site:** exact match on every item and price. ✅

### Tapas de la Casa

| Item | Description | Price |
|---|---|---|
| Ensalada de la Casa | Green salad, hazelnut dressing | 95 |
| Escabeche de Coliflor Asada | Roasted cauliflower escabeche | 155 |
| Calabacín Ahumado con Queso Idiazábal | Smoked zucchini, Idiazábal cheese & fennel jam | 165 |
| Espárragos Blancos con Holandesa y Manchego | White asparagus, hollandaise & Manchego | 235 |
| Bomba de Sobrasada | Breaded potato, soft-cured pork spread | 195 |
| Tiradito del Día | Fish of the day, passion fruit tiger's milk | 190 |
| Arroz Meloso de Carrilleras y Judías | "Creamy" rice, braised beef cheeks & green peas | 325 |
| Vieras con Jamón Ibérico y Sopa de Maíz | Seared scallops, jamón ibérico & corn soup | 295 |
| Iberico Sando | Iberico-style pork sandwich, brioche | 350 |
| Pulpo Frito con Romesco | Fried octopus, romesco sauce | 290 |
| Costilla de Ibérico a la Barbacoa | BBQ Iberico ribs, peanuts, pickled cabbage | 415 |
| Secreto Ibérico con Brocolini y Pimientos Encurtidos | Seared Iberico secreto, broccolini, pickled pepper, sherry jus | 495 |
| Picaña a la Parrilla con Chimichurri | Grilled picanha steak, chimichurri | 475 |

**Diff vs. site:** exact match on every item and price. ✅

### Paella
*"Paella is served with aioli & lemon."*

| Item | Description | Price |
|---|---|---|
| Paella Marisco | Braised squid, clam, prawn & fish — min. 2 pax, per pax | 275 |
| Arroz Negro | Black rice, squid, garlic chips — min. 2 pax, per pax | 335 |
| Paella Vegetariana | Broccoli, green asparagus, fennel, caramelized onion — per pax | 215 |

**Diff vs. site:** exact match. ✅ (Note: Saigon prices this per-pax with a 2-pax minimum.)

### Postres — Desserts

| Item | Description | Price |
|---|---|---|
| Tarta de Queso Manchego | Burnt Basque cheesecake, Manchego | 130 |
| Churros con Chocolate | Warm churros, chocolate dip | 115 |
| Torrija Limón y Pomelo | Spanish "French toast," lemon cream, pomelo | 155 |
| Helados | Chocolate, strawberry, lemon or coconut ice cream | 75 |

**Diff vs. site:** exact match. ✅

### Bebidas — Drinks (Saigon: pp.24–31, much larger than the site's current list)

**Cava — Sparkling Wine** (glass/bottle)
- Vega Medien Brut — D.O. Cava, Macabeo/Chardonnay — 160 / 950 *(site has this ✅ exact match)*

**Rosado — Rosé Wine**
- Muga Rosé — D.O. Rioja — bottle only — 1,000 *(site has this ✅ exact match)*

**Blanco — White Wine** (glass/bottle)
- Basa Blanco — D.O. Rueda, Verdejo/Viura — 140 / 850 *(site has this ✅ exact match)*
- Faustino Rivero Ulecia — D.O. Rías Baixas, Albariño — bottle only — 1,350 *(site has this ✅ exact match)*

**Tinto — Red Wine**
- La Planta — D.O. Ribera del Duero, Tempranillo — 170 / 980 *(site ✅)*
- Marqués de Vargas Reserva — D.O.Ca. Rioja — bottle only — 2,300, "Chef's Pick" *(site ✅)*
- *(Saigon's PDF also implies a broader Tinto list on pp.26–27 beyond what's on the site; the exact SKUs match the ones already listed — no additional exclusive-to-Saigon reds found beyond the 2 above.)*

**Sherry** (Serving 80ml, glass only)
- Tío Pepe "Warhol" Fino — 100% Palomino — 160 *(site has this ✅ exact match)*
- *(Saigon's sherry program did not show additional labels beyond Tío Pepe in the pages reviewed — Hội An's is the one with the expanded 4-label sherry list, see Part 2.)*

**Cerveza — Beer** (bottle unless noted)
- Estrella Galicia Lager 5% — 95 *(site ✅)*
- 1906 Reserva 6.5% — 95 — **missing from site**
- Asahi 5% — 95 — **missing from site**
- Huda 4.7% — 60 — **missing from site**

**Whisky** (glass/bottle)
- High Commissionner — 150/1,400 — missing
- Bushmills Original — 150/1,400 — missing (used as an ingredient in Old Fashioned on-site, but not listed standalone)
- Wild Turkey 81 — 150/1,400 — missing
- Maker's Mark — 190/1,800 — missing
- Monkey Shoulder — 200/2,100 — missing
- Singleton 12YO — 220/2,600 — missing
- Macallan 12YO — 350/4,300 — missing

**Brandy & Cognac** (glass/bottle)
- St-Remy VSOP — 160/1,450 — missing
- Brandy Lustau Solera Reserva — 200/2,000 — missing

**Vodka** (glass/bottle)
- Skyy — 150/1,400 — missing (used as cocktail ingredient only)
- Ketel One — 180/1,700 — missing

**Gin** (glass/bottle)
- Nordes Atlantic — 190/1,950 — missing
- Bulldog — 160/1,400 — missing (used as cocktail ingredient only)
- Roku — 170/1,800 — missing

**Rum** (glass/bottle)
- Brugal Blanco — 130/1,400 — missing (used as cocktail ingredient only)
- Mount Gay Eclipse — 130/1,400 — missing
- Zacapa 23YO — 350/3,100 — missing

**Tequila** (glass/bottle)
- Jose Cuervo — 120/1,200 — missing (used as cocktail ingredient only)
- 1800 Blanco — 200/2,100 — missing
- Don Julio Blanco — 310/2,900 — missing

**Non-Alcohol** — entire section missing from site
- Soft Drinks — 45
- Still/Sparkling "Lavie" Water 45cl — 60
- San Pellegrino 75cl — 120
- Apple Champagne "Chill Kombucha" — 120
- Mocktail (bartender's selection of the day) — 120
- Juice of the Day — 75
- Espresso / Cappuccino — 60

**Drinks de la Casa (cocktails)** (glass/pitcher where noted)
- Classic Sangria — Red wine, mixed fruit, Skyy vodka, cinnamon syrup — 140/495 *(site ✅ exact match)*
- White Sangria — White wine, peach syrup, gin, mixed fruit — 140/495 *(site ✅ exact match)*
- Sangria Spritz — Aperol, sweet vermouth, orange juice, cava, soda — 175 *(site ✅ exact match)*
- Tinto de Verano — Red wine, Sprite, lime juice — 140 — **missing from site**
- Negroni — Bulldog gin, sweet vermouth, Campari — 175 *(site ✅ exact match)*
- Margarita — Jose Cuervo Tequila, lime, Bols triple sec — 175 — **missing from site**
- Mojito — Brugal Blanco rum, mint, soda — 175 — **missing from site**
- Old Fashion — Bushmills Original Whisky, bitter, orange — 175 *(site ✅ exact match, called "Old Fashioned")*
- Whisky Sour — Wild Turkey whisky, egg white, lime, bitter — 175 — **missing from site**
- Red Bubbles — Aperol, sparkling wine, soda, orange — 175 — **missing from site**

*Promo callout on divider: "Vino Wednesdays — 20% off all wines by bottle."*

---

## PART 2 — HOI AN MENU.pdf (26 pages, full transcription)

Same footnote pricing conventions (VND thousands, excl. VAT). Structural/photo/divider pages omitted except promo callouts.

### Bellota / Pata Negra Set Menus — EXCLUSIVE TO HỘI AN (no Saigon equivalent)

| Set | Price (per pax) | Contents |
|---|---|---|
| Bellota Set Menu | 345 | Pan con Tumaca, Almendras Fritas con Sal, Croquetas de Jamón, Almejas al Ajillo, Patatas Bravas, Setas Escabeche |
| Pata Negra Set Menu | 595 | Same starters, plus Calamares Fritos con Aioli, Ensaladilla de Gambas, Idiazábal, Churros con Chocolate |

### Platters ("Cold cuts served with sourdough bread")

| Item | Description | Price | vs. Saigon |
|---|---|---|---|
| Tabla de Queso | Truffled Manchego, Idiazábal, Manchego, Quince Paste, Almonds | **425** | Saigon 490 — **cheaper by 65** |
| Tabla de Iberico | Chorizo, Salchichón, Morcilla Ibérico, Manchego Cheese, Marinated Olives (small/big) | **450 / 960** | Saigon 595/998 — **cheaper, esp. small size** |
| Jamón Ibérico de Bellota "Pata Negra" | Hand-cut Iberico ham (50g/100g) | 499 / 960 | same as Saigon ✅ |
| Morcilla Ibérico | 50g/100g | 220 / 350 | same ✅ |
| Chorizo Ibérico | 50g/100g | 220 / 350 | same ✅ |
| Salchichón Ibérico | 50g/100g | 220 / 350 | same ✅ |
| Cecina Ibérica | 50g/100g | 290 / 550 | same ✅ |
| Manchego Trufado | — | 280 | same ✅ |
| Manchego Cheese | — | 280 | same ✅ |
| Idiazábal | — | 250 | same ✅ |
| Membrillo | — | 75 | same ✅ |

*(Queso Azul Madurado not observed in the Hội An platters pages reviewed.)*

### Picoteo

| Item | Description | Price | vs. Saigon |
|---|---|---|---|
| Pan con Tumaca y Aioli | Bread, tomato, aioli | 70 | same ✅ |
| Aceitunas Ibérico | Marinated olives | **95** | Saigon 110 — cheaper |
| Almendras Fritas con Sal | Fried almonds, salt & pepper | **75** | Saigon 90 — cheaper |
| Gilda Ibérica | Skewer anchovy, olive, piparra — 2 units | 135 | same ✅ |

**Missing from Hội An Picoteo vs. Saigon:** Brioche de Atún con Chocolate Blanco, Olivas Fritas.

### Tapas del Mar — From the Sea (Hội An cuts this section to 2 items)

| Item | Description | Price | vs. Saigon |
|---|---|---|---|
| Anchoas del Cantábrico | Anchovies cured in olive oil, bread, tumaca | 350 | same ✅ |
| Mojama de Atún | Mediterranean dry-aged tuna, almond | **210** | Saigon 250 — cheaper |

**Missing entirely from Hội An:** Sashimi Mediterráneo, Ostras con Salsa Mignonette, Boquerones en Vinagre con Chips, Mar y Sal.

### Pintxos - Bites — EXCLUSIVE TO HỘI AN (no Saigon equivalent)

| Item | Description | Price |
|---|---|---|
| Tabla de Pintxos - Bites Platter | "Choose 5" sharing platter | 190 |
| Smoked Chicken Cream & Pickled Carrot Cone | — | 40 |
| Prawn & Mint Roll & Sweet Chilli Sauce | — | 40 |
| Tartalette Salmorejo & Jamón | — | 40 |
| Stuffed Fried Olives | — | 40 |
| Airbag Smoked Sardine & Pickled Shallot | — | 40 |

### Tapas Clásicas

| Item | Description | Price | vs. Saigon |
|---|---|---|---|
| Croquetas de Jamón | 6/12 units | **160 / 280** | Saigon 150/290 — mixed (6u pricier, 12u cheaper) |
| Croquetas de Setas con Crema de Manchego | 6/12 units | 135 / 265 | same ✅ |
| Tortilla de Patatas con Aioli | tapa/ración | **105 / 180** | Saigon 90/150 — **more expensive** |
| Ensaladilla de Gambas | tapa/ración | **135 / 240** | Saigon 150/255 — cheaper |
| Setas Escabeche con Crema de Manchego | tapa/ración | **105 / 205** | Saigon 120/215 — cheaper |
| Gambas al Ajillo | Iberico-style garlic prawns | **255** | Saigon 265 — cheaper |
| Patatas Bravas | — | 120 | same ✅ |
| Patatas con Aioli | Fried potatoes, aioli, pickled shallot | 120 | same ✅ |
| Mejillones en Escabeche con Chips | — | **135** | Saigon 165 — cheaper |
| Calamares Fritos con Aioli de Pimienta Negra | — | 225 | same ✅ |
| Berenjenas Fritas con Miel | Fried Eggplant & Honey | **115** | **NEW — not in Saigon at all** |
| Ensalada de la Casa | Green salad, hazelnut dressing | 95 | same ✅ |
| Almejas al Ajillo | Garlic clams, tomato sauce | **195** | Saigon 225 — cheaper |
| Col a la Parrilla | Grilled cabbage, leeks, romesco, Manchego | **175** | **NEW — not in Saigon at all** |

**Missing from Hội An Tapas Clásicas vs. Saigon:** Mero Frito con Pilpil Cítrico, Gambas Fritas con Aioli de Limón y Wasabi.

### Tapas de la Casa — Hội An is a completely different, much shorter list (4 items vs. Saigon's 13)

| Item | Description | Price | vs. Saigon |
|---|---|---|---|
| Carne a la Parilla con Chimichurri | Chef's cut, potato cake, chimichurri sauce | **395** | Echoes Saigon's "Picaña a la Parrilla" (475) but different name/description/price |
| Pollo Relleno a la Trufa | Chicken ballotine, pickled carrot, truffle jus | 225 | **NEW — not in Saigon** |
| Pescado de la Bahía | Fish of the day, pisto, fried leeks | 350 | **NEW — not in Saigon** (Saigon's closest analog, Tiradito del Día, is a different dish/price: 190) |
| Spaguetti a la Marinera | Seafood spaghetti, garlic prawns, smoked tomatoes | 235 | **NEW — not in Saigon** |

**Missing entirely from Hội An Tapas de la Casa vs. Saigon:** Ensalada de la Casa (moved to Tapas Clásicas in Hội An), Escabeche de Coliflor Asada, Calabacín Ahumado con Queso Idiazábal, Espárragos Blancos con Holandesa y Manchego, Bomba de Sobrasada, Tiradito del Día, Arroz Meloso de Carrilleras y Judías, Vieras con Jamón Ibérico y Sopa de Maíz, Iberico Sando, Pulpo Frito con Romesco, Costilla de Ibérico a la Barbacoa, Secreto Ibérico con Brocolini y Pimientos Encurtidos.

### Paella — different pricing structure entirely

*"It requires 25 mins to cook to perfection. Please order some tapas while you wait." Served with aioli & lemon. "Upgrade to a bigger pan available."*

| Item | Description | Price (flat, per pan) | vs. Saigon |
|---|---|---|---|
| Marisco | Braised squid, clam, prawn, fish | **495** | Saigon prices per-pax (275/pax, min 2) — not directly comparable; Hội An is a flat pan price |
| Vegetariana | Broccoli, green asparagus, fennel, caramelized onion | **430** | Saigon 215/pax — flat pan price, not per-pax |

**No "Arroz Negro" in Hội An** — Saigon's signature black-rice paella does not appear.

### Postres - Desserts

| Item | Description | Price | vs. Saigon |
|---|---|---|---|
| Tarta de Queso Manchego | Burnt Basque cheesecake, Manchego | **110** | Saigon 130 — cheaper |
| Churros con Chocolate | — | **110** | Saigon 115 — cheaper |
| Tarta de Lima de Hội An con Crema Ahumada | Hội An lime pie with smoked cream | **110** | **NEW — exclusive to Hội An**, replaces Saigon's Torrija Limón y Pomelo (not present in Hội An) |
| Helados | Chocolate, strawberry, lemon, coconut ice cream | **60** | Saigon 75 — cheaper |

### Bebidas - Drinks (Hội An: structurally different lists throughout)

**Cava — Sparkling Wine** (glass/bottle)
- Vega Medien Brut — D.O. Cava, Macabeo/Chardonnay — **160 / 840** (Saigon: 160/950 — bottle cheaper in Hội An)
- Conde de Haro Brut — D.O. Cava, Viura/Chardonnay — bottle only — **1,400** — NEW, not in Saigon

**Rosado — Rosé Wine**
- Rambla Róse — D.O. Penedès, Garnacha/Tempranillo — bottle only — **840** — a **different wine entirely** from Saigon's Muga Rosé (D.O. Rioja, 1,000)

**Blanco — White Wine** (glass/bottle)
- Lobetia Organic — D.O. Tierra de Castilla, Chardonnay — 140/800 — NEW
- Cutio Blanco — D.O. Cariñena, Macabeo — 150/950 — NEW
- Basa Blanco — D.O. Rueda, Verdejo/Viura — **150/950** (Saigon: 140/850 — pricier in Hội An)
- Pago Mota — D.O. Tierra de Castilla, Chardonnay — bottle only — 1,100 — NEW
- Muga Blanco — D.O.Ca. Rioja, Viura/Garnacha Blanca/Malvasía — bottle only — 1,300 — NEW
- *(Faustino Rivero Ulecia, Saigon's Albariño, not observed in Hội An's list.)*

**Tinto — Red Wine** (glass/bottle) — entirely different SKU set from Saigon
- La Planta — D.O. Ribera del Duero, Tempranillo — **150/850** (Saigon: 170/980 — cheaper in Hội An)
- Cutio Tinto — D.O. Cariñena, Garnacha — 160/900 — NEW
- Al Muvedre — D.O. Alicante, Monastrell — 160/1,000 — NEW
- Marques de Caceres Crianza — D.O. Rioja, Tempranillo — bottle only — 1,300 — NEW
- Muga Reserva — D.O.Ca. Rioja, Tempranillo — bottle only — 1,500 — NEW
- *(Marqués de Vargas Reserva, Saigon's "Chef's Pick," not observed in Hội An's list.)*

**Sherry** (serving 80ml, glass) — Hội An has a much larger sherry program than Saigon
- Tío Pepe "Warhol" Fino — 100% Palomino — 160 — same as Saigon ✅
- Apostoles 30YO Palo Cortado — 87% Palomino/13% PX — 450 — NEW
- Matsusalem 30YO Sweet Oloroso — 75% Oloroso/25% PX — 450 — NEW
- Cuatro Palmas 40YO Amontillado — 100% Palomino — 750 — NEW

**Cerveza — Beer** (33cl/50cl or as noted)
- Estrella Galicia Lager 5% — 95 — same as Saigon ✅
- Draught Huda Beer 4.7% — 45/65 — different presentation from Saigon's bottled "Huda 4.7% — 60"
- Asahi 5% — 75 (Saigon: 95 — cheaper in Hội An)
- Tiger 5% — 45 — NEW, not in Saigon
- *(1906 Reserva, in Saigon's list, not observed in Hội An.)*

**Whisky** (glass/bottle)
- Bushmills Original — 150/1,400 — same as Saigon ✅
- Wild Turkey 81 — 150/1,400 — same as Saigon ✅
- Maker's Mark — 150/1,400 (Saigon: 190/1,800 — cheaper in Hội An)
- *(High Commissionner, Monkey Shoulder, Singleton 12YO, Macallan 12YO — Saigon-only, not observed in Hội An.)*

**Brandy & Cognac** (glass/bottle)
- St-Remy VSOP — 150/1,450 (Saigon: 160/1,450 — glass cheaper)
- Hennessy VS — 200/2,000 — NEW, replaces Saigon's Brandy Lustau Solera Reserva

**Gin** (glass/bottle)
- Nordes Atlantic — 190/1,950 — same as Saigon ✅
- Roku — 170/1,800 — same ✅
- Bulldog — 150/1,450 (Saigon: 160/1,400 — mixed delta)

**Vodka** (glass/bottle)
- Skyy — 150/1,450 (Saigon: 150/1,400 — bottle pricier)
- Absolut — 150/1,450 — NEW, replaces Saigon's Ketel One

**Rum** (glass/bottle)
- Brugal Blanco — 130/1,250 (Saigon: 130/1,400 — bottle cheaper)
- Zacapa 23YO — 350/3,100 — same ✅
- *(Mount Gay Eclipse, Saigon-only, not observed in Hội An.)*

**Tequila** (glass/bottle)
- Jose Cuervo — 120/1,200 — same ✅
- Don Julio Blanco — 300/2,900 (Saigon: 310/2,900 — glass cheaper)
- *(1800 Blanco, Saigon-only, not observed in Hội An.)*

**Non-Alcohol** — different section, Vietnamese-coffee-forward
- Soft Drinks — **30** (Saigon: 45 — cheaper)
- Still/Sparkling "Lavie" Water 45cl — **45** (Saigon: 60 — cheaper)
- Mocktail — **100** (Saigon: 120 — cheaper)
- Juice of the Day — 75 — same ✅
- Vietnamese Coffee — 50 — **NEW, exclusive to Hội An**
- Espresso — 45 (Saigon bundles "Espresso/Cappuccino" at 60; Hội An splits them)
- Cappuccino — 50 — split out separately in Hội An
- Egg Coffee — 60 — **NEW, exclusive to Hội An**
- *(San Pellegrino, Apple Champagne "Chill Kombucha" — Saigon-only, not observed in Hội An.)*

**Drinks de la Casa (cocktails)** (glass/pitcher where noted)
- Classic Sangria — **160/475** (Saigon: 140/495 — glass pricier, pitcher cheaper)
- White Sangria — **160/475** (same delta pattern)
- Sangria Spritz — **170** (Saigon: 175 — cheaper)
- Tinto de Verano — **170** (Saigon: 140 — more expensive)
- Mango Shake — Brugal Blanco Rum, Mango — 170 — **NEW, not in Saigon**
- Red Bubbles — 170 (Saigon: 175 — cheaper)
- Negroni de Madrid — Bulldog Gin, Cizano Vermouth Rosso, Campari — **170** (Saigon's "Negroni," same ingredients: 175 — cheaper, renamed)
- Old Fashioned — **170** (Saigon: 175 — cheaper)
- Espresso Martini — Brugal Blanco Rum, Dalat Coffee — 170 — **NEW, not in Saigon**
- Herradura — Jose Cuervo Tequila, Lime, Cilantro — 170 — **NEW, not in Saigon**
- Bloody Mary — Skyy Vodka, Tomato Juice, Tabasco — 170 — **NEW, not in Saigon**
- *(Margarita, Mojito, Whisky Sour — Saigon-only, not observed in Hội An.)*

*Promo callout on divider: "Vino Wednesdays — 20% off all wines by bottle" (same promo as Saigon).*

---

## Footer/legal text differences worth noting
- Saigon PDF footer: "Prices are in VND. 000, excluding 5% service charge and 8–10% VAT (depending on items)."
- Hội An PDF footer: "Prices are in VND. 000, excluding 8–10% VAT (depending on items)." — **no mention of the 5% service charge** on most Hội An pages (present on the Embutidos page only). Worth confirming with the restaurant whether Hội An genuinely doesn't charge the 5% service fee, or if it's just an inconsistent PDF export — this affects the site's footnote copy if a separate Hội An menu section is built.
