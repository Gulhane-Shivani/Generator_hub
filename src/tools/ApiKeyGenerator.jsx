import React, { useState, useEffect } from 'react';
import { FaCopy, FaCheck, FaSync, FaServer, FaList, FaBolt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const ApiKeyGenerator = () => {
  const { showToast } = useApp();
  const [prefix, setPrefix] = useState('sk_live_');
  const [format, setFormat] = useState('base64url'); // 'hex', 'base64url', 'alphanumeric', 'uuid'
  const [length, setLength] = useState(32);
  const [batchCount, setBatchCount] = useState(1);
  const [generatedKeys, setGeneratedKeys] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateRandomBytes = (len) => {
    const arr = new Uint8Array(len);
    window.crypto.getRandomValues(arr);
    return arr;
  };

  const toHex = (buffer) => {
    return Array.from(buffer)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const toBase64Url = (buffer) => {
    const binary = String.fromCharCode.apply(null, buffer);
    const base64 = btoa(binary);
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const generateUuid = () => {
    // Generate RFC4122 v4 compliant UUID
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };

  const generateAlphanumeric = (len) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const arr = new Uint8Array(len);
    window.crypto.getRandomValues(arr);
    return Array.from(arr).map(v => chars[v % chars.length]).join('');
  };

  const generateKeys = () => {
    const keys = [];
    for (let i = 0; i < batchCount; i++) {
      let coreKey = '';
      if (format === 'uuid') {
        coreKey = generateUuid();
      } else if (format === 'hex') {
        // Since hex uses 2 characters per byte, generate length/2 bytes
        const byteLen = Math.ceil(length / 2);
        coreKey = toHex(generateRandomBytes(byteLen)).substring(0, length);
      } else if (format === 'base64url') {
        // Base64Url gets longer than input bytes, generate enough bytes and truncate
        const byteLen = Math.ceil(length * 0.75);
        coreKey = toBase64Url(generateRandomBytes(byteLen)).substring(0, length);
      } else {
        coreKey = generateAlphanumeric(length);
      }
      
      const cleanPrefix = prefix.trim();
      keys.push(`${cleanPrefix}${coreKey}`);
    }
    setGeneratedKeys(keys);
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  // Generate on mount
  useEffect(() => {
    generateKeys();
  }, [format, length, batchCount]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast('API Key copied to clipboard!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllKeys = () => {
    const textToCopy = generatedKeys.join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedAll(true);
    showToast('All API Keys copied to clipboard!', 'success');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Configuration Panel */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side options */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <FaServer className="text-violet-500" /> Key Settings
          </h3>

          {/* Custom Prefix */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
              API Key Prefix (Optional)
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="e.g. sk_live_"
              className="w-full pl-4 pr-4 py-2.5 rounded-xl text-xs font-medium glass-input bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-850 dark:text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
            />
          </div>

          {/* Key Encoding Format */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
              Encoding Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'base64url', label: 'Base64 URL' },
                { id: 'hex', label: 'Hexadecimal' },
                { id: 'alphanumeric', label: 'Alphanumeric' },
                { id: 'uuid', label: 'UUID v4' }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setFormat(fmt.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    format === fmt.id
                      ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Options */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <FaList className="text-violet-500" /> Quantity & Size
          </h3>

          {/* Key Length Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Key Character Length</span>
              <span className="text-violet-600 dark:text-violet-400 font-extrabold">{format === 'uuid' ? '36 (Fixed)' : length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="128"
              value={length}
              disabled={format === 'uuid'}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600 disabled:opacity-50"
            />
          </div>

          {/* Batch Count */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Keys to Generate</span>
              <span className="text-violet-600 dark:text-violet-400 font-extrabold">{batchCount}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={batchCount}
              onChange={(e) => setBatchCount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex gap-4">
        <button
          onClick={generateKeys}
          className="flex-1 py-3 px-6 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-500/25 transition-all text-xs md:text-sm flex items-center justify-center gap-2"
        >
          <FaSync /> Regenerate Key(s)
        </button>
        {generatedKeys.length > 1 && (
          <button
            onClick={copyAllKeys}
            className="py-3 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-250 font-bold transition-all text-xs md:text-sm flex items-center justify-center gap-2"
          >
            {copiedAll ? <FaCheck /> : <FaCopy />} Copy All ({generatedKeys.length})
          </button>
        )}
      </div>

      {/* Generated Keys List Display */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Generated Security Credentials ({generatedKeys.length})
        </label>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {generatedKeys.map((key, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-sm hover:border-violet-500/30 transition-all duration-200 group"
            >
              <div className="font-mono text-xs md:text-sm font-semibold select-all text-slate-800 dark:text-slate-200 break-all pr-4">
                {key}
              </div>
              <button
                onClick={() => copyToClipboard(key, idx)}
                className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-violet-600 hover:text-white transition-all flex-shrink-0 cursor-pointer"
                title="Copy single key"
              >
                {copiedIndex === idx ? <FaCheck className="text-xs" /> : <FaCopy className="text-xs" />}
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-200/30 dark:border-slate-800/30 text-[10px] text-slate-400 font-semibold flex items-center gap-1.5 select-none">
          <FaBolt className="text-violet-500 text-xs animate-pulse" />
          Keys are cryptographically secure generated in memory. Never sent to any server.
        </div>
      </div>
    </div>
  );
};

export default ApiKeyGenerator;
