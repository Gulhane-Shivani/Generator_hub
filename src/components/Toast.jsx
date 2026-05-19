import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toast, closeToast } = useApp();

  const iconMap = {
    success: <FaCheckCircle className="text-emerald-500 text-lg flex-shrink-0" />,
    error: <FaExclamationCircle className="text-rose-500 text-lg flex-shrink-0" />,
    info: <FaInfoCircle className="text-blue-500 text-lg flex-shrink-0" />,
  };

  const borderColors = {
    success: 'border-emerald-500/30 dark:border-emerald-500/20',
    error: 'border-rose-500/30 dark:border-rose-500/20',
    info: 'border-blue-500/30 dark:border-blue-500/20',
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 right-4 z-50 max-w-sm w-full md:w-auto"
        >
          <div className={`glass-effect flex items-center justify-between gap-4 p-4 rounded-2xl shadow-xl border ${borderColors[toast.type]}`}>
            <div className="flex items-center gap-3">
              {iconMap[toast.type] || iconMap.info}
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {toast.message}
              </p>
            </div>
            <button
              onClick={closeToast}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
              aria-label="Close notification"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
