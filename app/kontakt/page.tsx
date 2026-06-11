import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';


export const metadata: Metadata = {
  title: 'Kontakt | Bazooka City',
  description: 'Nimm Kontakt mit Bazooka City auf.',
};

export default function KontaktPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0)), url(/concrete.jpg)',
        backgroundSize: 'auto, cover',
        backgroundAttachment: 'local, fixed',
        backgroundPosition: 'center',
      }}
    >

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-700">Kontakt</span>
          </nav>
        </div>

        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-2">Schreib uns</p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
            Kontakt
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Fragen, Kooperationen oder Feedback — wir freuen uns über deine Nachricht.
          </p>
        </div>
      </div>


      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">

          {/* E-Mail */}
          <div className="bg-white border border-gray-200 p-6">
            <div
              className="w-10 h-10 rounded flex items-center justify-center mb-4"
              style={{ background: 'rgba(80,109,141,0.1)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--bc-steel)' }}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </div>
            <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">
              E-Mail
            </h2>
            <a href="mailto:info@bazooka-city.de"
              className="text-sm hover:underline"
              style={{ color: 'var(--bc-steel)' }}>
              info@bazooka-city.de
            </a>
          </div>

          {/* Instagram */}
          <div className="bg-white border border-gray-200 p-6">
            <div
              className="w-10 h-10 rounded flex items-center justify-center mb-4"
              style={{ background: 'rgba(80,109,141,0.1)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--bc-steel)' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">
              Instagram
            </h2>
            <a href="https://www.instagram.com/bazooka.city"
              target="_blank" rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: 'var(--bc-steel)' }}>
              @bazooka.city
            </a>
          </div>
        </div>

        {/* Contact form */}
        <ContactForm />

        <div className="border-t border-gray-900 mt-10 mb-10" />

        <div className="text-center">
          <p className="text-gray-900 text-sm mb-5">Direkt zur Kollektion?</p>
          <Link
            href="/shop"
            className="inline-block text-white text-xs font-bold tracking-[0.25em] uppercase px-8 py-3 hover:opacity-90 transition-opacity"
            style={{ background: 'var(--bc-steel)' }}
          >
            Zum Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
