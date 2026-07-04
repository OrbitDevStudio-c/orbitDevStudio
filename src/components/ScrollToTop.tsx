import { useEffect, useLayoutEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const scrollTop = () => {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTop();
    const frameId = window.requestAnimationFrame(scrollTop);

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, search, lenis]);

  return null;
}
