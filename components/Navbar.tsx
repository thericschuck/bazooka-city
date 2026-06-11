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
            <Link href="/story" className="group relative text-white/75 hover:text-white text-sm font-bold tracking-[0.18em] uppercase transition-colors duration-200 pb-1">
              Story
              <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out" style={{ background: 'var(--bc-steel)' }} />
            </Link>
            <Link href="/shop" className="group relative text-white/75 hover:text-white text-sm font-bold tracking-[0.18em] uppercase transition-colors duration-200 pb-1">
              Shop
              <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out" style={{ background: 'var(--bc-steel)' }} />
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
            className="group relative hidden sm:block text-white/75 hover:text-white text-sm font-bold tracking-[0.18em] uppercase transition-colors duration-200 pb-1"
          >
            Kontakt
            <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out" style={{ background: 'var(--bc-steel)' }} />
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
              className="group flex items-center justify-between text-white/80 hover:text-white font-bold tracking-[0.2em] uppercase text-sm py-3 border-b border-white/10 last:border-0 transition-colors duration-200"
            >
              {label}
              <span
                className="text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                style={{ color: 'var(--bc-steel)' }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
