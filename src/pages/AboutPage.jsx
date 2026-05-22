import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, FaBolt, FaCompass, FaHeart, FaGithub, 
  FaFlag, FaCheckCircle, FaLaptopCode, FaGlobe, FaRegLightbulb,
  FaKey, FaHistory, FaNetworkWired 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="space-y-16 py-8 max-w-5xl mx-auto relative select-none">
      {/* Background radial highlight */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 items-center justify-center text-white shadow-xl shadow-violet-500/20 mb-2">
          <FaCompass className="text-3xl animate-spin-slow" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          About Generator Hub
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
          An open, high-performance toolkit of client-side utilities engineered with absolute privacy, speed, and design excellence in mind.
        </p>
      </motion.div>

      {/* Mission & Goals Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
      >
        {/* Our Mission */}
        <motion.div 
          variants={itemVariants}
          className="glass-effect p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-violet-500/40 transition-colors shadow-sm"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none transition-transform group-hover:scale-125"></div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xl shadow-inner">
              <FaFlag />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-white font-display text-left">
              Our Mission
            </h2>
            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 leading-relaxed font-medium text-left">
              Our mission is to establish a secure, fast, and unified sandbox environment where developers, creators, and business professionals can access premium utilities without the burden of advertising, network lag, or third-party data collection. We believe basic toolsets should be freely accessible and fundamentally safe.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400">
            <FaCheckCircle className="text-emerald-500" /> 100% Client-Side Sandbox Guarantee
          </div>
        </motion.div>

        {/* Our Goals */}
        <motion.div 
          variants={itemVariants}
          className="glass-effect p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-pink-500/40 transition-colors shadow-sm"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none transition-transform group-hover:scale-125"></div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xl shadow-inner">
              <FaCompass />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-white font-display text-left">
              Our Core Goals
            </h2>
            <ul className="space-y-3 text-xs md:text-sm text-slate-400 dark:text-slate-400 font-semibold text-left">
              <li className="flex items-start gap-2.5">
                <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Zero Data Retention:</strong> Never store or transmit user inputs, seed phrases, or generated credentials over remote API endpoints.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Frictionless Workflows:</strong> Maintain a clean, ad-free page design allowing instant conversion, configuration, and downloading.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Continuous Extension:</strong> Constantly innovate and deploy new developer-requested modules to keep up with industry needs.</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* Core Principles Grid */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight font-display text-slate-800 dark:text-white">
            Core Principles
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            The design philosophy guiding our architecture and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaShieldAlt />,
              title: "Privacy First",
              desc: "By utilizing pure browser APIs (like native window.crypto), computations, keys, and exports are isolated locally, offering robust offline protection.",
              bg: "from-blue-500/5 to-indigo-500/5 hover:border-indigo-500/30 text-indigo-500"
            },
            {
              icon: <FaBolt />,
              title: "High Performance",
              desc: "Zero database lookup round-trips mean outputs are rendered in micro-seconds, resulting in snappy slider responses and seamless copy events.",
              bg: "from-amber-500/5 to-orange-500/5 hover:border-orange-500/30 text-orange-500"
            },
            {
              icon: <FaLaptopCode />,
              title: "Developer Centric",
              desc: "We focus on clean output formatting, modular settings, code-ready copy actions, and structured schema outputs built for developers.",
              bg: "from-pink-500/5 to-rose-500/5 hover:border-rose-500/30 text-rose-500"
            }
          ].map((principle, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-start text-left space-y-3 bg-gradient-to-tr ${principle.bg} transition-all shadow-sm`}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/20 dark:border-slate-800/20 flex items-center justify-center text-lg shadow-sm">
                {principle.icon}
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                {principle.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 leading-relaxed font-semibold">
                {principle.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Under the Hood Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight font-display text-slate-800 dark:text-white">
            Under the Hood
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            How Generator Hub achieves cryptographic safety, speed, and client-side independence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            variants={itemVariants}
            className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center text-lg">
                <FaKey />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                High-Entropy Cryptography
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 leading-relaxed font-semibold">
              Our password, API key, and text encryption generators rely entirely on the native **Web Cryptography API (window.crypto)**. Instead of using standard, predictable random generators (like Math.random), this utilizes cryptographically secure hardware-seeded random number generators (PRNG) built directly into modern browser engines.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-left space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center text-lg">
                <FaNetworkWired />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                100% Client-Side Engine
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 leading-relaxed font-semibold">
              Generator Hub operates entirely as a Single Page Application (SPA). The moment you load the application, all the utility scripts, layouts, and cryptographic libraries run directly on your browser virtual machine. No cloud databases, remote API dependencies, or web servers process or store your inputs.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Platform Timeline Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight font-display text-slate-800 dark:text-white">
            Platform Evolution Timeline
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            How Generator Hub grew from a simple utility library into an all-in-one smart toolbox.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative border-l-2 border-slate-200/40 dark:border-slate-850 pl-6 md:pl-8 space-y-8 text-left">
          {[
            {
              version: "v1.0 (Core security)",
              date: "Early Q1 2026",
              title: "Foundation & Client-Side Sandbox",
              desc: "Created the primary layout structure, establishing 100% private sandbox processes. Initial deployment of password generators and key utilities using pure high-entropy client-side Web Crypto integrations."
            },
            {
              version: "v2.0 (Creative & Socials)",
              date: "Late Q1 2026",
              title: "Branding, Socials, & Utilities",
              desc: "Expanded into creator, gamer, and professional requirements. Deployed customized QR code creators, serial barcodes, social hashtag collectors, and aesthetic usernames."
            },
            {
              version: "v3.0 (Developer Tools)",
              date: "Q2 2026",
              title: "Interactive Dashboards & Coding Formats",
              desc: "Integrated the Developer Tools category. Built real-time formatting minifiers for JSON objects, Base64 swaps, local PBKDF2 cryptography, and the interactive 'How can I use the generators' guide."
            }
          ].map((milestone, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="relative space-y-2"
            >
              {/* Bullet point node */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 border border-white dark:border-slate-900 shadow-md"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 w-max">
                  {milestone.version}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                  {milestone.date}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-850 dark:text-slate-100">
                {milestone.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 dark:text-slate-450 leading-relaxed font-semibold">
                {milestone.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-effect p-8 md:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 space-y-6 relative overflow-hidden shadow-sm"
      >
        <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white font-display text-left">
          Why We Built Generator Hub
        </h2>
        <div className="space-y-4 text-xs md:text-sm text-slate-405 dark:text-slate-400 leading-relaxed font-semibold text-left">
          <p>
            Most modern utilities are buried under layers of heavy marketing banners, slow server-side scripting frameworks, and tracking pixels that monitor user actions. We wanted to build a sanctuary for daily utility usage: a place that is clean, secure, and incredibly fast.
          </p>
          <p>
            By designing this platform completely around React components and local JavaScript execution, we eliminate server dependencies. This ensures that you can continue generating assets, checking passwords, and styling color variables even when working completely offline.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-205/30 dark:border-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <FaHeart className="text-rose-500 animate-pulse" /> Engineered with absolute care.
          </div>
          <div className="flex flex-wrap gap-3">
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

export default AboutPage;
