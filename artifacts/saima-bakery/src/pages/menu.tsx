import { useMemo, useState } from "react";
import { Minus, Plus, Phone, ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { categories, products, rupee, img, WA, PHONE, type CategoryId, type Product } from "@/data/menu";
import { useBasket } from "@/hooks/use-basket";
import { Shell } from "@/components/site";

const IGP = (id: string) => `https://www.instagram.com/saimabakerypune/p/${id}/`;
const ig = (id: string) => img(`instagram/${id}.jpg`);
const GALLERY = [
  { id: "DgAaD_6Cpmc", alt: "Pink cake with vintage-style piping, from @saimabakerypune" },
  { id: "DfmrRTkiohP", alt: "Pale pink anniversary cake with pearls and gold butterflies, from @saimabakerypune" },
  { id: "DfHyxb3iqJs", alt: "Pink floral cake with butterflies, from @saimabakerypune" },
];
const CAT_PHOTO: Partial<Record<CategoryId, { src: string; alt: string }>> = {
  chocolate: { src: "chocolate-cake.jpg", alt: "A Saima chocolate cake" },
  desserts: { src: "cupcakes.jpg", alt: "Saima cupcakes" },
};
const stats = (id: CategoryId) => {
  const ps = products.filter((p) => p.category === id);
  return { n: ps.length, from: Math.min(...ps.flatMap((p) => p.variants.map((x) => x.price))) };
};

function IgFigure({ id, alt, className = "", testId }: { id: string; alt: string; className?: string; testId: string }) {
  return (
    <figure className={className}>
      <a href={IGP(id)} target="_blank" rel="noreferrer" className="group block overflow-hidden" data-testid={testId}>
        <img src={ig(id)} alt={alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-opacity duration-[400ms] group-hover:opacity-90" />
      </a>
      <figcaption className="mt-3 flex items-center justify-between gap-3 text-[12px] uppercase tracking-[.08em]">
        <span>Custom design inspiration</span>
        <a href={IGP(id)} target="_blank" rel="noreferrer" className="brun-link flex items-center gap-1 normal-case tracking-normal opacity-80 hover:text-[#CA8263]">Instagram post <ArrowUpRight className="h-3 w-3" /></a>
      </figcaption>
    </figure>
  );
}

const H2 = "brun-h text-[34px] leading-[1.4] md:text-[44px] md:leading-[61.6px]";
const chip = (on: boolean) =>
  `border px-3.5 py-2 text-sm transition-colors duration-[400ms] ${on ? "border-[#1C2E3B] bg-[#1C2E3B] text-[#FFFDF9]" : "border-[#1C2E3B]/30 hover:border-[#1C2E3B]"}`;

function ProductRow({ p }: { p: Product }) {
  const { add } = useBasket();
  const [vid, setVid] = useState(p.variants[0].id);
  const [flavour, setFlavour] = useState(p.flavours?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = p.variants.find((x) => x.id === vid)!;
  const onAdd = () => {
    add({ productId: p.id, name: p.name, variant: variant.label, flavour, price: variant.price, qty });
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 1600);
  };
  return (
    <article className="flex flex-col border border-[#1C2E3B]/20 bg-[#FFFDF9] p-6 transition-colors duration-[400ms] hover:border-[#1C2E3B] md:p-8" data-testid={`card-product-${p.id}`}>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="brun-h text-[28px] leading-tight md:text-[32px]">{p.name}</h3>
          {p.note && <p className="mt-1 text-sm opacity-70">{p.note}</p>}
        </div>
        <p className="brun-h shrink-0 text-[26px] tabular-nums" data-testid={`text-price-${p.id}`}>{rupee(variant.price)}</p>
      </div>
      <div className="mt-6 flex-1 space-y-4">
        <p className="text-[12px] uppercase tracking-[.08em] opacity-70">{p.variants.length > 1 ? "Choose size" : "Size"}</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Size">
          {p.variants.map((x) => (
            <button key={x.id} onClick={() => setVid(x.id)} aria-pressed={vid === x.id} className={chip(vid === x.id)} data-testid={`button-variant-${p.id}-${x.id}`}>
              {x.label} · {rupee(x.price)}
            </button>
          ))}
        </div>
        {p.flavours && (
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Flavour">
            <span className="w-full text-[12px] uppercase tracking-[.08em] opacity-70">Flavour</span>
            {p.flavours.map((f) => (
              <button key={f} onClick={() => setFlavour(f)} aria-pressed={flavour === f} className={chip(flavour === f)} data-testid={`button-flavour-${p.id}-${f}`}>{f}</button>
            ))}
          </div>
        )}
      </div>
      <div className="mt-7 flex items-center justify-between gap-3 border-t border-[#1C2E3B]/15 pt-6">
        <div className="flex items-center border border-[#1C2E3B]/30">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3" aria-label="Decrease" data-testid={`button-qty-dec-${p.id}`}><Minus className="h-3.5 w-3.5" /></button>
          <span className="w-6 text-center text-sm tabular-nums" data-testid={`text-qty-${p.id}`}>{qty}</span>
          <button onClick={() => setQty((q) => Math.min(50, q + 1))} className="p-3" aria-label="Increase" data-testid={`button-qty-inc-${p.id}`}><Plus className="h-3.5 w-3.5" /></button>
        </div>
        <button onClick={onAdd} className={`brun-btn !h-[48px] !min-w-0 flex-1 !px-3 sm:!min-w-[150px] sm:flex-none !text-[13px] ${added ? "" : "brun-btn-terra"}`} data-testid={`button-add-${p.id}`}>
          {added ? "Added" : `Add · ${rupee(variant.price * qty)}`}
        </button>
      </div>
    </article>
  );
}

function Custom() {
  const [f, setF] = useState({ name: "", occasion: "", date: "", size: "", idea: "" });
  const [err, setErr] = useState("");
  const up = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.idea.trim()) return setErr("Please add your name and a few words about the cake.");
    setErr("");
    const msg = [
      "Hello Saima Bakery! I'd like to enquire about a custom cake.",
      "",
      `Name: ${f.name}`,
      f.occasion && `Occasion: ${f.occasion}`,
      f.date && `Date needed: ${f.date}`,
      f.size && `Size / servings: ${f.size}`,
      `Idea: ${f.idea}`,
      "",
      "I understand this is an enquiry pending your confirmation, and delivery is charged extra.",
    ]
      .filter((x): x is string => typeof x === "string")
      .join("\n");
    window.open(`${WA}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  const field = "mt-1 w-full border-b border-[#1C2E3B]/40 bg-transparent py-3 outline-none focus:border-[#CA8263]";
  const label = "text-[13px] uppercase";
  const minDate = new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10);
  return (
    <section id="custom" className="grid gap-12 px-5 py-20 md:grid-cols-2 md:gap-[8%] md:px-[60px] md:py-[140px]">
      <div>
        <h2 className={H2}>Have a Cake<br />in Your Head?</h2>
        <p className="mt-6 max-w-[460px]">A theme, a colour, a name piped on top, a flavour that is not on the list. Tell us and we will reply on WhatsApp with what is possible.</p>
        <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4">
          {GALLERY.map((g) => (
            <a key={g.id} href={IGP(g.id)} target="_blank" rel="noreferrer" className="block overflow-hidden" data-testid={`link-custom-ig-${g.id}`}>
              <img src={ig(g.id)} alt={g.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-opacity duration-[400ms] hover:opacity-90" />
            </a>
          ))}
        </div>
        <p className="mt-3 text-[12px] opacity-75">Custom design inspiration from @saimabakerypune. Designs shown are custom creations; pricing confirmed separately.</p>
      </div>
      <form onSubmit={send} className="grid gap-6 self-start md:grid-cols-2" data-testid="form-custom">
        <label className="md:col-span-2"><span className={label}>Your name *</span><input className={field} value={f.name} onChange={up("name")} placeholder="Who's ordering" data-testid="input-custom-name" /></label>
        <label><span className={label}>Occasion</span><input className={field} value={f.occasion} onChange={up("occasion")} placeholder="Birthday, anniversary..." data-testid="input-custom-occasion" /></label>
        <label><span className={label}>Date needed</span><input type="date" min={minDate} className={field} value={f.date} onChange={up("date")} data-testid="input-custom-date" /></label>
        <label className="md:col-span-2"><span className={label}>Size or servings</span><input className={field} value={f.size} onChange={up("size")} placeholder="e.g. 1kg, about 12 people" data-testid="input-custom-size" /></label>
        <label className="md:col-span-2"><span className={label}>Your idea *</span><textarea rows={4} className={`${field} resize-none`} value={f.idea} onChange={up("idea")} placeholder="Flavour, design, message on the cake..." data-testid="input-custom-idea" /></label>
        {err && <p className="text-sm text-[#b4482a] md:col-span-2" role="alert" data-testid="text-custom-error">{err}</p>}
        <div className="md:col-span-2">
          <button type="submit" className="brun-btn gap-2" data-testid="button-custom-send"><SiWhatsapp /> Send Enquiry</button>
          <p className="mt-4 text-[13px] opacity-75">Please allow at least 2 days. Pending bakery confirmation; delivery extra.</p>
        </div>
      </form>
    </section>
  );
}

export default function MenuPage() {
  const { setOpen, count } = useBasket();
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const shown = useMemo(() => (cat === "all" ? categories : categories.filter((c) => c.id === cat)), [cat]);
  return (
    <Shell>
      <section className="bg-[#1C2E3B] px-5 pb-16 pt-10 text-[#FFFDF9] md:px-[60px] md:pb-[100px] md:pt-[57px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-[5%]">
          <div className="flex flex-col lg:col-span-5">
            <p className="text-[13px] uppercase tracking-[.12em] opacity-80">NIBM Road, Pune · 100% vegan &amp; eggless</p>
            <h1 className="brun-h mt-6 text-[52px] leading-[1.15] md:text-[88px] md:leading-[1.08]">Our Menu</h1>
            <p className="mt-8 max-w-[460px]">Everything here is 100% vegan and eggless. Add things to your basket and send it to us on WhatsApp. It is an enquiry, not a payment: we confirm availability, final price and delivery charges with you.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#browse" className="brun-btn brun-btn-light" data-testid="link-browse-menu">Browse the menu</a>
              <a href="#custom" className="brun-link self-center text-[15px] uppercase underline underline-offset-4 hover:text-[#CA8263]" data-testid="link-hero-custom">Custom cakes</a>
            </div>
          </div>
          <div className="grid grid-cols-5 items-end gap-4 lg:col-span-7 md:gap-6">
            <IgFigure id="Cb9af7cpbv9" alt="Blue tiered cake with roses, from @saimabakerypune" className="col-span-3" testId="link-hero-ig-tier" />
            <IgFigure id="DR67JHRiioV" alt="Glossy blue heart-shaped vegan cake, from @saimabakerypune" className="col-span-2 mb-10 md:mb-24" testId="link-hero-ig-heart" />
            <p className="col-span-5 text-[13px] opacity-75">From our Instagram. Designs shown are custom creations; pricing confirmed separately.</p>
          </div>
        </div>
      </section>
      <section id="browse" className="px-5 py-16 md:px-[60px] md:py-[100px]">
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap" role="group" aria-label="Filter menu">
            {[{ id: "all" as const, name: "Everything" }, ...categories].map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={`${chip(cat === c.id)} whitespace-nowrap uppercase`} data-testid={`button-filter-${c.id}`}>
                {c.name} <span className="ml-1 opacity-60 tabular-nums">{c.id === "all" ? products.length : stats(c.id).n}</span>
              </button>
            ))}
          </div>
        </div>
        {shown.map((c, i) => {
          const st = stats(c.id);
          const ph = CAT_PHOTO[c.id];
          return (
            <div key={c.id} className="mt-16 md:mt-24" data-testid={`section-category-${c.id}`}>
              <div className={`grid gap-8 border-t border-[#1C2E3B] pt-8 ${ph ? "md:grid-cols-12 md:items-end" : ""}`}>
                <div className={ph ? (i % 2 ? "md:order-2 md:col-span-7" : "md:col-span-7") : ""}>
                  <p className="text-[13px] uppercase tracking-[.12em] opacity-70">{String(categories.indexOf(c) + 1).padStart(2, "0")} · {st.n} item{st.n === 1 ? "" : "s"} · from {rupee(st.from)}</p>
                  <h2 className={`${H2} mt-3`}>{c.name}</h2>
                  <p className="mt-2 max-w-[440px]">{c.line}</p>
                </div>
                {ph && <img src={img(ph.src)} alt={ph.alt} loading="lazy" className={`aspect-[16/10] w-full object-cover md:col-span-5 ${i % 2 ? "md:order-1" : ""}`} />}
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {products.filter((p) => p.category === c.id).map((p) => <ProductRow key={p.id} p={p} />)}
              </div>
            </div>
          );
        })}
        <p className="mt-14 text-[13px]">Prices as listed by the bakery. Delivery charges are extra and confirmed on WhatsApp.</p>
      </section>
      <section id="order" className="grid items-center gap-10 bg-[#F4EEE6] px-5 py-20 md:grid-cols-2 md:gap-[8%] md:px-[60px] md:py-[120px]">
        <div>
          <h2 className={H2}>Order Online</h2>
          <ol className="mt-6 space-y-3">
            <li>1. Fill your basket with sizes, flavours and quantities.</li>
            <li>2. Send it on WhatsApp as a ready-written message.</li>
            <li>3. We confirm availability, final price and delivery charges.</li>
            <li>4. Pickup from NIBM Road, or delivery anywhere in Pune by Porter / Uber.</li>
          </ol>
          <p className="mt-6">Order two days in advance. Google Pay and Paytm accepted once confirmed.</p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-self-end">
          <button onClick={() => setOpen(true)} className="brun-btn brun-btn-terra" data-testid="button-order-basket">Review Basket ({count})</button>
          <a href={`tel:${PHONE}`} className="brun-btn gap-2" data-testid="link-order-call"><Phone className="h-4 w-4" strokeWidth={1.25} /> 98900 28606</a>
        </div>
      </section>
      <Custom />
    </Shell>
  );
}
