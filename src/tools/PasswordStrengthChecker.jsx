import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle, FaLock, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const PasswordStrengthChecker = () => {
  const { showToast } = useApp();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Analysis state
  const [metrics, setMetrics] = useState({
    length: 0,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSymbol: false,
    isNoSequence: true,
    entropy: 0,
    score: 0, // 0 - 4
    label: 'Too Short',
    color: 'bg-slate-350 dark:bg-slate-800 text-slate-400',
    crackTime: 'Instant'
  });

  const checkSequences = (str) => {
    if (str.length < 3) return true;
    const lower = str.toLowerCase();
    
    // Check repeating characters (e.g. aaa)
    for (let i = 0; i < lower.length - 2; i++) {
      if (lower[i] === lower[i + 1] && lower[i] === lower[i + 2]) {
        return false;
      }
    }

    // Check alphabetical sequence (e.g. abc, xyz)
    for (let i = 0; i < lower.length - 2; i++) {
      const code1 = lower.charCodeAt(i);
      const code2 = lower.charCodeAt(i + 1);
      const code3 = lower.charCodeAt(i + 2);
      if (code2 === code1 + 1 && code3 === code2 + 1) {
        return false;
      }
    }

    // Check numerical sequence (e.g. 123, 789)
    for (let i = 0; i < lower.length - 2; i++) {
      const code1 = lower.charCodeAt(i);
      const code2 = lower.charCodeAt(i + 1);
      const code3 = lower.charCodeAt(i + 2);
      if (code2 === code1 + 1 && code3 === code2 + 1 && code1 >= 48 && code1 <= 57) {
        return false;
      }
    }

    // Check keyboard sequence (e.g. qwe, asd)
    const keyboardRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    for (let i = 0; i < lower.length - 2; i++) {
      const triplet = lower.substring(i, i + 3);
      for (const row of keyboardRows) {
        if (row.includes(triplet)) {
          return false;
        }
      }
    }

    return true;
  };

  const calculateEntropy = (pwd) => {
    if (!pwd) return 0;
    
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33; // Approx count of printable symbols
    
    if (poolSize === 0) return 0;
    
    // Entropy formula: L * log2(poolSize)
    return Math.round(pwd.length * (Math.log(poolSize) / Math.log(2)));
  };

  const getCrackTime = (entropy) => {
    if (entropy === 0) return 'Instant';
    
    // Total combinations: 2^entropy
    const combinations = Math.pow(2, entropy);
    
    // Let's assume a fast hardware rig checking 100 billion (10^11) guesses per second
    const guessesPerSecond = 1e11;
    const secondsToCrack = combinations / guessesPerSecond;

    if (secondsToCrack < 1) return 'Instant (under 1 second)';
    if (secondsToCrack < 60) return `${Math.round(secondsToCrack)} seconds`;
    
    const minutes = secondsToCrack / 60;
    if (minutes < 60) return `${Math.round(minutes)} minutes`;
    
    const hours = minutes / 60;
    if (hours < 24) return `${Math.round(hours)} hours`;
    
    const days = hours / 24;
    if (days < 365) return `${Math.round(days)} days`;
    
    const years = days / 365;
    if (years < 1000) return `${Math.round(years)} years`;
    if (years < 1e6) return `${Math.round(years / 1000)}k years`;
    if (years < 1e9) return `${Math.round(years / 1e6)} million years`;
    return `${Math.round(years / 1e9)} billion years`;
  };

  useEffect(() => {
    const len = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const isNoSequence = checkSequences(password);
    const entropy = calculateEntropy(password);

    let score = 0;
    if (len >= 8) score++;
    if (len >= 12) score++;
    if (hasUpper && hasLower) score++;
    if (hasNumber && hasSymbol) score++;
    if (isNoSequence && len >= 6) score++;
    
    // Cap score at 4 max
    const finalScore = Math.min(4, Math.max(0, score - (len < 6 ? score : 0)));

    let label = 'Too Short';
    let color = 'bg-rose-500 text-rose-500 dark:bg-rose-500/20';
    if (len >= 6) {
      switch (finalScore) {
        case 0:
        case 1:
          label = 'Weak';
          color = 'bg-rose-500 text-rose-500 dark:bg-rose-500/20';
          break;
        case 2:
          label = 'Fair';
          color = 'bg-amber-500 text-amber-500 dark:bg-amber-500/20';
          break;
        case 3:
          label = 'Strong';
          color = 'bg-blue-500 text-blue-500 dark:bg-blue-500/20';
          break;
        case 4:
          label = 'Excellent';
          color = 'bg-emerald-500 text-emerald-500 dark:bg-emerald-500/20';
          break;
        default:
          break;
      }
    } else if (len > 0) {
      label = 'Very Weak';
      color = 'bg-rose-500 text-rose-500 dark:bg-rose-500/20';
    } else {
      label = 'Empty';
      color = 'bg-slate-300 dark:bg-slate-800 text-slate-400';
    }

    setMetrics({
      length: len,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      isNoSequence,
      entropy,
      score: finalScore,
      label,
      color,
      crackTime: getCrackTime(entropy)
    });
  }, [password]);

  return (
    <div className="glass-effect p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 space-y-6">
      
      {/* Input Field */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Enter Password to Analyze
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Type your password here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-2xl text-xs md:text-sm font-medium glass-input bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Visual Strength Meter */}
      <div className="space-y-3 bg-slate-50/50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200/30 dark:border-slate-800/30">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
          <span className="text-slate-450 dark:text-slate-505">Overall Strength</span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${metrics.color}`}>
            {metrics.label}
          </span>
        </div>

        {/* Progress Bar Segments */}
        <div className="grid grid-cols-4 gap-2 h-2.5 w-full">
          {[1, 2, 3, 4].map((segIndex) => {
            const isActive = password.length >= 6 && metrics.score >= segIndex;
            let barColor = 'bg-slate-200 dark:bg-slate-800';
            if (isActive) {
              if (metrics.score <= 1) barColor = 'bg-rose-500';
              else if (metrics.score === 2) barColor = 'bg-amber-500';
              else if (metrics.score === 3) barColor = 'bg-blue-500';
              else barColor = 'bg-emerald-500';
            }
            return (
              <div 
                key={segIndex} 
                className={`h-full rounded-full transition-all duration-300 ${barColor}`}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Entropy card */}
        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/30 dark:border-slate-800/30 space-y-1">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entropy Score</h4>
          <p className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-display">
            {metrics.entropy} <span className="text-xs text-slate-400 font-medium">bits</span>
          </p>
          <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
            {metrics.entropy >= 60 ? 'Highly Secure' : metrics.entropy >= 40 ? 'Moderate Secure' : 'Low Security'}
          </p>
        </div>

        {/* Length card */}
        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/30 dark:border-slate-800/30 space-y-1">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Characters</h4>
          <p className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-display">
            {metrics.length}
          </p>
          <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
            {metrics.length >= 12 ? 'Excellent Length' : metrics.length >= 8 ? 'Acceptable' : 'Too Short'}
          </p>
        </div>

        {/* Estimated Crack Time card */}
        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/30 dark:border-slate-800/30 space-y-1">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Brute-Force Crack Time</h4>
          <p className="text-xs md:text-sm font-extrabold text-slate-800 dark:text-slate-100 font-display truncate">
            {metrics.crackTime}
          </p>
          <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
            At 100 billion attempts/sec
          </p>
        </div>
      </div>

      {/* Checklist Cards */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Security Checklist</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* length check */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-50/30 dark:bg-slate-900/30">
            {metrics.length >= 12 ? (
              <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
            ) : (
              <FaTimesCircle className="text-slate-450 dark:text-slate-600 text-sm flex-shrink-0" />
            )}
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Length at least 12 chars
            </span>
          </div>

          {/* upper check */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-50/30 dark:bg-slate-900/30">
            {metrics.hasUpper ? (
              <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
            ) : (
              <FaTimesCircle className="text-slate-450 dark:text-slate-600 text-sm flex-shrink-0" />
            )}
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Contains uppercase letters
            </span>
          </div>

          {/* lower check */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-50/30 dark:bg-slate-900/30">
            {metrics.hasLower ? (
              <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
            ) : (
              <FaTimesCircle className="text-slate-450 dark:text-slate-600 text-sm flex-shrink-0" />
            )}
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Contains lowercase letters
            </span>
          </div>

          {/* digits check */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-50/30 dark:bg-slate-900/30">
            {metrics.hasNumber ? (
              <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
            ) : (
              <FaTimesCircle className="text-slate-450 dark:text-slate-600 text-sm flex-shrink-0" />
            )}
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Contains numerical digits
            </span>
          </div>

          {/* symbols check */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-50/30 dark:bg-slate-900/30">
            {metrics.hasSymbol ? (
              <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
            ) : (
              <FaTimesCircle className="text-slate-450 dark:text-slate-600 text-sm flex-shrink-0" />
            )}
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Contains special symbols
            </span>
          </div>

          {/* repetition check */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-50/30 dark:bg-slate-900/30">
            {metrics.isNoSequence ? (
              <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
            ) : (
              <FaExclamationTriangle className="text-amber-500 text-sm flex-shrink-0" />
            )}
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              No simple repeating/sequences
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
