import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'admin_session';

// Constant-time string comparison, so mismatches don't leak information
// via how long the comparison took.
function safeEqual(a, b) {
  const bufA = Buffer.from(a || '');
  const bufB = Buffer.from(b || '');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Derives a session token from the username + password + a secret.
// Changing either credential invalidates every existing session.
function getExpectedToken() {
  const secret = process.env.SESSION_SECRET || 'dev-secret-change-me';
  const material = `${process.env.ADMIN_USERNAME || ''}:${process.env.ADMIN_PASSWORD || ''}`;
  return createHmac('sha256', secret).update(material).digest('hex');
}

export async function checkCredentials(username, password) {
  const validUsername = safeEqual(username, process.env.ADMIN_USERNAME);
  const validPassword = safeEqual(password, process.env.ADMIN_PASSWORD);
  return validUsername && validPassword;
}

export function getSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: getExpectedToken(),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  };
}

export function isValidSessionToken(token) {
  if (!token) return false;
  return safeEqual(token, getExpectedToken());
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;