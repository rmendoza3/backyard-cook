import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="brand">
          Backyard <span className="brand-accent">Cook</span>
        </div>

        <div className="footer-links">
          <a href="https://instagram.com/backyard.cook" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <Link href="/contact">Contact</Link>
        </div>

        <p className="footer-note">Bakersfield, CA — Grill-for-hire &amp; catering</p>
      </div>
    </footer>
  );
}