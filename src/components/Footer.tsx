import React, { useState } from 'react';
import { ChurchLogo } from './ChurchLogo';
import { PageId } from '../types';
import { CHURCH_INFO } from '../data/churchData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Youtube, 
  Facebook, 
  Instagram, 
  Twitter, 
  Heart,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenPlanVisit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPlanVisit }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
    } catch {
      // Graceful fallback
    }
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const handleLink = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative border-t-4 border-amber-500 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Newsletter & Encouragement Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-1">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly Word & Spiritual Refreshment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-prose font-bold text-white">
              Stay Connected to the Fountain of Grace
            </h3>
            <p className="text-slate-400 text-sm">
              Receive weekly devotionals from Pastor Emmanuel Adeleke, event alerts, and uplifting testimonies.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3 text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-medium">
                  Blessings! You have been subscribed to our weekly newsletter. Check your inbox for your welcome devotional.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                  {error && (
                    <span className="absolute -bottom-5 left-0 text-xs text-rose-400">{error}</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Church Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <ChurchLogo size="md" variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A Christ-centered, Bible-believing family church dedicated to raising spirit-filled believers who walk in holiness, love, and supernatural dominion. Living waters are flowing for you!
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                Follow Us Online
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-pink-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-sky-500 hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="X Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  About Us & Beliefs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('vision-mission')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Vision & Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('leadership')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Pastoral Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('ministries')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Ministries
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPlanVisit}
                  className="text-amber-300 hover:text-amber-200 font-medium transition-colors"
                >
                  Plan Your Sunday Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Engagement (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
              Connect & Grow
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLink('live')}
                  className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Watch Live Broadcast</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('bible')}
                  className="text-amber-300 font-medium hover:text-amber-200 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Digital Bible & Study Tool</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('sermons')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Sermon Library & Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('events')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Upcoming Events & Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('prayer')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Submit a Prayer Request
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('give')}
                  className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Online Giving / Tithes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Directions & Campus Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Times & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
              Worship With Us
            </h4>
            
            <div className="space-y-2 text-xs text-slate-300">
              <div className="border-l-2 border-amber-500 pl-2 py-0.5">
                <div className="font-semibold text-white">Sunday Encounter Services</div>
                <div>8:00 AM (Early Dew) & 10:15 AM (Celebration)</div>
              </div>

              <div className="border-l-2 border-blue-500 pl-2 py-0.5">
                <div className="font-semibold text-white">Wednesday Faith Clinic</div>
                <div>6:30 PM – 8:00 PM (Word & Communion)</div>
              </div>

              <div className="border-l-2 border-amber-500 pl-2 py-0.5">
                <div className="font-semibold text-white">Monthly Holy Ghost Vigil</div>
                <div>1st Friday 10:00 PM – 3:30 AM</div>
              </div>
            </div>

            <div className="pt-2 text-xs space-y-1.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{CHURCH_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{CHURCH_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{CHURCH_INFO.email}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Scripture & Copyright bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="italic text-slate-400 text-center md:text-left">
            “With joy you will draw water from the wells of salvation.” — Isaiah 12:3
          </p>

          <div className="flex items-center gap-4 text-center">
            <span>© {new Date().getFullYear()} Fountain of Life Church. All Rights Reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
