import React from 'react';
import { Download, Terminal, Layers, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

interface AutoCADGuideProps {
  lang: 'te' | 'en';
}

export const AutoCADGuide: React.FC<AutoCADGuideProps> = ({ lang }) => {
  const steps = [
    {
      step: '01',
      titleEn: 'Download the LISP File',
      titleTe: 'LISP ఫైల్‌ను డౌన్‌లోడ్ చేసుకోండి',
      descEn: 'Download SEED_CAD_SUPER_MASTER_TIPPON.lsp to your computer (e.g. C:\\Survey_Tools\\)',
      descTe: 'మా వెబ్‌సైట్ నుండి SEED_CAD_SUPER_MASTER_TIPPON.lsp ఫైల్‌ను మీ కంప్యూటర్‌లో సేవ్ చేయండి.'
    },
    {
      step: '02',
      titleEn: 'Open AutoCAD & Type APPLOAD',
      titleTe: 'ఆటోక్యాడ్‌లో APPLOAD టైప్ చేయండి',
      descEn: 'Open AutoCAD (any version 2010 to 2026+). In command line, type APPLOAD and press Enter.',
      descTe: 'ఆటోక్యాడ్ ఓపెన్ చేసి, కమాండ్ లైన్‌లో APPLOAD అని టైప్ చేసి ఎంటర్ (Enter) ప్రెస్ చేయండి.'
    },
    {
      step: '03',
      titleEn: 'Select LISP & Load',
      titleTe: 'ఫైల్ సెలెక్ట్ చేసి "Load" బటన్ నొక్కండి',
      descEn: 'Browse to the downloaded .lsp file, select it and click "Load". You will see "SUPER MASTER LISP Loaded" in command prompt.',
      descTe: 'డౌన్‌లోడ్ చేసిన .lsp ఫైల్‌ను ఎంచుకొని Load బటన్ నొక్కండి. కమాండ్ విండోలో "LISP Loaded" అని కనిపిస్తుంది.'
    },
    {
      step: '04',
      titleEn: 'Add to Startup Suite (Optional)',
      titleTe: 'స్టార్టప్ సూట్ (Startup Suite) లో ఆడ్ చేయండి',
      descEn: 'In APPLOAD window, click "Contents" under Startup Suite and add the file. Now LISP will auto-load whenever AutoCAD opens!',
      descTe: 'ప్రతీసారి లోడ్ చేయకుండా ఉండటానికి, Startup Suite లోని Contents లోకి ఈ ఫైల్‌ను ఆడ్ చేస్తే ఆటోక్యాడ్ ఓపెన్ అవ్వగానే లోడ్ అవుతుంది.'
    },
    {
      step: '05',
      titleEn: 'Type TIPPON & Start Drawing',
      titleTe: 'TIPPON అని టైప్ చేసి టిప్పన్ వేయడం ప్రారంభించండి',
      descEn: 'Type TIPPON in command bar. Pick start point, enter Rupees-Annas (e.g. 15-5), and press 8, 2, 4, 6 on numpad!',
      descTe: 'కమాండ్ లైన్‌లో TIPPON అని టైప్ చేసి, స్టార్ట్ పాయింట్ క్లిక్ చేసి, 15-5 కొట్టి నంపాడ్ కీలు ప్రెస్ చేయండి!'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>{lang === 'te' ? 'ఆటోక్యాడ్‌లో ఇన్స్టాలేషన్ గైడ్' : 'Step-by-Step AutoCAD Setup Guide'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'te' ? 'ఆటోక్యాడ్‌లో LISP ఫైల్‌ను ఎలా లోడ్ చేయాలి?' : 'How to Load LISP File in AutoCAD (APPLOAD)'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'te' 
              ? 'ఏ ఆటోక్యాడ్ వెర్షన్‌లోనైనా (2010 నుండి 2026+) ఈ 5 సులభమైన స్టెప్పులతో రన్ చేయవచ్చు.' 
              : 'Works seamlessly on any AutoCAD version using standard APPLOAD command.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono font-bold text-xs">
                  Step {item.step}
                </span>
                <h3 className="font-bold text-sm text-slate-900">
                  {lang === 'te' ? item.titleTe : item.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'te' ? item.descTe : item.descEn}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block text-slate-300 text-right">
                  <ArrowRight className="w-4 h-4 inline text-indigo-600" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
