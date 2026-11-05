import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChurchLogo } from './ChurchLogo';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Check,
  LogOut,
  Sparkles,
  Heart,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    user,
    profile,
    loading,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    signInWithGoogle,
    signOutUser,
    registerMemberDetails
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'register' | 'profile'>(authModalMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    membershipStatus: 'member' as 'visitor' | 'member' | 'worker' | 'minister',
    department: 'Sanctuary Choir & Worship',
    homeCell: 'Victory Center (Central Zone)',
    baptismStatus: 'Yes, Baptized by Immersion',
    residentialAddress: '',
    emergencyContact: ''
  });

  // Sync state whenever modal opens or authModalMode changes
  useEffect(() => {
    setActiveTab(authModalMode);
    setErrorMessage(null);
    if (profile) {
      setFormData({
        displayName: profile.displayName || user?.displayName || '',
        phone: profile.phone || '',
        membershipStatus: profile.membershipStatus || 'member',
        department: profile.department || 'Sanctuary Choir & Worship',
        homeCell: profile.homeCell || 'Victory Center (Central Zone)',
        baptismStatus: profile.baptismStatus || 'Yes, Baptized by Immersion',
        residentialAddress: '',
        emergencyContact: ''
      });
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        displayName: user.displayName || '',
      }));
    }
  }, [authModalMode, profile, user, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage(null);
      await signInWithGoogle();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to sign in with Google. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.displayName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await registerMemberDetails(
        {
          displayName: formData.displayName.trim(),
          phone: formData.phone.trim(),
          membershipStatus: formData.membershipStatus,
          department: formData.department,
          homeCell: formData.homeCell,
          baptismStatus: formData.baptismStatus
        },
        {
          phone: formData.phone.trim(),
          residentialAddress: formData.residentialAddress.trim(),
          emergencyContact: formData.emergencyContact.trim()
        }
      );
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Could not save member details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-amber-300/40">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg font-bold">
              <User className="w-5 h-5 text-blue-950" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                {activeTab === 'profile'
                  ? 'Church Member Profile'
                  : activeTab === 'register'
                  ? 'Complete Member Registration'
                  : 'Fountain Member Portal'}
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Fountain of Life Church • Living Waters Fellowship
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher if signed in */}
        {user && (
          <div className="bg-slate-100 p-2 flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              My Member Card
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Edit Church Info
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* MODE 1: SIGN IN (Unauthenticated) */}
          {!user && (
            <div className="space-y-6">
              <div className="text-center space-y-2 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 mx-auto flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-8 h-8 text-amber-600" />
                </div>
                <h4 className="text-base font-serif font-bold text-slate-900">
                  Welcome Beloved in Christ
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sign in to your member account to connect with pastoral care, submit personal prayer petitions, and sync your Bible study notes.
                </p>
              </div>

              {/* 1-Click Google Sign In */}
              <div className="space-y-3">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-amber-400 rounded-2xl text-slate-800 font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 group"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{loading ? 'Connecting with Google...' : 'Continue with Google Account'}</span>
                </button>
              </div>

              {/* Membership Benefits List */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Member Portal Privileges</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Church Membership Digital ID</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cloud-Synced Bible Notes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Pastoral Counseling Requests</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Ministry & Volunteer Service</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: REGISTER / EDIT MEMBER PROFILE */}
          {user && activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/70 border border-blue-200">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Member Avatar'}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-300 font-bold flex items-center justify-center text-lg">
                    {user.displayName?.charAt(0) || 'M'}
                  </div>
                )}
                <div>
                  <div className="font-bold text-sm text-blue-950">
                    {user.displayName || 'Church Member'}
                  </div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as recognized in church registry) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="e.g. Brother John Olawale"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number (for pastoral care & emergency calls)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 08127933781"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              {/* Membership Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Membership Fellowship Status
                </label>
                <select
                  value={formData.membershipStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      membershipStatus: e.target.value as any
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                >
                  <option value="visitor">First-Time Visitor / New Convert</option>
                  <option value="member">Full Church Member</option>
                  <option value="worker">Active Church Worker / Volunteer</option>
                  <option value="minister">Ordained Minister / Department Head</option>
                </select>
              </div>

              {/* Department / Serving Ministry */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Serving Ministry / Area of Service
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                >
                  <option value="Sanctuary Choir & Worship">Sanctuary Choir & Living Waters Praise</option>
                  <option value="Ushering & Hospitality Protocol">Ushering & Hospitality Protocol</option>
                  <option value="Media, Sound & Live Broadcast">Media, Technical & Live Broadcast</option>
                  <option value="Children Church & Teens Ministry">Children & Youth Ministry</option>
                  <option value="Intercessory Prayer Band">Intercessory Prayer Warriors</option>
                  <option value="Evangelism & Welfare Outreach">Evangelism & Welfare Ministry</option>
                  <option value="None / Not Currently Serving">Not currently serving</option>
                </select>
              </div>

              {/* Home Cell Fellowship */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  House Fellowship / Cell Center
                </label>
                <input
                  type="text"
                  value={formData.homeCell}
                  onChange={(e) => setFormData({ ...formData, homeCell: e.target.value })}
                  placeholder="e.g. Victory Center (Central Zone)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              {/* Water Baptism */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Water Baptism by Immersion
                </label>
                <select
                  value={formData.baptismStatus}
                  onChange={(e) => setFormData({ ...formData, baptismStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                >
                  <option value="Yes, Baptized by Immersion">Yes, Baptized by Immersion</option>
                  <option value="Scheduled for Next Baptismal Class">Scheduled for Next Baptismal Class</option>
                  <option value="Would like pastoral guidance">Would like pastoral guidance on baptism</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:from-blue-900 hover:to-indigo-900 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Saving to Church Registry...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Save & Update Member Record</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 3: MEMBER IDENTITY CARD (Profile) */}
          {user && activeTab === 'profile' && profile && (
            <div className="space-y-6">
              {/* Virtual Member Card */}
              <div className="relative rounded-3xl p-6 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white border-2 border-amber-400/80 shadow-2xl overflow-hidden ring-4 ring-amber-400/20">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3 mb-6 border-b border-amber-400/30 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                      <Sparkles className="w-5 h-5 text-blue-950" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                        Fountain of Life Church
                      </div>
                      <div className="text-[10px] text-blue-200">
                        Official Digital Member Credential
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                    {profile.membershipStatus}
                  </span>
                </div>

                {/* Member Info */}
                <div className="flex items-center gap-4 mb-6">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={profile.displayName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-300 shadow-md shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 font-bold text-2xl flex items-center justify-center shrink-0">
                      {profile.displayName?.charAt(0) || 'M'}
                    </div>
                  )}

                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-base sm:text-lg font-bold font-serif text-white truncate">
                      {profile.displayName}
                    </h4>
                    <div className="text-xs text-blue-200 truncate">{profile.email}</div>
                    {profile.phone && (
                      <div className="text-xs text-amber-300/90 font-mono">{profile.phone}</div>
                    )}
                  </div>
                </div>

                {/* Card Details Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-amber-400/20 text-xs">
                  <div>
                    <div className="text-[10px] text-blue-300 uppercase font-semibold">
                      Ministry / Department
                    </div>
                    <div className="font-medium text-white truncate">
                      {profile.department || 'General Assembly'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-blue-300 uppercase font-semibold">
                      Cell Fellowship
                    </div>
                    <div className="font-medium text-white truncate">
                      {profile.homeCell || 'Victory Center'}
                    </div>
                  </div>
                </div>

                {/* Member ID Footer */}
                <div className="mt-4 pt-3 border-t border-amber-400/20 flex items-center justify-between text-[11px] text-blue-300 font-mono">
                  <span>ID: FOLC-MEM-{user.uid.slice(0, 8).toUpperCase()}</span>
                  <span className="text-amber-400">ACTIVE COVENANT</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setActiveTab('register')}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-50 text-blue-900 hover:bg-blue-100 transition-colors border border-blue-200"
                >
                  Update Church Details
                </button>

                <button
                  onClick={signOutUser}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors border border-rose-200 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secured via Firebase Cloud Authentication</span>
          </div>

          <button
            onClick={closeAuthModal}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
