import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Minus, Plus, ShoppingBag, Trash2, X, Menu as MenuIcon } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { img, rupee, WA, IG, PHONE } from "@/data/menu";
import { useBasket } from "@/hooks/use-basket";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const NAV: [string, string][] = [
  ["Story", "/#story"],
  ["Menu", "/menu"],
  ["Order Online", "/menu#order"],
  ["Contact", "/#contact"],
];

export function NavLink({ to, children, className = "", onClick, testId }: { to: string; children: ReactNode; className?: string; onClick?: () => void; testId?: string }) {
  if (to.includes("#")) {
    return <a href={BASE + to} className={className} onClick={onClick} data-testid={testId}>{children}</a>;
  }
  return <Link href={to} className={className} onClick={onClick} data-testid={testId}>{children}</Link>;
}

/* Header: position relative on navy, scrolls away (not sticky) */
export function Header() {
  const { count, setOpen } = useBasket();
  const [mobile, setMobile] = useState(false);
  return (
    <header className="relative z-30 bg-[#1C2E3B] text-[#FFFDF9]">
      <div className="flex h-[80px] items-center justify-between px-5 md:h-[97px] md:px-[60px]">
        <Link href="/" className="flex items-center gap-3" data-testid="link-home">
          <img src={img("saima-logo.jpg")} alt="Saima Bakery & Confectionery logo" className="h-11 w-11 rounded-full object-cover" />
        </Link>
        <div className="flex items-center gap-8 lg:gap-10">
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Main">
            {NAV.map(([l, h]) => (
              <NavLink key={h} to={h} className="brun-link text-[15px] leading-[21px] hover:text-[#CA8263]" testId={`link-nav-${l.toLowerCase().replace(" ", "-")}`}>{l}</NavLink>
            ))}
          </nav>
          <button onClick={() => setOpen(true)} className="brun-link flex items-center gap-2 text-[15px] hover:text-[#CA8263]" aria-label={`Open basket, ${count} items`} data-testid="button-open-basket">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
            <span data-testid="text-basket-count">{count}</span>
          </button>
          <button className="lg:hidden" onClick={() => setMobile((m) => !m)} aria-expanded={mobile} aria-label="Toggle navigation" data-testid="button-mobile-nav">
            {mobile ? <X className="h-6 w-6" strokeWidth={1.25} /> : <MenuIcon className="h-6 w-6" strokeWidth={1.25} />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav className="border-t border-white/15 px-5 pb-6 lg:hidden" aria-label="Mobile">
          {NAV.map(([l, h]) => (
            <NavLink key={h} to={h} onClick={() => setMobile(false)} className="brun-h block border-b border-white/15 py-4 text-3xl">{l}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="bg-[#1C2E3B] text-[#FFFDF9]">
      <div className="px-5 pt-7 text-center md:px-[60px] md:pt-12">
        <nav className="flex flex-col items-center gap-4 border-y border-[#FFFDF9]/70 py-9 md:flex-row md:justify-center md:gap-12" aria-label="Footer">
          <NavLink to="/" className="brun-link text-[13px] hover:underline md:text-[15px]">Home</NavLink>
          {NAV.map(([l, h]) => (
            <NavLink key={h} to={h} className="brun-link text-[13px] hover:underline md:text-[15px]">{l}</NavLink>
          ))}
        </nav>
        <div className="mx-auto max-w-[420px] pb-9 pt-8 text-[13px] leading-[19px] md:py-12 md:text-[15px] md:leading-[23px]">
            <p>Saima Bakery &amp; Confectionery<br />NIBM Road, Pune</p>
            <div className="mt-5">
            <a href={`tel:${PHONE}`} className="brun-link block hover:text-[#CA8263]" data-testid="link-footer-call">+91 98900 28606</a>
            <a href={`${WA}?text=${encodeURIComponent("Hello Saima Bakery! I have a question.")}`} target="_blank" rel="noreferrer" className="brun-link mt-2 flex items-center justify-center gap-2 hover:text-[#CA8263]" data-testid="link-footer-whatsapp"><SiWhatsapp /> WhatsApp</a>
            <a href={IG} target="_blank" rel="noreferrer" className="brun-link mt-2 flex items-center justify-center gap-2 hover:text-[#CA8263]" data-testid="link-footer-instagram"><SiInstagram /> @saimabakerypune</a>
            </div>
        </div>
      </div>
      <p className="brun-copy mx-auto max-w-[420px] px-5 pb-7 text-center text-[13px] opacity-80">© {new Date().getFullYear()} Saima Bakery &amp; Confectionery, Pune.<br />100% vegan &amp; eggless.</p>
    </footer>
  );
}

export function Basket() {
  const { items, open, setOpen, setQty, remove, clear, total, count } = useBasket();
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState<"Delivery" | "Pickup">("Delivery");
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, setOpen]);

  const send = () => {
    const lines = items.map((i, n) => `${n + 1}. ${i.name} (${i.variant}${i.flavour ? `, ${i.flavour}` : ""}) x ${i.qty} = ${rupee(i.price * i.qty)}`);
    const msg = [
      "Hello Saima Bakery! I'd like to place an order enquiry:",
      "",
      ...lines,
      "",
      `Estimated total: ${rupee(total)} (delivery extra)`,
      `${mode}${date ? ` on ${date}` : ""}`,
      note && `Note: ${note}`,
      "",
      "Please confirm availability and final amount. Thank you!",
    ]
      .filter((x): x is string => typeof x === "string")
      .join("\n");
    window.open(`${WA}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  const minDate = new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10);
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 cursor-pointer bg-[#1C2E3B]/50" onClick={() => setOpen(false)} />
      <aside role="dialog" aria-modal="true" aria-label="Your basket" className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[#FFFDF9] text-[#1C2E3B]" data-testid="panel-basket">
        <div className="flex items-center justify-between border-b border-[#1C2E3B]/15 px-6 py-5">
          <div>
            <h2 className="brun-h text-[32px] leading-tight">Your basket</h2>
            <p className="text-xs opacity-70">{count} item{count === 1 ? "" : "s"} · saved on this device</p>
          </div>
          <button ref={closeRef} onClick={() => setOpen(false)} className="p-2" aria-label="Close basket" data-testid="button-close-basket"><X className="h-5 w-5" strokeWidth={1.25} /></button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
            <img src={img("saima-logo.jpg")} alt="" className="h-24 w-24 rounded-full" />
            <p className="brun-h mt-6 text-[28px]">Nothing here yet.</p>
            <p className="mt-2 text-sm opacity-75">Add a cake or two from the menu and they will wait for you here.</p>
            <Link href="/menu" onClick={() => setOpen(false)} className="brun-btn mt-8" data-testid="link-empty-menu">See the menu</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {items.map((i) => (
                <li key={i.key} className="flex gap-4 border-b border-[#1C2E3B]/15 py-5" data-testid={`row-basket-${i.productId}`}>
                  <div className="flex-1">
                    <p className="brun-h text-[22px]">{i.name}</p>
                    <p className="text-sm opacity-70">{i.variant}{i.flavour && ` · ${i.flavour}`}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border border-[#1C2E3B]/30">
                        <button onClick={() => (i.qty === 1 ? remove(i.key) : setQty(i.key, i.qty - 1))} className="p-2" aria-label="Decrease" data-testid={`button-basket-dec-${i.productId}`}><Minus className="h-3 w-3" /></button>
                        <span className="w-6 text-center text-sm tabular-nums">{i.qty}</span>
                        <button onClick={() => setQty(i.key, i.qty + 1)} className="p-2" aria-label="Increase" data-testid={`button-basket-inc-${i.productId}`}><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(i.key)} className="brun-link flex items-center gap-1 text-xs hover:text-[#CA8263]" data-testid={`button-basket-remove-${i.productId}`}><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                    </div>
                  </div>
                  <p className="tabular-nums">{rupee(i.price * i.qty)}</p>
                </li>
              ))}
              <div className="space-y-4 py-6">
                <div className="flex border border-[#1C2E3B]">
                  {(["Delivery", "Pickup"] as const).map((m) => (
                    <button key={m} onClick={() => setMode(m)} aria-pressed={mode === m} className={`flex-1 py-2.5 text-sm uppercase transition-colors duration-[400ms] ${mode === m ? "bg-[#1C2E3B] text-[#FFFDF9]" : ""}`} data-testid={`button-mode-${m}`}>{m}</button>
                  ))}
                </div>
                <label className="block text-[13px] uppercase">
                  Preferred date
                  <input type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full border border-[#1C2E3B]/30 bg-transparent px-3 py-2.5 text-sm normal-case" data-testid="input-basket-date" />
                </label>
                <label className="block text-[13px] uppercase">
                  Note / message on cake
                  <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Happy birthday Asha, delivery area..." className="mt-2 w-full resize-none border border-[#1C2E3B]/30 bg-transparent px-3 py-2.5 text-sm normal-case" data-testid="input-basket-note" />
                </label>
                <button onClick={clear} className="text-xs underline underline-offset-2" data-testid="button-clear-basket">Clear basket</button>
              </div>
            </ul>
            <div className="border-t border-[#1C2E3B]/15 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm">Estimated total</span>
                <span className="brun-h text-[32px]" data-testid="text-basket-total">{rupee(total)}</span>
              </div>
              <p className="mt-1 text-xs opacity-70">Delivery extra. Pending bakery confirmation. No payment taken here.</p>
              <button onClick={send} className="brun-btn brun-btn-terra mt-4 w-full gap-2" data-testid="button-send-whatsapp">
                <SiWhatsapp className="h-5 w-5" /> Send enquiry on WhatsApp
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  useEffect(() => {
    const h = window.location.hash;
    if (h) {
      const t = setTimeout(() => document.querySelector(h)?.scrollIntoView(), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [loc]);
  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-[#FFFDF9] text-[#1C2E3B]">
      <Header />
      <main>{children}</main>
      <Footer />
      <Basket />
    </div>
  );
}
