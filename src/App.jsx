import React, { useState } from 'react';
import { CivicProvider } from './context/CivicContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import CertificateModal from './components/CertificateModal';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CivicSpotterPage from './pages/CivicSpotterPage';
import VolunteerHubPage from './pages/VolunteerHubPage';
import LeaderboardPage from './pages/LeaderboardPage';
import TransformationGalleryPage from './pages/TransformationGalleryPage';
import SmartWastePage from './pages/SmartWastePage';
import CommunityVoicePage from './pages/CommunityVoicePage';
import ImpactDashboardPage from './pages/ImpactDashboardPage';
import UserProfilePage from './pages/UserProfilePage';

function AppContent() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'about':
        return <AboutPage setActivePage={setActivePage} />;
      case 'spotter':
        return <CivicSpotterPage />;
      case 'volunteer-hub':
        return <VolunteerHubPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'transformations':
        return <TransformationGalleryPage />;
      case 'smart-waste':
        return <SmartWastePage />;
      case 'community-voice':
        return <CommunityVoicePage />;
      case 'impact':
        return <ImpactDashboardPage />;
      case 'profile':
        return <UserProfilePage setActivePage={setActivePage} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-nature-200 selection:text-nature-900">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 animate-in fade-in duration-300">
        {renderPage()}
      </main>

      <Footer setActivePage={setActivePage} />
      <NotificationToast />
      <CertificateModal />
    </div>
  );
}

export default function App() {
  return (
    <CivicProvider>
      <AppContent />
    </CivicProvider>
  );
}

