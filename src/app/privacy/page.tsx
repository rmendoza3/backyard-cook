import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Backyard Cook collects, uses, and stores your information.",
};

export default function Privacy() {
  return (
    <main>
      <section className="menu-hero">
        <p className="eyebrow">Privacy Policy</p>
        <h1 className="menu-heading">How we handle your information.</h1>
        <p className="menu-lede">Last updated: July 2026</p>
      </section>

      <section className="section">
        <div className="section-inner privacy-content">

          <div className="privacy-block">
            <h2 className="section-heading privacy-heading">What we collect</h2>
            <p className="why-us-copy">
              When you reach out through our contact form, we collect your name, email
              address, and whatever details you share about your order (date, headcount,
              pickup or delivery preference, and your message).
            </p>
            <p className="why-us-copy about-paragraph-spacing">
              When you use our chat assistant, we store the messages you send and the
              assistant&apos;s replies, along with a session identifier tied to that
              conversation. If you share your name, contact information, or order details
              in the chat, that becomes part of the stored conversation too.
            </p>
          </div>

          <div className="privacy-block">
            <h2 className="section-heading privacy-heading">Why we collect it</h2>
            <p className="why-us-copy">
              We use this information to respond to your inquiry, quote and fulfill your
              order, and improve how our chat assistant answers questions. We review chat
              conversations from time to time to see what people are asking and make the
              assistant more helpful.
            </p>
          </div>

          <div className="privacy-block">
            <h2 className="section-heading privacy-heading">Who else sees it</h2>
            <p className="why-us-copy">
              We use third-party services to run this site and the chat assistant,
              including an email delivery provider to send inquiry notifications, an AI
              provider to generate chat responses, and a data storage provider to hold
              chat transcripts and rate-limiting data. These providers process data on our
              behalf and don&apos;t independently use it for their own purposes.
            </p>
            <p className="why-us-copy about-paragraph-spacing">
              We do not sell your information to anyone.
            </p>
          </div>

          <div className="privacy-block">
            <h2 className="section-heading privacy-heading">How long we keep it</h2>
            <p className="why-us-copy">
              Contact form submissions are kept as long as needed to fulfill your order
              and for our own records. Chat conversations are retained for a limited
              period so we can review and improve the assistant, and are deleted on a
              routine basis afterward.
            </p>
          </div>

          <div className="privacy-block">
            <h2 className="section-heading privacy-heading">Your choices</h2>
            <p className="why-us-copy">
              If you&apos;d like us to delete information you&apos;ve shared with us, or
              have questions about what we have on file, reach out through our{" "}
              <a href="/contact" className="menu-link">contact page</a> and we&apos;ll take
              care of it.
            </p>
          </div>

          <div className="privacy-block">
            <h2 className="section-heading privacy-heading">Changes to this policy</h2>
            <p className="why-us-copy">
              If how we handle information changes, we&apos;ll update this page.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}