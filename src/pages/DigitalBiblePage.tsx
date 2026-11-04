import React, { useState, useEffect, useRef } from 'react';
import { PageId, BiblePassage, BibleBook, BibleTopicPlan, BibleStudyNote } from '../types';
import { BIBLE_BOOKS, BIBLE_TOPIC_PLANS, parseBibleReference, getPassageLocally } from '../data/bibleData';
import { highlightKeywordTokens } from '../utils/churchUtils';
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Bookmark,
  Share2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  Type,
  HelpCircle,
  MessageSquare,
  Highlighter,
  Trash2,
  Download,
  Plus,
  ArrowRight,
  ExternalLink,
  Flame,
  Droplets,
  HeartPulse,
  Zap,
  Shield,
  X,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';

/**
 * Highlights all occurrences of a search keyword within scripture text
 */
export function highlightKeywords(
  text: string,
  keyword: string,
  highlightClass = 'bg-amber-300 text-amber-950 font-bold px-1.5 py-0.5 rounded shadow-xs'
): React.ReactNode {
  if (!keyword || !keyword.trim() || !text) return text;

  const tokens = highlightKeywordTokens(text, keyword);
  if (tokens.length === 1 && !tokens[0].isMatch) return text;

  return (
    <>
      {tokens.map((token, i) =>
        token.isMatch ? (
          <mark key={i} className={highlightClass}>
            {token.text}
          </mark>
        ) : (
          token.text
        )
      )}
    </>
  );
}

interface DigitalBiblePageProps {
  onNavigate: (page: PageId) => void;
}

type ReadingTheme = 'light' | 'sepia' | 'dark';
type FontSize = 'sm' | 'base' | 'lg' | 'xl';

export const DigitalBiblePage: React.FC<DigitalBiblePageProps> = ({ onNavigate }) => {
  // Navigation & Search State
  const [searchInput, setSearchInput] = useState('');
  const [currentReference, setCurrentReference] = useState('John 4:14');
  const [selectedBook, setSelectedBook] = useState('John');
  const [selectedChapter, setSelectedChapter] = useState(4);
  const [selectedTranslation, setSelectedTranslation] = useState('NKJV');

  // Keyword Search & Highlighting State
  const [activeSearchKeyword, setActiveSearchKeyword] = useState<string>('');
  const [isHighlightActive, setIsHighlightActive] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<{
    query: string;
    directMatches: any[];
    matchingTopics: any[];
    matchingVerses: Array<{
      reference: string;
      book: string;
      chapter: number;
      verse: number;
      text: string;
      passageTitle?: string;
    }>;
    total: number;
  } | null>(null);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState<boolean>(false);
  
  // Data State
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Selector Modal / Drawer
  const [isBookPickerOpen, setIsBookPickerOpen] = useState(false);
  const [bookPickerTestament, setBookPickerTestament] = useState<'Old' | 'New'>('New');
  const [bookSearchQuery, setBookSearchQuery] = useState('');

  // Reading Experience Preferences
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>('light');
  const [fontSize, setFontSize] = useState<FontSize>('lg');
  const [showVerseNumbers, setShowVerseNumbers] = useState(true);

  // Audio Speech Synthesis
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [currentReadingVerse, setCurrentReadingVerse] = useState<number | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // Highlights & Notes
  const [highlights, setHighlights] = useState<Record<string, string>>({});
  const [studyNotes, setStudyNotes] = useState<BibleStudyNote[]>([]);
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [activeNoteRef, setActiveNoteRef] = useState<string>('');

  // Copy feedback
  const [copiedVerseIndex, setCopiedVerseIndex] = useState<number | null>(null);
  const [copiedModalVerse, setCopiedModalVerse] = useState<string | null>(null);
  const [passageCopied, setPassageCopied] = useState(false);

  // Active Topic Plan (if selected)
  const [selectedTopic, setSelectedTopic] = useState<BibleTopicPlan | null>(null);

  // Load saved notes and highlights from localStorage
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('folc_bible_study_notes');
      if (savedNotes) {
        setStudyNotes(JSON.parse(savedNotes));
      }
      const savedHighlights = localStorage.getItem('folc_bible_highlights');
      if (savedHighlights) {
        setHighlights(JSON.parse(savedHighlights));
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  }, []);

  // Save notes to localStorage
  const saveNotesToStorage = (notes: BibleStudyNote[]) => {
    setStudyNotes(notes);
    try {
      localStorage.setItem('folc_bible_study_notes', JSON.stringify(notes));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  };

  // Save highlights to localStorage
  const saveHighlightsToStorage = (newHighlights: Record<string, string>) => {
    setHighlights(newHighlights);
    try {
      localStorage.setItem('folc_bible_highlights', JSON.stringify(newHighlights));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  };

  // Fetch passage whenever reference or translation changes
  const loadPassage = async (ref: string, trans: string) => {
    setIsLoading(true);
    setSearchError(null);
    stopAudio();

    try {
      // First try local fast retrieval
      const parsed = parseBibleReference(ref);
      if (parsed) {
        setSelectedBook(parsed.book);
        setSelectedChapter(parsed.chapter);
        const local = getPassageLocally(parsed.book, parsed.chapter, parsed.startVerse, parsed.endVerse, trans);
        if (local && local.verses.length > 0) {
          setPassage(local);
          setIsLoading(false);
          return;
        }
      }

      // If not local or customized, fetch from server API
      const res = await fetch(`/api/bible/passage?ref=${encodeURIComponent(ref)}&translation=${encodeURIComponent(trans)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.passage) {
          setPassage(data.passage);
          setSelectedBook(data.passage.book);
          setSelectedChapter(data.passage.chapter);
        } else {
          setSearchError('Passage not found. Please try another reference.');
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        setSearchError(errorData.error || 'Failed to load passage. Please check the reference.');
      }
    } catch (err) {
      console.error('Error fetching passage:', err);
      // Fallback to local John 4
      const fallback = getPassageLocally('John', 4, 13, 14, trans);
      if (fallback) setPassage(fallback);
      setSearchError('Offline reading mode activated.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadPassage(currentReference, selectedTranslation);
  }, []);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle Search Submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchInput.trim()) return;

    const parsed = parseBibleReference(searchInput);
    if (parsed) {
      setCurrentReference(parsed.formattedReference);
      loadPassage(parsed.formattedReference, selectedTranslation);
      setSelectedTopic(null);
      // When user searches a direct reference, clear any keyword search modal
      setIsSearchResultsOpen(false);
    } else {
      // Keyword search (e.g. "healing", "grace", "faith", "water", "peace")
      performKeywordSearch(searchInput.trim());
    }
  };

  const performKeywordSearch = async (query: string) => {
    setIsLoading(true);
    setSearchError(null);
    setActiveSearchKeyword(query);
    setIsHighlightActive(true);

    try {
      const res = await fetch(`/api/bible/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
        setIsSearchResultsOpen(true);

        if (data.matchingVerses && data.matchingVerses.length > 0) {
          const first = data.matchingVerses[0];
          setCurrentReference(first.reference);
          loadPassage(first.reference, selectedTranslation);
        } else if (data.directMatches && data.directMatches.length > 0) {
          const first = data.directMatches[0].reference;
          setCurrentReference(first);
          loadPassage(first, selectedTranslation);
        } else if (data.matchingTopics && data.matchingTopics.length > 0) {
          setSelectedTopic(data.matchingTopics[0]);
          if (data.matchingTopics[0].verses.length > 0) {
            const first = data.matchingTopics[0].verses[0].reference;
            setCurrentReference(first);
            loadPassage(first, selectedTranslation);
          }
        } else {
          setSearchError(`No scripture matches found for "${query}". Try "living water", "faith", "healing", "peace", or a reference like "John 3:16".`);
        }
      }
    } catch (err) {
      console.warn('Keyword search error:', err);
      setSearchError('Search temporarily unavailable. Try direct reference e.g., John 3:16');
    } finally {
      setIsLoading(false);
    }
  };

  // Chapter Navigation
  const currentBookObj = BIBLE_BOOKS.find(b => b.name.toLowerCase() === selectedBook.toLowerCase()) || BIBLE_BOOKS[42]; // Default John

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      const newChap = selectedChapter - 1;
      const newRef = `${selectedBook} ${newChap}`;
      setCurrentReference(newRef);
      loadPassage(newRef, selectedTranslation);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < currentBookObj.chapters) {
      const newChap = selectedChapter + 1;
      const newRef = `${selectedBook} ${newChap}`;
      setCurrentReference(newRef);
      loadPassage(newRef, selectedTranslation);
    }
  };

  // Translation Change
  const handleTranslationChange = (newTrans: string) => {
    setSelectedTranslation(newTrans);
    loadPassage(currentReference, newTrans);
  };

  // Audio Speech Synthesis Handler
  const startAudioReading = () => {
    if (!('speechSynthesis' in window) || !passage || passage.verses.length === 0) {
      alert('Speech reading is not supported by your browser.');
      return;
    }

    if (isAudioPaused) {
      window.speechSynthesis.resume();
      setIsAudioPaused(false);
      setIsPlayingAudio(true);
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);
    setIsAudioPaused(false);

    // Speak introductory title
    const fullText = `${passage.book} chapter ${passage.chapter}. ` +
      passage.verses.map(v => `Verse ${v.verse}. ${v.text}`).join(' ');

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setCurrentReadingVerse(null);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setCurrentReadingVerse(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    if ('speechSynthesis' in window && isPlayingAudio) {
      window.speechSynthesis.pause();
      setIsAudioPaused(true);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsAudioPaused(false);
    setCurrentReadingVerse(null);
  };

  // Copy Passage
  const handleCopyPassage = () => {
    if (!passage) return;
    const header = `📖 ${passage.title || passage.reference} (${passage.translation})\nFountain of Life Church — Living Waters Digital Bible\n\n`;
    const body = passage.verses.map(v => `${v.verse}. ${v.text}`).join('\n\n');
    const footer = `\n\n"Living Waters, Transforming Lives" • https://fountainoflife.church`;

    navigator.clipboard.writeText(header + body + footer).then(() => {
      setPassageCopied(true);
      setTimeout(() => setPassageCopied(false), 2500);
    });
  };

  // Copy Individual Verse
  const handleCopyVerse = (verse: number, text: string, idx: number) => {
    const textToCopy = `"${text}" — ${passage?.book} ${passage?.chapter}:${verse} (${selectedTranslation})\nFountain of Life Church`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedVerseIndex(idx);
      setTimeout(() => setCopiedVerseIndex(null), 2000);
    });
  };

  // Highlight Verse
  const handleToggleHighlight = (verseRef: string, color: string) => {
    const updated = { ...highlights };
    if (updated[verseRef] === color) {
      delete updated[verseRef];
    } else {
      updated[verseRef] = color;
    }
    saveHighlightsToStorage(updated);
  };

  // Add Study Note
  const handleOpenAddNote = (verseRef: string) => {
    setActiveNoteRef(verseRef);
    setIsNotesDrawerOpen(true);
  };

  const handleSaveNote = () => {
    if (!newNoteText.trim()) return;

    const note: BibleStudyNote = {
      id: `note-${Date.now()}`,
      reference: activeNoteRef || passage?.reference || `${selectedBook} ${selectedChapter}`,
      text: newNoteText.trim(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      highlightColor: 'amber'
    };

    const updated = [note, ...studyNotes];
    saveNotesToStorage(updated);
    setNewNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = studyNotes.filter(n => n.id !== id);
    saveNotesToStorage(updated);
  };

  const handleExportNotes = () => {
    if (studyNotes.length === 0) return;
    const textContent = studyNotes.map(n =>
      `[${n.createdAt}] - ${n.reference}\n${n.text}\n-----------------------------------\n`
    ).join('\n');

    const blob = new Blob([`FOUNTAIN OF LIFE CHURCH - PERSONAL STUDY NOTES\n\n${textContent}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FOLC-Bible-Notes-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy verse from search results modal
  const handleCopyModalVerse = (reference: string, text: string) => {
    const textToCopy = `"${text}" — ${reference} (${selectedTranslation})\nFountain of Life Church`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedModalVerse(reference);
      setTimeout(() => setCopiedModalVerse(null), 2000);
    });
  };

  // Select a search result and jump directly to reader
  const handleSelectSearchResult = (reference: string) => {
    setCurrentReference(reference);
    loadPassage(reference, selectedTranslation);
    setIsSearchResultsOpen(false);
  };

  // Priming Fountain AI with scripture question
  const handleAskFountainAI = (verseText?: string, ref?: string) => {
    const query = ref
      ? `Grace and peace, Fountain AI! Could you please explain the spiritual meaning, historical context, and personal life application of ${ref} ("${verseText || ''}")?`
      : `Grace and peace, Fountain AI! Can you provide a pastoral devotional commentary on ${passage?.reference}?`;

    // Dispatch custom event to trigger Fountain AI Chatbox
    window.dispatchEvent(new CustomEvent('folc:ask-ai', { detail: { prompt: query } }));
  };

  // Font Size Classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm leading-relaxed';
      case 'base': return 'text-base leading-relaxed';
      case 'lg': return 'text-lg leading-loose';
      case 'xl': return 'text-xl leading-loose';
      default: return 'text-lg leading-loose';
    }
  };

  // Theme Styling
  const getThemeClasses = () => {
    switch (readingTheme) {
      case 'sepia':
        return {
          wrapper: 'bg-[#fcf8ed] text-[#433422] border-[#e8dfc8]',
          card: 'bg-[#f7f1df] border-[#e2d6ba]',
          verseHover: 'hover:bg-[#efe6ce]',
          numColor: 'text-[#8c6b38]',
          badge: 'bg-[#ebdcb9] text-[#5c4623]',
          keywordHighlight: 'bg-[#e8ce90] text-[#3c2505] font-extrabold px-1.5 py-0.5 rounded shadow-2xs ring-1 ring-[#c29c54]/70'
        };
      case 'dark':
        return {
          wrapper: 'bg-slate-950 text-slate-100 border-slate-800',
          card: 'bg-slate-900 border-slate-800 text-slate-200',
          verseHover: 'hover:bg-slate-900/80',
          numColor: 'text-amber-400',
          badge: 'bg-slate-800 text-amber-300',
          keywordHighlight: 'bg-amber-500/30 text-amber-200 font-extrabold px-1.5 py-0.5 rounded shadow-2xs ring-1 ring-amber-400/60'
        };
      case 'light':
      default:
        return {
          wrapper: 'bg-white text-slate-900 border-slate-200',
          card: 'bg-blue-50/60 border-blue-100 text-slate-800',
          verseHover: 'hover:bg-blue-50/50',
          numColor: 'text-amber-600',
          badge: 'bg-blue-100 text-blue-900',
          keywordHighlight: 'bg-amber-300 text-amber-950 font-extrabold px-1.5 py-0.5 rounded shadow-2xs ring-1 ring-amber-400/50'
        };
    }
  };

  const themeStyles = getThemeClasses();

  // Filter books for modal picker
  const filteredBooks = BIBLE_BOOKS.filter(b =>
    b.testament === bookPickerTestament &&
    (bookSearchQuery === '' || b.name.toLowerCase().includes(bookSearchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 shadow-inner">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb & Subtitle */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Living Waters Digital Scripture & Study Hub</span>
            </div>
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>66 Canonical Books • 5 Translations • Audio Enabled</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
                Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">Bible Study</span>
              </h1>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl leading-relaxed">
                Dive deep into God’s holy and transformative Word. Search any chapter, verse, or spiritual topic,
                listen with built-in voice narration, and save personal reflections for your faith journey.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsNotesDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                <Bookmark className="w-4 h-4" />
                <span>My Study Notes ({studyNotes.length})</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-3xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-2xl rounded-2xl">
              <div className="absolute left-4 text-slate-400">
                <Search className="w-5 h-5 text-amber-400" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search scripture reference (e.g. John 4:14, Psalm 23, Romans 8:28) or topic..."
                className="w-full pl-12 pr-28 sm:pr-32 py-4 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-amber-400 font-medium"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2.5 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Look Up</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Search Suggestions */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <span className="font-semibold text-amber-300">Quick Scriptures:</span>
              {[
                'John 4:14',
                'John 3:16',
                'Psalm 23',
                'Psalm 91',
                'Romans 8:28',
                'Isaiah 40:31',
                'Philippians 4:6-7',
                'Ephesians 6:10'
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => {
                    setSearchInput(pill);
                    setCurrentReference(pill);
                    loadPassage(pill, selectedTranslation);
                    setSelectedTopic(null);
                    setIsSearchResultsOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-amber-500 hover:text-slate-950 text-blue-100 border border-blue-700/50 transition-all font-medium"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Quick Keyword Topics with Highlighting */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <span className="font-semibold text-amber-400">Search Keywords:</span>
              {[
                'healing',
                'living water',
                'faith',
                'peace',
                'grace',
                'shepherd',
                'light'
              ].map((kw) => (
                <button
                  key={kw}
                  onClick={() => {
                    setSearchInput(kw);
                    performKeywordSearch(kw);
                  }}
                  className={`px-2.5 py-1 rounded-lg border transition-all font-semibold flex items-center gap-1 ${
                    activeSearchKeyword.toLowerCase() === kw.toLowerCase()
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                      : 'bg-amber-500/15 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border-amber-400/30'
                  }`}
                >
                  <span>🔍 {kw}</span>
                </button>
              ))}

              {searchResults && searchResults.matchingVerses && searchResults.matchingVerses.length > 0 && (
                <button
                  onClick={() => setIsSearchResultsOpen(true)}
                  className="ml-auto px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-xs shadow-md flex items-center gap-1 animate-pulse"
                >
                  <span>Results ({searchResults.matchingVerses.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Study Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Toolbar Ribbon */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Book & Chapter Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsBookPickerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-xl text-sm border border-blue-200 transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>{selectedBook}</span>
              <span className="text-xs bg-blue-200/60 text-blue-800 px-2 py-0.5 rounded-md">
                Ch. {selectedChapter}
              </span>
            </button>

            {/* Prev / Next Chapter Buttons */}
            <div className="inline-flex rounded-xl shadow-xs border border-slate-200 overflow-hidden">
              <button
                onClick={handlePrevChapter}
                disabled={selectedChapter <= 1}
                className="p-2.5 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 border-r border-slate-200 transition-colors"
                title="Previous Chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextChapter}
                disabled={selectedChapter >= currentBookObj.chapters}
                className="p-2.5 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition-colors"
                title="Next Chapter"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Translation Dropdown */}
            <div className="relative">
              <select
                value={selectedTranslation}
                onChange={(e) => handleTranslationChange(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-800 cursor-pointer"
              >
                <option value="NKJV">NKJV (New King James)</option>
                <option value="KJV">KJV (King James Version)</option>
                <option value="NIV">NIV (New International)</option>
                <option value="ESV">ESV (English Standard)</option>
                <option value="AMP">AMP (Amplified Bible)</option>
              </select>
            </div>
          </div>

          {/* Reading Preferences & Audio Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 ml-auto">
            
            {/* Audio Read Aloud */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-1.5">
              {!isPlayingAudio ? (
                <button
                  onClick={startAudioReading}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 transition-colors"
                  title="Listen to scripture read aloud"
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span>Listen</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <button
                    onClick={isAudioPaused ? startAudioReading : pauseAudio}
                    className="text-xs font-bold text-amber-900 hover:text-amber-950"
                  >
                    {isAudioPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={stopAudio}
                    className="p-1 hover:bg-amber-200 rounded text-amber-800"
                    title="Stop Audio"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Speed toggle */}
              <button
                onClick={() => {
                  const rates = [0.8, 1.0, 1.25];
                  const nextIndex = (rates.indexOf(speechRate) + 1) % rates.length;
                  setSpeechRate(rates[nextIndex]);
                }}
                className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 bg-amber-200/50 px-1.5 py-0.5 rounded ml-1"
                title="Change reading speed"
              >
                {speechRate}x
              </button>
            </div>

            {/* Reading Theme Selector */}
            <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 gap-1">
              <button
                onClick={() => setReadingTheme('light')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  readingTheme === 'light' ? 'bg-white shadow-xs text-blue-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Light Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReadingTheme('sepia')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  readingTheme === 'sepia' ? 'bg-[#ebdcb9] shadow-xs text-[#5c4623] font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sepia Parchment Theme"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReadingTheme('dark')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  readingTheme === 'dark' ? 'bg-slate-900 text-amber-400 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Dark Sanctuary Theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 gap-1">
              <button
                onClick={() => {
                  if (fontSize === 'xl') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('sm');
                }}
                disabled={fontSize === 'sm'}
                className="px-2 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded disabled:opacity-30"
                title="Smaller Font"
              >
                A-
              </button>
              <button
                onClick={() => {
                  if (fontSize === 'sm') setFontSize('base');
                  else if (fontSize === 'base') setFontSize('lg');
                  else if (fontSize === 'lg') setFontSize('xl');
                }}
                disabled={fontSize === 'xl'}
                className="px-2 py-1 text-xs font-bold text-slate-700 hover:bg-white rounded disabled:opacity-30"
                title="Larger Font"
              >
                A+
              </button>
            </div>

            {/* Copy Full Passage */}
            <button
              onClick={handleCopyPassage}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Copy entire chapter to clipboard"
            >
              {passageCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Error Message */}
        {searchError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{searchError}</span>
            </div>
            <button
              onClick={() => {
                setSearchError(null);
                loadPassage('John 4:14', selectedTranslation);
              }}
              className="text-xs font-bold underline hover:text-amber-950"
            >
              Reset to John 4:14
            </button>
          </div>
        )}

        {/* Main Content Layout Grid: 2/3 Passage Viewer + 1/3 Thematic Plans & Study Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scripture Reader */}
          <div className="lg:col-span-8">
            <div className={`rounded-3xl shadow-sm border p-6 sm:p-8 md:p-10 transition-colors duration-200 ${themeStyles.wrapper}`}>
              
              {/* Active Keyword Highlight Indicator Banner */}
              {activeSearchKeyword && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400/60 text-slate-900 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow-xs">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-600">
                        Keyword Filter & Highlighting Active:
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-amber-950 bg-amber-300 px-2 py-0.5 rounded text-xs shadow-2xs">
                          "{activeSearchKeyword}"
                        </span>
                        {passage && (
                          <span className="text-[11px] text-slate-600 font-semibold">
                            ({passage.verses.filter(v => v.text.toLowerCase().includes(activeSearchKeyword.toLowerCase())).length} matches in {passage.reference})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    {searchResults && searchResults.matchingVerses && searchResults.matchingVerses.length > 0 && (
                      <button
                        onClick={() => setIsSearchResultsOpen(true)}
                        className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <span>All Results ({searchResults.matchingVerses.length})</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    <button
                      onClick={() => setIsHighlightActive(!isHighlightActive)}
                      className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                      title={isHighlightActive ? 'Temporarily hide keyword highlights' : 'Turn on keyword highlights'}
                    >
                      {isHighlightActive ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{isHighlightActive ? 'Highlights: ON' : 'Highlights: OFF'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveSearchKeyword('');
                        setSearchResults(null);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Clear Search & Highlights"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Passage Header */}
              {passage && (
                <div className="border-b border-slate-200/50 pb-6 mb-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${themeStyles.badge}`}>
                      {passage.translation} Version • {currentBookObj.testament} Testament
                    </span>

                    <button
                      onClick={() => handleAskFountainAI()}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ask Fountain AI about this chapter</span>
                    </button>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                    {passage.reference}
                  </h2>

                  {passage.title && (
                    <h3 className="text-base sm:text-lg font-medium opacity-80 italic mb-4">
                      {passage.title}
                    </h3>
                  )}

                  {/* Pastoral Reflection Card */}
                  {passage.pastoralReflection && (
                    <div className={`rounded-2xl p-4 sm:p-5 border text-sm leading-relaxed ${themeStyles.card}`}>
                      <div className="flex items-center gap-2 mb-2 font-bold text-amber-600 text-xs uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Pastoral Reflection • Dr. Emmanuel Adeleke</span>
                      </div>
                      <p className="italic">
                        "{passage.pastoralReflection}"
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Verses List */}
              {isLoading ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-medium opacity-70">
                    Opening the sacred scriptures in {selectedTranslation}...
                  </p>
                </div>
              ) : passage && passage.verses.length > 0 ? (
                <div className={`space-y-4 font-serif ${getFontSizeClass()}`}>
                  {passage.verses.map((verseItem, idx) => {
                    const verseRef = `${passage.book} ${passage.chapter}:${verseItem.verse}`;
                    const highlightColor = highlights[verseRef];

                    let highlightBg = '';
                    if (highlightColor === 'gold') highlightBg = 'bg-amber-100/90 text-amber-950 px-1 rounded';
                    if (highlightColor === 'emerald') highlightBg = 'bg-emerald-100/90 text-emerald-950 px-1 rounded';
                    if (highlightColor === 'sky') highlightBg = 'bg-sky-100/90 text-sky-950 px-1 rounded';
                    if (highlightColor === 'rose') highlightBg = 'bg-rose-100/90 text-rose-950 px-1 rounded';

                    return (
                      <div
                        key={verseItem.verse}
                        className={`group relative rounded-xl p-3 transition-colors duration-150 ${themeStyles.verseHover} ${
                          highlightBg ? 'border-l-4 border-amber-500' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Verse Number */}
                          {showVerseNumbers && (
                            <span className={`text-xs font-sans font-bold select-none pt-1 shrink-0 ${themeStyles.numColor}`}>
                              {verseItem.verse}
                            </span>
                          )}

                          {/* Verse Text with Keyword Highlighting */}
                          <div className="flex-1">
                            <span className={highlightBg}>
                              {highlightKeywords(
                                verseItem.text,
                                isHighlightActive ? activeSearchKeyword : '',
                                themeStyles.keywordHighlight
                              )}
                            </span>
                          </div>

                          {/* Interactive Hover Actions */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0 select-none pt-1 font-sans">
                            {/* Copy Verse */}
                            <button
                              onClick={() => handleCopyVerse(verseItem.verse, verseItem.text, idx)}
                              className="p-1.5 rounded-lg hover:bg-slate-200/50 text-slate-500 hover:text-slate-900 transition-colors"
                              title="Copy verse"
                            >
                              {copiedVerseIndex === idx ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Highlight Dropdown / Colors */}
                            <button
                              onClick={() => handleToggleHighlight(verseRef, 'gold')}
                              className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-600 transition-colors"
                              title="Highlight verse in Gold"
                            >
                              <Highlighter className="w-3.5 h-3.5" />
                            </button>

                            {/* Add Note */}
                            <button
                              onClick={() => handleOpenAddNote(verseRef)}
                              className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                              title="Add study reflection"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>

                            {/* Ask AI about this verse */}
                            <button
                              onClick={() => handleAskFountainAI(verseItem.text, verseRef)}
                              className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
                              title="Ask Fountain AI about this verse"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-base font-medium opacity-70">
                    No verses found for this selection. Try searching for "John 3:16" or "Psalm 23".
                  </p>
                </div>
              )}

              {/* Bottom Chapter Switcher Navigation */}
              {passage && (
                <div className="mt-12 pt-6 border-t border-slate-200/60 flex items-center justify-between font-sans">
                  <button
                    onClick={handlePrevChapter}
                    disabled={selectedChapter <= 1}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Chapter</span>
                  </button>

                  <div className="text-xs font-semibold opacity-70">
                    {selectedBook} {selectedChapter} of {currentBookObj.chapters}
                  </div>

                  <button
                    onClick={handleNextChapter}
                    disabled={selectedChapter >= currentBookObj.chapters}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Quick Cross-Referenced Sermon Banner */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 shadow-md border-l-4 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sunday Sermon Library</span>
                </div>
                <h4 className="font-bold text-lg text-white">
                  Want to hear this scripture expounded from the pulpit?
                </h4>
                <p className="text-xs text-blue-200">
                  Explore anointed message archives, sermon notes, and audio podcasts by Pastor Emmanuel Adeleke.
                </p>
              </div>
              <button
                onClick={() => onNavigate('sermons')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap shadow-md transition-colors"
              >
                Listen to Sermons
              </button>
            </div>
          </div>

          {/* Right Column: Topical Study Plans & Personal Notes Drawer / Widget */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Thematic Reading Plans Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Thematic Scripture Studies
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Curated scripture collections aligned with Fountain of Life’s teaching pillars:
              </p>

              <div className="space-y-3">
                {BIBLE_TOPIC_PLANS.map((topic) => {
                  const isSelected = selectedTopic?.id === topic.id;
                  return (
                    <div
                      key={topic.id}
                      className={`rounded-2xl p-4 border transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                          : 'border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}
                    >
                      <button
                        onClick={() => {
                          if (isSelected) {
                            setSelectedTopic(null);
                          } else {
                            setSelectedTopic(topic);
                            if (topic.verses.length > 0) {
                              setCurrentReference(topic.verses[0].reference);
                              loadPassage(topic.verses[0].reference, selectedTranslation);
                            }
                          }
                        }}
                        className="w-full text-left flex items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                            {topic.theme}
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {topic.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {topic.description}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-blue-800 shrink-0 mt-1">
                          {isSelected ? 'Open ▼' : 'Explore →'}
                        </span>
                      </button>

                      {/* Expanded Verses in Topic */}
                      {isSelected && (
                        <div className="mt-4 pt-3 border-t border-amber-200/60 space-y-2.5">
                          {topic.verses.map((v, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setCurrentReference(v.reference);
                                loadPassage(v.reference, selectedTranslation);
                              }}
                              className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200/40 transition-colors block text-xs"
                            >
                              <div className="font-bold text-blue-900 flex items-center justify-between">
                                <span>{v.reference}</span>
                                <span className="text-[10px] text-amber-700 font-semibold">Load</span>
                              </div>
                              <p className="text-slate-600 mt-1 italic line-clamp-2">
                                "{v.text}"
                              </p>
                              <div className="text-[11px] font-medium text-slate-700 mt-1">
                                💡 {v.keyMessage}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Notes Widget */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-900">
                    <Bookmark className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Study Reflections ({studyNotes.length})
                  </h3>
                </div>

                {studyNotes.length > 0 && (
                  <button
                    onClick={handleExportNotes}
                    className="p-1.5 text-slate-500 hover:text-blue-900 rounded-lg hover:bg-slate-100"
                    title="Export notes as text"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Add Note Form */}
              <div className="space-y-3 mb-4">
                <div className="text-xs font-semibold text-slate-500">
                  Add reflection for: <span className="text-blue-900 font-bold">{passage?.reference}</span>
                </div>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record what the Holy Spirit is revealing to you through this passage..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
                <button
                  onClick={handleSaveNote}
                  disabled={!newNoteText.trim()}
                  className="w-full py-2 bg-blue-900 hover:bg-blue-950 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Reflection</span>
                </button>
              </div>

              {/* Notes List */}
              {studyNotes.length > 0 ? (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {studyNotes.slice(0, 5).map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-950">{note.reference}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-slate-400 hover:text-rose-600"
                            title="Delete note"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {note.text}
                      </p>
                    </div>
                  ))}

                  {studyNotes.length > 5 && (
                    <button
                      onClick={() => setIsNotesDrawerOpen(true)}
                      className="w-full text-center text-xs font-bold text-amber-700 hover:text-amber-800 py-2"
                    >
                      View All {studyNotes.length} Notes →
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 text-center border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500">
                    No notes saved yet. Write reflections as you study; they will be safely kept on your device!
                  </p>
                </div>
              )}
            </div>

            {/* Need Prayer or Pastoral Counseling */}
            <div className="rounded-3xl bg-amber-500/10 border border-amber-500/30 p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <HeartPulse className="w-4 h-4 text-amber-700" />
                <span>Scripture Prayer Intercession</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                Are you facing a spiritual battle or health crisis? Our 24/7 prayer altar will stand on these scriptures with you.
              </p>
              <button
                onClick={() => onNavigate('prayer')}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Submit Scripture Prayer Request
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Book & Chapter Picker Modal */}
      {isBookPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <span>Select Book & Chapter</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Choose from all 66 canonical books of the Holy Bible
                </p>
              </div>

              <button
                onClick={() => setIsBookPickerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Search & Testament Tabs */}
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setBookPickerTestament('New')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    bookPickerTestament === 'New'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  New Testament (27)
                </button>
                <button
                  onClick={() => setBookPickerTestament('Old')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    bookPickerTestament === 'Old'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Old Testament (39)
                </button>
              </div>

              {/* Book filter input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={bookSearchQuery}
                  onChange={(e) => setBookSearchQuery(e.target.value)}
                  placeholder="Filter books..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>

            {/* Modal Body: Book Grid & Chapter Picker */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredBooks.map((b) => {
                  const isCur = b.name.toLowerCase() === selectedBook.toLowerCase();
                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedBook(b.name);
                        setSelectedChapter(1);
                        const ref = `${b.name} 1`;
                        setCurrentReference(ref);
                        loadPassage(ref, selectedTranslation);
                        setIsBookPickerOpen(false);
                      }}
                      className={`text-left p-3 rounded-2xl border transition-all ${
                        isCur
                          ? 'border-blue-900 bg-blue-50/80 ring-2 ring-blue-800'
                          : 'border-slate-200 hover:border-amber-400 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {b.name}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between mt-1">
                        <span>{b.category}</span>
                        <span className="font-semibold text-amber-700">{b.chapters} Ch.</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Chapter Buttons for Selected Book */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Jump to Chapter in <span className="text-blue-900">{selectedBook}</span>:
                  </h4>
                  <span className="text-xs text-slate-500">
                    Total: {currentBookObj.chapters} chapters
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                  {Array.from({ length: currentBookObj.chapters }, (_, i) => i + 1).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => {
                        setSelectedChapter(ch);
                        const ref = `${selectedBook} ${ch}`;
                        setCurrentReference(ref);
                        loadPassage(ref, selectedTranslation);
                        setIsBookPickerOpen(false);
                      }}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                        ch === selectedChapter
                          ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400'
                          : 'bg-slate-100 hover:bg-blue-100 text-slate-800'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsBookPickerOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Notes Drawer Modal */}
      {isNotesDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Personal Study Notes ({studyNotes.length})
                </h3>
              </div>
              <button
                onClick={() => setIsNotesDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Add Note Section */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
                <div className="text-xs font-bold text-blue-950 flex items-center justify-between">
                  <span>Scripture Tag:</span>
                  <input
                    type="text"
                    value={activeNoteRef || currentReference}
                    onChange={(e) => setActiveNoteRef(e.target.value)}
                    className="px-2 py-1 text-xs bg-white rounded border border-blue-200 font-bold text-blue-900"
                  />
                </div>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record what the Lord is saying to you..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-blue-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 resize-none"
                />
                <button
                  onClick={handleSaveNote}
                  disabled={!newNoteText.trim()}
                  className="w-full py-2 bg-blue-900 hover:bg-blue-950 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Save Reflection
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-3">
                {studyNotes.map((n) => (
                  <div key={n.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900 text-xs">{n.reference}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                        <button
                          onClick={() => handleDeleteNote(n.id)}
                          className="text-slate-400 hover:text-rose-600"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {n.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={handleExportNotes}
                disabled={studyNotes.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export (.txt)</span>
              </button>

              <button
                onClick={() => setIsNotesDrawerOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Modal with Keyword Highlighting */}
      {isSearchResultsOpen && searchResults && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-amber-300/50">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg font-bold">
                  <Search className="w-5 h-5 text-blue-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                      Scripture Search Results
                    </h3>
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                      {searchResults.matchingVerses?.length || 0} Verses
                    </span>
                  </div>
                  <p className="text-xs text-blue-200 mt-0.5 flex items-center gap-1.5">
                    <span>Keyword:</span>
                    <span className="font-extrabold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                      "{searchResults.query}"
                    </span>
                    <span>• All occurrences illuminated below</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                {/* Reader Highlight Toggle */}
                <button
                  onClick={() => setIsHighlightActive(!isHighlightActive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                    isHighlightActive
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                      : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                  }`}
                  title={isHighlightActive ? 'Turn off highlighting in Scripture Reader' : 'Turn on highlighting in Scripture Reader'}
                >
                  {isHighlightActive ? <EyeOff className="w-3.5 h-3.5 text-slate-950" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isHighlightActive ? 'Highlight in Reader: ON' : 'Highlight in Reader: OFF'}</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsSearchResultsOpen(false)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  aria-label="Close search modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Refine Search Bar & Pills Bar */}
            <div className="bg-amber-50/80 border-b border-amber-200/60 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <div className="relative w-full max-w-sm">
                  <input
                    type="text"
                    defaultValue={searchResults.query}
                    placeholder="Search another keyword (e.g. grace, living water)..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) {
                          setSearchInput(val);
                          performKeywordSearch(val);
                        }
                      }
                    }}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 text-slate-800"
                  />
                  <Search className="w-3.5 h-3.5 text-amber-700 absolute left-2.5 top-2" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="font-semibold text-slate-600">Quick Words:</span>
                {['healing', 'living water', 'faith', 'peace', 'grace', 'shepherd', 'light'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => {
                      setSearchInput(kw);
                      performKeywordSearch(kw);
                    }}
                    className={`px-2 py-0.5 rounded-lg border text-[11px] font-semibold transition-all ${
                      activeSearchKeyword.toLowerCase() === kw.toLowerCase()
                        ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                        : 'bg-white hover:bg-amber-200/70 text-slate-700 border-amber-200'
                    }`}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body: Scrollable Results */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh] bg-slate-50/50">
              {searchResults.matchingVerses && searchResults.matchingVerses.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                    <span>MATCHING SCRIPTURE PASSAGES ({searchResults.matchingVerses.length})</span>
                    <span>Highlighted with Gold Accent</span>
                  </div>

                  {searchResults.matchingVerses.map((verseItem, idx) => (
                    <div
                      key={`${verseItem.reference}-${idx}`}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-4 sm:p-5 transition-all shadow-xs hover:shadow-md group"
                    >
                      {/* Verse Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 bg-blue-900 text-white rounded-xl text-xs font-bold shadow-xs">
                            {verseItem.reference}
                          </span>
                          <span className="text-[11px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-md">
                            {selectedTranslation}
                          </span>
                          {verseItem.passageTitle && (
                            <span className="text-xs text-slate-500 font-medium">
                              • {verseItem.passageTitle}
                            </span>
                          )}
                        </div>

                        {/* Verse Action Buttons */}
                        <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                          <button
                            onClick={() => handleSelectSearchResult(verseItem.reference)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                            title="Open verse in Scripture Reader"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                            <span>Read in Context</span>
                          </button>

                          <button
                            onClick={() => handleCopyModalVerse(verseItem.reference, verseItem.text)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                            title="Copy verse to clipboard"
                          >
                            {copiedModalVerse === verseItem.reference ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              handleOpenAddNote(verseItem.reference);
                              setIsSearchResultsOpen(false);
                            }}
                            className="p-1.5 text-slate-500 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition-colors"
                            title="Add to Personal Study Notes"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Verse Text with Keyword Highlighting */}
                      <p className="text-sm sm:text-base font-serif text-slate-800 leading-relaxed pl-3 border-l-2 border-amber-300">
                        {highlightKeywords(
                          verseItem.text,
                          activeSearchKeyword,
                          'bg-amber-300 text-amber-950 font-extrabold px-1.5 py-0.5 rounded shadow-2xs ring-1 ring-amber-400'
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-amber-300">
                  <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900 mb-1">
                    No Direct Scripture Matches Found
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
                    We could not find matching verses for "{searchResults.query}". Try searching for one of the popular biblical topics below:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['living water', 'faith', 'healing', 'peace', 'grace', 'shepherd', 'light'].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchInput(term);
                          performKeywordSearch(term);
                        }}
                        className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Search "{term}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Thematic Plans if available */}
              {searchResults.matchingTopics && searchResults.matchingTopics.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold mb-3">
                    RELATED THEMATIC STUDY PLANS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.matchingTopics.map((topic: any) => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          setSelectedTopic(topic);
                          if (topic.verses && topic.verses.length > 0) {
                            handleSelectSearchResult(topic.verses[0].reference);
                          } else {
                            setIsSearchResultsOpen(false);
                          }
                        }}
                        className="text-left p-3.5 bg-white border border-slate-200 hover:border-amber-400 rounded-xl transition-all shadow-2xs hover:shadow-xs group"
                      >
                        <div className="font-bold text-xs text-blue-950 group-hover:text-blue-900 flex items-center justify-between">
                          <span>{topic.title}</span>
                          <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-semibold">
                            {topic.verses?.length || 0} Passages
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                          {highlightKeywords(
                            topic.description,
                            activeSearchKeyword,
                            'bg-amber-200 text-amber-950 font-bold px-1 rounded'
                          )}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  Tip: Keywords remain highlighted in the main Scripture Reader while browsing chapters.
                </span>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setIsSearchResultsOpen(false)}
                  className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  Return to Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
