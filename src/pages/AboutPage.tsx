import React from 'react';
import { PageId } from '../types';
import { CHURCH_INFO, BELIEFS } from '../data/churchData';
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Compass, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPlanVisit: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenPlanVisit }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            About Fountain of Life Church
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            A Living Sanctuary of Faith, Grace & Transformation
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded on the infallible Word of God, Fountain of Life Church is an apostolic home where broken hearts find renewal and believers are equipped for kingdom dominion.
          </p>
        </div>
      </section>

      {/* Our Story & History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-blue-900 text-xs font-bold uppercase tracking-widest font-sans">
              Our Journey of Faith
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-slate-900 leading-tight">
              From a Humble Prayer Room to a Global River of Blessing
            </h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                In the autumn of 1998, Dr. Emmanuel Adeleke and his wife, Pastor Grace, gathered a small circle of 12 praying believers in a modest living room, hungry for a genuine outpouring of the Holy Spirit. Inspired by Christ’s promise in <strong>John 4:14</strong>, they prayed for God to open a fountain of living waters that would bring salvation and hope to families.
              </p>
              <p>
                Over the past nearly three decades, that small prayer cell has blossomed into an energetic, multi-generational church family touching thousands locally and sponsoring missionaries, community food banks, and youth mentorship worldwide.
              </p>
              <p>
                Yet, while our campus and reach have expanded, our core heartbeat remains unchanged: <em>Christ alone, holiness as a lifestyle, passionate worship, and boundless compassion for our neighbors.</em>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('vision-mission')}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Read Vision & Mission</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('leadership')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
              >
                Meet Pastoral Team
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={CHURCH_INFO.images.community}
                alt="Fountain of Life Church Fellowship"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl text-white text-xs space-y-1">
                <span className="font-bold text-amber-400 block font-serif-prose">
                  Vibrant Community Fellowship
                </span>
                <span className="text-slate-300">
                  Worshipping, learning, and sharing life together as the household of God.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Beliefs & Statement of Faith */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest font-sans">
              Doctrine & Truth
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-slate-900">
              What We Believe
            </h2>
            <p className="text-slate-600 text-sm">
              Our theological foundation rests firmly upon the unchanging authority of the Holy Scriptures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BELIEFS.map((belief, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-600">0{idx + 1}</span>
                    <ShieldCheck className="w-4 h-4 text-blue-900" />
                  </div>
                  <h3 className="text-base font-bold font-serif-prose text-slate-900">
                    {belief.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {belief.summary}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-900">
                  Scripture: {belief.scripture}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* What to Expect When You Visit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-blue-900 text-xs font-bold uppercase tracking-widest font-sans">
              Sunday Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900">
              What to Expect on a Sunday Morning
            </h2>
            <p className="text-slate-600 text-sm">
              We want you to feel right at home from the moment you step onto our campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">1. Passionate Praise</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vibrant gospel praise and intimate orchestral worship led by our choir, creating an atmosphere charged with the Holy Spirit.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">2. Life-Giving Preaching</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear, uncompromising, practical biblical sermons that illuminate your path and equip you for victory in daily life.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">3. Safe Kids Ministry</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your children are loved and protected in Kingdom Champions, with background-checked volunteers and creative Bible lessons.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">4. Fellowship Cafe</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join us after service in the atrium for complimentary coffee, tea, and warm fellowship with our pastors and church family.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Services every Sunday at 8:00 AM (Early Dew) & 10:15 AM (Celebration & Word)
            </span>
            <button
              onClick={onOpenPlanVisit}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
            >
              Plan Your Visit With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
