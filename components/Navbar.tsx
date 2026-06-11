import Link from 'next/link';
import Image from 'next/image';
import CartIcon from './CartIcon';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-blue shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-11.5 h-11.5 rounded-full overflow-hidden">
            <Image
              src="/Kleineslogo_Homepage.jpg"
              alt="Bazooka City"
              fill
              sizes="46px"
              className="object-cover"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/story"
            className="text-white/75 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors"
          >
            Story
          </Link>
          <Link
            href="/shop"
            className="text-white/75 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/kontakt"
            className="text-white/75 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors"
          >
            Kontakt
          </Link>
        </div>

        <CartIcon />
      </nav>
    </header>
  );
}
