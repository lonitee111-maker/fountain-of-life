import React, { useState } from 'react';
import { PageId, ChurchEvent } from '../types';
import { EVENTS_DATA, CHURCH_INFO } from '../data/churchData';
import { Calendar, Clock, MapPin, Users, Sparkles, Download, CheckCircle, ChevronRight } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectEvent: (event: ChurchEvent) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onSelectEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Sunday Service', 'Revival', 'Youth', 'Women', 'Community'];

  const filteredEvents = selectedCategory === 'All'
    ? EVENTS_DATA
    : EVENTS_DATA.filter((e) => e.category === selectedCategory);

  const handleDownloadIcs = (event: ChurchEvent) => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Fountain of Life Church//EN\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nLOCATION:${event.location} - ${CHURCH_INFO.address}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            Church Calendar & Gatherings
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            Upcoming Events & Spiritual Encounters
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join us as we gather in worship, fervent prayer, family fellowship, and city-wide revival. Reserve seats for upcoming conferences.
          </p>
        </div>
      </section>

      {/* Main Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif-prose font-bold text-slate-900">
              Scheduled Programmes
            </h2>
            <span className="text-xs text-slate-500">
              Showing {filteredEvents.length} event{filteredEvents.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 font-semibold text-[11px]">
                    {event.category}
                  </span>
                  {event.featured && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold font-serif-prose text-slate-900 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">
                    {event.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{event.date}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>

                  {event.speaker && (
                    <div className="text-[11px] text-slate-500 pt-1">
                      <strong>Ministering:</strong> {event.speaker}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectEvent(event)}
                  className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors text-center"
                >
                  {event.registrationRequired ? 'Register / RSVP' : 'Reserve Free Seat'}
                </button>
                <button
                  onClick={() => handleDownloadIcs(event)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  title="Add to Calendar (.ics)"
                  aria-label="Add to Calendar"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
