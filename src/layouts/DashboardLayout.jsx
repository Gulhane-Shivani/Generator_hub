import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaSun, FaMoon, FaBars, FaTimes, 
  FaHome, FaShieldAlt, FaLightbulb, FaSlidersH, 
  FaShareAlt, FaGithub, FaTwitter, FaLinkedin,
  FaChevronRight, FaCompass, FaHeart, FaChevronDown
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { categories, tools } from '../data/toolsData';
import ToolIcon from '../components/ToolIcon';
import Toast from '../components/Toast';

const DashboardLayout = ({ children }) => {
  const { theme, toggleTheme, searchQuery, setSearchQuery, showToast } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    security: true,
    creative: true,
    utility: true,
    social: true
  });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Click outside search dropdown close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const filteredTools = searchQuery.trim() 
    ? tools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (toolId) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/tool/${toolId}`);
  };

  const categoryIcons = {
    security: <FaShieldAlt />,
    creative: <FaLightbulb />,
    utility: <FaSlidersH />,
    social: <FaShareAlt />
  };

  const sidebarContent = (
    <div className="flex flex-col h-full select-none">
      {/* Sidebar Header / Brand */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
          <FaCompass className="text-xl animate-spin-slow" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent font-display leading-tight">
            Generator Hub
          </h1>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
            Frontend Toolkit
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Home Route */}
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
            location.pathname === '/'
              ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-l-4 border-violet-500 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <FaHome className="text-lg" />
          <span>Dashboard Home</span>
        </Link>

        {/* Categories Group */}
        <div className="space-y-3 pt-2">
          <p className="px-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Categories
          </p>

          {categories.map((cat) => {
            const isCatActive = location.pathname.startsWith(`/${cat.id}`);
            const isExpanded = expandedCategories[cat.id];
            const catTools = tools.filter(t => t.category === cat.id);

            return (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center justify-between group">
                  <Link
                    to={`/${cat.id}`}
                    className={`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                      isCatActive
                        ? 'bg-gradient-to-r from-violet-500/10 to-transparent text-violet-600 dark:text-violet-400 border-l-2 border-violet-500'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    <span className="text-sm">{categoryIcons[cat.id]}</span>
                    <span>{cat.name}</span>
                  </Link>

                  <button
                    onClick={() => toggleCategoryExpand(cat.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <FaChevronDown 
                      className={`text-[10px] transform transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Sub Tools List */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-7 space-y-1"
                    >
                      {catTools.map((tool) => {
                        const isToolActive = location.pathname === `/tool/${tool.id}`;
                        return (
                          <Link
                            key={tool.id}
                            to={`/tool/${tool.id}`}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                              isToolActive
                                ? 'text-violet-600 dark:text-violet-400 font-semibold'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                          >
                            <ToolIcon name={tool.icon} className="text-[10px]" />
                            <span className="truncate">{tool.name}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer Details */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
        <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
          Made with <FaHeart className="text-rose-500 animate-pulse" /> on client
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Glow Meshes */}
      <div className="glow-mesh bg-violet-600 top-[-200px] left-[-200px]"></div>
      <div className="glow-mesh bg-pink-500 bottom-[-200px] right-[-200px]"></div>
      
      {/* Toast Alert */}
      <Toast />

      {/* SIDEBAR - Desktop (Fixed) */}
      <aside className="hidden lg:block w-64 h-screen fixed left-0 top-0 z-30 border-r border-slate-200/50 dark:border-slate-800/50 glass-effect">
        {sidebarContent}
      </aside>

      {/* SIDEBAR - Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
            ></motion.div>
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 shadow-2xl glass-effect"
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <FaTimes />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen z-10">
        
        {/* NAVBAR */}
        <header className="sticky top-0 z-20 h-16 w-full glass-navbar flex items-center justify-between px-4 md:px-8 border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Open sidebar"
            >
              <FaBars className="text-lg" />
            </button>
            
            {/* Mobile-only logo */}
            <Link to="/" className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center text-white text-sm shadow">
                <FaCompass />
              </div>
              <span className="font-bold text-sm font-display tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                GenHub
              </span>
            </Link>
          </div>

          {/* Search bar & Settings */}
          <div className="flex items-center gap-4 flex-1 md:flex-initial justify-end">
            
            {/* Search Input */}
            <div ref={searchRef} className="relative w-full max-w-[200px] md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-slate-400 text-xs" />
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl text-xs glass-input font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400"
              />
              
              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showSearchDropdown && searchQuery.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-11 right-0 w-72 max-h-80 overflow-y-auto glass-effect rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 p-2 space-y-1"
                  >
                    <p className="text-[10px] text-slate-400 font-bold px-3 py-1 uppercase tracking-wider">
                      Matched Tools ({filteredTools.length})
                    </p>
                    {filteredTools.length > 0 ? (
                      filteredTools.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => handleSearchSelect(tool.id)}
                          className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 group transition-all"
                        >
                          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-violet-500 group-hover:text-white transition-colors mt-0.5">
                            <ToolIcon name={tool.icon} className="text-xs" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                              {tool.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">
                              {tool.description}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-4 text-slate-400 text-xs font-medium">
                        No tools found matching "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass-input text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </button>
          </div>
        </header>

        {/* MAIN ROUTE CONTENT */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto relative z-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="w-full border-t border-slate-200/50 dark:border-slate-800/50 bg-white/20 dark:bg-slate-950/20 backdrop-blur-md py-8 px-4 md:px-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center text-white text-[10px]">
                  <FaCompass />
                </div>
                <span className="font-bold text-sm tracking-tight font-display">
                  Generator Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Premium client-side generation tools for developers and creators.
              </p>
            </div>

            {/* Navigation links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Link to="/" className="hover:text-violet-500 transition-colors">Home</Link>
              <Link to="/security" className="hover:text-violet-500 transition-colors">Security</Link>
              <Link to="/creative" className="hover:text-violet-500 transition-colors">Creative</Link>
              <Link to="/utility" className="hover:text-violet-500 transition-colors">Utility</Link>
              <Link to="/social" className="hover:text-violet-500 transition-colors">Social</Link>
            </div>

            {/* Social icons */}
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-violet-500 hover:text-white transition-all">
                <FaTwitter className="text-xs" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-violet-500 hover:text-white transition-all">
                <FaGithub className="text-xs" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-violet-500 hover:text-white transition-all">
                <FaLinkedin className="text-xs" />
              </a>
            </div>
          </div>
          <div className="text-center mt-6 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-200/20 dark:border-slate-800/20 pt-4">
            &copy; {new Date().getFullYear()} Generator Hub. Designed for local, high-security client-side generation.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
