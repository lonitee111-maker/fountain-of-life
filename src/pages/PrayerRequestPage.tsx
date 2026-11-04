import React, { useState } from 'react';
import { PageId } from '../types';
import { CHURCH_INFO } from '../data/churchData';
import { validatePrayerRequest } from '../utils/churchUtils';
import { PrayerWall } from '../components/PrayerWall';
import { 
  Heart, 
  Send, 
  CheckCircle, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  User, 
  Mail, 
  MessageSquare,
  Lock,
  Clock,
  Flame,
  Users,
  Bell,
  Sun
} from 'lucide-react';

interface PrayerRequestPageProps {
  onNavigate: (page: PageId) => void;
}

export const PrayerRequestPage: React.FC<PrayerRequestPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'wall' | 'confidential'>('wall');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    prayerSubject: 'Healing & Health',
    details: '',
    confidentiality: 'pastor-only', // 'pastor-only' | 'prayer-chain'
    wantsCall: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validatePrayerRequest({
      fullName: formData.fullName,
      email: formData.email,
      prayerSubject: formData.prayerSubject,
      details: formData.details
    });

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      prayerSubject: 'Healing & Health',
      details: '',
      confidentiality: 'pastor-only',
      wantsCall: false
    });
  };

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            24/7 Intercessory Altar
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            We Are Standing in Faith With You
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            “Call to Me, and I will answer you, and show you great and mighty things, which you do not know.” — Jeremiah 33:3
          </p>
        </div>
      </section>

      {/* Morning Prayer Reminder Ribbon */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/15 via-blue-900/10 to-amber-500/15 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow-xs">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                  Daily Morning Prayer Alarm & Reminders
                </h3>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Wake Up in Grace
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Opt-in to receive scheduled scripture verses and audible morning watch chimes each morning at 6:00 AM.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('folc:open-prayer-reminder'))}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-indigo-950 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-105 shrink-0 flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Setup Morning Reminder</span>
          </button>
        </div>
      </section>

      {/* Mode Navigation Tabs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-col sm:flex-row gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab('wall')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'wall'
                ? 'bg-blue-900 text-white shadow-md'
                : 'text-slate-700 hover:text-blue-900 hover:bg-white/60'
            }`}
          >
            <Flame className={`w-4 h-4 ${activeTab === 'wall' ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            <span>Community Prayer Wall</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold ml-1">
              Live Altar
            </span>
          </button>

          <button
            onClick={() => setActiveTab('confidential')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'confidential'
                ? 'bg-blue-900 text-white shadow-md'
                : 'text-slate-700 hover:text-blue-900 hover:bg-white/60'
            }`}
          >
            <Lock className="w-4 h-4 text-amber-500" />
            <span>Confidential Request to Senior Pastors</span>
          </button>
        </div>
      </section>

      {/* Tab 1: Community Prayer Wall */}
      {activeTab === 'wall' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PrayerWall onOpenConfidentialForm={() => setActiveTab('confidential')} />
        </section>
      )}

      {/* Tab 2: Confidential Pastoral Prayer Request */}
      {activeTab === 'confidential' && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
          
          {/* Urgent Prayer Hotline Card */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl border border-blue-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-white font-serif-prose text-base">
                  24-Hour Urgent Prayer Line
                </div>
                <p className="text-xs text-slate-300">
                  Are you facing a sudden medical or spiritual crisis? Our pastors are on call.
                </p>
              </div>
            </div>

            <a
              href={`tel:${CHURCH_INFO.phone}`}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-transform hover:scale-105 shrink-0 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call {CHURCH_INFO.phone}</span>
            </a>
          </div>

          {/* Prayer Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-lg mx-auto animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900">
                Your Prayer Has Been Placed on the Altar
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Beloved <strong>{formData.fullName}</strong>, our Pastoral Directorate and Intercessory Prayer Warriors have received your petition regarding <strong>{formData.prayerSubject}</strong>. We stand in agreement upon Matthew 18:19 that God is releasing your miracle!
              </p>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 italic">
                “Now this is the confidence that we have in Him, that if we ask anything according to His will, He hears us.” — 1 John 5:14
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-colors"
                >
                  Submit Another Prayer Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif-prose font-bold text-slate-900">
                  Submit Your Prayer Request
                </h2>
                <p className="text-xs text-slate-500">
                  Please share your heart with us. Every prayer request is prayed over individually by name.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Sister Grace Johnson"
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="grace@example.com"
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                        errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject / Area of Need *
                  </label>
                  <select
                    value={formData.prayerSubject}
                    onChange={(e) => setFormData({ ...formData, prayerSubject: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                  >
                    <option value="Healing & Health">Divine Healing & Health</option>
                    <option value="Family & Marriage">Marriage & Family Restoration</option>
                    <option value="Financial Breakthrough">Financial & Career Breakthrough</option>
                    <option value="Salvation of Loved Ones">Salvation of Children / Loved Ones</option>
                    <option value="Spiritual Deliverance">Deliverance & Freedom from Addiction</option>
                    <option value="Guidance & Peace">Guidance, Wisdom & Mental Peace</option>
                    <option value="Thanksgiving">Thanksgiving / Praise Report</option>
                  </select>
                </div>
              </div>

              {/* Prayer Request Details */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prayer Request Details *
                </label>
                <textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Share details of the prayer point, health diagnosis, situation, or names of family members..."
                  className={`w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                    errors.details ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.details && <p className="text-xs text-rose-500 mt-1">{errors.details}</p>}
              </div>

              {/* Confidentiality Toggle */}
              <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">
                  Confidentiality Level:
                </span>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="confidentiality"
                      value="pastor-only"
                      checked={formData.confidentiality === 'pastor-only'}
                      onChange={() => setFormData({ ...formData, confidentiality: 'pastor-only' })}
                      className="text-blue-900 focus:ring-blue-800"
                    />
                    <span className="font-semibold">Confidential — Senior Pastors Only</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="confidentiality"
                      value="prayer-chain"
                      checked={formData.confidentiality === 'prayer-chain'}
                      onChange={() => setFormData({ ...formData, confidentiality: 'prayer-chain' })}
                      className="text-blue-900 focus:ring-blue-800"
                    />
                    <span>Full Church Intercessory Team (24/7 Chain)</span>
                  </label>
                </div>
              </div>

              {/* Pastoral Call Request */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wantsCall"
                  checked={formData.wantsCall}
                  onChange={(e) => setFormData({ ...formData, wantsCall: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-800 w-4 h-4"
                />
                <label htmlFor="wantsCall" className="text-xs text-slate-700 cursor-pointer">
                  I would appreciate a pastoral follow-up phone call or prayer session.
                </label>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Submitting to Altar...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Submit Prayer Request to the Altar</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </section>
      )}

      {/* Faith Promises Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest font-sans">
              Divine Promises
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-prose font-bold text-slate-900">
              God Hears and Answers Prayer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-blue-900 text-sm block">Matthew 18:19</span>
              <p className="italic leading-relaxed">
                “Again I say to you that if two of you agree on earth concerning anything that they ask, it will be done for them by My Father in heaven.”
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-blue-900 text-sm block">James 5:16</span>
              <p className="italic leading-relaxed">
                “Confess your trespasses to one another, and pray for one another, that you may be healed. The effective, fervent prayer of a righteous man avails much.”
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-blue-900 text-sm block">Mark 11:24</span>
              <p className="italic leading-relaxed">
                “Therefore I say to you, whatever things you ask when you pray, believe that you receive them, and you will have them.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
