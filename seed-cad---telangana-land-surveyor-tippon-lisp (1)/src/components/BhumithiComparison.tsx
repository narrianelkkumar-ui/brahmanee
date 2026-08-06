import React from 'react';
import { COMPARISON_FEATURES } from '../data/comparisonData';
import { CheckCircle2, XCircle, AlertCircle, Sparkles, Zap, Trophy } from 'lucide-react';

interface BhumithiComparisonProps {
  lang: 'te' | 'en';
}

export const BhumithiComparison: React.FC<BhumithiComparisonProps> = ({ lang }) => {
  return (
    <section id="comparison" className="py-16 bg-slate-50 border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>{lang === 'te' ? 'సాఫ్ట్‌వేర్‌ల పోలిక (Comparison Matrix)' : 'Why Choose SEED CAD over Bhumithi'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'te' ? (
              <>
                భూమితి సాఫ్ట్‌వేర్ (Bhumithi) కి మరియు <br className="hidden sm:inline" />
                <span className="text-indigo-600">SEED CAD Tippon LISP</span> కి ఉన్న ప్రధాన తేడాలు
              </>
            ) : (
              <>
                Bhumithi Software vs. <span className="text-indigo-600">SEED CAD Super Master LISP</span>
              </>
            )}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'te' 
              ? 'తెలంగాణ ల్యాండ్ సర్వేయర్లకు భూమితి సాఫ్ట్‌వేర్‌లో వచ్చే ఇబ్బందులకు సీడ్ క్యాడ్ పరిష్కారం అందిస్తుంది.' 
              : 'Detailed feature comparison showing why Telangana land surveyors prefer SEED CAD LISP for fast AutoCAD Tippon map generation.'}
          </p>
        </div>

        {/* Feature Cards / Comparison Grid */}
        <div className="space-y-4">
          {COMPARISON_FEATURES.map((item, idx) => (
            <div 
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              {/* Feature Title */}
              <div className="md:col-span-4 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0 font-bold text-xs">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {lang === 'te' ? item.featureTe : item.featureEn}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'te' ? item.featureEn : item.featureTe}
                  </span>
                </div>
              </div>

              {/* Bhumithi Status */}
              <div className="md:col-span-4 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                      Bhumithi Software
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-red-100 text-red-800 text-[10px] font-bold">
                      {lang === 'te' ? 'ఇబ్బందులు' : 'Limitations'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {lang === 'te' ? item.bhumithi.descriptionTe : item.bhumithi.descriptionEn}
                  </p>
                </div>
              </div>

              {/* SEED CAD Status */}
              <div className="md:col-span-4 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200 flex items-start space-x-3 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                      SEED CAD LISP
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                      {lang === 'te' ? 'మెరుగైనది' : 'Superior'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {lang === 'te' ? item.seedCad.descriptionTe : item.seedCad.descriptionEn}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Summary Banner */}
        <div className="mt-10 p-6 rounded-xl bg-slate-800 text-white border border-slate-700 text-center space-y-3 shadow-md">
          <div className="inline-flex items-center space-x-2 text-indigo-300 font-bold text-sm uppercase tracking-widest">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>{lang === 'te' ? 'సారాంశం (Summary)' : 'Key Advantage'}</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed">
            {lang === 'te' ? (
              'భూమితి సాఫ్ట్‌వేర్ యొక్క పరిమితులను అధిగమించి, ఆటోక్యాడ్‌లోనే నేరుగా రూపాయిలు-ఆణాలు ఎంటర్ చేస్తూ TIPPON మరియు TFC కమాండ్లతో సర్వేయర్లకు సమయాన్ని 80% ఆదా చేసే ఏకైక పరిష్కారం SEED CAD Super Master LISP.'
            ) : (
              'By bypassing Bhumithi\'s slow external export workflow, SEED CAD brings native Numpad Tippon creation and automated label updates directly into AutoCAD—saving up to 80% of drawing time for Telangana surveyors.'
            )}
          </p>
        </div>

      </div>
    </section>
  );
};
