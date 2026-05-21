import React, { useState } from 'react';
import { FaCopy, FaCheck, FaTrash, FaExchangeAlt, FaSyncAlt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Base64EncoderDecoder = () => {
  const { showToast } = useApp();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const sampleEncodeText = "Hello, Generator Hub! This is a client-side secure base64 coding utility.";
  const sampleDecodeText = "SGVsbG8sIEdlbmVyYXRvciBIdWIhIFRoaXMgaXMgYSBjbGllbnQtc2lkZSBzZWN1cmUgYmFzZTY0IGNvZGluZyB1dGlsaXR5Lg==";

  const handleConvert = (text = inputText, currentMode = mode) => {
    if (!text.trim()) {
      setOutputText('');
      setErrorMsg('');
      return;
    }
    setErrorMsg('');
    try {
      if (currentMode === 'encode') {
        // UTF-8 base64 encoding support using btoa + encodeURIComponent to avoid breaking on unicode chars
        const utf8Bytes = encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (match, p1) => {
          return String.fromCharCode(parseInt(p1, 16));
        });
        let encoded = btoa(utf8Bytes);
        
        if (urlSafe) {
          encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        setOutputText(encoded);
      } else {
        // Decode
        let toDecode = text.trim();
        if (urlSafe || toDecode.includes('-') || toDecode.includes('_')) {
          // convert back from URL safe
          toDecode = toDecode.replace(/-/g, '+').replace(/_/g, '/');
          while (toDecode.length % 4) {
            toDecode += '=';
          }
        }
        
        const decodedBytes = atob(toDecode);
        const decoded = decodeURIComponent(
          Array.prototype.map.call(decodedBytes, (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join('')
        );
        setOutputText(decoded);
      }
    } catch (e) {
      setOutputText('');
      setErrorMsg(e.message || 'Decoding failed! Ensure input is a valid Base64 string.');
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputText(val);
    handleConvert(val, mode);
  };

  const toggleMode = () => {
    const nextMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(nextMode);
    setInputText(outputText);
    setOutputText(inputText);
    setErrorMsg('');
    showToast(`Switched to ${nextMode.toUpperCase()} mode`, 'info');
  };

  const handleUrlSafeToggle = () => {
    const nextVal = !urlSafe;
    setUrlSafe(nextVal);
    // Re-run conversion with the updated urlSafe setting
    setTimeout(() => {
      // Need to re-trigger convert because state doesn't update instantly
      try {
        if (mode === 'encode') {
          const utf8Bytes = encodeURIComponent(inputText).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
          });
          let encoded = btoa(utf8Bytes);
          if (nextVal) {
            encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
          }
          setOutputText(encoded);
        } else {
          let toDecode = inputText.trim();
          if (nextVal || toDecode.includes('-') || toDecode.includes('_')) {
            toDecode = toDecode.replace(/-/g, '+').replace(/_/g, '/');
            while (toDecode.length % 4) {
              toDecode += '=';
            }
          }
          const decodedBytes = atob(toDecode);
          const decoded = decodeURIComponent(
            Array.prototype.map.call(decodedBytes, (c) => {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')
          );
          setOutputText(decoded);
        }
      } catch (e) {
        setOutputText('');
        setErrorMsg(e.message || 'Failed with new URL-Safe configuration.');
      }
    }, 0);
  };

  const loadSample = () => {
    const sample = mode === 'encode' ? sampleEncodeText : sampleDecodeText;
    setInputText(sample);
    handleConvert(sample, mode);
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setErrorMsg('');
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switches & Settings */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (mode !== 'encode') {
                setMode('encode');
                setInputText('');
                setOutputText('');
                setErrorMsg('');
              }
            }}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition-all ${
              mode === 'encode'
                ? 'bg-violet-650 text-white shadow-lg shadow-violet-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-200'
            }`}
          >
            Encode Mode
          </button>
          <button
            onClick={() => {
              if (mode !== 'decode') {
                setMode('decode');
                setInputText('');
                setOutputText('');
                setErrorMsg('');
              }
            }}
            className={`py-2 px-5 rounded-xl text-xs font-bold transition-all ${
              mode === 'decode'
                ? 'bg-violet-650 text-white shadow-lg shadow-violet-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-200'
            }`}
          >
            Decode Mode
          </button>
        </div>

        {/* Options */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={handleUrlSafeToggle}
              className="w-4 h-4 rounded text-violet-600 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-violet-500"
            />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              URL-Safe Base64
            </span>
          </label>

          <button
            onClick={toggleMode}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Swap input & output"
          >
            <FaExchangeAlt /> Swap
          </button>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Panel */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {mode === 'encode' ? 'Raw Text Input' : 'Base64 Input'}
            </label>
            <button
              onClick={loadSample}
              className="text-[11px] font-bold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
            >
              Load Sample
            </button>
          </div>

          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder={mode === 'encode' ? 'Type or paste plain text here...' : 'Paste your base64 string here...'}
            className="w-full h-80 pl-4 pr-4 py-3 rounded-2xl font-mono text-xs glass-input bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-450 dark:text-slate-505 font-bold">
              Characters: {inputText.length} | Bytes: {new Blob([inputText]).size}
            </span>
            <button
              onClick={clearAll}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-500 dark:text-slate-400"
              title="Clear text"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col space-y-4">
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Text Output'}
          </label>

          <textarea
            readOnly
            value={outputText}
            placeholder="Output converted string will show here..."
            className="w-full h-80 pl-4 pr-4 py-3 rounded-2xl font-mono text-xs glass-input bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 text-slate-800 dark:text-slate-350 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none cursor-default"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-450 dark:text-slate-505 font-bold">
              Characters: {outputText.length} | Bytes: {new Blob([outputText]).size}
            </span>
            <button
              onClick={handleCopy}
              disabled={!outputText}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-violet-500/25 transition-all text-xs"
            >
              {copied ? (
                <>
                  <FaCheck /> Copied
                </>
              ) : (
                <>
                  <FaCopy /> Copy Result
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMsg && (
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400 font-mono text-xs leading-relaxed font-semibold">
          Error: {errorMsg}
        </div>
      )}
    </div>
  );
};

export default Base64EncoderDecoder;
