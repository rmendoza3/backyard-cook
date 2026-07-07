import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Backyard Cook",
  description: "The story behind Backyard Cook, Bakersfield, CA.",
};

const values = [
  { title: "Real technique", copy: "Low and slow on the Traeger, actual wood smoke, no shortcuts to hit a deadline." },
  { title: "Straight answers", copy: "If a headcount or budget won't work, you'll hear that up front — not after a deposit." },
  { title: "Local first", copy: "Built around Bakersfield orders, from small pickups to bigger deliveries." },
];

export default function About() {
  return (
    <main>
      <section className="about-hero">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="menu-heading">Started with one grill and a lot of practice.</h1>
          <p className="hero-lede about-lede">
            Backyard Cook is a one-person operation based in Bakersfield, running
            entirely on Traeger wood-fired grills. No franchise, no corporate
            menu — just someone who got good enough at cooking for friends and
            family that people started asking to pay for it.
          </p>
        </div>
        <div className="photo-frame">
          <Image
            src="/images/ReubenPosing.jpg"
            alt="Backyard Cook preparing a Traeger order of brisket and pulled chicken"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-inner about-story">
          <p className="eyebrow">The Short Version</p>
          <h2 className="section-heading">Bakersfield, through and through.</h2>
          <p className="why-us-copy">
            Outside of the smoker, most weekends are spent on a sideline or in a
            gym — coaching youth soccer and baseball, and helping run things
            behind the scenes with the local league. That&apos;s where a lot of
            the first orders came from: teams and families who&apos;d already
            tasted the cooking at a potluck or a fundraiser.
          </p>
          <p className="why-us-copy about-paragraph-spacing">
            The approach hasn&apos;t changed since. Every order gets the same
            attention a backyard cookout would — good cuts, real technique, and
            someone who&apos;s actually standing at the grill.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">What Guides the Cook</p>
          <h2 className="section-heading">A few things that don&apos;t change.</h2>

          <div className="addon-grid">
            {values.map((value) => (
              <div key={value.title} className="value-card">
                <h3 className="addon-title">{value.title}</h3>
                <p className="addon-copy">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <h2 className="section-heading">Want to talk through your order?</h2>
        <a href="/contact" className="btn-primary">Get in Touch</a>
      </section>
    </main>
  );
}