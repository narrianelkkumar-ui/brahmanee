import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BhumithiComparison } from './components/BhumithiComparison';
import { TipponSimulator } from './components/TipponSimulator';
import { UnitConverter } from './components/UnitConverter';
import { CommandExplorer } from './components/CommandExplorer';
import { YouTubeShowcase } from './components/YouTubeShowcase';
import { AutoCADGuide } from './components/AutoCADGuide';
import { DownloadAndLicense } from './components/DownloadAndLicense';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [lang, setLang] = useState<'te' | 'en'>('te'); // Default to Telugu for Telangana Surveyors

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner */}
        <Hero
          lang={lang}
          onExploreClick={() => scrollToSection('commands')}
          onSimulatorClick={() => scrollToSection('simulator')}
          onDownloadClick={() => scrollToSection('download')}
        />

        {/* Bhumithi vs SEED CAD Comparison Matrix */}
        <BhumithiComparison lang={lang} />

        {/* Interactive AutoCAD Tippon Simulator */}
        <TipponSimulator lang={lang} />

        {/* Land Measurement Unit Converter */}
        <UnitConverter lang={lang} />

        {/* 13 LISP Commands Directory */}
        <CommandExplorer lang={lang} />

        {/* YouTube Channel Showcase */}
        <YouTubeShowcase lang={lang} />

        {/* APPLOAD AutoCAD Setup Guide */}
        <AutoCADGuide lang={lang} />

        {/* Download LISP & Device Lock Activation Form */}
        <DownloadAndLicense lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

    </div>
  );
}
