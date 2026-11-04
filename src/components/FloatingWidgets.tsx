import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const FloatingWidgets: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Fountain of Life Church Pastoral Care Team! I am reaching out through the website. I would love to connect and receive prayer.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full shadow-xl border border-slate-700/60 transition-all hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* WhatsApp Direct Chat Button */}
      <a
        href={`https://wa.me/${CHURCH_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label="Chat with pastoral care on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Pastoral Care WhatsApp
        </span>
      </a>
    </div>
  );
};
