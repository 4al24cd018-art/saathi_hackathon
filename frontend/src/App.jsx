import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import { SAMPLE_REPORTS } from './data/sampleReports';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedReport, setSelectedReport] = useState(SAMPLE_REPORTS[0]);

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F4F9FF] via-[#EBF3FE] to-[#F4F9FF] text-[#172554] font-sans antialiased selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      {/* Background Ambience Layer: Medical Technology Inspired Grid & Radial Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-ambient" aria-hidden="true">
        {/* Subtle Medical Grid Pattern */}
        <div className="absolute inset-0 medical-pattern opacity-70" />

        {/* Top Centered Soft Blue Radial Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12),transparent_70%)] blur-2xl" />

        {/* Soft Teal Glow on Right */}
        <div className="absolute top-24 right-[-5%] w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.09),transparent_65%)] blur-3xl" />

        {/* Subtle Floating Animated Circles */}
        <div className="absolute top-48 left-[5%] w-64 h-64 rounded-full bg-gradient-to-tr from-blue-400/10 to-teal-400/10 blur-2xl animate-float" />
        <div className="absolute top-[480px] right-[8%] w-80 h-80 rounded-full bg-gradient-to-bl from-teal-400/10 to-sky-400/10 blur-3xl animate-float-slow" />
        <div className="absolute top-[900px] left-[15%] w-72 h-72 rounded-full bg-gradient-to-r from-blue-500/08 to-indigo-400/08 blur-2xl animate-float-reverse" />
      </div>

      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleNavigate} 
        onOpenUpload={() => handleNavigate('upload')} 
      />

      {/* Main Page Body (Rendered over the background) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">
        {activeTab === 'landing' && (
          <LandingPage 
            onNavigate={handleNavigate} 
            onSelectReport={handleSelectReport} 
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage 
            onNavigate={handleNavigate} 
            onSelectReport={handleSelectReport} 
          />
        )}

        {activeTab === 'upload' && (
          <UploadPage 
            onSelectReport={handleSelectReport} 
            onNavigate={handleNavigate} 
          />
        )}

        {activeTab === 'results' && (
          <ResultsPage 
            report={selectedReport} 
            onBack={() => handleNavigate('dashboard')} 
            onNavigateUpload={() => handleNavigate('upload')} 
          />
        )}

        {activeTab === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate} 
          />
        )}
      </main>

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
