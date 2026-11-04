import React, { useState } from 'react';
import { X, CheckCircle, MapPin, Calendar, Clock, Car, Sparkles, User, Mail, Phone, Users } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '10:15 AM (Celebration & Word)',
    adults: '1',
    kids: '0',
    needsChildcare: false,
    specialNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide your name and email so our hospitality team can welcome you.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '10:15 AM (Celebration & Word)',
      adults: '1',
      kids: '0',
      needsChildcare: false,
      specialNotes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-visit-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 relative rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We’ve Saved a Seat For You</span>
          </div>
          <h2 id="plan-visit-title" className="text-2xl sm:text-3xl font-serif-prose font-bold text-white">
            Plan Your Sunday Visit
          </h2>
          <p className="text-slate-200 text-sm mt-1">
            Visiting a new church can be intimidating. Let us roll out the red carpet for you and your family!
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-serif-prose text-slate-900">
                You’re on the VIP Guest List, {formData.name}!
              </h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Our Hospitality Host Team has been notified. When you arrive this Sunday for the{' '}
                <strong className="text-blue-900">{formData.service}</strong>, pull into the{' '}
                <strong>Reserved Guest Parking</strong> at the front entrance where our greeters will give you a VIP welcome gift!
              </p>

              {/* Guest Confirmation Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-800">{formData.service}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Party Size:</span>
                  <span className="font-semibold text-slate-800">
                    {formData.adults} Adult(s) {parseInt(formData.kids) > 0 ? `· ${formData.kids} Child(ren)` : ''}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Sanctuary Address:</span>
                  <span className="font-semibold text-slate-800 text-right">{CHURCH_INFO.address}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Host Contact:</span>
                  <span className="font-semibold text-blue-900">{CHURCH_INFO.phone}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CHURCH_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Get Driving Directions</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* What to Expect 3-pillar strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Reserved Parking</span>
                    <span>Front-row spots for all first-time guests.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Come As You Are</span>
                    <span>Casual or dressy, you are warmly welcomed.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Children’s Church</span>
                    <span>Secure, background-checked kid zones.</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 text-rose-700 text-sm rounded-lg border border-rose-200">
                  {error}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Michael & Sarah Johnson"
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone (For Welcome SMS & Directions)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Which Service Will You Attend?
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                    >
                      <option value="8:00 AM (Early Dew Encounter)">8:00 AM (Early Dew Encounter)</option>
                      <option value="10:15 AM (Celebration & Word)">10:15 AM (Celebration & Word)</option>
                      <option value="Wednesday 6:30 PM (Faith Clinic)">Wednesday 6:30 PM (Faith Clinic)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Adults and Kids count */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Adults
                  </label>
                  <select
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4+">4+ People</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Children
                  </label>
                  <select
                    value={formData.kids}
                    onChange={(e) => setFormData({ ...formData, kids: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                  >
                    <option value="0">0 (No Kids)</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3+">3+ Children</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Any questions or special assistance needed?
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Wheelchair ramp, questions about children's church, or prayer request..."
                  className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center gap-2"
                >
                  <span>Confirm My Visit</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
