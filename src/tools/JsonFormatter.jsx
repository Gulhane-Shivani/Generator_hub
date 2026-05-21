import React, { useState } from 'react';
import { FaCopy, FaCheck, FaTrash, FaSpellCheck, FaFileCode, FaIndent } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const JsonFormatter = () => {
  const { showToast } = useApp();
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);
  const [validationResult, setValidationResult] = useState({ status: 'empty', message: '' });
  const [stats, setStats] = useState({ size: 0, lines: 0, keys: 0 });

  const sampleJson = `{
  "appName": "Generator Hub",
  "version": 1.2,
  "isActive": true,
  "developer": {
    "name": "Antigravity Team",
    "languages": ["JavaScript", "CSS", "HTML"],
    "experienceYears": 5
  },
  "features": [
    { "name": "Secure Offline Utilities", "premium": false },
    { "name": "AI Assistant integration", "premium": true }
  ]
}`;

  const loadSample = () => {
    setInputJson(sampleJson);
    setValidationResult({ status: 'empty', message: '' });
    setOutputJson('');
    setStats({ size: 0, lines: 0, keys: 0 });
  };

  const getJsonStats = (obj) => {
    let keyCount = 0;
    const countKeys = (item) => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => {
          keyCount++;
          countKeys(item[key]);
        });
      }
    };
    countKeys(obj);
    return keyCount;
  };

  const formatJson = () => {
    if (!inputJson.trim()) {
      setValidationResult({ status: 'error', message: 'Input JSON is empty!' });
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, Number(indentSize));
      setOutputJson(formatted);
      setValidationResult({ status: 'success', message: 'Valid JSON' });
      
      // Calculate Stats
      const byteSize = new Blob([formatted]).size;
      const lineCount = formatted.split('\n').length;
      const keys = getJsonStats(parsed);
      setStats({ size: byteSize, lines: lineCount, keys });
      
      showToast('JSON Formatted successfully!', 'success');
    } catch (e) {
      setOutputJson('');
      setValidationResult({ status: 'error', message: e.message });
      showToast('Invalid JSON format!', 'error');
    }
  };

  const minifyJson = () => {
    if (!inputJson.trim()) {
      setValidationResult({ status: 'error', message: 'Input JSON is empty!' });
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setValidationResult({ status: 'success', message: 'Valid JSON' });
      
      const byteSize = new Blob([minified]).size;
      const keys = getJsonStats(parsed);
      setStats({ size: byteSize, lines: 1, keys });
      
      showToast('JSON Minified successfully!', 'success');
    } catch (e) {
      setOutputJson('');
      setValidationResult({ status: 'error', message: e.message });
      showToast('Invalid JSON format!', 'error');
    }
  };

  const validateJson = () => {
    if (!inputJson.trim()) {
      setValidationResult({ status: 'error', message: 'Input JSON is empty!' });
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      setValidationResult({ status: 'success', message: 'Valid JSON structure!' });
      
      const keys = getJsonStats(parsed);
      setStats({ size: new Blob([inputJson]).size, lines: inputJson.split('\n').length, keys });
      
      showToast('Valid JSON structure!', 'success');
    } catch (e) {
      setValidationResult({ status: 'error', message: e.message });
      showToast('Invalid JSON structure!', 'error');
    }
  };

  const handleCopy = () => {
    const textToCopy = outputJson || inputJson;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setValidationResult({ status: 'empty', message: '' });
    setStats({ size: 0, lines: 0, keys: 0 });
    showToast('Cleared input & output', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Input and Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Panel */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Raw JSON Input
            </label>
            <button
              onClick={loadSample}
              className="text-[11px] font-bold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
            >
              Load Sample JSON
            </button>
          </div>
          
          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder="Paste your raw JSON string here..."
            className="w-full h-80 pl-4 pr-4 py-3 rounded-2xl font-mono text-xs glass-input bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
          />
          
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                <FaIndent className="text-slate-500" /> Tab Size:
              </span>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-350 focus:ring-2 focus:ring-violet-500 outline-none"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearAll}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-500 dark:text-slate-400"
                title="Clear all"
              >
                <FaTrash className="text-xs" />
              </button>
              <button
                onClick={validateJson}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <FaSpellCheck className="text-xs text-slate-500" /> Validate
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Output Results
            </label>
            {outputJson && (
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Formatted
              </span>
            )}
          </div>

          <textarea
            readOnly
            value={outputJson}
            placeholder="Formatted output will appear here..."
            className="w-full h-80 pl-4 pr-4 py-3 rounded-2xl font-mono text-xs glass-input bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 text-slate-800 dark:text-slate-350 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none cursor-default"
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleCopy}
              disabled={!outputJson && !inputJson}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-violet-500/25 transition-all text-xs"
            >
              {copied ? (
                <>
                  <FaCheck /> Copied
                </>
              ) : (
                <>
                  <FaCopy /> Copy Output
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="glass-effect p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row gap-3">
        <button
          onClick={formatJson}
          className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-500/25 transition-all text-xs md:text-sm flex items-center justify-center gap-2"
        >
          <FaFileCode /> Format JSON
        </button>
        <button
          onClick={minifyJson}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-250 font-bold transition-all text-xs md:text-sm flex items-center justify-center gap-2"
        >
          Minify JSON
        </button>
      </div>

      {/* Validation Status & Stats */}
      {validationResult.status !== 'empty' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Validation Banner */}
          <div className={`p-5 rounded-2xl border ${
            validationResult.status === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400'
          } space-y-1.5`}>
            <h4 className="text-xs font-bold uppercase tracking-wider">Validation Message</h4>
            <p className="text-xs font-mono break-all font-semibold leading-relaxed">
              {validationResult.message}
            </p>
          </div>

          {/* Stats details */}
          <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/30 dark:border-slate-800/30 grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Size</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 font-display">
                {stats.size < 1024 ? `${stats.size} B` : `${(stats.size / 1024).toFixed(2)} KB`}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lines</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 font-display">{stats.lines}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Keys</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 font-display">{stats.keys}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;
