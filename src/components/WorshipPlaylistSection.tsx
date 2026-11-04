import React, { useState } from 'react';
import { WorshipTrack } from '../types';
import { WORSHIP_PLAYLIST_DATA } from '../data/churchData';
import { 
  Play, 
  Pause, 
  Music, 
  ExternalLink, 
  Sparkles, 
  Heart, 
  Volume2, 
  Radio, 
  Disc, 
  Youtube, 
  BookOpen, 
  Share2, 
  Check, 
  ChevronRight,
  ListMusic
} from 'lucide-react';

interface WorshipPlaylistSectionProps {
  onNavigateToMinistries?: () => void;
}

export const WorshipPlaylistSection: React.FC<WorshipPlaylistSectionProps> = ({
  onNavigateToMinistries
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTrack, setActiveTrack] = useState<WorshipTrack>(WORSHIP_PLAYLIST_DATA[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);
  const [showSpotifyEmbed, setShowSpotifyEmbed] = useState<boolean>(true);

  const categories = ['All', 'Intimate Worship', 'High Praise & Dance', 'Hymns of Faith'];

  const filteredTracks = selectedCategory === 'All'
    ? WORSHIP_PLAYLIST_DATA
    : WORSHIP_PLAYLIST_DATA.filter(t => t.category === selectedCategory);

  const handlePlayTrack = (track: WorshipTrack) => {
    if (activeTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
    }
  };

  const handleCopyTrackLink = (track: WorshipTrack) => {
    navigator.clipboard.writeText(`${track.title} by ${track.artist} — Listen on Fountain of Life Worship Playlist: ${track.spotifyUrl}`);
    setCopiedTrackId(track.id);
    setTimeout(() => setCopiedTrackId(null), 2000);
  };

  return (
    <section id="worship-playlist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 rounded-3xl border border-amber-400/30 p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
        
        {/* Decorative lighting background */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              <span>Sunday Sounds & Spiritual Atmosphere</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif-prose font-bold text-white tracking-tight">
              Fountain Worship Playlist
            </h2>

            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Carry the presence of God from Sunday services into your week. Stream our choir’s favorite praise songs, heartfelt hymns, and deep worship selections directly on Spotify.
            </p>
          </div>

          {/* Spotify Direct Link / Embed View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSpotifyEmbed(!showSpotifyEmbed)}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-2"
            >
              <Disc className="w-4 h-4 text-amber-400" />
              <span>{showSpotifyEmbed ? 'Compact Track List' : 'Show Spotify Embed Player'}</span>
            </button>

            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <Radio className="w-4 h-4" />
              <span>Open in Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="relative z-10 pt-6 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Playlist Content Grid */}
        <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Featured Track Player & Spotify Embed (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900/90 border border-amber-400/40 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-2">
                Featured Worship Track
              </span>

              {/* Cover Art & Title */}
              <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-[16/9] mb-4 group">
                <img
                  src={activeTrack.coverImage}
                  alt={activeTrack.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="inline-block px-2 py-0.5 rounded bg-blue-900/80 text-blue-200 text-[10px] font-bold mb-1">
                    {activeTrack.category}
                  </div>
                  <h3 className="text-lg font-bold font-serif-prose text-white leading-tight">
                    {activeTrack.title}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    {activeTrack.artist}
                  </p>
                </div>
              </div>

              {/* Spotify Official Embed Player */}
              {showSpotifyEmbed && (
                <div className="rounded-xl overflow-hidden border border-white/10 mb-4 bg-black">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${activeTrack.spotifyTrackId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Spotify player for ${activeTrack.title}`}
                    className="w-full"
                  />
                </div>
              )}

              {/* Sunday Service Theme & Lyrics Snippet */}
              <div className="space-y-3 pt-2 text-xs border-t border-white/10">
                <div className="flex items-start gap-2 text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Sunday Theme: </strong>
                    <span>{activeTrack.sundayServiceTheme}</span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 italic text-slate-200 text-xs leading-relaxed">
                  “{activeTrack.keyLyrics}”
                </div>

                <div className="text-[11px] text-amber-300/90 font-medium">
                  {activeTrack.scriptureReference}
                </div>
              </div>

              {/* Action Buttons for Active Track */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/10">
                <a
                  href={activeTrack.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Disc className="w-3.5 h-3.5" />
                  <span>Listen on Spotify</span>
                </a>

                {activeTrack.youtubeUrl && (
                  <a
                    href={activeTrack.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    title="Watch Worship Video on YouTube"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Video</span>
                  </a>
                )}

                <button
                  onClick={() => handleCopyTrackLink(activeTrack)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  title="Copy song details"
                >
                  {copiedTrackId === activeTrack.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4 text-slate-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Track List Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1 px-1">
              <span>Showing {filteredTracks.length} worship anthems</span>
              <span>Click any track to load in player</span>
            </div>

            <div className="space-y-2.5">
              {filteredTracks.map((track) => {
                const isSelected = activeTrack.id === track.id;

                return (
                  <div
                    key={track.id}
                    onClick={() => handlePlayTrack(track)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                      isSelected
                        ? 'bg-blue-900/60 border-amber-400/70 shadow-lg scale-[1.01]'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Left: Thumbnail & Song Info */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                        <img
                          src={track.coverImage}
                          alt={track.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center bg-slate-950/40 ${
                          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        } transition-opacity`}>
                          {isSelected && isPlaying ? (
                            <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />
                          ) : (
                            <Play className="w-5 h-5 text-white fill-current" />
                          )}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold font-serif-prose truncate ${
                            isSelected ? 'text-amber-300' : 'text-white'
                          }`}>
                            {track.title}
                          </h4>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {track.artist}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate hidden sm:block">
                          {track.sundayServiceTheme}
                        </p>
                      </div>
                    </div>

                    {/* Right: Badge, Duration & Quick Links */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-medium hidden md:inline-block">
                        {track.category}
                      </span>

                      <span className="text-xs font-mono text-slate-400">
                        {track.duration}
                      </span>

                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors border border-emerald-500/30"
                        title="Open in Spotify"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Choir Invitation Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-center sm:text-left">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Do you sing or play a musical instrument? Join the <strong>Living Waters Choir & Orchestra</strong>!
                </span>
              </div>

              {onNavigateToMinistries && (
                <button
                  onClick={onNavigateToMinistries}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Join Choir</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
