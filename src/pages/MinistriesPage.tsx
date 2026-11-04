import React, { useState } from 'react';
import { PageId, Ministry } from '../types';
import { MINISTRIES_DATA, CHURCH_INFO } from '../data/churchData';
import { 
  Users, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Heart, 
  UserCheck, 
  ChevronRight,
  Music,
  GraduationCap
} from 'lucide-react';

interface MinistriesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinMinistry: (ministry: Ministry) => void;
}

export const MinistriesPage: React.FC<MinistriesPageProps> = ({
  onNavigate,
  onOpenJoinMinistry
}) => {
  const [filter, setFilter] = useState('All');

  const filteredMinistries = filter === 'All'
    ? MINISTRIES_DATA
    : MINISTRIES_DATA.filter((m) => {
        if (filter === 'Kids & Youth') return m.id === 'min-1' || m.id === 'min-2';
        if (filter === 'Men & Women') return m.id === 'min-3' || m.id === 'min-4';
        if (filter === 'Worship & Arts') return m.id === 'min-5';
        if (filter === 'Outreach') return m.id === 'min-6';
        return true;
      });

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            Connected & Serving
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            Our Church Ministries & Fellowships
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            There is a place for you, your children, and your gifts. Discover life-giving community, mentorship, and opportunities to serve God.
          </p>
        </div>
      </section>

      {/* Choir Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 min-h-[360px] flex items-end">
          <img
            src={CHURCH_INFO.images.choir}
            alt="Living Waters Mass Choir and Worship Ministry"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-3 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold">
              <Music className="w-3.5 h-3.5" />
              <span>Ministering in Excellence and Anointing</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold">
              The Living Waters Choir & Creative Arts
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              We believe worship is warfare, adoration, and divine encounter. Whether you are a vocalist, instrumentalist, sound engineer, or visual designer, God has given you talent to bless His church!
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenJoinMinistry(MINISTRIES_DATA[4])}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                Audition & Join the Choir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900">
              Explore All Departments
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Click any department below to view meeting details or sign up to volunteer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Kids & Youth', 'Men & Women', 'Worship & Arts', 'Outreach'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === tab
                    ? 'bg-blue-900 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMinistries.map((ministry) => (
            <div
              key={ministry.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 font-semibold text-[11px]">
                    {ministry.targetAudience}
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <div>
                  <h3 className="text-xl font-bold font-serif-prose text-slate-900 group-hover:text-blue-900 transition-colors">
                    {ministry.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">
                    {ministry.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ministry.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-800">Meeting Schedule:</span>
                      <span className="text-[11px] text-slate-600">{ministry.meetingSchedule}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-800">Leader:</span>
                      <span className="text-[11px] text-slate-600">{ministry.leaderName} ({ministry.leaderTitle})</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 italic">
                  <strong>Scripture:</strong> “{ministry.scriptureText}” — {ministry.scriptureReference}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenJoinMinistry(ministry)}
                  className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span>Join / Get Involved</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
