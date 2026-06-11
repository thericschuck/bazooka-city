'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartIcon from './CartIcon';

const links = [
  { href: '/story', label: 'Story' },
  { href: '/shop', label: 'Shop' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-blue shadow-md">
      {/* Main bar */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 grid items-center"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Left: desktop links / mobile hamburger */}
        <div className="flex items-center">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden flex flex-col justify-center gap-1.5 w-10 h-10 focus:outline-none"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          >
            <span className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-8 lg:gap-10">
            <Link href="/story" className="text-white hover:text-white/80 text-sm font-bold tracking-[0.18em] uppercase transition-colors">
              Story
            </Link>
            <Link href="/shop" className="text-white hover:text-white/80 text-sm font-bold tracking-[0.18em] uppercase transition-colors">
              Shop
            </Link>
          </div>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="flex items-center justify-center" onClick={() => setOpen(false)}>
          <Image
            src="/Kleineslogo_Homepage.jpg"
            alt="Bazooka City"
            width={300}
            height={199}
            style={{ height: '52px', width: 'auto' }}
            className="object-contain sm:h-15.5"
            priority
          />
        </Link>

        {/* Right: Kontakt (desktop) + Cart */}
        <div className="flex items-center justify-end gap-6 lg:gap-10">
          <Link
            href="/kontakt"
            className="hidden sm:block text-white hover:text-white/80 text-sm font-bold tracking-[0.18em] uppercase transition-colors"
          >
            Kontakt
          </Link>
          <CartIcon />
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-64' : 'max-h-0'}`}
        style={{ borderTop: open ? '1px solid rgba(255,255,255,0.12)' : 'none' }}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-white/90 hover:text-white font-bold tracking-[0.2em] uppercase text-sm py-3 border-b border-white/10 last:border-0 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
