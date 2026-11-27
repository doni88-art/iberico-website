// IBÉRICO Hội An menu (source: "Hoi An Menu.pdf"), written once in English and
// Chinese and rendered through <FullMenu> in both languages. Prices are in
// thousands of VND, as printed. Hội An prices exclude 8–10% VAT only (no
// service charge line on that menu).

import type { ZhGroup, ZhItem, ZhSection } from "./menu-zh";

type Bi = { en: string; zh: string };
type Spec = {
  n: string; // dish name (original)
  z: string; // Chinese name
  e?: string; // English description
  c?: string; // Chinese description
  m?: Bi; // meta line (wines)
  p: number[];
};
type GroupSpec = { t?: Bi; cols?: Bi[]; note?: Bi; items: Spec[] };
type SectionSpec = {
  id: string;
  title: Bi;
  intro?: Bi;
  note?: Bi;
  fun?: Bi;
  groups: GroupSpec[];
};

const b = (en: string, zh: string): Bi => ({ en, zh });
const s = (
  n: string,
  z: string,
  e: string | undefined,
  c: string | undefined,
  ...p: number[]
): Spec => ({ n, z, e, c, p });
const wine = (
  n: string,
  m: Bi,
  e: string,
  c: string,
  ...p: number[]
): Spec => ({ n, z: n, e, c, m, p });

const GLASS = b("Glass", "杯");
const BOTTLE = b("Bottle", "瓶");

export const HOIAN_INTRO_EN = [
  "At Iberico Vinos y Tapas, we bring the true spirit of Spain to Vietnam—where good food, good wine, and good company are taken very seriously… but never too seriously.",
  "From premium jamón ibérico, croquetas, and patatas bravas to grilled specialties, fresh seafood, and indulgent desserts, every dish is made for sharing (or pretending to share).",
  "Whether you're here for a quick tapa, a long dinner, or a night that accidentally becomes a celebration, Iberico Vinos y Tapas is all about lively flavors, warm hospitality, and Mediterranean nights full of laughter, stories, and one more round.",
  "Experience the authentic flavors of Spain in the heart of Hoi An.",
];

export const HOIAN_INTRO_ZH = [
  "在 IBÉRICO Vinos y Tapas，我们把真正的西班牙精神带到越南——美食、美酒、好伙伴，我们认真对待，却从不过分认真。",
  "从顶级伊比利亚火腿、可乐饼和辣酱土豆，到炭火烤制的招牌菜、新鲜海鲜和令人沉醉的甜点，每一道菜都为分享而生（或者假装分享）。",
  "无论你只是来吃一口小食、享受一顿悠长的晚餐，还是一个意外变成庆祝的夜晚，IBÉRICO 都充满热烈的风味、温暖的待客之道，以及洋溢着欢笑、故事和“再来一轮”的地中海之夜。",
  "在会安的中心，体验地道的西班牙风味。",
];

export const HOIAN_PROMOS_EN = [
  { title: "Jamón-day", big: "20% off", line: "All Jamon plates on Monday" },
  {
    title: "Vino Wednesdays",
    big: "20% off",
    line: "All wines by bottle on Wednesday",
  },
];

export const HOIAN_PROMOS_ZH = [
  { title: "火腿日 Jamón-day", big: "八折", line: "每周一，所有火腿拼盘 8 折" },
  {
    title: "葡萄酒星期三 Vino Wednesdays",
    big: "八折",
    line: "每周三，所有整瓶葡萄酒 8 折",
  },
];

export const HOIAN_NOTE_EN =
  "Prices in VND (thousands) · Excl. 8–10% VAT (depending on items)";
export const HOIAN_NOTE_ZH =
  "价格单位：千越南盾（VND）· 未含 8–10% 增值税（视菜品而定）";

const SPEC: SectionSpec[] = [
  {
    id: "set-menus",
    title: b("Set Menus", "套餐"),
    note: b(
      "Price per person, excl. VAT (+/pax)",
      "价格为每位，未含增值税（+/每位）"
    ),
    groups: [
      {
        cols: [b("per pax", "每位")],
        items: [
          s(
            "Bellota Set Menu",
            "Bellota 套餐",
            "Pan con Tumaca y Aioli (bread, tomato, aioli sauce) · Almendras Fritas con Sal (fried almonds, salt & pepper) · Croquetas de Jamón (Iberico ham croquetas) · Almejas al Ajillo (garlic clams, tomato sauce) · Patatas Bravas (spicy bravas potatoes) · Setas Escabeche (mushroom escabeche, Manchego mousse)",
            "番茄蒜泥蛋黄酱面包（面包、番茄、蒜香蛋黄酱）· 盐渍炸杏仁（炸杏仁、盐与胡椒）· 火腿可乐饼（伊比利亚火腿可乐饼）· 蒜香蛤蜊（蛤蜊、番茄酱）· 辣酱土豆（香辣土豆）· 油醋腌蘑菇（油醋腌蘑菇、曼彻格奶酪慕斯）",
            345
          ),
          s(
            "Pata Negra Set Menu",
            "Pata Negra 套餐",
            "Pan con Tumaca y Aioli (bread, tomato, aioli sauce) · Almendras Fritas con Sal (fried almonds, salt & pepper) · Croquetas de Jamón (Iberico ham croquetas) · Patatas Bravas (spicy bravas potatoes) · Calamari Fritos con Aioli (fried squid, black pepper aioli) · Ensaladilla de Gambas (creamy potato salad, shrimp) · Idiazabal (Idiazabal unpasteurized sheep cheese) · Churros con Chocolate (churros and chocolate)",
            "番茄蒜泥蛋黄酱面包（面包、番茄、蒜香蛋黄酱）· 盐渍炸杏仁（炸杏仁、盐与胡椒）· 火腿可乐饼（伊比利亚火腿可乐饼）· 辣酱土豆（香辣土豆）· 酥炸鱿鱼配蒜泥蛋黄酱（炸鱿鱼、黑胡椒蒜香蛋黄酱）· 鲜虾土豆沙拉（奶香土豆沙拉、鲜虾）· 伊迪亚萨瓦尔奶酪（未经巴氏杀菌羊奶酪）· 吉事果配巧克力（吉事果与巧克力酱）",
            595
          ),
        ],
      },
    ],
  },
  {
    id: "platters",
    title: b("Platters", "拼盘"),
    note: b(
      "All cold cuts are served with sourdough bread",
      "所有冷切肉均配酸种面包"
    ),
    fun: b(
      "“Experience the heritage of the Spanish Dehesa with premium acorn-fed Ibérico charcuterie.”",
      "“体验西班牙德埃萨牧场的传承——橡果饲养的顶级伊比利亚腊味。”"
    ),
    groups: [
      {
        items: [
          s(
            "Tabla de Queso",
            "奶酪拼盘",
            "Truffled Manchego, Idiazabal, Manchego, Quince Paste, Almonds",
            "松露曼彻格奶酪、伊迪亚萨瓦尔奶酪、曼彻格奶酪、榅桲酱、杏仁",
            425
          ),
        ],
      },
      {
        cols: [b("Small", "小份"), b("Big", "大份")],
        items: [
          s(
            "Tabla de Iberico",
            "伊比利亚拼盘",
            "Chorizo Iberico, Salchichon Iberico, Morcilla Iberico, Manchego Cheese, Marinated Olives",
            "伊比利亚辣香肠、伊比利亚萨尔奇琼香肠、伊比利亚血肠、曼彻格奶酪、腌橄榄",
            450,
            960
          ),
        ],
      },
    ],
  },
  {
    id: "embutidos",
    title: b("Embutidos – Cold cuts", "冷切肉"),
    note: b(
      "All cold cuts are served with sourdough bread",
      "所有冷切肉均配酸种面包"
    ),
    fun: b(
      "Fun fact! Spain has a “Ham Museum”! Museo del Jamón isn’t an actual museum, but a famous chain of ham shops and restaurants in Madrid.",
      "趣闻：西班牙有一座“火腿博物馆”！Museo del Jamón 其实不是真正的博物馆，而是马德里著名的火腿店兼餐厅连锁。"
    ),
    groups: [
      {
        cols: [b("50g", "50克"), b("100g", "100克")],
        items: [
          s(
            "Jamón Ibérico de Bellota “Pata Negra”",
            "橡果饲养伊比利亚黑蹄火腿",
            "Hand-cut Iberico acorn-fed ham. The VIP of cured hams! This rich, nutty, melt-in-your-mouth masterpiece comes from happy Iberian pigs feasting on acorns like it’s an all-you-can-eat buffet. Aged to perfection, each slice is a pure, silky indulgence.",
            "手工切片的橡果饲养伊比利亚火腿——火腿中的 VIP！醇厚、坚果香、入口即化的杰作，来自在橡树林里“无限畅吃”橡果的快乐伊比利亚猪。熟成至完美，每一片都丝滑纯粹。",
            499,
            960
          ),
          s("Morcilla Ibérico", "伊比利亚血肠", "Iberico blood sausage", "伊比利亚猪血肠，切片供应", 220, 350),
          s("Chorizo Ibérico", "伊比利亚辣香肠", "Iberico acorn-fed pork chorizo", "橡果饲养伊比利亚猪肉辣香肠，切片供应", 220, 350),
          s("Salchichón Ibérico", "伊比利亚萨尔奇琼香肠", "Iberico acorn-fed pork salchichón", "橡果饲养伊比利亚猪肉萨拉米香肠，切片供应", 220, 350),
          s("Cecina Ibérica", "伊比利亚风干牛肉", "Aged & smoked beef ham", "熟成烟熏牛火腿", 290, 550),
        ],
      },
    ],
  },
  {
    id: "quesos",
    title: b("Quesos – Cheeses", "奶酪"),
    note: b(
      "All cheeses are served with sourdough bread · per 100g",
      "所有奶酪均配酸种面包 · 每 100 克"
    ),
    fun: b(
      "Fun fact! Spain has more than 200 types of cheese, with Manchego being the most famous.",
      "趣闻：西班牙有 200 多种奶酪，其中最负盛名的是曼彻格。"
    ),
    groups: [
      {
        cols: [b("100g", "100克")],
        items: [
          s(
            "Manchego Trufado",
            "松露曼彻格奶酪",
            "Truffle Manchego aged. Comfort and luxury in one bite! Rich, nutty Manchego aged to perfection — pair it with a glass of wine and call it a perfect day!",
            "熟成松露曼彻格——一口之中既舒适又奢华！醇厚、带坚果香的曼彻格熟成至完美，配一杯葡萄酒，就是完美的一天。",
            280
          ),
          s("Manchego Cheese", "曼彻格奶酪", "12 months cured Manchego cheese", "12 个月熟成曼彻格奶酪", 280),
          s("Idiazabal", "伊迪亚萨瓦尔奶酪", "Idiazabal unpasteurized sheep cheese", "未经巴氏杀菌的伊迪亚萨瓦尔羊奶酪", 250),
          s("Membrillo", "榅桲酱", "Quince paste", "榅桲果酱", 75),
        ],
      },
    ],
  },
  {
    id: "mar",
    title: b("Tapas del Mar – From the sea", "海味小食"),
    groups: [
      {
        items: [
          s("Anchoas del Cantabrico", "坎塔布里亚凤尾鱼", "Anchovies cured in olive oil, bread, tumaca", "橄榄油浸凤尾鱼、面包、番茄酱", 350),
          s("Mojama de Atun", "风干金枪鱼", "Mediterranean dry aged tuna, almond", "地中海风干熟成金枪鱼、杏仁", 210),
        ],
      },
    ],
  },
  {
    id: "pintxos",
    title: b("Pintxos – Bites", "巴斯克小串"),
    fun: b(
      "“Explore the bites”",
      "“探索每一口”"
    ),
    groups: [
      {
        cols: [b("Choose 5", "任选 5 款")],
        items: [
          s(
            "Tabla de Pintxos – Bites Platter",
            "小串拼盘",
            "Choose any 5 of the bites below",
            "从下列小串中任选 5 款",
            190
          ),
        ],
      },
      {
        t: b("À la carte", "单点"),
        cols: [b("each", "每件")],
        items: [
          s("Smoked Chicken Cream & Pickled Carrot Cone", "烟熏鸡肉奶油腌胡萝卜脆筒", "Smoked chicken cream and pickled carrot cone", "烟熏鸡肉奶油与腌胡萝卜脆筒", 40),
          s("Prawn & Mint Roll & Sweet Chilli Sauce", "鲜虾薄荷卷配甜辣酱", "Prawn & mint roll with sweet chilli sauce", "鲜虾薄荷卷，配甜辣酱", 40),
          s("Tartalette Salmorejo & Jamon", "萨莫雷霍火腿挞", "Tartlette with salmorejo cold soup & ham", "萨莫雷霍冷汤与火腿小挞", 40),
          s("Stuffed Fried Olives", "酿馅炸橄榄", "Stuffed fried olives", "酿馅炸橄榄", 40),
          s("Airbag Smoked Sardine & Pickled Shallot", "烟熏沙丁鱼腌红葱头鼓包面包", "Airbag bread with smoked sardine & pickled shallot", "鼓包面包配烟熏沙丁鱼与腌红葱头", 40),
        ],
      },
    ],
  },
  {
    id: "picoteo",
    title: b("Picoteo", "佐酒小点"),
    intro: b(
      "Little bites, big vibes. Picoteo is all about sharing, snacking, and enjoying the moment—mix, match, and savor every bite together.",
      "小小一口，大大气氛。Picoteo 就是分享、小酌，享受当下——随意搭配，一起品味每一口。"
    ),
    groups: [
      {
        items: [
          s("Pan con Tumaca y Aioli", "番茄蒜泥蛋黄酱面包", "Bread, tomato, aioli sauce. Pan con tomate is a classic from Spain, especially popular in Catalonia — traditionally made by rubbing ripe tomato onto toasted rustic bread with good olive oil and a pinch of salt.", "面包、番茄、蒜香蛋黄酱。番茄面包是西班牙经典，在加泰罗尼亚尤其流行，传统做法是把熟透的番茄直接擦在烤过的乡村面包上，再淋上好橄榄油、撒一撮盐。", 70),
          s("Aceitunas Iberico", "伊比利亚腌橄榄", "Marinated olives", "香草腌橄榄", 95),
          s("Almendras Fritas con Sal", "盐渍炸杏仁", "Fried almonds, salt & pepper", "炸杏仁、盐与胡椒", 75),
          s("Gilda Iberica", "伊比利亚吉尔达串", "Skewer of anchovy, olive, piparra · 2 units", "凤尾鱼、橄榄、皮帕拉辣椒串 · 2 串", 135),
        ],
      },
    ],
  },
  {
    id: "clasicas",
    title: b("Tapas Clásicas", "经典小食"),
    intro: b(
      "A bite-sized tradition. Legend has it that tapas began as a simple cover for drinks, but they quickly became Spain’s favorite way to eat—small bites packed with big flavor!",
      "一口大小的传统。传说 tapas 最初只是盖在酒杯上的小盖子，却很快成为西班牙人最爱的吃法——小小一口，大大风味！"
    ),
    fun: b(
      "Fun fact! In Madrid, the famous “bocadillo de calamares” (fried calamari sandwich) is considered a local icon — even though Madrid is nowhere near the sea.",
      "趣闻：在马德里，著名的“炸鱿鱼三明治”（bocadillo de calamares）被视为本地标志——尽管马德里离海很远。"
    ),
    groups: [
      {
        cols: [b("6 units", "6 个"), b("12 units", "12 个")],
        note: b(
          "“Golden, crunchy, and filled with creamy béchamel and savory filling, croquetas are the ultimate comfort bite.”",
          "“金黄酥脆，内馅是奶香浓郁的白酱与咸香馅料——可乐饼是终极的舒心一口。”"
        ),
        items: [
          s("Croquetas de Jamón", "火腿可乐饼", "Iberico ham croquetas", "伊比利亚火腿可乐饼", 160, 280),
          s("Croquetas de Setas con Crema de Manchego", "蘑菇可乐饼配曼彻格奶油", "Mushroom croquetas, Manchego cheese mousse", "蘑菇可乐饼、曼彻格奶酪慕斯", 135, 265),
        ],
      },
      {
        cols: [b("Tapa", "Tapa"), b("Ración", "Ración")],
        items: [
          s("Tortilla de Patatas con Aioli", "西班牙土豆蛋饼配蒜泥蛋黄酱", "Spanish omelette, aioli", "西班牙土豆蛋饼、蒜香蛋黄酱", 105, 180),
          s("Ensaladilla de Gambas", "鲜虾土豆沙拉", "Creamy potato salad, shrimp", "奶香土豆沙拉、鲜虾", 135, 240),
          s("Setas Escabeche con Crema de Manchego", "油醋腌蘑菇配曼彻格奶油", "Mushroom escabeche, Manchego cheese mousse", "油醋腌蘑菇、曼彻格奶酪慕斯", 105, 205),
        ],
      },
      {
        items: [
          s("Gambas al Ajillo", "蒜香大虾", "Iberico-style garlic prawns. Juicy prawns, garlic, and chili sizzle together in olive oil — best enjoyed fresh off the pan, with crusty bread ready to soak up every last drop.", "伊比利亚风味蒜香大虾。多汁大虾、大蒜与辣椒在橄榄油中滋滋作响——趁热从锅里端上最美味，配上酥脆面包，蘸尽最后一滴蒜香。", 255),
          s("Patatas Bravas", "辣酱土豆", "Spicy bravas potatoes", "香辣土豆", 120),
          s("Patatas con Aioli", "蒜泥蛋黄酱土豆", "Fried potatoes, aioli, pickled shallot", "炸土豆、蒜香蛋黄酱、腌紫洋葱", 120),
          s("Mejillones en Escabeche con Chips", "油醋腌青口配薯片", "Mussel escabeche, potato chips", "油醋腌青口、炸薯片", 135),
          s("Calamares Fritos con Aioli de Pimienta Negra", "酥炸鱿鱼配黑胡椒蒜泥蛋黄酱", "Fried squid, black pepper aioli", "炸鱿鱼、黑胡椒蒜香蛋黄酱", 225),
          s("Berenjenas Fritas con Miel", "蜂蜜炸茄子", "Fried eggplant & honey", "酥炸茄子配蜂蜜", 115),
          s("Ensalada de la Casa", "招牌沙拉", "Green salad, hazelnut dressing", "青菜沙拉、榛子酱汁", 95),
          s("Almejas al Ajillo", "蒜香蛤蜊", "Garlic clams, tomato sauce", "蒜香蛤蜊、番茄酱", 195),
          s("Col a la Parrilla", "烤卷心菜", "Grilled cabbage, leeks, romesco sauce, Manchego", "烤卷心菜、韭葱、罗梅斯科酱、曼彻格奶酪", 175),
        ],
      },
    ],
  },
  {
    id: "casa",
    title: b("Tapas de la Casa", "招牌小食"),
    intro: b(
      "A curated selection of house tapas, featuring a variety of Spanish flavors—perfect for sharing and discovering our signature bites.",
      "精心挑选的招牌小食，汇集多种西班牙风味——最适合分享，一次尝遍我们的特色美味。"
    ),
    fun: b(
      "Fun fact! Picanha is one of the most beloved beef cuts in grilling culture because it combines intense beef flavor with incredible tenderness when cooked correctly.",
      "趣闻：Picanha（牛臀盖肉）是烧烤文化中最受喜爱的牛肉部位之一，因为只要烹制得当，它既有浓郁的牛肉风味，又极其鲜嫩。"
    ),
    groups: [
      {
        items: [
          s("Carne a la Parilla con Chimichurri", "炭烤牛肉配青酱", "Chef’s choice cut, potato cake with chimichurri sauce", "主厨精选部位牛肉、土豆饼、奇米丘里酱", 395),
          s("Pollo Relleno a la Trufa", "松露酿鸡卷", "Chicken ballotine, pickled carrot and truffle jus. Chicken roulade filled with creamy truffle and melted cheese, roasted golden with rich earthy flavor.", "鸡肉卷、腌胡萝卜、松露汁。鸡肉卷内馅为奶香松露与融化奶酪，烤至金黄，带浓郁的泥土芬芳。", 225),
          s("Pescado de la Bahia", "海湾鲜鱼", "Fish of the day, pisto and fried leeks. Locally sourced bay fish prepared with simple Mediterranean elegance, highlighting the freshness of the sea with aromatic herbs.", "当日鲜鱼、西班牙炖蔬菜（Pisto）与炸韭葱。选用本地海湾鲜鱼，以简约的地中海风格烹制，借香草衬托大海的新鲜。", 350),
          s("Spaguetti a la Marinera", "海鲜意面", "Seafood spaghetti, garlic prawns and smoked tomatoes. Classic Mediterranean seafood pasta simmered with fresh prawns, aromatic garlic, white wine, and savory tomato sauce.", "海鲜意面、蒜香大虾与烟熏番茄。经典地中海海鲜意面，以鲜虾、香蒜、白葡萄酒与咸香番茄酱汁焖煮。", 235),
        ],
      },
    ],
  },
  {
    id: "paella",
    title: b("Paella", "西班牙海鲜饭"),
    intro: b(
      "Big pan, bold flavors! Our paella is packed with saffron rice, smoky spices, and your choice of seafood—cooked low and slow for that crave-worthy crispy bottom. Perfect for sharing (or not…)",
      "大锅，浓烈风味！我们的海鲜饭用藏红花米饭、烟熏香料和你选择的食材，文火慢煮出令人垂涎的酥脆锅底。适合分享（或者不分享……）"
    ),
    note: b(
      "It requires 25 mins to cook to perfection — please order some tapas while you wait · Served with aioli & lemon · Upgrade to a bigger pan available",
      "需 25 分钟烹制至完美，等待时请先点些小食 · 配蒜香蛋黄酱与柠檬 · 可升级为更大的锅"
    ),
    fun: b(
      "Fun fact! Each region in Spain has its own way of making paella. While Valencia prefers rabbit and snails, coastal areas love seafood, and some even add chorizo (though purists say that’s a crime!)",
      "趣闻：西班牙每个地区都有自己的做法！瓦伦西亚偏爱兔肉和蜗牛，沿海地区钟情海鲜，有些人甚至加入辣香肠（不过正统派认为那是罪过！）"
    ),
    groups: [
      {
        items: [
          s("Marisco", "海鲜饭", "Braised squid, clam, prawn, fish", "红烧鱿鱼、蛤蜊、大虾、鱼", 495),
          s("Vegetariana", "蔬菜饭", "Broccoli, green asparagus, fennel, caramelized onion", "西兰花、青芦笋、茴香、焦糖洋葱", 430),
        ],
      },
    ],
  },
  {
    id: "postres",
    title: b("Postres – Desserts", "甜点"),
    fun: b(
      "Fun fact! Many Spanish desserts, like churros and turrón, have centuries-old origins. From Moorish-inspired sweets to holiday traditions, Spain’s desserts are a delicious blend of history and flavor!",
      "趣闻：许多西班牙甜点（如吉事果和杜隆糖）已有几百年历史。从摩尔风味甜食到节日传统，西班牙甜点是历史与风味的美妙融合！"
    ),
    groups: [
      {
        items: [
          s("Tarta de Queso Manchego", "曼彻格芝士蛋糕", "Manchego cheesecake. Burnt Basque cheesecake! Creamy, rich, and infused with the nutty, buttery goodness of Manchego cheese — sweet, slightly savory, and utterly irresistible, one slice might not be enough!", "曼彻格芝士蛋糕——巴斯克焦糖芝士蛋糕！绵密、浓郁，带着曼彻格奶酪坚果与奶油的醇香，甜中微咸，难以抗拒，一块可能不够！", 110),
          s("Churros con Chocolate", "吉事果配巧克力", "Churros and chocolate", "吉事果配巧克力酱", 110),
          s("Tarta de Lima de Hội An con Crema Ahumada", "会安青柠派配烟熏奶油", "Hoi An lime pie with smoked cream", "会安青柠派，配烟熏奶油", 110),
          s("Helados", "冰淇淋", "Chocolate, strawberry, lemon, coconut ice cream", "巧克力、草莓、柠檬、椰子口味", 60),
        ],
      },
    ],
  },
  {
    id: "bebidas",
    title: b("Bebidas – Drinks", "酒水"),
    intro: b(
      "Explore a thoughtful collection of Spanish wines, handcrafted cocktails, house-made sangria, beers, and fine spirits—bringing together tradition, quality, and a touch of Mediterranean flair.",
      "精心甄选的西班牙葡萄酒、手工调制鸡尾酒、自家桑格利亚、啤酒与精品烈酒——汇集传统、品质与一抹地中海风情。"
    ),
    groups: [
      {
        t: b("Cava – Sparkling Wine", "卡瓦起泡酒"),
        cols: [GLASS, BOTTLE],
        items: [
          wine("Vega Medien Brut", b("D.O. Cava · Macabeo, Chardonnay", "D.O. Cava · Macabeo、Chardonnay"), "“Golden reflection, fine bubbles, persistent & elegant”", "“金色光泽，气泡细腻，持久而优雅”", 160, 840),
          wine("Conde de Haro Brut", b("D.O. Cava · Viura, Chardonnay", "D.O. Cava · Viura、Chardonnay"), "“Elegant apple and light brioche notes, balanced by a crisp, dry finish.”", "“优雅的苹果与淡淡布里欧修香，清脆干爽的收尾，平衡协调”", 1400),
        ],
      },
      {
        t: b("Rosado – Rosé Wine", "桃红葡萄酒"),
        cols: [BOTTLE],
        items: [
          wine("Rambla Róse", b("D.O. Penedès · Garnacha, Tempranillo", "D.O. Penedès · Garnacha、Tempranillo"), "“Fresh and lively with red berries and a crisp, dry finish.”", "“清新活泼，红色浆果香，干爽清脆的收尾”", 840),
        ],
      },
      {
        t: b("Blanco – White Wine", "白葡萄酒"),
        cols: [GLASS, BOTTLE],
        items: [
          wine("Lobetia Organic", b("D.O. Tierra de Castilla · Chardonnay", "D.O. Tierra de Castilla · Chardonnay"), "“Bouquet of tropical fruits and apple”", "“热带水果与苹果的芬芳”", 140, 800),
          wine("Cutio Blanco", b("D.O. Cariñena · Macabeo", "D.O. Cariñena · Macabeo"), "“Bright and crisp with citrus and floral aroma. Fresh and good acidity”", "“明亮清脆，带柑橘与花香，清新，酸度良好”", 150, 950),
          wine("Basa Blanco", b("D.O. Rueda · Verdejo, Viura", "D.O. Rueda · Verdejo、Viura"), "“Right balance between charming fruit and aromatic complexity”", "“迷人的果香与芳香复杂度之间的恰到好处”", 150, 950),
          wine("Pago Mota", b("D.O. Tierra de Castilla · Chardonnay", "D.O. Tierra de Castilla · Chardonnay"), "“Citrus and subtle vanilla notes from light oak ageing.”", "“柑橘香，以及轻度橡木陈酿带来的淡淡香草味”", 1100),
          wine("Muga Blanco", b("D.O.Ca. Rioja · Viura, Garnacha Blanca, Malvasía", "D.O.Ca. Rioja · Viura、Garnacha Blanca、Malvasía"), "“Fermented and aged in oak, giving subtle vanilla and toasted almond notes”", "“橡木桶发酵与陈酿，带来淡淡香草与烘烤杏仁香”", 1300),
        ],
      },
      {
        t: b("Tinto – Red Wine", "红葡萄酒"),
        cols: [GLASS, BOTTLE],
        items: [
          wine("La Planta", b("D.O. Ribera del Duero · Tempranillo", "D.O. Ribera del Duero · Tempranillo"), "“Structured and expressive with dark cherry, subtle oak”", "“结构分明、表现力强，深色樱桃香与淡淡橡木味”", 150, 850),
          wine("Cutio Tinto", b("D.O. Cariñena · Garnacha", "D.O. Cariñena · Garnacha"), "“Aroma of fresh red berries and hint of spice, fruity finish”", "“清新红色浆果香气，一丝香料，果香收尾”", 160, 900),
          wine("Al Muvedre", b("D.O. Alicante · Monastrell", "D.O. Alicante · Monastrell"), "“Bold wine, full of dark fruits with expressive and spicy finish”", "“酒体饱满，充满深色水果，余韵富有表现力并带辛香”", 160, 1000),
          wine("Marques de Caceres Crianza", b("D.O. Rioja · Tempranillo", "D.O. Rioja · Tempranillo"), "“Elegant and well-balanced with berry flavours, oak complexity.”", "“优雅均衡，浆果风味与橡木的复杂度”", 1300),
          wine("Muga Reserva", b("D.O.Ca. Rioja · Tempranillo", "D.O.Ca. Rioja · Tempranillo"), "“Complex and refined with ripe red fruit, vanilla and spice”", "“复杂而精致，成熟红色水果、香草与香料”", 1500),
        ],
      },
      {
        t: b("Sherry · serving 80ml", "雪莉酒（每份 80ml）"),
        cols: [GLASS],
        items: [
          wine("Tio Pepe “Warhol” – Fino", b("100% Palomino", "100% Palomino"), "“Dry and crisp with almond notes”", "“干爽清脆，带杏仁香”", 160),
          wine("Apostoles 30YO – Palo Cortado", b("87% Palomino, 13% PX", "87% Palomino、13% PX"), "“Rich and complex with dried fruit, nutty notes and a smooth finish.”", "“浓郁复杂，带干果与坚果香，收尾顺滑”", 450),
          wine("Matusalem 30YO – Sweet Oloroso", b("75% Oloroso, 25% PX", "75% Oloroso、25% PX"), "“Sweet and smooth with raisin and nutty notes and a long finish.”", "“甜美顺滑，带葡萄干与坚果香，余韵悠长”", 450),
          wine("Cuatro Palmas 40YO – Amontillado", b("100% Palomino", "100% Palomino"), "“Very dry and intense with nutty notes, saline character and an exceptionally long finish.”", "“极干而浓烈，带坚果香与咸鲜风味，余韵格外悠长”", 750),
        ],
      },
      {
        t: b("Drinks de la Casa", "招牌酒饮"),
        note: b(
          "“A perfect mix of wine, fresh fruit, and a lively Mediterranean spirit.”",
          "“葡萄酒、新鲜水果与活泼地中海精神的完美融合。”"
        ),
        cols: [GLASS, b("Pitcher", "壶")],
        items: [
          s("Classic Sangria", "经典桑格利亚", "Red wine, mixed fruit, Skyy vodka, cinnamon syrup", "红葡萄酒、混合水果、Skyy 伏特加、肉桂糖浆", 160, 475),
          s("White Sangria", "白桑格利亚", "White wine, peach syrup, gin, mixed fruit", "白葡萄酒、水蜜桃糖浆、金酒、混合水果", 160, 475),
        ],
      },
      {
        cols: [GLASS],
        items: [
          s("Sangria Spritz", "桑格利亚气泡酒", "Aperol, sweet vermouth, orange juice, cava, soda", "Aperol、甜味美思、橙汁、卡瓦、苏打水", 170),
          s("Tinto de Verano", "夏日红酒", "Red wine, Sprite, lime juice", "红葡萄酒、雪碧、青柠汁", 170),
          s("Mango Shake", "芒果摇酒", "Brugal Blanco rum, mango", "Brugal Blanco 朗姆酒、芒果", 170),
          s("Red Bubbles", "红色气泡", "Aperol, sparkling wine, soda, orange", "Aperol、起泡酒、苏打水、橙", 170),
          s("Negroni de Madrid", "马德里内格罗尼", "Bulldog gin, Cizano vermouth rosso, Campari", "Bulldog 金酒、Cizano 红味美思、Campari", 170),
          s("Old Fashioned", "古典鸡尾酒", "Bushmills Original whisky, sugar, bitter", "Bushmills Original 威士忌、糖、苦精", 170),
          s("Espresso Martini", "浓缩咖啡马天尼", "Brugal Blanco rum, Dalat coffee", "Brugal Blanco 朗姆酒、大叻咖啡", 170),
          s("Herradura", "Herradura 龙舌兰", "Jose Cuervo tequila, lime, cilantro", "Jose Cuervo 龙舌兰、青柠、香菜", 170),
          s("Bloody Mary", "血腥玛丽", "Skyy vodka, tomato juice, Tabasco", "Skyy 伏特加、番茄汁、塔巴斯科辣酱", 170),
        ],
      },
      {
        t: b("Cerveza – Beer", "啤酒"),
        cols: [b("33cl", "33cl"), b("50cl", "50cl")],
        items: [
          s("Estrella Galicia Lager 5%", "Estrella Galicia 拉格 5%", "“A true icon of Spanish beer ★”", "“西班牙啤酒的真正标志 ★”", 95),
          s("Draught Huda Beer 4.7%", "Huda 生啤 4.7%", undefined, undefined, 45, 65),
          s("Asahi 5%", "朝日 5%", undefined, undefined, 75),
          s("Tiger 5%", "虎牌 5%", undefined, undefined, 45),
        ],
      },
      {
        t: b("Whisky", "威士忌"),
        cols: [GLASS, BOTTLE],
        items: [
          s("Bushmills Original", "Bushmills Original", undefined, undefined, 150, 1400),
          s("Wild Turkey 81", "Wild Turkey 81", undefined, undefined, 150, 1400),
          s("Maker’s Mark", "Maker’s Mark", undefined, undefined, 150, 1400),
        ],
      },
      {
        t: b("Brandy & Cognac", "白兰地与干邑"),
        cols: [GLASS, BOTTLE],
        items: [
          s("St-Remy VSOP", "St-Remy VSOP", undefined, undefined, 150, 1450),
          s("Hennessy VS", "轩尼诗 VS", undefined, undefined, 200, 2000),
        ],
      },
      {
        t: b("Gin", "金酒"),
        cols: [GLASS, BOTTLE],
        items: [
          s("Nordes Atlantic", "Nordés 大西洋金酒", undefined, undefined, 190, 1950),
          s("Roku", "六 Roku", undefined, undefined, 170, 1800),
          s("Bulldog", "Bulldog", undefined, undefined, 150, 1450),
        ],
      },
      {
        t: b("Vodka", "伏特加"),
        cols: [GLASS, BOTTLE],
        items: [
          s("Skyy", "Skyy", undefined, undefined, 150, 1450),
          s("Absolut", "Absolut", undefined, undefined, 150, 1450),
        ],
      },
      {
        t: b("Rum", "朗姆酒"),
        cols: [GLASS, BOTTLE],
        items: [
          s("Brugal Blanco", "Brugal Blanco", undefined, undefined, 130, 1250),
          s("Zacapa 23YO", "Zacapa 23 年", undefined, undefined, 350, 3100),
        ],
      },
      {
        t: b("Tequila", "龙舌兰"),
        cols: [GLASS, BOTTLE],
        items: [
          s("Jose Cuervo", "Jose Cuervo", undefined, undefined, 120, 1200),
          s("Don Julio Blanco", "Don Julio Blanco", undefined, undefined, 300, 2900),
        ],
      },
      {
        t: b("Non-Alcohol", "无酒精饮品"),
        items: [
          s("Soft Drinks", "软饮", undefined, undefined, 30),
          s("Still / Sparkling “Lavie” Water 45cl", "Lavie 矿泉水 / 气泡水 45cl", undefined, undefined, 45),
          s("Mocktail", "无酒精鸡尾酒", undefined, undefined, 100),
          s("Juice of the day", "每日鲜榨果汁", undefined, undefined, 75),
          s("Vietnamese Coffee", "越南咖啡", undefined, undefined, 50),
          s("Espresso", "意式浓缩", undefined, undefined, 45),
          s("Cappuccino", "卡布奇诺", undefined, undefined, 50),
          s("Egg Coffee", "蛋咖啡", undefined, undefined, 60),
        ],
      },
    ],
  },
];

function build(lang: "en" | "zh"): ZhSection[] {
  const pick = (x: Bi) => x[lang];
  return SPEC.map((sec) => ({
    id: sec.id,
    title: pick(sec.title),
    original: lang === "zh" ? sec.title.en : "",
    intro: sec.intro && pick(sec.intro),
    note: sec.note && pick(sec.note),
    funFact: sec.fun && pick(sec.fun),
    groups: sec.groups.map(
      (g): ZhGroup => ({
        title: g.t && (lang === "zh" ? `${g.t.zh} ${g.t.en}` : g.t.en),
        columns: g.cols?.map(pick),
        note: g.note && pick(g.note),
        items: g.items.map(
          (it): ZhItem => ({
            name: it.n,
            zh: lang === "zh" ? it.z : it.n,
            desc: lang === "zh" ? it.c : it.e,
            meta: it.m && pick(it.m),
            prices: it.p,
          })
        ),
      })
    ),
  }));
}

export const HOIAN_EN_SECTIONS = build("en");
export const HOIAN_ZH_SECTIONS = build("zh");
