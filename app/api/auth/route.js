import { NextResponse } from 'next/server';
import { checkCredentials, getSessionCookie, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  const { username, password } = await request.json();

  if (!(await checkCredentials(username, password))) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }

  const cookie = getSessionCookie();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}