import Link from 'next/link';
import Image from 'next/image';
import CartIcon from './CartIcon';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-blue shadow-md">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 grid items-center"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Left: Story + Shop */}
        <div className="flex items-center gap-10">
          <Link
            href="/story"
            className="text-white hover:text-white/80 text-sm font-bold tracking-[0.18em] uppercase transition-colors"
          >
            Story
          </Link>
          <Link
            href="/shop"
            className="text-white hover:text-white/80 text-sm font-bold tracking-[0.18em] uppercase transition-colors"
          >
            Shop
          </Link>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/Kleineslogo_Homepage.jpg"
            alt="Bazooka City"
            width={300}
            height={199}
            style={{ height: '62px', width: 'auto' }}
            className="object-contain"
            priority
          />
        </Link>

        {/* Right: Kontakt + Cart */}
        <div className="flex items-center justify-end gap-10">
          <Link
            href="/kontakt"
            className="text-white hover:text-white/80 text-sm font-bold tracking-[0.18em] uppercase transition-colors"
          >
            Kontakt
          </Link>
          <CartIcon />
        </div>
      </nav>
    </header>
  );
}
