import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  Check,
  Clock,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Sun,
  Shield,
  BookOpen,
  Flame,
  Heart,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import {
  PrayerReminderSettings,
  PrayerFocus,
  PRAYER_REMINDER_TEMPLATES,
  getPrayerReminderSettings,
  savePrayerReminderSettings,
  getNotificationPermissionStatus,
  requestPrayerNotificationPermission,
  triggerPrayerNotification,
  playPrayerChime,
  formatTimeAmPm,
  getTimeUntilNextReminder
} from '../utils/prayerReminderUtils';

interface PrayerReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPrayer?: () => void;
}

export const PrayerReminderModal: React.FC<PrayerReminderModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPrayer
}) => {
  const [settings, setSettings] = useState<PrayerReminderSettings>(getPrayerReminderSettings());
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'default' | 'unsupported'>('default');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testingTriggered, setTestingTriggered] = useState(false);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      setSettings(getPrayerReminderSettings());
      setPermissionStatus(getNotificationPermissionStatus());
      setSavedSuccess(false);
      setTestingTriggered(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTemplate = PRAYER_REMINDER_TEMPLATES[settings.reminderFocus] || PRAYER_REMINDER_TEMPLATES.general;
  const timeInfo = getTimeUntilNextReminder(settings.reminderTime);

  const handleToggleEnabled = async () => {
    const nextState = !settings.enabled;

    if (nextState && permissionStatus === 'default') {
      const res = await requestPrayerNotificationPermission();
      setPermissionStatus(res);
    }

    const updated = { ...settings, enabled: nextState };
    setSettings(updated);
    savePrayerReminderSettings(updated);
  };

  const handleRequestPermission = async () => {
    const res = await requestPrayerNotificationPermission();
    setPermissionStatus(res);
    if (res === 'granted') {
      const updated = { ...settings, enabled: true };
      setSettings(updated);
      savePrayerReminderSettings(updated);
      // Play brief chime to confirm
      playPrayerChime();
    }
  };

  const handleSave = () => {
    savePrayerReminderSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  const handleTestNotification = () => {
    setTestingTriggered(true);
    triggerPrayerNotification(
      {
        title: `🔔 [Test] ${currentTemplate.defaultTitle}`,
        message: currentTemplate.defaultMessage,
        scripture: currentTemplate.scripture,
        verseRef: currentTemplate.verseRef,
        isTest: true
      },
      settings
    );
    setTimeout(() => setTestingTriggered(false), 3000);
  };

  const TIME_PRESETS = [
    { label: '5:00 AM', value: '05:00' },
    { label: '5:30 AM', value: '05:30' },
    { label: '6:00 AM', value: '06:00' },
    { label: '6:30 AM', value: '06:30' },
    { label: '7:00 AM', value: '07:00' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-amber-300/40">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg font-bold">
              <Sun className="w-5 h-5 text-blue-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  Daily Morning Prayer Reminders
                </h3>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Start every morning anchored in God’s Word & Covenant Watch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Main Opt-In Switch Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-amber-50/50 rounded-2xl p-4 sm:p-5 border border-blue-200/80 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  Morning Prayer Alarm
                </span>
                {settings.enabled ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="bg-slate-200 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    Off
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an uplifting scripture and gentle morning prayer reminder on your device each day.
              </p>
            </div>

            {/* Switch button */}
            <button
              onClick={handleToggleEnabled}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                settings.enabled ? 'bg-amber-500' : 'bg-slate-300'
              }`}
              aria-label="Toggle Morning Prayer Reminders"
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  settings.enabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Browser Permission Status Card */}
          {permissionStatus === 'default' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <div className="text-xs font-bold text-amber-950">
                  Allow Browser Notifications for Timely Reminders
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  To receive the reminder even when this tab is in the background, please grant notification permission in your browser.
                </p>
                <button
                  onClick={handleRequestPermission}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Allow Notifications</span>
                </button>
              </div>
            </div>
          )}

          {permissionStatus === 'denied' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-900 space-y-1">
                <div className="font-bold">Browser Notifications are Blocked</div>
                <p className="leading-relaxed">
                  Your browser has notifications disabled for this site. To unblock: click the lock or settings icon next to the address bar, set "Notifications" to <strong>Allow</strong>, and refresh the page.
                </p>
                <p className="text-[11px] text-rose-700 font-medium">
                  Note: In-app prayer banners and audible morning chimes will still sound whenever the site is open!
                </p>
              </div>
            </div>
          )}

          {permissionStatus === 'granted' && settings.enabled && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">
                  Device notifications are active • Scheduled {timeInfo.formattedCountdown} at {formatTimeAmPm(settings.reminderTime)}
                </span>
              </div>
            </div>
          )}

          {/* Time Preference */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-900" />
              <span>Select Reminder Time</span>
            </label>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {TIME_PRESETS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSettings({ ...settings, reminderTime: t.value })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    settings.reminderTime === t.value
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}

              {/* Custom Time Picker */}
              <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
                <span className="text-[11px] text-slate-500 font-semibold">Custom:</span>
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => setSettings({ ...settings, reminderTime: e.target.value })}
                  className="bg-transparent text-xs font-bold text-blue-950 focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Prayer Theme / Focus Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Morning Prayer Focus</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(PRAYER_REMINDER_TEMPLATES) as PrayerFocus[]).map((key) => {
                const item = PRAYER_REMINDER_TEMPLATES[key];
                const isSelected = settings.reminderFocus === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSettings({ ...settings, reminderFocus: key })}
                    className={`text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-blue-800 bg-blue-50/70 shadow-xs ring-1 ring-blue-800'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-xs text-blue-950">
                        {item.label}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 font-serif italic line-clamp-1">
                      "{item.scripture}"
                    </div>
                    <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                      {item.verseRef}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview of Selected Prayer Notification */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" />
                <span>Daily Preview at {formatTimeAmPm(settings.reminderTime)}</span>
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                {currentTemplate.shortLabel}
              </span>
            </div>
            <div className="font-bold text-sm text-slate-100">
              {currentTemplate.defaultTitle}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentTemplate.defaultMessage}
            </p>
            <div className="text-[11px] text-amber-300/90 font-serif italic pt-1 border-t border-slate-800">
              "{currentTemplate.scripture}" — {currentTemplate.verseRef}
            </div>
          </div>

          {/* Audio Chime Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={playPrayerChime}
                className="w-8 h-8 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-colors"
                title="Hear sample chime"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Peaceful Sanctuary Bell Chime
                </div>
                <div className="text-[11px] text-slate-500">
                  Plays a serene sacred chime tone with the reminder
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                settings.soundEnabled
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {settings.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{settings.soundEnabled ? 'Chime ON' : 'Muted'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          {/* Test Notification Button */}
          <button
            type="button"
            onClick={handleTestNotification}
            disabled={testingTriggered}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
            title="Fire a test notification now"
          >
            <BellRing className={`w-3.5 h-3.5 ${testingTriggered ? 'text-amber-500 animate-spin' : 'text-blue-900'}`} />
            <span>{testingTriggered ? 'Testing Fired!' : 'Test Notification Now'}</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {onNavigateToPrayer && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToPrayer();
                }}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-blue-900 font-semibold hover:underline mr-2"
              >
                <span>View Prayer Wall</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-indigo-950 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Preferences Saved!</span>
                </>
              ) : (
                <span>Save Reminder Settings</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
