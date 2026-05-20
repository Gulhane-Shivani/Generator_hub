import React, { useState } from 'react';
import { FaCopy, FaCheck, FaSync, FaHashtag, FaFire, FaRegStar, FaChartLine } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const HashtagGenerator = () => {
  const { showToast } = useApp();
  const [keyword, setKeyword] = useState('');
  const [tags, setTags] = useState({ popular: [], niche: [], trending: [] });
  const [copiedSection, setCopiedSection] = useState(null); // 'popular' | 'niche' | 'trending' | 'all'

  const hashtagBases = {
    popular: ['Love', 'Life', 'Creator', 'Coding', 'Marketing', 'Art', 'Nature', 'Travel', 'Explore', 'Business', 'Success', 'Vlog'],
    niche: ['DevLife', 'SaaSMaker', 'CleanCode', 'GrowthHacking', 'FramerMotion', 'TailwindCSS', 'JavaScriptRules', 'IndieHackers', 'UIUXDesign'],
    trending: ['AIEra', 'Web3Development', 'ChatGPTPlug', 'WorkFromAnywhere', 'MinimalistSaaS', 'BuildInPublic', 'Solopreneurs']
  };

  const generateHashtags = () => {
    const raw = keyword.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const baseWord = raw || 'creative';
    
    // Capitalize first letter for camelCase hashtags
    const capitalized = baseWord.charAt(0).toUpperCase() + baseWord.slice(1);

    const popularSuffixes = ['Life', 'Vibe', 'Hub', 'Central', 'Creators', 'Community', 'Daily', 'World'];
    const nicheSuffixes = ['Dev', 'Design', 'Strategy', 'Tips', 'Stack', 'Hacks', 'Mastery', 'Expert'];
    const trendingSuffixes = ['Trends', '2026', 'Future', 'Revolution', 'VibeCheck', 'Now', 'Insights'];

    const popular = popularSuffixes.map(s => `#${capitalized}${s}`);
    const niche = nicheSuffixes.map(s => `#${capitalized}${s}`);
    const trending = trendingSuffixes.map(s => `#${capitalized}${s}`);

    // Prepend raw hashtag
    popular.unshift(`#${capitalized}`);

    setTags({ popular, niche, trending });
    setCopiedSection(null);
  };

  React.useEffect(() => {
    generateHashtags();
  }, []);

  const handleCopySection = (section, list) => {
    if (list.length === 0) return;
    const text = list.join(' ');
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    showToast(`${section === 'all' ? 'All' : section} hashtags copied!`, 'success');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const allTagsList = [...tags.popular, ...tags.niche, ...tags.trending];

  return (
    <div className="space-y-6">
      {/* Search keywords tag config */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Primary Keyword or Topic (e.g. coding, yoga, fashion)
            </label>
            <input
              type="text"
              placeholder="e.g. startup, health, cooking"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') generateHashtags();
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium"
            />
          </div>
          <button
            onClick={generateHashtags}
            className="py-2.5 px-6 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-all font-semibold shadow-lg shadow-violet-500/25 flex items-center gap-2 text-sm h-[42px]"
          >
            <FaSync /> Expand
          </button>
        </div>
      </div>

      {/* Bulk copy control */}
      {allTagsList.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => handleCopySection('all', allTagsList)}
            className="py-2 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-2 text-xs shadow transition-all"
          >
            {copiedSection === 'all' ? <FaCheck /> : <FaCopy />}
            Copy All Tags ({allTagsList.length})
          </button>
        </div>
      )}

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Popular Tags */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between min-h-[250px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FaFire className="text-rose-500 text-xs" /> Popular
              </h3>
              <button
                onClick={() => handleCopySection('popular', tags.popular)}
                className="text-[10px] font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
              >
                {copiedSection === 'popular' ? <FaCheck /> : <FaCopy />} Copy Section
              </button>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {tags.popular.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 font-semibold select-all">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Niche Tags */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between min-h-[250px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FaRegStar className="text-amber-500 text-xs" /> Niche Specific
              </h3>
              <button
                onClick={() => handleCopySection('niche', tags.niche)}
                className="text-[10px] font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
              >
                {copiedSection === 'niche' ? <FaCheck /> : <FaCopy />} Copy Section
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.niche.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 font-semibold select-all">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Tags */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between min-h-[250px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FaChartLine className="text-emerald-500 text-xs" /> Trending Now
              </h3>
              <button
                onClick={() => handleCopySection('trending', tags.trending)}
                className="text-[10px] font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
              >
                {copiedSection === 'trending' ? <FaCheck /> : <FaCopy />} Copy Section
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.trending.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 font-semibold select-all">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HashtagGenerator;
