import React, { useState } from 'react';
import { Compass, Phone, Download, Youtube, Award, Menu, X, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'te' | 'en';
  setLang: (lang: 'te' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'comparison', labelEn: 'Bhumithi vs SEED CAD', labelTe: 'భూమితి VS సీడ్ క్యాడ్' },
    { id: 'simulator', labelEn: 'Tippon Simulator', labelTe: 'టిప్పన్ సిమ్యులేటర్' },
    { id: 'converter', labelEn: 'Land Unit Calculator', labelTe: 'కొలతల క్యాలిక్యులేటర్' },
    { id: 'commands', labelEn: '13 LISP Commands', labelTe: '13 కమాండ్స్ వివరాలు' },
    { id: 'youtube', labelEn: 'YouTube Channel', labelTe: 'యూట్యూబ్ ఛానెల్' },
    { id: 'download', labelEn: 'Download & License', labelTe: 'డౌన్‌లోడ్ & లైసెన్స్' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-800 font-mono">SEED <span className="text-indigo-600">CAD</span></span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 rounded-full uppercase tracking-wider">
                  Telangana Survey
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'te' ? 'భూమి కొలతలు & టిప్పన్ డ్రాయింగ్స్' : 'Land Surveying & Tippon AutoCAD Tools'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === link.id
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                }`}
              >
                {lang === 'te' ? link.labelTe : link.labelEn}
              </button>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'te' ? 'en' : 'te')}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition"
              title="Toggle Telugu / English"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'te' ? 'English' : 'తెలుగు'}</span>
            </button>

            {/* Developer Contact CTA */}
            <a
              href="tel:+917711889955"
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-md shadow-indigo-100 transition hover:scale-[1.02] active:scale-95"
            >
              <Phone className="w-4 h-4 text-indigo-100" />
              <div className="text-left leading-tight">
                <span className="block text-[10px] text-indigo-200 uppercase font-bold tracking-wider">NARRI ANEL KKUMAR</span>
                <span className="text-xs font-mono font-bold">+91 7711889955</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'te' ? 'en' : 'te')}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
            >
              {lang === 'te' ? 'EN' : 'తెలుగు'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition ${
                activeTab === link.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {lang === 'te' ? link.labelTe : link.labelEn}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-200">
            <a
              href="tel:+917711889955"
              className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-xl font-bold shadow-md shadow-indigo-100"
            >
              <Phone className="w-5 h-5" />
              <span>Call Narri Anel Kkumar: +91 7711889955</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
