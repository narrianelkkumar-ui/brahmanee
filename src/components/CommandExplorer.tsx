import React, { useState } from 'react';
import { LISP_COMMANDS } from '../data/commandsData';
import { LispCommand } from '../types';
import { Terminal, Search, Copy, Check, Compass, Tag, PieChart, Table, Scaling, ChevronRight, Sparkles } from 'lucide-react';

interface CommandExplorerProps {
  lang: 'te' | 'en';
}

export const CommandExplorer: React.FC<CommandExplorerProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalCommand, setActiveModalCommand] = useState<LispCommand | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All 13 Commands', labelTe: 'అన్ని 13 కమాండ్స్' },
    { id: 'tippon', labelEn: 'Tippon Drawing', labelTe: 'టిప్పన్ డ్రాయింగ్ (TIPPON, TFC)' },
    { id: 'labeling', labelEn: 'Text & Labels', labelTe: 'టెక్స్ట్ & లేబుల్స్ (RAM, MF, FT)' },
    { id: 'area', labelEn: 'Area Tools', labelTe: 'విస్తీర్ణం టూల్స్ (ACGT, CHKAREA, SQAREA)' },
    { id: 'tables', labelEn: 'Survey Tables', labelTe: 'పట్టికలు (CTABLE, LGTABLE)' },
    { id: 'dimensions', labelEn: 'Dimensions', labelTe: 'డైమెన్షన్స్ (DALL, PDALL, LMF2)' },
  ];

  const filteredCommands = LISP_COMMANDS.filter((cmd) => {
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.shortDescEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.shortDescTe.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopySyntax = (cmdName: string) => {
    navigator.clipboard.writeText(cmdName);
    setCopiedId(cmdName);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'tippon': return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'labeling': return <Tag className="w-4 h-4 text-teal-400" />;
      case 'area': return <PieChart className="w-4 h-4 text-amber-400" />;
      case 'tables': return <Table className="w-4 h-4 text-sky-400" />;
      case 'dimensions': return <Scaling className="w-4 h-4 text-purple-400" />;
      default: return <Terminal className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="commands" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Terminal className="w-4 h-4 text-amber-600" />
            <span>{lang === 'te' ? 'కమాండ్ల మార్గదర్శిని' : '13 Integrated Commands Directory'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'te' ? 'SUPER MASTER LISP పూర్తి కమాండ్ల వివరాలు' : 'Super Master LISP Command Explorer'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'te' 
              ? 'ఆటోక్యాడ్‌లో ఈ కమాండ్‌ను ఎలా వాడాలో, వాటి ఇన్పుట్లు మరియు ఉదాహరణలతో సహా తెలుసుకోండి.' 
              : 'Detailed documentation for all 16 survey and drafting automation tools built into SEED CAD LISP.'}
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-2xl w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'te' ? cat.labelTe : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'te' ? 'కమాండ్ శోధించండి (Search...)' : 'Search command e.g. TIPPON, TFC, RAM...'}
              className="w-full bg-white border border-slate-300 focus:border-indigo-600 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 outline-none transition shadow-sm font-medium"
            />
          </div>

        </div>

        {/* Command Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommands.map((cmd) => (
            <div
              key={cmd.id}
              className="group relative rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 p-6 flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                {/* Top Title Bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                      {getCategoryIcon(cmd.category)}
                    </div>
                    <span className="font-mono text-xl font-bold text-indigo-700 tracking-wider">
                      {cmd.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopySyntax(cmd.name)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition text-xs font-mono flex items-center space-x-1"
                    title="Copy command name"
                  >
                    {copiedId === cmd.name ? (
                      <Check className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Descriptions */}
                <p className="text-slate-900 font-bold text-sm mb-1">
                  {lang === 'te' ? cmd.shortDescTe : cmd.shortDescEn}
                </p>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                  {lang === 'te' ? cmd.longDescTe : cmd.longDescEn}
                </p>

                {/* Syntax Snippet Box */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300 mb-4 overflow-x-auto">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block mb-0.5">AutoCAD Command Syntax:</span>
                  <code>{cmd.syntax}</code>
                </div>
              </div>

              {/* View Full Details Button */}
              <button
                onClick={() => setActiveModalCommand(cmd)}
                className="w-full flex items-center justify-center space-x-1 py-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 text-xs font-bold transition"
              >
                <span>{lang === 'te' ? 'పూర్తి వివరాలు చూడండి' : 'View Full Details'}</span>
                <ChevronRight className="w-4 h-4 text-indigo-600" />
              </button>

            </div>
          ))}
        </div>

        {/* Modal for Command Details */}
        {activeModalCommand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                    {getCategoryIcon(activeModalCommand.category)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-mono font-bold text-slate-900">{activeModalCommand.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">Category: {activeModalCommand.category.toUpperCase()}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalCommand(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200"
                >
                  ✕ Close
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4 text-sm text-slate-800">
                <div>
                  <h4 className="font-bold text-indigo-700 mb-1">
                    {lang === 'te' ? 'వివరణ (Description)' : 'Detailed Description'}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {lang === 'te' ? activeModalCommand.longDescTe : activeModalCommand.longDescEn}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-bold text-indigo-900 mb-2">
                    {lang === 'te' ? 'ముఖ్యమైన విశేషాలు (Key Features)' : 'Key Capabilities'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeModalCommand.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example Usage Box */}
                <div>
                  <h4 className="font-bold text-amber-800 mb-1">
                    {lang === 'te' ? 'ఉదాహరణ వాడకం (Example Command Prompt Log)' : 'Command Prompt Example'}
                  </h4>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto whitespace-pre-wrap">
                    {activeModalCommand.exampleUsage}
                  </pre>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => handleCopySyntax(activeModalCommand.name)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center space-x-2 shadow-md shadow-indigo-100"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy &quot;{activeModalCommand.name}&quot; Command</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
