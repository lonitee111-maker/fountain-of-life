import React, { useState, useEffect } from 'react';
import { Sun, X, BookOpen, Volume2, Sparkles, ArrowRight, Bell } from 'lucide-react';
import { PageId } from '../types';

interface ToastData {
  title: string;
  message: string;
  scripture?: string;
  verseRef?: string;
  isTest?: boolean;
  browserNotifFired?: boolean;
}

interface PrayerNotificationToastProps {
  onNavigate: (page: PageId) => void;
}

export const PrayerNotificationToast: React.FC<PrayerNotificationToastProps> = ({ onNavigate }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastData>;
      if (customEvent.detail) {
        setToast(customEvent.detail);
        setIsVisible(true);
      }
    };

    window.addEventListener('folc:show-prayer-toast', handleToastEvent);
    return () => window.removeEventListener('folc:show-prayer-toast', handleToastEvent);
  }, []);

  // Auto-dismiss after 12 seconds
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!toast || !isVisible) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-full animate-slideIn">
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 shadow-2xl border-2 border-amber-400/80 ring-4 ring-amber-400/20 backdrop-blur-md">
        
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Sun className="w-4 h-4 text-blue-950" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{toast.isTest ? 'Morning Prayer Reminder Test' : 'Covenant Morning Watch'}</span>
              </span>
              <div className="text-[10px] text-slate-300">
                Fountain of Life Church
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              aria-label="Dismiss reminder"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 pl-10 pr-2">
          <h4 className="text-sm font-bold text-white leading-snug font-serif">
            {toast.title.replace(/^🔔\s*(\[Test\]\s*)?/, '')}
          </h4>
          <p className="text-xs text-slate-200 leading-relaxed">
            {toast.message}
          </p>

          {toast.scripture && (
            <div className="mt-2 p-2.5 rounded-xl bg-white/5 border border-amber-400/30 text-[11px] text-amber-200 font-serif italic">
              "{toast.scripture}"
              {toast.verseRef && (
                <span className="block not-italic font-sans font-bold text-amber-400 mt-0.5 text-[10px]">
                  — {toast.verseRef}
                </span>
              )}
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                setIsVisible(false);
                onNavigate('prayer');
              }}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1"
            >
              <span>Join Prayer Wall</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => {
                setIsVisible(false);
                onNavigate('bible');
              }}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-amber-300" />
              <span>Read Scripture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
