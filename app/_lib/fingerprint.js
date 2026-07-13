import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';

const COOKIE_NAME = 'visitor_id';

// Safe to call from a Server Component during render - read-only.
export async function readFingerprint() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || null;
}

// Only call this from a Server Action or Route Handler - Next.js
// throws if cookies().set() runs during a plain page render.
export async function getOrCreateFingerprint() {
  const cookieStore = await cookies();
  let id = cookieStore.get(COOKIE_NAME)?.value;

  if (!id) {
    id = nanoid();
    cookieStore.set(COOKIE_NAME, id, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return id;
}