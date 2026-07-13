"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/thoughts", label: "Thoughts" },
];

const EASE = [0.65, 0, 0.35, 1];

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: "100%", transition: { duration: 0.5, ease: EASE } },
  open: { opacity: 1, x: "0%", transition: { duration: 0.5, ease: EASE } },
};

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock background scroll while the overlay is open, and let Escape close it.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className={`mobile-nav__toggle ${isOpen ? "mobile-nav__toggle--open" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav__overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.href} variants={linkVariants}>
                <Link href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
