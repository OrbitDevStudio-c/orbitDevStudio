import { useCallback } from 'react';
import { useLenis } from 'lenis/react';

/**
 * Smoothly scrolls to an element by id. Works with the site's Lenis smooth scroll
 * (which honours the target's `scroll-margin-top`, e.g. `scroll-mt-24`) and falls
 * back to native scrollIntoView. Respects prefers-reduced-motion.
 */
export function usePricingScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      if (lenis) lenis.scrollTo(el, { immediate: reduce });
      else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      return true;
    },
    [lenis],
  );
}
