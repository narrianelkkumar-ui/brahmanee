import React from 'react';
import { Compass, Phone, Youtube, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: 'te' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xl font-black font-mono text-white tracking-wide">
                SEED <span className="text-amber-400">CAD</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {lang === 'te' 
                ? 'తెలంగాణ ల్యాండ్ సర్వేయర్ల కోసం రూపొందించిన ప్రసిద్ధ ఆటోక్యాడ్ LISP టూల్‌కిట్. టిప్పన్ పటాలు, F-Line కొలతలు, రూపాయి-ఆణాలు & విస్తీర్ణ పట్టికలు వేగంగా చేయండి.' 
                : 'The premier AutoCAD AutoLisp automation toolkit for Telangana Land Surveyors. Streamline Tippon drafting, Rupee-Annas conversions, and survey legend tables.'}
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Developer & Copyright Owner: <strong className="text-slate-300">NARRI ANEL KKUMAR</strong></div>
              <div className="pt-1">
                <a 
                  href="https://seed-cad-telangana-land-surveyor-tippon-lisp.ai.studio" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-mono font-bold hover:underline"
                >
                  seed-cad-telangana-land-surveyor-tippon-lisp.ai.studio
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              {lang === 'te' ? 'నేరుగా వెళ్ళండి' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
              <li><a href="#comparison" className="hover:text-amber-300 transition">Bhumithi vs SEED CAD</a></li>
              <li><a href="#simulator" className="hover:text-amber-300 transition">Tippon Live Simulator</a></li>
              <li><a href="#converter" className="hover:text-amber-300 transition">Land Unit Calculator</a></li>
              <li><a href="#commands" className="hover:text-amber-300 transition">13 LISP Commands</a></li>
              <li><a href="#youtube" className="hover:text-amber-300 transition">YouTube Video Channel</a></li>
              <li><a href="#download" className="hover:text-amber-300 transition">Download LISP Script</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              {lang === 'te' ? 'సంప్రదించండి' : 'Contact Developer'}
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-mono font-bold">
              <a href="tel:+917711889955" className="flex items-center space-x-2 hover:text-emerald-400 transition">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 7711889955</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-red-400 transition">
                <Youtube className="w-4 h-4 text-red-400" />
                <span>Narri Anel Kkumar Channel</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} SEED CAD - Narri Anel Kkumar. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Created with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for Telangana Land Surveyors</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
