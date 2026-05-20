import React, { useState, useEffect, useCallback } from 'react';
import { FaCopy, FaCheck, FaSync } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const PasswordGenerator = () => {
  const { showToast } = useApp();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ score: 0, text: 'Weak', color: 'bg-rose-500' });

  const generatePassword = useCallback(() => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (!charPool) {
      setPassword('');
      return;
    }

    let generated = '';
    // Ensure at least one of each selected type is included
    const activePools = [];
    if (includeUppercase) activePools.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
    if (includeLowercase) activePools.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]);
    if (includeNumbers) activePools.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    if (includeSymbols) activePools.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);

    // Fill the rest randomly
    for (let i = activePools.length; i < length; i++) {
      generated += charPool[Math.floor(Math.random() * charPool.length)];
    }

    // Add required characters and shuffle
    generated = (activePools.join('') + generated)
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('')
      .slice(0, length);

    setPassword(generated);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setStrength({ score: 0, text: 'Empty', color: 'bg-slate-300 dark:bg-slate-700' });
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 14) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let text = 'Weak';
    let color = 'bg-rose-500';

    if (score >= 5) {
      text = 'Very Strong';
      color = 'bg-emerald-500';
    } else if (score >= 4) {
      text = 'Strong';
      color = 'bg-teal-500';
    } else if (score >= 3) {
      text = 'Medium';
      color = 'bg-amber-500';
    }

    setStrength({ score, text, color });
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    showToast('Password copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Output Panel */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          Generated Password
        </label>
        <div className="flex gap-2">
          <div className="flex-1 glass-input rounded-xl px-4 py-3 font-mono text-lg md:text-xl tracking-wider select-all overflow-x-auto whitespace-nowrap text-slate-800 dark:text-slate-200 flex items-center min-h-[52px]">
            {password || <span className="text-slate-400 dark:text-slate-600">Select options below</span>}
          </div>
          <button
            onClick={generatePassword}
            disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
            className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-600 transition-all text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Regenerate"
          >
            <FaSync className="text-sm" />
          </button>
          <button
            onClick={handleCopy}
            disabled={!password}
            className="p-3.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-all font-semibold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 min-w-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy Password"
          >
            {copied ? <FaCheck className="text-sm" /> : <FaCopy className="text-sm" />}
          </button>
        </div>

        {/* Strength Meter */}
        {password && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-400 dark:text-slate-500">Strength:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold text-white ${strength.color.replace('bg-', 'bg-')}`}>
                {strength.text}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${Math.min(100, (strength.score / 6) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Configuration Panel */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-6">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Configure Parameters</h3>
        
        {/* Length Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-500 dark:text-slate-400">Password Length</span>
            <span className="font-mono bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-md font-bold">
              {length} chars
            </span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
        </div>

        {/* Toggle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Uppercase Letters</span>
              <span className="text-[11px] text-slate-400">A-Z characters</span>
            </div>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Lowercase Letters</span>
              <span className="text-[11px] text-slate-400">a-z characters</span>
            </div>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Numbers</span>
              <span className="text-[11px] text-slate-400">0-9 numbers</span>
            </div>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Symbols</span>
              <span className="text-[11px] text-slate-400">!@#$%^&* symbols</span>
            </div>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
