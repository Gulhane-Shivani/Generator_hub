import React, { useState, useEffect, useCallback } from 'react';
import { FaCopy, FaCheck, FaSync, FaPlay, FaPause } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const OtpGenerator = () => {
  const { showToast } = useApp();
  const [otp, setOtp] = useState('');
  const [digits, setDigits] = useState(6);
  const [copied, setCopied] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(true);

  const generateOtp = useCallback(() => {
    let result = '';
    for (let i = 0; i < digits; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    setOtp(result);
    setCopied(false);
    setTimeLeft(30); // reset timer
  }, [digits]);

  useEffect(() => {
    generateOtp();
  }, [generateOtp]);

  // Countdown effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateOtp();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, generateOtp]);

  const handleCopy = () => {
    if (!otp) return;
    navigator.clipboard.writeText(otp);
    setCopied(true);
    showToast('OTP copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;

  return (
    <div className="space-y-6">
      {/* Output Panel */}
      <div className="glass-effect p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center">
        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-6 text-center">
          Secure OTP Verification Code
        </label>
        
        {/* OTP Display Box */}
        <div className="flex gap-3 justify-center mb-8">
          {otp.split('').map((char, index) => (
            <div
              key={index}
              className="w-12 h-16 md:w-16 md:h-20 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center font-mono text-2xl md:text-4xl font-extrabold text-violet-600 dark:text-violet-400 shadow-inner"
            >
              {char}
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all text-sm"
          >
            {copied ? (
              <>
                <FaCheck /> Copied
              </>
            ) : (
              <>
                <FaCopy /> Copy Code
              </>
            )}
          </button>
          
          {/* Manual Refresh */}
          <button
            onClick={generateOtp}
            className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300"
            title="Refresh OTP"
          >
            <FaSync className="text-sm" />
          </button>
        </div>
      </div>

      {/* Authenticator Timer & Settings */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Digits Toggle */}
        <div className="flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">OTP Code Options</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setDigits(4)}
              className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                digits === 4
                  ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              4-Digit PIN
            </button>
            <button
              onClick={() => setDigits(6)}
              className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                digits === 6
                  ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              6-Digit PIN
            </button>
          </div>
        </div>

        {/* Circular Countdown Tracker */}
        <div className="flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="18"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="18"
                className="stroke-violet-500 transition-all duration-1000"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <span className="absolute font-mono text-xs font-bold text-violet-500 dark:text-violet-400">
              {timeLeft}s
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Auto-Regenerating
            </h4>
            <p className="text-[11px] text-slate-400 truncate">
              Validating token lifetime.
            </p>
          </div>

          {/* Pause Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-3 rounded-lg text-xs transition-colors ${
              isPlaying
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
            }`}
            title={isPlaying ? 'Pause auto-refresh' : 'Resume auto-refresh'}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpGenerator;
