"use client";

import { useState } from "react";
import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
};

export default function MobileMenu({
  links,
}: {
  links: NavLink[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {isOpen && (
        <nav className="nav-links-mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}