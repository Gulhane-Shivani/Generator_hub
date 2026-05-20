import React, { useState } from 'react';
import { FaCopy, FaCheck, FaSync, FaInfoCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const UsernameGenerator = () => {
  const { showToast } = useApp();
  const [seed, setSeed] = useState('');
  const [leetSpeak, setLeetSpeak] = useState(false);
  const [addNumbers, setAddNumbers] = useState(true);
  const [gamerStyle, setGamerStyle] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const coolWords = ['Vortex', 'Alpha', 'Phantom', 'Neo', 'Nova', 'Cyber', 'Zephyr', 'Rogue', 'Apex', 'Omega', 'Matrix', 'Titan'];
  const gamerTags = ['Pro', 'Gamer', 'YT', 'Xx', 'xX', 'HD', 'Playz', 'God', 'Slayer', '101', 'VIP'];

  const convertToLeet = (str) => {
    return str
      .replace(/e/gi, '3')
      .replace(/a/gi, '4')
      .replace(/o/gi, '0')
      .replace(/i/gi, '1')
      .replace(/s/gi, '5')
      .replace(/t/gi, '7');
  };

  const generateUsernames = () => {
    const base = seed.trim() || 'Player';
    const results = [];
    const used = new Set();

    while (results.length < 12) {
      let current = base;

      // Randomly apply configurations
      const roll = Math.random();
      const randomCool = coolWords[Math.floor(Math.random() * coolWords.length)];
      const randomTag = gamerTags[Math.floor(Math.random() * gamerTags.length)];

      if (roll < 0.25) {
        current = `${randomCool}${base}`;
      } else if (roll < 0.5) {
        current = `${base}${randomTag}`;
      } else if (roll < 0.75) {
        current = `${randomCool}_${base}`;
      } else {
        current = `${base}_${randomCool}`;
      }

      if (gamerStyle) {
        current = `xX_${current}_Xx`;
      }

      if (addNumbers) {
        const num = Math.floor(Math.random() * 100);
        current = `${current}${num}`;
      }

      if (leetSpeak) {
        current = convertToLeet(current);
      }

      // Cleanup space characters
      current = current.replace(/\s+/g, '');

      if (!used.has(current)) {
        results.push(current);
        used.add(current);
      }
    }

    setUsernames(results);
    setCopiedIndex(null);
  };

  React.useEffect(() => {
    generateUsernames();
  }, [leetSpeak, addNumbers, gamerStyle]);

  const handleCopy = (name, index) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    showToast(`Username "${name}" copied!`, 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Cards */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
        
        {/* Seed Input */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Seed Keyword / Nickname (e.g. hunter, sam, zero)
            </label>
            <input
              type="text"
              placeholder="e.g. spark, alpha, shadow"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') generateUsernames();
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium"
            />
          </div>
          <button
            onClick={generateUsernames}
            className="py-2.5 px-6 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-all font-semibold shadow-lg shadow-violet-500/25 flex items-center gap-2 text-sm h-[42px]"
          >
            <FaSync /> Blend
          </button>
        </div>

        {/* Toggle switches grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Leet-Speak (l33t)</span>
              <span className="text-[10px] text-slate-400">Swap vowels with numbers</span>
            </div>
            <input
              type="checkbox"
              checked={leetSpeak}
              onChange={(e) => setLeetSpeak(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Append Numbers</span>
              <span className="text-[10px] text-slate-400">Append random digits</span>
            </div>
            <input
              type="checkbox"
              checked={addNumbers}
              onChange={(e) => setAddNumbers(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Gaming Decors</span>
              <span className="text-[10px] text-slate-400">Prepend/Append xX_ _Xx</span>
            </div>
            <input
              type="checkbox"
              checked={gamerStyle}
              onChange={(e) => setGamerStyle(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500"
            />
          </label>
        </div>
      </div>

      {/* Suggestion list */}
      {usernames.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Recommended Handles
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {usernames.map((name, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(name, idx)}
                className="group relative overflow-hidden glass-effect p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:border-violet-500 dark:hover:border-violet-500 text-left transition-all duration-200 flex items-center justify-between"
              >
                <span className="block text-xs font-mono font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {name}
                </span>
                
                <div>
                  {copiedIndex === idx ? (
                    <FaCheck className="text-emerald-500 text-xs" />
                  ) : (
                    <FaCopy className="text-slate-400 dark:text-slate-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
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

export default UsernameGenerator;
