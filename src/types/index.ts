export type PageId =
  | 'home'
  | 'about'
  | 'vision-mission'
  | 'leadership'
  | 'ministries'
  | 'sermons'
  | 'events'
  | 'give'
  | 'prayer'
  | 'contact'
  | 'live'
  | 'bible';

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  date: string;
  scripture: string;
  series: string;
  category: 'Faith' | 'Grace' | 'Prayer' | 'Spiritual Growth' | 'Family' | 'Breakthrough' | 'Finances';
  duration: string;
  description: string;
  videoEmbedId?: string; // YouTube video ID or simulation
  audioUrl?: string;
  notes: string[];
  keyTakeaway: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  category: 'Sunday Service' | 'Mid-Week' | 'Revival' | 'Youth' | 'Community' | 'Women' | 'Men';
  description: string;
  featured?: boolean;
  speaker?: string;
  registrationRequired?: boolean;
  coordinator?: string;
}

export interface Ministry {
  id: string;
  name: string;
  targetAudience: string;
  tagline: string;
  description: string;
  meetingSchedule: string;
  leaderName: string;
  leaderTitle: string;
  scriptureReference: string;
  scriptureText: string;
  highlights: string[];
  contactEmail: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  favoriteScripture: string;
  email: string;
  imageUrl?: string;
  isSeniorPastor?: boolean;
}

export interface Testimony {
  id: string;
  author: string;
  city: string;
  title: string;
  category: 'Healing' | 'Breakthrough' | 'Family' | 'Provision' | 'Salvation';
  story: string;
  date: string;
  verified: boolean;
}

export interface DailyVerse {
  reference: string;
  text: string;
  translation: string;
  reflection: string;
  prayer: string;
}

export interface DailyDevotional {
  id: string;
  dayOfWeek: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  title: string;
  theme: string;
  scriptureRef: string;
  scriptureText: string;
  translation: string;
  reflection: string;
  actionStep: string;
  prayerPoint: string;
  propheticDeclaration: string;
  author: string;
  readingDuration: string;
}

export interface WorshipTrack {
  id: string;
  title: string;
  artist: string;
  originalArtist?: string;
  category: 'Intimate Worship' | 'High Praise & Dance' | 'Hymns of Faith' | 'Choral & Orchestra';
  duration: string;
  sundayServiceTheme: string;
  scriptureReference: string;
  spotifyTrackId: string; // Spotify embed track id or URI
  spotifyUrl: string;
  youtubeUrl?: string;
  keyLyrics: string;
  coverImage: string;
}

export interface NewsletterSubscriptionData {
  email: string;
  fullName: string;
  preferences: {
    weeklyBulletin: boolean;
    dailyDevotional: boolean;
    vigilAndEvents: boolean;
  };
  subscribedAt: string;
}

export type BibleTestament = 'Old' | 'New';

export type BibleBookCategory =
  | 'Law'
  | 'History'
  | 'Poetry & Wisdom'
  | 'Major Prophets'
  | 'Minor Prophets'
  | 'Gospels'
  | 'Acts'
  | 'Pauline Epistles'
  | 'General Epistles'
  | 'Prophecy';

export interface BibleBook {
  id: string;
  name: string;
  testament: BibleTestament;
  category: BibleBookCategory;
  chapters: number;
  abbreviation: string;
}

export interface BibleVerseItem {
  verse: number;
  text: string;
  book?: string;
  chapter?: number;
}

export interface BiblePassage {
  reference: string;
  book: string;
  chapter: number;
  startVerse?: number;
  endVerse?: number;
  translation: string;
  verses: BibleVerseItem[];
  title?: string;
  pastoralReflection?: string;
}

export interface BibleTopicPlan {
  id: string;
  title: string;
  theme: string;
  description: string;
  iconName: string;
  verses: Array<{
    reference: string;
    text: string;
    keyMessage: string;
  }>;
}

export interface BibleStudyNote {
  id: string;
  reference: string;
  text: string;
  createdAt: string;
  highlightColor?: 'amber' | 'blue' | 'emerald' | 'rose';
}

export type PrayerCategory =
  | 'Healing & Health'
  | 'Family & Marriage'
  | 'Financial Breakthrough'
  | 'Spiritual Growth'
  | 'Academic & Career'
  | 'Deliverance & Protection'
  | 'Thanksgiving & Praise';

export interface PrayerEncouragement {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

export interface PublicPrayerRequest {
  id: string;
  author: string;
  isAnonymous?: boolean;
  city?: string;
  category: PrayerCategory;
  title: string;
  details: string;
  scriptureAnchor?: string;
  prayerCount: number;
  encouragements: PrayerEncouragement[];
  isAnswered?: boolean;
  answeredTestimony?: string;
  createdAt: string;
  urgency?: 'Normal' | 'Urgent';
}
