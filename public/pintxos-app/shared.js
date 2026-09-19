// IBÉRICO Pintxos Night — shared config + data
window.PINTXOS_CONFIG = {
  supabaseUrl: "https://mxauprdroxxwoaiezybt.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YXVwcmRyb3h4d29haWV6eWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwOTU2MDksImV4cCI6MjEwMDY3MTYwOX0.z1BE5Snoom3nNxh8WwULDQ9Iif9W8t1-zyU-9dtRctk",
  table: "pintxos_night_votes"
};

window.PINTXOS_STATIONS = [
  { id: "cold",    label: "Cold Bar",          vi: "Quầy món lạnh" },
  { id: "fryer",   label: "The Fryer",         vi: "Quầy chiên" },
  { id: "grill",   label: "The Grill",         vi: "Quầy nướng" },
  { id: "special", label: "Tonight's Special", vi: "Đặc biệt tối nay", tag: "Special" }
];

window.PINTXOS_DISHES = [
  { id: "salmorejo",   name: "Salmorejo",          desc: "Chilled tomato soup tartalette, egg, ham.",                vi: "Vỏ tartlet súp cà chua lạnh, trứng, giăm bông.", station: "cold" },
  { id: "ensaladilla", name: "Ensaladilla",        desc: "Creamy potato salad tartalette, garlic prawns.",           vi: "Vỏ tartlet salad khoai tây kem, tôm xào tỏi.", station: "cold" },
  { id: "hummus",      name: "Hummus",             desc: "Hummus tartalette, roasted peppers, black olive powder.",  vi: "Vỏ tartlet hummus, ớt chuông nướng, bột ô liu đen.", station: "cold" },
  { id: "gilda",       name: "Gilda Tradicional",  desc: "Olive, mackerel, piparra pepper.",                         vi: "Ô liu, cá thu, ớt piparra.", station: "cold" },
  { id: "pate",        name: "Pate de Pollo",      desc: "Chicken liver parfait cone, apple jam, toasted almond.",   vi: "Cone pate gan gà, mứt táo, hạnh nhân rang.", station: "cold" },
  { id: "pulpo",       name: "Pintxo de Pulpo",    desc: "Octopus, boiled potato, paprika.",                         vi: "Bạch tuộc, khoai tây luộc, bột ớt paprika.", station: "cold" },
  { id: "ostra",       name: "Ostra",              desc: "Chilled almond soup, grilled oyster, pickled grapes.",     vi: "Súp hạnh nhân lạnh, hàu nướng, nho ngâm chua.", station: "cold" },
  { id: "tartar",      name: "Tartar de Cecina",   desc: "Beef ham tartare, cured egg yolk.",                        vi: "Tartare cecina (thịt bò muối khô), lòng đỏ trứng ủ muối.", station: "cold" },
  { id: "gazpacho",    name: "Espuma de Gazpacho", desc: "Black sherry tomato infused.",                             vi: "Bọt gazpacho cà chua ngâm rượu sherry đen.", station: "cold" },

  { id: "croq-jamon",  name: "Croqueta Jamon",     desc: "Ham croquette, tumaca sauce.",                             vi: "Croquette giăm bông, sốt cà chua tumaca.", station: "fryer" },
  { id: "croq-queso",  name: "Croqueta Queso",     desc: "Cheese croquette, quince jelly.",                          vi: "Croquette phô mai, thạch mộc qua.", station: "fryer" },
  { id: "bravas",      name: "Patatas Bravas",     desc: "Potato millefeuille, brava, aioli.",                       vi: "Khoai tây nhiều lớp millefeuille, sốt brava, aioli.", station: "fryer" },
  { id: "bomba",       name: "Bomba de Sobrasada", desc: "Crispy potato bomba filled with sobrasada.",               vi: "Bomba khoai tây giòn nhân xúc xích sobrasada.", station: "fryer" },
  { id: "alitas",      name: "Alitas de Pollo",    desc: "Shaken chicken wings.",                                    vi: "Cánh gà lắc (shaken).", station: "fryer" },

  { id: "setas",       name: "Setas",              desc: "Truffled tartalette, charred shimeji, cured egg yolk.",    vi: "Vỏ tartlet nấm truffle, nấm shimeji nướng, lòng đỏ trứng ủ muối.", station: "grill" },
  { id: "tortilla",    name: "Tortilla",           desc: "Spanish omelet, aioli.",                                   vi: "Trứng chiên kiểu Tây Ban Nha, aioli.", station: "grill" },
  { id: "bikini",      name: "Bikini",             desc: "Serrano ham, Manchego cheese, truffle paste.",             vi: "Giăm bông serrano, phô mai Manchego, sốt truffle.", station: "grill" },
  { id: "morcilla",    name: "Morcilla de Burgos", desc: "Black pudding, quail egg, crispy straw potato.",           vi: "Dồi huyết Burgos, trứng cút, khoai tây sợi giòn.", station: "grill" },

  { id: "nigiri",      name: "Nigiri Arroz Negro", desc: "Squid ink rice nigiri, lomo en manteca.",                  vi: "Nigiri cơm mực đen, lomo en manteca (thịt heo thăn ngâm mỡ).", station: "special" },
  { id: "paella",      name: "Paella",             desc: "Seafood paella rice, ajillo prawns, head prawn.",          vi: "Cơm hải sản paella, tôm xào tỏi ajillo, đầu tôm.", station: "special" }
];

// TESTING: open now. To re-lock, set to "2026-09-19T18:00:00+07:00" and update the server gate in supabase function submit_pintxos_votes.
window.PINTXOS_START_TIME = "2020-01-01T00:00:00+07:00";
