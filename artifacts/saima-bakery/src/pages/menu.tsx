import { useMemo, useState } from "react";
import { Minus, Plus, Phone, ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { categories, products, rupee, img, WA, PHONE, type CategoryId, type Product } from "@/data/menu";
import { useBasket } from "@/hooks/use-basket";
import { Shell } from "@/components/site";
import "./menu-mobile.css";

const IGP = (id: string) => `https://www.instagram.com/saimabakerypune/p/${id}/`;
const ig = (id: string) => img(`instagram/${id}.jpg`);
const CATEGORY_PHOTO: Record<CategoryId, { id: string; alt: string; position?: string }> = {
  fruit: { id: "DfHyxb3iqJs", alt: "Floral cake with butterflies from Saima Bakery", position: "center 55%" },
  chocolate: { id: "DgAaD_6Cpmc", alt: "Pink frosted cake from Saima Bakery", position: "center 50%" },
  classics: { id: "DfmrRTkiohP", alt: "Pale celebration cake with gold details from Saima Bakery", position: "center 55%" },
  desserts: { id: "DR67JHRiioV", alt: "Blue heart-shaped celebration cake from Saima Bakery", position: "center 60%" },
  dry: { id: "Cb9af7cpbv9", alt: "Blue tiered cake with fresh flowers from Saima Bakery", position: "center 50%" },
};
type Shot = { src: string; pos: string; tag: string };
const sh = (src: string, pos: string, tag = "Design inspiration"): Shot => ({ src, pos, tag });
const igd = (id: string) => img(`instagram/${id}-detail.jpg`);
const SHOTS: Record<string, Shot> = {
  strawberry: sh(ig("DgAaD_6Cpmc"), "50% 45%"),
  pineapple: sh(igd("DfmrRTkiohP"), "50% 40%"),
  mango: sh(ig("DfHyxb3iqJs"), "50% 60%"),
  orange: sh(igd("DfHyxb3iqJs"), "50% 50%"),
  "special-mix": sh(ig("Cb9af7cpbv9"), "50% 35%"),
  blueberry: sh(ig("DR67JHRiioV"), "50% 55%"),
  "dutch-truffle": sh(img("chocolate-cake.jpg"), "50% 50%", "Saima chocolate cake"),
  "choc-mousse": sh(img("chocolate-cake.jpg"), "30% 70%", "Saima chocolate cake"),
  "vegan-choc": sh(img("chocolate-cake.jpg"), "75% 30%", "Saima chocolate cake"),
  "red-velvet": sh(img("rose-ribbon-cake.png"), "50% 50%"),
  butterscotch: sh(img("gold-pearl-cake.png"), "40% 50%"),
  "cheese-cake": sh(igd("DgAaD_6Cpmc"), "50% 50%"),
  cupcakes: sh(img("cupcakes.jpg"), "50% 50%", "Saima cupcakes"),
  "rum-ball": sh(img("cupcakes.jpg"), "20% 70%", "Photo inspiration"),
  "almond-brownie": sh(img("chocolate-cake.jpg"), "20% 20%", "Photo inspiration"),
  "vegan-chocolates": sh(img("cupcakes.jpg"), "80% 30%", "Photo inspiration"),
  "apple-pie": sh(img("gold-pearl-cake.png"), "80% 70%", "Photo inspiration"),
  "jar-cakes": sh(igd("DR67JHRiioV"), "50% 50%", "Photo inspiration"),
  plum: sh(ig("DfmrRTkiohP"), "50% 70%", "Photo inspiration"),
  "sf-plum": sh(img("rose-ribbon-cake.png"), "20% 30%", "Photo inspiration"),
  "choc-tea": sh(img("chocolate-cake.jpg"), "60% 85%", "Photo inspiration"),
  "seeds-nuts": sh(ig("Cb9af7cpbv9"), "50% 80%", "Photo inspiration"),
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
    <article className="menu-product border-b border-[#1C2E3B]/20 py-5 first:border-t md:py-6" data-testid={`card-product-${p.id}`}>
      <figure className="mm-shot md:hidden" aria-hidden="true">
        <img src={SHOTS[p.id].src} alt="" loading="lazy" style={{ objectPosition: SHOTS[p.id].pos }} />
        <figcaption><b>{rupee(variant.price)}</b></figcaption>
      </figure>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="brun-h text-[23px] leading-tight md:text-[26px]">{p.name}{p.category === "dry" && <span className="ml-2 inline-block whitespace-nowrap text-[13px] font-normal opacity-65 md:hidden">500 grams</span>}</h3>
          {p.note && <p className={`mt-1 text-[13px] opacity-65 ${p.category === "dry" ? "hidden md:block" : ""}`}>{p.note}</p>}
        </div>
        <p className="brun-h shrink-0 text-[23px] tabular-nums md:text-[26px]" data-testid={`text-price-${p.id}`}>{rupee(variant.price)}</p>
      </div>
      <div className={`mt-4 space-y-3 ${p.category === "dry" ? "hidden md:block" : ""}`}>
        {p.variants.length > 1 && <p className="text-[10px] uppercase tracking-[.12em] opacity-60">Choose size or style</p>}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Size">
          {p.variants.map((x) => (
            <button key={x.id} onClick={() => setVid(x.id)} aria-pressed={vid === x.id} className={`border px-2.5 py-1.5 text-[11px] leading-tight transition-colors duration-[300ms] ${vid === x.id ? "border-[#1C2E3B] bg-[#1C2E3B] text-[#FFFDF9]" : "border-[#1C2E3B]/25 hover:border-[#1C2E3B]"}`} data-testid={`button-variant-${p.id}-${x.id}`}>
              {x.label} · {rupee(x.price)}
            </button>
          ))}
        </div>
        {p.flavours && (
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Flavour">
            <span className="mr-1 text-[10px] uppercase tracking-[.12em] opacity-60">Flavour</span>
            {p.flavours.map((f) => (
              <button key={f} onClick={() => setFlavour(f)} aria-pressed={flavour === f} className={`border px-2 py-1 text-[11px] transition-colors duration-[300ms] ${flavour === f ? "border-[#1C2E3B] bg-[#1C2E3B] text-[#FFFDF9]" : "border-[#1C2E3B]/25 hover:border-[#1C2E3B]"}`} data-testid={`button-flavour-${p.id}-${f}`}>{f}</button>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex h-9 items-center border border-[#1C2E3B]/25">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2" aria-label="Decrease" data-testid={`button-qty-dec-${p.id}`}><Minus className="h-3 w-3" /></button>
          <span className="w-6 text-center text-sm tabular-nums" data-testid={`text-qty-${p.id}`}>{qty}</span>
          <button onClick={() => setQty((q) => Math.min(50, q + 1))} className="p-2" aria-label="Increase" data-testid={`button-qty-inc-${p.id}`}><Plus className="h-3 w-3" /></button>
        </div>
        <button onClick={onAdd} className={`min-h-9 border px-3 text-[11px] uppercase tracking-[.06em] transition-colors duration-[300ms] ${added ? "border-[#1C2E3B] bg-[#1C2E3B] text-[#FFFDF9]" : "border-[#1C2E3B] hover:bg-[#1C2E3B] hover:text-[#FFFDF9]"}`} data-testid={`button-add-${p.id}`}>
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
        <div className="mt-10 overflow-hidden">
          <img src={img("rose-ribbon-cake.png")} alt="Saima celebration cake decorated with a red rose, white flowers and a red ribbon" loading="lazy" className="aspect-[4/3] w-full object-cover object-center" data-testid="img-custom-cake" />
        </div>
        <p className="mt-3 text-[12px] opacity-75">Custom cake inspiration from Saima Bakery. Design and pricing confirmed separately.</p>
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
      <div className="mobile-friendly-menu">
      <section className="relative overflow-hidden bg-[#F3EDE1] text-[#1C2E3B]" aria-labelledby="menu-title">
        <div className="grid lg:min-h-[min(780px,calc(100svh-97px))] lg:grid-cols-12">
          <div className="menu-cover-copy order-2 flex flex-col justify-center px-5 pb-12 pt-10 sm:px-8 md:px-[60px] lg:order-1 lg:col-span-5 lg:px-[5vw] lg:py-16">
            <p className="text-[11px] uppercase tracking-[.18em] text-[#7C6657]">Saima Bakery · Pune</p>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#CA8263]" />
              <span className="text-[11px] uppercase tracking-[.16em]">100% vegan &amp; eggless</span>
            </div>
            <h1 id="menu-title" className="brun-h mt-5 text-[60px] leading-[.98] sm:text-[76px] md:text-[88px] lg:text-[clamp(5rem,7.5vw,8.5rem)]">A little{" "}<br /><span className="text-[#B75B55]">more</span> sweet.</h1>
            <p className="mt-6 max-w-[390px] text-[15px] leading-7 text-[#1C2E3B]/80">Cakes to celebrate, little treats to share. Choose your favourites and send us an order enquiry.</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#browse" className="brun-btn brun-btn-terra !h-[52px]" data-testid="link-browse-menu">Explore the menu</a>
              <a href="#custom" className="brun-link text-[13px] uppercase tracking-[.08em] underline underline-offset-4 hover:text-[#B75B55]" data-testid="link-hero-custom">Custom cakes</a>
            </div>
          </div>
          <div className="menu-cover-photo group relative order-1 min-h-[54svh] overflow-hidden sm:min-h-[64svh] lg:order-2 lg:col-span-7 lg:min-h-[min(780px,calc(100svh-97px))]">
            <img src={img("gold-pearl-cake.png")} alt="Saima white layer cake with golden pearls and a slice showing the sponge and cream" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]" data-testid="img-menu-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#132631]/60 via-transparent to-[#132631]/5" />
            <span className="absolute bottom-5 left-5 text-[11px] uppercase tracking-[.12em] text-white sm:bottom-8 sm:left-8">From the Saima kitchen</span>
          </div>
        </div>
      </section>
      <section id="browse" className="bg-[#FBF8F1] px-5 py-16 md:px-[60px] md:py-[96px]">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[.16em] text-[#7C6657]">Made fresh in Pune</p>
            <h2 className="brun-h mt-3 text-[40px] leading-tight sm:text-[52px]">Find your favourite.</h2>
          </div>
          <p className="max-w-[360px] text-[14px] leading-6 text-[#1C2E3B]/75">Every bake is vegan and eggless. Scroll the menu, pick a size and add it to your enquiry basket.</p>
        </div>
        <div className="mm-rail md:hidden" role="group" aria-label="Browse categories by photo">
          {[{ id: "all" as const, name: "Everything" }, ...categories].map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id} data-testid={`button-mobile-cat-${c.id}`}>
              <img src={c.id === "all" ? img("gold-pearl-cake.png") : ig(CATEGORY_PHOTO[c.id].id)} alt="" style={{ objectPosition: c.id === "all" ? "center" : CATEGORY_PHOTO[c.id].position }} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
        <div className="-mx-5 mb-14 hidden overflow-x-auto border-y border-[#1C2E3B]/20 px-5 md:mx-0 md:mb-20 md:block md:px-0">
          <div className="flex w-max gap-7 md:w-auto md:flex-wrap md:gap-9" role="group" aria-label="Filter menu">
            {[{ id: "all" as const, name: "Everything" }, ...categories].map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={`relative py-4 text-[11px] uppercase tracking-[.1em] transition-colors duration-[300ms] ${cat === c.id ? "text-[#B75B55] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-[#B75B55]" : "text-[#1C2E3B]/65 hover:text-[#1C2E3B]"}`} data-testid={`button-filter-${c.id}`}>
                {c.name} <span className="ml-1 opacity-55 tabular-nums">{c.id === "all" ? products.length : stats(c.id).n}</span>
              </button>
            ))}
          </div>
        </div>
        {shown.map((c, i) => {
          const photo = CATEGORY_PHOTO[c.id];
          const reverse = i % 2 === 1;
          return (
              <div key={c.id} className="mb-16 last:mb-0 md:mb-24" data-testid={`section-category-${c.id}`}>
              <div className="-mx-5 grid overflow-hidden border-y border-[#1C2E3B]/15 md:-mx-[60px] md:min-h-[620px] md:grid-cols-12">
                <a href={IGP(photo.id)} target="_blank" rel="noreferrer" className={`menu-category-photo group relative block min-h-[390px] overflow-hidden md:col-span-5 md:min-h-full ${reverse ? "md:col-start-8" : ""}`} data-testid={`link-category-photo-${c.id}`}>
                  <img src={ig(photo.id)} alt={photo.alt} loading="lazy" style={{ objectPosition: photo.position }} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132631]/55 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[.14em] text-white sm:bottom-7 sm:left-7">Saima Bakery · Instagram <ArrowUpRight className="ml-1 inline h-3 w-3" /></span>
                </a>
                <div className={`flex flex-col justify-center px-5 py-9 sm:px-8 md:col-span-7 md:px-[6vw] md:py-12 ${reverse ? "md:col-start-1 md:row-start-1" : ""}`}>
                  <h2 className="brun-h mt-4 text-[39px] leading-[1.08] sm:text-[52px]">{c.name}</h2>
                  <p className="mt-3 max-w-[460px] text-[14px] leading-6 text-[#1C2E3B]/70">{c.line}</p>
                  <div className="mt-7">
                    {products.filter((p) => p.category === c.id).map((p) => <ProductRow key={p.id} p={p} />)}
                  </div>
                </div>
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
      {count > 0 && (
        <div className="menu-mobile-basket fixed inset-x-0 bottom-0 z-40 border-t border-[#1C2E3B]/15 bg-[#FFFDF9] px-4 pt-3 md:hidden">
          <button onClick={() => setOpen(true)} className="flex min-h-12 w-full items-center justify-between bg-[#1C2E3B] px-5 text-sm text-white" data-testid="button-mobile-review-basket">
            <span>Review your basket</span><span>{count} item{count === 1 ? "" : "s"} →</span>
          </button>
        </div>
      )}
      </div>
    </Shell>
  );
}
