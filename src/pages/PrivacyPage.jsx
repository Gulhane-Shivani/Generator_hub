import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, FaLock, FaUserShield, FaCheckCircle, 
  FaHeart, FaServer, FaEyeSlash, FaCloudDownloadAlt 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const PrivacyPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const dataHandlingRules = [
    {
      type: "Passwords & API Keys",
      processing: "Computed via native Web Cryptography API (window.crypto)",
      retention: "Instantly discarded after copy or tab close",
      transmission: "Strictly Offline (No remote logs)"
    },
    {
      type: "JSON & Text Payloads",
      processing: "Prettified / formatted inside local browser session",
      retention: "Cleared immediately upon tab refresh",
      transmission: "Strictly Offline (No remote logs)"
    },
    {
      type: "QR & Barcode Inputs",
      processing: "Rendered to local HTML5 Canvas elements",
      retention: "Discarded after image download action",
      transmission: "Strictly Offline (No remote logs)"
    },
    {
      type: "Hashtags & Names",
      processing: "Compiled using client-side JavaScript templates",
      retention: "Not stored or logged in browser profile",
      transmission: "Strictly Offline (No remote logs)"
    }
  ];

  return (
    <div className="space-y-16 py-8 max-w-5xl mx-auto relative select-none">
      {/* Background radial highlight */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 items-center justify-center text-white shadow-xl shadow-emerald-500/20 mb-2">
          <FaUserShield className="text-3xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-900 via-slate-805 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
          How Generator Hub secures your calculations and guarantees 100% data protection.
        </p>
      </motion.div>

      {/* Trust & Transparency Statement Callout Banner */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect p-8 rounded-3xl border border-violet-500/20 dark:border-violet-500/10 bg-gradient-to-r from-violet-500/5 via-transparent to-pink-500/5 text-left space-y-4 relative overflow-hidden"
      >
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-violet-500/10 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[10px] font-bold uppercase tracking-wider">
              <FaShieldAlt className="text-[9px]" /> Absolute Data Privacy Guarantee
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-850 dark:text-white font-display">
              We Do Not Track Your Input Data
            </h2>
          </div>
          <div className="text-xs md:text-sm font-bold text-slate-400 px-4 py-2 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-800/20 w-max shrink-0">
            🔒 Zero Input Retention Schema
          </div>
        </div>
        
        <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 leading-relaxed font-semibold">
          Every character you type, file you convert, or password you generate stays local to your computer. There are no backend database servers listening to your payloads, no trackers logging your keystrokes, and no remote servers staging variables. Real privacy isn't just a promise here—it is mathematically and architecturally guaranteed by running 100% of the tools inside your browser tab's virtual machine.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-slate-200/25 dark:border-slate-800/20 mt-4">
          <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">No Inputs Logged</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">Zero Analytics Pixels</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">Offline Auditable</span>
          </div>
          <div className="text-[11px] font-bold text-violet-600 dark:text-violet-400">
            Learn more below about how we build trust through transparency.
          </div>
        </div>
      </motion.section>

      {/* Core Privacy Grid */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: <FaEyeSlash />,
            title: "Zero Server Logging",
            desc: "We do not host analytics servers, tracking databases, or performance recorders. Every calculation occurs in your device virtual machine."
          },
          {
            icon: <FaLock />,
            title: "Web Cryptography API",
            desc: "All random keys and secure phrases query browser hardware-seeded generators, yielding maximum possible algorithmic entropy."
          },
          {
            icon: <FaServer />,
            title: "No Account Requirements",
            desc: "Access all features without entering email credentials, phone numbers, or completing profile logins. No logs are ever stored."
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-855 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 leading-relaxed font-semibold">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Data Handling Transparency Table */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-effect p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 space-y-6"
      >
        <div className="text-left space-y-2">
          <h2 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white font-display">
            Data Handling Transparency Matrix
          </h2>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            Verify precisely where and how long your inputs are processed on our platform.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/30 dark:border-slate-800/30">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200/30 dark:border-slate-800/30 text-slate-700 dark:text-slate-300 font-bold">
                <th className="p-4">Data Type</th>
                <th className="p-4">Processing Engine</th>
                <th className="p-4">Retention Period</th>
                <th className="p-4">Network Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-205/30 dark:divide-slate-800/30 font-semibold text-slate-500 dark:text-slate-400">
              {dataHandlingRules.map((rule, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{rule.type}</td>
                  <td className="p-4">{rule.processing}</td>
                  <td className="p-4">{rule.retention}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                      {rule.transmission}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Offline Sandbox Model */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-effect p-8 md:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white font-display text-left">
          The Offline Sandbox Architecture
        </h2>
        <div className="space-y-4 text-xs md:text-sm text-slate-400 dark:text-slate-400 leading-relaxed font-semibold text-left">
          <p>
            Unlike online web utilities that parse calculations on a remote web server (leaving traces in backend servers, logs, and cache networks), Generator Hub compiles all code into static, localized JavaScript files. Once loaded, the engine operates as a virtual machine entirely inside your active browser tab.
          </p>
          <p>
            You can verify this directly: load this website, unplug your network connection, and run any tool. You will see that everything—from the QR code creation to password strength checks—continues working flawlessly without loading symbols or connection indicators.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-200/30 dark:border-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <FaHeart className="text-rose-500 animate-pulse" />100% private sandbox.
          </div>
          <div className="flex gap-3">
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold transition-all text-xs cursor-pointer"
            >
              About the Project
            </Link>
            <Link
              to="/tools"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-bold transition-all text-xs shadow-lg shadow-violet-500/20 cursor-pointer"
            >
              Explore Tools
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PrivacyPage;
