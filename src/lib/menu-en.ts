// Full English IBÉRICO Saigon menu (source: "Saigon Menu.pdf"). Same shape as
// menu-zh.ts so both render through <FullMenu>. Prices are in thousands of VND.

import type { ZhItem, ZhSection } from "./menu-zh";

const i = (
  name: string,
  desc: string | undefined,
  ...prices: number[]
): ZhItem => ({ name, zh: name, desc, prices });

const w = (
  name: string,
  meta: string,
  desc: string,
  ...prices: number[]
): ZhItem => ({ name, zh: name, meta, desc, prices });

export const EN_INTRO = [
  "At Iberico Vinos y Tapas, we bring the true spirit of Spain to Vietnam—where good food, good wine, and good company are taken very seriously… but never too seriously.",
  "From premium jamón ibérico, croquetas, and patatas bravas to grilled specialties, fresh seafood, and indulgent desserts, every dish is made for sharing (or pretending to share).",
  "Whether you're here for a quick tapa, a long dinner, or a night that accidentally becomes a celebration, Iberico Vinos y Tapas is all about lively flavors, warm hospitality, and Mediterranean nights full of laughter, stories, and one more round.",
  "Right in the heart of Ho Chi Minh City and Hoi An—we bring Spain, you bring the appetite.",
];

export const EN_PROMOS = [
  {
    title: "Jamon-day",
    big: "20% off",
    line: "All Jamon plates on Monday",
  },
  {
    title: "Vino Wednesdays",
    big: "20% off",
    line: "All wines by bottle on Wednesday",
  },
];

export const EN_NOTE =
  "Prices in VND (thousands) · Excl. 5% service charge & 8–10% VAT (depending on items)";

export const EN_SECTIONS: ZhSection[] = [
  {
    id: "platters",
    title: "Platters",
    original: "",
    note: "All cold cuts are served with sourdough bread",
    groups: [
      {
        items: [
          i(
            "Tabla de Queso",
            "Truffled Manchego, Idiazábal, Aged Blue cheese, Quince Paste, Almonds",
            490
          ),
        ],
      },
      {
        columns: ["Small", "Big"],
        items: [
          i(
            "Tabla de Iberico",
            "Chorizo Iberico, Salchichón Iberico, Morcilla Iberico, Manchego Cheese, Marinated Olives",
            595,
            998
          ),
        ],
      },
    ],
    funFact:
      "“Experience the heritage of the Spanish Dehesa with premium acorn-fed Ibérico charcuterie.”",
  },
  {
    id: "embutidos",
    title: "Embutidos – Cold cuts",
    original: "",
    note: "All cold cuts are served with sourdough bread",
    groups: [
      {
        columns: ["50g", "100g"],
        items: [
          i(
            "Jamón Ibérico de Bellota “Pata Negra”",
            "Hand-cut Iberico acorn-fed ham. The VIP of cured hams! This rich, nutty, melt-in-your-mouth masterpiece comes from happy Iberian pigs feasting on acorns like it’s an all-you-can-eat buffet. Aged to perfection, each slice is a pure, silky indulgence, so good it might just ruin all other hams for you.",
            499,
            960
          ),
          i("Morcilla Ibérico", "Iberico Blood Sausage", 220, 350),
          i(
            "Chorizo Ibérico",
            "Iberico acorn-fed pork chorizo",
            220,
            350
          ),
          i(
            "Salchichón Ibérico",
            "Iberico acorn-fed pork salchichón",
            220,
            350
          ),
          i("Cecina Ibérica", "Aged & smoked beef ham", 290, 550),
        ],
      },
    ],
    funFact:
      "Fun fact! Spain has a “Ham Museum”! Museo del Jamón isn’t an actual museum, but a famous chain of ham shops and restaurants in Madrid.",
  },
  {
    id: "quesos",
    title: "Quesos – Cheeses",
    original: "",
    note: "All cheeses are served with sourdough bread · per 100g",
    groups: [
      {
        columns: ["100g"],
        items: [
          i(
            "Manchego Trufado",
            "Truffle Manchego aged. Comfort and luxury in one bite! Rich, nutty Manchego aged to perfection — pair it with a glass of wine and call it a perfect day!",
            280
          ),
          i("Manchego Cheese", "12 months cured Manchego cheese", 280),
          i("Idiazabal", "Idiazabal unpasteurized sheep cheese", 250),
          i("Queso Azul Madurado", "Aged Blue cheese", 180),
          i("Membrillo", "Quince paste", 75),
        ],
      },
    ],
    funFact:
      "Fun fact! Spain has more than 200 types of cheese, with Manchego being the most famous.",
  },
  {
    id: "mar",
    title: "Tapas del Mar – From the sea",
    original: "",
    intro:
      "Tapas from the sea brings together bright, briny flavors and simple, fresh ingredients—light, bold bites that capture the essence of the coast.",
    groups: [
      {
        items: [
          i("Sashimi Mediterráneo", "Mediterranean sashimi, capers", 235),
          i(
            "Ostras con Salsa Mignonette",
            "Oysters with Mignonette sauce · 5 units",
            150
          ),
          i(
            "Anchoas del Cantábrico",
            "Anchovies cured in olive oil, bread, tumaca",
            350
          ),
          i(
            "Boquerones en Vinagre con Chips",
            "Marinated white anchovies, potato chips",
            180
          ),
          i(
            "Mojama de Atún",
            "Mediterranean dry aged tuna, almond",
            250
          ),
          i(
            "Mar y Sal",
            "Seafood platter: Mojama & almonds, white anchovies & potato chips, cured anchovies, anchovy & olive skewers (Gildas), oysters",
            890
          ),
        ],
      },
    ],
  },
  {
    id: "picoteo",
    title: "Picoteo – Small Bite",
    original: "",
    intro:
      "Little bites, big vibes. Picoteo is all about sharing, snacking, and enjoying the moment—mix, match, and savor every bite together.",
    groups: [
      {
        items: [
          i(
            "Pan con Tumaca y Aioli",
            "Bread, tomato, aioli sauce. A classic from Spain, especially popular in Catalonia, traditionally made by rubbing ripe tomato onto toasted rustic bread with good olive oil and a pinch of salt.",
            70
          ),
          i(
            "Brioche de Atún con Chocolate Blanco",
            "Brioche, tuna, white chocolate · 2 units",
            170
          ),
          i("Olivas Fritas", "Stuffed fried olives · 3 units", 130),
          i("Aceitunas Ibérico", "Marinated olives", 110),
          i(
            "Almendras Fritas con Sal",
            "Fried almonds, salt & pepper",
            90
          ),
          i(
            "Gilda Ibérica",
            "Skewer of anchovy, olive, piparra · 2 units",
            135
          ),
        ],
      },
    ],
    funFact:
      "Fun fact! Pintxos are the Basque Country’s answer to tapas. Unlike regular tapas, pintxos are small bites skewered with a toothpick, often stacked on bread.",
  },
  {
    id: "clasicas",
    title: "Tapas Clásicas",
    original: "",
    intro:
      "A bite-sized tradition. Legend has it that tapas began as a simple cover for drinks, but they quickly became Spain’s favorite way to eat—small bites packed with big flavor!",
    groups: [
      {
        columns: ["6 units", "12 units"],
        note: "“Golden, crunchy, and filled with creamy béchamel and savory filling, croquetas are the ultimate comfort bite.”",
        items: [
          i(
            "Croquetas de Jamón",
            "Iberico ham croquettes",
            150,
            290
          ),
          i(
            "Croquetas de Setas con Crema de Manchego",
            "Mushroom croquetas, Manchego cheese mousse",
            135,
            265
          ),
        ],
      },
      {
        columns: ["Tapa", "Ración"],
        items: [
          i(
            "Tortilla de Patatas con Aioli",
            "Spanish omelette, aioli",
            90,
            150
          ),
          i(
            "Ensaladilla de Gambas",
            "Creamy potato salad, shrimp",
            150,
            255
          ),
          i(
            "Setas Escabeche con Crema de Manchego",
            "Mushroom escabeche, Manchego cheese mousse",
            120,
            215
          ),
        ],
      },
      {
        items: [
          i(
            "Gambas al Ajillo",
            "Iberico-style garlic prawns. Juicy prawns, garlic, and chili sizzle together in olive oil — best enjoyed fresh off the pan, with crusty bread ready to soak up every last drop.",
            265
          ),
          i("Patatas Bravas", "Spicy bravas potatoes", 120),
          i(
            "Patatas con Aioli",
            "Fried potatoes, aioli, pickled shallot",
            120
          ),
          i(
            "Mejillones en Escabeche con Chips",
            "Mussel escabeche, potato chips",
            165
          ),
          i(
            "Calamares Fritos con Aioli de Pimienta Negra",
            "Fried squid, black pepper aioli",
            225
          ),
          i("Almejas al Ajillo", "Garlic clams, tomato sauce", 225),
          i(
            "Gambas Fritas con Aioli de Limón y Wasabi",
            "Fried prawn, wasabi lemon aioli",
            195
          ),
          i(
            "Mero Frito con Pilpil Cítrico",
            "Fried grouper, citrus pilpil",
            190
          ),
        ],
      },
    ],
    funFact:
      "Fun fact! In Madrid, the famous “bocadillo de calamares” (fried calamari sandwich) is considered a local icon — even though Madrid is nowhere near the sea.",
  },
  {
    id: "casa",
    title: "Tapas de la Casa",
    original: "",
    intro:
      "A curated selection of house tapas, featuring a variety of Spanish flavors—perfect for sharing and discovering our signature bites.",
    groups: [
      {
        items: [
          i(
            "Bomba de Sobrasada",
            "Breaded potato filled with soft-cured pork spread",
            195
          ),
          i(
            "Tiradito del Dia",
            "Fish of the day, passion fruit tiger milk",
            190
          ),
          i("Ensalada de la Casa", "Green salad, hazelnut dressing", 95),
          i(
            "Escabeche de Coliflor Asada",
            "Roasted cauliflower escabeche",
            155
          ),
          i(
            "Calabacín Ahumado con Queso Idiazabal",
            "Smoked zucchini, Idiazabal cheese & fennel jam",
            165
          ),
          i(
            "Esparragos Blancos con Holandesa y Manchego",
            "White asparagus, hollandaise & Manchego",
            235
          ),
          i(
            "Arroz Meloso de Carrilleras y Judías",
            "“Creamy” rice of beef cheeks & green peas",
            325
          ),
          i(
            "Vieras con Jamon Iberico y Sopa de Maíz",
            "Scallops with Jamon Iberico & corn soup",
            295
          ),
          i(
            "Iberico Sando",
            "Iberico’s style pork sandwich, brioche",
            350
          ),
          i(
            "Pulpo Frito con Romesco",
            "Fried octopus, romesco sauce",
            290
          ),
          i(
            "Costilla de Iberico a la Barbacoa",
            "BBQ Iberico ribs, peanuts, pickled cabbage. Slow-cooked to perfection — juicy, smoky, and coated in a rich, flavorful barbecue glaze.",
            415
          ),
          i(
            "Secreto Ibérico con Brocolini y Pimientos Encurtidos",
            "Iberico secreto, broccolini, pickled bell pepper. A hidden gem of Spanish cuisine! Succulent, perfectly seared, with rich sherry jus.",
            495
          ),
          i(
            "Picaña a la Parrilla con Chimichurri",
            "Grilled picanha steak with chimichurri sauce. Known for its signature fat cap, grilled over open flame until beautifully charred on the outside and tender, juicy inside.",
            475
          ),
        ],
      },
    ],
    funFact:
      "Fun fact! The “bomba” got its name because it looks like a small bomb — crispy outside, explosive flavor inside.",
  },
  {
    id: "paella",
    title: "Paella",
    original: "",
    intro:
      "Big pan, bold flavors! Our paella is packed with saffron rice, smoky spices, and your choice of seafood—cooked low and slow for that crave-worthy crispy bottom. Perfect for sharing (or not…)",
    note: "It requires 25 mins to cook to perfection — please order some tapas while you wait · Served with aioli & lemon · Choose 1 flavor · Minimum order 2 pax per pan of paella",
    groups: [
      {
        columns: ["per pax"],
        items: [
          i(
            "Marisco",
            "Braised squid, clam, prawn, fish",
            275
          ),
          i(
            "Arroz Negro",
            "Black rice, squid, garlic chips",
            335
          ),
          i(
            "Vegetariana",
            "Broccoli, green asparagus, fennel, caramelized onion",
            215
          ),
        ],
      },
    ],
    funFact:
      "Fun fact! Each region in Spain has its own way of making paella. While Valencia prefers rabbit and snails, coastal areas love seafood, and some even add chorizo (though purists say that’s a crime!)",
  },
  {
    id: "postres",
    title: "Postres – Desserts",
    original: "",
    intro:
      "Sweet Spanish-style desserts to finish your meal — from creamy cheesecake and crispy churros with rich chocolate sauce to traditional torrija and refreshing ice cream.",
    groups: [
      {
        items: [
          i(
            "Tarta de Queso Manchego",
            "Manchego cheesecake. Burnt Basque cheesecake! Creamy, rich, and infused with the nutty, buttery goodness of Manchego cheese — sweet, slightly savory, and utterly irresistible, one slice might not be enough!",
            130
          ),
          i("Churros con Chocolate", "Churros and chocolate", 115),
          i(
            "Torrija Limón y Pomelo",
            "Spanish “French toast”, lemon cream, pomelo",
            155
          ),
          i(
            "Helados",
            "Chocolate, strawberry, lemon, coconut ice cream",
            75
          ),
        ],
      },
    ],
    funFact:
      "Fun fact! Many Spanish desserts, like churros and turrón, have centuries-old origins. From Moorish-inspired sweets to holiday traditions, Spain’s desserts are a delicious blend of history and flavor!",
  },
  {
    id: "bebidas",
    title: "Bebidas – Drinks",
    original: "",
    intro:
      "Explore a thoughtful collection of Spanish wines, handcrafted cocktails, house-made sangria, beers, and fine spirits—bringing together tradition, quality, and a touch of Mediterranean flair.",
    groups: [
      {
        title: "Sherry · serving 80ml",
        columns: ["Glass"],
        items: [
          i(
            "Canasta – Cream",
            "Oloroso, Pedro Ximénez · “Sweet & rich aromas of dried fruits, roasted toasted nuts”",
            120
          ),
          i(
            "Croft – Pale Cream",
            "100% Palomino · “Light and refreshing on the palate with a clean, honeyed, medium-dry sweet finish.”",
            140
          ),
          i(
            "Tio Pepe “Warhol” – Fino",
            "100% Palomino · “Dry and crisp with almond notes”",
            160
          ),
        ],
      },
      {
        title: "Cava – Sparkling Wine",
        columns: ["Glass", "Bottle"],
        items: [
          w(
            "Vega Medien Brut",
            "Spain · D.O. Cava · Macabeo, Chardonnay",
            "“Golden reflection, fine bubbles, persistent & elegant”",
            160,
            950
          ),
          w(
            "Conde de Haro Brut",
            "Spain · D.O. Cava · Viura, Chardonnay",
            "“Elegant apple and light brioche notes, balanced by a crisp, dry finish.”",
            1600
          ),
          w(
            "Chateau de Bligny Grande Reserve",
            "France · D.O. Champagne · Pinot Noir, Chardonnay",
            "“Elegant French Champagne with fine bubbles, creamy richness, and notes of ripe yellow fruit and toasted brioche”",
            2900
          ),
        ],
      },
      {
        title: "Rosado – Rosé Wine",
        columns: ["Bottle"],
        items: [
          w(
            "Muga Rose",
            "Spain · D.O. Rioja · Tempranillo",
            "“Fresh and lively with red berries and a crisp, dry finish.”",
            1000
          ),
          w(
            "Cote de Roses",
            "France · A.O. Languedoc · Grenache, Syrah, Cinsault",
            "“Elegant and refreshing with notes of strawberry, pink grapefruit”",
            1600
          ),
        ],
      },
      {
        title: "Tinto – Red Wine",
        columns: ["Glass", "Bottle"],
        items: [
          w(
            "Al Muvedre",
            "Spain · D.O. Alicante · Monastrell",
            "“Bold wine, full of dark fruits with expressive and spicy finish”",
            145,
            850
          ),
          w(
            "Les Terraces",
            "France · IGP Ardeche · Merlot, Syrah",
            "“Red berry flavours, a touch of pepper and an easy, smooth finish.”",
            155,
            890
          ),
          w(
            "El Jamon",
            "Spain · D.O. Cariñena · Garnacha",
            "“Bright and juicy with red cherry and strawberry notes, soft tannins.”",
            160,
            900
          ),
          w(
            "La Planta",
            "Spain · D.O. Ribera del Duero · Tempranillo",
            "“Structured and expressive with dark cherry, subtle oak”",
            170,
            980
          ),
          w(
            "Tomaresca Neprica",
            "Italy · IGT Puglia · Primitivo",
            "“Generous southern Italy red with juicy black fruit and velvety tannins”",
            1050
          ),
          w(
            "Palacio del Burgo Crianza",
            "Spain · D.O.Ca. Rioja · Tempranillo",
            "“Elegant and balanced with ripe red fruit, gentle oak and a smooth, savoury finish.”",
            1150
          ),
          w(
            "Sierra Cantabria Selection",
            "Spain · D.O.Ca. Rioja · Tempranillo",
            "“Refined and layered with dark berries, subtle oak and a long, polished finish.”",
            1200
          ),
          w(
            "Chateau Clou Du Pin Supérieur",
            "France · A.O. Bordeaux Supérieur · Merlot, Cabernet Sauvignon, Cabernet Franc",
            "“Generally characterized as having a deep color, full body, and a smooth, tannic structure”",
            1200
          ),
          w(
            "M.Chapoutier “Belleruche”",
            "France · A.O. Côtes du Rhône · Grenache, Syrah",
            "“Rich and fruity with notes of dark berries, subtle spice and a smooth, rounded”",
            1200
          ),
          w(
            "Marqués de Cáceres Crianza",
            "Spain · D.O.Ca. Rioja · Tempranillo",
            "“Elegant and well-balanced with berry flavours, oak complexity.”",
            1300
          ),
          w(
            "Carpineto Dogajolo",
            "Italy · IGT Toscana · Sangiovese, Cabernet Sauvignon",
            "“Vibrant and fruit-forward with cherry and blackberry notes, soft tannins”",
            1450
          ),
          w(
            "Cave de Lugny",
            "France · A.O.C. Bourgogne · Pinot Noir",
            "“Light and elegant with red cherry and raspberry notes, soft tannins.”",
            1550
          ),
          w(
            "Muga Reserva",
            "Spain · D.O.Ca Rioja · Tempranillo",
            "“Complex and refined with ripe red fruit, vanilla and spice”",
            1600
          ),
          w(
            "Chateau Haut Saint Brice Grand Cru",
            "France · A.O.C Saint-Émilion Grand Cru · Merlot, Cabernet Franc",
            "“Rich and structured with layers of dark plum, blackcurrant and refined oak, leading to a long elegant finish.”",
            1650
          ),
          w(
            "Finca San Martin Crianza",
            "Spain · D.O.Ca Rioja Alta · Tempranillo",
            "“Smooth and well-rounded with ripe cherry, vanilla and gentle oak notes.”",
            1800
          ),
          w(
            "Yllera Vendimia Seleccionada",
            "Spain · Vino de la Tierra de Castilla y León · Tempranillo, Syrah",
            "“Selected from best vineyards from Castilla y León that provide the complexity and sophistication. Aging 24 months in French & American oak barrels and several months in bottle.”",
            2150
          ),
          w(
            "Marqués de Vargas Reserva",
            "Spain · D.O.C.a. Rioja · Tempranillo, Garnacha, Mazuelo",
            "“Elegant Rioja Reserva with notes of ripe cherry, cedar, tobacco, and soft spice. Smooth tannins with a long refined finish.” – Chef favorite",
            2300
          ),
          w(
            "CVNE Imperial Gran Reserva",
            "Spain · D.O.Ca. Rioja · Tempranillo, Graciano, Mazuelo",
            "“A classic Rioja aged extensively in oak and bottle, offering layers of ripe red fruit, tobacco, leather and sweet spice. Silky tannins and remarkable balance lead to a long, complex finish.”",
            2750
          ),
        ],
      },
      {
        title: "Blanco – White Wine",
        columns: ["Glass", "Bottle"],
        items: [
          w(
            "Basa Blanco",
            "Spain · D.O. Rueda · Verdejo, Viura",
            "“Right balance between charming fruit and aromatic complexity”",
            140,
            850
          ),
          w(
            "Pietrame",
            "Italy · IGT Terre di Chieti · Pinot Grigio",
            "“Light and refreshing with pear, citrus and delicate floral notes”",
            150,
            870
          ),
          w(
            "Lobetia Organic",
            "Spain · Vino de la Tierra de Castilla · Chardonnay",
            "“Fresh and smooth with ripe apple and tropical fruit notes, balanced”",
            160,
            900
          ),
          w(
            "Finca Luzon Blanco",
            "Spain · D.O. Jumilla · Macabeo, Sauvignon Blanc",
            "“Fresh and aromatic with citrus notes and a crisp finish.”",
            170,
            970
          ),
          w(
            "Pago Mota",
            "Spain · Vino de la Tierra de Castilla · Chardonnay",
            "“Citrus and subtle vanilla notes from light oak ageing.”",
            1000
          ),
          w(
            "Les Terraces",
            "France · IGP Ardeche · Sauvignon Blanc, Grenache Blanc",
            "“Lively and refreshing with bright citrus, subtle floral notes”",
            1200
          ),
          w(
            "Faustino Rivero Ulecia",
            "Spain · D.O. Rias Baixas · Albariño",
            "“Zesty with notes of lime, white peach and a hint of salinity”",
            1350
          ),
          w(
            "Muga Blanco",
            "Spain · D.O.Ca. Rioja · Viura, Garnacha Blanca, Malvasía",
            "“Fermented and aged in oak, giving subtle vanilla and toasted almond notes”",
            1400
          ),
          w(
            "Besthiem Chassuer de Lune Collection",
            "France · A.O. Alsace · Riesling",
            "“Crisp and mineral with vibrant citrus, green apple and delicate floral notes.”",
            1500
          ),
          w(
            "Masion Louis Latour",
            "France · A.O. Bourgogne · Chardonnay",
            "“Elegant and rounded with notes of ripe apple, citrus and subtle butter”",
            1800
          ),
        ],
      },
      {
        title: "Drinks de la Casa",
        note: "“A perfect mix of wine, fresh fruit, and a lively Mediterranean spirit.”",
        columns: ["Glass", "Pitcher"],
        items: [
          i(
            "Classic Sangria",
            "Red wine, mixed fruit, Skyy vodka, cinnamon syrup",
            140,
            495
          ),
          i(
            "White Sangria",
            "White wine, peach syrup, gin, mixed fruit",
            140,
            495
          ),
        ],
      },
      {
        columns: ["Glass"],
        items: [
          i(
            "Sangria Spritz",
            "Aperol, sweet vermouth, orange juice, cava, soda",
            175
          ),
          i("Tinto de Verano", "Red wine, Sprite, lime juice", 140),
          i(
            "Negroni",
            "Bulldog gin, Cizano vermouth rosso, Campari",
            175
          ),
          i(
            "Margarita",
            "Jose Cuervo tequila, lime, Bols triple sec",
            175
          ),
          i("Mojito", "Brugal Blanco rum, mint, soda", 175),
          i(
            "Old Fashion",
            "Bushmills Original whisky, bitter, orange",
            175
          ),
          i(
            "Whisky Sour",
            "Wild Turkey whisky, egg white, lime, bitter",
            175
          ),
          i("Red Bubbles", "Aperol, sparkling wine, soda, orange", 175),
        ],
      },
      {
        title: "Cerveza",
        columns: ["Bottle"],
        items: [
          i(
            "Estrella Galicia Lager 5%",
            "“A true icon of Spanish beer ★”",
            95
          ),
          i("1906 Reserva 6.5%", undefined, 95),
          i("Asahi 5%", undefined, 95),
          i("Huda 4.7%", undefined, 60),
        ],
      },
      {
        title: "Whisky",
        columns: ["Glass", "Bottle"],
        items: [
          i("High Commissionner", undefined, 150, 1400),
          i("Bushmills Original", undefined, 150, 1400),
          i("Wild Turkey 81", undefined, 150, 1400),
          i("Maker’s Mark", undefined, 190, 1800),
          i("Monkey Shoulder", undefined, 200, 2100),
          i("Singleton 12YO", undefined, 220, 2600),
          i("Macallan 12YO", undefined, 350, 4300),
        ],
      },
      {
        title: "Brandy & Cognac",
        columns: ["Glass", "Bottle"],
        items: [
          i("St-Remy VSOP", undefined, 160, 1450),
          i("Brandy Lustau Solera Reserva", undefined, 200, 2000),
        ],
      },
      {
        title: "Vodka",
        columns: ["Glass", "Bottle"],
        items: [
          i("Skyy", undefined, 150, 1400),
          i("Ketel One", undefined, 180, 1700),
        ],
      },
      {
        title: "Gin",
        columns: ["Glass", "Bottle"],
        items: [
          i(
            "Nordes Atlantic",
            "“Nordés is a premium Atlantic Galician gin from Spain, famed for its distinctively fresh and fruity profile.”",
            190,
            1950
          ),
          i("Bulldog", undefined, 160, 1400),
          i("Roku", undefined, 170, 1800),
        ],
      },
      {
        title: "Rum",
        columns: ["Glass", "Bottle"],
        items: [
          i("Brugal Blanco", undefined, 130, 1400),
          i("Mount Gay Eclipse", undefined, 130, 1400),
          i("Zacapa 23YO", undefined, 350, 3100),
        ],
      },
      {
        title: "Tequila",
        columns: ["Glass", "Bottle"],
        items: [
          i("Jose Cuervo", undefined, 120, 1200),
          i("1800 Blanco", undefined, 200, 2100),
          i("Don Julio Blanco", undefined, 310, 2900),
        ],
      },
      {
        title: "Non-Alcohol",
        items: [
          i("Soft Drinks", undefined, 45),
          i("Still / Sparkling “Lavie” Water 45cl", undefined, 60),
          i("San Pellegrino 75cl", undefined, 120),
          i("Apple Champagne “Chill Kombucha”", undefined, 120),
          i("Mocktail", "“Bartender selection of the day”", 120),
          i("Juice of the day", undefined, 75),
          i("Espresso / Cappuccino", undefined, 60),
        ],
      },
    ],
  },
];
