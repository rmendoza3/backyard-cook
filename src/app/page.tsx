import Image from "next/image";
import Link from "next/link";
import { Flame, Truck } from "lucide-react";

const services = [
  {
    icon: Flame,
    tag: "01 · Pickup",
    title: "Order ahead, swing by, grab it hot off the smoker.",
    copy: "Good for weeknight dinners, small gatherings, or anyone who just wants real barbecue without the four-hour cook.",
  },
  {
    icon: Truck,
    tag: "02 · Delivery & Catering",
    title: "Bigger crowd? We'll pack trays and bring it to you.",
    copy: "Sized to your headcount and delivered straight to the event — weddings, fundraisers, and league gatherings included.",
  },
];

const processSteps = [
  { time: "Day Before", title: "Trim", copy: "Fat cap squared up, silver skin off. This is where flavor gets decided before any heat touches the meat." },
  { time: "Day Before", title: "Rub", copy: "Simple, coarse, and generous. Salt and pepper do most of the work; everything else just supports it." },
  { time: "Cook Day", title: "Smoke", copy: "Held low and steady on the Traeger, hardwood pellets doing the work. Time depends on the cut — we go by temperature, not the clock." },
  { time: "Cook Day", title: "Rest", copy: "Wrapped and resting so the juice stays in the meat, not on the cutting board." },
  { time: "Pickup / Delivery", title: "Pack & Go", copy: "Sliced or held whole, packed hot and ready for pickup or delivery." },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero-section">
        <p className="eyebrow">Bakersfield, CA · Wood-Fired Smoking &amp; Grilling</p>
        <h1 className="hero-heading">Low and slow, ready when you are.</h1>
        <p className="hero-lede">
          Every order is smoked at home on the Traeger, then packed up for pickup
          or delivered straight to you — for birthdays, team dinners, fundraisers,
          and Saturdays that deserve better than a gas station brisket.
        </p>
        <div className="badge">
          <span className="badge-dot" />
          Cooked entirely on Traeger wood-fired grills
        </div>
        <div className="hero-actions">
          <a href="/contact" className="btn-primary">Order Now</a>
          <a href="/menu" className="btn-ghost">See the Menu</a>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">What We Do</p>
          <h2 className="section-heading">Two ways to eat well this weekend.</h2>

          <div className="services-grid">
            {services.map((service) => (
              <a href="/menu" key={service.tag} className="service-card">
                <service.icon className="service-icon" strokeWidth={1.5} />
                <p className="eyebrow">{service.tag}</p>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-copy">{service.copy}</p>
                <span className="service-link">See the menu →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">The Process</p>
          <h2 className="section-heading">Every cook follows the same steps — just not the same clock.</h2>

          <div className="timeline">
            {processSteps.map((step) => (
              <div key={step.title} className="timeline-step">
                <p className="eyebrow timeline-time">{step.time}</p>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-copy">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section">
        <div className="section-inner why-us">
          <div>
            <p className="eyebrow">Who&apos;s Cooking</p>
            <h2 className="section-heading">A Bakersfield local, not a franchise.</h2>
            <p className="why-us-copy">
              This is a small, hands-on operation — one Traeger, one cook, and a lot
              of care about doing it right. If you&apos;ve seen us around town, it&apos;s
              probably at a youth league fundraiser, not a food truck lot.
            </p>
            <p className="why-us-note">
              Every order runs on Traeger equipment — the same wood-fired
              consistency every time, whether it&apos;s a pickup for two or a
              delivery for seventy-five.
            </p>
          </div>
          <div className="photo-frame">
            <Image
              src="/images/Reuben-TraegerDay.jpg"
              alt="Backyard Cook preparing a Traeger order of brisket and pulled chicken"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <h2 className="section-heading">Got an order in mind? Let&apos;s get you on the smoker's schedule.</h2>
        <Link href="/contact" className="btn-primary">Order Now</Link>
      </section>

      <p style={{ position: "fixed", bottom: 0, left: 0, background: "black", color: "white", padding: "4px", fontSize: "10px", zIndex: 9999 }}>
        DEBUG: {process.env.NEXT_PUBLIC_BOT_API_URL || "FALLBACK IS ACTIVE"}
      </p>
    </main>
  );
}