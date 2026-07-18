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
  story: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
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
    reserve: "Reserve",
  },
  hero: {
    eyebrow: "Saigon · Est. 2021",
    title1: "Tapas",
    title2: "y Vino",
    subtitle:
      "Premium Iberian ingredients, unhurried sharing plates, and a Spanish wine list poured with heart — in the middle of Ho Chi Minh City.",
    cta1: "Reserve a Table",
    cta2: "View Menu",
    scroll: "Scroll",
  },
  story: {
    eyebrow: "Our Story",
    title: "The Living Spirit of Spanish Dining in Vietnam",
    p1: "Founded in 2021, IBÉRICO Tapas & Vino has swiftly shaped a distinct Spanish voice in Vietnam's dining scene — growing from Ho Chi Minh City to a new riverside chapter in Hội An. It's built on one belief: great food is meant to be shared, and every meal should unfold as an easy, convivial ritual — order by instinct, taste widely, linger longer.",
    p2: "Tapas anchor the experience. Rather than fixed courses, the table fills gradually — hand-sliced Jamón Ibérico de Bellota, prized for its nutty depth; Gambas al Ajillo, where prawns meet garlic and olive oil in fragrant simplicity; and Paella Valenciana, a saffron-scented centerpiece built for togetherness. A supporting cast of Spanish cheeses, charcuterie, and classic small plates keeps the rhythm bright, balanced, and wonderfully moreish.",
    p3: "The atmosphere matches the food: upbeat yet disciplined, expressive yet unpretentious, with warm service and a room that captures the sociable tempo of a Spanish night — one of Vietnam's most consistent destinations for authentic Spanish dining, and a favorite for celebrations.",
    quote: "Best Spanish Restaurant in Vietnam.",
    quoteAuthor: "Gourmet Vietnam Awards, 2025",
    stats: [
      { value: "2021", label: "Founded in Saigon" },
      { value: "3", label: "Locations across Vietnam" },
      { value: "2025", label: "Best Spanish Restaurant, Gourmet Vietnam Awards" },
      { value: "4.5–4.7★", label: "Guest rating" },
    ],
  },
  menu: {
    eyebrow: "The Menu",
    title: "A menu built for sharing",
    subtitle:
      "Cold cuts, hot tapas, and dishes from the pan — order two or three per person, family-style, the way it's meant to be.",
    note: "Prices in VND (thousands), Saigon menu — Hội An pricing may vary slightly · Excl. 5% service charge & 8–10% VAT",
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
    eyebrow: "In The Press",
    title: "What guests are saying",
    items: [
      {
        quote:
          "Perfectly cooked croquetas and prawns — an incredible experience with authentic Spanish flavors and exceptional service.",
        source: "Tripadvisor, 4.5★ · Top 650 in Ho Chi Minh City",
      },
      {
        quote:
          "One of the few restaurants in Vietnam certified by Foods & Wines from Spain for authentic Spanish gastronomy.",
        source: "Foods & Wines from Spain",
      },
      {
        quote:
          "Attractive, exotic atmosphere — an ideal place to enjoy authentic Spanish food and wine in Saigon.",
        source: "Hochiminh Gourmet",
      },
    ],
    ratingLabel: "4.5–4.7 / 5 average guest rating",
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
    reserve: "Đặt Bàn",
  },
  hero: {
    eyebrow: "Sài Gòn · Thành lập 2021",
    title1: "Tapas",
    title2: "y Vino",
    subtitle:
      "Nguyên liệu Iberia thượng hạng, những đĩa tapas để cùng nhau thưởng thức, và danh sách rượu vang Tây Ban Nha được rót bằng cả tấm lòng — giữa lòng Thành phố Hồ Chí Minh.",
    cta1: "Đặt Bàn Ngay",
    cta2: "Xem Thực Đơn",
    scroll: "Cuộn xuống",
  },
  story: {
    eyebrow: "Câu Chuyện Của Chúng Tôi",
    title: "Tinh Thần Sống Động Của Ẩm Thực Tây Ban Nha Tại Việt Nam",
    p1: "Thành lập năm 2021, IBÉRICO Tapas & Vino đã nhanh chóng tạo nên một tiếng nói Tây Ban Nha riêng biệt trong nền ẩm thực Việt Nam — phát triển từ Thành phố Hồ Chí Minh đến một chương mới bên bờ sông tại Hội An. Tất cả được xây dựng trên một niềm tin: món ngon sinh ra để chia sẻ, và mỗi bữa ăn nên diễn ra như một nghi thức thong thả, thân mật — gọi món theo bản năng, nếm thử thật nhiều, và ở lại thật lâu.",
    p2: "Tapas là trung tâm của trải nghiệm. Thay vì các món cố định, bàn ăn dần đầy lên: Jamón Ibérico de Bellota thái tay, nổi bật với vị béo bùi đặc trưng; Gambas al Ajillo, nơi tôm hòa quyện cùng tỏi và dầu ô liu trong sự đơn giản thơm lừng; và Paella Valenciana, món chính đậm hương nghệ tây được tạo ra để cùng nhau thưởng thức. Dàn món phụ trợ gồm phô mai Tây Ban Nha, đồ nguội và các món nhỏ cổ điển giữ cho nhịp bữa ăn luôn tươi mới, cân bằng và cực kỳ cuốn hút.",
    p3: "Không gian hòa quyện cùng món ăn: sôi động nhưng có chừng mực, phóng khoáng nhưng không phô trương, với dịch vụ ấm áp và một không gian nắm bắt trọn vẹn nhịp điệu giao lưu của một đêm Tây Ban Nha — một trong những điểm đến ẩm thực Tây Ban Nha chính thống nhất quán nhất Việt Nam, và là lựa chọn yêu thích cho những dịp kỷ niệm.",
    quote: "Nhà Hàng Tây Ban Nha Xuất Sắc Nhất Việt Nam.",
    quoteAuthor: "Gourmet Vietnam Awards, 2025",
    stats: [
      { value: "2021", label: "Thành lập tại Sài Gòn" },
      { value: "3", label: "Chi nhánh trên khắp Việt Nam" },
      { value: "2025", label: "Nhà Hàng Tây Ban Nha Xuất Sắc Nhất, Gourmet Vietnam Awards" },
      { value: "4.5–4.7★", label: "Đánh giá từ khách hàng" },
    ],
  },
  menu: {
    eyebrow: "Thực Đơn",
    title: "Thực đơn dành cho việc chia sẻ",
    subtitle:
      "Đồ nguội, tapas nóng, và các món từ chảo — gọi hai hoặc ba món mỗi người, dùng chung như một gia đình, đúng như cách nó vốn phải vậy.",
    note: "Giá niêm yết bằng VNĐ (nghìn đồng), theo thực đơn Sài Gòn — giá tại Hội An có thể chênh lệch nhẹ · Chưa gồm phí dịch vụ 5% & VAT 8–10%",
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
    eyebrow: "Trên Báo Chí",
    title: "Khách hàng nói gì",
    items: [
      {
        quote:
          "Croquetas và tôm được chế biến hoàn hảo — một trải nghiệm tuyệt vời với hương vị Tây Ban Nha chính thống và dịch vụ xuất sắc.",
        source: "Tripadvisor, 4.5★ · Top 650 tại TP.HCM",
      },
      {
        quote:
          "Một trong số ít nhà hàng tại Việt Nam được Foods & Wines from Spain chứng nhận về ẩm thực Tây Ban Nha chính thống.",
        source: "Foods & Wines from Spain",
      },
      {
        quote:
          "Không gian hấp dẫn, đậm chất ngoại quốc — nơi lý tưởng để thưởng thức món ăn và rượu vang Tây Ban Nha chính hiệu tại Sài Gòn.",
        source: "Hochiminh Gourmet",
      },
    ],
    ratingLabel: "Đánh giá trung bình 4.5–4.7 / 5 từ khách hàng",
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
    reserve: "Reservar",
  },
  hero: {
    eyebrow: "Saigón · Desde 2021",
    title1: "Tapas",
    title2: "y Vino",
    subtitle:
      "Ingredientes ibéricos de primera, platos para compartir sin prisa, y una carta de vinos españoles servida con el corazón — en el centro de Ho Chi Minh.",
    cta1: "Reservar Mesa",
    cta2: "Ver la Carta",
    scroll: "Desplázate",
  },
  story: {
    eyebrow: "Nuestra Historia",
    title: "El Espíritu Vivo de la Gastronomía Española en Vietnam",
    p1: "Fundado en 2021, IBÉRICO Tapas & Vino ha forjado rápidamente una voz española distintiva en la escena gastronómica de Vietnam — creciendo desde Ho Chi Minh hasta un nuevo capítulo junto al río en Hội An. Todo se basa en una convicción: la buena comida está hecha para compartirse, y cada comida debe desarrollarse como un ritual sencillo y cercano — pedir por instinto, probar de todo, y quedarse hasta tarde.",
    p2: "Las tapas son el eje de la experiencia. En lugar de platos fijos, la mesa se va llenando poco a poco — Jamón Ibérico de Bellota cortado a mano, apreciado por su profundidad avellanada; Gambas al Ajillo, donde las gambas se encuentran con el ajo y el aceite de oliva en una sencillez aromática; y la Paella Valenciana, un plato central con aroma a azafrán pensado para compartir. Un elenco de apoyo de quesos españoles, embutidos y tapas clásicas mantiene el ritmo vivo, equilibrado y absolutamente irresistible.",
    p3: "El ambiente está a la altura de la comida: animado pero cuidado, expresivo pero sin pretensiones, con un servicio cálido y una sala que capta el ritmo sociable de una noche española — uno de los destinos más consistentes de Vietnam para la gastronomía española auténtica, y un favorito para las celebraciones.",
    quote: "El Mejor Restaurante Español de Vietnam.",
    quoteAuthor: "Gourmet Vietnam Awards, 2025",
    stats: [
      { value: "2021", label: "Fundado en Saigón" },
      { value: "3", label: "Locales en Vietnam" },
      { value: "2025", label: "Mejor Restaurante Español, Gourmet Vietnam Awards" },
      { value: "4.5–4.7★", label: "Valoración de los clientes" },
    ],
  },
  menu: {
    eyebrow: "La Carta",
    title: "Una carta pensada para compartir",
    subtitle:
      "Embutidos, tapas calientes y platos de sartén — pide dos o tres por persona, al estilo familiar, tal como debe ser.",
    note: "Precios en VND (miles), carta de Saigón — los precios en Hội An pueden variar ligeramente · Sin incluir 5% de servicio ni 8–10% de IVA",
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
    eyebrow: "En Los Medios",
    title: "Lo que dicen nuestros clientes",
    items: [
      {
        quote:
          "Croquetas y gambas perfectamente cocinadas — una experiencia increíble con sabores españoles auténticos y un servicio excepcional.",
        source: "Tripadvisor, 4.5★ · Top 650 en Ho Chi Minh",
      },
      {
        quote:
          "Uno de los pocos restaurantes en Vietnam certificados por Foods & Wines from Spain por su gastronomía española auténtica.",
        source: "Foods & Wines from Spain",
      },
      {
        quote:
          "Ambiente atractivo y exótico — un lugar ideal para disfrutar de comida y vino españoles auténticos en Saigón.",
        source: "Hochiminh Gourmet",
      },
    ],
    ratingLabel: "Valoración media de 4.5–4.7 / 5",
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
