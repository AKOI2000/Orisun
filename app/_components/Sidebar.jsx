'use client';

import Link from 'next/link';
import { useDashboard } from '@/app/_context/DashboardContext';
import LogoutButton from './LogoutButton';

export default function Sidebar({ pendingCommentCount = 0 }) {
  const { sidebarOpen, closeSidebar } = useDashboard();

  return (
    <>
      <aside className={`admin-shell__sidebar ${sidebarOpen ? 'admin-shell__sidebar--open' : ''}`}>
        <nav className="admin-shell__nav">
          <Link href="/admin" onClick={closeSidebar}>
            Posts
          </Link>
          <Link href="/admin/comments" onClick={closeSidebar}>
            Comments
            {pendingCommentCount > 0 && (
              <span className="admin-shell__badge">{pendingCommentCount}</span>
            )}
          </Link>
        </nav>
        <LogoutButton />
      </aside>

      {sidebarOpen && <div className="admin-shell__overlay" onClick={closeSidebar} />}
    </>
  );
}