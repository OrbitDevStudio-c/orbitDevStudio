type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
let initialized = false;

/** Loads GA4 only when VITE_GA_MEASUREMENT_ID is set; otherwise events are no-ops (logged in dev). */
export function initAnalytics() {
  if (initialized || !GA_ID) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js requires the Arguments object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
}

export function track(event: string, props: EventProps = {}) {
  if (import.meta.env.DEV) console.debug('[analytics]', event, props);
  window.gtag?.('event', event, props);
}

export function trackPageView(path: string) {
  track('page_view', { page_path: path, page_location: window.location.href, page_title: document.title });
}

/**
 * One delegated listener: mailto/tel links fire email_click/phone_click, and any element with
 * data-track="label" (optionally data-track-location="section") fires cta_click.
 */
export function installClickTracking() {
  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('a, button, [data-track]');
    if (!el) return;

    const href = el.getAttribute('href') ?? '';
    if (href.startsWith('mailto:')) track('email_click', { location: el.dataset.trackLocation ?? 'unknown' });
    else if (href.startsWith('tel:')) track('phone_click', { location: el.dataset.trackLocation ?? 'unknown' });

    const label = el.dataset.track;
    if (label) {
      track(label === 'book_call' ? 'book_call_click' : 'cta_click', {
        label,
        location: el.dataset.trackLocation ?? window.location.pathname,
      });
    }
  };
  document.addEventListener('click', onClick, { capture: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
}
