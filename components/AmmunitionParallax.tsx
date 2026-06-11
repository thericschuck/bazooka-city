'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';

export default function AmmunitionParallax() {
  const { scrollY } = useScroll();

  // scrollY=0   → nearly hidden behind edges (only ~20px tip visible)
  // scrollY=1200 → majority visible (~145px of 170px)
  // Scrolling back up reverses the effect
  const leftX  = useTransform(scrollY, [0, 1200], [-150, -25]);
  const rightX = useTransform(scrollY, [0, 1200], [ 150,  25]);

  return (
    <>
      {/* Left ammunition */}
      <motion.div
        style={{ x: leftX }}
        className="hidden lg:block fixed left-0 top-[62%] -translate-y-1/2 pointer-events-none z-10"
        aria-hidden="true"
      >
        <Image
          src="/Image%20Left.png"
          alt=""
          width={170}
          height={255}
          className="object-contain opacity-80 drop-shadow-2xl"
        />
      </motion.div>

      {/* Right ammunition */}
      <motion.div
        style={{ x: rightX }}
        className="hidden lg:block fixed right-0 top-[62%] -translate-y-1/2 pointer-events-none z-10"
        aria-hidden="true"
      >
        <Image
          src="/Image%20Right.png"
          alt=""
          width={170}
          height={255}
          className="object-contain opacity-80 drop-shadow-2xl"
        />
      </motion.div>
    </>
  );
}
