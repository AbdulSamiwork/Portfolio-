import { useEffect } from 'react';

/**
 * High-Performance Scroll Reveal Hook
 * Uses native IntersectionObserver off the main thread (0 scroll jank)
 * Batches DOM discovery via requestAnimationFrame & MutationObserver
 */
export function useScrollReveal() {
  useEffect(() => {
    const observerCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.05,
      rootMargin: '100px 0px 100px 0px',
    });

    let rafId = null;
    const registerElements = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const elements = document.querySelectorAll(
          '.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active), .reveal-scale:not(.active)'
        );
        elements.forEach((el) => {
          observer.observe(el);
        });
      });
    };

    // Initial discovery
    registerElements();

    const t1 = setTimeout(registerElements, 200);
    const t2 = setTimeout(registerElements, 600);

    // Watch dynamic state updates (e.g. data loaded from API)
    const mutationObserver = new MutationObserver(() => {
      registerElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', registerElements, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', registerElements);
    };
  }, []);
}
