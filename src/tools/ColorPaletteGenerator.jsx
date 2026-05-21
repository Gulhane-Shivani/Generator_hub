import React, { useState, useEffect } from 'react';
import { FaCopy, FaCheck, FaSync, FaPalette, FaEye, FaCode } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const ColorPaletteGenerator = () => {
  const { showToast } = () => {
    try {
      return useApp();
    } catch {
      return { showToast: (msg) => console.log(msg) };
    }
  };

  const appCtx = useApp();
  const triggerToast = appCtx ? appCtx.showToast : (msg) => console.log(msg);

  const [baseColor, setBaseColor] = useState('#6366f1'); // default indigo
  const [type, setType] = useState('analogous'); // analogous, monochromatic, complementary, triadic, compound
  const [palette, setPalette] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);
  const [exportFormat, setExportFormat] = useState('css'); // css, scss, tailwind, json
  const [showExportModal, setShowExportModal] = useState(false);

  // Helper: HEX to HSL
  const hexToHsl = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Helper: HSL to HEX
  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    let rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    let gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    let bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  };

  const generatePalette = () => {
    const { h, s, l } = hexToHsl(baseColor);
    let colors = [];

    switch (type) {
      case 'monochromatic':
        colors = [
          hslToHex(h, s, Math.max(10, l - 30)),
          hslToHex(h, s, Math.max(20, l - 15)),
          baseColor,
          hslToHex(h, Math.max(10, s - 10), Math.min(90, l + 15)),
          hslToHex(h, Math.max(10, s - 20), Math.min(95, l + 30))
        ];
        break;
      case 'analogous':
        colors = [
          hslToHex((h + 330) % 360, s, Math.max(25, l - 5)),
          hslToHex((h + 345) % 360, s, Math.max(20, l - 2)),
          baseColor,
          hslToHex((h + 15) % 360, s, Math.min(90, l + 2)),
          hslToHex((h + 30) % 360, s, Math.min(95, l + 5))
        ];
        break;
      case 'complementary':
        colors = [
          hslToHex(h, s, Math.max(20, l - 15)),
          baseColor,
          hslToHex(h, Math.max(10, s - 20), Math.min(90, l + 20)),
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 180) % 360, s, Math.max(20, l - 15))
        ];
        break;
      case 'triadic':
        colors = [
          baseColor,
          hslToHex(h, s, Math.min(90, l + 15)),
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l),
          hslToHex((h + 240) % 360, Math.max(10, s - 20), Math.min(90, l + 20))
        ];
        break;
      case 'compound':
        colors = [
          baseColor,
          hslToHex((h + 30) % 360, s, l),
          hslToHex((h + 150) % 360, s, l),
          hslToHex((h + 180) % 360, s, Math.max(15, l - 10)),
          hslToHex((h + 210) % 360, s, l)
        ];
        break;
      default:
        break;
    }
    setPalette(colors);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setBaseColor(color);
  };

  // Re-run color generator when base color or type changes
  useEffect(() => {
    generatePalette();
  }, [baseColor, type]);

  const copyColor = (hex, idx) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(idx);
    triggerToast(`Copied ${hex}!`, 'success');
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const getExportText = () => {
    switch (exportFormat) {
      case 'css':
        return `:root {\n` + palette.map((c, i) => `  --color-palette-${i + 1}: ${c};`).join('\n') + `\n}`;
      case 'scss':
        return palette.map((c, i) => `$color-palette-${i + 1}: ${c};`).join('\n');
      case 'tailwind':
        return `colors: {\n  palette: {\n` + palette.map((c, i) => `    ${(i + 1) * 100}: '${c}',`).join('\n') + `\n  }\n}`;
      case 'json':
        return JSON.stringify(palette, null, 2);
      default:
        return '';
    }
  };

  const copyExport = () => {
    navigator.clipboard.writeText(getExportText());
    triggerToast('Export format copied!', 'success');
    setShowExportModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Settings Row */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        
        {/* Base Color Picker */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex-shrink-0 cursor-pointer shadow">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="absolute inset-[-10px] w-20 h-20 cursor-pointer p-0 border-0"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
              Base Color
            </label>
            <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-350 uppercase select-all">
              {baseColor}
            </span>
          </div>
        </div>

        {/* Harmony Type Options */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'analogous', label: 'Analogous' },
            { id: 'monochromatic', label: 'Monochromatic' },
            { id: 'complementary', label: 'Complementary' },
            { id: 'triadic', label: 'Triadic' },
            { id: 'compound', label: 'Compound' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id)}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                type === item.id
                  ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Randomize Action */}
        <button
          onClick={generateRandomColor}
          className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300 flex-shrink-0 cursor-pointer"
          title="Random Base Color"
        >
          <FaSync className="text-sm" />
        </button>
      </div>

      {/* Colors Display Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {palette.map((color, index) => (
          <div
            key={index}
            onClick={() => copyColor(color, index)}
            className="glass-effect rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 cursor-pointer group shadow hover:shadow-md transition-all flex flex-col"
          >
            {/* Color block */}
            <div
              className="h-32 w-full transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ backgroundColor: color }}
            ></div>
            
            {/* Metadata */}
            <div className="p-3 bg-white dark:bg-slate-900 flex-1 flex flex-col justify-between items-center text-center">
              <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 uppercase select-all">
                {color}
              </span>
              <span className="text-[9px] text-slate-400 font-semibold flex items-center gap-1 mt-1 uppercase">
                {copiedColor === index ? (
                  <>
                    <FaCheck className="text-emerald-500" /> Copied
                  </>
                ) : (
                  <>
                    <FaCopy /> Hex code
                  </>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Export Panel & Mock UI Preview Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Mock UI Preview Panel (Takes 2 Columns) */}
        <div className="lg:col-span-2 glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-200/30 dark:border-slate-800/30">
            <FaEye className="text-violet-500" /> Live Component UI Mockup
          </h3>

          {/* Render Mock Component */}
          {palette.length >= 5 && (
            <div className="p-6 rounded-2xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-55 dark:bg-slate-955 space-y-4 shadow-inner">
              
              {/* Header */}
              <div 
                className="p-4 rounded-xl text-white flex items-center justify-between shadow-sm select-none"
                style={{ backgroundColor: palette[0] }}
              >
                <div>
                  <h4 className="text-sm font-bold tracking-tight">System Portal</h4>
                  <p className="text-[10px] text-white/80">Active palette dynamic theme engine</p>
                </div>
                <div 
                  className="px-2.5 py-0.5 rounded text-[8px] font-extrabold uppercase text-white/90"
                  style={{ backgroundColor: palette[1] }}
                >
                  Online
                </div>
              </div>

              {/* Body Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/30 space-y-2">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-250">Card Widget Mockup</h5>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                    Dynamic elements derive layout backgrounds and buttons directly from your matching harmony selection.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      className="px-3 py-1.5 rounded-lg text-[9px] font-bold text-white shadow-sm transition-all"
                      style={{ backgroundColor: palette[2] }}
                    >
                      Primary Call
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg text-[9px] font-bold border transition-all"
                      style={{ 
                        borderColor: palette[3],
                        color: palette[3]
                      }}
                    >
                      Secondary
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/30 space-y-3">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-250">Metrics Summary</h5>
                  <div className="flex gap-2">
                    <div 
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: palette[4] }}
                    ></div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Status Sync Indicator
                    </span>
                  </div>
                  
                  {/* Decorative Progress bar */}
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: palette[1],
                        width: '70%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Export Panel (Takes 1 Column) */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <FaCode className="text-violet-500" /> Export Options
            </h3>
            
            {/* Format selection */}
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'css', label: 'CSS Variables' },
                { id: 'scss', label: 'SCSS Map Variables' },
                { id: 'tailwind', label: 'Tailwind Config block' },
                { id: 'json', label: 'Raw JSON Format' }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => {
                    setExportFormat(fmt.id);
                    setShowExportModal(true);
                  }}
                  className="w-full text-left py-2 px-3 rounded-xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 transition-all font-semibold text-xs text-slate-700 dark:text-slate-350 cursor-pointer"
                >
                  Generate {fmt.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-2 text-[10px] text-slate-400 font-semibold flex items-center gap-1.5 leading-relaxed">
            <FaPalette className="text-violet-500 text-xs animate-bounce" /> Click any color card above to copy HEX values.
          </div>
        </div>
      </div>

      {/* Export Format Code Modal overlay */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-effect rounded-3xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/20 dark:border-slate-800/20">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                Export Palette ({exportFormat.toUpperCase()})
              </h4>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                Close
              </button>
            </div>
            
            <textarea
              readOnly
              value={getExportText()}
              rows={8}
              className="w-full p-4 rounded-xl font-mono text-[11px] glass-input bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 text-slate-800 dark:text-slate-300 outline-none resize-none cursor-default"
            />

            <div className="flex gap-2">
              <button
                onClick={copyExport}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <FaCopy /> Copy Code Format
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ColorPaletteGenerator;
