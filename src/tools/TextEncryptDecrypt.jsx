import React, { useState } from 'react';
import { FaLock, FaUnlock, FaCopy, FaTrash, FaCheck, FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const TextEncryptDecrypt = () => {
  const { showToast } = useApp();
  const [mode, setMode] = useState('encrypt'); // 'encrypt' or 'decrypt'
  const [text, setText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [decryptError, setDecryptError] = useState('');

  // Helper: string to array buffer
  const str2ab = (str) => {
    const enc = new TextEncoder();
    return enc.encode(str);
  };

  // Helper: array buffer to string
  const ab2str = (buf) => {
    const dec = new TextDecoder();
    return dec.decode(buf);
  };

  // Helper: Convert array buffer to base64
  const buf2base64 = (buf) => {
    const binary = String.fromCharCode(...new Uint8Array(buf));
    return window.btoa(binary);
  };

  // Helper: Convert base64 to array buffer
  const base642buf = (b64) => {
    const binary = window.atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Derive AES-GCM Key from password using PBKDF2
  const deriveKey = async (password, salt) => {
    const baseKey = await window.crypto.subtle.importKey(
      'raw',
      str2ab(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };

  const handleEncrypt = async () => {
    if (!text.trim()) {
      showToast('Please enter text to encrypt.', 'error');
      return;
    }
    if (!secretKey.trim()) {
      showToast('Please enter a secret key/password.', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Generate 16-byte random salt
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      // 2. Generate 12-byte random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      // 3. Derive key
      const key = await deriveKey(secretKey, salt);
      
      // 4. Encrypt plaintext
      const ciphertext = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        str2ab(text)
      );

      // 5. Pack Salt (16B) + IV (12B) + Ciphertext together
      const packed = new Uint8Array(salt.byteLength + iv.byteLength + ciphertext.byteLength);
      packed.set(salt, 0);
      packed.set(iv, salt.byteLength);
      packed.set(new Uint8Array(ciphertext), salt.byteLength + iv.byteLength);

      // 6. Output Base64 string
      setResult(buf2base64(packed));
      showToast('Text encrypted successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Encryption failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrypt = async () => {
    if (!text.trim()) {
      showToast('Please enter encrypted text code.', 'error');
      return;
    }
    if (!secretKey.trim()) {
      showToast('Please enter the secret key/password.', 'error');
      return;
    }

    setIsProcessing(true);
    setDecryptError('');
    try {
      // 1. Unpack Base64 string
      let packedBuffer;
      try {
        packedBuffer = base642buf(text.trim());
      } catch (e) {
        throw new Error('invalid-base64');
      }

      const packed = new Uint8Array(packedBuffer);
      if (packed.length < 28) {
        throw new Error('invalid-size');
      }

      // 2. Extract salt (first 16B) and IV (next 12B)
      const salt = packed.slice(0, 16);
      const iv = packed.slice(16, 28);
      const ciphertext = packed.slice(28);

      // 3. Derive key
      const key = await deriveKey(secretKey, salt);

      // 4. Decrypt
      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        ciphertext
      );

      // 5. Output UTF-8 string
      setResult(ab2str(decrypted));
      showToast('Text decrypted successfully!', 'success');
    } catch (err) {
      console.error(err);
      setResult('');
      if (err.message === 'invalid-base64' || err.message === 'invalid-size') {
        setDecryptError('Invalid ciphertext format. Please verify you pasted the correct Base64 string generated from the Encrypt mode.');
      } else {
        setDecryptError('Decryption failed. Incorrect secret key/password or the ciphertext payload has been tampered with.');
      }
      showToast('Decryption failed!', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    showToast('Result copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText('');
    setSecretKey('');
    setResult('');
    setDecryptError('');
  };

  return (
    <div className="glass-effect p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 space-y-6">
      
      {/* Mode Switches */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200/20 dark:border-slate-850 max-w-sm">
        <button
          onClick={() => {
            setMode('encrypt');
            setResult('');
            setText('');
            setDecryptError('');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mode === 'encrypt'
              ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-md'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <FaLock className="text-[10px]" /> Encrypt Mode
        </button>
        <button
          onClick={() => {
            setMode('decrypt');
            setResult('');
            setText('');
            setDecryptError('');
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mode === 'decrypt'
              ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-md'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <FaUnlock className="text-[10px]" /> Decrypt Mode
        </button>
      </div>

      {/* Input text / Cipher text */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest">
          {mode === 'encrypt' ? 'Source Text to Encrypt' : 'Encrypted Base64 Payload'}
        </label>
        <textarea
          rows={4}
          placeholder={
            mode === 'encrypt'
              ? 'Enter plaintext string here...'
              : 'Paste Base64 encrypted cipher text code here...'
          }
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setDecryptError('');
          }}
          className="w-full px-4 py-3 rounded-2xl text-xs md:text-sm font-medium glass-input bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-850 dark:text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none resize-none transition-all"
        />
      </div>

      {/* Password / Secret Key input */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest">
          Secret Key / Password
        </label>
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            placeholder="Enter secure password to derive cryptokey..."
            value={secretKey}
            onChange={(e) => {
              setSecretKey(e.target.value);
              setDecryptError('');
            }}
            className="w-full pl-4 pr-12 py-3 rounded-2xl text-xs md:text-sm font-medium glass-input bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-850 dark:text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 cursor-pointer"
          >
            {showKey ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        {/* Decryption Error Info */}
        {mode === 'decrypt' && decryptError && (
          <div className="flex items-start gap-2 text-xs font-semibold text-rose-500 mt-2 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
            <FaExclamationTriangle className="text-sm mt-0.5 flex-shrink-0" />
            <span>{decryptError}</span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={mode === 'encrypt' ? handleEncrypt : handleDecrypt}
          disabled={isProcessing}
          className="flex-1 py-3 rounded-2xl bg-violet-600 hover:bg-violet-750 transition-all font-bold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 text-xs md:text-sm text-white cursor-pointer disabled:opacity-50"
        >
          {mode === 'encrypt' ? (
            <>
              <FaLock /> {isProcessing ? 'Encrypting...' : 'Encrypt Text'}
            </>
          ) : (
            <>
              <FaUnlock /> {isProcessing ? 'Decrypting...' : 'Decrypt Text'}
            </>
          )}
        </button>
        <button
          onClick={clearAll}
          className="px-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer text-sm"
          title="Clear all fields"
        >
          <FaTrash />
        </button>
      </div>

      {/* Output Results */}
      {result && (
        <div className="space-y-3 bg-slate-50/50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200/30 dark:border-slate-800/30">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-505">
            <span>{mode === 'encrypt' ? 'Output Ciphertext' : 'Decrypted Text'}</span>
            <button
              onClick={copyToClipboard}
              className="text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 cursor-pointer font-bold text-[10px]"
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
          
          <div className="w-full p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850/50 text-xs md:text-sm font-semibold select-all break-all text-slate-800 dark:text-slate-200 leading-relaxed font-mono">
            {result}
          </div>
        </div>
      )}

    </div>
  );
};

export default TextEncryptDecrypt;
