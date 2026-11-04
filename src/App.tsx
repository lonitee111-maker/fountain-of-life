import React, { useState, useEffect } from 'react';
import { PageId, Sermon, ChurchEvent, Ministry, Testimony } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { FountainAIChatbox } from './components/FountainAIChatbox';

// Modals
import { PlanVisitModal } from './components/PlanVisitModal';
import { LiveServiceModal } from './components/LiveServiceModal';
import { SermonPlayerModal } from './components/SermonPlayerModal';
import { EventRegisterModal } from './components/EventRegisterModal';
import { MinistryJoinModal } from './components/MinistryJoinModal';
import { TestimonyModal } from './components/TestimonyModal';
import { PrayerReminderModal } from './components/PrayerReminderModal';
import { PrayerNotificationToast } from './components/PrayerNotificationToast';
import { checkAndFirePrayerReminder } from './utils/prayerReminderUtils';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { VisionMissionPage } from './pages/VisionMissionPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { SermonsPage } from './pages/SermonsPage';
import { EventsPage } from './pages/EventsPage';
import { GivePage } from './pages/GivePage';
import { PrayerRequestPage } from './pages/PrayerRequestPage';
import { ContactPage } from './pages/ContactPage';
import { WatchLivePage } from './pages/WatchLivePage';
import { DigitalBiblePage } from './pages/DigitalBiblePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Modals state
  const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);
  const [isLiveServiceOpen, setIsLiveServiceOpen] = useState(false);
  const [isPrayerReminderOpen, setIsPrayerReminderOpen] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [isShareTestimonyOpen, setIsShareTestimonyOpen] = useState(false);

  // Background prayer reminder scheduler interval & global modal trigger
  useEffect(() => {
    // Check immediately on mount
    checkAndFirePrayerReminder();

    // Check every 30 seconds
    const interval = setInterval(() => {
      checkAndFirePrayerReminder();
    }, 30000);

    const handleOpenReminder = () => setIsPrayerReminderOpen(true);
    window.addEventListener('folc:open-prayer-reminder', handleOpenReminder);

    return () => {
      clearInterval(interval);
      window.removeEventListener('folc:open-prayer-reminder', handleOpenReminder);
    };
  }, []);

  // User submitted testimonies
  const [customTestimonies, setCustomTestimonies] = useState<Testimony[]>([]);

  // Sync hash with page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'vision-mission',
        'leadership',
        'ministries',
        'sermons',
        'events',
        'give',
        'prayer',
        'contact',
        'live',
        'bible'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddTestimony = (newTestimony: {
    author: string;
    city: string;
    title: string;
    category: 'Healing' | 'Breakthrough' | 'Family' | 'Provision' | 'Salvation';
    story: string;
  }) => {
    const testimony: Testimony = {
      id: `custom-${Date.now()}`,
      author: newTestimony.author,
      city: newTestimony.city || 'Victory City',
      title: newTestimony.title,
      category: newTestimony.category,
      story: newTestimony.story,
      date: 'Just Now',
      verified: true
    };
    setCustomTestimonies((prev) => [testimony, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans-ui selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPlanVisit={() => setIsPlanVisitOpen(true)}
        onOpenLiveService={() => setIsLiveServiceOpen(true)}
        onOpenPrayerReminder={() => setIsPrayerReminderOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenPlanVisit={() => setIsPlanVisitOpen(true)}
            onOpenLiveService={() => setIsLiveServiceOpen(true)}
            onSelectSermon={(s) => setSelectedSermon(s)}
            onSelectEvent={(e) => setSelectedEvent(e)}
            onOpenShareTestimony={() => setIsShareTestimonyOpen(true)}
            customTestimonies={customTestimonies}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenPlanVisit={() => setIsPlanVisitOpen(true)}
          />
        )}

        {currentPage === 'vision-mission' && (
          <VisionMissionPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'leadership' && (
          <LeadershipPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'ministries' && (
          <MinistriesPage
            onNavigate={handleNavigate}
            onOpenJoinMinistry={(m) => setSelectedMinistry(m)}
          />
        )}

        {currentPage === 'sermons' && (
          <SermonsPage
            onNavigate={handleNavigate}
            onSelectSermon={(s) => setSelectedSermon(s)}
          />
        )}

        {currentPage === 'events' && (
          <EventsPage
            onNavigate={handleNavigate}
            onSelectEvent={(e) => setSelectedEvent(e)}
          />
        )}

        {currentPage === 'give' && (
          <GivePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'prayer' && (
          <PrayerRequestPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenPlanVisit={() => setIsPlanVisitOpen(true)}
          />
        )}

        {currentPage === 'live' && (
          <WatchLivePage
            onNavigate={handleNavigate}
            onOpenPlanVisit={() => setIsPlanVisitOpen(true)}
          />
        )}

        {currentPage === 'bible' && (
          <DigitalBiblePage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPlanVisit={() => setIsPlanVisitOpen(true)}
      />

      {/* Floating Controls */}
      <FloatingWidgets />

      {/* Fountain AI Interactive Church Chatbot */}
      <FountainAIChatbox />

      {/* Modals */}
      <PlanVisitModal
        isOpen={isPlanVisitOpen}
        onClose={() => setIsPlanVisitOpen(false)}
      />

      <LiveServiceModal
        isOpen={isLiveServiceOpen}
        onClose={() => setIsLiveServiceOpen(false)}
        onNavigateToGive={() => handleNavigate('give')}
      />

      <SermonPlayerModal
        sermon={selectedSermon}
        onClose={() => setSelectedSermon(null)}
      />

      <EventRegisterModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <MinistryJoinModal
        ministry={selectedMinistry}
        onClose={() => setSelectedMinistry(null)}
      />

      <TestimonyModal
        isOpen={isShareTestimonyOpen}
        onClose={() => setIsShareTestimonyOpen(false)}
        onAddTestimony={handleAddTestimony}
      />

      {/* Daily Morning Prayer Reminder Modal */}
      <PrayerReminderModal
        isOpen={isPrayerReminderOpen}
        onClose={() => setIsPrayerReminderOpen(false)}
        onNavigateToPrayer={() => handleNavigate('prayer')}
      />

      {/* In-App Prayer Notification Toast */}
      <PrayerNotificationToast onNavigate={handleNavigate} />
    </div>
  );
}
