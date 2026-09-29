import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastVisible = false;
    const toggleVisibility = () => {
      const shouldShow = window.scrollY > 450;
      if (shouldShow !== lastVisible) {
        lastVisible = shouldShow;
        setIsVisible(shouldShow);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

    <button
      onClick={scrollToTop}
      className="fixed bottom-[74px] right-5 sm:bottom-[80px] sm:right-6 z-40 w-11 h-11 rounded-full bg-[#090d16]/90 border text-[var(--accent-primary)] flex items-center justify-center backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-fade-in group focus:outline-none"
      style={{
        borderColor: 'var(--accent-border)',
        boxShadow: '0 8px 30px var(--accent-glow)',
      }}
      aria-label="Back to top"
      title="Scroll to top"
    >
      <ArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
}
