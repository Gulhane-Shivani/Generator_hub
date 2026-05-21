import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaLightbulb, FaSlidersH, FaShareAlt, FaCode,
  FaSearch, FaFire, FaBolt, FaLock, FaMobile, FaHandSparkles, FaArrowRight 
} from 'react-icons/fa';
import { categories, tools } from '../data/toolsData';
import ToolIcon from '../components/ToolIcon';

const LandingPage = () => {
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState('');

  const trendingTools = tools.filter(tool => tool.trending);

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(localSearch.toLowerCase()) ||
    tool.description.toLowerCase().includes(localSearch.toLowerCase())
  );

  const categoryIcons = {
    security: <FaShieldAlt className="text-2xl" />,
    creative: <FaLightbulb className="text-2xl" />,
    utility: <FaSlidersH className="text-2xl" />,
    social: <FaShareAlt className="text-2xl" />,
    developer: <FaCode className="text-2xl" />
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="space-y-16 py-4 relative">
      
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-6 relative select-none">
        
        {/* Floating gradient orb backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2"
        >
          <FaBolt className="text-[10px] animate-bounce" /> Completely Client-Side & Secure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-[1.1]"
        >
          The Ultimate Hub of <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Smart Generator Tools
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium"
        >
          Generate cryptographically secure passwords, barcode labels, hashtags, brand names, and more. 100% private, free, and instantly rendered in your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-4 flex justify-center gap-4"
        >
          <a
            href="#categories"
            className="py-3 px-8 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-500/30 transition-all flex items-center gap-2 text-sm"
          >
            Explore Generators <FaArrowRight className="text-xs" />
          </a>
        </motion.div>
      </section>

      {/* 2. SEARCH TOOL SECTION */}
      <section className="max-w-xl mx-auto space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-slate-400 text-sm" />
          </div>
          <input
            type="text"
            placeholder="Search generators instantly (e.g. Password, QR)..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm glass-input font-medium shadow-md placeholder-slate-400"
          />
        </div>

        {/* Real-time search filter display */}
        {localSearch && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-4 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 space-y-2 max-h-80 overflow-y-auto"
          >
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                      <ToolIcon name={tool.icon} className="text-xs" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                        {tool.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200/20">
                    {tool.category}
                  </span>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                No tools match "{localSearch}"
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section id="categories" className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display">
            Browse by Category
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            Choose from one of our curated tool groups below.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className={`glass-effect rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow flex flex-col justify-between group transition-shadow ${cat.hoverGradient}`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {categoryIcons[cat.id]}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-display">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to={`/${cat.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  View Tools <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. TRENDING TOOLS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight font-display flex items-center gap-2">
            <FaFire className="text-orange-500 text-lg animate-pulse" /> Popular Generators
          </h2>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Most Visited
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTools.map((tool) => {
            const catInfo = categories.find(c => c.id === tool.category);
            return (
              <Link
                key={tool.id}
                to={`/tool/${tool.id}`}
                className="glass-effect p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:border-violet-500/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                      <ToolIcon name={tool.icon} className="text-sm" />
                    </div>
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded text-white bg-gradient-to-r ${catInfo?.gradient || 'from-violet-500 to-indigo-500'}`}>
                      {tool.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                      {tool.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURES / WHY US */}
      <section className="glass-effect rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow grid grid-cols-1 md:grid-cols-4 gap-6 text-center select-none">
        <div className="space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
            <FaLock className="text-base" />
          </div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">100% Private & Secure</h4>
          <p className="text-[10px] text-slate-400 max-w-[200px]">All generation runs client-side. No tracking APIs.</p>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
            <FaBolt className="text-base" />
          </div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Ultra Fast Speed</h4>
          <p className="text-[10px] text-slate-400 max-w-[200px]">Instant rendering with zero server roundtrips.</p>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
            <FaMobile className="text-base" />
          </div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Fully Responsive UI</h4>
          <p className="text-[10px] text-slate-400 max-w-[200px]">Beautiful layouts tested on mobile and desktops.</p>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-2">
            <FaHandSparkles className="text-base" />
          </div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Zero Configuration</h4>
          <p className="text-[10px] text-slate-400 max-w-[200px]">Intuitive controls, sliders, and copy toggles.</p>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
