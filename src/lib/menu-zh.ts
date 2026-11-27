// Simplified-Chinese translation of the IBÉRICO Saigon menu (source: "Saigon
// Menu.pdf"). Dish names keep their original Spanish/English name and add a
// Chinese rendering. Prices are in thousands of VND, exactly as printed.

export type ZhItem = {
  name: string; // original name
  zh: string; // Chinese name
  desc?: string; // Chinese description / tasting note
  meta?: string; // origin · grape (wines)
  prices: number[]; // thousands of VND — one per column
};

export type ZhGroup = {
  title?: string;
  columns?: string[]; // header for each price column
  note?: string; // italic line under the group title
  items: ZhItem[];
};

export type ZhSection = {
  id: string;
  title: string; // Chinese
  original: string; // original section title
  intro?: string;
  note?: string;
  groups: ZhGroup[];
  funFact?: string;
};

const i = (
  name: string,
  zh: string,
  desc: string | undefined,
  ...prices: number[]
): ZhItem => ({ name, zh, desc, prices });

const w = (
  name: string,
  meta: string,
  desc: string,
  ...prices: number[]
): ZhItem => ({ name, zh: name, meta, desc, prices });

export const formatVnd = (thousands: number) =>
  `${(thousands * 1000).toLocaleString("en-US")}₫`;

export const ZH_INTRO = [
  "在 IBÉRICO Vinos y Tapas，我们把真正的西班牙精神带到越南——美食、美酒、好伙伴，我们认真对待，却从不过分认真。",
  "从顶级伊比利亚火腿、可乐饼和辣酱土豆，到炭火烤制的招牌菜、新鲜海鲜和令人沉醉的甜点，每一道菜都为分享而生（或者假装分享）。",
  "无论你只是来吃一口小食、享受一顿悠长的晚餐，还是一个意外变成庆祝的夜晚，IBÉRICO 都充满热烈的风味、温暖的待客之道，以及洋溢着欢笑、故事和“再来一轮”的地中海之夜。",
  "就在胡志明市和会安的中心——我们带来西班牙，你带来好胃口。",
];

export const ZH_PROMOS = [
  {
    title: "火腿日 Jamon-day",
    big: "八折",
    line: "每周一，所有火腿拼盘 8 折",
  },
  {
    title: "葡萄酒星期三 Vino Wednesdays",
    big: "八折",
    line: "每周三，所有整瓶葡萄酒 8 折",
  },
];

export const ZH_NOTE =
  "价格单位：千越南盾（VND）· 未含 5% 服务费及 8–10% 增值税（视菜品而定）";

export const ZH_SECTIONS: ZhSection[] = [
  {
    id: "platters",
    title: "拼盘",
    original: "Platters",
    note: "所有冷切肉均配酸种面包",
    groups: [
      {
        items: [
          i(
            "Tabla de Queso",
            "奶酪拼盘",
            "松露曼彻格奶酪、伊迪亚萨瓦尔奶酪、陈年蓝纹奶酪、榅桲酱、杏仁",
            490
          ),
        ],
      },
      {
        columns: ["小份", "大份"],
        items: [
          i(
            "Tabla de Iberico",
            "伊比利亚拼盘",
            "伊比利亚辣香肠、伊比利亚萨尔奇琼香肠、伊比利亚血肠、曼彻格奶酪、腌橄榄",
            595,
            998
          ),
        ],
      },
    ],
    funFact: "“体验西班牙德埃萨牧场的传承——橡果饲养的顶级伊比利亚腊味。”",
  },
  {
    id: "embutidos",
    title: "冷切肉",
    original: "Embutidos – Cold cuts",
    note: "所有冷切肉均配酸种面包",
    groups: [
      {
        columns: ["50克", "100克"],
        items: [
          i(
            "Jamón Ibérico de Bellota “Pata Negra”",
            "橡果饲养伊比利亚黑蹄火腿",
            "手工切片的橡果饲养伊比利亚火腿——火腿中的 VIP！醇厚、坚果香、入口即化的杰作，来自在橡树林里“无限畅吃”橡果的快乐伊比利亚猪。熟成至完美，每一片都丝滑纯粹，好到可能让你从此看不上别的火腿。",
            499,
            960
          ),
          i(
            "Morcilla Ibérico",
            "伊比利亚血肠",
            "伊比利亚猪血肠，切片供应",
            220,
            350
          ),
          i(
            "Chorizo Ibérico",
            "伊比利亚辣香肠",
            "橡果饲养伊比利亚猪肉辣香肠，切片供应",
            220,
            350
          ),
          i(
            "Salchichón Ibérico",
            "伊比利亚萨尔奇琼香肠",
            "橡果饲养伊比利亚猪肉萨拉米香肠，切片供应",
            220,
            350
          ),
          i(
            "Cecina Ibérica",
            "伊比利亚风干牛肉",
            "熟成烟熏牛火腿",
            290,
            550
          ),
        ],
      },
    ],
    funFact:
      "趣闻：西班牙有一座“火腿博物馆”！Museo del Jamón 其实不是真正的博物馆，而是马德里著名的火腿店兼餐厅连锁。",
  },
  {
    id: "quesos",
    title: "奶酪",
    original: "Quesos – Cheeses",
    note: "所有奶酪均配酸种面包 · 每 100 克",
    groups: [
      {
        columns: ["100克"],
        items: [
          i(
            "Manchego Trufado",
            "松露曼彻格奶酪",
            "熟成松露曼彻格——一口之中既舒适又奢华！醇厚、带坚果香的曼彻格熟成至完美，让每个瞬间都多一分特别。配一杯葡萄酒，就是完美的一天。",
            280
          ),
          i(
            "Manchego Cheese",
            "曼彻格奶酪",
            "12 个月熟成曼彻格奶酪",
            280
          ),
          i(
            "Idiazabal",
            "伊迪亚萨瓦尔奶酪",
            "未经巴氏杀菌的伊迪亚萨瓦尔羊奶酪",
            250
          ),
          i(
            "Queso Azul Madurado",
            "陈年蓝纹奶酪",
            "多年陈酿蓝纹奶酪",
            180
          ),
          i("Membrillo", "榅桲酱", "榅桲果酱", 75),
        ],
      },
    ],
    funFact: "趣闻：西班牙有 200 多种奶酪，其中最负盛名的是曼彻格。",
  },
  {
    id: "mar",
    title: "海味小食",
    original: "Tapas del Mar – From the sea",
    intro:
      "来自大海的小食，汇集明亮、带咸鲜海风的风味与简单新鲜的食材——清爽而大胆的一口，捕捉海岸的精髓。",
    groups: [
      {
        items: [
          i(
            "Sashimi Mediterráneo",
            "地中海刺身",
            "新鲜生鱼片、酸豆花蕾",
            235
          ),
          i(
            "Ostras con Salsa Mignonette",
            "生蚝配米尼奥内特酱",
            "新鲜生蚝配米尼奥内特酱 · 5 只",
            150
          ),
          i(
            "Anchoas del Cantábrico",
            "坎塔布里亚凤尾鱼",
            "橄榄油浸凤尾鱼、面包、番茄酱",
            350
          ),
          i(
            "Boquerones en Vinagre con Chips",
            "醋渍白凤尾鱼配薯片",
            "醋腌白凤尾鱼、炸薯片",
            180
          ),
          i(
            "Mojama de Atún",
            "风干金枪鱼",
            "地中海风干熟成金枪鱼、杏仁",
            250
          ),
          i(
            "Mar y Sal",
            "海与盐拼盘",
            "海鲜综合拼盘：风干金枪鱼与杏仁、醋渍白凤尾鱼与薯片、橄榄油浸凤尾鱼、凤尾鱼橄榄串、生蚝",
            890
          ),
        ],
      },
    ],
  },
  {
    id: "picoteo",
    title: "佐酒小点",
    original: "Picoteo – Small Bite",
    intro: "小小一口，大大气氛。Picoteo 就是分享、小酌，享受当下——随意搭配，一起品味每一口。",
    groups: [
      {
        items: [
          i(
            "Pan con Tumaca y Aioli",
            "番茄蒜泥蛋黄酱面包",
            "面包、番茄、蒜香蛋黄酱",
            70
          ),
          i(
            "Brioche de Atún con Chocolate Blanco",
            "金枪鱼布里欧修配白巧克力",
            "布里欧修、金枪鱼、白巧克力 · 2 件",
            170
          ),
          i("Olivas Fritas", "炸酿橄榄", "酿馅炸橄榄 · 3 个", 130),
          i("Aceitunas Ibérico", "伊比利亚腌橄榄", "香草腌橄榄", 110),
          i(
            "Almendras Fritas con Sal",
            "盐渍炸杏仁",
            "炸杏仁、盐与胡椒",
            90
          ),
          i(
            "Gilda Ibérica",
            "伊比利亚吉尔达串",
            "凤尾鱼、橄榄、皮帕拉辣椒串 · 2 串",
            135
          ),
        ],
      },
    ],
    funFact:
      "趣闻：Pintxos 是巴斯克地区对 tapas 的回答！与普通 tapas 不同，pintxos 是用牙签串起的小点，常常叠放在面包上。",
  },
  {
    id: "clasicas",
    title: "经典小食",
    original: "Tapas Clásicas",
    intro:
      "一口大小的传统。传说 tapas 最初只是盖在酒杯上的小盖子，却很快成为西班牙人最爱的吃法——小小一口，大大风味！",
    groups: [
      {
        columns: ["6 个", "12 个"],
        items: [
          i(
            "Croquetas de Jamón",
            "火腿可乐饼",
            "伊比利亚火腿可乐饼",
            150,
            290
          ),
          i(
            "Croquetas de Setas con Crema de Manchego",
            "蘑菇可乐饼配曼彻格奶油",
            "蘑菇可乐饼、曼彻格奶酪慕斯",
            135,
            265
          ),
        ],
        note: "“金黄酥脆，内馅是奶香浓郁的白酱与咸香馅料——可乐饼是终极的舒心一口。”",
      },
      {
        columns: ["Tapa", "Ración"],
        items: [
          i(
            "Tortilla de Patatas con Aioli",
            "西班牙土豆蛋饼配蒜泥蛋黄酱",
            "西班牙土豆蛋饼、蒜香蛋黄酱",
            90,
            150
          ),
          i(
            "Ensaladilla de Gambas",
            "鲜虾土豆沙拉",
            "奶香土豆沙拉、鲜虾",
            150,
            255
          ),
          i(
            "Setas Escabeche con Crema de Manchego",
            "油醋腌蘑菇配曼彻格奶油",
            "油醋腌蘑菇、曼彻格奶酪慕斯",
            120,
            215
          ),
        ],
      },
      {
        items: [
          i(
            "Gambas al Ajillo",
            "蒜香大虾",
            "伊比利亚风味蒜香大虾。多汁大虾、大蒜与辣椒在橄榄油中滋滋作响，成就西班牙最难以抗拒的小食之一——趁热从锅里端上最美味，配上酥脆面包，蘸尽最后一滴蒜香。",
            265
          ),
          i("Patatas Bravas", "辣酱土豆", "香辣土豆", 120),
          i(
            "Patatas con Aioli",
            "蒜泥蛋黄酱土豆",
            "炸土豆、蒜香蛋黄酱、腌紫洋葱",
            120
          ),
          i(
            "Mejillones en Escabeche con Chips",
            "油醋腌青口配薯片",
            "油醋腌青口、炸薯片",
            165
          ),
          i(
            "Calamares Fritos con Aioli de Pimienta Negra",
            "酥炸鱿鱼配黑胡椒蒜泥蛋黄酱",
            "炸鱿鱼、黑胡椒蒜香蛋黄酱",
            225
          ),
          i(
            "Almejas al Ajillo",
            "蒜香蛤蜊",
            "蒜香蛤蜊、番茄酱",
            225
          ),
          i(
            "Gambas Fritas con Aioli de Limón y Wasabi",
            "酥炸大虾配柠檬芥末蒜泥蛋黄酱",
            "炸大虾、芥末柠檬蒜香蛋黄酱",
            195
          ),
          i(
            "Mero Frito con Pilpil Cítrico",
            "酥炸石斑鱼配柑橘皮尔皮尔酱",
            "炸石斑鱼、柑橘皮尔皮尔酱",
            190
          ),
        ],
      },
    ],
    funFact:
      "趣闻：在马德里，著名的“炸鱿鱼三明治”（bocadillo de calamares）被视为本地标志——尽管马德里离海很远。",
  },
  {
    id: "casa",
    title: "招牌小食",
    original: "Tapas de la Casa",
    intro: "精心挑选的招牌小食，汇集多种西班牙风味——最适合分享，一次尝遍我们的特色美味。",
    groups: [
      {
        items: [
          i(
            "Bomba de Sobrasada",
            "索布拉萨达炸土豆球",
            "裹面包糠的土豆球，内馅为软质熟成猪肉抹酱",
            195
          ),
          i(
            "Tiradito del Dia",
            "每日提拉迪托",
            "当日鲜鱼、百香果虎奶",
            190
          ),
          i(
            "Ensalada de la Casa",
            "招牌沙拉",
            "青菜沙拉、榛子酱汁",
            95
          ),
          i(
            "Escabeche de Coliflor Asada",
            "烤花椰菜油醋渍",
            "烤花椰菜油醋渍",
            155
          ),
          i(
            "Calabacín Ahumado con Queso Idiazabal",
            "烟熏西葫芦配伊迪亚萨瓦尔奶酪",
            "烟熏西葫芦、伊迪亚萨瓦尔奶酪、茴香果酱",
            165
          ),
          i(
            "Esparragos Blancos con Holandesa y Manchego",
            "白芦笋配荷兰酱与曼彻格奶酪",
            "白芦笋、荷兰酱、曼彻格奶酪",
            235
          ),
          i(
            "Arroz Meloso de Carrilleras y Judías",
            "牛脸肉青豆浓汁饭",
            "“浓稠”米饭、牛脸颊肉、青豆",
            325
          ),
          i(
            "Vieras con Jamon Iberico y Sopa de Maíz",
            "扇贝配伊比利亚火腿与玉米浓汤",
            "香煎扇贝、伊比利亚火腿、玉米浓汤",
            295
          ),
          i(
            "Iberico Sando",
            "伊比利亚猪肉三明治",
            "伊比利亚风格猪肉布里欧修三明治",
            350
          ),
          i(
            "Pulpo Frito con Romesco",
            "酥炸章鱼配罗梅斯科酱",
            "炸章鱼、罗梅斯科酱",
            290
          ),
          i(
            "Costilla de Iberico a la Barbacoa",
            "烧烤伊比利亚猪肋排",
            "烧烤伊比利亚猪肋排、花生、腌卷心菜。慢火烹制至完美，多汁、带烟熏香，裹着浓郁美味的烧烤酱汁。",
            415
          ),
          i(
            "Secreto Ibérico con Brocolini y Pimientos Encurtidos",
            "伊比利亚秘切猪肉配西兰花苗与腌甜椒",
            "伊比利亚秘切猪肉（Secreto）、西兰花苗、腌甜椒。西班牙美食中的隐藏瑰宝！多汁鲜嫩、完美煎封，配浓郁雪莉酒汁。",
            495
          ),
          i(
            "Picaña a la Parrilla con Chimichurri",
            "炭烤牛臀盖肉配青酱",
            "炭烤牛臀盖肉（Picanha）、奇米丘里酱。以招牌肥边闻名，明火炙烤，外层焦香，内里鲜嫩多汁。",
            475
          ),
        ],
      },
    ],
    funFact:
      "趣闻：“bomba”之所以得名，是因为它看起来像一颗小炸弹——外酥脆，内爆发出风味。",
  },
  {
    id: "paella",
    title: "西班牙海鲜饭",
    original: "Paella",
    intro:
      "大锅，浓烈风味！我们的海鲜饭用藏红花米饭、烟熏香料和你选择的食材，文火慢煮出令人垂涎的酥脆锅底。适合分享（或者不分享……）",
    note: "需 25 分钟烹制至完美，等待时请先点些小食 · 配蒜香蛋黄酱与柠檬 · 每锅至少 2 人起点，请选择一种口味",
    groups: [
      {
        columns: ["每位"],
        items: [
          i(
            "Marisco",
            "海鲜饭",
            "红烧鱿鱼、蛤蜊、大虾、鱼",
            275
          ),
          i(
            "Arroz Negro",
            "墨鱼黑饭",
            "黑米饭、鱿鱼、蒜片脆",
            335
          ),
          i(
            "Vegetariana",
            "蔬菜饭",
            "西兰花、青芦笋、茴香、焦糖洋葱",
            215
          ),
        ],
      },
    ],
    funFact:
      "趣闻：西班牙每个地区都有自己的做法！瓦伦西亚偏爱兔肉和蜗牛，沿海地区钟情海鲜，有些人甚至加入辣香肠（不过正统派认为那是罪过！）",
  },
  {
    id: "postres",
    title: "甜点",
    original: "Postres – Desserts",
    intro:
      "西班牙风味甜点，为这一餐画上句号——从绵密的芝士蛋糕、配浓郁巧克力酱的酥脆吉事果，到传统的托利哈和清爽的冰淇淋。",
    groups: [
      {
        items: [
          i(
            "Tarta de Queso Manchego",
            "曼彻格芝士蛋糕",
            "曼彻格芝士蛋糕——巴斯克焦糖芝士蛋糕！绵密、浓郁，带着曼彻格奶酪坚果与奶油的醇香，绝非寻常甜点。甜中微咸，难以抗拒，一块可能不够！",
            130
          ),
          i(
            "Churros con Chocolate",
            "吉事果配巧克力",
            "吉事果配巧克力酱",
            115
          ),
          i(
            "Torrija Limón y Pomelo",
            "柠檬柚子托利哈",
            "西班牙“法式吐司”、柠檬奶油、柚子",
            155
          ),
          i(
            "Helados",
            "冰淇淋",
            "巧克力、草莓、柠檬、椰子口味",
            75
          ),
        ],
      },
    ],
    funFact:
      "趣闻：许多西班牙甜点（如吉事果和杜隆糖）已有几百年历史。从摩尔风味甜食到节日传统，西班牙甜点是历史与风味的美妙融合！",
  },
  {
    id: "bebidas",
    title: "酒水",
    original: "Bebidas – Drinks",
    intro:
      "精心甄选的西班牙葡萄酒、手工调制鸡尾酒、自家桑格利亚、啤酒与精品烈酒——汇集传统、品质与一抹地中海风情。",
    groups: [
      {
        title: "雪莉酒 Sherry（每份 80ml）",
        columns: ["杯"],
        items: [
          i(
            "Canasta – Cream",
            "Canasta 奶油雪莉",
            "Oloroso、Pedro Ximénez · “甜美浓郁，带有干果与烘烤坚果的香气”",
            120
          ),
          i(
            "Croft – Pale Cream",
            "Croft 淡奶油雪莉",
            "100% Palomino · “口感清爽，干净的蜂蜜香，中等干甜的尾韵”",
            140
          ),
          i(
            "Tio Pepe “Warhol” – Fino",
            "Tio Pepe“沃霍尔”菲诺雪莉",
            "100% Palomino · “干爽清脆，带杏仁香”",
            160
          ),
        ],
      },
      {
        title: "卡瓦起泡酒 Cava – Sparkling Wine",
        columns: ["杯", "瓶"],
        items: [
          w(
            "Vega Medien Brut",
            "西班牙 · D.O. Cava · Macabeo、Chardonnay",
            "“金色光泽，气泡细腻，持久而优雅”",
            160,
            950
          ),
          w(
            "Conde de Haro Brut",
            "西班牙 · D.O. Cava · Viura、Chardonnay",
            "“优雅的苹果与淡淡布里欧修香，清脆干爽的收尾，平衡协调”",
            1600
          ),
          w(
            "Chateau de Bligny Grande Reserve",
            "法国 · D.O. Champagne · Pinot Noir、Chardonnay",
            "“优雅的法国香槟，气泡细腻，奶香丰润，带成熟黄色水果与烘烤布里欧修的香气”",
            2900
          ),
        ],
      },
      {
        title: "桃红葡萄酒 Rosado – Rosé Wine",
        columns: ["瓶"],
        items: [
          w(
            "Muga Rose",
            "西班牙 · D.O. Rioja · Tempranillo",
            "“清新活泼，红色浆果香，干爽清脆的收尾”",
            1000
          ),
          w(
            "Cote de Roses",
            "法国 · A.O. Languedoc · Grenache、Syrah、Cinsault",
            "“优雅清爽，带草莓与粉红葡萄柚的香气”",
            1600
          ),
        ],
      },
      {
        title: "红葡萄酒 Tinto – Red Wine",
        columns: ["杯", "瓶"],
        items: [
          w(
            "Al Muvedre",
            "西班牙 · D.O. Alicante · Monastrell",
            "“酒体饱满，充满深色水果，余韵富有表现力并带辛香”",
            145,
            850
          ),
          w(
            "Les Terraces",
            "法国 · IGP Ardeche · Merlot、Syrah",
            "“红色浆果风味，一丝胡椒气息，顺滑易饮的收尾”",
            155,
            890
          ),
          w(
            "El Jamon",
            "西班牙 · D.O. Cariñena · Garnacha",
            "“明亮多汁，带红樱桃与草莓香，单宁柔和”",
            160,
            900
          ),
          w(
            "La Planta",
            "西班牙 · D.O. Ribera del Duero · Tempranillo",
            "“结构分明、表现力强，深色樱桃香与淡淡橡木味”",
            170,
            980
          ),
          w(
            "Tomaresca Neprica",
            "意大利 · IGT Puglia · Primitivo",
            "“来自意大利南部的慷慨红酒，多汁黑色水果与丝绒般的单宁”",
            1050
          ),
          w(
            "Palacio del Burgo Crianza",
            "西班牙 · D.O.Ca. Rioja · Tempranillo",
            "“优雅均衡，成熟红色水果，柔和橡木味与咸鲜的收尾”",
            1150
          ),
          w(
            "Sierra Cantabria Selection",
            "西班牙 · D.O.Ca. Rioja · Tempranillo",
            "“精致而层次丰富，深色浆果、淡淡橡木味，悠长细腻的收尾”",
            1200
          ),
          w(
            "Chateau Clou Du Pin Supérieur",
            "法国 · A.O. Bordeaux Supérieur · Merlot、Cabernet Sauvignon、Cabernet Franc",
            "“色泽深邃，酒体饱满，单宁结构顺滑”",
            1200
          ),
          w(
            "M.Chapoutier “Belleruche”",
            "法国 · A.O. Côtes du Rhône · Grenache、Syrah",
            "“浓郁果香，带深色浆果与淡淡香料，圆润顺滑”",
            1200
          ),
          w(
            "Marqués de Cáceres Crianza",
            "西班牙 · D.O.Ca. Rioja · Tempranillo",
            "“优雅均衡，浆果风味与橡木的复杂度”",
            1300
          ),
          w(
            "Carpineto Dogajolo",
            "意大利 · IGT Toscana · Sangiovese、Cabernet Sauvignon",
            "“活泼、果味突出，带樱桃与黑莓香，单宁柔和”",
            1450
          ),
          w(
            "Cave de Lugny",
            "法国 · A.O.C. Bourgogne · Pinot Noir",
            "“轻盈优雅，带红樱桃与覆盆子香，单宁柔和”",
            1550
          ),
          w(
            "Muga Reserva",
            "西班牙 · D.O.Ca Rioja · Tempranillo",
            "“复杂而精致，成熟红色水果、香草与香料”",
            1600
          ),
          w(
            "Chateau Haut Saint Brice Grand Cru",
            "法国 · A.O.C Saint-Émilion Grand Cru · Merlot、Cabernet Franc",
            "“浓郁而结构丰富，层叠着深色李子、黑加仑与精致橡木，余韵悠长优雅”",
            1650
          ),
          w(
            "Finca San Martin Crianza",
            "西班牙 · D.O.Ca Rioja Alta · Tempranillo",
            "“顺滑圆润，成熟樱桃、香草与柔和的橡木香”",
            1800
          ),
          w(
            "Yllera Vendimia Seleccionada",
            "西班牙 · Vino de la Tierra de Castilla y León · Tempranillo、Syrah",
            "“精选自卡斯蒂利亚-莱昂最好的葡萄园，兼具复杂度与精致感。在法国与美国橡木桶中陈酿 24 个月，再瓶中熟成数月。”",
            2150
          ),
          w(
            "Marqués de Vargas Reserva",
            "西班牙 · D.O.C.a. Rioja · Tempranillo、Garnacha、Mazuelo",
            "“优雅的里奥哈珍藏，带成熟樱桃、雪松、烟草与柔和香料。单宁顺滑，收尾悠长精致。”——主厨最爱",
            2300
          ),
          w(
            "CVNE Imperial Gran Reserva",
            "西班牙 · D.O.Ca. Rioja · Tempranillo、Graciano、Mazuelo",
            "“经典里奥哈，在橡木桶与瓶中长期陈酿，层叠着成熟红色水果、烟草、皮革与甜香料。单宁丝滑，平衡出色，余韵悠长复杂。”",
            2750
          ),
        ],
      },
      {
        title: "白葡萄酒 Blanco – White Wine",
        columns: ["杯", "瓶"],
        items: [
          w(
            "Basa Blanco",
            "西班牙 · D.O. Rueda · Verdejo、Viura",
            "“迷人的果香与芳香复杂度之间的恰到好处”",
            140,
            850
          ),
          w(
            "Pietrame",
            "意大利 · IGT Terre di Chieti · Pinot Grigio",
            "“清爽轻盈，带梨、柑橘与淡雅花香”",
            150,
            870
          ),
          w(
            "Lobetia Organic",
            "西班牙 · Vino de la Tierra de Castilla · Chardonnay",
            "“清新顺滑，成熟苹果与热带水果香，均衡”",
            160,
            900
          ),
          w(
            "Finca Luzon Blanco",
            "西班牙 · D.O. Jumilla · Macabeo、Sauvignon Blanc",
            "“清新芳香，带柑橘香气与清脆的收尾”",
            170,
            970
          ),
          w(
            "Pago Mota",
            "西班牙 · Vino de la Tierra de Castilla · Chardonnay",
            "“柑橘香，以及轻度橡木陈酿带来的淡淡香草味”",
            1000
          ),
          w(
            "Les Terraces",
            "法国 · IGP Ardeche · Sauvignon Blanc、Grenache Blanc",
            "“活泼清爽，明亮的柑橘与淡雅花香”",
            1200
          ),
          w(
            "Faustino Rivero Ulecia",
            "西班牙 · D.O. Rías Baixas · Albariño",
            "“清爽，带青柠、白桃与一丝海盐味”",
            1350
          ),
          w(
            "Muga Blanco",
            "西班牙 · D.O.Ca. Rioja · Viura、Garnacha Blanca、Malvasía",
            "“橡木桶发酵与陈酿，带来淡淡香草与烘烤杏仁香”",
            1400
          ),
          w(
            "Besthiem Chassuer de Lune Collection",
            "法国 · A.O. Alsace · Riesling",
            "“清脆而富矿物感，鲜明的柑橘、青苹果与淡雅花香”",
            1500
          ),
          w(
            "Masion Louis Latour",
            "法国 · A.O. Bourgogne · Chardonnay",
            "“优雅圆润，带成熟苹果、柑橘与淡淡奶油香”",
            1800
          ),
        ],
      },
      {
        title: "招牌酒饮 Drinks de la Casa",
        note: "“葡萄酒、新鲜水果与活泼地中海精神的完美融合。”",
        columns: ["杯", "壶"],
        items: [
          i(
            "Classic Sangria",
            "经典桑格利亚",
            "红葡萄酒、混合水果、Skyy 伏特加、肉桂糖浆",
            140,
            495
          ),
          i(
            "White Sangria",
            "白桑格利亚",
            "白葡萄酒、水蜜桃糖浆、金酒、混合水果",
            140,
            495
          ),
        ],
      },
      {
        columns: ["杯"],
        items: [
          i(
            "Sangria Spritz",
            "桑格利亚气泡酒",
            "Aperol、甜味美思、橙汁、卡瓦、苏打水",
            175
          ),
          i(
            "Tinto de Verano",
            "夏日红酒",
            "红葡萄酒、雪碧、青柠汁",
            140
          ),
          i(
            "Negroni",
            "内格罗尼",
            "Bulldog 金酒、Cizano 红味美思、Campari",
            175
          ),
          i(
            "Margarita",
            "玛格丽特",
            "Jose Cuervo 龙舌兰、青柠、Bols 橙皮甜酒",
            175
          ),
          i(
            "Mojito",
            "莫吉托",
            "Brugal Blanco 朗姆酒、薄荷、苏打水",
            175
          ),
          i(
            "Old Fashion",
            "古典鸡尾酒",
            "Bushmills Original 威士忌、苦精、橙",
            175
          ),
          i(
            "Whisky Sour",
            "威士忌酸",
            "Wild Turkey 威士忌、蛋白、青柠、苦精",
            175
          ),
          i(
            "Red Bubbles",
            "红色气泡",
            "Aperol、起泡酒、苏打水、橙",
            175
          ),
        ],
      },
      {
        title: "啤酒 Cerveza",
        columns: ["瓶"],
        items: [
          i(
            "Estrella Galicia Lager 5%",
            "Estrella Galicia 拉格 5%",
            "“西班牙啤酒的真正标志 ★”",
            95
          ),
          i("1906 Reserva 6.5%", "1906 珍藏 6.5%", undefined, 95),
          i("Asahi 5%", "朝日 5%", undefined, 95),
          i("Huda 4.7%", "Huda 4.7%", undefined, 60),
        ],
      },
      {
        title: "威士忌 Whisky",
        columns: ["杯", "瓶"],
        items: [
          i("High Commissionner", "High Commissionner", undefined, 150, 1400),
          i("Bushmills Original", "Bushmills Original", undefined, 150, 1400),
          i("Wild Turkey 81", "Wild Turkey 81", undefined, 150, 1400),
          i("Maker’s Mark", "Maker’s Mark", undefined, 190, 1800),
          i("Monkey Shoulder", "Monkey Shoulder", undefined, 200, 2100),
          i("Singleton 12YO", "Singleton 12 年", undefined, 220, 2600),
          i("Macallan 12YO", "Macallan 12 年", undefined, 350, 4300),
        ],
      },
      {
        title: "白兰地与干邑 Brandy & Cognac",
        columns: ["杯", "瓶"],
        items: [
          i("St-Remy VSOP", "St-Remy VSOP", undefined, 160, 1450),
          i(
            "Brandy Lustau Solera Reserva",
            "Lustau Solera Reserva 白兰地",
            undefined,
            200,
            2000
          ),
        ],
      },
      {
        title: "伏特加 Vodka",
        columns: ["杯", "瓶"],
        items: [
          i("Skyy", "Skyy", undefined, 150, 1400),
          i("Ketel One", "Ketel One", undefined, 180, 1700),
        ],
      },
      {
        title: "金酒 Gin",
        columns: ["杯", "瓶"],
        items: [
          i(
            "Nordes Atlantic",
            "Nordés 大西洋金酒",
            "“Nordés 是来自西班牙加利西亚的高端大西洋金酒，以清新、带果香的独特风味闻名。”",
            190,
            1950
          ),
          i("Bulldog", "Bulldog", undefined, 160, 1400),
          i("Roku", "六 Roku", undefined, 170, 1800),
        ],
      },
      {
        title: "朗姆酒 Rum",
        columns: ["杯", "瓶"],
        items: [
          i("Brugal Blanco", "Brugal Blanco", undefined, 130, 1400),
          i("Mount Gay Eclipse", "Mount Gay Eclipse", undefined, 130, 1400),
          i("Zacapa 23YO", "Zacapa 23 年", undefined, 350, 3100),
        ],
      },
      {
        title: "龙舌兰 Tequila",
        columns: ["杯", "瓶"],
        items: [
          i("Jose Cuervo", "Jose Cuervo", undefined, 120, 1200),
          i("1800 Blanco", "1800 Blanco", undefined, 200, 2100),
          i("Don Julio Blanco", "Don Julio Blanco", undefined, 310, 2900),
        ],
      },
      {
        title: "无酒精饮品 Non-Alcohol",
        items: [
          i("Soft Drinks", "软饮", undefined, 45),
          i(
            "Still / Sparkling “Lavie” Water 45cl",
            "Lavie 矿泉水 / 气泡水 45cl",
            undefined,
            60
          ),
          i("San Pellegrino 75cl", "圣培露气泡水 75cl", undefined, 120),
          i(
            "Apple Champagne “Chill Kombucha”",
            "“Chill”苹果香槟康普茶",
            undefined,
            120
          ),
          i("Mocktail", "无酒精鸡尾酒", "“每日调酒师精选”", 120),
          i("Juice of the day", "每日鲜榨果汁", undefined, 75),
          i("Espresso / Cappuccino", "意式浓缩 / 卡布奇诺", undefined, 60),
        ],
      },
    ],
  },
];
