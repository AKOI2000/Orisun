'use client';

import { useDashboard } from '@/app/_context/DashboardContext';
import { RxHamburgerMenu } from "react-icons/rx";

export default function DashboardHead() {
  const { toggleSidebar } = useDashboard();

  return (
    <header className="admin-shell__head">
      <button type="button" className="admin-shell__menu-btn" onClick={toggleSidebar} aria-label="Toggle menu">
        <RxHamburgerMenu />
      </button>
      <p className="admin-shell__head-brand">Admin</p>
    </header>
  );
}