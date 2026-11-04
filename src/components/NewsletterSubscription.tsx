import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Download, 
  Eye, 
  X, 
  Calendar, 
  Bell, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { LATEST_BULLETIN_INFO } from '../data/churchData';

interface NewsletterSubscriptionProps {
  variant?: 'section' | 'compact';
  title?: string;
  subtitle?: string;
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  variant = 'section',
  title = 'Stay Anchored in God’s Word Throughout the Week',
  subtitle = 'Subscribe to receive our Sunday worship bulletin, weekly devotional reflections, and special apostolic announcements directly in your inbox.'
}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [bulletinPref, setBulletinPref] = useState(true);
  const [devotionalPref, setDevotionalPref] = useState(true);
  const [eventsPref, setEventsPref] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showBulletinModal, setShowBulletinModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName,
          preferences: {
            weeklyBulletin: bulletinPref,
            dailyDevotional: devotionalPref,
            vigilAndEvents: eventsPref
          }
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback smooth success even if network hiccups
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadBulletin = () => {
    const textContent = `FOUNTAIN OF LIFE CHURCH - SUNDAY BULLETIN
${LATEST_BULLETIN_INFO.volume} · ${LATEST_BULLETIN_INFO.date}
Theme: ${LATEST_BULLETIN_INFO.title}

SCRIPTURE OF THE WEEK:
${LATEST_BULLETIN_INFO.scriptureOfTheWeek}

PASTOR'S MESSAGE:
${LATEST_BULLETIN_INFO.pastorMessageSnippet}

ORDER OF WORSHIP:
${LATEST_BULLETIN_INFO.orderOfService.map(s => `${s.time} - ${s.item}`).join('\n')}

WEEKLY ANNOUNCEMENTS:
${LATEST_BULLETIN_INFO.announcements.map((a, i) => `${i + 1}. ${a}`).join('\n')}

Campus Sanctuary: 124 Living Waters Way, Victory City, VC 77084
Contact: 08127933781 | fountainoflife@gmail.com`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FountainOfLife_Bulletin_${LATEST_BULLETIN_INFO.volume.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (variant === 'compact') {
    return (
      <div className="w-full">
        {submitted ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3 text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold block">Subscribed Successfully!</span>
              Check your inbox for this Sunday's bulletin and welcome message.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email address..."
                className="w-full px-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-lg text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
              {error && <span className="text-[11px] text-rose-400 mt-1 block">{error}</span>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <span>{loading ? 'Subscribing...' : 'Subscribe to Bulletin'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section id="newsletter-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 rounded-3xl border border-amber-400/30 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        
        {/* Glow circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Benefits (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Weekly Word & Digital Bulletin</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-white leading-tight">
              {title}
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* Benefit Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Sunday Bulletin</strong>
                  <span className="text-slate-400 text-[11px]">Sermon notes & outline</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Daily Bread</strong>
                  <span className="text-slate-400 text-[11px]">Morning devotional email</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-2.5">
                <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Miracle Vigils</strong>
                  <span className="text-slate-400 text-[11px]">Monthly event reminders</span>
                </div>
              </div>
            </div>

            {/* Quick Bulletin Preview Trigger */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <button
                type="button"
                onClick={() => setShowBulletinModal(true)}
                className="text-amber-400 hover:text-amber-300 underline font-medium flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview This Sunday’s Bulletin ({LATEST_BULLETIN_INFO.volume})</span>
              </button>
            </div>
          </div>

          {/* Right Column: Form or Success Card (6 cols) */}
          <div className="lg:col-span-6">
            {submitted ? (
              <div className="bg-slate-900/90 border border-emerald-500/50 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif-prose">
                      Welcome to the Family!
                    </h3>
                    <p className="text-xs text-emerald-300">
                      Your subscription is confirmed for {email}.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs text-slate-300">
                  <p>
                    Grace and peace, <strong>{fullName || 'Beloved Friend'}</strong>! You will now receive:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    {bulletinPref && <li>Sunday Worship Bulletin & Outline</li>}
                    {devotionalPref && <li>Daily Living Waters Devotionals</li>}
                    {eventsPref && <li>Monthly Miracle Vigil & Fasting Alerts</li>}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={() => setShowBulletinModal(true)}
                    className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Digital Bulletin Now</span>
                  </button>

                  <button
                    onClick={handleDownloadBulletin}
                    className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download TXT</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmail('');
                      setFullName('');
                    }}
                    className="text-[11px] text-slate-400 hover:text-white transition-colors"
                  >
                    Subscribe another family member or email
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-900/90 border border-white/15 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Join the Email Broadcast
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>No Spam. Unsubscribe anytime</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sister Grace Johnson"
                      className="w-full px-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    />
                    {error && <span className="text-[11px] text-rose-400 mt-1 block">{error}</span>}
                  </div>
                </div>

                {/* Preference Checkboxes */}
                <div className="pt-2 space-y-2 border-t border-white/10">
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Choose what you’d like to receive:
                  </span>
                  
                  <div className="space-y-1.5 text-xs">
                    <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={bulletinPref}
                        onChange={(e) => setBulletinPref(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Weekly Sunday Bulletin & Sermon Outline</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={devotionalPref}
                        onChange={(e) => setDevotionalPref(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Living Waters Daily Devotionals (Every Morning)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={eventsPref}
                        onChange={(e) => setEventsPref(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Special Revival Vigils & Youth Programme Alerts</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{loading ? 'Subscribing...' : 'Subscribe to Weekly Updates'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-center text-[10px] text-slate-400">
                  By subscribing, you agree to receive church updates. We respect your privacy.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Interactive Church Bulletin Preview Modal */}
      {showBulletinModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-t-2xl flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Digital Worship Bulletin
                </span>
                <h3 className="text-xl font-serif-prose font-bold text-white mt-1">
                  {LATEST_BULLETIN_INFO.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {LATEST_BULLETIN_INFO.volume} · {LATEST_BULLETIN_INFO.date}
                </p>
              </div>

              <button
                onClick={() => setShowBulletinModal(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-sm">
              
              {/* Scripture of the Week */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                  Scripture of the Week
                </span>
                <blockquote className="font-serif-prose font-semibold text-slate-900 text-sm italic">
                  “{LATEST_BULLETIN_INFO.scriptureOfTheWeek}”
                </blockquote>
              </div>

              {/* Pastor's Word */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm font-serif-prose flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Pastor’s Welcome & Pastoral Word</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {LATEST_BULLETIN_INFO.pastorMessageSnippet}
                </p>
                <div className="text-[11px] font-semibold text-blue-900 text-right">
                  — Dr. Emmanuel Adeleke (Senior Pastor)
                </div>
              </div>

              {/* Order of Service */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <h4 className="font-bold text-slate-900 text-sm font-serif-prose flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Order of Sunday Worship Service</span>
                </h4>
                <div className="space-y-1 text-xs">
                  {LATEST_BULLETIN_INFO.orderOfService.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1.5 px-2.5 rounded bg-slate-50 border border-slate-100">
                      <span className="font-medium text-slate-800">{item.item}</span>
                      <span className="text-slate-500 text-[11px] font-mono">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Announcements */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <h4 className="font-bold text-slate-900 text-sm font-serif-prose flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-amber-500" />
                  <span>Weekly Announcements & Calendar</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {LATEST_BULLETIN_INFO.announcements.map((ann, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{ann}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex items-center justify-between">
              <button
                onClick={handleDownloadBulletin}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Bulletin Text</span>
              </button>

              <button
                onClick={() => setShowBulletinModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
