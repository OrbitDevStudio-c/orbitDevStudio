const RATE_WINDOW_MS = 5 * 60_000;

// Best-effort only: serverless instances don't share memory.
const hits = new Map();

export const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

/** Returns an error Response when the request is cross-origin or over the rate limit, otherwise null. */
export function guard(request, { bucket, limit }) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json(403, { error: 'Forbidden' });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();

  if (recent.length > limit) {
    return json(429, { error: 'Too many requests. Please wait a few minutes.' });
  }
  return null;
}
