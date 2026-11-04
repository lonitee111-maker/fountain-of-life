import React, { useState, useEffect } from 'react';
import { DailyDevotional } from '../types';
import { getDevotionalForDay, DEVOTIONALS_DATA } from '../data/churchData';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Check,
  Copy,
  Calendar,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Flame,
  Compass,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface DailyDevotionalSectionProps {
  onNavigateToPrayer?: () => void;
  onNavigateToBible?: () => void;
}

const DAYS_OF_WEEK: Array<DailyDevotional['dayOfWeek']> = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const DailyDevotionalSection: React.FC<DailyDevotionalSectionProps> = ({
  onNavigateToPrayer,
  onNavigateToBible
}) => {
  const todayDayName = DAYS_OF_WEEK[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState<DailyDevotional['dayOfWeek']>(todayDayName);
  const [devotional, setDevotional] = useState<DailyDevotional>(() => getDevotionalForDay(todayDayName));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);

  // Fetch devotional from server API for selected day
  const fetchDevotional = async (day: DailyDevotional['dayOfWeek'], refresh = false) => {
    setIsLoading(true);
    // Stop any speech currently playing
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const url = `/api/devotional/today?day=${encodeURIComponent(day)}${refresh ? '&refresh=true' : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.devotional) {
          setDevotional(data.devotional);
          setIsAiGenerated(Boolean(data.isAiGenerated));
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Ignore network errors and fallback smoothly
    }

    // Client-side fallback
    setDevotional(getDevotionalForDay(day));
    setIsAiGenerated(false);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDevotional(selectedDay);
  }, [selectedDay]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Audio Speech Synthesis Toggle
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const speechText = `${devotional.title}. Today's scripture reading is from ${devotional.scriptureRef}. "${devotional.scriptureText}". Reflection: ${devotional.reflection}. Today's application: ${devotional.actionStep}. Daily prophetic declaration: ${devotional.propheticDeclaration}`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Copy Devotional to Clipboard
  const handleCopy = () => {
    const formatted = `📖 FOUNTAIN OF LIFE CHURCH DAILY DEVOTIONAL
✨ ${devotional.title} (${devotional.dayOfWeek})
Theme: ${devotional.theme}

📜 SCRIPTURE: ${devotional.scriptureRef} (${devotional.translation})
"${devotional.scriptureText}"

💭 REFLECTION:
${devotional.reflection}

🚶 WALK IN TRUTH (Today's Application):
${devotional.actionStep}

🔥 PROPHETIC DECLARATION:
${devotional.propheticDeclaration}

✍️ By: ${devotional.author}
🌐 fountainoflifechurch.org`;

    navigator.clipboard.writeText(formatted);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Share Devotional
  const handleShare = async () => {
    const shareData = {
      title: `${devotional.title} · Fountain of Life Daily Devotional`,
      text: `"${devotional.scriptureText}" — ${devotional.scriptureRef}. Read today's devotional on Fountain of Life Church:`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
        return;
      } catch {
        // Fallback to copy if user dismissed or unsupported
      }
    }

    handleCopy();
  };

  // Format date readable
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section id="daily-devotional" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Container with Royal Blue & Gold Framing */}
      <div className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 rounded-3xl border border-amber-400/30 shadow-2xl overflow-hidden text-white">
        
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header Bar */}
        <div className="p-6 sm:p-10 border-b border-white/10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Living Waters Daily Bread · Weekday Nourishment</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-white tracking-tight">
                Daily Scripture & Spiritual Reflection
              </h2>

              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                Start every morning anchored in God’s Word. Explore pastoral reflections, life applications, and prophetic declarations designed to uplift your spirit all week long.
              </p>
            </div>

            {/* Quick Action Tools */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Audio Reading Button */}
              <button
                onClick={toggleSpeech}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                  isSpeaking
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg animate-pulse'
                    : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                }`}
                title={isSpeaking ? 'Stop Audio' : 'Listen to Devotional'}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-950" />
                    <span>Stop Reading</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>Listen Aloud</span>
                  </>
                )}
              </button>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 flex items-center gap-2 transition-all"
                title="Copy Full Devotional"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 flex items-center gap-2 transition-all"
                title="Share Reflection"
              >
                {shareSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Shared</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-300" />
                    <span>Share</span>
                  </>
                )}
              </button>

              {/* Refresh / Fresh Reflection */}
              <button
                onClick={() => fetchDevotional(selectedDay, true)}
                disabled={isLoading}
                className="p-2 rounded-xl text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 transition-all disabled:opacity-50"
                title="Refresh or Generate Fresh Reflection"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

          </div>

          {/* 2. Days of the Week Navigation Tabs */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Select a day to read reflections throughout the week:</span>
              </span>
              <span className="text-amber-300/80 hidden sm:inline">Today is {todayFormatted}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = selectedDay === day;
                const isToday = day === todayDayName;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative flex flex-col items-center justify-center gap-1 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-lg font-bold scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="tracking-wide">{day}</span>
                    {isToday && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                          isSelected
                            ? 'bg-slate-950/80 text-amber-300'
                            : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        }`}
                      >
                        Today
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Devotional Content Card */}
        <div className="p-6 sm:p-10 relative z-10">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-sm font-medium">Fetching today's living word...</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Title & Theme Banner */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 border border-blue-600/50 font-medium">
                    {devotional.dayOfWeek} Reflection
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 font-medium">
                    Theme: {devotional.theme}
                  </span>
                  <span className="text-slate-400 text-xs">
                    · {devotional.readingDuration || '2 min read'}
                  </span>
                  {isAiGenerated && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40 text-[10px] font-bold">
                      Fresh Reflection
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-prose font-bold text-white tracking-tight leading-tight">
                  {devotional.title}
                </h3>
              </div>

              {/* Scripture Highlight Box */}
              <div className="bg-gradient-to-r from-blue-900/60 to-slate-900/90 rounded-2xl p-6 sm:p-8 border border-amber-400/40 shadow-inner relative overflow-hidden">
                <div className="absolute top-2 right-4 text-7xl font-serif-prose text-amber-400/10 select-none pointer-events-none">
                  “
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>The Sacred Scripture</span>
                    </span>
                    <span className="text-slate-300 font-sans normal-case tracking-normal">
                      {devotional.translation}
                    </span>
                  </div>

                  <blockquote className="text-lg sm:text-xl font-serif-prose text-slate-100 font-medium leading-relaxed italic">
                    “{devotional.scriptureText}”
                  </blockquote>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    {onNavigateToBible && (
                      <button
                        onClick={onNavigateToBible}
                        className="text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1.5 transition-colors bg-white/10 hover:bg-white/15 px-3 py-1 rounded-lg border border-amber-400/30"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>Study in Digital Bible</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                    <span className="inline-block text-amber-300 font-bold text-sm sm:text-base tracking-wide border-b border-amber-400/40 pb-0.5 ml-auto">
                      — {devotional.scriptureRef}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pastoral Reflection Text */}
              <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pastoral Meditation</span>
                </div>

                <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                  <p>{devotional.reflection}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Authored by: <strong className="text-amber-300 font-medium">{devotional.author}</strong></span>
                  </div>
                </div>
              </div>

              {/* Two Feature Action Cards: "Walk in Truth" & "Prophetic Declaration" */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Walk in Truth (Application) */}
                <div className="bg-blue-950/70 border border-blue-500/30 rounded-2xl p-6 space-y-3 flex flex-col justify-between hover:border-amber-400/40 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <span>Walk in Truth · Today’s Application</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {devotional.actionStep}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-[11px] text-blue-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Apply this in your conversations & meetings today</span>
                  </div>
                </div>

                {/* 2. Prophetic Declaration & Prayer */}
                <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-6 space-y-3 flex flex-col justify-between hover:border-amber-400 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>Altar of Prayer & Prophetic Decree</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed italic">
                      “{devotional.propheticDeclaration}”
                    </p>
                    {devotional.prayerPoint && (
                      <p className="text-xs text-slate-300 pt-1 border-t border-amber-400/20">
                        <strong className="text-amber-300 font-medium">Prayer: </strong>
                        {devotional.prayerPoint}
                      </p>
                    )}
                  </div>

                  <div className="pt-3">
                    {onNavigateToPrayer && (
                      <button
                        onClick={onNavigateToPrayer}
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span>Have a specific prayer burden? Submit to our 24/7 Altar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* 4. Footer Strip */}
        <div className="bg-slate-950/80 px-6 sm:px-10 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Updated every morning at 12:00 AM · Fountain of Life Pastoral Ministry</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={handleCopy}
              className="hover:text-amber-300 transition-colors"
            >
              Copy for WhatsApp / Family Group
            </button>
            <span>·</span>
            {onNavigateToPrayer && (
              <button
                onClick={onNavigateToPrayer}
                className="hover:text-amber-300 transition-colors text-amber-400"
              >
                Request Intercessory Prayer
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
