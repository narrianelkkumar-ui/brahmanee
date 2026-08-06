import React, { useState } from 'react';
import { LISP_FILE_NAME, LISP_FILE_CONTENT } from '../data/lispSource';
import { Download, Copy, Check, ShieldCheck, Key, Phone, Send, MessageSquare, Code, Terminal, AlertTriangle } from 'lucide-react';

interface DownloadAndLicenseProps {
  lang: 'te' | 'en';
}

export const DownloadAndLicense: React.FC<DownloadAndLicenseProps> = ({ lang }) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [cDriveSerial, setCDriveSerial] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Trigger download of .lsp file
  const handleDownloadFile = () => {
    const blob = new Blob([LISP_FILE_CONTENT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = LISP_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(LISP_FILE_CONTENT);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="download" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Download className="w-4 h-4 text-indigo-600" />
            <span>{lang === 'te' ? 'డౌన్‌లోడ్ & లైసెన్స్ రిజిస్ట్రేషన్' : 'Download LISP & Device License Authorization'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'te' ? 'LISP ఫైల్ పొందండి & డివైజ్ యాక్టివేట్ చేయించుకోండి' : 'Get SEED CAD LISP File & Activate Computer'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'te' 
              ? 'LISP ఫైల్‌ను ఉచితంగా డౌన్‌లోడ్ చేసుకోండి. మీ సిస్టమ్ C: Drive Serial Lock పొందడానికి నార్రి అనిల్ కుమార్‌ను సంప్రదించండి.' 
              : 'Download the complete LISP file or contact Narri Anel Kkumar (+91 7711889955) for C: Drive Serial Lock device authorization.'}
          </p>
        </div>

        {/* Main Grid: Download Box & Contact Registration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Download File & View Code */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-mono text-slate-900">{LISP_FILE_NAME}</h3>
                    <p className="text-xs text-slate-500 font-semibold">AutoCAD AutoLisp File (.lsp) | Ver 2026</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                  Ready
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {lang === 'te' ? (
                    'ఈ ఫైల్‌లో TIPPON, TFC, RAM, MF, FT, ACGT, CHKAREA, CTABLE, LGTABLE తో సహా 13 కమాండ్లు కలిసి ఒకే సమ్మేళనంగా ఉంటాయి.'
                  ) : (
                    'This single file contains all 13 survey drafting commands integrated into one clean, optimized AutoLisp script.'
                  )}
                </p>

                {/* Primary Download Button */}
                <button
                  onClick={handleDownloadFile}
                  className="w-full flex items-center justify-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-4 px-6 rounded-2xl text-base shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Download className="w-5 h-5 fill-current text-white" />
                  <span>{lang === 'te' ? 'LISP ఫైల్‌ను డౌన్‌లోడ్ చేయండి (.lsp)' : 'Download SEED_CAD_SUPER_MASTER.lsp'}</span>
                </button>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="text-xs text-slate-600 hover:text-slate-900 underline font-semibold"
                  >
                    {showCode ? 'Hide LISP Code' : 'View Full LISP Code'}
                  </button>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1.5 text-xs text-indigo-700 font-bold hover:underline"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-indigo-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'Code Copied!' : 'Copy Code to Clipboard'}</span>
                  </button>
                </div>
              </div>

              {/* Code Viewer Panel */}
              {showCode && (
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono font-semibold">
                    <span>LISP Source Preview</span>
                    <span>16 Functions</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300 max-h-72 overflow-y-auto whitespace-pre">
                    {LISP_FILE_CONTENT}
                  </pre>
                </div>
              )}

            </div>

            {/* Security & Lock Information Box */}
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{lang === 'te' ? 'డివైజ్ లాక్ & లైసెన్స్ సమాచారం (Device Lock Security)' : 'Device Lock Security Info'}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {lang === 'te' ? (
                  'ఈ సాఫ్ట్‌వేర్ మీ కంప్యూటర్ C: Drive Serial Number కు లాక్ చేయబడి ఉంటుంది. మీ డివైజ్ రిజిస్ట్రేషన్ మరియు అన్‌లాక్ కోడ్ కోసం నార్రి అనిల్ కుమార్ (+91 7711889955) ను సంప్రదించండి.'
                ) : (
                  'This software uses a C: Drive Serial Number device lock for client security. To authorize or renew your computer device lock, please contact Narri Anel Kkumar.'
                )}
              </p>
            </div>

          </div>

          {/* Right Column: Contact & Registration Form */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
                <div className="p-3 rounded-2xl bg-amber-100 text-amber-800 border border-amber-200">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {lang === 'te' ? 'లైసెన్స్ కొరకు సంప్రదించండి' : 'Request Device Authorization'}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">Narri Anel Kkumar | Ph: +91 7711889955</p>
                </div>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-3">
                  <Check className="w-10 h-10 text-indigo-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base">
                    {lang === 'te' ? 'ధన్యవాదాలు! మీ వివరాలు అందినవి.' : 'Request Received!'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'te' 
                      ? 'నార్రి అనిల్ కుమార్ గారు మిమ్మల్ని త్వరలో వాట్సాప్ లేదా ఫోన్ ద్వారా సంప్రదిస్తారు.' 
                      : 'Narri Anel Kkumar will reach out to you via WhatsApp or Phone to assist with your C: drive device authorization.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'te' ? 'మీ పేరు (Full Name)' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. S. Ramesh"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'te' ? 'ఫోన్ నంబర్ (Phone / WhatsApp)' : 'Phone / WhatsApp Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'te' ? 'డివైజ్ / సీ డ్రైవ్ సీరియల్ నంబర్ (C: Drive Serial - Optional)' : 'C: Drive Serial Number (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={cDriveSerial}
                      onChange={(e) => setCDriveSerial(e.target.value)}
                      placeholder="e.g. 1216933645"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none font-mono font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'te' ? 'రిక్వెస్ట్ పంపండి (Submit Request)' : 'Submit Device Request'}</span>
                  </button>
                </form>
              )}

              {/* Direct Call & WhatsApp Buttons */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <a
                  href="tel:+917711889955"
                  className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold py-3 px-4 rounded-xl text-sm transition shadow-sm"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call: +91 7711889955</span>
                </a>

                <a
                  href="https://wa.me/917711889955?text=Hello%20Narri%20Anel%20Kkumar%20Garu,%20I%20need%20SEED%20CAD%20LISP%20device%20authorization."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Chat on WhatsApp (+91 7711889955)</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
