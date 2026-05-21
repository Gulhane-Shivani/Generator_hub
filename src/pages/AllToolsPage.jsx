import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowRight, FaSlidersH, FaShieldAlt, FaLightbulb, FaShareAlt, FaCompass, FaCode } from 'react-icons/fa';
import { categories, tools } from '../data/toolsData';
import ToolIcon from '../components/ToolIcon';

const AllToolsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIcons = {
    security: <FaShieldAlt />,
    creative: <FaLightbulb />,
    utility: <FaSlidersH />,
    social: <FaShareAlt />,
    developer: <FaCode />
  };

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 py-4 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center md:text-left space-y-2 md:max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-450 bg-clip-text text-transparent">
          Explore All Generators
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Access our comprehensive suite of 100% secure, offline-ready local utilities and creative mock generator engines.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between border-b border-slate-200/30 dark:border-slate-800/30 pb-6">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                : 'bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            All Categories ({tools.length})
          </button>
          {categories.map((cat) => {
            const count = tools.filter(t => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-[10px]">{categoryIcons[cat.id]}</span>
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Local Search Input */}
        <div className="relative w-full lg:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-slate-400 text-xs" />
          </div>
          <input
            type="text"
            placeholder="Filter list by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs glass-input font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50"
          />
        </div>
      </div>

      {/* Tools Cards Grid */}
      <AnimatePresence mode="popLayout">
        {filteredTools.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTools.map((tool) => {
              const catInfo = categories.find(c => c.id === tool.category);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={tool.id}
                  className="glass-effect rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 flex flex-col justify-between hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-200 group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-200">
                        <ToolIcon name={tool.icon} className="text-lg" />
                      </div>
                      <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded text-white bg-gradient-to-r ${catInfo?.gradient || 'from-violet-500 to-indigo-500'}`}>
                        {catInfo?.name || tool.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-6 border-t border-slate-200/20 dark:border-slate-800/20 mt-4 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                      Instant Tool
                    </span>
                    <Link
                      to={`/tool/${tool.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform"
                    >
                      Open Tool <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 glass-effect rounded-2xl border border-slate-200/50 dark:border-slate-800/50 max-w-md mx-auto space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto text-slate-400">
              <FaCompass className="text-xl animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-250">No tools match your criteria</h3>
              <p className="text-xs text-slate-500 dark:text-slate-450">Try selecting a different category or clearing your filter term.</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-750 text-white text-xs font-semibold shadow transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllToolsPage;
