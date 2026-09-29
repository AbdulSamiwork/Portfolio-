import { useEffect } from 'react';

/**
 * Custom hook to register IntersectionObserver for `.reveal` elements
 * Replaces direct imperative scripts in App.jsx.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    });

    const elements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    elements.forEach((el) => observer.observe(el));

    const timer = setTimeout(() => {
      const refreshedEls = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale:not(.active)'
      );
      refreshedEls.forEach((el) => observer.observe(el));
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}
