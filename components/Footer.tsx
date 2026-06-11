import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a22' }}>

      <div className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Brand */}
            <div className="lg:col-span-2">
              <h3
                className="text-3xl font-black text-white uppercase tracking-tight mb-3"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Bazooka City
              </h3>
              <p className="text-sm leading-relaxed max-w-xs text-white/35">
                Built for those who never settle. High-performance streetwear designed for ultimate resilience.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-5 text-white/35">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/story" className="text-sm text-white/55 hover:text-white transition-colors">
                    Story
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-sm text-white/55 hover:text-white transition-colors">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-5 text-white/35">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/kontakt" className="text-sm text-white/55 hover:text-white transition-colors">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright bar — clean, no ghost text */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">
          © 2025 Bazooka City. Alle Rechte vorbehalten.
        </p>
      </div>

    </footer>
  );
}
