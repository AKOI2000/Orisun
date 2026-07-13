'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/login');
      router.refresh();
    } catch {
      toast.error('Could not log out. Try again.');
      setIsLoggingOut(false);
    }
  }

  return (
    <button type="button" onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Logging out…' : 'Log out'}
    </button>
  );
}