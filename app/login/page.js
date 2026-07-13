'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return; // guard against double-submits

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    setIsSubmitting(true);

    let res;
    try {
      res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {
      toast.error('Could not reach the server. Try again.');
      setIsSubmitting(false);
      return;
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || 'Something went wrong.');
      setIsSubmitting(false);
      return;
    }

    // Success - leave isSubmitting as true. We're navigating away, so
    // there's nothing to reset back to, and no flicker of the button
    // re-enabling right before the page actually changes.
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit} className="admin-login__form">
        <h1>Admin login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          autoFocus
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoComplete="current-password"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Checking…' : 'Log in'}
        </button>
      </form>
    </div>
  );
}