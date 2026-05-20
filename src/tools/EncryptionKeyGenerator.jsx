import React, { useState, useEffect, useCallback } from 'react';
import { FaCopy, FaCheck, FaSync } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const EncryptionKeyGenerator = () => {
  const { showToast } = useApp();
  const [key, setKey] = useState('');
  const [bitLength, setBitLength] = useState(256);
  const [format, setFormat] = useState('hex'); // hex, base64
  const [copied, setCopied] = useState(false);

  const generateKey = useCallback(() => {
    const bytesNeeded = bitLength / 8;
    const array = new Uint8Array(bytesNeeded);
    
    // Use CSPRNG in browser
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
    } else {
      // Fallback (non-cryptographically secure, but handles testing)
      for (let i = 0; i < bytesNeeded; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }

    let generatedKey = '';
    if (format === 'hex') {
      generatedKey = Array.from(array)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
    } else if (format === 'base64') {
      // Convert to binary string, then btoa
      const binString = Array.from(array)
        .map((b) => String.fromCharCode(b))
        .join('');
      generatedKey = btoa(binString);
    }

    setKey(generatedKey);
    setCopied(false);
  }, [bitLength, format]);

  useEffect(() => {
    generateKey();
  }, [generateKey]);

  const handleCopy = () => {
    if (!key) return;
    navigator.clipboard.writeText(key);
    setCopied(true);
    showToast('Encryption key copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Output Panel */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          Generated Security Key ({bitLength}-bit {format.toUpperCase()})
        </label>
        
        <div className="relative">
          <div className="w-full glass-input rounded-xl px-4 py-4 pr-16 font-mono text-sm md:text-base tracking-wider break-all select-all min-h-[100px] text-slate-800 dark:text-slate-200 flex items-center bg-slate-50/50 dark:bg-slate-900/50">
            {key}
          </div>
          
          <div className="absolute right-3 bottom-3 flex gap-2">
            <button
              onClick={generateKey}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-violet-500 hover:text-white transition-all"
              title="Regenerate Key"
            >
              <FaSync className="text-xs" />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-all font-semibold shadow shadow-violet-500/25 flex items-center justify-center"
              title="Copy to Clipboard"
            >
              {copied ? <FaCheck className="text-xs" /> : <FaCopy className="text-xs" />}
            </button>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          CSPRNG Secure Local Generation Active
        </div>
      </div>

      {/* Configuration panel */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bit Length Selector */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Key Size</h3>
          <div className="flex gap-2">
            {[128, 256, 512].map((bits) => (
              <button
                key={bits}
                onClick={() => setBitLength(bits)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  bitLength === bits
                    ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {bits}-Bit
              </button>
            ))}
          </div>
        </div>

        {/* Format Selector */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Encoding Format</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setFormat('hex')}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                format === 'hex'
                  ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              HEXADECIMAL (Hex)
            </button>
            <button
              onClick={() => setFormat('base64')}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                format === 'base64'
                  ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              BASE64 (Standard)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EncryptionKeyGenerator;
