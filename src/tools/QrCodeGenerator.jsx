import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { FaDownload, FaCopy, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const QrCodeGenerator = () => {
  const { showToast } = useApp();
  const [text, setText] = useState('https://github.com');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const generateQR = () => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(
      canvasRef.current,
      text || ' ', // fallback empty string
      {
        width: 250,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      },
      (error) => {
        if (error) console.error('Error generating QR code', error);
      }
    );
  };

  useEffect(() => {
    generateQR();
  }, [text, fgColor, bgColor]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'qrcode-generator-hub.png';
    link.href = url;
    link.click();
    showToast('QR Code download started!', 'success');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Input URL/Text copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">QR Code Parameters</h3>
          
          {/* Input text */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Text Content or Web Link URL
            </label>
            <textarea
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste link here..."
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium resize-none"
            />
          </div>

          {/* Color pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Foreground Color
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border-0 cursor-pointer overflow-hidden p-0"
                />
                <span className="font-mono text-xs font-semibold">{fgColor.toUpperCase()}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Background Color
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border-0 cursor-pointer overflow-hidden p-0"
                />
                <span className="font-mono text-xs font-semibold">{bgColor.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-2">
            <FaInfoCircle className="text-violet-500 text-sm flex-shrink-0" />
            Live validation ensures the QR code automatically updates in real-time as you type or change colors.
          </p>
        </div>

        {/* Visual Preview Panel */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-between min-h-[300px]">
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">
            QR Code Live Preview
          </label>

          {/* Canvas Render */}
          <div className="my-4 bg-white p-3 rounded-2xl shadow border border-slate-100 flex items-center justify-center">
            <canvas ref={canvasRef} className="max-w-[200px] h-auto"></canvas>
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full max-w-xs">
            <button
              onClick={handleCopyText}
              disabled={!text}
              className="flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-center gap-2"
            >
              {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
              Copy Input
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center justify-center gap-2 shadow text-xs transition-all"
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

export default QrCodeGenerator;
