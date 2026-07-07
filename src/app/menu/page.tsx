import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Menu & Services | Backyard Cook",
  description: "Pickup and delivery BBQ packages from Backyard Cook, smoked on Traeger in Bakersfield, CA.",
};

const pricingNotes = [
  {
    title: "Priced Per Person",
    copy: "Every order is quoted per person. Tell us your headcount and we'll take care of quantities.",
  },
  {
    title: "One Headcount, Full Order",
    copy: "Your headcount applies across the whole order — protein and sides are portioned to match, so you don't have to do the math.",
  },
  {
    title: "Fully A La Carte",
    copy: "Mix and match proteins and sides — pick what you want, we'll size it to your group.",
  },
];

const proteinGroups = [
  { animal: "Cow", items: ["Tri-Tip", "Beef Ribs", "Brisket", "Burnt Ends (Brisket)", "Sausage"] },
  { animal: "Pig", items: ["Baby Back Ribs", "Spare Ribs", "Pulled Pork", "Pork Belly", "Burnt Ends (Pork Belly)", "Sausage"] },
  { animal: "Poultry", items: ["Whole Chicken", "Chicken Breasts", "Chicken Thighs", "Chicken Legs", "Chicken Wings", "Turkey Breast", "Turkey Legs", "Sausage"] },
  { animal: "Fish", items: ["Salmon"] },
];

const curedItems = [
  { name: "Pastrami", note: "Cured, then smoked — house method, takes longer than a same-day order." },
  { name: "Roast Beef", note: "Cured before roasting, not a quick-turnaround item." },
  { name: "Bacon", note: "Cured from scratch and smoked, not a store-bought slab." },
  { name: "Smoked Salmon (Lox)", note: "Cured and cold-smoked the traditional way." },
];

const sides = [
  "Brussels Sprouts with Bacon & Honey Balsamic Glaze",
  "Baked Potatoes",
  "Baby Potatoes",
  "Roasted Vegetables",
  "Asparagus",
  "Smoked Provolone",
  "Coleslaw",
  "Baked Beans",
  "Cornbread",
];

const flavorPoints = [
  { title: "Your Flavor Profile", copy: "We'll talk through what you're picturing — sweet, spicy, vinegar-forward, or somewhere in between — before the cook." },
  { title: "Seasonings", copy: "Built around the profile we land on — some house blends, some trusted picks." },
  { title: "Sauces", copy: "Chosen to match the profile we land on — some house-made, some trusted picks." },
];

export default function Menu() {
  return (
    <main>
      {/* HERO */}
      <section className="menu-hero">
        <p className="eyebrow">Menu &amp; Services</p>
        <h1 className="menu-heading">Order what you need. Nothing&apos;s bundled.</h1>
        <p className="menu-lede">
          Everything&apos;s a la carte and priced per person — pick your protein,
          pick your sides, and give us one headcount for the whole order. A full
          item list is coming soon; in the meantime, tell us what you&apos;re
          picturing on the <a href="/contact" className="menu-link">contact page</a> {" "}and
          we&apos;ll work out a per-person price together.
        </p>
        <div className="badge">
          <span className="badge-dot" />
          Smoked and grilled entirely on Traeger equipment
        </div>
      </section>

      {/* HOW PRICING WORKS */}
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">How Pricing Works</p>
          <h2 className="section-heading">Give us a headcount — we&apos;ll do the math.</h2>

          <div className="package-grid">
            {pricingNotes.map((note) => (
              <div key={note.title} className="package-card">
                <h3 className="package-name">{note.title}</h3>
                <p className="package-copy">{note.copy}</p>
              </div>
            ))}
          </div>

          <div className="example-order">
            <p className="eyebrow">For Example</p>
            <p className="example-order-text">
              &ldquo;Tri-tip and coleslaw for 40 people&rdquo; is all we need to build
              out a quote — one headcount covers the whole order.
            </p>
          </div>
        </div>
      </section>

      {/* MENU ITEMS */}
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">The Menu</p>
          <h2 className="section-heading">Pick what you want. We&apos;ll size it to your group.</h2>

          <p className="menu-subheading">Proteins</p>
          <div className="protein-grid">
            {proteinGroups.map((group) => (
              <div key={group.animal} className="menu-category-card">
                <h3 className="menu-category-title">{group.animal}</h3>
                <ul className="menu-category-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="menu-subheading menu-subheading-spaced">Cured &amp; Smoked</p>
          <p className="menu-lede-small">
            These take longer than our usual same-day cook — the earlier you ask, the better.
          </p>
          <div className="cured-grid">
            {curedItems.map((item) => (
              <div key={item.name} className="menu-category-card">
                <h3 className="menu-category-title">{item.name}</h3>
                <p className="cured-note">{item.note}</p>
              </div>
            ))}
          </div>

          <p className="menu-subheading menu-subheading-spaced">Sides &amp; Extras</p>
          <div className="menu-category-card">
            <ul className="menu-category-list menu-sides-list">
              {sides.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="menu-category-note">
            Don&apos;t see something you&apos;re craving? Ask — this list grows based on what people order.
          </p>
        </div>
      </section>

      {/* PICKUP & DELIVERY */}
      <section className="section">
        <div className="section-inner catering-grid">
          <div>
            <p className="eyebrow">Pickup &amp; Delivery</p>
            <h2 className="section-heading">Scheduled pickup, or delivery for a fee.</h2>
            <ul className="catering-list">
              <li>Pickup is scheduled ahead of time — no walk-ins, everything&apos;s cooked to order</li>
              <li>Delivery is available for an additional cost based on distance</li>
              <li>Let us know your preference when you reach out and we&apos;ll work out timing</li>
            </ul>
          </div>
          <div className="photo-frame">
            <Image
              src="/images/FoodReadyForPickUp.png"
              alt="Food packed and Ready for Pickup"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* FLAVOR PROFILE */}
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">Flavor</p>
          <h2 className="section-heading">We'll build the flavor profile together.</h2>

          <div className="addon-grid">
            {flavorPoints.map((point) => (
              <div key={point.title} className="addon-card">
                <h3 className="addon-title">{point.title}</h3>
                <p className="addon-copy">{point.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <h2 className="section-heading">One number to give us: headcount.</h2>
        <a href="/contact" className="btn-primary">Get a Quote</a>
      </section>
    </main>
  );
}