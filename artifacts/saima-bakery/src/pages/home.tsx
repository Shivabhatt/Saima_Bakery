import { Link } from "wouter";
import { img, SOURCE } from "@/data/menu";
import { Shell } from "@/components/site";

const H2 = "brun-h text-[34px] leading-[1.4] md:text-[44px] md:leading-[61.6px]";

function Hero() {
  return (
    <section className="relative bg-[#1C2E3B] text-[#FFFDF9]">
      <div className="relative px-5 pb-20 pt-10 md:px-[60px] lg:min-h-[1180px] lg:pt-[57px]">
        <div className="relative z-10 lg:max-w-[723px]">
          <h1 className="brun-h text-[44px] leading-[1.3] md:text-[64px] xl:text-[76px] xl:leading-[98.8px]">
            We Are Saima<br />Vegan &amp; Eggless<br />Bakery
          </h1>
          <p className="mt-8 text-[16px] leading-[23.2px] lg:mt-[40px]">
            NIBM Road, Pune<br />Order two days ahead &middot; +91 98900 28606
          </p>
        </div>
        <div className="mt-12 grid grid-cols-6 gap-4 lg:mt-0 lg:block">
          <figure className="col-span-6 aspect-[687/720] overflow-hidden lg:absolute lg:right-[5.85%] lg:top-[390px] lg:w-[53.7%]">
            <img src={img("chocolate-cake.jpg")} alt="A Saima vegan chocolate cake piped with music notes and red roses" className="h-full w-full object-cover" />
          </figure>
          <figure className="col-span-4 aspect-[416/498] overflow-hidden lg:absolute lg:left-[60px] lg:top-[538px] lg:w-[32.5%]">
            <img src={img("cupcake-hero.jpg")} alt="Saima vegan cupcakes with swirled frosting" className="h-full w-full object-cover" />
          </figure>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="grid items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-[8%] md:px-[60px] md:py-[140px]">
      <img src={img("layer-cake.jpg")} alt="A Saima vegan chocolate layer cake" className="aspect-[4/5] w-full object-cover" loading="lazy" />
      <div className="max-w-[460px]">
        <h2 className={H2}>Handcrafted Cakes,<br />Made Locally</h2>
        <p className="mt-6">
          Saima is a small neighbourhood bakery on NIBM Road in Pune. Every cake, cupcake, brownie and chocolate we make is 100% vegan and eggless: no eggs, no butter, no dairy cream.
        </p>
        <p className="mt-4">
          So the friend who is vegan, the aunt who avoids eggs and the birthday kid all get the same slice. Designs can be customised on request.
        </p>
        <Link href="/menu#custom" className="brun-btn mt-10" data-testid="link-story-custom">Custom Cakes</Link>
      </div>
    </section>
  );
}

function Things() {
  const cats = [
    { f: "chocolate-cake.jpg", t: "Celebration Cakes", c: "md:col-start-2 md:row-start-1" },
    { f: "cupcakes.jpg", t: "Cupcakes", c: "md:col-start-3 md:row-start-1 md:mt-[180px]" },
    { f: "layer-cake.jpg", t: "Chocolate Lovers", c: "md:col-start-2 md:row-start-2" },
    { f: "cupcake-hero.jpg", t: "Desserts & Bites", c: "md:col-start-3 md:row-start-2 md:mt-[180px]" },
  ];
  return (
    <section className="px-5 pb-20 md:px-[60px] md:pb-[140px]">
      <div className="grid gap-8 md:grid-cols-3 md:gap-x-[4%] md:gap-y-16">
        <div className="md:col-start-1 md:row-start-1 md:pr-6">
          <h2 className={H2}>Things We Bake</h2>
          <p className="mt-6">Fresh fruit cakes, chocolate cakes, classics like red velvet and butterscotch, cupcakes by the box, jar cakes, brownies and tea-time dry cakes. Twenty-two things in all.</p>
          <Link href="/menu" className="brun-btn mt-10" data-testid="link-see-menu">See Full Menu</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:contents">
          {cats.map((x) => (
            <Link key={x.t} href="/menu" className={`group block ${x.c}`} data-testid={`link-category-${x.t}`}>
              <img src={img(x.f)} alt={`Saima ${x.t}`} className="aspect-[3/4] w-full object-cover" loading="lazy" />
              <p className="brun-link mt-4 text-[15px] uppercase group-hover:text-[#CA8263]">{x.t}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Delivery() {
  return (
    <section className="grid items-center gap-12 px-5 pb-20 md:grid-cols-2 md:gap-[8%] md:px-[60px] md:pb-[140px]">
      <div className="max-w-[460px] md:justify-self-end">
        <h2 className={H2}>Pickup or Delivery<br />All Over Pune</h2>
        <p className="mt-6">
          Fill your basket, send it to us on WhatsApp, and we confirm availability, final price and delivery charges personally. Please order two days in advance. Delivery is by Porter / Uber, charged extra. Google Pay and Paytm accepted after confirmation.
        </p>
        <Link href="/menu#order" className="brun-btn brun-btn-terra mt-10" data-testid="link-order-online">Order Online</Link>
      </div>
      <img src={img("cupcakes.jpg")} alt="Saima vegan fruit-topped cupcakes" className="aspect-[4/5] w-full object-cover" loading="lazy" />
    </section>
  );
}

function Band() {
  return (
    <section className="relative">
      <img src={img("chocolate-cake.jpg")} alt="" className="h-[420px] w-full object-cover md:h-[640px]" loading="lazy" />
      <div className="absolute inset-0 grid place-items-center bg-[#1C2E3B]/45 px-5 text-center text-[#FFFDF9]">
        <div>
          <p className="brun-h text-[40px] leading-[1.3] md:text-[64px]">Nothing to check.<br />Every cake is vegan.</p>
          <Link href="/menu" className="brun-btn brun-btn-light mt-10" data-testid="link-band-menu">View Menu</Link>
        </div>
      </div>
    </section>
  );
}

function Facts() {
  const facts = [
    ["100% vegan & eggless", "No eggs, dairy or any animal product, across the whole menu."],
    ["2 days notice", "Every order needs at least two days so it can be baked fresh."],
    ["Confirmed on WhatsApp", "No online payment. The bakery confirms price and delivery with you."],
    ["Customisation available", "Themes, names piped on top and flavours off the list, on request."],
  ];
  return (
    <section className="px-5 py-20 md:px-[60px] md:py-[140px]">
      <h2 className={`${H2} max-w-[600px]`}>Good to Know</h2>
      <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([a, b]) => (
          <div key={a} className="border-t border-[#1C2E3B] pt-6">
            <dt className="text-[15px] uppercase">{a}</dt>
            <dd className="mt-3">{b}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Behind() {
  return (
    <section id="sneak-peek" className="px-5 pb-20 md:px-[60px] md:pb-[140px]">
      <div className="grid gap-8 md:grid-cols-[1fr_1.8fr] md:gap-[6%]">
        <div>
          <h2 className="brun-h text-[24px] leading-[1.4] md:text-[44px] md:leading-[61.6px]">Sneak Peek: Saima<br />Behind the Scenes</h2>
          <a href="#contact" className="brun-btn mt-9 !h-[42px] !min-w-0 !px-4 !text-[12px] md:mt-10 md:!h-[61px] md:!min-w-[174px] md:!text-[13px]" data-testid="link-behind-contact">Contact Saima</a>
        </div>
        <div className="grid grid-cols-[.8fr_1.15fr] items-start gap-2 md:gap-4">
          <img src={img("layer-cake.jpg")} alt="Saima chocolate layer cake" className="row-span-2 mt-[60%] aspect-[2/3] w-full object-cover" loading="lazy" />
          <img src={img("cupcake-hero.jpg")} alt="Saima frosted vegan cupcakes" className="aspect-[3/4] w-[78%] object-cover" loading="lazy" />
          <img src={img("cupcakes.jpg")} alt="Saima fruit cupcakes" className="aspect-[1.15/1] w-full object-cover" loading="lazy" />
        </div>
      </div>
      <p className="mt-6 text-[13px]">
        Photos of Saima Bakery cakes via{" "}
        <a href={SOURCE} target="_blank" rel="noreferrer" className="brun-link underline hover:text-[#CA8263]" data-testid="link-photo-source">Vegan First</a>.
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Story />
      <Things />
      <Delivery />
      <Band />
      <Facts />
      <Behind />
    </Shell>
  );
}
