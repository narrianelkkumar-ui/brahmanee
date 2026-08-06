import React, { useState, useEffect, useRef } from 'react';
import { TipponSegment } from '../types';
import { Play, RotateCcw, Link2, CheckCircle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, CornerDownLeft, Sparkles, Layers, Info } from 'lucide-react';

interface TipponSimulatorProps {
  lang: 'te' | 'en';
}

export const TipponSimulator: React.FC<TipponSimulatorProps> = ({ lang }) => {
  const [inputVal, setInputVal] = useState<string>('15-5');
  const [segments, setSegments] = useState<TipponSegment[]>([]);
  const [currentPt, setCurrentPt] = useState<{ x: number; y: number }>({ x: 300, y: 300 });
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [logMessages, setLogMessages] = useState<string[]>(['[SYSTEM] Tippon Simulator initialized. Select direction key (8, 2, 4, 6) or enter Rupee-Annas.']);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Conversion math function matching LISP script
  const parseRupeeAnnasToMeters = (valStr: string): { rupees: number; annas: number; totalAnnas: number; links: number; meters: number; feet: number } => {
    let rupees = 0;
    let annas = 0;
    const cleanStr = valStr.trim();

    if (cleanStr.includes('-')) {
      const parts = cleanStr.split('-');
      rupees = parseFloat(parts[0]) || 0;
      annas = parseFloat(parts[1]) || 0;
    } else {
      const num = parseFloat(cleanStr) || 0;
      // If entered as single number without hyphen, treat as meters
      const totalAnnasFromMeters = (num * 5.0) / 3.143245866;
      rupees = Math.floor(totalAnnasFromMeters / 16.0);
      annas = Math.round(totalAnnasFromMeters % 16.0);
      const links = num * 5.0;
      return {
        rupees,
        annas,
        totalAnnas: totalAnnasFromMeters,
        links,
        meters: num,
        feet: num * 3.28084
      };
    }

    const totalAnnas = rupees * 16 + annas;
    const links = totalAnnas * 3.143245866;
    const meters = links / 5.0;
    const feet = meters * 3.28084;

    return { rupees, annas, totalAnnas, links, meters, feet };
  };

  const handleAddSegment = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT', keyChar: string) => {
    if (isClosed) {
      setLogMessages(prev => [`[WARNING] Polygon is already closed with TFC. Clear canvas to start new Tippon.`, ...prev]);
      return;
    }

    const conv = parseRupeeAnnasToMeters(inputVal);
    if (conv.meters <= 0) {
      setLogMessages(prev => [`[ERROR] Invalid distance input. Please use format like "15-5" or "12-8".`, ...prev]);
      return;
    }

    // Scale factor for canvas display (e.g. 1 meter = 8 pixels)
    const scale = 8;
    let dx = 0;
    let dy = 0;

    if (dir === 'UP') dy = -conv.meters * scale; // Canvas Y goes downwards
    if (dir === 'DOWN') dy = conv.meters * scale;
    if (dir === 'LEFT') dx = -conv.meters * scale;
    if (dir === 'RIGHT') dx = conv.meters * scale;

    const nextPt = { x: currentPt.x + dx, y: currentPt.y + dy };

    const newSeg: TipponSegment = {
      id: Math.random().toString(36).substring(2, 9),
      p1: { ...currentPt },
      p2: { ...nextPt },
      rawInput: inputVal,
      rupees: conv.rupees,
      annas: conv.annas,
      meters: conv.meters,
      feet: conv.feet,
      direction: dir,
      directionKey: keyChar
    };

    setSegments(prev => [...prev, newSeg]);
    setCurrentPt(nextPt);

    const logText = `[TIPPON] Drawn ${dir} (${keyChar}) -> ${inputVal} (${conv.meters.toFixed(2)}m / ${conv.feet.toFixed(1)}ft / ${conv.links.toFixed(1)} links)`;
    setLogMessages(prev => [logText, ...prev]);
  };

  const handleTFCConnect = () => {
    if (segments.length < 2) {
      setLogMessages(prev => [`[TFC] Need at least 2 segments to connect/close polygon.`, ...prev]);
      return;
    }
    if (isClosed) return;

    const startPt = segments[0].p1;
    const dx = startPt.x - currentPt.x;
    const dy = startPt.y - currentPt.y;
    const canvasDist = Math.sqrt(dx * dx + dy * dy);
    const scale = 8;
    const meters = canvasDist / scale;

    // Convert closing distance back to Rupees-Annas
    const totalAnnas = (meters * 5.0) / 3.143245866;
    let rupees = Math.floor(totalAnnas / 16.0);
    let annas = Math.round(totalAnnas % 16.0);
    if (annas === 16) {
      rupees += 1;
      annas = 0;
    }

    const rawInput = `${rupees}-${annas}`;
    const feet = meters * 3.28084;

    let dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' = 'RIGHT';
    if (Math.abs(dx) > Math.abs(dy)) {
      dir = dx > 0 ? 'RIGHT' : 'LEFT';
    } else {
      dir = dy > 0 ? 'DOWN' : 'UP';
    }

    const closingSeg: TipponSegment = {
      id: 'tfc-closing',
      p1: { ...currentPt },
      p2: { ...startPt },
      rawInput,
      rupees,
      annas,
      meters,
      feet,
      direction: dir,
      directionKey: 'TFC'
    };

    setSegments(prev => [...prev, closingSeg]);
    setCurrentPt(startPt);
    setIsClosed(true);

    setLogMessages(prev => [
      `[TFC CONNECT] Gap filled! Closed polygon with final segment ${rawInput} (${meters.toFixed(2)}m). Labels auto-calculated.`,
      ...prev
    ]);
  };

  const handleUndo = () => {
    if (segments.length === 0) return;
    const newSegs = [...segments];
    const removed = newSegs.pop();
    setSegments(newSegs);
    setIsClosed(false);
    if (newSegs.length > 0) {
      setCurrentPt({ ...newSegs[newSegs.length - 1].p2 });
    } else {
      setCurrentPt({ x: 300, y: 300 });
    }
    setLogMessages(prev => [`[UNDO] Removed last segment.`, ...prev]);
  };

  const handleReset = () => {
    setSegments([]);
    setCurrentPt({ x: 300, y: 300 });
    setIsClosed(false);
    setLogMessages(['[SYSTEM] Canvas cleared. Ready for new Tippon drawing.']);
  };

  // Load sample Tippon preset
  const handleLoadPreset = (presetType: string) => {
    handleReset();
    setSelectedPreset(presetType);

    let sampleInputs: { val: string; dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'; key: string }[] = [];

    if (presetType === 'plot1') {
      // Telangana Plot Example 1
      sampleInputs = [
        { val: '15-5', dir: 'RIGHT', key: '6' },
        { val: '12-8', dir: 'DOWN', key: '2' },
        { val: '16-0', dir: 'LEFT', key: '4' },
      ];
    } else if (presetType === 'plot2') {
      // Telangana Plot Example 2
      sampleInputs = [
        { val: '18-4', dir: 'UP', key: '8' },
        { val: '22-10', dir: 'RIGHT', key: '6' },
        { val: '15-0', dir: 'DOWN', key: '2' },
        { val: '20-8', dir: 'LEFT', key: '4' },
      ];
    }

    let startPoint = { x: 250, y: 250 };
    let cPt = { ...startPoint };
    const scale = 8;
    const newSegs: TipponSegment[] = [];

    sampleInputs.forEach((item) => {
      const conv = parseRupeeAnnasToMeters(item.val);
      let dx = 0;
      let dy = 0;
      if (item.dir === 'UP') dy = -conv.meters * scale;
      if (item.dir === 'DOWN') dy = conv.meters * scale;
      if (item.dir === 'LEFT') dx = -conv.meters * scale;
      if (item.dir === 'RIGHT') dx = conv.meters * scale;

      const nextPt = { x: cPt.x + dx, y: cPt.y + dy };
      newSegs.push({
        id: Math.random().toString(36).substring(2, 9),
        p1: { ...cPt },
        p2: { ...nextPt },
        rawInput: item.val,
        rupees: conv.rupees,
        annas: conv.annas,
        meters: conv.meters,
        feet: conv.feet,
        direction: item.dir,
        directionKey: item.key
      });
      cPt = nextPt;
    });

    setSegments(newSegs);
    setCurrentPt(cPt);
    setLogMessages(prev => [`[PRESET] Loaded ${presetType} with ${sampleInputs.length} segments. Click TFC to auto-connect.`, ...prev]);
  };

  // Compute total area if polygon has >= 3 vertices
  const computePolygonArea = () => {
    if (segments.length < 3) return { sqMeters: 0, sqFeet: 0, acres: 0, gunthas: 0 };

    // Shoelace formula on vertices
    const points = [segments[0].p1, ...segments.map(s => s.p2)];
    let areaPixels = 0;
    for (let i = 0; i < points.length - 1; i++) {
      areaPixels += (points[i].x * points[i + 1].y) - (points[i + 1].x * points[i].y);
    }
    areaPixels = Math.abs(areaPixels) / 2.0;

    // Scale is 8 pixels = 1 meter, so 64 pixels^2 = 1 Sq.Meter
    const sqMeters = areaPixels / 64.0;
    const sqFeet = sqMeters * 10.7639;

    // Telangana Area: 1 Guntha = 101.1711 Sq.Meters, 1 Acre = 40 Gunthas
    const totalGunthas = sqMeters / 101.171144375;
    const acres = Math.floor(totalGunthas / 40);
    const gunthas = totalGunthas % 40;

    return { sqMeters, sqFeet, acres, gunthas };
  };

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#090d16'; // AutoCAD dark viewport background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw Origin Crosshair
    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, canvas.height);
    ctx.moveTo(0, 300);
    ctx.lineTo(canvas.width, 300);
    ctx.stroke();

    // Draw Segments
    segments.forEach((seg, idx) => {
      // Line
      ctx.strokeStyle = seg.directionKey === 'TFC' ? '#f59e0b' : '#10b981'; // Amber for TFC closing, Emerald for normal
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(seg.p1.x, seg.p1.y);
      ctx.lineTo(seg.p2.x, seg.p2.y);
      ctx.stroke();

      // Vertex Node 1 & 2
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(seg.p1.x, seg.p1.y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(seg.p2.x, seg.p2.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Vertex S.No Text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`P${idx + 1}`, seg.p1.x + 6, seg.p1.y - 6);

      // Label at midpoint
      const midX = (seg.p1.x + seg.p2.x) / 2;
      const midY = (seg.p1.y + seg.p2.y) / 2;

      ctx.fillStyle = seg.directionKey === 'TFC' ? '#fbbf24' : '#6ee7b7';
      ctx.font = 'bold 11px Inter, sans-serif';
      const labelText = `${seg.rawInput} (${seg.meters.toFixed(2)}m)`;

      // Label background box
      const textWidth = ctx.measureText(labelText).width;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(midX - textWidth / 2 - 4, midY - 14, textWidth + 8, 18);
      ctx.strokeStyle = seg.directionKey === 'TFC' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(16, 185, 129, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(midX - textWidth / 2 - 4, midY - 14, textWidth + 8, 18);

      // Text
      ctx.fillStyle = seg.directionKey === 'TFC' ? '#fbbf24' : '#34d399';
      ctx.textAlign = 'center';
      ctx.fillText(labelText, midX, midY - 1);
      ctx.textAlign = 'left';
    });

    // Highlight Current Active Point
    if (segments.length > 0) {
      const lastPt = currentPt;
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(lastPt.x, lastPt.y, 8, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Start Point Marker
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(300, 300, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6ee7b7';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Start Point (0,0)', 310, 305);
    }

    // Fill polygon if closed
    if (isClosed && segments.length >= 3) {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.moveTo(segments[0].p1.x, segments[0].p1.y);
      segments.forEach(s => ctx.lineTo(s.p2.x, s.p2.y));
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

  }, [segments, currentPt, isClosed]);

  const area = computePolygonArea();

  return (
    <section id="simulator" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{lang === 'te' ? 'ఆటోక్యాడ్ టిప్పన్ లైవ్ సిమ్యులేటర్' : 'Interactive AutoCAD Tippon Simulator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'te' ? 'టిప్పన్ డ్రాయింగ్ ప్రత్యక్షంగా ప్రయత్నించండి' : 'Try Tippon Drawing Live on Web'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'te' ? (
              'రూపాయిలు-ఆణాలు (ఉదా: 15-5) కొట్టి నంపాడ్ దిశలు (8, 2, 4, 6) ప్రెస్ చేయండి. LISP కొలతలను ఎలా మారుస్తుందో మరియు TFC గ్యాప్‌లను ఎలా సరిచేస్తుందో చూడండి!'
            ) : (
              'Test how SEED CAD LISP calculates Rupees-Annas, Links, Meters, and Feet in real time. Click direction buttons to build your Tippon map.'
            )}
          </p>
        </div>

        {/* Main Grid: Controls & Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Input Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-indigo-700 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>{lang === 'te' ? 'కొలత నమోదు (Rupee-Annas Input)' : 'Measurement Input'}</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'te' ? 'రూపాయిలు - ఆణాలు టైప్ చేయండి (ఉదా: 15-5, 12-8, 10-0)' : 'Enter Rupees-Annas (e.g. 15-5, 12-8, 10-0)'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="15-5"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 rounded-xl px-4 py-3 text-lg font-mono font-bold text-indigo-900 outline-none transition"
                  />
                  <span className="absolute right-3 top-3.5 text-xs text-slate-500 font-mono font-semibold">Rs-Annas</span>
                </div>
              </div>

              {/* Conversion Preview Card */}
              {(() => {
                const conv = parseRupeeAnnasToMeters(inputVal);
                return (
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Annas: <strong className="text-slate-900">{conv.totalAnnas.toFixed(1)}</strong></span>
                      <span>Links: <strong className="text-amber-800 font-bold">{conv.links.toFixed(2)}</strong></span>
                    </div>
                    <div className="flex justify-between text-slate-800 pt-1 border-t border-indigo-200/80">
                      <span>Meters: <strong className="text-indigo-700 text-sm">{conv.meters.toFixed(2)} m</strong></span>
                      <span>Feet: <strong className="text-teal-700 text-sm">{conv.feet.toFixed(2)} ft</strong></span>
                    </div>
                  </div>
                );
              })()}

              {/* Direction Numpad Controls */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  {lang === 'te' ? 'నంపాడ్ దిశలు ఎంచుకోండి (Keypad Controls)' : 'Select Direction (Keypad Mapping)'}
                </label>

                <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                  <div></div>
                  <button
                    onClick={() => handleAddSegment('UP', '8')}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 text-indigo-700 border border-slate-200 hover:border-indigo-300 transition active:scale-95 shadow-sm font-bold"
                    title="8 = UP (ఉత్తరం)"
                  >
                    <ArrowUp className="w-5 h-5 mb-0.5 text-indigo-600" />
                    <span className="text-[10px] font-mono font-bold">8 (UP)</span>
                  </button>
                  <div></div>

                  <button
                    onClick={() => handleAddSegment('LEFT', '4')}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 text-indigo-700 border border-slate-200 hover:border-indigo-300 transition active:scale-95 shadow-sm font-bold"
                    title="4 = LEFT (పశ్చిమం)"
                  >
                    <ArrowLeft className="w-5 h-5 mb-0.5 text-indigo-600" />
                    <span className="text-[10px] font-mono font-bold">4 (LEFT)</span>
                  </button>

                  <button
                    onClick={handleTFCConnect}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition active:scale-95 font-bold shadow-sm"
                    title="TFC = Tippon Fix & Connect"
                  >
                    <CornerDownLeft className="w-4 h-4 mb-0.5 text-amber-700" />
                    <span className="text-[9px] font-bold uppercase">TFC Fix</span>
                  </button>

                  <button
                    onClick={() => handleAddSegment('RIGHT', '6')}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 text-indigo-700 border border-slate-200 hover:border-indigo-300 transition active:scale-95 shadow-sm font-bold"
                    title="6 = RIGHT (తూర్పు)"
                  >
                    <ArrowRight className="w-5 h-5 mb-0.5 text-indigo-600" />
                    <span className="text-[10px] font-mono font-bold">6 (RIGHT)</span>
                  </button>

                  <div></div>
                  <button
                    onClick={() => handleAddSegment('DOWN', '2')}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-indigo-50 text-indigo-700 border border-slate-200 hover:border-indigo-300 transition active:scale-95 shadow-sm font-bold"
                    title="2 = DOWN (దక్షణం)"
                  >
                    <ArrowDown className="w-5 h-5 mb-0.5 text-indigo-600" />
                    <span className="text-[10px] font-mono font-bold">2 (DOWN)</span>
                  </button>
                  <div></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={handleTFCConnect}
                  disabled={segments.length < 2 || isClosed}
                  className="flex-1 flex items-center justify-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-indigo-100 transition"
                >
                  <CornerDownLeft className="w-4 h-4" />
                  <span>{lang === 'te' ? 'TFC కనెక్ట్ చేయండి' : 'TFC Connect Polygon'}</span>
                </button>

                <button
                  onClick={handleUndo}
                  disabled={segments.length === 0}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 disabled:opacity-40 text-xs font-semibold"
                  title="Undo Last Segment"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="px-3 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold"
                >
                  {lang === 'te' ? 'రీసెట్' : 'Reset'}
                </button>
              </div>

            </div>

            {/* Presets Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {lang === 'te' ? 'శాకింపు శాంపిల్ పటాలు (Sample Plots)' : 'Load Sample Telangana Tippon Plots'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleLoadPreset('plot1')}
                  className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold text-left"
                >
                  📐 {lang === 'te' ? 'పటం 1 (3 సెగ్మెంట్లు)' : 'Sample Tippon 1'}
                </button>
                <button
                  onClick={() => handleLoadPreset('plot2')}
                  className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold text-left"
                >
                  🔷 {lang === 'te' ? 'పటం 2 (4 సెగ్మెంట్లు)' : 'Sample Tippon 2'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Canvas & Live Summary */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* AutoCAD Style Viewport */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Viewport Top Bar */}
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-slate-200 font-bold">AutoCAD 2026 Model Viewport</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-emerald-400">Layer: 0_TIPPON</span>
                </div>
                <div>
                  Segments: <strong className="text-white">{segments.length}</strong>
                </div>
              </div>

              {/* Canvas element */}
              <div className="relative flex justify-center bg-[#090d16]">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={420}
                  className="w-full h-auto max-h-[420px] object-contain cursor-crosshair"
                />

                {/* Corner Info Overlay */}
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-800 p-2.5 rounded-xl text-[11px] font-mono text-slate-300 space-y-0.5 pointer-events-none">
                  <div>X: {currentPt.x.toFixed(1)} Y: {currentPt.y.toFixed(1)} Z: 0.00</div>
                  <div className="text-emerald-400">Scale: 1m = 8px | Grid: 25px</div>
                </div>
              </div>

              {/* Area & Polygon Calculation Results Banner */}
              {isClosed && area.sqMeters > 0 && (
                <div className="bg-emerald-950/80 border-t border-emerald-500/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{lang === 'te' ? 'టిప్పన్ విస్తీర్ణం లెక్కించబడింది (Area Details)' : 'Tippon Plot Area Result'}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                      ACGT / CHKAREA
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                    <div className="bg-slate-950/60 p-2 rounded-lg border border-emerald-500/30">
                      <span className="block text-[10px] text-slate-400">{lang === 'te' ? 'ఎకరాలు - గుంటలు' : 'Acres - Gunthas'}</span>
                      <strong className="text-emerald-300 text-sm sm:text-base">
                        Ac. {area.acres < 10 ? `0${area.acres}` : area.acres} - {area.gunthas < 10 ? `0${area.gunthas.toFixed(2)}` : area.gunthas.toFixed(2)} Gts
                      </strong>
                    </div>

                    <div className="bg-slate-950/60 p-2 rounded-lg border border-emerald-500/30">
                      <span className="block text-[10px] text-slate-400">{lang === 'te' ? 'చదరపు మీటర్లు' : 'Sq. Meters'}</span>
                      <strong className="text-teal-300 text-sm sm:text-base">
                        {area.sqMeters.toFixed(2)} m²
                      </strong>
                    </div>

                    <div className="bg-slate-950/60 p-2 rounded-lg border border-emerald-500/30">
                      <span className="block text-[10px] text-slate-400">{lang === 'te' ? 'చదరపు ఫీట్లు' : 'Sq. Feet'}</span>
                      <strong className="text-amber-300 text-sm sm:text-base">
                        {area.sqFeet.toFixed(2)} ft²
                      </strong>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* AutoCAD Log Window */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1 max-h-36 overflow-y-auto">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>AutoCAD Command Line Output</span>
                <span className="text-emerald-400">SUPER MASTER LISP</span>
              </div>
              {logMessages.map((msg, i) => (
                <div key={i} className="leading-relaxed border-l-2 border-emerald-500/40 pl-2 py-0.5">
                  {msg}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
