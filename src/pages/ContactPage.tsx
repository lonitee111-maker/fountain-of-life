import React, { useState } from 'react';
import { PageId } from '../types';
import { CHURCH_INFO } from '../data/churchData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageCircle, 
  Navigation, 
  Sparkles,
  Car
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPlanVisit: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenPlanVisit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'General Inquiries',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeDirections, setActiveDirections] = useState<'driving' | 'parking' | 'transit'>('driving');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please write a message with at least 10 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Fountain of Life Church office! I would like to inquire about your Sunday services and pastoral care.'
  );

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-block">
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-prose font-bold text-white tracking-tight">
            We’d Love to Hear From You
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about visiting, membership, or pastoral counseling? Our administrative and pastoral team is here to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid: Info Cards + Interactive Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Campus Direction Guide (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-serif-prose text-slate-900">
                Church Campus & Office
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Sanctuary Address:</span>
                    <span>{CHURCH_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Phone Lines:</span>
                    <div>Direct / Mobile: <a href={`tel:${CHURCH_INFO.phone}`} className="hover:text-blue-900 font-semibold">{CHURCH_INFO.phone}</a></div>
                    <div className="text-slate-500">WhatsApp / International: {CHURCH_INFO.altPhone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Inquiries:</span>
                    <span>{CHURCH_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Administrative Office Hours:</span>
                    <div>Tuesday – Friday: 9:00 AM – 5:00 PM</div>
                    <div>Saturday: 10:00 AM – 2:00 PM (Counseling by Appointment)</div>
                    <div>Sunday: 7:30 AM – 2:00 PM</div>
                    <div className="text-slate-400">Mondays: Closed for Pastoral Study & Rest</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={`https://wa.me/${CHURCH_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Interactive Directions Guide */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-900" />
                  <span>Campus Directions</span>
                </span>

                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveDirections('driving')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      activeDirections === 'driving' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Driving
                  </button>
                  <button
                    onClick={() => setActiveDirections('parking')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      activeDirections === 'parking' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Parking
                  </button>
                  <button
                    onClick={() => setActiveDirections('transit')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      activeDirections === 'transit' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Transit
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed min-h-[70px]">
                {activeDirections === 'driving' && (
                  <p>
                    Located right off Living Waters Expressway (Exit 14B). Head north for 0.4 miles; the church cathedral will be on your right with prominent royal blue and gold flags and signs.
                  </p>
                )}
                {activeDirections === 'parking' && (
                  <p>
                    Complimentary on-site parking with over 500 spaces. First-time guests, expectant mothers, and senior citizens enjoy reserved front-row spaces near the main glass entrance.
                  </p>
                )}
                {activeDirections === 'transit' && (
                  <p>
                    Victory City Metro Bus Route 42 stops directly at Living Waters Way & Covenant Boulevard every 20 minutes on Sunday mornings.
                  </p>
                )}
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CHURCH_INFO.address)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:underline"
              >
                <span>Open in Google Maps</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </a>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl space-y-6">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-serif-prose font-bold text-slate-900">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  We reply to all inquiries within 24 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif-prose text-slate-900">
                    Message Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Your inquiry has been routed to the <strong>{formData.department}</strong> department. A team coordinator will reach out to <strong>{formData.email}</strong> shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          department: 'General Inquiries',
                          message: ''
                        });
                      }}
                      className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                          errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                          errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0812 793 3781"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Department / Inquiry Type
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none bg-white"
                      >
                        <option value="General Inquiries">General Church Questions</option>
                        <option value="Pastoral Care & Counseling">Pastoral Counseling & Care</option>
                        <option value="New Members Class">New Members & Baptism</option>
                        <option value="Children & Youth">Kingdom Champions / Youth</option>
                        <option value="Choir & Media">Living Waters Choir & Media Arts</option>
                        <option value="Weddings & Dedications">Child Dedications & Weddings</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How may our church family assist you or pray with you today?"
                      className={`w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none ${
                        errors.message ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onOpenPlanVisit}
                      className="text-xs text-amber-700 hover:underline font-semibold"
                    >
                      Planning to visit instead?
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
