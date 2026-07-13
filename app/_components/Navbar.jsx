"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import LogoLink from "./LogoLink";
import Navlink from "./Navlink";
import MobileNav from "./MobileNav";

function Navbar() {
  const [responsive, setResponsive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isNavigating = useRef(false);
  const pathname = usePathname();

  // reset on every new page
  useEffect(() => {
    isNavigating.current = false;
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigating.current) return; // pause during navigation

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
        setResponsive(false);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="nav-container"
    >
      <div className="site-nav">
        <LogoLink />
        <Navlink />
        <MobileNav />
      </div>
    </motion.header>
  );
}

export default Navbar;
