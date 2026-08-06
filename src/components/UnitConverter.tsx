import React, { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Minus, 
  Trash2, 
  Copy, 
  Check, 
  RefreshCw, 
  Scale, 
  Users, 
  Coins, 
  PlusCircle, 
  SlidersHorizontal, 
  PieChart, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

interface UnitConverterProps {
  lang: 'te' | 'en';
}

interface LandRow {
  id: number;
  acres: number;
  guntas: number;
}

export const UnitConverter: React.FC<UnitConverterProps> = ({ lang }) => {
  // Active Tab: 'converter' | 'division' | 'revenue' | 'math' | 'adjustment' | 'distribution'
  const [activeTab, setActiveTab] = useState<
    'converter' | 'division' | 'revenue' | 'math' | 'adjustment' | 'distribution'
  >('converter');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ----------------------------------------------------
  // TAB 1: AREA CONVERTER
  // ----------------------------------------------------
  const [inSqm, setInSqm] = useState<number | ''>(1011.71);
  const GT_SQM = 101.171144375;
  const ACRE_SQM = GT_SQM * 40;

  const sqmVal = typeof inSqm === 'number' ? inSqm : 0;
  const convTotalGt = sqmVal / GT_SQM;
  const convAcres = Math.floor(convTotalGt / 40);
  const convGuntas = convTotalGt % 40;
  const convHectares = (sqmVal / 10000).toFixed(4);
  const convSqYards = (sqmVal * 1.19599).toFixed(2);
  const convSqFeet = (sqmVal * 10.7639).toFixed(2);

  const resetConverter = () => setInSqm('');

  // ----------------------------------------------------
  // TAB 2: LAND DIVISION
  // ----------------------------------------------------
  const [divAc, setDivAc] = useState<number | ''>(1);
  const [divGt, setDivGt] = useState<number | ''>(20);
  const [divPs, setDivPs] = useState<number | ''>(3);

  const acVal = typeof divAc === 'number' ? divAc : 0;
  const gtVal = typeof divGt === 'number' ? divGt : 0;
  const psVal = typeof divPs === 'number' && divPs > 0 ? divPs : 1;

  const divTotalGt = (acVal * 40) + gtVal;
  const divShareGt = divTotalGt / psVal;
  const divShareSqm = (divShareGt * GT_SQM).toFixed(6);
  const divShareAc = Math.floor(divShareGt / 40);
  const divShareRemGt = (divShareGt % 40).toFixed(3);

  const resetDivision = () => {
    setDivAc('');
    setDivGt('');
    setDivPs(1);
  };

  // ----------------------------------------------------
  // TAB 3: REVENUE TOOL (Rupees & Annas)
  // ----------------------------------------------------
  const [inRp, setInRp] = useState<number | ''>(15);
  const [inAn, setInAn] = useState<number | ''>(5);
  const REVENUE_CONST = 3.143245866;

  const rpVal = typeof inRp === 'number' ? inRp : 0;
  const anVal = typeof inAn === 'number' ? inAn : 0;

  const revTotalAnnas = (rpVal * 16) + anVal;
  const revLinks = revTotalAnnas * REVENUE_CONST;
  const revMeters = (revLinks / 5.0).toFixed(4);

  const resetRevenue = () => {
    setInRp('');
    setInAn('');
  };

  // ----------------------------------------------------
  // TAB 4: LAND AREA MATH (+ / -)
  // ----------------------------------------------------
  const [mathRows, setMathRows] = useState<LandRow[]>([
    { id: 1, acres: 1, guntas: 15 },
    { id: 2, acres: 0, guntas: 25 },
  ]);
  const [mathOp, setMathOp] = useState<'add' | 'sub'>('add');

  const addMathRow = () => {
    setMathRows((prev) => [
      ...prev,
      { id: Date.now(), acres: 0, guntas: 0 },
    ]);
  };

  const removeMathRow = (id: number) => {
    if (mathRows.length <= 1) return;
    setMathRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateMathRow = (id: number, field: 'acres' | 'guntas', value: number) => {
    setMathRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  let mathTotalGt = 0;
  mathRows.forEach((row, idx) => {
    const val = (row.acres || 0) * 40 + (row.guntas || 0);
    if (idx === 0) {
      mathTotalGt = val;
    } else {
      if (mathOp === 'add') mathTotalGt += val;
      else mathTotalGt -= val;
    }
  });

  const isMathNeg = mathTotalGt < 0;
  const absMathGt = Math.abs(mathTotalGt);
  const mathAcRes = Math.floor(absMathGt / 40);
  const mathGtRes = (absMathGt % 40).toFixed(2);
  const mathResultString = `${isMathNeg ? '-' : ''}${mathAcRes} Ac, ${mathGtRes} Gt`;

  const resetMath = () => {
    setMathRows([
      { id: 1, acres: 0, guntas: 0 },
      { id: 2, acres: 0, guntas: 0 },
    ]);
    setMathOp('add');
  };

  // ----------------------------------------------------
  // TAB 5: AREA ADJUSTMENT TOOL
  // ----------------------------------------------------
  const [adjRecAc, setAdjRecAc] = useState<number | ''>(5);
  const [adjRecGt, setAdjRecGt] = useState<number | ''>(0);
  const [adjGndAc, setAdjGndAc] = useState<number | ''>(4);
  const [adjGndGt, setAdjGndGt] = useState<number | ''>(30);
  const [indivAc, setIndivAc] = useState<number | ''>(1);
  const [indivGt, setIndivGt] = useState<number | ''>(0);

  const rAc = typeof adjRecAc === 'number' ? adjRecAc : 0;
  const rGt = typeof adjRecGt === 'number' ? adjRecGt : 0;
  const gAc = typeof adjGndAc === 'number' ? adjGndAc : 0;
  const gGt = typeof adjGndGt === 'number' ? adjGndGt : 0;
  const sAc = typeof indivAc === 'number' ? indivAc : 0;
  const sGt = typeof indivGt === 'number' ? indivGt : 0;

  const totalRecGt = (rAc * 40) + rGt;
  const totalGndGt = (gAc * 40) + gGt;
  const totalShareGt = (sAc * 40) + sGt;

  const adjRatio = totalRecGt > 0 ? totalGndGt / totalRecGt : 0;
  const finalShareGt = totalShareGt * adjRatio;
  const lossForThisShare = totalShareGt - finalShareGt;

  const adjFinalAc = Math.floor(finalShareGt / 40);
  const adjFinalGt = (finalShareGt % 40).toFixed(2);
  const adjFinalText = `${adjFinalAc} Ac, ${adjFinalGt} Gt`;

  const resetAdjustment = () => {
    setAdjRecAc('');
    setAdjRecGt('');
    setAdjGndAc('');
    setAdjGndGt('');
    setIndivAc('');
    setIndivGt('');
  };

  // ----------------------------------------------------
  // TAB 6: EXTRA LAND DISTRIBUTION
  // ----------------------------------------------------
  const [distOrgAc, setDistOrgAc] = useState<number | ''>(10);
  const [distOrgGt, setDistOrgGt] = useState<number | ''>(0);
  const [distExtAc, setDistExtAc] = useState<number | ''>(1);
  const [distExtGt, setDistExtGt] = useState<number | ''>(0);
  const [checkAc, setCheckAc] = useState<number | ''>(2);
  const [checkGt, setCheckGt] = useState<number | ''>(0);

  const orgAc = typeof distOrgAc === 'number' ? distOrgAc : 0;
  const orgGt = typeof distOrgGt === 'number' ? distOrgGt : 0;
  const extAc = typeof distExtAc === 'number' ? distExtAc : 0;
  const extGt = typeof distExtGt === 'number' ? distExtGt : 0;
  const cAc = typeof checkAc === 'number' ? checkAc : 0;
  const cGt = typeof checkGt === 'number' ? checkGt : 0;

  const totalOrgGt = (orgAc * 40) + orgGt;
  const totalExtGt = (extAc * 40) + extGt;
  const totalCheckGt = (cAc * 40) + cGt;

  const distRatio = totalOrgGt > 0 ? totalExtGt / totalOrgGt : 0;
  const ownerExtraGt = totalCheckGt * distRatio;
  const ownerFinalGt = totalCheckGt + ownerExtraGt;

  const ownerExtraAc = Math.floor(ownerExtraGt / 40);
  const ownerExtraGtRem = (ownerExtraGt % 40).toFixed(3);
  const ownerExtraText = `${ownerExtraAc} Ac, ${ownerExtraGtRem} Gt`;

  const ownerFinalAc = Math.floor(ownerFinalGt / 40);
  const ownerFinalGtRem = (ownerFinalGt % 40).toFixed(3);
  const ownerFinalText = `${ownerFinalAc} Ac, ${ownerFinalGtRem} Gt`;

  const resetDistribution = () => {
    setDistOrgAc('');
    setDistOrgGt('');
    setDistExtAc('');
    setDistExtGt('');
    setCheckAc('');
    setCheckGt('');
  };

  return (
    <section id="converter" className="py-16 bg-slate-50 border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>BRAHMANEE | NARRI ANEL KKUMAR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'te' 
              ? 'బ్రాహ్మణి - తెలంగాణ ల్యాండ్ సర్వే కెల్కులేషన్ సాధనాలు' 
              : 'BRAHMANEE Land Survey Calculator Suite'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            {lang === 'te' 
              ? 'ఏరియా కన్వర్టర్, ల్యాండ్ డివిజన్, రెవెన్యూ టూల్, ఎకరం-గుంటల ప్లస్/మైనస్, అడ్జస్ట్‌మెంట్ & డిస్ట్రిబ్యూషన్ సాధనాలు' 
              : 'Professional Survey Suite: Area Converter, Land Division, Revenue Tool, Land Math, Adjustment & Proportional Extra Land Distribution.'}
          </p>
        </div>

        {/* Calculator Main Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          
          {/* Navigation Tabs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            
            {/* Tab 1: Converter */}
            <button
              onClick={() => setActiveTab('converter')}
              className={`flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'converter'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Converter</span>
            </button>

            {/* Tab 2: Division */}
            <button
              onClick={() => setActiveTab('division')}
              className={`flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'division'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Division</span>
            </button>

            {/* Tab 3: Revenue */}
            <button
              onClick={() => setActiveTab('revenue')}
              className={`flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'revenue'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Revenue</span>
            </button>

            {/* Tab 4: Add / Sub */}
            <button
              onClick={() => setActiveTab('math')}
              className={`flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'math'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add / Sub</span>
            </button>

            {/* Tab 5: Adjustment */}
            <button
              onClick={() => setActiveTab('adjustment')}
              className={`flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'adjustment'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Adjustment</span>
            </button>

            {/* Tab 6: Distribution */}
            <button
              onClick={() => setActiveTab('distribution')}
              className={`flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'distribution'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Distribution</span>
            </button>

          </div>

          {/* ==================================================== */}
          {/* TAB 1: AREA CONVERTER */}
          {/* ==================================================== */}
          {activeTab === 'converter' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  <span>{lang === 'te' ? 'ఎకరాలు - గుంటలు కన్వర్టర్ (Area Converter)' : 'Area Converter'}</span>
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1.5">
                  {lang === 'te' ? 'చదరపు మీటర్లు నమోదు చేయండి (Square Meters Input)' : 'Square Meters Input'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={inSqm}
                  onChange={(e) => setInSqm(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 rounded-2xl px-4 py-3.5 text-xl font-mono text-indigo-950 font-bold outline-none shadow-inner"
                />
              </div>

              {/* Result Panel */}
              <div className="p-6 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-4">
                <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
                  <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    {lang === 'te' ? 'లెక్కింపు ఫలితం (Acres & Gunthas Result)' : 'Calculated Area Output'}
                  </span>
                  <button
                    onClick={() => handleCopy('conv', `${convAcres} Ac, ${convGuntas.toFixed(3)} Gt`)}
                    className="flex items-center space-x-1 text-xs text-indigo-700 font-bold hover:underline"
                  >
                    {copiedId === 'conv' ? <Check className="w-3.5 h-3.5 text-indigo-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'conv' ? 'Copied!' : 'Copy Result'}</span>
                  </button>
                </div>

                <div className="text-center py-2">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold text-indigo-900 tracking-tight">
                    {convAcres} Ac, {convGuntas.toFixed(3)} Gt
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center border-t border-indigo-200/80 pt-4">
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 shadow-sm">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Hectares</span>
                    <span className="text-lg font-mono font-bold text-slate-900">{convHectares} Ha</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 shadow-sm">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Sq Yards</span>
                    <span className="text-lg font-mono font-bold text-amber-800">{convSqYards} Sq.Yd</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 shadow-sm">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Square Feet</span>
                    <span className="text-lg font-mono font-bold text-teal-700">{convSqFeet} Sq.Ft</span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetConverter}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RESET ALL</span>
              </button>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: LAND DIVISION */}
          {/* ==================================================== */}
          {activeTab === 'division' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>{lang === 'te' ? 'భూమి పంపిణీ లెక్క (Land Division Calculator)' : 'Land Division Calculator'}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                    {lang === 'te' ? 'ఎకరాలు (Acres)' : 'Acres'}
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={divAc}
                    onChange={(e) => setDivAc(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-lg font-mono text-slate-900 font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                    {lang === 'te' ? 'గుంటలు (Guntas)' : 'Guntas'}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={divGt}
                    onChange={(e) => setDivGt(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-lg font-mono text-slate-900 font-bold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                  {lang === 'te' ? 'భాగస్తుల సంఖ్య (Persons / Shares)' : 'Persons / Shares Count'}
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={divPs}
                  onChange={(e) => setDivPs(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 rounded-xl px-4 py-3 text-lg font-mono text-emerald-900 font-bold outline-none"
                />
              </div>

              {/* Division Output Panel */}
              <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    {lang === 'te' ? 'ఒక్కరికి వచ్చే భాగం (Share Per Person)' : 'Individual Share Output'}
                  </span>
                  <button
                    onClick={() => handleCopy('div', `${divShareAc} Ac, ${divShareRemGt} Gt (${divShareSqm} SqM)`)}
                    className="flex items-center space-x-1 text-xs text-emerald-700 font-bold hover:underline"
                  >
                    {copiedId === 'div' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'div' ? 'Copied!' : 'Copy Share Area'}</span>
                  </button>
                </div>

                <div className="text-center py-2">
                  <span className="block text-xs font-bold text-emerald-800 uppercase mb-1">Area per person in Sq.Meters</span>
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-900 tracking-tight block">
                    {divShareSqm} Sq.M
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center shadow-sm">
                  <span className="block text-xs text-slate-500 font-bold uppercase mb-0.5">Share in Acres & Gunthas</span>
                  <span className="text-xl font-mono font-extrabold text-emerald-800">
                    {divShareAc} Ac, {divShareRemGt} Gt
                  </span>
                </div>
              </div>

              <button
                onClick={resetDivision}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RESET ALL</span>
              </button>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: REVENUE TOOL */}
          {/* ==================================================== */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-amber-600" />
                  <span>{lang === 'te' ? 'రూపాయి-ఆణాలు రెవెన్యూ టూల్ (Revenue Tool)' : 'Revenue Tool (Rupees & Annas)'}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    {lang === 'te' ? 'రూపాయిలు (Rupee)' : 'Rupee'}
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={inRp}
                    onChange={(e) => setInRp(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-amber-600 rounded-xl px-4 py-3 text-lg font-mono text-slate-900 font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    {lang === 'te' ? 'ఆణాలు (Anna)' : 'Anna'}
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={inAn}
                    onChange={(e) => setInAn(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-amber-600 rounded-xl px-4 py-3 text-lg font-mono text-slate-900 font-bold outline-none"
                  />
                </div>
              </div>

              {/* Output Panel */}
              <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    {lang === 'te' ? 'మీటర్లు & లింకులు మార్పిడి ఫలితం' : 'Meters & Links Conversion'}
                  </span>
                  <button
                    onClick={() => handleCopy('rev', `${revMeters} Meters (${revTotalAnnas} Annas, ${revLinks.toFixed(4)} Links)`)}
                    className="flex items-center space-x-1 text-xs text-amber-800 font-bold hover:underline"
                  >
                    {copiedId === 'rev' ? <Check className="w-3.5 h-3.5 text-amber-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'rev' ? 'Copied!' : 'Copy Meters'}</span>
                  </button>
                </div>

                <div className="text-center py-2">
                  <span className="block text-xs font-bold text-amber-800 uppercase mb-1">Converted Length in Meters</span>
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-900 tracking-tight block">
                    {revMeters} m
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center border-t border-amber-200 pt-3">
                  <div className="p-3 bg-white rounded-xl border border-amber-100 shadow-sm">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Total Annas</span>
                    <span className="text-lg font-mono font-bold text-slate-900">{revTotalAnnas} Annas</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-100 shadow-sm">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Total Links</span>
                    <span className="text-lg font-mono font-bold text-amber-800">{revLinks.toFixed(4)} Links</span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetRevenue}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RESET ALL</span>
              </button>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: LAND AREA MATH (+ / -) */}
          {/* ==================================================== */}
          {activeTab === 'math' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5 text-purple-600" />
                  <span>{lang === 'te' ? 'ఎకరాలు - గుంటలు సంకలనం / వ్యవకలనం (+ / -)' : 'Land Area Math (+ / -)'}</span>
                </h3>
              </div>

              {/* Operation Toggle Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setMathOp('add')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase transition flex items-center justify-center space-x-1 ${
                    mathOp === 'add'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>SUM (+)</span>
                </button>
                <button
                  onClick={() => setMathOp('sub')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase transition flex items-center justify-center space-x-1 ${
                    mathOp === 'sub'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Minus className="w-4 h-4" />
                  <span>SUB (-)</span>
                </button>
              </div>

              {/* Dynamic Rows */}
              <div className="space-y-3">
                {mathRows.map((row, index) => (
                  <div key={row.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="w-7 h-7 rounded-full bg-purple-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>

                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Acres</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={row.acres || ''}
                          onChange={(e) => updateMathRow(row.id, 'acres', parseFloat(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono font-bold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Guntas.Ps</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={row.guntas || ''}
                          onChange={(e) => updateMathRow(row.id, 'guntas', parseFloat(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono font-bold outline-none"
                        />
                      </div>
                    </div>

                    {mathRows.length > 1 && (
                      <button
                        onClick={() => removeMathRow(row.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-200 transition"
                        title="Delete Row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addMathRow}
                className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs transition flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD LAND ROW</span>
              </button>

              {/* Total Result Panel */}
              <div className="p-6 rounded-2xl bg-purple-50/80 border border-purple-200 text-center space-y-2">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                  {mathOp === 'add' ? 'మొత్తం కలిపిన భూమి (Total Sum Result)' : 'మిగిలిన భూమి (Subtraction Result)'}
                </span>

                <div className="flex items-center justify-center space-x-3">
                  <span className={`text-3xl sm:text-4xl font-mono font-extrabold tracking-tight ${isMathNeg ? 'text-red-600' : 'text-purple-900'}`}>
                    {mathResultString}
                  </span>
                  <button
                    onClick={() => handleCopy('math', mathResultString)}
                    className="p-2 rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-100 transition"
                    title="Copy Result"
                  >
                    {copiedId === 'math' ? <Check className="w-4 h-4 text-purple-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={resetMath}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>CLEAR LIST</span>
              </button>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 5: AREA ADJUSTMENT TOOL */}
          {/* ==================================================== */}
          {activeTab === 'adjustment' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <SlidersHorizontal className="w-5 h-5 text-orange-600" />
                  <span>{lang === 'te' ? 'ఏరియా అడ్జస్ట్‌మెంట్ టూల్ (Area Adjustment)' : 'Area Adjustment Tool'}</span>
                </h3>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center text-xs font-bold text-amber-900">
                రికార్డుకి, భూమికి తేడా లెక్కింపు (Record vs Ground Area Adjustment)
              </div>

              {/* Section 1: Record Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  1. Record Area (మొత్తం రికార్డు విస్తీర్ణం)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Acres"
                    value={adjRecAc}
                    onChange={(e) => setAdjRecAc(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Guntas"
                    value={adjRecGt}
                    onChange={(e) => setAdjRecGt(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                </div>
              </div>

              {/* Section 2: Ground Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  2. Ground Area (అసలు ఉన్న విస్తీర్ణం)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Acres"
                    value={adjGndAc}
                    onChange={(e) => setAdjGndAc(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Guntas"
                    value={adjGndGt}
                    onChange={(e) => setAdjGndGt(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                </div>
              </div>

              {/* Section 3: Individual Share */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-2">
                <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  3. Share Calculation (భాగస్తుని వాటా)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Share Ac"
                    value={indivAc}
                    onChange={(e) => setIndivAc(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Share Gt"
                    value={indivGt}
                    onChange={(e) => setIndivGt(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                </div>
              </div>

              {/* Adjustment Output Panel */}
              <div className="p-6 rounded-2xl bg-orange-50/90 border border-orange-200 space-y-4 text-center">
                <div>
                  <span className="block text-xs font-bold text-red-700 uppercase mb-0.5">వాటాలో తగ్గే భూమి (Reduction)</span>
                  <span className="text-2xl font-mono font-extrabold text-red-600 block">
                    {lossForThisShare.toFixed(3)} Guntas
                  </span>
                </div>

                <div className="border-t border-orange-200 pt-3">
                  <span className="block text-xs font-bold text-emerald-800 uppercase mb-0.5">అతనికి ఇవ్వాల్సిన అసలు భూమి (Final Land)</span>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-mono font-extrabold text-emerald-800">
                      {adjFinalText}
                    </span>
                    <button
                      onClick={() => handleCopy('adj', adjFinalText)}
                      className="p-2 rounded-lg bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100 transition"
                      title="Copy Final Land"
                    >
                      {copiedId === 'adj' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={resetAdjustment}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RESET ALL</span>
              </button>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 6: EXTRA LAND DISTRIBUTION */}
          {/* ==================================================== */}
          {activeTab === 'distribution' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-teal-600" />
                  <span>{lang === 'te' ? 'అదనపు భూమి పంపిణీ సాధనం (Extra Land Distribution)' : 'Extra Land Distribution'}</span>
                </h3>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-center text-xs font-bold text-teal-900">
                అదనపు భూమిని పాత విస్తీర్ణం ప్రకారం పంపిణీ (Proportional Distribution)
              </div>

              {/* Section 1: Total Record Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  1. Total Record Area (పాత మొత్తం విస్తీర్ణం)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Acres"
                    value={distOrgAc}
                    onChange={(e) => setDistOrgAc(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Guntas"
                    value={distOrgGt}
                    onChange={(e) => setDistOrgGt(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                </div>
              </div>

              {/* Section 2: Extra Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  2. Extra Area to Distribute (పంచాల్సిన అదనపు భూమి)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Acres"
                    value={distExtAc}
                    onChange={(e) => setDistExtAc(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Guntas"
                    value={distExtGt}
                    onChange={(e) => setDistExtGt(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                </div>
              </div>

              {/* Per Gunta Extra Ratio Banner */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                <span className="block text-xs font-bold text-emerald-800 uppercase">ఒక గుంటకు వచ్చే అదనపు భూమి (Ratio)</span>
                <span className="text-2xl font-mono font-extrabold text-emerald-900 block my-1">
                  {distRatio.toFixed(5)}
                </span>
                <span className="text-[11px] text-slate-600 font-bold">Guntas Extra Per 1 Gunta</span>
              </div>

              {/* Section 3: Individual Share Check */}
              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-3">
                <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider">
                  3. Individual Share Check (ఒకరి వాటాకి ఎంత వస్తుంది?)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Owner Ac"
                    value={checkAc}
                    onChange={(e) => setCheckAc(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Owner Gt"
                    value={checkGt}
                    onChange={(e) => setCheckGt(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold outline-none"
                  />
                </div>

                <div className="pt-2 text-center space-y-1">
                  <p className="text-xs text-purple-900 font-bold">
                    అతనికి వచ్చే అదనపు భూమి: <span className="text-sm font-mono font-extrabold text-purple-700">{ownerExtraText}</span>
                  </p>
                  <p className="text-xs text-purple-950 font-extrabold">
                    మొత్తం కలిపి (Final Total): <span className="text-base font-mono font-black text-emerald-700">{ownerFinalText}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={resetDistribution}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RESET ALL</span>
              </button>
            </div>
          )}

          {/* Developer Credit Signature */}
          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 font-bold flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>NARRI ANEL KKUMAR — 7711889955</span>
            <span className="text-indigo-700">BRAHMANEE Survey Calculator Suite</span>
          </div>

        </div>

      </div>
    </section>
  );
};
