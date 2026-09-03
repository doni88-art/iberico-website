"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "vi" | "es";

export interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}

export interface MenuCategory {
  label: string;
  items: MenuItem[];
}

export interface LocationInfo {
  name: string;
  area: string;
  address: string;
  hours: string;
  capacity: string;
  phone: string;
  mapQuery: string;
  lat: number;
  lng: number;
  blurb: string;
}

export interface Dict {
  meta: { skipToContent: string };
  marquee: string[];
  nav: {
    story: string;
    menu: string;
    gallery: string;
    locations: string;
    events: string;
    careers: string;
    reserve: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    scroll: string;
  };
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
  story: {
    eyebrow: string;
    title: string;
    body: string;
    quote: string;
    quoteAuthor: string;
    stats: { value: string; label: string }[];
  };
  menu: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    categories: MenuCategory[];
    hoianNote: string;
    hoianCategories: MenuCategory[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  press: {
    eyebrow: string;
    title: string;
    items: { quote: string; source: string }[];
    ratingLabel: string;
  };
  locations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: LocationInfo[];
    directions: string;
  };
  events: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
    cta: string;
  };
  careers: {
    eyebrow: string;
    title: string;
    subtitle: string;
    applyCta: string;
    emailNote: string;
    positions: {
      title: string;
      type: string;
      department: string;
      description: string;
    }[];
  };
  reservation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    location: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitWhatsApp: string;
    submitZalo: string;
    submitting: string;
    success: string;
    successBody: string;
    another: string;
    required: string;
    whatsapp: string;
    zalo: string;
    orContact: string;
    call: string;
    emailUs: string;
    lateNote: string;
    zaloCopied: string;
  };
  footer: {
    tagline: string;
    visit: string;
    connect: string;
    rights: string;
    madeWith: string;
  };
}

const en: Dict = {
  meta: { skipToContent: "Skip to content" },
  marquee: [
    "Best Spanish Restaurant · Gourmet Vietnam Awards 2025",
    "Hand-Carved Jamón Ibérico de Bellota",
    "Ho Chi Minh City · Hội An",
    "Spanish Tapas y Vino Since 2021",
  ],
  nav: {
    story: "Our Story",
    menu: "Menu",
    gallery: "Gallery",
    locations: "Locations",
    events: "Events",
    careers: "Careers",
    reserve: "Reserve",
  },
  hero: {
    eyebrow: "Vinos y Tapas · Saigon · Est. 2021",
    title1: "Tapas",
    title2: "y Vino",
    subtitle:
      "Iberian tapas and Spanish wine, unhurried — in the heart of Ho Chi Minh City.",
    cta1: "Reserve a Table",
    cta2: "View Menu",
    scroll: "Scroll",
  },
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
  story: {
    eyebrow: "Our Story",
    title: "The Living Spirit of Spanish Dining in Vietnam",
    body: "Founded in 2021, IBÉRICO brought Spain's tapas spirit to Vietnam: hand-sliced jamón, garlicky prawns hot off the pan, paella built for the table. Order by instinct, share everything, linger long — now three houses strong, from Saigon to the river in Hội An.",
    quote: "Best Spanish Restaurant in Vietnam.",
    quoteAuthor: "Gourmet Vietnam Awards, 2025",
    stats: [
      { value: "2021", label: "Founded in Saigon" },
      { value: "3", label: "Locations across Vietnam" },
      { value: "2025", label: "Best Spanish Restaurant, Gourmet Vietnam Awards" },
      { value: "4.7–4.9★", label: "Guest rating" },
    ],
  },
  menu: {
    eyebrow: "The Menu",
    title: "A menu built for sharing",
    subtitle:
      "Cold cuts, hot tapas, and dishes from the pan — order two or three per person, family-style, the way it's meant to be.",
    note: "Prices in VND (thousands) · Excl. 5% service charge & 8–10% VAT",
    categories: [
      {
        label: "Jamón, Embutidos & Quesos",
        items: [
          {
            name: 'Jamón Ibérico de Bellota "Pata Negra"',
            desc: "Hand-cut acorn-fed Iberian ham, carved to order — the VIP of cured hams (50g / 100g)",
            price: "499,000₫ / 960,000₫",
            tag: "Signature",
          },
          {
            name: "Tabla de Ibérico",
            desc: "Chorizo, salchichón & morcilla ibérico, Manchego, marinated olives (small / big)",
            price: "595,000₫ / 998,000₫",
          },
          {
            name: "Chorizo Ibérico",
            desc: "Acorn-fed pork chorizo, hand-sliced (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Salchichón Ibérico",
            desc: "Acorn-fed pork salchichón, hand-sliced (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Morcilla Ibérico",
            desc: "Iberico blood sausage, hand-sliced (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Cecina Ibérica",
            desc: "Aged & smoked beef ham (50g / 100g)",
            price: "290,000₫ / 550,000₫",
          },
          {
            name: "Tabla de Queso",
            desc: "Truffled Manchego, Idiazábal, aged blue cheese, quince paste, almonds",
            price: "490,000₫",
          },
          {
            name: "Manchego Trufado",
            desc: "Truffle-aged Manchego, comfort and luxury in one bite",
            price: "280,000₫",
          },
          {
            name: "Manchego Cheese",
            desc: "12-month cured Manchego",
            price: "280,000₫",
          },
          {
            name: "Idiazábal",
            desc: "Unpasteurized sheep's-milk cheese",
            price: "250,000₫",
          },
          {
            name: "Queso Azul Madurado",
            desc: "Aged blue cheese",
            price: "180,000₫",
          },
          {
            name: "Membrillo",
            desc: "Quince paste",
            price: "75,000₫",
          },
        ],
      },
      {
        label: "Tapas del Mar",
        items: [
          {
            name: "Sashimi Mediterráneo",
            desc: "Mediterranean-style sashimi, capers",
            price: "235,000₫",
          },
          {
            name: "Ostras con Salsa Mignonette",
            desc: "Fresh oysters, mignonette sauce — 5 units",
            price: "150,000₫",
          },
          {
            name: "Anchoas del Cantábrico",
            desc: "Cantabrian anchovies cured in olive oil, toasted bread",
            price: "350,000₫",
          },
          {
            name: "Boquerones en Vinagre con Chips",
            desc: "Marinated white anchovies, potato chips",
            price: "180,000₫",
          },
          {
            name: "Mojama de Atún",
            desc: "Mediterranean dry-aged tuna, almonds",
            price: "250,000₫",
          },
          {
            name: "Mar y Sal",
            desc: "Mojama, oysters, gildas, anchovies & boquerones platter",
            price: "890,000₫",
            tag: "Signature",
          },
        ],
      },
      {
        label: "Picoteo",
        items: [
          {
            name: "Pan con Tumaca y Aioli",
            desc: "Toasted bread, ripe tomato, garlic aioli",
            price: "70,000₫",
          },
          {
            name: "Gilda Ibérica",
            desc: "Skewered anchovy, olive & piparra pepper — 2 units",
            price: "135,000₫",
          },
          {
            name: "Brioche de Atún con Chocolate Blanco",
            desc: "Brioche, tuna, white chocolate — 2 units",
            price: "170,000₫",
          },
          {
            name: "Olivas Fritas",
            desc: "Stuffed fried olives — 3 units",
            price: "130,000₫",
          },
          {
            name: "Aceitunas Ibérico",
            desc: "Marinated olives",
            price: "110,000₫",
          },
          {
            name: "Almendras Fritas con Sal",
            desc: "Fried almonds, salt & pepper",
            price: "90,000₫",
          },
        ],
      },
      {
        label: "Tapas Clásicas",
        items: [
          {
            name: "Croquetas de Jamón",
            desc: "Iberico ham croquettes, crisp golden shell — 6 / 12 units",
            price: "150,000₫ / 290,000₫",
            tag: "Best Seller",
          },
          {
            name: "Croquetas de Setas con Crema de Manchego",
            desc: "Mushroom croquettes, Manchego cheese mousse — 6 / 12 units",
            price: "135,000₫ / 265,000₫",
          },
          {
            name: "Gambas al Ajillo",
            desc: "Iberico-style garlic prawns, sizzled in olive oil",
            price: "265,000₫",
            tag: "Signature",
          },
          {
            name: "Tortilla de Patatas con Aioli",
            desc: "Slow-cooked Spanish omelette, aioli (tapa / ración)",
            price: "90,000₫ / 150,000₫",
          },
          {
            name: "Ensaladilla de Gambas",
            desc: "Creamy potato salad, shrimp (tapa / ración)",
            price: "150,000₫ / 255,000₫",
          },
          {
            name: "Setas Escabeche con Crema de Manchego",
            desc: "Mushroom escabeche, Manchego cheese mousse (tapa / ración)",
            price: "120,000₫ / 215,000₫",
          },
          {
            name: "Patatas Bravas",
            desc: "Spicy bravas potatoes, garlic aioli",
            price: "120,000₫",
          },
          {
            name: "Patatas con Aioli",
            desc: "Fried potatoes, garlic aioli, pickled shallot",
            price: "120,000₫",
          },
          {
            name: "Mejillones en Escabeche con Chips",
            desc: "Mussel escabeche, potato chips",
            price: "165,000₫",
          },
          {
            name: "Calamares Fritos con Aioli de Pimienta Negra",
            desc: "Fried squid, black pepper aioli",
            price: "225,000₫",
          },
          {
            name: "Almejas al Ajillo",
            desc: "Garlic clams, tomato sauce",
            price: "225,000₫",
          },
          {
            name: "Gambas Fritas con Aioli de Limón y Wasabi",
            desc: "Fried prawn, wasabi-lemon aioli",
            price: "195,000₫",
          },
          {
            name: "Mero Frito con Pilpil Cítrico",
            desc: "Fried grouper, citrus pilpil",
            price: "190,000₫",
          },
        ],
      },
      {
        label: "Tapas de la Casa",
        items: [
          {
            name: "Ensalada de la Casa",
            desc: "Green salad, hazelnut dressing",
            price: "95,000₫",
          },
          {
            name: "Escabeche de Coliflor Asada",
            desc: "Roasted cauliflower escabeche",
            price: "155,000₫",
          },
          {
            name: "Calabacín Ahumado con Queso Idiazábal",
            desc: "Smoked zucchini, Idiazábal cheese & fennel jam",
            price: "165,000₫",
          },
          {
            name: "Espárragos Blancos con Holandesa y Manchego",
            desc: "White asparagus, hollandaise sauce & Manchego",
            price: "235,000₫",
          },
          {
            name: "Bomba de Sobrasada",
            desc: "Breaded potato filled with soft-cured pork spread",
            price: "195,000₫",
          },
          {
            name: "Tiradito del Día",
            desc: "Fish of the day, passion fruit tiger's milk",
            price: "190,000₫",
          },
          {
            name: "Arroz Meloso de Carrilleras y Judías",
            desc: '"Creamy" rice of braised beef cheeks & green peas',
            price: "325,000₫",
          },
          {
            name: "Vieras con Jamón Ibérico y Sopa de Maíz",
            desc: "Seared scallops with jamón ibérico & corn soup",
            price: "295,000₫",
          },
          {
            name: "Iberico Sando",
            desc: "Iberico-style pork sandwich, brioche",
            price: "350,000₫",
          },
          {
            name: "Pulpo Frito con Romesco",
            desc: "Fried octopus, romesco sauce",
            price: "290,000₫",
          },
          {
            name: "Costilla de Ibérico a la Barbacoa",
            desc: "BBQ Iberico ribs, peanuts, pickled cabbage",
            price: "415,000₫",
          },
          {
            name: "Secreto Ibérico con Brocolini y Pimientos Encurtidos",
            desc: "Seared Iberico secreto, broccolini, pickled bell pepper, sherry jus",
            price: "495,000₫",
          },
          {
            name: "Picaña a la Parilla con Chimichurri",
            desc: "Grilled picanha steak, chimichurri sauce",
            price: "475,000₫",
          },
        ],
      },
      {
        label: "Paella",
        items: [
          {
            name: "Paella Marisco",
            desc: "Braised squid, clam, prawn & fish — min. 2 pax, per pax",
            price: "275,000₫",
          },
          {
            name: "Arroz Negro",
            desc: "Black rice, squid, garlic chips — min. 2 pax, per pax",
            price: "335,000₫",
            tag: "Signature",
          },
          {
            name: "Paella Vegetariana",
            desc: "Broccoli, green asparagus, fennel, caramelized onion — per pax",
            price: "215,000₫",
          },
        ],
      },
      {
        label: "Postres",
        items: [
          {
            name: "Tarta de Queso Manchego",
            desc: "Burnt Basque cheesecake, infused with Manchego",
            price: "130,000₫",
          },
          {
            name: "Churros con Chocolate",
            desc: "Warm churros, rich chocolate dip",
            price: "115,000₫",
          },
          {
            name: "Torrija Limón y Pomelo",
            desc: "Spanish \"French toast\", lemon cream, pomelo",
            price: "155,000₫",
          },
          {
            name: "Helados",
            desc: "Chocolate, strawberry, lemon or coconut ice cream",
            price: "75,000₫",
          },
        ],
      },
      {
        label: "Vinos & Bebidas",
        items: [
          {
            name: "Classic Sangría (glass / pitcher)",
            desc: "Red wine, mixed fruit, vodka, cinnamon syrup",
            price: "140,000₫ / 495,000₫",
            tag: "Signature",
          },
          {
            name: "White Sangría (glass / pitcher)",
            desc: "White wine, peach syrup, gin, mixed fruit",
            price: "140,000₫ / 495,000₫",
          },
          {
            name: "Sangría Spritz",
            desc: "Aperol, sweet vermouth, orange juice, cava, soda",
            price: "175,000₫",
          },
          {
            name: "Negroni",
            desc: "Bulldog gin, sweet vermouth, Campari",
            price: "175,000₫",
          },
          {
            name: "Old Fashioned",
            desc: "Bushmills whisky, bitters, orange",
            price: "175,000₫",
          },
          {
            name: "Tinto de Verano",
            desc: "Red wine, Sprite, lime — Spain's summer classic",
            price: "140,000₫",
          },
          {
            name: "Margarita",
            desc: "Jose Cuervo tequila, lime, triple sec",
            price: "175,000₫",
          },
          {
            name: "Mojito",
            desc: "Brugal white rum, mint, soda — Cuban classic",
            price: "175,000₫",
          },
          {
            name: "Whisky Sour",
            desc: "Wild Turkey whisky, egg white, lime, bitters",
            price: "175,000₫",
          },
          {
            name: "Red Bubbles",
            desc: "Aperol, sparkling wine, soda, orange",
            price: "175,000₫",
          },
          {
            name: "Vega Medien Brut Cava (glass / bottle)",
            desc: "D.O. Cava — golden, fine bubbles, elegant",
            price: "160,000₫ / 950,000₫",
          },
          {
            name: "Muga Rosé (bottle)",
            desc: "D.O. Rioja — fresh red berries, crisp finish",
            price: "1,000,000₫",
          },
          {
            name: "Basa Blanco (glass / bottle)",
            desc: "D.O. Rueda — Verdejo & Viura, charming fruit and aromatics",
            price: "140,000₫ / 850,000₫",
          },
          {
            name: "Faustino Rivero Ulecia (bottle)",
            desc: "D.O. Rías Baixas Albariño — zesty lime, white peach",
            price: "1,350,000₫",
          },
          {
            name: "La Planta (glass / bottle)",
            desc: "D.O. Ribera del Duero Tempranillo — structured, dark cherry",
            price: "170,000₫ / 980,000₫",
          },
          {
            name: "Marqués de Vargas Reserva (bottle)",
            desc: "D.O.Ca. Rioja — ripe cherry, cedar, tobacco",
            price: "2,300,000₫",
            tag: "Chef's Pick",
          },
          {
            name: 'Tío Pepe "Warhol" Fino (glass)',
            desc: "100% Palomino sherry — dry & crisp, almond notes",
            price: "160,000₫",
          },
          {
            name: "Estrella Galicia Lager (bottle)",
            desc: "A true icon of Spanish beer",
            price: "95,000₫",
          },
          {
            name: "1906 Reserva Lager (bottle)",
            desc: "Galician amber lager, malty and full-bodied",
            price: "95,000₫",
          },
          {
            name: "Asahi Lager (bottle)",
            desc: "Japanese lager, dry and crisp",
            price: "95,000₫",
          },
          {
            name: "Huda Lager (bottle)",
            desc: "Vietnamese lager, easy-drinking local favorite",
            price: "60,000₫",
          },
        ],
      },
      {
        label: "Spirits",
        items: [
          {
            name: "High Commissionner",
            desc: "Whisky · Blended Scotch, easy and smooth",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Bushmills Original",
            desc: "Whisky · Irish blend, light and honeyed",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Wild Turkey 81",
            desc: "Whisky · Kentucky bourbon, bold rye spice",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Maker's Mark",
            desc: "Whisky · Wheated bourbon, soft caramel finish",
            price: "190,000₫ / 1,800,000₫",
          },
          {
            name: "Monkey Shoulder",
            desc: "Whisky · Blended malt Scotch, rich and rounded",
            price: "200,000₫ / 2,100,000₫",
          },
          {
            name: "Singleton 12YO",
            desc: "Whisky · Single malt, aged 12 years, orchard fruit",
            price: "220,000₫ / 2,600,000₫",
          },
          {
            name: "Macallan 12YO",
            desc: "Whisky · Single malt, aged 12 years, sherry oak depth",
            price: "350,000₫ / 4,300,000₫",
          },
          {
            name: "St-Remy VSOP",
            desc: "Brandy · French VSOP, warm and mellow",
            price: "160,000₫ / 1,450,000₫",
          },
          {
            name: "Brandy Lustau Solera Reserva",
            desc: "Brandy · Spanish Solera Reserva, raisin and oak",
            price: "200,000₫ / 2,000,000₫",
          },
          {
            name: "Skyy",
            desc: "Vodka · American, clean and crisp",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Ketel One",
            desc: "Vodka · Dutch wheat vodka, silky smooth",
            price: "180,000₫ / 1,700,000₫",
          },
          {
            name: "Nordes Atlantic",
            desc: "Gin · Galician, floral with a hint of albariño grape",
            price: "190,000₫ / 1,950,000₫",
          },
          {
            name: "Bulldog",
            desc: "Gin · London Dry, juniper-forward",
            price: "160,000₫ / 1,400,000₫",
          },
          {
            name: "Roku",
            desc: "Gin · Japanese, six botanicals, delicate and citrusy",
            price: "170,000₫ / 1,800,000₫",
          },
          {
            name: "Brugal Blanco",
            desc: "Rum · Dominican white rum, light and clean",
            price: "130,000₫ / 1,400,000₫",
          },
          {
            name: "Mount Gay Eclipse",
            desc: "Rum · Barbadian gold rum, banana and toffee",
            price: "130,000₫ / 1,400,000₫",
          },
          {
            name: "Zacapa 23YO",
            desc: "Rum · Guatemalan, aged 23 years, dried fruit and spice",
            price: "350,000₫ / 3,100,000₫",
          },
          {
            name: "Jose Cuervo",
            desc: "Tequila · Blanco, classic and peppery",
            price: "120,000₫ / 1,200,000₫",
          },
          {
            name: "1800 Blanco",
            desc: "Tequila · Blanco, 100% agave, citrus and pepper",
            price: "200,000₫ / 2,100,000₫",
          },
          {
            name: "Don Julio Blanco",
            desc: "Tequila · Blanco, 100% agave, smooth and refined",
            price: "310,000₫ / 2,900,000₫",
          },
        ],
      },
      {
        label: "Non-Alcohol",
        items: [
          {
            name: "Soft Drinks",
            desc: "Coca-Cola, Sprite, or soda — chilled and simple",
            price: "45,000₫",
          },
          {
            name: "Agua Lavie Con/Sin Gas",
            desc: "Still or sparkling water, 45cl",
            price: "60,000₫",
          },
          {
            name: "San Pellegrino",
            desc: "Italian sparkling mineral water, 75cl",
            price: "120,000₫",
          },
          {
            name: 'Sidra de Manzana "Chill Kombucha"',
            desc: "Sparkling apple kombucha, a playful non-alcoholic fizz",
            price: "120,000₫",
          },
          {
            name: "Mocktail del Día",
            desc: "Bartender's non-alcoholic selection of the day",
            price: "120,000₫",
          },
          {
            name: "Zumo del Día",
            desc: "Fresh-pressed juice, changes daily",
            price: "75,000₫",
          },
          {
            name: "Espresso / Cappuccino",
            desc: "Italian coffee, your way",
            price: "60,000₫",
          },
        ],
      },
    ],
    hoianNote: "Prices in VND (thousands) · Excl. 8–10% VAT",
    hoianCategories: [
      {
        label: "Exclusive Set Menus",
        items: [
          {
            name: "Bellota Set Menu",
            desc: "Pan con Tumaca, Almendras Fritas, Croquetas de Jamón, Almejas al Ajillo, Patatas Bravas & Setas Escabeche — a full tasting, family-style",
            price: "345,000₫ / pax",
          },
          {
            name: "Pata Negra Set Menu",
            desc: "Everything in the Bellota menu, plus Calamares Fritos, Ensaladilla de Gambas, Idiazábal & Churros con Chocolate",
            price: "595,000₫ / pax",
          },
        ],
      },
      {
        label: "Jamón, Embutidos & Quesos",
        items: [
          {
            name: 'Jamón Ibérico de Bellota "Pata Negra"',
            desc: "Hand-cut acorn-fed Iberian ham, carved to order — the VIP of cured hams (50g / 100g)",
            price: "499,000₫ / 960,000₫",
            tag: "Signature",
          },
          {
            name: "Tabla de Ibérico",
            desc: "Chorizo, salchichón & morcilla ibérico, Manchego, marinated olives (small / big)",
            price: "450,000₫ / 960,000₫",
          },
          {
            name: "Tabla de Queso",
            desc: "Truffled Manchego, Idiazábal, aged blue cheese, quince paste, almonds",
            price: "425,000₫",
          },
          {
            name: "Chorizo Ibérico",
            desc: "Acorn-fed pork chorizo, hand-sliced (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Salchichón Ibérico",
            desc: "Acorn-fed pork salchichón, hand-sliced (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Morcilla Ibérico",
            desc: "Iberico blood sausage, hand-sliced (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Cecina Ibérica",
            desc: "Aged & smoked beef ham (50g / 100g)",
            price: "290,000₫ / 550,000₫",
          },
          {
            name: "Manchego Trufado",
            desc: "Truffle-aged Manchego, comfort and luxury in one bite",
            price: "280,000₫",
          },
          {
            name: "Manchego Cheese",
            desc: "12-month cured Manchego",
            price: "280,000₫",
          },
          {
            name: "Idiazábal",
            desc: "Unpasteurized sheep's-milk cheese",
            price: "250,000₫",
          },
          {
            name: "Membrillo",
            desc: "Quince paste",
            price: "75,000₫",
          },
        ],
      },
      {
        label: "Tapas del Mar",
        items: [
          {
            name: "Anchoas del Cantábrico",
            desc: "Cantabrian anchovies cured in olive oil, toasted bread",
            price: "350,000₫",
          },
          {
            name: "Mojama de Atún",
            desc: "Mediterranean dry-aged tuna, almonds",
            price: "210,000₫",
          },
        ],
      },
      {
        label: "Pintxos - Bites",
        items: [
          {
            name: "Tabla de Pintxos - Bites Platter",
            desc: '"Choose 5" sharing platter of our pintxos',
            price: "190,000₫",
            tag: "Signature",
          },
          {
            name: "Cono de Pollo Ahumado y Zanahoria Encurtida",
            desc: "Smoked chicken cream, pickled carrot cone",
            price: "40,000₫",
          },
          {
            name: "Rollito de Gamba y Menta con Salsa de Chile Dulce",
            desc: "Prawn & mint roll, sweet chilli sauce",
            price: "40,000₫",
          },
          {
            name: "Tartaleta de Salmorejo y Jamón",
            desc: "Salmorejo tartlet, Iberico ham",
            price: "40,000₫",
          },
          {
            name: "Aceituna Rellena Frita",
            desc: "Stuffed fried olive",
            price: "40,000₫",
          },
          {
            name: "Airbag de Sardina Ahumada y Chalota Encurtida",
            desc: 'Crisp "airbag" cracker, smoked sardine, pickled shallot',
            price: "40,000₫",
          },
        ],
      },
      {
        label: "Picoteo",
        items: [
          {
            name: "Pan con Tumaca y Aioli",
            desc: "Toasted bread, ripe tomato, garlic aioli",
            price: "70,000₫",
          },
          {
            name: "Aceitunas Ibérico",
            desc: "Marinated olives",
            price: "95,000₫",
          },
          {
            name: "Almendras Fritas con Sal",
            desc: "Fried almonds, salt & pepper",
            price: "75,000₫",
          },
          {
            name: "Gilda Ibérica",
            desc: "Skewered anchovy, olive & piparra pepper — 2 units",
            price: "135,000₫",
          },
        ],
      },
      {
        label: "Tapas Clásicas",
        items: [
          {
            name: "Croquetas de Jamón",
            desc: "Iberico ham croquettes, crisp golden shell — 6 / 12 units",
            price: "160,000₫ / 280,000₫",
            tag: "Best Seller",
          },
          {
            name: "Croquetas de Setas con Crema de Manchego",
            desc: "Mushroom croquettes, Manchego cheese mousse — 6 / 12 units",
            price: "135,000₫ / 265,000₫",
          },
          {
            name: "Tortilla de Patatas con Aioli",
            desc: "Slow-cooked Spanish omelette, aioli (tapa / ración)",
            price: "105,000₫ / 180,000₫",
          },
          {
            name: "Ensaladilla de Gambas",
            desc: "Creamy potato salad, shrimp (tapa / ración)",
            price: "135,000₫ / 240,000₫",
          },
          {
            name: "Setas Escabeche con Crema de Manchego",
            desc: "Mushroom escabeche, Manchego cheese mousse (tapa / ración)",
            price: "105,000₫ / 205,000₫",
          },
          {
            name: "Gambas al Ajillo",
            desc: "Iberico-style garlic prawns, sizzled in olive oil",
            price: "255,000₫",
            tag: "Signature",
          },
          {
            name: "Patatas Bravas",
            desc: "Spicy bravas potatoes, garlic aioli",
            price: "120,000₫",
          },
          {
            name: "Patatas con Aioli",
            desc: "Fried potatoes, garlic aioli, pickled shallot",
            price: "120,000₫",
          },
          {
            name: "Mejillones en Escabeche con Chips",
            desc: "Mussel escabeche, potato chips",
            price: "135,000₫",
          },
          {
            name: "Calamares Fritos con Aioli de Pimienta Negra",
            desc: "Fried squid, black pepper aioli",
            price: "225,000₫",
          },
          {
            name: "Berenjenas Fritas con Miel",
            desc: "Fried eggplant, drizzled with honey",
            price: "115,000₫",
          },
          {
            name: "Ensalada de la Casa",
            desc: "Green salad, hazelnut dressing",
            price: "95,000₫",
          },
          {
            name: "Almejas al Ajillo",
            desc: "Garlic clams, tomato sauce",
            price: "195,000₫",
          },
          {
            name: "Col a la Parrilla",
            desc: "Grilled cabbage, leeks, romesco sauce & Manchego",
            price: "175,000₫",
          },
        ],
      },
      {
        label: "Tapas de la Casa",
        items: [
          {
            name: "Carne a la Parilla con Chimichurri",
            desc: "Chef's cut steak, potato cake, chimichurri sauce",
            price: "395,000₫",
            tag: "Signature",
          },
          {
            name: "Pollo Relleno a la Trufa",
            desc: "Chicken ballotine, pickled carrot, truffle jus",
            price: "225,000₫",
          },
          {
            name: "Pescado de la Bahía",
            desc: "Fish of the day, pisto, fried leeks",
            price: "350,000₫",
          },
          {
            name: "Spaguetti a la Marinera",
            desc: "Seafood spaghetti, garlic prawns, smoked tomato",
            price: "235,000₫",
          },
        ],
      },
      {
        label: "Paella",
        items: [
          {
            name: "Paella Marisco",
            desc: "Braised squid, clam, prawn & fish, whole pan — ready in ~25 min, order some tapas while you wait. Upgrade to a bigger pan available",
            price: "495,000₫ / pan",
          },
          {
            name: "Paella Vegetariana",
            desc: "Broccoli, green asparagus, fennel, caramelized onion, whole pan — ready in ~25 min. Upgrade to a bigger pan available",
            price: "430,000₫ / pan",
          },
        ],
      },
      {
        label: "Postres",
        items: [
          {
            name: "Tarta de Queso Manchego",
            desc: "Burnt Basque cheesecake, infused with Manchego",
            price: "110,000₫",
          },
          {
            name: "Churros con Chocolate",
            desc: "Warm churros, rich chocolate dip",
            price: "110,000₫",
          },
          {
            name: "Tarta de Lima de Hội An con Crema Ahumada",
            desc: "Hội An-style lime pie, smoked cream",
            price: "110,000₫",
            tag: "Signature",
          },
          {
            name: "Helados",
            desc: "Chocolate, strawberry, lemon or coconut ice cream",
            price: "60,000₫",
          },
        ],
      },
      {
        label: "Vinos",
        items: [
          {
            name: "Vega Medien Brut Cava (glass / bottle)",
            desc: "D.O. Cava — golden, fine bubbles, elegant",
            price: "160,000₫ / 840,000₫",
          },
          {
            name: "Conde de Haro Brut Cava (bottle)",
            desc: "D.O. Cava — Viura & Chardonnay, crisp and refined",
            price: "1,400,000₫",
          },
          {
            name: "Rambla Rosé (bottle)",
            desc: "D.O. Penedès — Garnacha & Tempranillo, pale and dry",
            price: "840,000₫",
          },
          {
            name: "Lobetia Organic (glass / bottle)",
            desc: "D.O. Tierra de Castilla — organic Chardonnay, clean and fruity",
            price: "140,000₫ / 800,000₫",
          },
          {
            name: "Cutio Blanco (glass / bottle)",
            desc: "D.O. Cariñena — Macabeo, floral and light",
            price: "150,000₫ / 950,000₫",
          },
          {
            name: "Basa Blanco (glass / bottle)",
            desc: "D.O. Rueda — Verdejo & Viura, charming fruit and aromatics",
            price: "150,000₫ / 950,000₫",
          },
          {
            name: "Pago Mota (bottle)",
            desc: "D.O. Tierra de Castilla — Chardonnay, ripe stone fruit",
            price: "1,100,000₫",
          },
          {
            name: "Muga Blanco (bottle)",
            desc: "D.O.Ca. Rioja — Viura, Garnacha Blanca & Malvasía, aromatic",
            price: "1,300,000₫",
          },
          {
            name: "La Planta (glass / bottle)",
            desc: "D.O. Ribera del Duero Tempranillo — structured, dark cherry",
            price: "150,000₫ / 850,000₫",
          },
          {
            name: "Cutio Tinto (glass / bottle)",
            desc: "D.O. Cariñena — Garnacha, juicy red fruit",
            price: "160,000₫ / 900,000₫",
          },
          {
            name: "Al Muvedre (glass / bottle)",
            desc: "D.O. Alicante — Monastrell, dark fruit and spice",
            price: "160,000₫ / 1,000,000₫",
          },
          {
            name: "Marques de Caceres Crianza (bottle)",
            desc: "D.O.Ca. Rioja — Tempranillo Crianza, balanced oak",
            price: "1,300,000₫",
          },
          {
            name: "Muga Reserva (bottle)",
            desc: "D.O.Ca. Rioja — Tempranillo Reserva, complex and refined",
            price: "1,500,000₫",
          },
          {
            name: 'Tío Pepe "Warhol" Fino (glass)',
            desc: "100% Palomino sherry — dry & crisp, almond notes",
            price: "160,000₫",
          },
          {
            name: "Apostoles 30YO Palo Cortado (glass)",
            desc: "87% Palomino / 13% PX — nutty, dry with a hint of sweetness",
            price: "450,000₫",
          },
          {
            name: "Matsusalem 30YO Sweet Oloroso (glass)",
            desc: "75% Oloroso / 25% PX — rich, dark, raisined sweetness",
            price: "450,000₫",
          },
          {
            name: "Cuatro Palmas 40YO Amontillado (glass)",
            desc: "100% Palomino, aged 40 years — deep, nutty, extraordinary",
            price: "750,000₫",
          },
        ],
      },
      {
        label: "Beer & Cocktails",
        items: [
          {
            name: "Estrella Galicia Lager (bottle)",
            desc: "A true icon of Spanish beer",
            price: "95,000₫",
          },
          {
            name: "Huda Draught (33cl / 50cl)",
            desc: "Draught lager, light and easy-drinking",
            price: "45,000₫ / 65,000₫",
          },
          {
            name: "Asahi Lager (bottle)",
            desc: "Japanese lager, dry and crisp",
            price: "75,000₫",
          },
          {
            name: "Tiger Lager (bottle)",
            desc: "Vietnamese-brewed lager, light and refreshing",
            price: "45,000₫",
          },
          {
            name: "Classic Sangria (glass / pitcher)",
            desc: "Red wine, mixed fruit, vodka, cinnamon syrup",
            price: "160,000₫ / 475,000₫",
            tag: "Signature",
          },
          {
            name: "White Sangria (glass / pitcher)",
            desc: "White wine, peach syrup, gin, mixed fruit",
            price: "160,000₫ / 475,000₫",
          },
          {
            name: "Sangria Spritz",
            desc: "Aperol, sweet vermouth, orange juice, cava, soda",
            price: "170,000₫",
          },
          {
            name: "Tinto de Verano",
            desc: "Red wine, Sprite, lime — Spain's summer classic",
            price: "170,000₫",
          },
          {
            name: "Mango Shake",
            desc: "Brugal white rum, fresh mango",
            price: "170,000₫",
          },
          {
            name: "Red Bubbles",
            desc: "Aperol, sparkling wine, soda, orange",
            price: "170,000₫",
          },
          {
            name: "Negroni de Madrid",
            desc: "Bulldog gin, Cinzano sweet vermouth, Campari",
            price: "170,000₫",
          },
          {
            name: "Old Fashioned",
            desc: "Bushmills whisky, bitters, orange",
            price: "170,000₫",
          },
          {
            name: "Espresso Martini",
            desc: "Brugal white rum, Đà Lạt coffee",
            price: "170,000₫",
          },
          {
            name: "Herradura",
            desc: "Jose Cuervo tequila, lime, cilantro",
            price: "170,000₫",
          },
          {
            name: "Bloody Mary",
            desc: "Skyy vodka, tomato juice, Tabasco",
            price: "170,000₫",
          },
        ],
      },
      {
        label: "Spirits",
        items: [
          {
            name: "Bushmills Original",
            desc: "Whisky · Irish blend, light and honeyed",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Wild Turkey 81",
            desc: "Whisky · Kentucky bourbon, bold rye spice",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Maker's Mark",
            desc: "Whisky · Wheated bourbon, soft caramel finish",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "St-Remy VSOP",
            desc: "Brandy · French VSOP, warm and mellow",
            price: "150,000₫ / 1,450,000₫",
          },
          {
            name: "Hennessy VS",
            desc: "Cognac · French VS, smooth and versatile",
            price: "200,000₫ / 2,000,000₫",
          },
          {
            name: "Nordes Atlantic",
            desc: "Gin · Galician, floral with a hint of albariño grape",
            price: "190,000₫ / 1,950,000₫",
          },
          {
            name: "Roku",
            desc: "Gin · Japanese, six botanicals, delicate and citrusy",
            price: "170,000₫ / 1,800,000₫",
          },
          {
            name: "Bulldog",
            desc: "Gin · London Dry, juniper-forward",
            price: "150,000₫ / 1,450,000₫",
          },
          {
            name: "Skyy",
            desc: "Vodka · American, clean and crisp",
            price: "150,000₫ / 1,450,000₫",
          },
          {
            name: "Absolut",
            desc: "Vodka · Swedish, pure and neutral",
            price: "150,000₫ / 1,450,000₫",
          },
          {
            name: "Brugal Blanco",
            desc: "Rum · Dominican white rum, light and clean",
            price: "130,000₫ / 1,250,000₫",
          },
          {
            name: "Zacapa 23YO",
            desc: "Rum · Guatemalan, aged 23 years, dried fruit and spice",
            price: "350,000₫ / 3,100,000₫",
          },
          {
            name: "Jose Cuervo",
            desc: "Tequila · Blanco, classic and peppery",
            price: "120,000₫ / 1,200,000₫",
          },
          {
            name: "Don Julio Blanco",
            desc: "Tequila · Blanco, 100% agave, smooth and refined",
            price: "300,000₫ / 2,900,000₫",
          },
        ],
      },
      {
        label: "Non-Alcohol",
        items: [
          {
            name: "Soft Drinks",
            desc: "Coca-Cola, Sprite, or soda — chilled and simple",
            price: "30,000₫",
          },
          {
            name: "Agua Lavie Con/Sin Gas",
            desc: "Still or sparkling water, 45cl",
            price: "45,000₫",
          },
          {
            name: "Mocktail del Día",
            desc: "Bartender's non-alcoholic selection of the day",
            price: "100,000₫",
          },
          {
            name: "Zumo del Día",
            desc: "Fresh-pressed juice, changes daily",
            price: "75,000₫",
          },
          {
            name: "Café Vietnamita",
            desc: "Traditional Vietnamese drip coffee, hot or over ice",
            price: "50,000₫",
          },
          {
            name: "Espresso",
            desc: "Italian espresso shot",
            price: "45,000₫",
          },
          {
            name: "Capuchino",
            desc: "Espresso, steamed milk",
            price: "50,000₫",
          },
          {
            name: "Café Trứng",
            desc: "Hanoi-style egg coffee, whipped egg yolk cream",
            price: "60,000₫",
            tag: "Signature",
          },
        ],
      },
    ],
  },
  gallery: {
    eyebrow: "The Gallery",
    title: "A feel for the room",
    subtitle:
      "Hand-carved jamón, blistered pans, and a room built for long lunches and longer dinners.",
  },
  press: {
    eyebrow: "Google Reviews",
    title: "What guests are saying",
    items: [
      {
        quote:
          "A perfect place to meet with friends and enjoy great food, especially if you love good jamón ibérico and Spanish cheeses. The atmosphere is relaxed and welcoming, making it ideal for long conversations over tapas.",
        source: "Google review · IBÉRICO Thảo Điền, 4.6★",
      },
      {
        quote:
          "From first to last impression, everything was absolutely phenomenal. We had the delight of dining in a warm, authentic space, indulging in delicious spheres of ham.",
        source: "Google review · IBÉRICO Thị Sách, 4.7★",
      },
      {
        quote: "The view overlooking the river in Hội An is great, especially at night.",
        source: "Google review · IBÉRICO Hội An, 4.9★",
      },
    ],
    ratingLabel: "4.7–4.9 / 5 average guest rating",
  },
  locations: {
    eyebrow: "Our Locations",
    title: "Three homes, one table",
    subtitle:
      "Find your nearest IBÉRICO — each location keeps the same menu, the same wine list, and the same welcome.",
    directions: "Get Directions",
    items: [
      {
        name: "IBÉRICO Thảo Điền",
        area: "Flagship · Thảo Điền",
        address: "33 Võ Trường Toản St, Khánh Ward, HCMC",
        hours: "16:00 – 23:30 daily · Kitchen closes 22:30",
        capacity: "Seats up to 60",
        phone: "+84 326 498 956",
        mapQuery: "33 Vo Truong Toan St, Khanh Ward, Ho Chi Minh City",
        lat: 10.8043499,
        lng: 106.7472609,
        blurb:
          "Our original home, tucked into a residential expat neighborhood — indoor and outdoor seating for everything from date nights to family tables.",
      },
      {
        name: "IBÉRICO Thị Sách",
        area: "Sài Gòn Ward",
        address: "20A Thị Sách St, Sài Gòn Ward, HCMC",
        hours: "11:00 – 23:30 daily · Kitchen closes 22:30",
        capacity: "Seats 60–80",
        phone: "+84 849 000 531",
        mapQuery: "20A Thi Sach St, Sai Gon Ward, Ho Chi Minh City",
        lat: 10.7782323,
        lng: 106.7046638,
        blurb:
          "A downtown wine bar near the business district, with a private upstairs room built for exclusive events.",
      },
      {
        name: "IBÉRICO Hội An",
        area: "Ancient Town",
        address: "100 Bạch Đằng St, Hội An Ward, Đà Nẵng City",
        hours: "11:00 – 23:30 daily · Kitchen closes 22:30",
        capacity: "Seats up to 70",
        phone: "+84 868 774 026",
        mapQuery: "100 Bach Dang St, Hoi An Ward, Da Nang City",
        lat: 15.8760039,
        lng: 108.3298476,
        blurb:
          "Riverside on Bạch Đằng, steps from Chùa Cầu Bridge, with breathtaking panoramic views of the ancient town.",
      },
    ],
  },
  events: {
    eyebrow: "Private Events & Catering",
    title: "Your table, your celebration",
    body: "From intimate birthday dinners to full restaurant buyouts, our team builds a sharing menu around your guest list. We also offer full off-site catering — including our legendary paella parties, cooked fresh and served family-style for any size of celebration.",
    bullets: [
      "Full-service catering for weddings & corporate events",
      "Legendary paella parties, cooked fresh on-site",
      "Private upstairs room at Thị Sách",
      "Custom tapas & wine pairing menus",
      "Full restaurant buyouts available",
    ],
    cta: "Enquire About Events & Catering",
  },
  careers: {
    eyebrow: "Careers",
    title: "Join the IBÉRICO team",
    subtitle:
      "We're always looking for people who care about great food and warm hospitality — across our Saigon and Hội An houses.",
    applyCta: "Apply Now",
    emailNote:
      "Send your CV and a short note to hola@weareiberico.com, or reach us on WhatsApp — tell us which role and location you're applying for.",
    positions: [
      {
        title: "Waiter",
        type: "Full-time",
        department: "Service",
        description:
          "Deliver warm, attentive floor service and guide guests through our tapas menu and wine list with confidence.",
      },
      {
        title: "Waiter Internship",
        type: "Internship",
        department: "Service",
        description:
          "Learn full-service Spanish hospitality from the ground up, with hands-on mentorship and a clear path to a full-time role.",
      },
      {
        title: "Chef de Partie",
        type: "Full-time",
        department: "Kitchen",
        description:
          "Run your own station — charcuterie, tapas, or paella — with precision, consistency, and pride in every plate.",
      },
      {
        title: "Cook Internship",
        type: "Internship",
        department: "Kitchen",
        description:
          "Hands-on kitchen training across every station, from jamón prep to paella, under our head chef's guidance.",
      },
    ],
  },
  reservation: {
    eyebrow: "Reservations",
    title: "Book Your Table",
    subtitle:
      "Tell us when and where — we'll confirm by phone or WhatsApp within a few hours.",
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    date: "Date",
    time: "Time",
    guests: "Guests",
    location: "Location",
    notes: "Special Requests",
    notesPlaceholder: "Allergies, celebrations, seating preference...",
    submit: "Request Reservation",
    submitWhatsApp: "Reserve via WhatsApp",
    submitZalo: "Reserve via Zalo",
    submitting: "Sending...",
    success: "Request received!",
    successBody:
      "Thank you — we'll confirm your table by phone or WhatsApp shortly. ¡Hasta pronto!",
    another: "Book Another Table",
    required: "Required",
    whatsapp: "WhatsApp",
    zalo: "Zalo",
    orContact: "Or reach us directly",
    call: "Call",
    emailUs: "Email",
    lateNote:
      "Kitchen closes for hot dishes at 22:30 — a limited menu (cold cuts, cheeses, wine) is still available for bookings until 23:30.",
    zaloCopied: "Details copied — paste them into the Zalo chat that just opened.",
  },
  footer: {
    tagline: "Authentic Spanish tapas & wine, shared in Ho Chi Minh City.",
    visit: "Visit Us",
    connect: "Connect",
    rights: "All rights reserved.",
    madeWith: "Saigon · Hội An",
  },
};

const vi: Dict = {
  meta: { skipToContent: "Bỏ qua để xem nội dung" },
  marquee: [
    "Nhà Hàng Tây Ban Nha Xuất Sắc Nhất · Gourmet Vietnam Awards 2025",
    "Jamón Ibérico de Bellota Cắt Tay",
    "TP. Hồ Chí Minh · Hội An",
    "Tapas y Vino Từ Năm 2021",
  ],
  nav: {
    story: "Câu Chuyện",
    menu: "Thực Đơn",
    gallery: "Hình Ảnh",
    locations: "Chi Nhánh",
    events: "Sự Kiện",
    careers: "Tuyển Dụng",
    reserve: "Đặt Bàn",
  },
  hero: {
    eyebrow: "Vinos y Tapas · Sài Gòn · Thành lập 2021",
    title1: "Tapas",
    title2: "y Vino",
    subtitle:
      "Tapas Iberia và vang Tây Ban Nha, thong thả — giữa lòng Thành phố Hồ Chí Minh.",
    cta1: "Đặt Bàn Ngay",
    cta2: "Xem Thực Đơn",
    scroll: "Cuộn xuống",
  },
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
  story: {
    eyebrow: "Câu Chuyện Của Chúng Tôi",
    title: "Tinh Thần Sống Động Của Ẩm Thực Tây Ban Nha Tại Việt Nam",
    body: "Ra đời năm 2021, IBÉRICO mang tinh thần tapas Tây Ban Nha đến Việt Nam: jamón thái tay, tôm sốt tỏi thơm lừng ngay khi ra chảo, paella làm cho cả bàn cùng thưởng thức. Gọi theo bản năng, chia sẻ tất cả, ở lại thật lâu — nay đã có ba cơ sở, từ Sài Gòn đến bên sông Hội An.",
    quote: "Nhà Hàng Tây Ban Nha Xuất Sắc Nhất Việt Nam.",
    quoteAuthor: "Gourmet Vietnam Awards, 2025",
    stats: [
      { value: "2021", label: "Thành lập tại Sài Gòn" },
      { value: "3", label: "Chi nhánh trên khắp Việt Nam" },
      { value: "2025", label: "Nhà Hàng Tây Ban Nha Xuất Sắc Nhất, Gourmet Vietnam Awards" },
      { value: "4.7–4.9★", label: "Đánh giá từ khách hàng" },
    ],
  },
  menu: {
    eyebrow: "Thực Đơn",
    title: "Thực đơn dành cho việc chia sẻ",
    subtitle:
      "Đồ nguội, tapas nóng, và các món từ chảo — gọi hai hoặc ba món mỗi người, dùng chung như một gia đình, đúng như cách nó vốn phải vậy.",
    note: "Giá niêm yết bằng VNĐ (nghìn đồng) · Chưa gồm phí dịch vụ 5% & VAT 8–10%",
    categories: [
      {
        label: "Jamón, Embutidos & Quesos",
        items: [
          {
            name: 'Jamón Ibérico de Bellota "Pata Negra"',
            desc: "Giăm bông đùi heo muối Ibérico cắt tay tại bàn — vua của các loại giăm bông (50g / 100g)",
            price: "499,000₫ / 960,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "Tabla de Ibérico",
            desc: "Chorizo, salchichón & morcilla Ibérico, phô mai Manchego, ô liu ngâm thảo mộc (nhỏ / lớn)",
            price: "595,000₫ / 998,000₫",
          },
          {
            name: "Chorizo Ibérico",
            desc: "Xúc xích heo Ibérico cắt lát (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Salchichón Ibérico",
            desc: "Xúc xích heo Ibérico cắt lát salchichón (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Morcilla Ibérico",
            desc: "Dồi heo Ibérico cắt lát (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Cecina Ibérica",
            desc: "Thịt bò muối xông khói (50g / 100g)",
            price: "290,000₫ / 550,000₫",
          },
          {
            name: "Tabla de Queso",
            desc: "Manchego ủ nấm truffle, Idiazábal, phô mai xanh ủ lâu năm, mứt mộc qua, hạnh nhân",
            price: "490,000₫",
          },
          {
            name: "Manchego Trufado",
            desc: "Phô mai Manchego nấm truffle",
            price: "280,000₫",
          },
          {
            name: "Manchego Cheese",
            desc: "Phô mai Manchego ủ 12 tháng",
            price: "280,000₫",
          },
          {
            name: "Idiazábal",
            desc: "Phô mai cừu Idiazábal chưa tiệt trùng",
            price: "250,000₫",
          },
          {
            name: "Queso Azul Madurado",
            desc: "Phô mai xanh ủ lâu năm",
            price: "180,000₫",
          },
          {
            name: "Membrillo",
            desc: "Thạch quả mộc qua",
            price: "75,000₫",
          },
        ],
      },
      {
        label: "Tapas del Mar",
        items: [
          {
            name: "Sashimi Mediterráneo",
            desc: "Cá tươi sống kiểu Địa Trung Hải, nụ bạch hoa",
            price: "235,000₫",
          },
          {
            name: "Ostras con Salsa Mignonette",
            desc: "Hàu sống ăn kèm sốt mignonette — 5 con",
            price: "150,000₫",
          },
          {
            name: "Anchoas del Cantábrico",
            desc: "Cá cơm ngâm dầu, bánh mì, sốt cà chua",
            price: "350,000₫",
          },
          {
            name: "Boquerones en Vinagre con Chips",
            desc: "Cá cơm trắng ngâm giấm, khoai tây chiên",
            price: "180,000₫",
          },
          {
            name: "Mojama de Atún",
            desc: "Thăn cá ngừ khô kiểu Địa Trung Hải, hạnh nhân",
            price: "250,000₫",
          },
          {
            name: "Mar y Sal",
            desc: "Dĩa hải sản tổng hợp: cá ngừ khô, hàu sống, xiên cá cơm & ô liu, cá cơm ngâm dầu",
            price: "890,000₫",
            tag: "Đặc trưng",
          },
        ],
      },
      {
        label: "Picoteo",
        items: [
          {
            name: "Pan con Tumaca y Aioli",
            desc: "Bánh mì dùng kèm cà chua và sốt tỏi",
            price: "70,000₫",
          },
          {
            name: "Gilda Ibérica",
            desc: "Xiên cá cơm ngâm dầu, ô liu, ớt piparra — 2 xiên",
            price: "135,000₫",
          },
          {
            name: "Brioche de Atún con Chocolate Blanco",
            desc: "Bánh mì hoa cúc, cá ngừ, sô-cô-la trắng — 2 phần",
            price: "170,000₫",
          },
          {
            name: "Olivas Fritas",
            desc: "Quả ô liu nhân chiên — 3 phần",
            price: "130,000₫",
          },
          {
            name: "Aceitunas Ibérico",
            desc: "Quả ô liu ngâm thảo mộc",
            price: "110,000₫",
          },
          {
            name: "Almendras Fritas con Sal",
            desc: "Hạnh nhân rang muối tiêu",
            price: "90,000₫",
          },
        ],
      },
      {
        label: "Tapas Clásicas",
        items: [
          {
            name: "Croquetas de Jamón",
            desc: "Viên giăm bông chiên kiểu Tây Ban Nha — 6 / 12 viên",
            price: "150,000₫ / 290,000₫",
            tag: "Bán chạy nhất",
          },
          {
            name: "Croquetas de Setas con Crema de Manchego",
            desc: "Viên nấm chiên, sốt phô mai Manchego — 6 / 12 viên",
            price: "135,000₫ / 265,000₫",
          },
          {
            name: "Gambas al Ajillo",
            desc: "Tôm sốt tỏi truyền thống kiểu Ibérico",
            price: "265,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "Tortilla de Patatas con Aioli",
            desc: "Trứng chiên khoai tây Tây Ban Nha, sốt tỏi (tapa / ración)",
            price: "90,000₫ / 150,000₫",
          },
          {
            name: "Ensaladilla de Gambas",
            desc: "Salad tôm khoai tây nghiền (tapa / ración)",
            price: "150,000₫ / 255,000₫",
          },
          {
            name: "Setas Escabeche con Crema de Manchego",
            desc: "Nấm ngâm dầu, sốt kem phô mai Manchego (tapa / ración)",
            price: "120,000₫ / 215,000₫",
          },
          {
            name: "Patatas Bravas",
            desc: "Khoai tây chiên sốt cay",
            price: "120,000₫",
          },
          {
            name: "Patatas con Aioli",
            desc: "Khoai tây chiên, sốt aioli tỏi, hành tím ngâm chua",
            price: "120,000₫",
          },
          {
            name: "Mejillones en Escabeche con Chips",
            desc: "Vẹm ngâm dầu kèm khoai tây chiên giòn",
            price: "165,000₫",
          },
          {
            name: "Calamares Fritos con Aioli de Pimienta Negra",
            desc: "Mực chiên giòn, sốt aioli tiêu đen",
            price: "225,000₫",
          },
          {
            name: "Almejas al Ajillo",
            desc: "Nghêu sốt tỏi cà chua",
            price: "225,000₫",
          },
          {
            name: "Gambas Fritas con Aioli de Limón y Wasabi",
            desc: "Tôm chiên, sốt aioli wasabi chanh",
            price: "195,000₫",
          },
          {
            name: "Mero Frito con Pilpil Cítrico",
            desc: "Cá mú chiên, sốt pilpil vị cam chanh",
            price: "190,000₫",
          },
        ],
      },
      {
        label: "Tapas de la Casa",
        items: [
          {
            name: "Ensalada de la Casa",
            desc: "Xà lách xanh, sốt hạt phỉ",
            price: "95,000₫",
          },
          {
            name: "Escabeche de Coliflor Asada",
            desc: "Bông cải nướng ngâm dầu escabeche",
            price: "155,000₫",
          },
          {
            name: "Calabacín Ahumado con Queso Idiazábal",
            desc: "Bí ngòi hun khói, phô mai Idiazábal và mứt củ hồi",
            price: "165,000₫",
          },
          {
            name: "Espárragos Blancos con Holandesa y Manchego",
            desc: "Măng tây trắng, sốt hollandaise & phô mai Manchego",
            price: "235,000₫",
          },
          {
            name: "Bomba de Sobrasada",
            desc: "Viên khoai tây chiên giòn nhân xúc xích sobrasada",
            price: "195,000₫",
          },
          {
            name: "Tiradito del Día",
            desc: "Gỏi cá tái chanh trong ngày, sốt chanh dây",
            price: "190,000₫",
          },
          {
            name: "Arroz Meloso de Carrilleras y Judías",
            desc: "Cơm sánh kiểu Tây Ban Nha, má bò hầm, đậu Hà Lan",
            price: "325,000₫",
          },
          {
            name: "Vieras con Jamón Ibérico y Sopa de Maíz",
            desc: "Sò điệp áp chảo, thịt heo muối Ibérico và súp bắp",
            price: "295,000₫",
          },
          {
            name: "Iberico Sando",
            desc: "Sandwich heo kiểu Ibérico, bánh mì brioche",
            price: "350,000₫",
          },
          {
            name: "Pulpo Frito con Romesco",
            desc: "Bạch tuộc chiên, sốt romesco",
            price: "290,000₫",
          },
          {
            name: "Costilla de Ibérico a la Barbacoa",
            desc: "Sườn heo Ibérico nướng BBQ, đậu phộng, bắp cải ngâm",
            price: "415,000₫",
          },
          {
            name: "Secreto Ibérico con Brocolini y Pimientos Encurtidos",
            desc: "Thăn nội vai Ibérico áp chảo, bông cải xanh non, ớt chuông ngâm chua, sốt sherry",
            price: "495,000₫",
          },
          {
            name: "Picaña a la Parilla con Chimichurri",
            desc: "Nạc mông bò nướng với sốt chimichurri",
            price: "475,000₫",
          },
        ],
      },
      {
        label: "Paella",
        items: [
          {
            name: "Paella Marisco",
            desc: "Mực hầm, nghêu, tôm và cá — tối thiểu 2 người, giá/người",
            price: "275,000₫",
          },
          {
            name: "Arroz Negro",
            desc: "Cơm mực đen, tỏi phi — tối thiểu 2 người, giá/người",
            price: "335,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "Paella Vegetariana",
            desc: "Bông cải xanh, măng tây xanh, củ hồi, hành caramel — giá/người",
            price: "215,000₫",
          },
        ],
      },
      {
        label: "Postres",
        items: [
          {
            name: "Tarta de Queso Manchego",
            desc: "Bánh phô mai cháy kiểu Basque, vị Manchego",
            price: "130,000₫",
          },
          {
            name: "Churros con Chocolate",
            desc: "Bánh churros chiên kèm sốt sô-cô-la",
            price: "115,000₫",
          },
          {
            name: "Torrija Limón y Pomelo",
            desc: "Bánh ngâm sữa kiểu Tây Ban Nha, sốt kem chanh, bưởi",
            price: "155,000₫",
          },
          {
            name: "Helados",
            desc: "Kem sô-cô-la, dâu, chanh hoặc dừa",
            price: "75,000₫",
          },
        ],
      },
      {
        label: "Vinos & Bebidas",
        items: [
          {
            name: "Classic Sangría (ly / bình)",
            desc: "Vang đỏ, trái cây tươi, vodka, sốt quế",
            price: "140,000₫ / 495,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "White Sangría (ly / bình)",
            desc: "Vang trắng, sốt đào, gin, trái cây tươi",
            price: "140,000₫ / 495,000₫",
          },
          {
            name: "Sangría Spritz",
            desc: "Aperol, vermouth ngọt, nước cam, cava, soda",
            price: "175,000₫",
          },
          {
            name: "Negroni",
            desc: "Bulldog gin, vermouth ngọt, Campari",
            price: "175,000₫",
          },
          {
            name: "Old Fashioned",
            desc: "Whisky Bushmills, bitter, cam",
            price: "175,000₫",
          },
          {
            name: "Tinto de Verano",
            desc: "Vang đỏ, Sprite, chanh — cổ điển mùa hè Tây Ban Nha",
            price: "140,000₫",
          },
          {
            name: "Margarita",
            desc: "Tequila Jose Cuervo, chanh, triple sec",
            price: "175,000₫",
          },
          {
            name: "Mojito",
            desc: "Rum trắng Brugal, bạc hà, soda — cổ điển Cuba",
            price: "175,000₫",
          },
          {
            name: "Whisky Sour",
            desc: "Whisky Wild Turkey, lòng trắng trứng, chanh, bitters",
            price: "175,000₫",
          },
          {
            name: "Red Bubbles",
            desc: "Aperol, vang sủi, soda, cam",
            price: "175,000₫",
          },
          {
            name: "Vega Medien Brut Cava (ly / chai)",
            desc: "D.O. Cava — ánh vàng, bọt mịn, thanh lịch",
            price: "160,000₫ / 950,000₫",
          },
          {
            name: "Muga Rosé (chai)",
            desc: "D.O. Rioja — tươi mát với vị dâu rừng, hậu vị giòn",
            price: "1,000,000₫",
          },
          {
            name: "Basa Blanco (ly / chai)",
            desc: "D.O. Rueda — Verdejo & Viura, cân bằng giữa trái cây và hương thơm",
            price: "140,000₫ / 850,000₫",
          },
          {
            name: "Faustino Rivero Ulecia (chai)",
            desc: "D.O. Rías Baixas Albariño — tươi mát vị chanh và đào trắng",
            price: "1,350,000₫",
          },
          {
            name: "La Planta (ly / chai)",
            desc: "D.O. Ribera del Duero Tempranillo — cấu trúc chắc, vị anh đào đen",
            price: "170,000₫ / 980,000₫",
          },
          {
            name: "Marqués de Vargas Reserva (chai)",
            desc: "D.O.Ca. Rioja — anh đào chín, gỗ sồi, thuốc lá",
            price: "2,300,000₫",
            tag: "Bếp trưởng chọn",
          },
          {
            name: 'Tío Pepe "Warhol" Fino (ly)',
            desc: "100% Palomino — khô và giòn, hương hạnh nhân",
            price: "160,000₫",
          },
          {
            name: "Estrella Galicia Lager (chai)",
            desc: "Biểu tượng đích thực của bia Tây Ban Nha",
            price: "95,000₫",
          },
          {
            name: "1906 Reserva Lager (chai)",
            desc: "Bia lager hổ phách Galicia, đậm vị mạch nha",
            price: "95,000₫",
          },
          {
            name: "Asahi Lager (chai)",
            desc: "Bia lager Nhật Bản, khô và sảng khoái",
            price: "95,000₫",
          },
          {
            name: "Huda Lager (chai)",
            desc: "Bia lager Việt Nam, dễ uống, được yêu thích",
            price: "60,000₫",
          },
        ],
      },
      {
        label: "Rượu Mạnh",
        items: [
          {
            name: "High Commissionner",
            desc: "Whisky · Blended Scotch, êm dịu dễ uống",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Bushmills Original",
            desc: "Whisky · Irish blend, nhẹ nhàng vị mật ong",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Wild Turkey 81",
            desc: "Whisky · Bourbon Kentucky, cay nồng vị lúa mạch đen",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Maker's Mark",
            desc: "Whisky · Bourbon lúa mì, hậu vị caramel mềm mại",
            price: "190,000₫ / 1,800,000₫",
          },
          {
            name: "Monkey Shoulder",
            desc: "Whisky · Blended malt Scotch, đậm đà tròn vị",
            price: "200,000₫ / 2,100,000₫",
          },
          {
            name: "Singleton 12YO",
            desc: "Whisky · Single malt 12 năm, hương trái cây",
            price: "220,000₫ / 2,600,000₫",
          },
          {
            name: "Macallan 12YO",
            desc: "Whisky · Single malt 12 năm, ủ thùng sherry sâu lắng",
            price: "350,000₫ / 4,300,000₫",
          },
          {
            name: "St-Remy VSOP",
            desc: "Brandy · VSOP Pháp, ấm áp êm dịu",
            price: "160,000₫ / 1,450,000₫",
          },
          {
            name: "Brandy Lustau Solera Reserva",
            desc: "Brandy · Solera Reserva Tây Ban Nha, vị nho khô và gỗ sồi",
            price: "200,000₫ / 2,000,000₫",
          },
          {
            name: "Skyy",
            desc: "Vodka · Mỹ, tinh khiết sảng khoái",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Ketel One",
            desc: "Vodka · Vodka lúa mì Hà Lan, mượt mà",
            price: "180,000₫ / 1,700,000₫",
          },
          {
            name: "Nordes Atlantic",
            desc: "Gin · Galicia, hương hoa thoảng vị nho albariño",
            price: "190,000₫ / 1,950,000₫",
          },
          {
            name: "Bulldog",
            desc: "Gin · London Dry, đậm hương bách xù",
            price: "160,000₫ / 1,400,000₫",
          },
          {
            name: "Roku",
            desc: "Gin · Nhật Bản, sáu loại thảo mộc, tinh tế và cam chanh",
            price: "170,000₫ / 1,800,000₫",
          },
          {
            name: "Brugal Blanco",
            desc: "Rum · Rum trắng Dominica, nhẹ và tinh khiết",
            price: "130,000₫ / 1,400,000₫",
          },
          {
            name: "Mount Gay Eclipse",
            desc: "Rum · Rum vàng Barbados, hương chuối và kẹo bơ",
            price: "130,000₫ / 1,400,000₫",
          },
          {
            name: "Zacapa 23YO",
            desc: "Rum · Rum Guatemala ủ 23 năm, trái cây khô và gia vị",
            price: "350,000₫ / 3,100,000₫",
          },
          {
            name: "Jose Cuervo",
            desc: "Tequila · Blanco, cổ điển và cay nhẹ",
            price: "120,000₫ / 1,200,000₫",
          },
          {
            name: "1800 Blanco",
            desc: "Tequila · Blanco, 100% agave, vị cam chanh và tiêu",
            price: "200,000₫ / 2,100,000₫",
          },
          {
            name: "Don Julio Blanco",
            desc: "Tequila · Blanco, 100% agave, mượt mà tinh tế",
            price: "310,000₫ / 2,900,000₫",
          },
        ],
      },
      {
        label: "Không Cồn",
        items: [
          {
            name: "Soft Drinks",
            desc: "Coca-Cola, Sprite hoặc soda — mát lạnh, đơn giản",
            price: "45,000₫",
          },
          {
            name: "Agua Lavie Con/Sin Gas",
            desc: "Nước suối hoặc có gas Lavie, 45cl",
            price: "60,000₫",
          },
          {
            name: "San Pellegrino",
            desc: "Nước khoáng có gas Ý, chai 75cl",
            price: "120,000₫",
          },
          {
            name: 'Sidra de Manzana "Chill Kombucha"',
            desc: "Kombucha táo có gas — vui tươi, không cồn",
            price: "120,000₫",
          },
          {
            name: "Mocktail del Día",
            desc: "Mocktail không cồn theo lựa chọn của bartender trong ngày",
            price: "120,000₫",
          },
          {
            name: "Zumo del Día",
            desc: "Nước ép tươi, thay đổi theo ngày",
            price: "75,000₫",
          },
          {
            name: "Espresso / Cappuccino",
            desc: "Cà phê Ý theo cách bạn thích",
            price: "60,000₫",
          },
        ],
      },
    ],
    hoianNote: "Giá niêm yết bằng VNĐ (nghìn đồng) · Chưa gồm VAT 8–10%",
    hoianCategories: [
      {
        label: "Set Menu Riêng",
        items: [
          {
            name: "Bellota Set Menu",
            desc: "Pan con Tumaca, Almendras Fritas, Croquetas de Jamón, Almejas al Ajillo, Patatas Bravas & Setas Escabeche — trọn bộ trải nghiệm, dùng chung",
            price: "345,000₫ / người",
          },
          {
            name: "Pata Negra Set Menu",
            desc: "Toàn bộ món trong Bellota Set Menu, cùng Calamares Fritos, Ensaladilla de Gambas, Idiazábal & Churros con Chocolate",
            price: "595,000₫ / người",
          },
        ],
      },
      {
        label: "Jamón, Embutidos & Quesos",
        items: [
          {
            name: 'Jamón Ibérico de Bellota "Pata Negra"',
            desc: "Giăm bông đùi heo muối Ibérico cắt tay tại bàn — vua của các loại giăm bông (50g / 100g)",
            price: "499,000₫ / 960,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "Tabla de Ibérico",
            desc: "Chorizo, salchichón & morcilla Ibérico, phô mai Manchego, ô liu ngâm thảo mộc (nhỏ / lớn)",
            price: "450,000₫ / 960,000₫",
          },
          {
            name: "Tabla de Queso",
            desc: "Manchego ủ nấm truffle, Idiazábal, phô mai xanh ủ lâu năm, mứt mộc qua, hạnh nhân",
            price: "425,000₫",
          },
          {
            name: "Chorizo Ibérico",
            desc: "Xúc xích heo Ibérico cắt lát (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Salchichón Ibérico",
            desc: "Xúc xích heo Ibérico cắt lát salchichón (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Morcilla Ibérico",
            desc: "Dồi heo Ibérico cắt lát (50g / 100g)",
            price: "220,000₫ / 350,000₫",
          },
          {
            name: "Cecina Ibérica",
            desc: "Thịt bò muối xông khói (50g / 100g)",
            price: "290,000₫ / 550,000₫",
          },
          {
            name: "Manchego Trufado",
            desc: "Phô mai Manchego nấm truffle",
            price: "280,000₫",
          },
          {
            name: "Manchego Cheese",
            desc: "Phô mai Manchego ủ 12 tháng",
            price: "280,000₫",
          },
          {
            name: "Idiazábal",
            desc: "Phô mai cừu Idiazábal chưa tiệt trùng",
            price: "250,000₫",
          },
          {
            name: "Membrillo",
            desc: "Thạch quả mộc qua",
            price: "75,000₫",
          },
        ],
      },
      {
        label: "Tapas del Mar",
        items: [
          {
            name: "Anchoas del Cantábrico",
            desc: "Cá cơm ngâm dầu, bánh mì, sốt cà chua",
            price: "350,000₫",
          },
          {
            name: "Mojama de Atún",
            desc: "Thăn cá ngừ khô kiểu Địa Trung Hải, hạnh nhân",
            price: "210,000₫",
          },
        ],
      },
      {
        label: "Pintxos - Món Nhỏ",
        items: [
          {
            name: "Tabla de Pintxos - Bites Platter",
            desc: "Khay chia sẻ — chọn 5 món pintxos",
            price: "190,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "Cono de Pollo Ahumado y Zanahoria Encurtida",
            desc: "Cốc kem gà xông khói, cà rốt ngâm chua",
            price: "40,000₫",
          },
          {
            name: "Rollito de Gamba y Menta con Salsa de Chile Dulce",
            desc: "Cuốn tôm bạc hà, sốt ớt ngọt",
            price: "40,000₫",
          },
          {
            name: "Tartaleta de Salmorejo y Jamón",
            desc: "Bánh tartlet salmorejo, jamón ibérico",
            price: "40,000₫",
          },
          {
            name: "Aceituna Rellena Frita",
            desc: "Ô liu nhân chiên giòn",
            price: "40,000₫",
          },
          {
            name: "Airbag de Sardina Ahumada y Chalota Encurtida",
            desc: "Bánh phồng giòn, cá mòi xông khói, hành tím ngâm chua",
            price: "40,000₫",
          },
        ],
      },
      {
        label: "Picoteo",
        items: [
          {
            name: "Pan con Tumaca y Aioli",
            desc: "Bánh mì dùng kèm cà chua và sốt tỏi",
            price: "70,000₫",
          },
          {
            name: "Aceitunas Ibérico",
            desc: "Quả ô liu ngâm thảo mộc",
            price: "95,000₫",
          },
          {
            name: "Almendras Fritas con Sal",
            desc: "Hạnh nhân rang muối tiêu",
            price: "75,000₫",
          },
          {
            name: "Gilda Ibérica",
            desc: "Xiên cá cơm ngâm dầu, ô liu, ớt piparra — 2 xiên",
            price: "135,000₫",
          },
        ],
      },
      {
        label: "Tapas Clásicas",
        items: [
          {
            name: "Croquetas de Jamón",
            desc: "Viên giăm bông chiên kiểu Tây Ban Nha — 6 / 12 viên",
            price: "160,000₫ / 280,000₫",
            tag: "Bán chạy nhất",
          },
          {
            name: "Croquetas de Setas con Crema de Manchego",
            desc: "Viên nấm chiên, sốt phô mai Manchego — 6 / 12 viên",
            price: "135,000₫ / 265,000₫",
          },
          {
            name: "Tortilla de Patatas con Aioli",
            desc: "Trứng chiên khoai tây Tây Ban Nha, sốt tỏi (tapa / ración)",
            price: "105,000₫ / 180,000₫",
          },
          {
            name: "Ensaladilla de Gambas",
            desc: "Salad tôm khoai tây nghiền (tapa / ración)",
            price: "135,000₫ / 240,000₫",
          },
          {
            name: "Setas Escabeche con Crema de Manchego",
            desc: "Nấm ngâm dầu, sốt kem phô mai Manchego (tapa / ración)",
            price: "105,000₫ / 205,000₫",
          },
          {
            name: "Gambas al Ajillo",
            desc: "Tôm sốt tỏi truyền thống kiểu Ibérico",
            price: "255,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "Patatas Bravas",
            desc: "Khoai tây chiên sốt cay",
            price: "120,000₫",
          },
          {
            name: "Patatas con Aioli",
            desc: "Khoai tây chiên, sốt aioli tỏi, hành tím ngâm chua",
            price: "120,000₫",
          },
          {
            name: "Mejillones en Escabeche con Chips",
            desc: "Vẹm ngâm dầu kèm khoai tây chiên giòn",
            price: "135,000₫",
          },
          {
            name: "Calamares Fritos con Aioli de Pimienta Negra",
            desc: "Mực chiên giòn, sốt aioli tiêu đen",
            price: "225,000₫",
          },
          {
            name: "Berenjenas Fritas con Miel",
            desc: "Cà tím chiên giòn, rưới mật ong",
            price: "115,000₫",
          },
          {
            name: "Ensalada de la Casa",
            desc: "Xà lách xanh, sốt hạt phỉ",
            price: "95,000₫",
          },
          {
            name: "Almejas al Ajillo",
            desc: "Nghêu sốt tỏi cà chua",
            price: "195,000₫",
          },
          {
            name: "Col a la Parrilla",
            desc: "Bắp cải nướng, tỏi tây, sốt romesco & Manchego",
            price: "175,000₫",
          },
        ],
      },
      {
        label: "Tapas de la Casa",
        items: [
          {
            name: "Carne a la Parilla con Chimichurri",
            desc: "Thịt bò áp chảo theo lựa chọn bếp trưởng, bánh khoai tây, sốt chimichurri",
            price: "395,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "Pollo Relleno a la Trufa",
            desc: "Gà cuộn nhân, cà rốt ngâm chua, nước sốt truffle",
            price: "225,000₫",
          },
          {
            name: "Pescado de la Bahía",
            desc: "Cá tươi trong ngày, pisto rau củ, tỏi tây chiên",
            price: "350,000₫",
          },
          {
            name: "Spaguetti a la Marinera",
            desc: "Mì spaghetti hải sản, tôm sốt tỏi, cà chua xông khói",
            price: "235,000₫",
          },
        ],
      },
      {
        label: "Paella",
        items: [
          {
            name: "Paella Marisco",
            desc: "Mực hầm, nghêu, tôm và cá, cả chảo — sẵn sàng sau ~25 phút, gọi thêm vài món tapas trong lúc chờ. Có thể nâng cấp chảo lớn hơn",
            price: "495,000₫ / chảo",
          },
          {
            name: "Paella Vegetariana",
            desc: "Bông cải xanh, măng tây xanh, củ hồi, hành caramel, cả chảo — sẵn sàng sau ~25 phút. Có thể nâng cấp chảo lớn hơn",
            price: "430,000₫ / chảo",
          },
        ],
      },
      {
        label: "Postres",
        items: [
          {
            name: "Tarta de Queso Manchego",
            desc: "Bánh phô mai cháy kiểu Basque, vị Manchego",
            price: "110,000₫",
          },
          {
            name: "Churros con Chocolate",
            desc: "Bánh churros chiên kèm sốt sô-cô-la",
            price: "110,000₫",
          },
          {
            name: "Tarta de Lima de Hội An con Crema Ahumada",
            desc: "Bánh chanh kiểu Hội An, kem xông khói",
            price: "110,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "Helados",
            desc: "Kem sô-cô-la, dâu, chanh hoặc dừa",
            price: "60,000₫",
          },
        ],
      },
      {
        label: "Rượu Vang",
        items: [
          {
            name: "Vega Medien Brut Cava (ly / chai)",
            desc: "D.O. Cava — ánh vàng, bọt mịn, thanh lịch",
            price: "160,000₫ / 840,000₫",
          },
          {
            name: "Conde de Haro Brut Cava (chai)",
            desc: "D.O. Cava — Viura & Chardonnay, thanh mát tinh tế",
            price: "1,400,000₫",
          },
          {
            name: "Rambla Rosé (chai)",
            desc: "D.O. Penedès — Garnacha & Tempranillo, hồng nhạt, khô",
            price: "840,000₫",
          },
          {
            name: "Lobetia Organic (ly / chai)",
            desc: "D.O. Tierra de Castilla — Chardonnay hữu cơ, tươi mát trái cây",
            price: "140,000₫ / 800,000₫",
          },
          {
            name: "Cutio Blanco (ly / chai)",
            desc: "D.O. Cariñena — Macabeo, hương hoa nhẹ nhàng",
            price: "150,000₫ / 950,000₫",
          },
          {
            name: "Basa Blanco (ly / chai)",
            desc: "D.O. Rueda — Verdejo & Viura, cân bằng giữa trái cây và hương thơm",
            price: "150,000₫ / 950,000₫",
          },
          {
            name: "Pago Mota (chai)",
            desc: "D.O. Tierra de Castilla — Chardonnay, hương trái cây chín",
            price: "1,100,000₫",
          },
          {
            name: "Muga Blanco (chai)",
            desc: "D.O.Ca. Rioja — Viura, Garnacha Blanca & Malvasía, hương thơm nổi bật",
            price: "1,300,000₫",
          },
          {
            name: "La Planta (ly / chai)",
            desc: "D.O. Ribera del Duero Tempranillo — cấu trúc chắc, vị anh đào đen",
            price: "150,000₫ / 850,000₫",
          },
          {
            name: "Cutio Tinto (ly / chai)",
            desc: "D.O. Cariñena — Garnacha, mọng vị trái cây đỏ",
            price: "160,000₫ / 900,000₫",
          },
          {
            name: "Al Muvedre (ly / chai)",
            desc: "D.O. Alicante — Monastrell, trái cây sẫm màu và gia vị",
            price: "160,000₫ / 1,000,000₫",
          },
          {
            name: "Marques de Caceres Crianza (chai)",
            desc: "D.O.Ca. Rioja — Tempranillo Crianza, cân bằng vị gỗ sồi",
            price: "1,300,000₫",
          },
          {
            name: "Muga Reserva (chai)",
            desc: "D.O.Ca. Rioja — Tempranillo Reserva, phức hợp và tinh tế",
            price: "1,500,000₫",
          },
          {
            name: 'Tío Pepe "Warhol" Fino (ly)',
            desc: "100% Palomino — khô và giòn, hương hạnh nhân",
            price: "160,000₫",
          },
          {
            name: "Apostoles 30YO Palo Cortado (ly)",
            desc: "87% Palomino / 13% PX — vị hạt dẻ, khô với chút ngọt nhẹ",
            price: "450,000₫",
          },
          {
            name: "Matsusalem 30YO Sweet Oloroso (ly)",
            desc: "75% Oloroso / 25% PX — đậm đà, sẫm màu, ngọt vị nho khô",
            price: "450,000₫",
          },
          {
            name: "Cuatro Palmas 40YO Amontillado (ly)",
            desc: "100% Palomino, ủ 40 năm — sâu lắng, vị hạt dẻ, đặc biệt",
            price: "750,000₫",
          },
        ],
      },
      {
        label: "Bia & Cocktail",
        items: [
          {
            name: "Estrella Galicia Lager (chai)",
            desc: "Biểu tượng đích thực của bia Tây Ban Nha",
            price: "95,000₫",
          },
          {
            name: "Huda Draught (33cl / 50cl)",
            desc: "Bia tươi, nhẹ nhàng dễ uống",
            price: "45,000₫ / 65,000₫",
          },
          {
            name: "Asahi Lager (chai)",
            desc: "Bia lager Nhật Bản, khô và sảng khoái",
            price: "75,000₫",
          },
          {
            name: "Tiger Lager (chai)",
            desc: "Bia lager sản xuất tại Việt Nam, nhẹ và sảng khoái",
            price: "45,000₫",
          },
          {
            name: "Classic Sangría (ly / bình)",
            desc: "Vang đỏ, trái cây tươi, vodka, sốt quế",
            price: "160,000₫ / 475,000₫",
            tag: "Đặc trưng",
          },
          {
            name: "White Sangría (ly / bình)",
            desc: "Vang trắng, sốt đào, gin, trái cây tươi",
            price: "160,000₫ / 475,000₫",
          },
          {
            name: "Sangría Spritz",
            desc: "Aperol, vermouth ngọt, nước cam, cava, soda",
            price: "170,000₫",
          },
          {
            name: "Tinto de Verano",
            desc: "Vang đỏ, Sprite, chanh — cổ điển mùa hè Tây Ban Nha",
            price: "170,000₫",
          },
          {
            name: "Mango Shake",
            desc: "Rum trắng Brugal, xoài tươi",
            price: "170,000₫",
          },
          {
            name: "Red Bubbles",
            desc: "Aperol, vang sủi, soda, cam",
            price: "170,000₫",
          },
          {
            name: "Negroni de Madrid",
            desc: "Gin Bulldog, vermouth ngọt Cinzano, Campari",
            price: "170,000₫",
          },
          {
            name: "Old Fashioned",
            desc: "Whisky Bushmills, bitter, cam",
            price: "170,000₫",
          },
          {
            name: "Espresso Martini",
            desc: "Rum trắng Brugal, cà phê Đà Lạt",
            price: "170,000₫",
          },
          {
            name: "Herradura",
            desc: "Tequila Jose Cuervo, chanh, rau mùi",
            price: "170,000₫",
          },
          {
            name: "Bloody Mary",
            desc: "Vodka Skyy, nước ép cà chua, Tabasco",
            price: "170,000₫",
          },
        ],
      },
      {
        label: "Rượu Mạnh",
        items: [
          {
            name: "Bushmills Original",
            desc: "Whisky · Irish blend, nhẹ nhàng vị mật ong",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Wild Turkey 81",
            desc: "Whisky · Bourbon Kentucky, cay nồng vị lúa mạch đen",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "Maker's Mark",
            desc: "Whisky · Bourbon lúa mì, hậu vị caramel mềm mại",
            price: "150,000₫ / 1,400,000₫",
          },
          {
            name: "St-Remy VSOP",
            desc: "Brandy · VSOP Pháp, ấm áp êm dịu",
            price: "150,000₫ / 1,450,000₫",
          },
          {
            name: "Hennessy VS",
            desc: "Cognac · VS Pháp, mượt mà đa dụng",
            price: "200,000₫ / 2,000,000₫",
          },
          {
            name: "Nordes Atlantic",
            desc: "Gin · Galicia, hương hoa thoảng vị nho albariño",
            price: "190,000₫ / 1,950,000₫",
          },
          {
            name: "Roku",
            desc: "Gin · Nhật Bản, sáu loại thảo mộc, tinh tế và cam chanh",
            price: "170,000₫ / 1,800,000₫",
          },
          {
            name: "Bulldog",
            desc: "Gin · London Dry, đậm hương bách xù",
            price: "150,000₫ / 1,450,000₫",
          },
          {
            name: "Skyy",
            desc: "Vodka · Mỹ, tinh khiết sảng khoái",
            price: "150,000₫ / 1,450,000₫",
          },
          {
            name: "Absolut",
            desc: "Vodka · Thụy Điển, tinh khiết trung tính",
            price: "150,000₫ / 1,450,000₫",
          },
          {
            name: "Brugal Blanco",
            desc: "Rum · Rum trắng Dominica, nhẹ và tinh khiết",
            price: "130,000₫ / 1,250,000₫",
          },
          {
            name: "Zacapa 23YO",
            desc: "Rum · Rum Guatemala ủ 23 năm, trái cây khô và gia vị",
            price: "350,000₫ / 3,100,000₫",
          },
          {
            name: "Jose Cuervo",
            desc: "Tequila · Blanco, cổ điển và cay nhẹ",
            price: "120,000₫ / 1,200,000₫",
          },
          {
            name: "Don Julio Blanco",
            desc: "Tequila · Blanco, 100% agave, mượt mà tinh tế",
            price: "300,000₫ / 2,900,000₫",
          },
        ],
      },
      {
        label: "Không Cồn",
        items: [
          {
            name: "Soft Drinks",
            desc: "Coca-Cola, Sprite hoặc soda — mát lạnh, đơn giản",
            price: "30,000₫",
          },
          {
            name: "Agua Lavie Con/Sin Gas",
            desc: "Nước suối hoặc có gas Lavie, 45cl",
            price: "45,000₫",
          },
          {
            name: "Mocktail del Día",
            desc: "Mocktail không cồn theo lựa chọn của bartender trong ngày",
            price: "100,000₫",
          },
          {
            name: "Zumo del Día",
            desc: "Nước ép tươi, thay đổi theo ngày",
            price: "75,000₫",
          },
          {
            name: "Café Vietnamita",
            desc: "Cà phê phin truyền thống Việt Nam, nóng hoặc đá",
            price: "50,000₫",
          },
          {
            name: "Espresso",
            desc: "Espresso Ý nguyên chất",
            price: "45,000₫",
          },
          {
            name: "Capuchino",
            desc: "Espresso, sữa hấp nóng",
            price: "50,000₫",
          },
          {
            name: "Café Trứng",
            desc: "Cà phê trứng kiểu Hà Nội, kem lòng đỏ trứng đánh bông",
            price: "60,000₫",
            tag: "Đặc trưng",
          },
        ],
      },
    ],
  },
  gallery: {
    eyebrow: "Thư Viện Ảnh",
    title: "Không gian của chúng tôi",
    subtitle:
      "Jamón thái tay, chảo nóng xèo xèo, và một không gian sinh ra cho những bữa trưa dài và bữa tối còn dài hơn.",
  },
  press: {
    eyebrow: "Đánh Giá Google",
    title: "Khách hàng nói gì",
    items: [
      {
        quote:
          "A perfect place to meet with friends and enjoy great food, especially if you love good jamón ibérico and Spanish cheeses. The atmosphere is relaxed and welcoming, making it ideal for long conversations over tapas.",
        source: "Đánh giá Google · IBÉRICO Thảo Điền, 4.6★",
      },
      {
        quote:
          "From first to last impression, everything was absolutely phenomenal. We had the delight of dining in a warm, authentic space, indulging in delicious spheres of ham.",
        source: "Đánh giá Google · IBÉRICO Thị Sách, 4.7★",
      },
      {
        quote: "The view overlooking the river in Hội An is great, especially at night.",
        source: "Đánh giá Google · IBÉRICO Hội An, 4.9★",
      },
    ],
    ratingLabel: "Đánh giá trung bình 4.7–4.9 / 5 từ khách hàng",
  },
  locations: {
    eyebrow: "Địa Điểm Của Chúng Tôi",
    title: "Ba ngôi nhà, một chiếc bàn",
    subtitle:
      "Tìm chi nhánh IBÉRICO gần bạn nhất — mỗi địa điểm đều giữ nguyên thực đơn, danh sách rượu vang, và sự chào đón như nhau.",
    directions: "Chỉ Đường",
    items: [
      {
        name: "IBÉRICO Thảo Điền",
        area: "Chi nhánh đầu tiên · Thảo Điền",
        address: "33 Võ Trường Toản, Phường Khánh, TP.HCM",
        hours: "16:00 – 23:30 hằng ngày · Bếp nóng đóng cửa 22:30",
        capacity: "Sức chứa 60 khách",
        phone: "+84 326 498 956",
        mapQuery: "33 Vo Truong Toan St, Khanh Ward, Ho Chi Minh City",
        lat: 10.8043499,
        lng: 106.7472609,
        blurb:
          "Ngôi nhà đầu tiên của chúng tôi, nằm trong khu dân cư nhiều người nước ngoài sinh sống — không gian trong nhà và ngoài trời phù hợp cho mọi dịp.",
      },
      {
        name: "IBÉRICO Thị Sách",
        area: "Phường Sài Gòn",
        address: "20A Thị Sách, Phường Sài Gòn, TP.HCM",
        hours: "11:00 – 23:30 hằng ngày · Bếp nóng đóng cửa 22:30",
        capacity: "Sức chứa 60–80 khách",
        phone: "+84 849 000 531",
        mapQuery: "20A Thi Sach St, Sai Gon Ward, Ho Chi Minh City",
        lat: 10.7782323,
        lng: 106.7046638,
        blurb:
          "Quán rượu vang trung tâm gần khu văn phòng, với phòng riêng trên lầu dành cho các sự kiện độc quyền.",
      },
      {
        name: "IBÉRICO Hội An",
        area: "Phố Cổ",
        address: "100 Bạch Đằng, Phường Hội An, Thành phố Đà Nẵng",
        hours: "11:00 – 23:30 hằng ngày · Bếp nóng đóng cửa 22:30",
        capacity: "Sức chứa 70 khách",
        phone: "+84 868 774 026",
        mapQuery: "100 Bach Dang St, Hoi An Ward, Da Nang City",
        lat: 15.8760039,
        lng: 108.3298476,
        blurb:
          "Bên bờ sông Bạch Đằng, chỉ vài bước từ Chùa Cầu, với tầm nhìn toàn cảnh tuyệt đẹp ra phố cổ.",
      },
    ],
  },
  events: {
    eyebrow: "Sự Kiện & Tiệc Riêng",
    title: "Bàn tiệc của bạn, dịp kỷ niệm của bạn",
    body: "Từ những bữa tối sinh nhật ấm cúng đến việc bao trọn nhà hàng cho sự kiện công ty, đội ngũ của chúng tôi sẽ xây dựng thực đơn chia sẻ riêng cho danh sách khách mời của bạn. Chúng tôi cũng cung cấp dịch vụ catering trọn gói bên ngoài — bao gồm những bữa tiệc paella nổi tiếng, nấu tươi tại chỗ và phục vụ theo phong cách chia sẻ cho mọi quy mô sự kiện.",
    bullets: [
      "Dịch vụ catering trọn gói cho tiệc cưới & sự kiện công ty",
      "Tiệc paella nổi tiếng, nấu tươi tại chỗ",
      "Phòng riêng trên lầu tại Thị Sách",
      "Thực đơn tapas & rượu vang tùy chỉnh",
      "Có thể bao trọn toàn bộ nhà hàng",
    ],
    cta: "Liên Hệ Về Sự Kiện & Catering",
  },
  careers: {
    eyebrow: "Tuyển Dụng",
    title: "Gia nhập đội ngũ IBÉRICO",
    subtitle:
      "Chúng tôi luôn tìm kiếm những người yêu ẩm thực và dịch vụ chân thành — tại cả Sài Gòn và Hội An.",
    applyCta: "Ứng Tuyển Ngay",
    emailNote:
      "Gửi CV và vài dòng giới thiệu đến hola@weareiberico.com, hoặc nhắn tin qua WhatsApp — cho chúng tôi biết bạn ứng tuyển vị trí nào và tại chi nhánh nào.",
    positions: [
      {
        title: "Nhân Viên Phục Vụ",
        type: "Toàn thời gian",
        department: "Phục vụ",
        description:
          "Mang đến dịch vụ chu đáo, ấm áp và tự tin giới thiệu thực đơn tapas cùng danh sách rượu vang cho khách.",
      },
      {
        title: "Thực Tập Phục Vụ",
        type: "Thực tập",
        department: "Phục vụ",
        description:
          "Học cách phục vụ theo phong cách Tây Ban Nha từ nền tảng, với sự kèm cặp trực tiếp và cơ hội trở thành nhân viên chính thức.",
      },
      {
        title: "Chef de Partie",
        type: "Toàn thời gian",
        department: "Bếp",
        description:
          "Phụ trách một khu vực bếp riêng — đồ nguội, tapas hoặc paella — với sự chính xác, ổn định và tự hào trong từng món ăn.",
      },
      {
        title: "Thực Tập Đầu Bếp",
        type: "Thực tập",
        department: "Bếp",
        description:
          "Được đào tạo thực tế tại mọi khu vực bếp, từ sơ chế jamón đến paella, dưới sự hướng dẫn của bếp trưởng.",
      },
    ],
  },
  reservation: {
    eyebrow: "Đặt Bàn",
    title: "Đặt Bàn Của Bạn",
    subtitle:
      "Cho chúng tôi biết thời gian và địa điểm — chúng tôi sẽ xác nhận qua điện thoại hoặc WhatsApp trong vài giờ.",
    name: "Họ Và Tên",
    email: "Email",
    phone: "Số Điện Thoại",
    date: "Ngày",
    time: "Giờ",
    guests: "Số Khách",
    location: "Chi Nhánh",
    notes: "Yêu Cầu Đặc Biệt",
    notesPlaceholder: "Dị ứng, dịp kỷ niệm, vị trí bàn mong muốn...",
    submit: "Gửi Yêu Cầu Đặt Bàn",
    submitWhatsApp: "Đặt Bàn Qua WhatsApp",
    submitZalo: "Đặt Bàn Qua Zalo",
    submitting: "Đang gửi...",
    success: "Đã nhận yêu cầu!",
    successBody:
      "Cảm ơn bạn — chúng tôi sẽ sớm xác nhận bàn qua điện thoại hoặc WhatsApp. ¡Hasta pronto!",
    another: "Đặt Thêm Bàn Khác",
    required: "Bắt buộc",
    whatsapp: "WhatsApp",
    zalo: "Zalo",
    orContact: "Hoặc liên hệ trực tiếp",
    call: "Gọi Điện",
    emailUs: "Email",
    lateNote:
      "Bếp nóng đóng cửa lúc 22:30 — vẫn có thể đặt bàn đến 23:30 với thực đơn giới hạn (đồ nguội, phô mai, rượu vang).",
    zaloCopied: "Đã sao chép thông tin — vui lòng dán vào cuộc trò chuyện Zalo vừa mở.",
  },
  footer: {
    tagline: "Tapas và rượu vang Tây Ban Nha chính thống, cùng chia sẻ tại Thành phố Hồ Chí Minh.",
    visit: "Ghé Thăm",
    connect: "Kết Nối",
    rights: "Bảo lưu mọi quyền.",
    madeWith: "Sài Gòn · Hội An",
  },
};

const es: Dict = {
  meta: { skipToContent: "Saltar al contenido" },
  marquee: [
    "Mejor Restaurante Español · Gourmet Vietnam Awards 2025",
    "Jamón Ibérico de Bellota Cortado a Mano",
    "Ciudad Ho Chi Minh · Hội An",
    "Tapas y Vino Desde 2021",
  ],
  nav: {
    story: "Historia",
    menu: "Carta",
    gallery: "Galería",
    locations: "Locales",
    events: "Eventos",
    careers: "Empleo",
    reserve: "Reservar",
  },
  hero: {
    eyebrow: "Vinos y Tapas · Saigón · Desde 2021",
    title1: "Tapas",
    title2: "y Vino",
    subtitle:
      "Tapas ibéricas y vino español, sin prisa — en el corazón de Ho Chi Minh.",
    cta1: "Reservar Mesa",
    cta2: "Ver la Carta",
    scroll: "Desplázate",
  },
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
  story: {
    eyebrow: "Nuestra Historia",
    title: "El Espíritu Vivo de la Gastronomía Española en Vietnam",
    body: "Fundado en 2021, IBÉRICO trajo el espíritu de las tapas españolas a Vietnam: jamón cortado a mano, gambas al ajillo recién salidas de la sartén, paella pensada para toda la mesa. Pide por instinto, comparte todo, quédate hasta tarde — hoy con tres locales, desde Saigón hasta el río en Hội An.",
    quote: "El Mejor Restaurante Español de Vietnam.",
    quoteAuthor: "Gourmet Vietnam Awards, 2025",
    stats: [
      { value: "2021", label: "Fundado en Saigón" },
      { value: "3", label: "Locales en Vietnam" },
      { value: "2025", label: "Mejor Restaurante Español, Gourmet Vietnam Awards" },
      { value: "4.7–4.9★", label: "Valoración de los clientes" },
    ],
  },
  menu: {
    eyebrow: "La Carta",
    title: "Una carta pensada para compartir",
    subtitle:
      "Embutidos, tapas calientes y platos de sartén — pide dos o tres por persona, al estilo familiar, tal como debe ser.",
    note: "Precios en VND (miles) · Sin incluir 5% de servicio ni 8–10% de IVA",
    categories: [
      {
        label: "Jamón, Embutidos y Quesos",
        items: [
          {
            name: 'Jamón Ibérico de Bellota "Pata Negra"',
            desc: "Cortado a mano en el momento — el VIP de los jamones curados (50g / 100g)",
            price: "499.000₫ / 960.000₫",
            tag: "Especialidad",
          },
          {
            name: "Tabla de Ibérico",
            desc: "Chorizo, salchichón y morcilla ibérica, queso Manchego, aceitunas marinadas (pequeña / grande)",
            price: "595.000₫ / 998.000₫",
          },
          {
            name: "Chorizo Ibérico",
            desc: "Chorizo ibérico de bellota, cortado a mano (50g / 100g)",
            price: "220.000₫ / 350.000₫",
          },
          {
            name: "Salchichón Ibérico",
            desc: "Salchichón ibérico de bellota, cortado a mano (50g / 100g)",
            price: "220.000₫ / 350.000₫",
          },
          {
            name: "Morcilla Ibérico",
            desc: "Morcilla ibérica, cortada a mano (50g / 100g)",
            price: "220.000₫ / 350.000₫",
          },
          {
            name: "Cecina Ibérica",
            desc: "Cecina de ternera curada y ahumada (50g / 100g)",
            price: "290.000₫ / 550.000₫",
          },
          {
            name: "Tabla de Queso",
            desc: "Manchego trufado, Idiazábal, queso azul madurado, membrillo, almendras",
            price: "490.000₫",
          },
          {
            name: "Manchego Trufado",
            desc: "Manchego curado con trufa, lujo y confort en un bocado",
            price: "280.000₫",
          },
          {
            name: "Manchego Cheese",
            desc: "Manchego curado 12 meses",
            price: "280.000₫",
          },
          {
            name: "Idiazábal",
            desc: "Queso de oveja sin pasteurizar",
            price: "250.000₫",
          },
          {
            name: "Queso Azul Madurado",
            desc: "Queso azul madurado",
            price: "180.000₫",
          },
          {
            name: "Membrillo",
            desc: "Pasta de membrillo",
            price: "75.000₫",
          },
        ],
      },
      {
        label: "Tapas del Mar",
        items: [
          {
            name: "Sashimi Mediterráneo",
            desc: "Sashimi al estilo mediterráneo, alcaparras",
            price: "235.000₫",
          },
          {
            name: "Ostras con Salsa Mignonette",
            desc: "Ostras frescas, salsa mignonette — 5 unidades",
            price: "150.000₫",
          },
          {
            name: "Anchoas del Cantábrico",
            desc: "Anchoas curadas en aceite de oliva, pan tostado",
            price: "350.000₫",
          },
          {
            name: "Boquerones en Vinagre con Chips",
            desc: "Boquerones en vinagre, patatas chips",
            price: "180.000₫",
          },
          {
            name: "Mojama de Atún",
            desc: "Mojama de atún mediterráneo, almendras",
            price: "250.000₫",
          },
          {
            name: "Mar y Sal",
            desc: "Bandeja de mojama, ostras, gildas, anchoas y boquerones",
            price: "890.000₫",
            tag: "Especialidad",
          },
        ],
      },
      {
        label: "Picoteo",
        items: [
          {
            name: "Pan con Tumaca y Aioli",
            desc: "Pan tostado, tomate maduro, alioli",
            price: "70.000₫",
          },
          {
            name: "Gilda Ibérica",
            desc: "Brocheta de anchoa, oliva y guindilla piparra — 2 unidades",
            price: "135.000₫",
          },
          {
            name: "Brioche de Atún con Chocolate Blanco",
            desc: "Brioche, atún, chocolate blanco — 2 unidades",
            price: "170.000₫",
          },
          {
            name: "Olivas Fritas",
            desc: "Aceitunas rellenas y fritas — 3 unidades",
            price: "130.000₫",
          },
          {
            name: "Aceitunas Ibérico",
            desc: "Aceitunas marinadas",
            price: "110.000₫",
          },
          {
            name: "Almendras Fritas con Sal",
            desc: "Almendras fritas con sal y pimienta",
            price: "90.000₫",
          },
        ],
      },
      {
        label: "Tapas Clásicas",
        items: [
          {
            name: "Croquetas de Jamón",
            desc: "Croquetas de jamón ibérico, cobertura dorada y crujiente — 6 / 12 unidades",
            price: "150.000₫ / 290.000₫",
            tag: "Más Pedido",
          },
          {
            name: "Croquetas de Setas con Crema de Manchego",
            desc: "Croquetas de setas, mousse de queso Manchego — 6 / 12 unidades",
            price: "135.000₫ / 265.000₫",
          },
          {
            name: "Gambas al Ajillo",
            desc: "Gambas al estilo ibérico, salteadas en aceite de oliva",
            price: "265.000₫",
            tag: "Especialidad",
          },
          {
            name: "Tortilla de Patatas con Aioli",
            desc: "Tortilla española de cocción lenta, alioli (tapa / ración)",
            price: "90.000₫ / 150.000₫",
          },
          {
            name: "Ensaladilla de Gambas",
            desc: "Ensaladilla rusa cremosa, gambas (tapa / ración)",
            price: "150.000₫ / 255.000₫",
          },
          {
            name: "Setas Escabeche con Crema de Manchego",
            desc: "Setas en escabeche, mousse de queso Manchego (tapa / ración)",
            price: "120.000₫ / 215.000₫",
          },
          {
            name: "Patatas Bravas",
            desc: "Patatas bravas crujientes, alioli",
            price: "120.000₫",
          },
          {
            name: "Patatas con Aioli",
            desc: "Patatas fritas, alioli, chalota encurtida",
            price: "120.000₫",
          },
          {
            name: "Mejillones en Escabeche con Chips",
            desc: "Mejillones en escabeche, patatas chips",
            price: "165.000₫",
          },
          {
            name: "Calamares Fritos con Aioli de Pimienta Negra",
            desc: "Calamares fritos, alioli de pimienta negra",
            price: "225.000₫",
          },
          {
            name: "Almejas al Ajillo",
            desc: "Almejas al ajillo, salsa de tomate",
            price: "225.000₫",
          },
          {
            name: "Gambas Fritas con Aioli de Limón y Wasabi",
            desc: "Gambas fritas, alioli de limón y wasabi",
            price: "195.000₫",
          },
          {
            name: "Mero Frito con Pilpil Cítrico",
            desc: "Mero frito, pilpil cítrico",
            price: "190.000₫",
          },
        ],
      },
      {
        label: "Tapas de la Casa",
        items: [
          {
            name: "Ensalada de la Casa",
            desc: "Ensalada verde, vinagreta de avellanas",
            price: "95.000₫",
          },
          {
            name: "Escabeche de Coliflor Asada",
            desc: "Coliflor asada en escabeche",
            price: "155.000₫",
          },
          {
            name: "Calabacín Ahumado con Queso Idiazábal",
            desc: "Calabacín ahumado, queso Idiazábal y mermelada de hinojo",
            price: "165.000₫",
          },
          {
            name: "Espárragos Blancos con Holandesa y Manchego",
            desc: "Espárragos blancos, salsa holandesa y Manchego",
            price: "235.000₫",
          },
          {
            name: "Bomba de Sobrasada",
            desc: "Croqueta de patata empanada, rellena de sobrasada",
            price: "195.000₫",
          },
          {
            name: "Tiradito del Día",
            desc: "Pescado del día, leche de tigre de maracuyá",
            price: "190.000₫",
          },
          {
            name: "Arroz Meloso de Carrilleras y Judías",
            desc: "Arroz meloso de carrilleras de ternera y guisantes",
            price: "325.000₫",
          },
          {
            name: "Vieras con Jamón Ibérico y Sopa de Maíz",
            desc: "Vieiras a la plancha con jamón ibérico y sopa de maíz",
            price: "295.000₫",
          },
          {
            name: "Iberico Sando",
            desc: "Sándwich de cerdo ibérico, brioche",
            price: "350.000₫",
          },
          {
            name: "Pulpo Frito con Romesco",
            desc: "Pulpo frito, salsa romesco",
            price: "290.000₫",
          },
          {
            name: "Costilla de Ibérico a la Barbacoa",
            desc: "Costillas ibéricas a la barbacoa, cacahuetes, col encurtida",
            price: "415.000₫",
          },
          {
            name: "Secreto Ibérico con Brocolini y Pimientos Encurtidos",
            desc: "Secreto ibérico a la plancha, brócoli tierno, pimiento encurtido, jugo de jerez",
            price: "495.000₫",
          },
          {
            name: "Picaña a la Parilla con Chimichurri",
            desc: "Picaña a la parrilla, salsa chimichurri",
            price: "475.000₫",
          },
        ],
      },
      {
        label: "Paella",
        items: [
          {
            name: "Paella Marisco",
            desc: "Calamar, almeja, gamba y pescado — mín. 2 personas, por persona",
            price: "275.000₫",
          },
          {
            name: "Arroz Negro",
            desc: "Arroz negro, calamar, chips de ajo — mín. 2 personas, por persona",
            price: "335.000₫",
            tag: "Especialidad",
          },
          {
            name: "Paella Vegetariana",
            desc: "Brócoli, espárrago verde, hinojo, cebolla caramelizada — por persona",
            price: "215.000₫",
          },
        ],
      },
      {
        label: "Postres",
        items: [
          {
            name: "Tarta de Queso Manchego",
            desc: "Tarta de queso quemada al estilo vasco, con Manchego",
            price: "130.000₫",
          },
          {
            name: "Churros con Chocolate",
            desc: "Churros calientes con chocolate negro",
            price: "115.000₫",
          },
          {
            name: "Torrija Limón y Pomelo",
            desc: '"Torrija" española, crema de limón, pomelo',
            price: "155.000₫",
          },
          {
            name: "Helados",
            desc: "Helado de chocolate, fresa, limón o coco",
            price: "75.000₫",
          },
        ],
      },
      {
        label: "Vinos y Bebidas",
        items: [
          {
            name: "Sangría Clásica (copa / jarra)",
            desc: "Vino tinto, fruta variada, vodka, sirope de canela",
            price: "140.000₫ / 495.000₫",
            tag: "Especialidad",
          },
          {
            name: "Sangría Blanca (copa / jarra)",
            desc: "Vino blanco, sirope de melocotón, ginebra, fruta variada",
            price: "140.000₫ / 495.000₫",
          },
          {
            name: "Sangría Spritz",
            desc: "Aperol, vermut dulce, zumo de naranja, cava, soda",
            price: "175.000₫",
          },
          {
            name: "Negroni",
            desc: "Ginebra Bulldog, vermut dulce, Campari",
            price: "175.000₫",
          },
          {
            name: "Old Fashioned",
            desc: "Whisky Bushmills, angostura, naranja",
            price: "175.000₫",
          },
          {
            name: "Tinto de Verano",
            desc: "Vino tinto, Sprite, lima — el clásico veraniego español",
            price: "140.000₫",
          },
          {
            name: "Margarita",
            desc: "Tequila Jose Cuervo, lima, triple sec",
            price: "175.000₫",
          },
          {
            name: "Mojito",
            desc: "Ron blanco Brugal, menta, soda — el clásico cubano",
            price: "175.000₫",
          },
          {
            name: "Whisky Sour",
            desc: "Whisky Wild Turkey, clara de huevo, lima, angostura",
            price: "175.000₫",
          },
          {
            name: "Red Bubbles",
            desc: "Aperol, vino espumoso, soda, naranja",
            price: "175.000₫",
          },
          {
            name: "Vega Medien Brut Cava (copa / botella)",
            desc: "D.O. Cava — reflejos dorados, burbuja fina y elegante",
            price: "160.000₫ / 950.000₫",
          },
          {
            name: "Muga Rosé (botella)",
            desc: "D.O. Rioja — fresco, con notas de fruta roja",
            price: "1.000.000₫",
          },
          {
            name: "Basa Blanco (copa / botella)",
            desc: "D.O. Rueda — Verdejo y Viura, equilibrio entre fruta y aromática",
            price: "140.000₫ / 850.000₫",
          },
          {
            name: "Faustino Rivero Ulecia (botella)",
            desc: "D.O. Rías Baixas Albariño — fresco, con lima y melocotón blanco",
            price: "1.350.000₫",
          },
          {
            name: "La Planta (copa / botella)",
            desc: "D.O. Ribera del Duero Tempranillo — estructurado, cereza negra",
            price: "170.000₫ / 980.000₫",
          },
          {
            name: "Marqués de Vargas Reserva (botella)",
            desc: "D.O.Ca. Rioja — cereza madura, cedro, tabaco",
            price: "2.300.000₫",
            tag: "Favorito del Chef",
          },
          {
            name: 'Tío Pepe "Warhol" Fino (copa)',
            desc: "100% Palomino — seco y fresco, con notas de almendra",
            price: "160.000₫",
          },
          {
            name: "Estrella Galicia Lager (botella)",
            desc: "Un verdadero ícono de la cerveza española",
            price: "95.000₫",
          },
          {
            name: "1906 Reserva Lager (botella)",
            desc: "Lager ámbar gallega, maltosa y con cuerpo",
            price: "95.000₫",
          },
          {
            name: "Asahi Lager (botella)",
            desc: "Lager japonesa, seca y refrescante",
            price: "95.000₫",
          },
          {
            name: "Huda Lager (botella)",
            desc: "Lager vietnamita, fácil de beber y muy popular",
            price: "60.000₫",
          },
        ],
      },
      {
        label: "Destilados",
        items: [
          {
            name: "High Commissionner",
            desc: "Whisky · Blended Scotch, suave y fácil",
            price: "150.000₫ / 1.400.000₫",
          },
          {
            name: "Bushmills Original",
            desc: "Whisky · Blend irlandés, ligero y dulce como la miel",
            price: "150.000₫ / 1.400.000₫",
          },
          {
            name: "Wild Turkey 81",
            desc: "Whisky · Bourbon de Kentucky, especiado y con carácter",
            price: "150.000₫ / 1.400.000₫",
          },
          {
            name: "Maker's Mark",
            desc: "Whisky · Bourbon de trigo, final suave a caramelo",
            price: "190.000₫ / 1.800.000₫",
          },
          {
            name: "Monkey Shoulder",
            desc: "Whisky · Blended malt escocés, redondo y con cuerpo",
            price: "200.000₫ / 2.100.000₫",
          },
          {
            name: "Singleton 12YO",
            desc: "Whisky · Single malt de 12 años, notas de fruta",
            price: "220.000₫ / 2.600.000₫",
          },
          {
            name: "Macallan 12YO",
            desc: "Whisky · Single malt de 12 años, profundidad de roble de jerez",
            price: "350.000₫ / 4.300.000₫",
          },
          {
            name: "St-Remy VSOP",
            desc: "Brandy · VSOP francés, cálido y suave",
            price: "160.000₫ / 1.450.000₫",
          },
          {
            name: "Brandy Lustau Solera Reserva",
            desc: "Brandy · Solera Reserva español, pasas y roble",
            price: "200.000₫ / 2.000.000₫",
          },
          {
            name: "Skyy",
            desc: "Vodka · Estadounidense, limpio y fresco",
            price: "150.000₫ / 1.400.000₫",
          },
          {
            name: "Ketel One",
            desc: "Vodka · Vodka de trigo holandés, sedoso",
            price: "180.000₫ / 1.700.000₫",
          },
          {
            name: "Nordes Atlantic",
            desc: "Gin · Gallego, floral con un toque de uva albariño",
            price: "190.000₫ / 1.950.000₫",
          },
          {
            name: "Bulldog",
            desc: "Gin · London Dry, protagonismo del enebro",
            price: "160.000₫ / 1.400.000₫",
          },
          {
            name: "Roku",
            desc: "Gin · Japonés, seis botánicos, delicado y cítrico",
            price: "170.000₫ / 1.800.000₫",
          },
          {
            name: "Brugal Blanco",
            desc: "Ron · Ron blanco dominicano, ligero y limpio",
            price: "130.000₫ / 1.400.000₫",
          },
          {
            name: "Mount Gay Eclipse",
            desc: "Ron · Ron dorado de Barbados, plátano y toffee",
            price: "130.000₫ / 1.400.000₫",
          },
          {
            name: "Zacapa 23YO",
            desc: "Ron · Guatemalteco, añejado 23 años, fruta seca y especias",
            price: "350.000₫ / 3.100.000₫",
          },
          {
            name: "Jose Cuervo",
            desc: "Tequila · Blanco, clásico y picante",
            price: "120.000₫ / 1.200.000₫",
          },
          {
            name: "1800 Blanco",
            desc: "Tequila · Blanco, 100% agave, cítrico y pimienta",
            price: "200.000₫ / 2.100.000₫",
          },
          {
            name: "Don Julio Blanco",
            desc: "Tequila · Blanco, 100% agave, suave y refinado",
            price: "310.000₫ / 2.900.000₫",
          },
        ],
      },
      {
        label: "Sin Alcohol",
        items: [
          {
            name: "Soft Drinks",
            desc: "Coca-Cola, Sprite o soda — bien fría y sencilla",
            price: "45.000₫",
          },
          {
            name: "Agua Lavie Con/Sin Gas",
            desc: "Agua con o sin gas, 45cl",
            price: "60.000₫",
          },
          {
            name: "San Pellegrino",
            desc: "Agua mineral con gas italiana, 75cl",
            price: "120.000₫",
          },
          {
            name: 'Sidra de Manzana "Chill Kombucha"',
            desc: "Kombucha de manzana con burbujas, un capricho sin alcohol",
            price: "120.000₫",
          },
          {
            name: "Mocktail del Día",
            desc: "Selección sin alcohol del bartender del día",
            price: "120.000₫",
          },
          {
            name: "Zumo del Día",
            desc: "Zumo recién exprimido, cambia cada día",
            price: "75.000₫",
          },
          {
            name: "Espresso / Cappuccino",
            desc: "Café italiano, a tu gusto",
            price: "60.000₫",
          },
        ],
      },
    ],
    hoianNote: "Precios en VND (miles) · Sin incluir 8–10% de IVA",
    hoianCategories: [
      {
        label: "Menús Exclusivos",
        items: [
          {
            name: "Bellota Set Menu",
            desc: "Pan con Tumaca, Almendras Fritas, Croquetas de Jamón, Almejas al Ajillo, Patatas Bravas y Setas Escabeche — degustación completa para compartir",
            price: "345.000₫ / persona",
          },
          {
            name: "Pata Negra Set Menu",
            desc: "Todo lo del menú Bellota, más Calamares Fritos, Ensaladilla de Gambas, Idiazábal y Churros con Chocolate",
            price: "595.000₫ / persona",
          },
        ],
      },
      {
        label: "Jamón, Embutidos y Quesos",
        items: [
          {
            name: 'Jamón Ibérico de Bellota "Pata Negra"',
            desc: "Cortado a mano en el momento — el VIP de los jamones curados (50g / 100g)",
            price: "499.000₫ / 960.000₫",
            tag: "Especialidad",
          },
          {
            name: "Tabla de Ibérico",
            desc: "Chorizo, salchichón y morcilla ibérica, queso Manchego, aceitunas marinadas (pequeña / grande)",
            price: "450.000₫ / 960.000₫",
          },
          {
            name: "Tabla de Queso",
            desc: "Manchego trufado, Idiazábal, queso azul madurado, membrillo, almendras",
            price: "425.000₫",
          },
          {
            name: "Chorizo Ibérico",
            desc: "Chorizo ibérico de bellota, cortado a mano (50g / 100g)",
            price: "220.000₫ / 350.000₫",
          },
          {
            name: "Salchichón Ibérico",
            desc: "Salchichón ibérico de bellota, cortado a mano (50g / 100g)",
            price: "220.000₫ / 350.000₫",
          },
          {
            name: "Morcilla Ibérico",
            desc: "Morcilla ibérica, cortada a mano (50g / 100g)",
            price: "220.000₫ / 350.000₫",
          },
          {
            name: "Cecina Ibérica",
            desc: "Cecina de ternera curada y ahumada (50g / 100g)",
            price: "290.000₫ / 550.000₫",
          },
          {
            name: "Manchego Trufado",
            desc: "Manchego curado con trufa, lujo y confort en un bocado",
            price: "280.000₫",
          },
          {
            name: "Manchego Cheese",
            desc: "Manchego curado 12 meses",
            price: "280.000₫",
          },
          {
            name: "Idiazábal",
            desc: "Queso de oveja sin pasteurizar",
            price: "250.000₫",
          },
          {
            name: "Membrillo",
            desc: "Pasta de membrillo",
            price: "75.000₫",
          },
        ],
      },
      {
        label: "Tapas del Mar",
        items: [
          {
            name: "Anchoas del Cantábrico",
            desc: "Anchoas curadas en aceite de oliva, pan tostado",
            price: "350.000₫",
          },
          {
            name: "Mojama de Atún",
            desc: "Mojama de atún mediterráneo, almendras",
            price: "210.000₫",
          },
        ],
      },
      {
        label: "Pintxos - Bocados",
        items: [
          {
            name: "Tabla de Pintxos - Bites Platter",
            desc: "Bandeja para compartir — elige 5 pintxos",
            price: "190.000₫",
            tag: "Especialidad",
          },
          {
            name: "Cono de Pollo Ahumado y Zanahoria Encurtida",
            desc: "Cono de crema de pollo ahumado y zanahoria encurtida",
            price: "40.000₫",
          },
          {
            name: "Rollito de Gamba y Menta con Salsa de Chile Dulce",
            desc: "Rollito de gamba y menta, salsa de chile dulce",
            price: "40.000₫",
          },
          {
            name: "Tartaleta de Salmorejo y Jamón",
            desc: "Tartaleta de salmorejo y jamón",
            price: "40.000₫",
          },
          {
            name: "Aceituna Rellena Frita",
            desc: "Aceituna rellena y frita",
            price: "40.000₫",
          },
          {
            name: "Airbag de Sardina Ahumada y Chalota Encurtida",
            desc: 'Cracker "airbag" crujiente, sardina ahumada, chalota encurtida',
            price: "40.000₫",
          },
        ],
      },
      {
        label: "Picoteo",
        items: [
          {
            name: "Pan con Tumaca y Aioli",
            desc: "Pan tostado, tomate maduro, alioli",
            price: "70.000₫",
          },
          {
            name: "Aceitunas Ibérico",
            desc: "Aceitunas marinadas",
            price: "95.000₫",
          },
          {
            name: "Almendras Fritas con Sal",
            desc: "Almendras fritas con sal y pimienta",
            price: "75.000₫",
          },
          {
            name: "Gilda Ibérica",
            desc: "Brocheta de anchoa, oliva y guindilla piparra — 2 unidades",
            price: "135.000₫",
          },
        ],
      },
      {
        label: "Tapas Clásicas",
        items: [
          {
            name: "Croquetas de Jamón",
            desc: "Croquetas de jamón ibérico, cobertura dorada y crujiente — 6 / 12 unidades",
            price: "160.000₫ / 280.000₫",
            tag: "Más Pedido",
          },
          {
            name: "Croquetas de Setas con Crema de Manchego",
            desc: "Croquetas de setas, mousse de queso Manchego — 6 / 12 unidades",
            price: "135.000₫ / 265.000₫",
          },
          {
            name: "Tortilla de Patatas con Aioli",
            desc: "Tortilla española de cocción lenta, alioli (tapa / ración)",
            price: "105.000₫ / 180.000₫",
          },
          {
            name: "Ensaladilla de Gambas",
            desc: "Ensaladilla rusa cremosa, gambas (tapa / ración)",
            price: "135.000₫ / 240.000₫",
          },
          {
            name: "Setas Escabeche con Crema de Manchego",
            desc: "Setas en escabeche, mousse de queso Manchego (tapa / ración)",
            price: "105.000₫ / 205.000₫",
          },
          {
            name: "Gambas al Ajillo",
            desc: "Gambas al estilo ibérico, salteadas en aceite de oliva",
            price: "255.000₫",
            tag: "Especialidad",
          },
          {
            name: "Patatas Bravas",
            desc: "Patatas bravas crujientes, alioli",
            price: "120.000₫",
          },
          {
            name: "Patatas con Aioli",
            desc: "Patatas fritas, alioli, chalota encurtida",
            price: "120.000₫",
          },
          {
            name: "Mejillones en Escabeche con Chips",
            desc: "Mejillones en escabeche, patatas chips",
            price: "135.000₫",
          },
          {
            name: "Calamares Fritos con Aioli de Pimienta Negra",
            desc: "Calamares fritos, alioli de pimienta negra",
            price: "225.000₫",
          },
          {
            name: "Berenjenas Fritas con Miel",
            desc: "Berenjenas fritas, con un toque de miel",
            price: "115.000₫",
          },
          {
            name: "Ensalada de la Casa",
            desc: "Ensalada verde, vinagreta de avellanas",
            price: "95.000₫",
          },
          {
            name: "Almejas al Ajillo",
            desc: "Almejas al ajillo, salsa de tomate",
            price: "195.000₫",
          },
          {
            name: "Col a la Parrilla",
            desc: "Col a la parrilla, puerros, salsa romesco y Manchego",
            price: "175.000₫",
          },
        ],
      },
      {
        label: "Tapas de la Casa",
        items: [
          {
            name: "Carne a la Parilla con Chimichurri",
            desc: "Corte del chef a la parrilla, pastel de patata, salsa chimichurri",
            price: "395.000₫",
            tag: "Especialidad",
          },
          {
            name: "Pollo Relleno a la Trufa",
            desc: "Ballotine de pollo, zanahoria encurtida, jugo de trufa",
            price: "225.000₫",
          },
          {
            name: "Pescado de la Bahía",
            desc: "Pescado del día, pisto, puerros fritos",
            price: "350.000₫",
          },
          {
            name: "Spaguetti a la Marinera",
            desc: "Espaguetis marineros, gambas al ajillo, tomate ahumado",
            price: "235.000₫",
          },
        ],
      },
      {
        label: "Paella",
        items: [
          {
            name: "Paella Marisco",
            desc: "Calamar, almeja, gamba y pescado, sartén entera — lista en ~25 min, pide unas tapas mientras esperas. Posibilidad de sartén más grande",
            price: "495.000₫ / sartén",
          },
          {
            name: "Paella Vegetariana",
            desc: "Brócoli, espárrago verde, hinojo, cebolla caramelizada, sartén entera — lista en ~25 min. Posibilidad de sartén más grande",
            price: "430.000₫ / sartén",
          },
        ],
      },
      {
        label: "Postres",
        items: [
          {
            name: "Tarta de Queso Manchego",
            desc: "Tarta de queso quemada al estilo vasco, con Manchego",
            price: "110.000₫",
          },
          {
            name: "Churros con Chocolate",
            desc: "Churros calientes con chocolate negro",
            price: "110.000₫",
          },
          {
            name: "Tarta de Lima de Hội An con Crema Ahumada",
            desc: "Tarta de lima al estilo de Hội An, crema ahumada",
            price: "110.000₫",
            tag: "Especialidad",
          },
          {
            name: "Helados",
            desc: "Helado de chocolate, fresa, limón o coco",
            price: "60.000₫",
          },
        ],
      },
      {
        label: "Vinos",
        items: [
          {
            name: "Vega Medien Brut Cava (copa / botella)",
            desc: "D.O. Cava — reflejos dorados, burbuja fina y elegante",
            price: "160.000₫ / 840.000₫",
          },
          {
            name: "Conde de Haro Brut Cava (botella)",
            desc: "D.O. Cava — Viura y Chardonnay, fresco y refinado",
            price: "1.400.000₫",
          },
          {
            name: "Rambla Rosé (botella)",
            desc: "D.O. Penedès — Garnacha y Tempranillo, pálido y seco",
            price: "840.000₫",
          },
          {
            name: "Lobetia Organic (copa / botella)",
            desc: "D.O. Tierra de Castilla — Chardonnay orgánico, limpio y afrutado",
            price: "140.000₫ / 800.000₫",
          },
          {
            name: "Cutio Blanco (copa / botella)",
            desc: "D.O. Cariñena — Macabeo, floral y ligero",
            price: "150.000₫ / 950.000₫",
          },
          {
            name: "Basa Blanco (copa / botella)",
            desc: "D.O. Rueda — Verdejo y Viura, equilibrio entre fruta y aromática",
            price: "150.000₫ / 950.000₫",
          },
          {
            name: "Pago Mota (botella)",
            desc: "D.O. Tierra de Castilla — Chardonnay, fruta de hueso madura",
            price: "1.100.000₫",
          },
          {
            name: "Muga Blanco (botella)",
            desc: "D.O.Ca. Rioja — Viura, Garnacha Blanca y Malvasía, muy aromático",
            price: "1.300.000₫",
          },
          {
            name: "La Planta (copa / botella)",
            desc: "D.O. Ribera del Duero Tempranillo — estructurado, cereza negra",
            price: "150.000₫ / 850.000₫",
          },
          {
            name: "Cutio Tinto (copa / botella)",
            desc: "D.O. Cariñena — Garnacha, fruta roja jugosa",
            price: "160.000₫ / 900.000₫",
          },
          {
            name: "Al Muvedre (copa / botella)",
            desc: "D.O. Alicante — Monastrell, fruta oscura y especias",
            price: "160.000₫ / 1.000.000₫",
          },
          {
            name: "Marques de Caceres Crianza (botella)",
            desc: "D.O.Ca. Rioja — Tempranillo Crianza, roble equilibrado",
            price: "1.300.000₫",
          },
          {
            name: "Muga Reserva (botella)",
            desc: "D.O.Ca. Rioja — Tempranillo Reserva, complejo y refinado",
            price: "1.500.000₫",
          },
          {
            name: 'Tío Pepe "Warhol" Fino (copa)',
            desc: "100% Palomino — seco y fresco, con notas de almendra",
            price: "160.000₫",
          },
          {
            name: "Apostoles 30YO Palo Cortado (copa)",
            desc: "87% Palomino / 13% PX — a frutos secos, seco con un toque dulce",
            price: "450.000₫",
          },
          {
            name: "Matsusalem 30YO Sweet Oloroso (copa)",
            desc: "75% Oloroso / 25% PX — rico, oscuro, dulzor a pasas",
            price: "450.000₫",
          },
          {
            name: "Cuatro Palmas 40YO Amontillado (copa)",
            desc: "100% Palomino, envejecido 40 años — profundo, a frutos secos, extraordinario",
            price: "750.000₫",
          },
        ],
      },
      {
        label: "Cerveza y Cócteles",
        items: [
          {
            name: "Estrella Galicia Lager (botella)",
            desc: "Un verdadero ícono de la cerveza española",
            price: "95.000₫",
          },
          {
            name: "Huda Draught (33cl / 50cl)",
            desc: "Cerveza de barril, ligera y fácil de beber",
            price: "45.000₫ / 65.000₫",
          },
          {
            name: "Asahi Lager (botella)",
            desc: "Lager japonesa, seca y refrescante",
            price: "75.000₫",
          },
          {
            name: "Tiger Lager (botella)",
            desc: "Lager elaborada en Vietnam, ligera y refrescante",
            price: "45.000₫",
          },
          {
            name: "Sangría Clásica (copa / jarra)",
            desc: "Vino tinto, fruta variada, vodka, sirope de canela",
            price: "160.000₫ / 475.000₫",
            tag: "Especialidad",
          },
          {
            name: "Sangría Blanca (copa / jarra)",
            desc: "Vino blanco, sirope de melocotón, ginebra, fruta variada",
            price: "160.000₫ / 475.000₫",
          },
          {
            name: "Sangría Spritz",
            desc: "Aperol, vermut dulce, zumo de naranja, cava, soda",
            price: "170.000₫",
          },
          {
            name: "Tinto de Verano",
            desc: "Vino tinto, Sprite, lima — el clásico veraniego español",
            price: "170.000₫",
          },
          {
            name: "Mango Shake",
            desc: "Ron blanco Brugal, mango fresco",
            price: "170.000₫",
          },
          {
            name: "Red Bubbles",
            desc: "Aperol, vino espumoso, soda, naranja",
            price: "170.000₫",
          },
          {
            name: "Negroni de Madrid",
            desc: "Ginebra Bulldog, vermut dulce Cinzano, Campari",
            price: "170.000₫",
          },
          {
            name: "Old Fashioned",
            desc: "Whisky Bushmills, angostura, naranja",
            price: "170.000₫",
          },
          {
            name: "Espresso Martini",
            desc: "Ron blanco Brugal, café de Đà Lạt",
            price: "170.000₫",
          },
          {
            name: "Herradura",
            desc: "Tequila Jose Cuervo, lima, cilantro",
            price: "170.000₫",
          },
          {
            name: "Bloody Mary",
            desc: "Vodka Skyy, zumo de tomate, Tabasco",
            price: "170.000₫",
          },
        ],
      },
      {
        label: "Destilados",
        items: [
          {
            name: "Bushmills Original",
            desc: "Whisky · Blend irlandés, ligero y dulce como la miel",
            price: "150.000₫ / 1.400.000₫",
          },
          {
            name: "Wild Turkey 81",
            desc: "Whisky · Bourbon de Kentucky, especiado y con carácter",
            price: "150.000₫ / 1.400.000₫",
          },
          {
            name: "Maker's Mark",
            desc: "Whisky · Bourbon de trigo, final suave a caramelo",
            price: "150.000₫ / 1.400.000₫",
          },
          {
            name: "St-Remy VSOP",
            desc: "Brandy · VSOP francés, cálido y suave",
            price: "150.000₫ / 1.450.000₫",
          },
          {
            name: "Hennessy VS",
            desc: "Coñac · VS francés, suave y versátil",
            price: "200.000₫ / 2.000.000₫",
          },
          {
            name: "Nordes Atlantic",
            desc: "Gin · Gallego, floral con un toque de uva albariño",
            price: "190.000₫ / 1.950.000₫",
          },
          {
            name: "Roku",
            desc: "Gin · Japonés, seis botánicos, delicado y cítrico",
            price: "170.000₫ / 1.800.000₫",
          },
          {
            name: "Bulldog",
            desc: "Gin · London Dry, protagonismo del enebro",
            price: "150.000₫ / 1.450.000₫",
          },
          {
            name: "Skyy",
            desc: "Vodka · Estadounidense, limpio y fresco",
            price: "150.000₫ / 1.450.000₫",
          },
          {
            name: "Absolut",
            desc: "Vodka · Sueco, puro y neutro",
            price: "150.000₫ / 1.450.000₫",
          },
          {
            name: "Brugal Blanco",
            desc: "Ron · Ron blanco dominicano, ligero y limpio",
            price: "130.000₫ / 1.250.000₫",
          },
          {
            name: "Zacapa 23YO",
            desc: "Ron · Guatemalteco, añejado 23 años, fruta seca y especias",
            price: "350.000₫ / 3.100.000₫",
          },
          {
            name: "Jose Cuervo",
            desc: "Tequila · Blanco, clásico y picante",
            price: "120.000₫ / 1.200.000₫",
          },
          {
            name: "Don Julio Blanco",
            desc: "Tequila · Blanco, 100% agave, suave y refinado",
            price: "300.000₫ / 2.900.000₫",
          },
        ],
      },
      {
        label: "Sin Alcohol",
        items: [
          {
            name: "Soft Drinks",
            desc: "Coca-Cola, Sprite o soda — bien fría y sencilla",
            price: "30.000₫",
          },
          {
            name: "Agua Lavie Con/Sin Gas",
            desc: "Agua con o sin gas, 45cl",
            price: "45.000₫",
          },
          {
            name: "Mocktail del Día",
            desc: "Selección sin alcohol del bartender del día",
            price: "100.000₫",
          },
          {
            name: "Zumo del Día",
            desc: "Zumo recién exprimido, cambia cada día",
            price: "75.000₫",
          },
          {
            name: "Café Vietnamita",
            desc: "Café vietnamita tradicional por goteo, caliente o con hielo",
            price: "50.000₫",
          },
          {
            name: "Espresso",
            desc: "Espresso italiano",
            price: "45.000₫",
          },
          {
            name: "Capuchino",
            desc: "Espresso con leche vaporizada",
            price: "50.000₫",
          },
          {
            name: "Café Trứng",
            desc: "Café de huevo estilo Hanoi, crema batida de yema",
            price: "60.000₫",
            tag: "Especialidad",
          },
        ],
      },
    ],
  },
  gallery: {
    eyebrow: "La Galería",
    title: "El ambiente de la casa",
    subtitle:
      "Jamón cortado a mano, sartenes al fuego, y una sala pensada para comidas largas y cenas aún más largas.",
  },
  press: {
    eyebrow: "Reseñas de Google",
    title: "Lo que dicen nuestros clientes",
    items: [
      {
        quote:
          "A perfect place to meet with friends and enjoy great food, especially if you love good jamón ibérico and Spanish cheeses. The atmosphere is relaxed and welcoming, making it ideal for long conversations over tapas.",
        source: "Reseña de Google · IBÉRICO Thảo Điền, 4.6★",
      },
      {
        quote:
          "From first to last impression, everything was absolutely phenomenal. We had the delight of dining in a warm, authentic space, indulging in delicious spheres of ham.",
        source: "Reseña de Google · IBÉRICO Thị Sách, 4.7★",
      },
      {
        quote: "The view overlooking the river in Hội An is great, especially at night.",
        source: "Reseña de Google · IBÉRICO Hội An, 4.9★",
      },
    ],
    ratingLabel: "Valoración media de 4.7–4.9 / 5",
  },
  locations: {
    eyebrow: "Nuestras Casas",
    title: "Tres casas, una mesa",
    subtitle:
      "Encuentra tu IBÉRICO más cercano — cada local mantiene la misma carta, la misma bodega y la misma bienvenida.",
    directions: "Cómo Llegar",
    items: [
      {
        name: "IBÉRICO Thảo Điền",
        area: "Local original · Thảo Điền",
        address: "33 Võ Trường Toản, Khánh Ward, Ho Chi Minh",
        hours: "16:00 – 23:30 todos los días · Cocina caliente hasta 22:30",
        capacity: "Hasta 60 comensales",
        phone: "+84 326 498 956",
        mapQuery: "33 Vo Truong Toan St, Khanh Ward, Ho Chi Minh City",
        lat: 10.8043499,
        lng: 106.7472609,
        blurb:
          "Nuestra primera casa, en un barrio residencial muy expat — espacio interior y exterior para cualquier ocasión.",
      },
      {
        name: "IBÉRICO Thị Sách",
        area: "Sài Gòn Ward",
        address: "20A Thị Sách, Sài Gòn Ward, Ho Chi Minh",
        hours: "11:00 – 23:30 todos los días · Cocina caliente hasta 22:30",
        capacity: "60–80 comensales",
        phone: "+84 849 000 531",
        mapQuery: "20A Thi Sach St, Sai Gon Ward, Ho Chi Minh City",
        lat: 10.7782323,
        lng: 106.7046638,
        blurb:
          "Un bar de vinos en el centro, cerca de la zona de oficinas, con una sala privada en el piso superior para eventos exclusivos.",
      },
      {
        name: "IBÉRICO Hội An",
        area: "Casco Antiguo",
        address: "100 Bạch Đằng, Hội An Ward, Đà Nẵng",
        hours: "11:00 – 23:30 todos los días · Cocina caliente hasta 22:30",
        capacity: "Hasta 70 comensales",
        phone: "+84 868 774 026",
        mapQuery: "100 Bach Dang St, Hoi An Ward, Da Nang City",
        lat: 15.8760039,
        lng: 108.3298476,
        blurb:
          "A orillas del río Bạch Đằng, a pasos del puente Chùa Cầu, con vistas panorámicas impresionantes del casco antiguo.",
      },
    ],
  },
  events: {
    eyebrow: "Privados & Catering",
    title: "Tu mesa, tu celebración",
    body: "Desde cenas de cumpleaños íntimas hasta el alquiler completo del restaurante para eventos de empresa, nuestro equipo diseña un menú para compartir según tu lista de invitados. También ofrecemos catering externo completo — incluyendo nuestras legendarias fiestas de paella, cocinadas al momento y servidas para compartir, para cualquier tamaño de celebración.",
    bullets: [
      "Catering externo completo para bodas y eventos corporativos",
      "Legendarias fiestas de paella, cocinadas al momento",
      "Sala privada en el piso superior de Thị Sách",
      "Menús personalizados de tapas y maridaje",
      "Alquiler completo del restaurante disponible",
    ],
    cta: "Consultar sobre Eventos y Catering",
  },
  careers: {
    eyebrow: "Empleo",
    title: "Únete al equipo de IBÉRICO",
    subtitle:
      "Siempre buscamos personas apasionadas por la buena comida y la hospitalidad cercana — en Saigón y Hội An.",
    applyCta: "Postular Ahora",
    emailNote:
      "Envía tu CV y una breve nota a hola@weareiberico.com, o escríbenos por WhatsApp — cuéntanos a qué puesto y en qué local te postulas.",
    positions: [
      {
        title: "Camarero/a",
        type: "Tiempo completo",
        department: "Sala",
        description:
          "Ofrece un servicio de sala cálido y atento, guiando a los clientes por nuestra carta de tapas y la bodega con confianza.",
      },
      {
        title: "Prácticas de Camarero/a",
        type: "Prácticas",
        department: "Sala",
        description:
          "Aprende el servicio de sala al estilo español desde cero, con mentoría directa y un camino claro hacia un puesto fijo.",
      },
      {
        title: "Chef de Partie",
        type: "Tiempo completo",
        department: "Cocina",
        description:
          "Lleva tu propia partida — embutidos, tapas o paella — con precisión, constancia y orgullo en cada plato.",
      },
      {
        title: "Prácticas de Cocina",
        type: "Prácticas",
        department: "Cocina",
        description:
          "Formación práctica en cada partida de cocina, desde el corte del jamón hasta la paella, con la guía de nuestro jefe de cocina.",
      },
    ],
  },
  reservation: {
    eyebrow: "Reservas",
    title: "Reserva Tu Mesa",
    subtitle:
      "Dinos cuándo y dónde — confirmaremos por teléfono o WhatsApp en unas horas.",
    name: "Nombre Completo",
    email: "Correo Electrónico",
    phone: "Teléfono",
    date: "Fecha",
    time: "Hora",
    guests: "Comensales",
    location: "Local",
    notes: "Peticiones Especiales",
    notesPlaceholder: "Alergias, celebraciones, preferencia de mesa...",
    submit: "Solicitar Reserva",
    submitWhatsApp: "Reservar por WhatsApp",
    submitZalo: "Reservar por Zalo",
    submitting: "Enviando...",
    success: "¡Solicitud recibida!",
    successBody:
      "Gracias — confirmaremos tu mesa por teléfono o WhatsApp en breve. ¡Hasta pronto!",
    another: "Reservar Otra Mesa",
    required: "Obligatorio",
    whatsapp: "WhatsApp",
    zalo: "Zalo",
    orContact: "O contáctanos directamente",
    call: "Llamar",
    emailUs: "Correo",
    lateNote:
      "La cocina caliente cierra a las 22:30 — aún se puede reservar hasta las 23:30 con una carta limitada (embutidos, quesos, vino).",
    zaloCopied: "Detalles copiados — pégalos en el chat de Zalo que se acaba de abrir.",
  },
  footer: {
    tagline: "Auténticas tapas y vino español, para compartir en Ho Chi Minh.",
    visit: "Visítanos",
    connect: "Síguenos",
    rights: "Todos los derechos reservados.",
    madeWith: "Saigón · Hội An",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, vi, es };

export const languageLabels: Record<Lang, string> = {
  en: "EN",
  vi: "VI",
  es: "ES",
};

export const languageFlags: Record<Lang, string> = {
  en: "🇬🇧",
  vi: "🇻🇳",
  es: "🇪🇸",
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "iberico-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Deliberately deferred to an effect: reading localStorage/navigator.language
  // during render would make the client's first render diverge from the
  // server-rendered "en" markup and break hydration. Rendering "en" first,
  // then correcting post-mount, keeps SSR output and client output in sync.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && dictionaries[stored]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "vi" || browserLang === "es") {
        setLangState(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
