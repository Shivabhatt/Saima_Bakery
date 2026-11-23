export type Variant = { id: string; label: string; price: number };
export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  note?: string;
  variants: Variant[];
  flavours?: string[];
};
export type CategoryId = "fruit" | "chocolate" | "classics" | "desserts" | "dry";

export const categories: { id: CategoryId; name: string; line: string }[] = [
  { id: "fruit", name: "Fresh Fruit Cakes", line: "Classic, or made with fresh seasonal fruit." },
  { id: "chocolate", name: "Chocolate Lovers", line: "Deep, dark and entirely egg-free." },
  { id: "classics", name: "Classics", line: "The ones everyone asks for again." },
  { id: "desserts", name: "Desserts & Bites", line: "Boxes, jars and little things to share." },
  { id: "dry", name: "Dry Cakes", line: "Tea-time loaves, all 500g." },
];

const v = (id: string, label: string, price: number): Variant => ({ id, label, price });
const fruit = (id: string, name: string, c7: number, c1: number, fs: number): Product => ({
  id,
  name,
  category: "fruit",
  variants: [
    v("c700", "Classic · 700g", c7),
    v("c1k", "Classic · 1kg", c1),
    v("fs1k", "Fresh Seasonal · 1kg", fs),
  ],
});
const twoSize = (id: string, name: string, category: CategoryId, a: number, b: number): Product => ({
  id,
  name,
  category,
  variants: [v("700", "700g", a), v("1k", "1kg", b)],
});

export const products: Product[] = [
  fruit("strawberry", "Strawberry", 800, 1200, 1300),
  fruit("pineapple", "Pineapple", 800, 1200, 1300),
  fruit("mango", "Mango Delight", 800, 1200, 1300),
  fruit("orange", "Orange", 800, 1200, 1300),
  fruit("special-mix", "Special Mix", 800, 1200, 1400),
  fruit("blueberry", "Blueberry Bliss", 1000, 1400, 1600),
  twoSize("dutch-truffle", "Dutch Truffle", "chocolate", 1100, 1500),
  twoSize("choc-mousse", "Chocolate Mousse", "chocolate", 1000, 1400),
  twoSize("vegan-choc", "Vegan Chocolate", "chocolate", 1000, 1400),
  twoSize("red-velvet", "Red Velvet", "classics", 800, 1200),
  twoSize("butterscotch", "Butterscotch", "classics", 1000, 1400),
  { id: "cheese-cake", name: "Vegan Cheese Cake", category: "classics", variants: [v("800", "800g", 1200)] },
  {
    id: "cupcakes",
    name: "Cupcakes",
    category: "desserts",
    note: "Box of 6",
    variants: [v("box6", "Box of 6", 650)],
    flavours: ["Chocolate", "Banana", "Strawberry", "Red Velvet", "Vanilla"],
  },
  { id: "rum-ball", name: "Rum Ball", category: "desserts", note: "6 pcs", variants: [v("6", "6 pcs", 260)] },
  { id: "almond-brownie", name: "Almond Brownie", category: "desserts", note: "4 pcs", variants: [v("4", "4 pcs", 650)] },
  { id: "vegan-chocolates", name: "Vegan Chocolates", category: "desserts", note: "10 pcs", variants: [v("10", "10 pcs", 350)] },
  { id: "apple-pie", name: "Apple Pie", category: "desserts", variants: [v("m", "Medium", 800), v("l", "Large", 1500)] },
  {
    id: "jar-cakes",
    name: "Jar Cakes",
    category: "desserts",
    variants: [v("jar", "Per jar", 260)],
    flavours: ["Tiramisu", "Choco Mousse"],
  },
  { id: "plum", name: "Plum Cake", category: "dry", note: "500g", variants: [v("500", "500g", 650)] },
  { id: "sf-plum", name: "Sugar-Free Plum Cake", category: "dry", note: "500g", variants: [v("500", "500g", 750)] },
  { id: "choc-tea", name: "Chocolate Tea Cake", category: "dry", note: "500g", variants: [v("500", "500g", 600)] },
  { id: "seeds-nuts", name: "Seeds & Nuts Cake", category: "dry", note: "500g", variants: [v("500", "500g", 650)] },
];

export const rupee = (n: number) => "₹" + n.toLocaleString("en-IN");
export const PHONE = "+919890028606";
export const WA = "https://wa.me/919890028606";
export const IG = "https://www.instagram.com/saimabakerypune/";
export const SOURCE = "https://www.veganfirst.com/article/saima-vegan-bakery-pune";
export const img = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;
