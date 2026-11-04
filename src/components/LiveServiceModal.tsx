import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, MessageSquare, BookOpen, Heart, Send, Users, Radio, Sparkles } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface LiveServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToGive: () => void;
}

export const LiveServiceModal: React.FC<LiveServiceModalProps> = ({
  isOpen,
  onClose,
  onNavigateToGive
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');
  
  // Real-time live comments
  const [comments, setComments] = useState<Array<{ id: string; user: string; text: string; time: string; isUser?: boolean }>>([
    { id: '1', user: 'Sister Angela (London)', text: 'Praising God with you all from the UK! The worship is so anointed!', time: 'Just now' },
    { id: '2', user: 'Brother Kevin M.', text: 'Amen! Living waters springing up in our home!', time: '1m ago' },
    { id: '3', user: 'Deaconess Folake', text: 'Hallelujah to the King of Glory! Greeting the pastors from Houston!', time: '2m ago' },
    { id: '4', user: 'Samuel & Family', text: 'Watching with our children in the living room. God bless Fountain of Life!', time: '4m ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        user: 'You (Online Visitor)',
        text: newComment.trim(),
        time: 'Just now',
        isUser: true
      }
    ]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-5xl w-full h-[90vh] max-h-[800px] flex flex-col overflow-hidden text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="live-service-title"
      >
        {/* Top Bar */}
        <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>LIVE BROADCAST</span>
            </span>
            <div className="hidden sm:block">
              <h2 id="live-service-title" className="text-sm font-bold text-white font-serif-prose">
                Sunday Encounter Service — Living Waters Sanctuary
              </h2>
              <span className="text-[11px] text-slate-400">Speaker: Dr. Emmanuel Adeleke · 1,420 Believers Online</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onNavigateToGive();
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Give Live Offering</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close live stream"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video + Sidebar Split Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Main Video Viewport (8 cols) */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative group">
            {/* Simulated Live Stream Feed */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={CHURCH_INFO.images.hero}
                alt="Live Church Service Sanctuary"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isPlaying ? 'opacity-90' : 'opacity-40 brightness-50'
                }`}
              />

              {/* Live Overlay watermark */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span className="font-semibold text-white">Main Sanctuary Feed</span>
                <span className="text-slate-400">· 1080p 60fps</span>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-transform hover:scale-110 shadow-2xl"
                    aria-label="Play broadcast"
                  >
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Video Control Bar */}
            <div className="bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-amber-400 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-amber-400 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <span className="font-mono text-slate-400">LIVE · 01:24:18</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-amber-300 font-mono">
                  Sunday Encounter
                </span>
                <a
                  href={CHURCH_INFO.liveStreamUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white underline underline-offset-2 text-slate-400 hover:text-amber-300 transition-colors"
                >
                  Open on YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Chat & Notes Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 border-l border-slate-800 flex flex-col h-full">
            {/* Sidebar Tabs */}
            <div className="flex items-center border-b border-slate-800 bg-slate-950">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                  activeTab === 'chat'
                    ? 'border-amber-500 text-amber-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Fellowship Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-amber-500 text-amber-400 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Digital Sermon Notes</span>
              </button>
            </div>

            {/* Chat Body */}
            {activeTab === 'chat' ? (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 p-3 overflow-y-auto space-y-3">
                  <div className="text-[11px] text-center text-slate-500 py-1 border-b border-slate-800">
                    Welcome to the Fountain of Life Church Online Family! Share praise reports and prayer points below.
                  </div>

                  {comments.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-lg text-xs ${
                        msg.isUser
                          ? 'bg-blue-900/60 border border-blue-700/60 ml-4 text-white'
                          : 'bg-slate-800/80 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 text-[10px]">
                        <span className={`font-bold ${msg.isUser ? 'text-amber-300' : 'text-slate-300'}`}>
                          {msg.user}
                        </span>
                        <span className="text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendComment} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type an 'Amen' or greeting..."
                    className="flex-1 bg-slate-800 text-white placeholder-slate-400 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg transition-colors shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* Sermon Notes */
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs text-slate-300">
                <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700">
                  <div className="font-bold text-amber-400 font-serif-prose text-sm">
                    Today’s Theme: The Rivers of Uncontainable Favor
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Anchor Scripture: Psalm 102:13; Genesis 39:2-5</div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-white uppercase text-[11px] tracking-wider text-amber-500">
                    Key Insights:
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-300 leading-relaxed">
                    <li>Favor is God’s covenant unction that gives you speed and eliminates human struggle.</li>
                    <li>The set time to favor Zion is right now; do not wait on the world’s permission.</li>
                    <li>Joseph carried divine presence into Potiphar’s house and prosperity followed him everywhere.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800 text-slate-300 italic">
                  “The Lord will make your life a refreshing spring that waters generations.”
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
