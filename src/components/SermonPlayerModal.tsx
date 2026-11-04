import React, { useState } from 'react';
import { X, Play, Pause, RotateCcw, RotateCw, Volume2, Download, Share2, BookOpen, Check, Sparkles } from 'lucide-react';
import { Sermon } from '../types';

interface SermonPlayerModalProps {
  sermon: Sermon | null;
  onClose: () => void;
}

export const SermonPlayerModal: React.FC<SermonPlayerModalProps> = ({ sermon, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [progress, setProgress] = useState(32); // percentage progress simulation

  if (!sermon) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Listen to "${sermon.title}" by ${sermon.speaker} at Fountain of Life Church! Scripture: ${sermon.scripture}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadNotes = () => {
    const textContent = `FOUNTAIN OF LIFE CHURCH\nSERMON STUDY NOTES\n\nTitle: ${sermon.title}\nSpeaker: ${sermon.speaker} (${sermon.speakerRole})\nDate: ${sermon.date}\nSeries: ${sermon.series}\nScripture: ${sermon.scripture}\n\nDESCRIPTION:\n${sermon.description}\n\nKEY TAKEAWAY:\n${sermon.keyTakeaway}\n\nCORE STUDY POINTS:\n${sermon.notes.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\n© Fountain of Life Church - Living Waters, Transforming Lives`;
    
    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${sermon.title.replace(/\s+/g, '_')}_Study_Notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sermon-modal-title"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 relative rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close sermon player"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <span>Series: {sermon.series}</span>
            <span>·</span>
            <span>{sermon.category}</span>
          </div>

          <h2 id="sermon-modal-title" className="text-2xl sm:text-3xl font-serif-prose font-bold text-white mb-2 leading-tight">
            {sermon.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="font-semibold text-white">{sermon.speaker}</span>
            <span>·</span>
            <span>{sermon.date}</span>
            <span>·</span>
            <span className="text-amber-300 font-medium">Scripture: {sermon.scripture}</span>
            <span>·</span>
            <span>{sermon.duration}</span>
          </div>
        </div>

        {/* Audio Player Controls */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800">
          <div className="max-w-xl mx-auto space-y-3">
            {/* Scrubber Bar */}
            <div className="space-y-1">
              <div 
                className="w-full bg-slate-700 h-2 rounded-full cursor-pointer relative overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPct = Math.round((clickX / rect.width) * 100);
                  setProgress(Math.max(0, Math.min(100, newPct)));
                }}
              >
                <div 
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>16:42</span>
                <span>{sermon.duration}</span>
              </div>
            </div>

            {/* Playback Buttons */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setProgress((p) => Math.max(0, p - 5))}
                className="text-slate-400 hover:text-white transition-colors"
                title="Rewind 15 seconds"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-lg"
                aria-label={isPlaying ? 'Pause sermon' : 'Play sermon'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
              </button>

              <button
                onClick={() => setProgress((p) => Math.min(100, p + 5))}
                className="text-slate-400 hover:text-white transition-colors"
                title="Fast forward 15 seconds"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sermon Details & Study Notes */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">
              Message Synopsis
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm">
              {sermon.description}
            </p>
          </div>

          {/* Golden Key Takeaway Card */}
          <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Covenant Key Takeaway</span>
            </div>
            <p className="text-slate-800 text-sm font-serif-prose italic">
              “{sermon.keyTakeaway}”
            </p>
          </div>

          {/* Study Outline Points */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-900" />
              <span>Biblical Study Framework</span>
            </h3>
            <div className="space-y-2">
              {sermon.notes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadNotes}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Notes Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>Download Study Notes (.txt)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-600" />
                    <span>Share Sermon</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
