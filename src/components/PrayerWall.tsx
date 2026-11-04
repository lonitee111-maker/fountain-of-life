import React, { useState, useEffect } from 'react';
import { PublicPrayerRequest, PrayerCategory, PrayerEncouragement } from '../types';
import { INITIAL_PRAYER_WALL_REQUESTS } from '../data/churchData';
import {
  Heart,
  Sparkles,
  Send,
  Plus,
  Filter,
  Search,
  CheckCircle2,
  Share2,
  MessageCircle,
  ShieldCheck,
  Flame,
  User,
  MapPin,
  Clock,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ThumbsUp,
  X
} from 'lucide-react';

interface PrayerWallProps {
  onOpenConfidentialForm?: () => void;
}

const CATEGORIES: Array<'All' | PrayerCategory | 'Answered'> = [
  'All',
  'Healing & Health',
  'Family & Marriage',
  'Financial Breakthrough',
  'Spiritual Growth',
  'Academic & Career',
  'Deliverance & Protection',
  'Thanksgiving & Praise',
  'Answered'
];

export const PrayerWall: React.FC<PrayerWallProps> = ({ onOpenConfidentialForm }) => {
  const [requests, setRequests] = useState<PublicPrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'All' | PrayerCategory | 'Answered'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'prayers' | 'needed'>('recent');

  // Track which requests the current user has prayed for (saved in localStorage)
  const [prayedIds, setPrayedIds] = useState<Record<string, boolean>>({});

  // Active expanded encouragement drawers
  const [expandedEncouragements, setExpandedEncouragements] = useState<Record<string, boolean>>({});
  const [encouragementInputs, setEncouragementInputs] = useState<Record<string, string>>({});
  const [encouragementAuthorInputs, setEncouragementAuthorInputs] = useState<Record<string, string>>({});

  // Modal for new public prayer request
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [newRequestForm, setNewRequestForm] = useState({
    author: '',
    isAnonymous: false,
    city: '',
    category: 'Healing & Health' as PrayerCategory,
    title: '',
    details: '',
    scriptureAnchor: '',
    urgency: 'Normal' as 'Normal' | 'Urgent'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Modal for marking as answered
  const [answeringRequestId, setAnsweringRequestId] = useState<string | null>(null);
  const [answeredTestimonyText, setAnsweredTestimonyText] = useState('');

  // Load prayedIds from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('folc_user_prayed_requests');
      if (saved) {
        setPrayedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  }, []);

  // Fetch prayer requests from backend API
  const fetchPrayerRequests = async () => {
    try {
      const res = await fetch('/api/prayer-wall');
      if (res.ok) {
        const data = await res.json();
        if (data.requests) {
          setRequests(data.requests);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend prayer-wall fetch error, using local data:', e);
    }
    // Fallback to initial seed
    setRequests(INITIAL_PRAYER_WALL_REQUESTS);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  // Save prayed state to localStorage
  const markAsPrayedLocally = (id: string) => {
    const updated = { ...prayedIds, [id]: true };
    setPrayedIds(updated);
    try {
      localStorage.setItem('folc_user_prayed_requests', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  };

  // Handle "Praying for this" click
  const handlePrayForRequest = async (id: string) => {
    const wasPrayed = prayedIds[id];
    markAsPrayedLocally(id);

    // Optimistically update prayer count
    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            prayerCount: wasPrayed ? r.prayerCount : r.prayerCount + 1
          };
        }
        return r;
      })
    );

    // Send API update if not already counted
    if (!wasPrayed) {
      try {
        await fetch(`/api/prayer-wall/${id}/pray`, { method: 'POST' });
      } catch (err) {
        console.warn('Error calling pray API:', err);
      }
    }
  };

  // Handle post encouragement
  const handleSendEncouragement = async (id: string) => {
    const message = encouragementInputs[id]?.trim();
    const author = encouragementAuthorInputs[id]?.trim() || 'A Brother/Sister in Christ';

    if (!message) return;

    // Optimistic UI update
    const newEnc: PrayerEncouragement = {
      id: `enc-${Date.now()}`,
      author,
      message,
      createdAt: 'Just now'
    };

    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            encouragements: [...(r.encouragements || []), newEnc]
          };
        }
        return r;
      })
    );

    setEncouragementInputs(prev => ({ ...prev, [id]: '' }));

    try {
      await fetch(`/api/prayer-wall/${id}/encourage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, message })
      });
    } catch (err) {
      console.warn('Error posting encouragement:', err);
    }
  };

  // Handle mark as answered
  const handleMarkAsAnswered = async () => {
    if (!answeringRequestId) return;

    const testimony = answeredTestimonyText.trim() || 'Praise God! The Lord answered this prayer mightily.';

    setRequests(prev =>
      prev.map(r => {
        if (r.id === answeringRequestId) {
          return {
            ...r,
            isAnswered: true,
            answeredTestimony: testimony
          };
        }
        return r;
      })
    );

    const targetId = answeringRequestId;
    setAnsweringRequestId(null);
    setAnsweredTestimonyText('');

    try {
      await fetch(`/api/prayer-wall/${targetId}/answered`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testimony })
      });
    } catch (err) {
      console.warn('Error marking answered:', err);
    }
  };

  // Submit new public prayer request
  const handleSubmitNewRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!newRequestForm.title.trim()) {
      errors.title = 'Please provide a short prayer title.';
    }
    if (!newRequestForm.details.trim() || newRequestForm.details.trim().length < 15) {
      errors.details = 'Please provide some prayer details (at least 15 characters).';
    }
    if (!newRequestForm.isAnonymous && !newRequestForm.author.trim()) {
      errors.author = 'Please provide your name or check "Post Anonymously".';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const payload = {
      author: newRequestForm.isAnonymous ? 'Anonymous Member' : newRequestForm.author.trim(),
      isAnonymous: newRequestForm.isAnonymous,
      city: newRequestForm.city.trim() || 'Victory City',
      category: newRequestForm.category,
      title: newRequestForm.title.trim(),
      details: newRequestForm.details.trim(),
      scriptureAnchor: newRequestForm.scriptureAnchor.trim(),
      urgency: newRequestForm.urgency
    };

    try {
      const res = await fetch('/api/prayer-wall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.request) {
          setRequests(prev => [data.request, ...prev]);
        }
      } else {
        // Fallback local addition
        const localReq: PublicPrayerRequest = {
          id: `pr-${Date.now()}`,
          ...payload,
          prayerCount: 1,
          encouragements: [],
          isAnswered: false,
          createdAt: 'Just now'
        };
        setRequests(prev => [localReq, ...prev]);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setIsNewRequestModalOpen(false);
        setSubmitSuccess(false);
        setNewRequestForm({
          author: '',
          isAnonymous: false,
          city: '',
          category: 'Healing & Health',
          title: '',
          details: '',
          scriptureAnchor: '',
          urgency: 'Normal'
        });
      }, 1500);
    } catch (err) {
      console.warn('Error submitting to prayer wall:', err);
      setIsSubmitting(false);
    }
  };

  // Filter and sort requests
  const filteredRequests = requests.filter(req => {
    // Category filter
    if (selectedCategory === 'Answered') {
      if (!req.isAnswered) return false;
    } else if (selectedCategory !== 'All') {
      if (req.category !== selectedCategory) return false;
    }

    // Keyword search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = req.title.toLowerCase().includes(q);
      const matchesDetails = req.details.toLowerCase().includes(q);
      const matchesAuthor = req.author.toLowerCase().includes(q);
      const matchesCategory = req.category.toLowerCase().includes(q);
      const matchesCity = req.city?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDetails && !matchesAuthor && !matchesCategory && !matchesCity) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === 'prayers') {
      return b.prayerCount - a.prayerCount;
    }
    if (sortBy === 'needed') {
      return a.prayerCount - b.prayerCount;
    }
    // recent
    return 0; // Natural array order is recent first
  });

  // Calculate Community Prayer Stats
  const totalPrayersLifted = requests.reduce((sum, r) => sum + (r.prayerCount || 0), 0);
  const totalAnswered = requests.filter(r => r.isAnswered).length;
  const totalPetitions = requests.length;

  return (
    <div className="space-y-10" id="community-prayer-wall">
      {/* 1. Header Banner & Live Altar Stats */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border-4 border-amber-500/40 shadow-xl relative overflow-hidden">
        {/* Decorative ambient water glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Living Waters Community Prayer Wall</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-prose text-white tracking-tight">
              Stand in Agreement & Lift One Another Up
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              “If two of you agree on earth concerning anything that they ask, it will be done for them by My Father in heaven.” — Matthew 18:19.
              Post your petition, click <strong className="text-amber-300">"Praying for this"</strong> to intercede for a brother or sister, and rejoice in answered prayers!
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setIsNewRequestModalOpen(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Post a Prayer Request</span>
            </button>

            {onOpenConfidentialForm && (
              <button
                onClick={onOpenConfidentialForm}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Submit Confidential to Pastors Only</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Altar Metrics Grid */}
        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-sans">
              {totalPrayersLifted.toLocaleString()}
            </div>
            <div className="text-xs text-blue-200 mt-0.5">
              Prayers Lifted in Agreement
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-sans">
              {totalAnswered}
            </div>
            <div className="text-xs text-blue-200 mt-0.5">
              Answered Miracle Reports
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              {totalPetitions}
            </div>
            <div className="text-xs text-blue-200 mt-0.5">
              Petitions on the Altar
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-sans">
              24/7
            </div>
            <div className="text-xs text-blue-200 mt-0.5">
              Unbroken Prayer Chain
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search, Filter & Sort Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Keyword Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prayers by need (e.g. healing, exam, visa, job, family) or person..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white transition-all"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-800 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="prayers">Most Prayed Over</option>
              <option value="needed">Most Prayers Needed</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {cat === 'Answered' ? '🏆 Answered Miracles' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Prayer Requests Cards Grid */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Gathering petitions from the Altar...</p>
        </div>
      ) : sortedRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedRequests.map((req) => {
            const isUserPrayed = prayedIds[req.id];
            const isExpanded = expandedEncouragements[req.id];
            const encouragementCount = req.encouragements?.length || 0;

            // Category badge styling
            let badgeBg = 'bg-blue-50 text-blue-900 border-blue-200';
            if (req.category === 'Healing & Health') badgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
            if (req.category === 'Financial Breakthrough') badgeBg = 'bg-amber-50 text-amber-900 border-amber-200';
            if (req.category === 'Family & Marriage') badgeBg = 'bg-purple-50 text-purple-900 border-purple-200';
            if (req.category === 'Thanksgiving & Praise') badgeBg = 'bg-emerald-50 text-emerald-900 border-emerald-200';

            return (
              <div
                key={req.id}
                className={`rounded-3xl border bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative ${
                  req.isAnswered
                    ? 'border-emerald-300 ring-2 ring-emerald-400/20'
                    : req.urgency === 'Urgent'
                    ? 'border-amber-400'
                    : 'border-slate-200'
                }`}
              >
                {/* Top highlight bar */}
                <div
                  className={`h-1.5 w-full ${
                    req.isAnswered
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                      : req.urgency === 'Urgent'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : 'bg-gradient-to-r from-blue-700 to-amber-500'
                  }`}
                />

                <div className="p-6 space-y-4">
                  {/* Category and Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${badgeBg}`}>
                      {req.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {req.isAnswered && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Answered Miracle</span>
                        </span>
                      )}

                      {req.urgency === 'Urgent' && !req.isAnswered && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px] uppercase">
                          <AlertCircle className="w-3 h-3 text-rose-600" />
                          <span>Urgent Need</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-serif-prose text-slate-900 leading-snug">
                    {req.title}
                  </h3>

                  {/* Prayer Details Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {req.details}
                  </p>

                  {/* Scripture Anchor (if present) */}
                  {req.scriptureAnchor && (
                    <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-950 italic flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{req.scriptureAnchor}</span>
                    </div>
                  )}

                  {/* Answered Testimony (if present) */}
                  {req.isAnswered && req.answeredTestimony && (
                    <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                      <div className="font-bold text-emerald-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Praise Report / Answered Testimony:</span>
                      </div>
                      <p className="italic">
                        "{req.answeredTestimony}"
                      </p>
                    </div>
                  )}

                  {/* Author and Date Meta */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px] border border-slate-200">
                        {req.isAnonymous ? '?' : req.author.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 block text-xs">
                          {req.author}
                        </span>
                        {req.city && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>{req.city}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400">{req.createdAt}</span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="bg-slate-50/80 border-t border-slate-100 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    
                    {/* "PRAYING FOR THIS" INTERACTIVE BUTTON */}
                    <button
                      onClick={() => handlePrayForRequest(req.id)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                        isUserPrayed
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 font-extrabold shadow-sm scale-[1.01]'
                          : 'bg-white hover:bg-amber-50 text-slate-800 border border-slate-300 hover:border-amber-400'
                      }`}
                      title="Click to stand in agreement and show prayer support"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          isUserPrayed ? 'fill-slate-950 text-slate-950 animate-bounce' : 'text-amber-600'
                        }`}
                      />
                      <span>
                        {isUserPrayed ? '✓ You Prayed for This!' : 'Pray for This'}
                      </span>
                      <span
                        className={`ml-1 text-[11px] px-2 py-0.5 rounded-full ${
                          isUserPrayed ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {req.prayerCount}
                      </span>
                    </button>

                    {/* Word of Encouragement Drawer Toggle */}
                    <button
                      onClick={() =>
                        setExpandedEncouragements(prev => ({
                          ...prev,
                          [req.id]: !prev[req.id]
                        }))
                      }
                      className="px-3 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
                      title="View or leave encouragement"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-blue-700" />
                      <span>{encouragementCount}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 opacity-60" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </button>

                    {/* Mark as Answered Option (if not already answered) */}
                    {!req.isAnswered && (
                      <button
                        onClick={() => {
                          setAnsweringRequestId(req.id);
                          setAnsweredTestimonyText('');
                        }}
                        className="px-2.5 py-2.5 text-slate-400 hover:text-emerald-700 rounded-xl hover:bg-emerald-50 text-xs transition-colors"
                        title="Mark prayer as answered"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    )}

                  </div>

                  {/* Encouragements Section */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-200 space-y-3 animate-in fade-in duration-200">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Words of Encouragement ({encouragementCount})
                      </div>

                      {req.encouragements && req.encouragements.length > 0 ? (
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                          {req.encouragements.map(enc => (
                            <div key={enc.id} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-blue-900">{enc.author}</span>
                                <span className="text-slate-400">{enc.createdAt}</span>
                              </div>
                              <p className="text-slate-700">{enc.message}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          Be the first to leave an uplifting word or scriptural encouragement!
                        </p>
                      )}

                      {/* Add Encouragement Input */}
                      <div className="pt-2 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Your name (optional)"
                            value={encouragementAuthorInputs[req.id] || ''}
                            onChange={(e) =>
                              setEncouragementAuthorInputs(prev => ({
                                ...prev,
                                [req.id]: e.target.value
                              }))
                            }
                            className="w-1/3 p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-800"
                          />
                          <input
                            type="text"
                            placeholder="Write an encouraging scripture or 'Amen'..."
                            value={encouragementInputs[req.id] || ''}
                            onChange={(e) =>
                              setEncouragementInputs(prev => ({
                                ...prev,
                                [req.id]: e.target.value
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSendEncouragement(req.id);
                              }
                            }}
                            className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-800"
                          />
                          <button
                            onClick={() => handleSendEncouragement(req.id)}
                            disabled={!encouragementInputs[req.id]?.trim()}
                            className="px-3 py-2 bg-blue-900 hover:bg-blue-950 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-colors shrink-0"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-4">
          <Heart className="w-12 h-12 text-amber-500 mx-auto opacity-70" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-serif-prose">
              No prayer requests found for this filter
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first to post a prayer petition or explore another category.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. MODAL: POST A PUBLIC PRAYER REQUEST */}
      {isNewRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-950 to-slate-900 text-white">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>Public Prayer Wall</span>
                </div>
                <h3 className="text-xl font-bold font-serif-prose">
                  Post Your Prayer Request
                </h3>
                <p className="text-xs text-blue-200">
                  Church members and prayer warriors worldwide will stand with you.
                </p>
              </div>

              <button
                onClick={() => setIsNewRequestModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {submitSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-serif-prose text-slate-900">
                    Prayer Placed on the Community Wall!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Brethren are standing in faith with you. You will surely testify!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitNewRequest} className="space-y-4">
                  {/* Anonymous Toggle */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Post Anonymously?</span>
                      <span className="text-[11px] text-slate-500">Your name will be hidden from the public wall.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={newRequestForm.isAnonymous}
                      onChange={(e) =>
                        setNewRequestForm({ ...newRequestForm, isAnonymous: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-900 rounded focus:ring-blue-800"
                    />
                  </div>

                  {/* Author Name (if not anonymous) */}
                  {!newRequestForm.isAnonymous && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={newRequestForm.author}
                        onChange={(e) =>
                          setNewRequestForm({ ...newRequestForm, author: e.target.value })
                        }
                        placeholder="e.g. Sister Grace O. or Brother Emmanuel"
                        className={`w-full p-2.5 rounded-xl border text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 ${
                          formErrors.author ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                        }`}
                      />
                      {formErrors.author && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.author}</p>
                      )}
                    </div>
                  )}

                  {/* City / Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City or Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={newRequestForm.city}
                      onChange={(e) =>
                        setNewRequestForm({ ...newRequestForm, city: e.target.value })
                      }
                      placeholder="e.g. Victory City, Lagos, London, Houston"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Prayer Category *
                    </label>
                    <select
                      value={newRequestForm.category}
                      onChange={(e) =>
                        setNewRequestForm({ ...newRequestForm, category: e.target.value as any })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                    >
                      <option value="Healing & Health">Divine Healing & Health</option>
                      <option value="Family & Marriage">Family & Marriage Restoration</option>
                      <option value="Financial Breakthrough">Financial & Career Open Doors</option>
                      <option value="Spiritual Growth">Spiritual Infilling & Guidance</option>
                      <option value="Academic & Career">Academic Exams & Career Favor</option>
                      <option value="Deliverance & Protection">Deliverance & Protection</option>
                      <option value="Thanksgiving & Praise">Thanksgiving / Praise Report</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Prayer Title *
                    </label>
                    <input
                      type="text"
                      value={newRequestForm.title}
                      onChange={(e) =>
                        setNewRequestForm({ ...newRequestForm, title: e.target.value })
                      }
                      placeholder="e.g. Speedy recovery for my mother after medical treatment"
                      className={`w-full p-2.5 rounded-xl border text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 ${
                        formErrors.title ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                    {formErrors.title && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.title}</p>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Prayer Request Details *
                    </label>
                    <textarea
                      rows={3}
                      value={newRequestForm.details}
                      onChange={(e) =>
                        setNewRequestForm({ ...newRequestForm, details: e.target.value })
                      }
                      placeholder="Describe what you are believing God for so brethren can stand in specific agreement..."
                      className={`w-full p-2.5 rounded-xl border text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 resize-none ${
                        formErrors.details ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                    {formErrors.details && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.details}</p>
                    )}
                  </div>

                  {/* Scripture Anchor */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Scripture You Are Standing On (Optional)
                    </label>
                    <input
                      type="text"
                      value={newRequestForm.scriptureAnchor}
                      onChange={(e) =>
                        setNewRequestForm({ ...newRequestForm, scriptureAnchor: e.target.value })
                      }
                      placeholder="e.g. Jeremiah 30:17 or Philippians 4:19"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  {/* Urgency */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="urgentNeed"
                      checked={newRequestForm.urgency === 'Urgent'}
                      onChange={(e) =>
                        setNewRequestForm({
                          ...newRequestForm,
                          urgency: e.target.checked ? 'Urgent' : 'Normal'
                        })
                      }
                      className="w-4 h-4 text-rose-600 rounded"
                    />
                    <label htmlFor="urgentNeed" className="text-xs text-slate-700 cursor-pointer font-medium">
                      This is an urgent medical or life-crisis need requiring rapid prayer
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-amber-400" />
                          <span>Publish to Prayer Wall</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: MARK PRAYER AS ANSWERED / SHARE PRAISE REPORT */}
      {answeringRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Celebrate an Answered Prayer!</span>
              </div>
              <button
                onClick={() => setAnsweringRequestId(null)}
                className="p-1 text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Has the Lord turned this petition into a testimony? Share a brief praise report to encourage the faith of others!
            </p>

            <textarea
              rows={3}
              value={answeredTestimonyText}
              onChange={(e) => setAnsweredTestimonyText(e.target.value)}
              placeholder="e.g. Glory to God! The doctor gave an all-clear report today..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setAnsweringRequestId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkAsAnswered}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Answered</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
