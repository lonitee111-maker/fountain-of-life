import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, User, MapPin } from 'lucide-react';

interface TestimonyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTestimony?: (testimony: {
    author: string;
    city: string;
    title: string;
    category: 'Healing' | 'Breakthrough' | 'Family' | 'Provision' | 'Salvation';
    story: string;
  }) => void;
}

export const TestimonyModal: React.FC<TestimonyModalProps> = ({ isOpen, onClose, onAddTestimony }) => {
  const [formData, setFormData] = useState({
    author: '',
    city: '',
    title: '',
    category: 'Breakthrough' as const,
    story: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.title.trim() || formData.story.trim().length < 20) {
      setError('Please provide your name, a title, and at least 20 characters describing what God has done.');
      return;
    }
    setError('');
    if (onAddTestimony) {
      onAddTestimony(formData);
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimony-title"
      >
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 relative rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Overcoming by the Blood & the Word of Our Testimony</span>
          </div>
          <h2 id="testimony-title" className="text-2xl font-serif-prose font-bold text-white">
            Share Your Testimony
          </h2>
          <p className="text-slate-300 text-xs mt-1">
            Has God done something miraculous in your life, health, or family? Give Him the praise!
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif-prose text-slate-900">
                Praise the Lord, {formData.author}!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your testimony of <strong>“{formData.title}”</strong> has been recorded to encourage the body of Christ. It will be reviewed by the pastoral team and featured on our praise wall.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="e.g. Sister Deborah O."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Victory City / London"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category of Miracle
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                  >
                    <option value="Healing">Divine Healing & Health</option>
                    <option value="Breakthrough">Career / Business Breakthrough</option>
                    <option value="Family">Family, Marriage & Childbearing</option>
                    <option value="Provision">Supernatural Financial Provision</option>
                    <option value="Salvation">Salvation & Deliverance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Testimony Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Miracle Job After 6 Months"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tell Your Story (What did God do?) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Share details of the prayer point, how God intervened, and scripture you stood upon..."
                  className="w-full p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submit to Praise Wall</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
