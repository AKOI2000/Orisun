'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// Wrapping Link lets the whole pill be both the hover trigger and the
// actual clickable link - one element, not two overlapping ones.
const MotionLink = motion.create(Link);




const EASE = [0.65, 0, 0.35, 1];

// The resting text sits in normal flow (y: 0%). On hover it slides fully
// up and out of the mask (y: -100%).
const primaryVariants = {
  rest: { y: '0%' },
  hover: { y: '-100%' },
};

// The hover text starts one full line below the mask (y: 100%, invisible)
// and slides up into view (y: 0%) as the primary text leaves.
const secondaryVariants = {
  rest: { y: '100%' },
  hover: { y: '0%' },
};

export default function AnimatedBtn({ href, primaryText, secondaryText, className }) {
  return (
    <MotionLink href={href} className={`btn-link ${className || ''}`} initial="rest" whileHover="hover" animate="rest">
      <span className="btn-link__mask">
        <motion.span
          className="btn-link__text btn-link__text--primary"
          variants={primaryVariants}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {primaryText}
        </motion.span>
        <motion.span
          className="btn-link__text btn-link__text--secondary"
          variants={secondaryVariants}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {secondaryText}
        </motion.span>
      </span>
    </MotionLink>
  );
}