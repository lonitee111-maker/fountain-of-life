import React from 'react';
import { PageId } from '../types';
import { LEADERSHIP_DATA, CHURCH_INFO } from '../data/churchData';
import { Mail, BookOpen, Quote, Shield, Phone, ChevronRight, Sparkles } from 'lucide-react';

interface LeadershipPageProps {
  onNavigate: (page: PageId) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onNavigate }) => {
  const seniorPastors = LEADERSHIP_DATA.filter((l) => l.isSeniorPastor);
  const associateLeaders = LEADERSHIP_DATA.filter((l) => !l.isSeniorPastor);

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            Shepherds of the Flock
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            Our Pastors & Spiritual Leadership
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated, servant-hearted men and women called by God to shepherd, teach, and equip the family of Fountain of Life Church.
          </p>
        </div>
      </section>

      {/* Senior Pastors Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          <div className="lg:col-span-5 relative min-h-[440px] lg:min-h-[580px]">
            <img
              src={CHURCH_INFO.images.pastors}
              alt="Dr. Emmanuel & Pastor Mrs. Grace Adeleke"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 text-white p-4 bg-slate-950/85 backdrop-blur-md rounded-xl border border-white/15">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                Founding Senior Pastors
              </span>
              <div className="font-bold text-lg font-serif-prose">
                Dr. Emmanuel & Pastor Mrs. Grace Adeleke
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-widest font-sans">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>28+ Years of Faithful Apostolic Ministry</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900">
                Dr. Emmanuel & Pastor Mrs. Grace Adeleke
              </h2>

              <p className="text-sm font-semibold text-amber-700">
                General Overseer & Resident Pastor · Fountain of Life Church Worldwide
              </p>

              <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                <p>
                  Dr. Emmanuel Adeleke holds a Doctorate in Ministry and has spent nearly three decades preaching the Gospel of the Kingdom across Africa, Europe, and North America. Known for his intense passion for prayer, prophetic clarity, and systematic exposition of the Bible, he carries a divine unction to raise leaders who excel with integrity.
                </p>
                <p>
                  Pastor Mrs. Grace Adeleke is a celebrated family counselor, conference keynote speaker, and mentor to thousands of women. Together, they have modeled a joyful, Christ-centered marriage of 30 years and are blessed with three biological children and numerous spiritual sons and daughters.
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl space-y-1">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Pastoral Vision Statement
                </div>
                <p className="text-xs text-slate-700 font-serif-prose italic">
                  “We exist to lead men and women out of spiritual drought into the overflowing presence of Jesus Christ, where every yoke is destroyed and every promise of God is realized.”
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <a
                href={`mailto:${CHURCH_INFO.pastoralCareEmail}`}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Contact Senior Pastors’ Office</span>
              </a>

              <button
                onClick={() => onNavigate('prayer')}
                className="text-blue-900 font-semibold hover:underline"
              >
                Request Personal Pastoral Prayer
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Associate Pastoral Team & Elders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-amber-600 text-xs font-bold uppercase tracking-widest font-sans">
            Pastoral Directorate
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-slate-900">
            Pastoral Team & Board of Elders
          </h2>
          <p className="text-slate-600 text-sm">
            Serving faithfully across evangelism, prayer, youth, children, and church governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {associateLeaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900 font-serif-prose font-bold text-xl">
                  {leader.name.split(' ')[1]?.[0] || 'P'}
                </div>

                <div>
                  <h3 className="text-lg font-bold font-serif-prose text-slate-900">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700">
                    {leader.role}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {leader.bio}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 italic">
                  <strong>Life Scripture:</strong> {leader.favoriteScripture}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`mailto:${leader.email}`}
                  className="text-blue-900 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Governance & Accountability */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Biblical Governance & Financial Integrity</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-prose font-bold text-white">
            Rooted in Transparency, Honor & Covenant Accountability
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Fountain of Life Church operates under the spiritual oversight of our Board of Elders and Trustees in accordance with biblical standards of leadership (1 Timothy 3, Titus 1). All church finances undergo rigorous annual independent audits to ensure every dollar given is faithfully stewarded for the advancement of the Kingdom of God, local benevolence, and world missions.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
            >
              Request Pastoral Appointment
            </button>
            <button
              onClick={() => onNavigate('give')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors"
            >
              Kingdom Stewardship & Giving
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
