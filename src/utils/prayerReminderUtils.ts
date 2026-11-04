/**
 * Daily Morning Prayer Reminders Utility for Fountain of Life Church
 * Handles browser notification permissions, scheduling checks, audio chimes,
 * local persistence, and in-app fallback toasts.
 */

export type PrayerFocus = 'general' | 'devotional' | 'deliverance' | 'victory' | 'family';

export interface PrayerReminderSettings {
  enabled: boolean;
  reminderTime: string; // '06:00' format (24-hr)
  reminderFocus: PrayerFocus;
  soundEnabled: boolean;
  lastNotifiedDate?: string; // YYYY-MM-DD
  customName?: string;
}

export interface PrayerReminderTemplate {
  focus: PrayerFocus;
  label: string;
  shortLabel: string;
  defaultTitle: string;
  defaultMessage: string;
  scripture: string;
  verseRef: string;
}

export const PRAYER_REMINDER_TEMPLATES: Record<PrayerFocus, PrayerReminderTemplate> = {
  general: {
    focus: 'general',
    label: 'Covenant Morning Watch',
    shortLabel: 'Morning Watch',
    defaultTitle: '🌅 Covenant Morning Watch — Fountain of Life',
    defaultMessage: 'Awake, my soul! Early will I seek You. Start your day under God’s canopy of grace.',
    scripture: 'O God, You are my God; early will I seek You; my soul thirsts for You in a dry and thirsty land.',
    verseRef: 'Psalm 63:1'
  },
  devotional: {
    focus: 'devotional',
    label: 'Daily Living Waters Bread',
    shortLabel: 'Devotional',
    defaultTitle: '📖 Living Waters Devotional — Fountain Bread',
    defaultMessage: 'Drink from the well of eternal life before starting your day. God has a word for you.',
    scripture: 'Whoever drinks of the water that I shall give him will never thirst; it will become a fountain of water.',
    verseRef: 'John 4:14'
  },
  deliverance: {
    focus: 'deliverance',
    label: 'Divine Preservation & Shield',
    shortLabel: 'Protection',
    defaultTitle: '🛡️ Morning Preservation & Divine Shield',
    defaultMessage: 'The Lord preserves your going out and your coming in today. No weapon formed against you shall prosper.',
    scripture: 'The Lord shall preserve your going out and your coming in from this time forth, and even forevermore.',
    verseRef: 'Psalm 121:8'
  },
  victory: {
    focus: 'victory',
    label: 'Breakthrough & Supernatural Favor',
    shortLabel: 'Victory',
    defaultTitle: '🔥 Covenant Victory & Favor Decree',
    defaultMessage: 'Step out today with the praise of God in your mouth. You are more than a conqueror through Christ Jesus.',
    scripture: 'This is the day the Lord has made; we will rejoice and be glad in it.',
    verseRef: 'Psalm 118:24'
  },
  family: {
    focus: 'family',
    label: 'Family & Household Blessing',
    shortLabel: 'Family',
    defaultTitle: '👨‍👩‍👧 Family Covering & Peace Prayer',
    defaultMessage: 'Sanctify your household in prayer today. God’s covenant of peace rests upon you and your children.',
    scripture: 'As for me and my house, we will serve the Lord.',
    verseRef: 'Joshua 24:15'
  }
};

export const DEFAULT_PRAYER_SETTINGS: PrayerReminderSettings = {
  enabled: false,
  reminderTime: '06:00',
  reminderFocus: 'general',
  soundEnabled: true
};

const STORAGE_KEY = 'folc_prayer_reminder_settings';

/**
 * Reads prayer reminder settings from localStorage safely
 */
export function getPrayerReminderSettings(): PrayerReminderSettings {
  if (typeof window === 'undefined') return DEFAULT_PRAYER_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRAYER_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PRAYER_SETTINGS,
      ...parsed
    };
  } catch (e) {
    console.warn('Failed to read prayer reminder settings:', e);
    return DEFAULT_PRAYER_SETTINGS;
  }
}

/**
 * Saves prayer reminder settings to localStorage and dispatches sync event
 */
export function savePrayerReminderSettings(settings: PrayerReminderSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(
      new CustomEvent('folc:prayer-reminder-updated', { detail: settings })
    );
  } catch (e) {
    console.warn('Failed to save prayer reminder settings:', e);
  }
}

/**
 * Checks browser notification permission status
 */
export function getNotificationPermissionStatus(): 'granted' | 'denied' | 'default' | 'unsupported' {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

/**
 * Requests browser permission for notifications
 */
export async function requestPrayerNotificationPermission(): Promise<'granted' | 'denied' | 'default' | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
    return Notification.permission;
  }
}

/**
 * Plays a peaceful, sacred morning chime tone using the Web Audio API
 */
export function playPrayerChime(): void {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Harmonious chord: 528Hz, 660Hz, 792Hz, 1056Hz
    const freqs = [528, 660, 792, 1056];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 2.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 2.5);
    });
  } catch (e) {
    console.warn('Web Audio chime playback not available:', e);
  }
}

export interface TriggerNotificationPayload {
  title?: string;
  message?: string;
  scripture?: string;
  verseRef?: string;
  isTest?: boolean;
}

/**
 * Triggers a prayer notification via Browser Notification API (if permitted),
 * chime sound (if enabled), and in-app toast event.
 */
export function triggerPrayerNotification(
  payload?: TriggerNotificationPayload,
  settings?: PrayerReminderSettings
): boolean {
  const currentSettings = settings || getPrayerReminderSettings();
  const template = PRAYER_REMINDER_TEMPLATES[currentSettings.reminderFocus] || PRAYER_REMINDER_TEMPLATES.general;

  const title = payload?.title || template.defaultTitle;
  const message = payload?.message || template.defaultMessage;
  const scripture = payload?.scripture || template.scripture;
  const verseRef = payload?.verseRef || template.verseRef;
  const isTest = payload?.isTest || false;

  // 1. Play gentle audio chime if enabled
  if (currentSettings.soundEnabled) {
    playPrayerChime();
  }

  // 2. Browser native notification if permission granted
  let browserNotifFired = false;
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      const notif = new Notification(title, {
        body: `${message}\n\n"${scripture}" — ${verseRef}`,
        icon: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=192&q=80',
        badge: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=96&q=80',
        tag: 'folc-morning-prayer',
        requireInteraction: false
      });

      notif.onclick = () => {
        window.focus();
        window.location.hash = 'prayer';
        notif.close();
      };

      browserNotifFired = true;
    } catch (e) {
      console.warn('Failed to fire native notification:', e);
    }
  }

  // 3. Always dispatch in-app event for guaranteed visibility in active tabs
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('folc:show-prayer-toast', {
        detail: {
          title,
          message,
          scripture,
          verseRef,
          isTest,
          browserNotifFired
        }
      })
    );
  }

  return browserNotifFired;
}

/**
 * Formats a 24-hr time string ('06:00') into friendly 12-hr format ('6:00 AM')
 */
export function formatTimeAmPm(timeStr: string): string {
  if (!timeStr || !timeStr.includes(':')) return '6:00 AM';
  const [hStr, mStr] = timeStr.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);

  if (isNaN(h) || isNaN(m)) return '6:00 AM';

  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m < 10 ? `0${m}` : `${m}`;

  return `${displayH}:${displayM} ${period}`;
}

/**
 * Computes how much time remains until the next prayer reminder
 */
export function getTimeUntilNextReminder(reminderTime: string, now = new Date()): {
  hours: number;
  minutes: number;
  isTomorrow: boolean;
  formattedCountdown: string;
} {
  const [hStr, mStr] = (reminderTime || '06:00').split(':');
  const targetHour = parseInt(hStr, 10) || 6;
  const targetMinute = parseInt(mStr, 10) || 0;

  const targetDate = new Date(now);
  targetDate.setHours(targetHour, targetMinute, 0, 0);

  let isTomorrow = false;
  if (targetDate.getTime() <= now.getTime()) {
    targetDate.setDate(targetDate.getDate() + 1);
    isTomorrow = true;
  }

  const diffMs = targetDate.getTime() - now.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  const countdownParts: string[] = [];
  if (hours > 0) countdownParts.push(`${hours}h`);
  countdownParts.push(`${minutes}m`);

  const formattedCountdown = `in ${countdownParts.join(' ')}${isTomorrow ? ' (tomorrow)' : ' (today)'}`;

  return {
    hours,
    minutes,
    isTomorrow,
    formattedCountdown
  };
}

/**
 * Checks if current local time matches the reminder time and fires if due today
 */
export function checkAndFirePrayerReminder(): boolean {
  if (typeof window === 'undefined') return false;

  const settings = getPrayerReminderSettings();
  if (!settings.enabled) return false;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const [tHour, tMinute] = settings.reminderTime.split(':').map((v) => parseInt(v, 10));
  if (currentHour !== tHour || currentMinute !== tMinute) {
    return false;
  }

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  if (settings.lastNotifiedDate === todayStr) {
    return false; // Already fired today
  }

  // Update lastNotifiedDate
  settings.lastNotifiedDate = todayStr;
  savePrayerReminderSettings(settings);

  // Trigger notification
  triggerPrayerNotification(undefined, settings);
  return true;
}
