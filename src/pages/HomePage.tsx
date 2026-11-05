import React, { useState } from 'react';
import { PageId, Sermon, ChurchEvent, Testimony } from '../types';
import { CHURCH_INFO, SERMONS_DATA, EVENTS_DATA, TESTIMONIES_DATA } from '../data/churchData';
import { DailyDevotionalSection } from '../components/DailyDevotionalSection';
import { WorshipPlaylistSection } from '../components/WorshipPlaylistSection';
import { NewsletterSubscription } from '../components/NewsletterSubscription';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Quote, 
  Share2, 
  Check, 
  Radio, 
  Volume2,
  Users,
  Compass,
  BookOpen,
  Flame,
  Bell,
  Sun
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenPlanVisit: () => void;
  onOpenLiveService: () => void;
  onSelectSermon: (sermon: Sermon) => void;
  onSelectEvent: (event: ChurchEvent) => void;
  onOpenShareTestimony: () => void;
  customTestimonies: Testimony[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenPlanVisit,
  onOpenLiveService,
  onSelectSermon,
  onSelectEvent,
  onOpenShareTestimony,
  customTestimonies
}) => {
  // Testimonies filter
  const [testimonyCategory, setTestimonyCategory] = useState<string>('All');
  const { user, profile, openAuthModal } = useAuth();

  const allTestimonies = [...customTestimonies, ...TESTIMONIES_DATA];
  const filteredTestimonies = testimonyCategory === 'All'
    ? allTestimonies
    : allTestimonies.filter((t) => t.category === testimonyCategory);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
        {/* Background Church Imagery with dark vignette and royal blue scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={CHURCH_INFO.images.hero}
            alt="Fountain of Life Church Sanctuary Worship"
            className="w-full h-full object-cover object-center brightness-60 scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
          <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          
          {/* Spiritual Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Living Waters, Transforming Lives · Welcome Home</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-prose font-bold text-white tracking-tight leading-[1.15] text-balance max-w-4xl mx-auto drop-shadow-md">
            Where Living Waters Flow and Broken Hearts Find <span className="text-amber-400 italic">Eternal Hope</span>.
          </h1>

          {/* Subtitle / Welcome Message */}
          <p className="text-slate-200 text-base sm:text-lg lg:text-xl font-normal max-w-2xl mx-auto leading-relaxed drop-shadow">
            At Fountain of Life Church, you are never just a face in the crowd. Discover Christ-centered worship, deep apostolic teaching, and a loving spiritual family ready to walk with you.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onOpenPlanVisit}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Join Us This Sunday</span>
            </button>

            <button
              onClick={() => onNavigate('live')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-semibold text-sm rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Watch Live Services</span>
            </button>
          </div>

          {/* Service Times & Address Strip */}
          <div className="pt-6 border-t border-white/15 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-200">
            <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-white/10 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="block font-bold text-white">Sunday Encounters</span>
                <span>8:00 AM & 10:15 AM</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-white/10 backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="block font-bold text-white">Wednesday Word</span>
                <span>6:30 PM (Mid-Week Refreshing)</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-white/10 backdrop-blur-sm sm:col-span-2 md:col-span-1">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="block font-bold text-white">Sanctuary Location</span>
                <span className="truncate">124 Living Waters Way</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PASTOR'S WELCOME SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Pastors Portrait Column (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[500px]">
            <img
              src={CHURCH_INFO.images.pastors}
              alt="Dr. Emmanuel & Pastor Mrs. Grace Adeleke"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 text-white p-3 bg-slate-950/75 backdrop-blur-sm rounded-xl border border-white/15">
              <div className="font-bold text-sm font-serif-prose text-amber-300">
                Dr. Emmanuel & Pastor Mrs. Grace Adeleke
              </div>
              <div className="text-xs text-slate-300">
                Senior Pastors & Co-Founders, Fountain of Life Church
              </div>
            </div>
          </div>

          {/* Welcome Letter Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-widest font-sans">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>A Personal Welcome From Our Pastors</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-prose font-bold text-slate-900 leading-tight">
                “There is an unceasing fountain of grace reserved for your destiny.”
              </h2>

              <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Beloved friend, whether you are seeking a spiritual home, searching for answers to life’s deepest questions, or yearning for a fresh infilling of the Holy Spirit, we open our arms and our hearts to welcome you.
                </p>
                <p>
                  At Fountain of Life Church, our prayer is that every time you connect with this altar, you will experience the undeniable presence of Jesus Christ. We are not just an organization; we are a family grounded in holiness, unconditional love, fervent prayer, and kingdom victory.
                </p>
                <p>
                  You were not brought here by coincidence. God has prepared a table for you where the living waters never run dry. We eagerly look forward to worshipping with you this Sunday!
                </p>
              </div>
            </div>

            {/* Pastors Signature & Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-serif-prose font-bold text-slate-900 text-base">
                  Dr. Emmanuel & Pastor Grace Adeleke
                </div>
                <div className="text-xs text-slate-500">
                  Senior Pastors, Fountain of Life Church
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-4 py-2 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Our Story & Beliefs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('leadership')}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Meet All Leaders
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. "YOUR NEXT STEP" PATHWAY */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest font-sans">
              Spiritual Growth Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-white">
              What Is Your Next Step in Christ?
            </h2>
            <p className="text-slate-300 text-sm">
              Wherever you are in your faith walk, God has a next dimension for you. Here is how we walk together:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1: Salvation */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all hover:-translate-y-1">
              <div className="space-y-3">
                <span className="text-2xl font-serif-prose font-bold text-amber-400">01</span>
                <h3 className="text-lg font-bold text-white font-serif-prose">Receive Jesus Christ</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Make the life-transforming decision to accept Jesus as your personal Lord and Savior. New life starts here.
                </p>
              </div>
              <button
                onClick={() => onNavigate('prayer')}
                className="mt-6 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 text-left"
              >
                <span>Pray the Prayer of Salvation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 2: Water Baptism */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all hover:-translate-y-1">
              <div className="space-y-3">
                <span className="text-2xl font-serif-prose font-bold text-amber-400">02</span>
                <h3 className="text-lg font-bold text-white font-serif-prose">Believer’s Baptism</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Demonstrate your inward faith through outward water baptism, identifying with Christ’s burial and resurrection.
                </p>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="mt-6 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 text-left"
              >
                <span>Register for Baptism Class</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 3: Life Groups */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all hover:-translate-y-1">
              <div className="space-y-3">
                <span className="text-2xl font-serif-prose font-bold text-amber-400">03</span>
                <h3 className="text-lg font-bold text-white font-serif-prose">Join a Life Cell Group</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Church is bigger than Sunday mornings. Connect in home cell groups for Bible study, meals, and real friendship.
                </p>
              </div>
              <button
                onClick={() => onNavigate('ministries')}
                className="mt-6 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 text-left"
              >
                <span>Find a Cell Group Near You</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 4: Serve */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all hover:-translate-y-1">
              <div className="space-y-3">
                <span className="text-2xl font-serif-prose font-bold text-amber-400">04</span>
                <h3 className="text-lg font-bold text-white font-serif-prose">Discover Your Ministry</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Use your spiritual gifts, professional skills, and passion to serve God and touch lives in our departments.
                </p>
              </div>
              <button
                onClick={() => onNavigate('ministries')}
                className="mt-6 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 text-left"
              >
                <span>Explore Serving Opportunities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Member Registration Callout Banner */}
          <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-800 to-indigo-900/60 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow-md">
                <Users className="w-6 h-6 text-blue-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white font-serif">
                    Official Church Member Registration
                  </h4>
                  {user && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                      Registered
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Register your membership profile to obtain your digital Fountain Member Card, connect with cell fellowships, and access pastoral counseling.
                </p>
              </div>
            </div>

            <button
              onClick={() => openAuthModal(user ? 'profile' : 'signin')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105 shrink-0 flex items-center gap-2"
            >
              <span>{user ? 'View My Member Card' : 'Register / Sign In Now'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. DAILY DEVOTIONAL SECTION */}
      <DailyDevotionalSection
        onNavigateToPrayer={() => onNavigate('prayer')}
        onNavigateToBible={() => onNavigate('bible')}
      />

      {/* 4b. MORNING PRAYER REMINDER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border-2 border-amber-400/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-amber-400/5 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow-lg">
              <Sun className="w-7 h-7 text-blue-950" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Covenant Morning Watch
                </span>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-semibold border border-amber-400/30">
                  Daily 6:00 AM
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Start Every Day in God’s Presence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Never miss your morning watch. Opt-in for daily browser notifications with our peaceful sanctuary bell chime and scripture reflection.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('folc:open-prayer-reminder'))}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all hover:scale-105 shrink-0 flex items-center gap-2 relative z-10"
          >
            <Bell className="w-4 h-4 fill-slate-950" />
            <span>Opt-In for Daily Reminders</span>
          </button>
        </div>
      </section>

      {/* 5. WORSHIP PLAYLIST SECTION */}
      <WorshipPlaylistSection onNavigateToMinistries={() => onNavigate('ministries')} />

      {/* 6. LATEST SERMONS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-blue-900 text-xs font-bold uppercase tracking-widest font-sans">
              Spiritual Nourishment
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-slate-900 mt-1">
              Latest Sermons & Messages
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Watch, listen, and download notes from our recent pulpit teachings.
            </p>
          </div>

          <button
            onClick={() => onNavigate('sermons')}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Browse Full Library</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERMONS_DATA.slice(0, 3).map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-amber-600">{sermon.category}</span>
                  <span>{sermon.duration}</span>
                </div>

                <h3 className="text-xl font-bold font-serif-prose text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {sermon.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {sermon.description}
                </p>

                <div className="pt-2 text-xs text-slate-500 space-y-0.5 border-t border-slate-100">
                  <div className="font-medium text-slate-800">{sermon.speaker}</div>
                  <div className="text-[11px] text-amber-700">Scripture: {sermon.scripture}</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectSermon(sermon)}
                  className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Listen & Read Notes</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED UPCOMING EVENTS */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-amber-600 text-xs font-bold uppercase tracking-widest font-sans">
                Gatherings & Programmes
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-slate-900 mt-1">
                Upcoming Events & Services
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Mark your calendar and prepare your heart to meet with God.
              </p>
            </div>

            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
            >
              <span>View Full Events Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS_DATA.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-900 font-semibold text-[11px]">
                    {event.category}
                  </div>

                  <h3 className="text-xl font-bold font-serif-prose text-slate-900 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="pt-2 space-y-1.5 text-xs text-slate-600 border-t border-slate-100">
                    <div className="flex items-center gap-2 font-medium text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 flex items-center gap-3">
                  <button
                    onClick={() => onSelectEvent(event)}
                    className="flex-1 py-2 text-center text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors"
                  >
                    RSVP / Reserve Seat
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS OF GOD'S FAITHFULNESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-blue-900 text-xs font-bold uppercase tracking-widest font-sans">
              Praise Reports
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-slate-900 mt-1">
              Testimonies of God’s Faithfulness
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Hear what the Lord has done in the lives of our church members.
            </p>
          </div>

          <button
            onClick={onOpenShareTestimony}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Share Your Testimony</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Healing', 'Breakthrough', 'Family', 'Provision', 'Salvation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setTestimonyCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                testimonyCategory === cat
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonies.map((testimony) => (
            <div
              key={testimony.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-amber-200 absolute top-4 right-4" />
              
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {testimony.category}
                </span>

                <h3 className="text-lg font-bold font-serif-prose text-slate-900">
                  {testimony.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  “{testimony.story}”
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{testimony.author}</span>
                    <span className="text-slate-400"> · {testimony.city}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{testimony.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. COMMUNITY PRAYER WALL SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white border-2 border-amber-500/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Community Altar of Agreement</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-prose text-white">
              The Community Prayer Wall
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Never fight life’s battles in isolation. Over 350 prayers have been lifted on our public prayer wall. Post your request, click “Pray for This” to intercede for others, and experience the power of corporate agreement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('prayer')}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Visit the Prayer Wall</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. WEEKLY BULLETIN & NEWSLETTER SUBSCRIPTION */}
      <NewsletterSubscription />

      {/* 10. WELCOME VISITOR EXPERIENCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider inline-block">
              First Time Visiting?
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold">
              We Can’t Wait to Meet You This Sunday!
            </h2>
            <p className="text-slate-200 text-sm leading-relaxed">
              Let us know you are coming so our hospitality team can reserve parking, arrange a welcome pack, and help you get settled comfortably.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenPlanVisit}
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Plan Your Sunday Visit
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all"
              >
                Get Directions & Map
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
