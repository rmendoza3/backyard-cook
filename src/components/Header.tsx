"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link href="/" className="brand-logo-link">
                    <Image
                        src="/images/BackyardCookLogoHorizontal.png"
                        alt="Backyard Cook — Wood-Fired BBQ, Bakersfield CA"
                        width={400}
                        height={200}
                        className="brand-logo-horizontal"
                        priority
                        sizes="(min-width: 768px) 200px, 165px"
                    />
                </Link>

                <nav className="nav-links">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link href="/contact" className="nav-cta">
                    Order Now
                </Link>

                <button
                    className="nav-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    ☰
                </button>
            </div>

            {isOpen && (
                <nav className="nav-links-mobile">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}