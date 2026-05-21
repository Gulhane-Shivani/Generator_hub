import React, { useState } from 'react';
import { FaCopy, FaCheck, FaSync, FaDice, FaSortNumericDown } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const RandomNumberGenerator = () => {
  const { showToast } = useApp();
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [unique, setUnique] = useState(true);
  const [results, setResults] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateNumbers = () => {
    // Input validation
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const countVal = parseInt(count);

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) {
      showToast('Please enter valid numbers.', 'error');
      return;
    }

    if (minVal >= maxVal) {
      showToast('Min value must be less than Max value.', 'error');
      return;
    }

    if (countVal <= 0) {
      showToast('Count must be greater than 0.', 'error');
      return;
    }

    const range = maxVal - minVal + 1;
    if (unique && countVal > range) {
      showToast(`Cannot generate ${countVal} unique numbers in a range of ${range}.`, 'error');
      return;
    }

    setIsRolling(true);
    setCopied(false);

    // Simulate rolling animation
    setTimeout(() => {
      const generated = [];
      const used = new Set();

      while (generated.length < countVal) {
        const num = Math.floor(Math.random() * range) + minVal;
        if (unique) {
          if (!used.has(num)) {
            generated.push(num);
            used.add(num);
          }
        } else {
          generated.push(num);
        }
      }

      setResults(generated);
      setIsRolling(false);
    }, 600);
  };

  const handleCopyAll = () => {
    if (results.length === 0) return;
    navigator.clipboard.writeText(results.join(', '));
    setCopied(true);
    showToast('All numbers copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Parameter Settings */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Ranges */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <FaSortNumericDown className="text-violet-500" />
            Set Range Limits
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Min Limit
              </label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Max Limit
              </label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Quantity of Numbers ({count})
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>
        </div>

        {/* Configurations */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
              Unique Rules
            </h3>

            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
              <div>
                <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Enforce Unique Values</span>
                <span className="text-[11px] text-slate-400">Do not repeat any generated number</span>
              </div>
              <input
                type="checkbox"
                checked={unique}
                onChange={(e) => setUnique(e.target.checked)}
                className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500"
              />
            </label>
          </div>

          <button
            onClick={generateNumbers}
            disabled={isRolling}
            className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transition-all text-sm disabled:opacity-50"
          >
            <FaDice className={isRolling ? 'animate-spin' : ''} />
            {isRolling ? 'Rolling...' : 'Roll Numbers'}
          </button>
        </div>
      </div>

      {/* Results Box */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Results
          </label>
          {results.length > 0 && (
            <button
              onClick={handleCopyAll}
              disabled={isRolling}
              className="text-xs font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1 hover:underline"
            >
              {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
              {copied ? 'Copied' : 'Copy All'}
            </button>
          )}
        </div>

        {isRolling ? (
          <div className="flex items-center justify-center py-12 gap-2 text-violet-500 text-sm font-semibold">
            <FaDice className="animate-spin text-2xl" /> Shuffling elements...
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-wrap gap-3 justify-center py-6">
            {results.map((num, idx) => (
              <div
                key={idx}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center font-mono text-base md:text-xl font-bold text-violet-600 dark:text-violet-400 shadow-sm"
              >
                {num}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs font-medium">
            Click 'Roll Numbers' above to generate.
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomNumberGenerator;
