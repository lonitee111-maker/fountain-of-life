import React, { useState } from 'react';
import { PageId, Sermon } from '../types';
import { SERMONS_DATA } from '../data/churchData';
import { filterSermons } from '../utils/churchUtils';
import { 
  Search, 
  Play, 
  Calendar, 
  Clock, 
  BookOpen, 
  Download, 
  Sparkles, 
  Filter,
  Volume2
} from 'lucide-react';

interface SermonsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectSermon: (sermon: Sermon) => void;
}

export const SermonsPage: React.FC<SermonsPageProps> = ({ onSelectSermon }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSpeaker, setSelectedSpeaker] = useState('All');

  const categories = ['All', 'Grace', 'Spiritual Growth', 'Faith', 'Prayer', 'Family', 'Finances'];
  const speakers = ['All', 'Dr. Emmanuel Adeleke', 'Pastor Mrs. Grace Adeleke', 'Pastor David Adebayo'];

  // Filtered list
  const filtered = filterSermons(SERMONS_DATA, searchQuery, selectedCategory).filter((s) => {
    if (selectedSpeaker === 'All') return true;
    return s.speaker === selectedSpeaker;
  });

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            Pulpit Ministry
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            Sermons & Life-Transforming Messages
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Feast upon the uncompromised Word of God. Stream audio, watch pulpit recordings, and download outline study notes for your personal devotion.
          </p>
        </div>
      </section>

      {/* Featured Sermon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Pulpit Series: Dimensions of Glory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-white leading-tight">
              {SERMONS_DATA[0].title}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              {SERMONS_DATA[0].description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="font-semibold text-white">{SERMONS_DATA[0].speaker}</span>
              <span>·</span>
              <span className="text-amber-400 font-medium">Scripture: {SERMONS_DATA[0].scripture}</span>
              <span>·</span>
              <span>{SERMONS_DATA[0].duration}</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-start lg:items-end">
            <button
              onClick={() => onSelectSermon(SERMONS_DATA[0])}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Listen / Watch Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, speaker, scripture or keyword..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 focus:outline-none"
              />
            </div>

            {/* Speaker Filter Dropdown */}
            <div className="md:col-span-6 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 shrink-0">Preacher:</span>
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
              >
                {speakers.map((spk) => (
                  <option key={spk} value={spk}>{spk}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-2">Topic:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-2">
          <span>Showing {filtered.length} sermon{filtered.length === 1 ? '' : 's'}</span>
          {(searchQuery || selectedCategory !== 'All' || selectedSpeaker !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSpeaker('All');
              }}
              className="text-blue-900 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Sermons Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No sermons found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn’t find any messages matching your criteria. Try adjusting your search keywords or topic filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((sermon) => {
              const fullSermon = SERMONS_DATA.find((s) => s.id === sermon.id) || SERMONS_DATA[0];
              return (
                <div
                  key={sermon.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-600 px-2.5 py-0.5 rounded-full bg-amber-50">
                        {fullSermon.category}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{fullSermon.duration}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif-prose text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                      {fullSermon.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {fullSermon.description}
                    </p>

                    <div className="pt-2 text-xs text-slate-500 space-y-1 border-t border-slate-100">
                      <div className="font-medium text-slate-800">{fullSermon.speaker}</div>
                      <div className="text-[11px] text-blue-900 font-semibold">
                        Scripture: {fullSermon.scripture}
                      </div>
                      <div className="text-[11px] text-slate-400">Series: {fullSermon.series}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectSermon(fullSermon)}
                      className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play & Study</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
