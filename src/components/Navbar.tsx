import React, { useState, useEffect } from 'react';
import { ChurchLogo } from './ChurchLogo';
import { PageId } from '../types';
import { CHURCH_INFO } from '../data/churchData';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Heart, 
  Video, 
  MapPin, 
  Clock, 
  Calendar,
  BookOpen,
  Users,
  Compass,
  Phone,
  Bell,
  BellRing
} from 'lucide-react';
import { getPrayerReminderSettings } from '../utils/prayerReminderUtils';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPlanVisit: () => void;
  onOpenLiveService: () => void;
  onOpenPrayerReminder?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenPlanVisit,
  onOpenLiveService,
  onOpenPrayerReminder
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reminderActive, setReminderActive] = useState(false);

  useEffect(() => {
    // Check initial reminder state
    const currentSettings = getPrayerReminderSettings();
    setReminderActive(currentSettings.enabled);

    const handleReminderUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setReminderActive(Boolean(customEvent.detail.enabled));
      }
    };

    window.addEventListener('folc:prayer-reminder-updated', handleReminderUpdate);
    return () => window.removeEventListener('folc:prayer-reminder-updated', handleReminderUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAboutActive = 
    currentPage === 'about' || 
    currentPage === 'vision-mission' || 
    currentPage === 'leadership';

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Announcement Ribbon */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Sunday Encounter: 8:00 AM & 10:15 AM</span>
            </div>
            <span className="hidden md:inline text-slate-500">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>124 Living Waters Way, Victory City</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto text-[11px] sm:text-xs">
            <button
              onClick={() => handleNavClick('live')}
              className="flex items-center gap-1.5 font-semibold text-rose-400 hover:text-rose-300 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Watch Live Stream</span>
            </button>

            <span className="text-slate-600">|</span>

            {onOpenPrayerReminder && (
              <>
                <button
                  onClick={onOpenPrayerReminder}
                  className="flex items-center gap-1.5 font-medium text-amber-300 hover:text-amber-200 transition-colors"
                  title="Set Daily Morning Prayer Reminder"
                >
                  <Bell className={`w-3.5 h-3.5 ${reminderActive ? 'text-amber-400 fill-amber-400' : 'text-amber-400'}`} />
                  <span>Morning Prayer Alarm {reminderActive && <span className="bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded text-[10px]">ON</span>}</span>
                </button>
                <span className="text-slate-600">|</span>
              </>
            )}

            <a
              href={`tel:${CHURCH_INFO.phone}`}
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{CHURCH_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenPlanVisit}
              className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 transition-colors"
            >
              Plan Your Visit
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-lg border-b border-slate-200' : 'border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo Zone */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 rounded-lg p-1 transition-transform hover:opacity-95"
              aria-label="Fountain of Life Church Home"
            >
              <ChurchLogo size="md" variant="horizontal" animated />
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === 'home'
                    ? 'text-blue-900 font-bold bg-blue-50/80 border-b-2 border-amber-500'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                Home
              </button>

              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('about')}
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isAboutActive
                      ? 'text-blue-900 font-bold bg-blue-50/80 border-b-2 border-amber-500'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                  aria-expanded={aboutDropdownOpen}
                >
                  <span>About Us</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </button>

                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <button
                      onClick={() => handleNavClick('about')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2.5"
                    >
                      <Compass className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="font-semibold">Who We Are</div>
                        <div className="text-xs text-slate-500">History, beliefs & heart</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleNavClick('vision-mission')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2.5"
                    >
                      <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="font-semibold">Vision & Mission</div>
                        <div className="text-xs text-slate-500">Our mandate & 5 pillars</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleNavClick('leadership')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2.5"
                    >
                      <Users className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="font-semibold">Pastors & Leadership</div>
                        <div className="text-xs text-slate-500">Meet our pastoral team</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('ministries')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === 'ministries'
                    ? 'text-blue-900 font-bold bg-blue-50/80 border-b-2 border-amber-500'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                Ministries
              </button>

              <button
                onClick={() => handleNavClick('sermons')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === 'sermons'
                    ? 'text-blue-900 font-bold bg-blue-50/80 border-b-2 border-amber-500'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                Sermons
              </button>

              <button
                onClick={() => handleNavClick('bible')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === 'bible'
                    ? 'text-blue-900 font-bold bg-blue-50/80 border-b-2 border-amber-500'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Bible</span>
              </button>

              <button
                onClick={() => handleNavClick('events')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === 'events'
                    ? 'text-blue-900 font-bold bg-blue-50/80 border-b-2 border-amber-500'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                Events
              </button>

              <button
                onClick={() => handleNavClick('prayer')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === 'prayer'
                    ? 'text-blue-900 font-bold bg-blue-50/80 border-b-2 border-amber-500'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                Prayer Request
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === 'contact'
                    ? 'text-blue-900 font-bold bg-blue-50/80 border-b-2 border-amber-500'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {onOpenPrayerReminder && (
                <button
                  onClick={onOpenPrayerReminder}
                  className={`relative inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                    reminderActive
                      ? 'bg-amber-50 text-amber-950 border-amber-300 font-bold shadow-2xs'
                      : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200'
                  }`}
                  title="Daily Morning Prayer Reminders"
                >
                  <Bell className={`w-3.5 h-3.5 ${reminderActive ? 'text-amber-600 fill-amber-500' : 'text-slate-600'}`} />
                  <span>Prayer Alarm</span>
                  {reminderActive && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute -top-1 -right-1" />
                  )}
                </button>
              )}

              <button
                onClick={() => handleNavClick('live')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  currentPage === 'live'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-700 bg-rose-50 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <Video className={`w-3.5 h-3.5 ${currentPage === 'live' ? 'text-white' : 'text-rose-600'}`} />
                <span>Watch Live</span>
              </button>

              <button
                onClick={() => handleNavClick('give')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all ${
                  currentPage === 'give'
                    ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Give Online</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => handleNavClick('give')}
                className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-amber-500 rounded-md"
              >
                Give
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-blue-900 rounded-lg hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-2xl">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <div className="py-1">
              <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                About The Church
              </div>
              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left pl-6 pr-3 py-2 rounded-lg text-sm ${
                  currentPage === 'about' ? 'text-blue-900 font-bold bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Who We Are & Beliefs
              </button>
              <button
                onClick={() => handleNavClick('vision-mission')}
                className={`w-full text-left pl-6 pr-3 py-2 rounded-lg text-sm ${
                  currentPage === 'vision-mission' ? 'text-blue-900 font-bold bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Vision, Mission & Pillars
              </button>
              <button
                onClick={() => handleNavClick('leadership')}
                className={`w-full text-left pl-6 pr-3 py-2 rounded-lg text-sm ${
                  currentPage === 'leadership' ? 'text-blue-900 font-bold bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Pastors & Leadership
              </button>
            </div>

            <button
              onClick={() => handleNavClick('ministries')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'ministries' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Ministries
            </button>

            <button
              onClick={() => handleNavClick('sermons')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'sermons' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Sermons & Messages
            </button>

            <button
              onClick={() => handleNavClick('bible')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentPage === 'bible' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Digital Bible & Study</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">New</span>
            </button>

            <button
              onClick={() => handleNavClick('events')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'events' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Events & Calendar
            </button>

            <button
              onClick={() => handleNavClick('give')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'give' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Give / Online Giving
            </button>

            <button
              onClick={() => handleNavClick('prayer')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'prayer' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Prayer Request
            </button>

            {onOpenPrayerReminder && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrayerReminder();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-amber-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <span>Morning Prayer Alarm</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  reminderActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  {reminderActive ? 'ACTIVE' : 'SETUP'}
                </span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'contact' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanVisit();
                }}
                className="w-full py-2.5 text-center text-sm font-bold bg-blue-900 text-white rounded-lg shadow-sm"
              >
                Plan Your Sunday Visit
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('live');
                }}
                className={`w-full py-2.5 text-center text-sm font-semibold rounded-lg flex items-center justify-center gap-2 ${
                  currentPage === 'live'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <Video className="w-4 h-4" />
                <span>Watch Live Broadcast</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
