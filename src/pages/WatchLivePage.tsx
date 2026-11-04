import React, { useState } from 'react';
import { PageId } from '../types';
import { CHURCH_INFO } from '../data/churchData';
import { 
  Radio, 
  Users, 
  MessageSquare, 
  Heart, 
  Send, 
  BookOpen, 
  Clock, 
  Share2, 
  Check, 
  Volume2, 
  Sparkles, 
  Calendar, 
  Tv, 
  ShieldCheck,
  ChevronRight,
  ThumbsUp,
  Flame,
  HandMetal
} from 'lucide-react';

interface WatchLivePageProps {
  onNavigate: (page: PageId) => void;
  onOpenPlanVisit: () => void;
}

interface StreamChannel {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  speaker: string;
  isLive: boolean;
  viewers: string;
  description: string;
}

const CHANNELS: StreamChannel[] = [
  {
    id: 'ch-1',
    youtubeId: 'bKJOk0UTlGo',
    title: 'RCCG Holy Ghost Service & Convention Live Broadcast',
    category: 'Main Sanctuary',
    speaker: 'Pastor E.A. Adeboye & Pastoral Directorate',
    isLive: true,
    viewers: '24,850',
    description: 'Experience an atmosphere of undeniable signs, wonders, salvation, and the raw power of the Holy Spirit streaming live from the Redemption Sanctuary.'
  },
  {
    id: 'ch-2',
    youtubeId: 'uelt__1SfO8',
    title: 'RCCG Praise Team — High Praise & Divine Worship',
    category: 'Worship Stream',
    speaker: 'RCCG National Praise Team',
    isLive: true,
    viewers: '8,420',
    description: 'Non-stop spirit-filled praise and deep worship ministering directly before the throne of God with anointed vocalists and live orchestra.'
  },
  {
    id: 'ch-3',
    youtubeId: 'lwaF3Zan3dM',
    title: 'RCCG Holy Communion & Prophetic Impartation',
    category: 'Word & Communion',
    speaker: 'Pastor E.A. Adeboye',
    isLive: false,
    viewers: '12,190',
    description: 'Partake in the covenant meal of healing, deliverance, and supernatural longevity through the sacred table of the Lord.'
  },
  {
    id: 'ch-4',
    youtubeId: '7zedz7deX3k',
    title: 'RCCG Mass Choir — Heavenly Anthems & Classical Praise',
    category: 'Choir Ministration',
    speaker: 'The Mass Choir',
    isLive: false,
    viewers: '6,340',
    description: 'Glorious harmonies, majestic orchestral arrangements, and timeless gospel anthems proclaiming the majesty of Jesus Christ.'
  },
  {
    id: 'ch-5',
    youtubeId: 'bH7KTcePBBw',
    title: 'RCCG Divine Encounter & Deliverance Service',
    category: 'Miracle Service',
    speaker: 'Pastoral Team',
    isLive: false,
    viewers: '9,810',
    description: 'A focused morning encounter breaking financial stagnation, demonic oppression, and unlocking supernatural open doors.'
  }
];

export const WatchLivePage: React.FC<WatchLivePageProps> = ({ onNavigate }) => {
  const [selectedChannel, setSelectedChannel] = useState<StreamChannel>(CHANNELS[0]);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'schedule'>('chat');
  
  // Real-time Chat
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; user: string; text: string; location: string; time: string; isUser?: boolean }>>([
    { id: '1', user: 'Sister Folake A.', location: 'London, UK', text: 'Hallelujah! The glory of God is in this room! Tuning in with the whole family.', time: 'Just now' },
    { id: '2', user: 'Brother Michael Eze', location: 'Lagos, Nigeria', text: 'Living waters flowing in my destiny! Watching from Ikeja. Amen!', time: '1m ago' },
    { id: '3', user: 'Deaconess Sarah Campbell', location: 'Houston, TX', text: 'Healing power of God touching every afflicted body right now!', time: '2m ago' },
    { id: '4', user: 'Pastor John & Mary', location: 'Toronto, Canada', text: 'What an anointed praise session! God bless the leadership and choir.', time: '3m ago' },
    { id: '5', user: 'Brother David O.', location: 'Atlanta, GA', text: 'Believing God for a miracle job this week. Claiming the prophetic word!', time: '4m ago' }
  ]);
  const [userComment, setUserComment] = useState('');

  // Floating Reaction Counters
  const [reactions, setReactions] = useState({
    amen: 1420,
    fire: 980,
    love: 1850,
    hallelujah: 2430
  });

  const [copiedLink, setCopiedLink] = useState(false);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        user: 'You (Online Worshipper)',
        location: 'Online Campus',
        text: userComment.trim(),
        time: 'Just now',
        isUser: true
      }
    ]);
    setUserComment('');
  };

  const handleReaction = (type: 'amen' | 'fire' | 'love' | 'hallelujah') => {
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const handleShareBroadcast = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-10 py-6">
      {/* Top Live Banner */}
      <section className="bg-slate-950 text-white rounded-3xl mx-4 sm:mx-8 p-6 sm:p-8 border border-amber-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/30 text-rose-400 border border-rose-500/50 text-xs font-bold tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>ONLINE CAMPUS LIVE</span>
              </span>
              <span className="text-xs text-slate-400">
                · {selectedChannel.viewers} Believers Connected
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif-prose font-bold text-white tracking-tight">
              {selectedChannel.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {selectedChannel.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('give')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Give Live Offering</span>
            </button>

            <button
              onClick={handleShareBroadcast}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Broadcast</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Broadcast Player + Interactive Sidebar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Video Viewport (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* 16:9 Responsive Video Container */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border-2 border-slate-800 group">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedChannel.youtubeId}?autoplay=1&rel=0`}
                title={selectedChannel.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Interactive Live Reactions Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-semibold text-slate-700">
                Send Live Praises & Reactions:
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReaction('amen')}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold transition-transform hover:scale-110 active:scale-95 flex items-center gap-1.5 border border-blue-200 shadow-2xs"
                >
                  <span>🙏</span>
                  <span>Amen</span>
                  <span className="text-[10px] text-blue-600 font-mono font-normal">({reactions.amen})</span>
                </button>

                <button
                  onClick={() => handleReaction('hallelujah')}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold transition-transform hover:scale-110 active:scale-95 flex items-center gap-1.5 border border-amber-200 shadow-2xs"
                >
                  <span>🙌</span>
                  <span>Hallelujah</span>
                  <span className="text-[10px] text-amber-700 font-mono font-normal">({reactions.hallelujah})</span>
                </button>

                <button
                  onClick={() => handleReaction('fire')}
                  className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-900 rounded-xl text-xs font-bold transition-transform hover:scale-110 active:scale-95 flex items-center gap-1.5 border border-orange-200 shadow-2xs"
                >
                  <span>🔥</span>
                  <span>Holy Ghost</span>
                  <span className="text-[10px] text-orange-700 font-mono font-normal">({reactions.fire})</span>
                </button>

                <button
                  onClick={() => handleReaction('love')}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-900 rounded-xl text-xs font-bold transition-transform hover:scale-110 active:scale-95 flex items-center gap-1.5 border border-rose-200 shadow-2xs"
                >
                  <span>❤️</span>
                  <span>Love</span>
                  <span className="text-[10px] text-rose-600 font-mono font-normal">({reactions.love})</span>
                </button>
              </div>
            </div>

            {/* Channels Switcher Carousel */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-blue-900" />
                  <span>Choose Live Stream Channel</span>
                </span>
                <span className="text-slate-500">5 Broadcast Feeds</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      selectedChannel.id === ch.id
                        ? 'bg-blue-900 text-white border-amber-400 shadow-md ring-2 ring-blue-900'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        selectedChannel.id === ch.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-blue-900'
                      }`}>
                        {ch.category}
                      </span>
                      {ch.isLive && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                    </div>
                    <div className="font-semibold text-xs line-clamp-1">
                      {ch.title}
                    </div>
                    <div className={`text-[11px] truncate mt-0.5 ${
                      selectedChannel.id === ch.id ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {ch.speaker}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Chat & Notes Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[640px]">
            {/* Tabs Header */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                  activeTab === 'chat'
                    ? 'border-blue-900 text-blue-900 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-blue-900 text-blue-900 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bulletin</span>
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex-1 py-3.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                  activeTab === 'schedule'
                    ? 'border-blue-900 text-blue-900 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Times</span>
              </button>
            </div>

            {/* Tab Body: Live Fellowship Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-slate-50/50">
                  <div className="text-[11px] text-center text-slate-400 py-1 bg-white rounded-lg border border-slate-200 mb-2">
                    Welcome to the Global Online Sanctuary! Share greetings and praises below.
                  </div>

                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-xl text-xs space-y-0.5 ${
                        msg.isUser
                          ? 'bg-blue-900 text-white ml-4 shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className={`font-bold ${msg.isUser ? 'text-amber-300' : 'text-blue-900'}`}>
                          {msg.user}
                        </span>
                        <span className={msg.isUser ? 'text-blue-200' : 'text-slate-400'}>
                          {msg.location} · {msg.time}
                        </span>
                      </div>
                      <p className={`leading-relaxed ${msg.isUser ? 'text-slate-100' : 'text-slate-700'}`}>
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex gap-2">
                  <input
                    type="text"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Type an 'Amen' or greeting from your city..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors shadow-sm shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab Body: Digital Sermon Notes & Bulletin */}
            {activeTab === 'notes' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs text-slate-700">
                <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-900 text-xs uppercase tracking-wider block">
                    Today’s Message
                  </span>
                  <div className="font-bold text-slate-900 text-sm font-serif-prose">
                    The Rivers of Uncontainable Favor & Supernatural Speed
                  </div>
                  <div className="text-[11px] text-blue-900 font-semibold">
                    Scriptures: Psalm 102:13; Genesis 39:2-5; John 4:14
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                    Sermon Outline Points:
                  </span>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <strong>1. Divine Favor Overrides Natural Limitations:</strong> God’s favor does not wait for human approval or worldly algorithms.
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <strong>2. The Set Time to Favor Zion:</strong> The Kairos season of breakthrough arrives when God remembers His covenant.
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <strong>3. Stewardship of Grace:</strong> Prosperity is given to fund global salvation and establish righteousness on earth.
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-blue-900">Need personal prayer during service?</span>
                  <button
                    onClick={() => onNavigate('prayer')}
                    className="px-2.5 py-1 bg-blue-900 text-white font-bold rounded-lg text-[10px]"
                  >
                    Request Prayer
                  </button>
                </div>
              </div>
            )}

            {/* Tab Body: Global Service Times */}
            {activeTab === 'schedule' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                  Global Broadcast Schedule
                </span>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-blue-900 text-sm">Sunday Early Dew Encounter</div>
                    <div className="text-slate-600">
                      • 8:00 AM Central (US) · 9:00 AM Eastern<br />
                      • 2:00 PM GMT / London<br />
                      • 3:00 PM WAT (West Africa)
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-blue-900 text-sm">Sunday Celebration & Word</div>
                    <div className="text-slate-600">
                      • 10:15 AM Central (US) · 11:15 AM Eastern<br />
                      • 4:15 PM GMT / London<br />
                      • 5:15 PM WAT (West Africa)
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-blue-900 text-sm">Wednesday Faith Clinic</div>
                    <div className="text-slate-600">
                      • 6:30 PM Central (US) · 7:30 PM Eastern<br />
                      • 12:30 AM GMT / London
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                    <div className="font-bold text-amber-900 text-sm">Monthly Holy Ghost Vigil</div>
                    <div className="text-slate-700">
                      1st Friday of every month: 10:00 PM Central – 3:30 AM
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* On-Demand Broadcasts Library */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif-prose font-bold text-slate-900">
              Past Service Broadcasts & Praise Archives
            </h2>
            <p className="text-xs text-slate-500">
              Select any past Holy Ghost service, communion, or praise ministration to watch in high definition.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map((ch, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => {
                setSelectedChannel(ch);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${ch.youtubeId}/hqdefault.jpg`}
                  alt={ch.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/90 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Tv className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-amber-300 text-[10px] font-bold">
                  {ch.category}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-xs font-bold font-serif-prose text-slate-900 line-clamp-2 group-hover:text-blue-900 transition-colors">
                  {ch.title}
                </h3>
                <div className="text-[11px] text-slate-500 truncate">
                  {ch.speaker}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-900 font-semibold">
                <span>Load in Stream Player</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Living Waters Altar Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
              Join Us In-Person Next Sunday
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-prose font-bold">
              Experience the Tangible Glory in Our Sanctuary
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Watching online is powerful, but nothing compares to gathering in the presence of God with believers in our Victory City Sanctuary.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-105 shrink-0"
          >
            Sanctuary Directions & Parking
          </button>
        </div>
      </section>

    </div>
  );
};
