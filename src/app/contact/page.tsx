"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("submitted");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <section className="menu-hero">
        <p className="eyebrow">Contact</p>
        <h1 className="menu-heading">Let&apos;s get you on the smoker&apos;s schedule.</h1>
        <p className="menu-lede">
          Send the headcount, what you&apos;re picturing, and whether you want
          pickup or delivery — quotes usually go out within a day or two.
        </p>
      </section>

      <section className="section">
        <div className="section-inner contact-grid">
          <form onSubmit={handleSubmit} className="contact-form">
            <label className="field">
              <span className="field-label">Name</span>
              <input type="text" name="name" required className="field-input" />
            </label>

            <label className="field">
              <span className="field-label">Email</span>
              <input type="email" name="email" required className="field-input" />
            </label>

            <div className="field-row">
              <label className="field">
                <span className="field-label">Pickup or delivery date</span>
                <input type="date" name="event_date" className="field-input" />
              </label>
              <label className="field">
                <span className="field-label">Headcount</span>
                <input type="number" name="headcount" min="1" className="field-input" />
              </label>
            </div>

            <label className="field">
              <span className="field-label">Pickup or delivery?</span>
              <select name="fulfillment" className="field-input">
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery (extra cost)</option>
              </select>
            </label>

            <label className="field">
              <span className="field-label">What are you picturing?</span>
              <textarea name="message" rows={5} className="field-input" />
            </label>

            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            <button type="submit" className="btn-primary contact-submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Inquiry"}
            </button>

            {status === "submitted" && (
              <p className="contact-status">Thanks — we'll get back to you within a day or two.</p>
            )}

            {status === "error" && (
              <p className="contact-status contact-status-error">
                Something went wrong. Try again, or reach out on Instagram instead.
              </p>
            )}
          </form>

          <div className="contact-side">
            <div className="contact-card">
              <p className="eyebrow">Prefer Instagram?</p>
              <p className="contact-card-copy">
                DMs are checked daily —{" "}
                <a
                  href="https://instagram.com/backyard.cook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-link"
                >
                  @backyard.cook
                </a>
              </p>
            </div>
            <div className="contact-card">
              <p className="eyebrow">Service Area</p>
              <p className="contact-card-copy">
                Bakersfield and surrounding Kern County. Delivery is available
                for an additional cost based on distance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}