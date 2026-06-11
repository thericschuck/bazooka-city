import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontakt | Bazooka City',
  description: 'Nimm Kontakt mit Bazooka City auf.',
};

export default function KontaktPage() {
  return (
    <main>
      {/* Page header */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
            <Image
              src="/Kleineslogo_Homepage.jpg"
              alt="Bazooka City Logo"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-white/60 text-xs tracking-[0.5em] uppercase mb-2">
              Schreib uns
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Kontakt
            </h1>
            <p className="text-white/70 mt-3 text-sm leading-relaxed">
              Fragen, Kooperationen oder Feedback — wir freuen uns über deine Nachricht.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {/* E-Mail */}
          <div className="bg-card border border-border p-6">
            <div className="w-10 h-10 bg-brand-blue/10 rounded flex items-center justify-center mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-brand-blue"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-foreground tracking-widest uppercase mb-2">
              E-Mail
            </h2>
            <a
              href="mailto:info@bazooka-city.de"
              className="text-brand-blue text-sm hover:underline"
            >
              info@bazooka-city.de
            </a>
          </div>

          {/* Instagram */}
          <div className="bg-card border border-border p-6">
            <div className="w-10 h-10 bg-brand-blue/10 rounded flex items-center justify-center mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-brand-blue"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-foreground tracking-widest uppercase mb-2">
              Instagram
            </h2>
            <a
              href="https://www.instagram.com/bazooka.city"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue text-sm hover:underline"
            >
              @bazooka.city
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-12" />

        {/* CTA back to shop */}
        <div className="text-center">
          <p className="text-brand-grey text-sm mb-6">
            Direkt zur Kollektion?
          </p>
          <Link
            href="/shop"
            className="inline-block bg-brand-blue text-white px-8 py-3 text-xs font-bold tracking-[0.25em] uppercase hover:bg-brand-blue-dark transition-colors"
          >
            Zum Shop
          </Link>
        </div>
      </section>
    </main>
  );
}
