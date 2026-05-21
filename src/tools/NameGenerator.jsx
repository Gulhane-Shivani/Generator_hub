import React, { useState } from 'react';
import { FaCopy, FaCheck, FaSync, FaInfoCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const NameGenerator = () => {
  const { showToast } = useApp();
  const [keyword, setKeyword] = useState('');
  const [mode, setMode] = useState('business'); // business, brand, character
  const [names, setNames] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const prefixes = {
    business: ['Apex', 'Nova', 'Vertex', 'Stellar', 'Core', 'Quantum', 'Nexus', 'Omni', 'Vanguard', 'Alpha', 'Flux', 'Zenith'],
    brand: ['Volt', 'Vibe', 'Zing', 'Sleek', 'Crisp', 'Jolt', 'Zest', 'Lux', 'Zoom', 'Glide', 'Bolt', 'Hype'],
    character: ['Shadow', 'Iron', 'Frost', 'Storm', 'Cyber', 'Night', 'Gamer', 'Phoenix', 'Ghost', 'Rogue', 'Titan', 'Zephyr']
  };

  const suffixes = {
    business: ['Solutions', 'Hub', 'Labs', 'Co', 'Ventures', 'Group', 'Partners', 'Systems', 'Global', 'Technologies', 'Studios', 'Networks'],
    brand: ['ify', 'ly', 'io', 'sy', 'ora', 'zen', 'verse', 'wave', 'grid', 'base', 'dock', 'space'],
    character: ['Blade', 'Claw', 'Fang', 'Hunter', 'Knight', 'Slayer', 'Viper', 'Wolf', 'Rage', 'Strike', 'Phoenix', 'Master']
  };

  const nameFormulas = {
    business: (kw, p, s) => {
      const anchor = kw || 'Spark';
      const results = [
        `${anchor} ${s}`,
        `${p} ${anchor}`,
        `${anchor}ly`,
        `${p}${anchor}`,
        `${anchor} Ventures`,
        `${anchor} & Co`,
        `The ${anchor} Group`,
        `${anchor} Labs`
      ];
      return results;
    },
    brand: (kw, p, s) => {
      const anchor = kw || 'Flow';
      const results = [
        `${anchor}${s}`,
        `${p}${anchor.toLowerCase()}`,
        `${anchor}ify`,
        `${anchor}ly`,
        `${anchor}zo`,
        `${p}${anchor.toLowerCase()}io`,
        `Aero${anchor}`,
        `${anchor}verse`
      ];
      return results;
    },
    character: (kw, p, s) => {
      const anchor = kw || 'Rider';
      const results = [
        `${p}${anchor}`,
        `${anchor}${s}`,
        `Cyber_${anchor}`,
        `Lord_${anchor}`,
        `${anchor}_Rage`,
        `Neo${anchor}`,
        `${p}_${anchor}`,
        `${anchor}Slayer`
      ];
      return results;
    }
  };

  const generateNames = () => {
    const pList = prefixes[mode];
    const sList = suffixes[mode];
    const formula = nameFormulas[mode];

    // Pick 12 random variations using prefixes and suffixes
    const results = [];
    const usedCombinations = new Set();

    while (results.length < 16) {
      const randomP = pList[Math.floor(Math.random() * pList.length)];
      const randomS = sList[Math.floor(Math.random() * sList.length)];
      const subKeyword = keyword.trim().replace(/\s+/g, '');
      const list = formula(subKeyword, randomP, randomS);
      const chosen = list[Math.floor(Math.random() * list.length)];

      if (!usedCombinations.has(chosen)) {
        results.push(chosen);
        usedCombinations.add(chosen);
      }
    }

    setNames(results);
    setCopiedIndex(null);
  };

  // Generate on load
  React.useEffect(() => {
    generateNames();
  }, [mode]);

  const handleCopy = (name, index) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    showToast(`"${name}" copied!`, 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode & Keywords Configuration */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">

        {/* Toggle Mode */}
        <div>
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Naming Category
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'business', label: 'Business Name' },
              { id: 'brand', label: 'Brand & Startup' },
              { id: 'character', label: 'Gaming / Character' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`py-2 px-4 rounded-xl border text-xs font-semibold transition-all ${mode === item.id
                    ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Keyword input */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Keyword Seed (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. cloud, dynamic, viper"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') generateNames();
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium"
            />
          </div>
          <button
            onClick={generateNames}
            className="py-2.5 px-6 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-all font-semibold shadow-lg shadow-violet-500/25 flex items-center gap-2 text-sm h-[42px]"
          >
            <FaSync /> Generate
          </button>
        </div>

        <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-2">
          <FaInfoCircle className="text-violet-500" /> Enter a seed keyword to anchor the output, or leave blank for full randomization.
        </p>
      </div>

      {/* Output Grid */}
      {names.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Suggested Names ({names.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {names.map((name, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(name, idx)}
                className="group relative overflow-hidden glass-effect p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:border-violet-500 dark:hover:border-violet-500 text-left transition-all duration-200"
              >
                <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {name}
                </span>

                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedIndex === idx ? (
                    <FaCheck className="text-emerald-500 text-[10px]" />
                  ) : (
                    <FaCopy className="text-slate-400 dark:text-slate-600 text-[10px]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NameGenerator;
