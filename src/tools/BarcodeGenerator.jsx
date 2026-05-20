import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { FaDownload, FaCopy, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const BarcodeGenerator = () => {
  const { showToast } = useApp();
  const [text, setText] = useState('CODE128-DEMO');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const generateBarcode = () => {
    if (!canvasRef.current) return;
    setError('');

    if (!text.trim()) {
      return;
    }

    try {
      JsBarcode(canvasRef.current, text, {
        format: 'CODE128',
        lineColor: '#000000',
        width: 2.2,
        height: 80,
        displayValue: true,
        fontOptions: 'bold',
        fontSize: 14,
        background: '#ffffff',
        margin: 10
      });
    } catch (err) {
      setError('Invalid characters for CODE128 barcode format.');
      console.error(err);
    }
  };

  useEffect(() => {
    generateBarcode();
  }, [text]);

  const handleDownload = () => {
    if (!canvasRef.current || error) return;
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `barcode-${text}.png`;
    link.href = url;
    link.click();
    showToast('Barcode download started!', 'success');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Barcode text copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Barcode Parameters</h3>
          
          {/* Input text */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Barcode Data Value (Alphanumeric)
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. ITEM-48192-A"
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-semibold">
              <FaExclamationTriangle className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="text-[11px] text-slate-400 leading-relaxed pt-2">
            <strong>CODE128 format</strong> is a high-density barcode symbology capable of encoding all 128 characters of ASCII, making it ideal for shipping labels, logistics, and retail tags.
          </div>
        </div>

        {/* Visual Preview Panel */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-between min-h-[300px]">
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">
            Barcode Live Preview
          </label>

          {/* Canvas Render */}
          <div className="my-4 bg-white p-3 rounded-2xl shadow border border-slate-100 flex items-center justify-center overflow-x-auto max-w-full">
            {text ? (
              <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
            ) : (
              <div className="text-slate-400 text-xs py-10 font-medium">Enter data value above to preview</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full max-w-xs">
            <button
              onClick={handleCopyText}
              disabled={!text}
              className="flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
              Copy Data
            </button>
            <button
              onClick={handleDownload}
              disabled={!text || !!error}
              className="flex-1 py-2.5 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center justify-center gap-2 shadow text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaDownload />
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
