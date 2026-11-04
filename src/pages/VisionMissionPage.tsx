import React from 'react';
import { PageId } from '../types';
import { 
  Compass, 
  Target, 
  Flame, 
  BookOpen, 
  Heart, 
  Users, 
  Globe2, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface VisionMissionPageProps {
  onNavigate: (page: PageId) => void;
}

export const VisionMissionPage: React.FC<VisionMissionPageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      title: '1. Passionate Worship',
      icon: Flame,
      scripture: 'John 4:23-24',
      description: 'Creating an altar where the presence and glory of God dwell, transcending cultural bounds and drawing believers into intimate communion with the Holy Spirit.'
    },
    {
      title: '2. Deep Discipleship',
      icon: BookOpen,
      scripture: 'Matthew 28:19-20',
      description: 'Rooting believers in sound biblical doctrine, prayer, and character formation so they stand unshakable in their faith and reflect Christ in every sphere of life.'
    },
    {
      title: '3. Loving Fellowship',
      icon: Users,
      scripture: 'Acts 2:42-47',
      description: 'Building an authentic, supportive family where no one walks alone, burdens are shared, triumphs are celebrated, and love is practical and unconditional.'
    },
    {
      title: '4. Empowered Ministry',
      icon: Heart,
      scripture: 'Ephesians 4:11-13',
      description: 'Equipping every saint to discover their spiritual gifts, fulfill their divine destiny, and become faithful stewards of God’s manifold grace.'
    },
    {
      title: '5. Global Evangelism',
      icon: Globe2,
      scripture: 'Mark 16:15',
      description: 'Taking the saving message of Jesus Christ to our immediate neighborhood, universities, workplaces, and across international borders through church planting and compassionate outreach.'
    }
  ];

  const values = [
    { name: 'Christ-Centeredness', desc: 'Jesus Christ is the cornerstone of everything we preach, practice, and celebrate.' },
    { name: 'Biblical Holiness', desc: 'Pursuing pure hearts and lives set apart unto the glory and service of God.' },
    { name: 'Integrity & Stewardship', desc: 'Operating in complete transparency, honor, and financial accountability.' },
    { name: 'Unconditional Love', desc: 'Extending Christ’s grace to everyone, regardless of background or past mistakes.' },
    { name: 'Spiritual Excellence', desc: 'Honoring God with our utmost quality, diligence, and joyful sacrifice.' },
    { name: 'Strong Families', desc: 'Nurturing godly marriages, honoring parents, and raising victorious children.' }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            Our Divine Mandate
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            Our Vision, Mission & Core Values
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Clarifying why we exist, where the Holy Spirit is leading us, and the biblical principles that govern our walk.
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="bg-white rounded-3xl border-2 border-amber-300/60 p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -z-0 opacity-40" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block font-sans">
                Our Vision Statement
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900 leading-snug">
                “To raise a generation of spirit-filled, empowered believers who impact their world with the love, holiness, and supernatural power of Jesus Christ.”
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We envision a global family of believers who live victorious lives in their homes, excel in their careers, establish righteous influence in culture, and prepare humanity for the second coming of our Lord Jesus Christ.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 text-xs text-amber-900 font-semibold italic">
              Anchor: Habakkuk 2:2 — “Write the vision and make it plain upon tables...”
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl border-2 border-blue-200 p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-0 opacity-40" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block font-sans">
                Our Mission Statement
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900 leading-snug">
                “To preach the undiluted gospel of salvation, nurture believers through intentional discipleship, heal the brokenhearted, and extend Christ’s compassion to every corner of society.”
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Through vibrant Sunday encounters, midweek training, dynamic youth ministries, and humanitarian community care, we translate biblical faith into transformative action that changes lives today and preserves souls for eternity.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 text-xs text-blue-900 font-semibold italic">
              Anchor: Isaiah 61:1 — “The Spirit of the Lord God is upon Me...”
            </div>
          </div>

        </div>
      </section>

      {/* The 5 Pillars */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-blue-900 text-xs font-bold uppercase tracking-widest font-sans">
              Foundational Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-slate-900">
              The 5 Pillars of Fountain of Life
            </h2>
            <p className="text-slate-600 text-sm">
              These five structural pillars guide all ministry programs, investments, and community outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-serif-prose text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100 text-[11px] font-semibold text-amber-700">
                    Scripture: {pillar.scripture}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-amber-600 text-xs font-bold uppercase tracking-widest font-sans">
            Guiding Convictions
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-slate-900">
            Our Core Kingdom Values
          </h2>
          <p className="text-slate-600 text-sm">
            The DNA of our church culture in how we lead, worship, and love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">{val.name}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-6 text-center">
          <button
            onClick={() => onNavigate('ministries')}
            className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-colors inline-flex items-center gap-2"
          >
            <span>See How Our Pillars Live Out in Ministries</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
