import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type BasketItem = {
  key: string;
  productId: string;
  name: string;
  variant: string;
  flavour?: string;
  price: number;
  qty: number;
};

type Ctx = {
  items: BasketItem[];
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (i: Omit<BasketItem, "key">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
  total: number;
};

const BasketCtx = createContext<Ctx | null>(null);
const KEY = "saima-basket-v1";

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add: Ctx["add"] = (i) => {
    const key = [i.productId, i.variant, i.flavour ?? ""].join("|");
    setItems((prev) => {
      const ex = prev.find((p) => p.key === key);
      if (ex) return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + i.qty } : p));
      return [...prev, { ...i, key }];
    });
  };
  const setQty = (key: string, qty: number) =>
    setItems((prev) => prev.map((p) => (p.key === key ? { ...p, qty: Math.max(1, Math.min(50, qty)) } : p)));
  const remove = (key: string) => setItems((prev) => prev.filter((p) => p.key !== key));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <BasketCtx.Provider value={{ items, open, setOpen, add, setQty, remove, clear, count, total }}>
      {children}
    </BasketCtx.Provider>
  );
}

export function useBasket() {
  const c = useContext(BasketCtx);
  if (!c) throw new Error("useBasket outside provider");
  return c;
}
