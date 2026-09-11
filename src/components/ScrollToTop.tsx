import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      title="Nach oben scrollen"
      className="fixed bottom-20 sm:bottom-6 left-5 sm:left-auto sm:right-24 z-40 bg-slate-900/90 hover:bg-slate-950 text-white hover:text-amber-400 p-3 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 active:scale-95 flex items-center justify-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 text-amber-400" />
      <span className="sr-only">Nach oben</span>
    </button>
  );
}
