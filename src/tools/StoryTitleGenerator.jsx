import React, { useState, useEffect } from 'react';
import { FaCopy, FaCheck, FaSync } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const StoryTitleGenerator = () => {
  const { showToast } = useApp();
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('blog'); // blog, story, headline
  const [genre, setGenre] = useState('tech'); // tech, thriller, fantasy, business, self-help
  const [results, setResults] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const titleTemplates = {
    blog: {
      tech: [
        'How [Sub] is Revolutionizing the Next Decade of Technology',
        'Why You Should Stop Ignoring [Sub] Today',
        'The Ultimate Developer Guide to Mastering [Sub]',
        'Top 10 [Sub] Frameworks Every Developer Needs',
        'Is [Sub] Dead? Here Is What the Experts Think',
        'A Beginners Guide to Building Scalable Apps with [Sub]',
        'How We Scaled Our Infrastructure Using [Sub]'
      ],
      business: [
        'How to Build a Multi-Million Dollar SaaS Around [Sub]',
        'The Silent Killer of [Sub] Startups (And How to Avoid It)',
        'Why Venture Capitalists are Flooding Money Into [Sub]',
        '7 Secrets to Growing Your Team\'s Focus on [Sub]',
        'How to Bootstrap Your Next [Sub] Business to $10k MRR',
        'The Shift in [Sub] That Every Founder Must Know'
      ],
      'self-help': [
        'Mastering Your Focus: A Personal Journey Through [Sub]',
        'The Psychological Hack to Improving [Sub] Fast',
        'How to Build a Sustainable Habits Cycle Around [Sub]',
        'Why [Sub] is the Secret to Achieving Peak Productivity',
        'Overcoming Burnout: What [Sub] Taught Me About Balance',
        '15 Minutes of [Sub] a Day Will Change Your Life'
      ]
    },
    story: {
      thriller: [
        'The [Sub] Protocol',
        'Whispers in the [Sub]',
        'Before the [Sub] Fades',
        'The [Sub] Conspiracy',
        'Murder at [Sub] Manor',
        'No Exit: The [Sub] Files',
        'The Dark Secret of [Sub]'
      ],
      fantasy: [
        'The Chronicles of [Sub]',
        'A Kingdom of [Sub] and Ash',
        'The Last [Sub] Mage',
        'Legends of the [Sub] Crystal',
        'The Curse of [Sub]',
        'Beyond the [Sub] Gates',
        'Rise of the [Sub] Dragon'
      ],
      tech: [
        'The [Sub] Simulation',
        'Silicon Valley: The [Sub] Syndicate',
        'AI Rebellion: The [Sub] Code',
        'Zero Day: When [Sub] Failed',
        'The Virtual [Sub] Dream'
      ]
    },
    headline: {
      tech: [
        'Say Goodbye to Complexity with [Sub]!',
        'This New [Sub] Framework Changes Everything.',
        'Why Developers are Moving from Legacy Tools to [Sub]...',
        'Get Ready for the Next Big Thing: [Sub] v2.'
      ],
      business: [
        'Increase Your Revenue by 300% Using [Sub] Today!',
        'The Cheat Code to Double Sales: [Sub].',
        'Unlock Your Organization\'s Potential with [Sub].',
        'The Best Financial Strategy for [Sub] in 2026.'
      ],
      'self-help': [
        'Reclaim Your Mental Space and Unlock [Sub].',
        'Transform Your Routine and Master [Sub] Overnight.',
        'Stop Procrasinating: Here Is How to Tackle [Sub].',
        'Empower Yourself: The True Key to [Sub].'
      ]
    }
  };

  const generateTitles = () => {
    const term = subject.trim() || 'Innovation';
    
    // Choose appropriate template lists based on modes
    let templates = [];
    
    if (type === 'blog') {
      const g = ['tech', 'business', 'self-help'].includes(genre) ? genre : 'tech';
      templates = titleTemplates.blog[g] || titleTemplates.blog.tech;
    } else if (type === 'story') {
      const g = ['thriller', 'fantasy', 'tech'].includes(genre) ? genre : 'fantasy';
      templates = titleTemplates.story[g] || titleTemplates.story.fantasy;
    } else { // headline
      const g = ['tech', 'business', 'self-help'].includes(genre) ? genre : 'tech';
      templates = titleTemplates.headline[g] || titleTemplates.headline.tech;
    }

    const compiled = templates.map(t => t.replace(/\[Sub\]/g, term));
    setResults(compiled);
    setCopiedIndex(null);
  };

  useEffect(() => {
    generateTitles();
  }, [type, genre]);

  const handleCopy = (title, index) => {
    navigator.clipboard.writeText(title);
    setCopiedIndex(index);
    showToast('Title copied!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Parameter Settings Card */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
        
        {/* Toggle Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Title Type
            </label>
            <div className="flex gap-2">
              {[
                { id: 'blog', label: 'Blog Titles' },
                { id: 'story', label: 'Story & Book' },
                { id: 'headline', label: 'Ad Headlines' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setType(item.id)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    type === item.id
                      ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Genre selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Genre / Vibe
            </label>
            <div className="flex gap-2">
              {type === 'story'
                ? [
                    { id: 'fantasy', label: 'Fantasy/SciFi' },
                    { id: 'thriller', label: 'Thriller/Mystery' },
                    { id: 'tech', label: 'Cyber/Tech' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setGenre(item.id)}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        genre === item.id
                          ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))
                : [
                    { id: 'tech', label: 'Technology' },
                    { id: 'business', label: 'Business' },
                    { id: 'self-help', label: 'Self Help' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setGenre(item.id)}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        genre === item.id
                          ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
            </div>
          </div>
        </div>

        {/* Custom Subject keyword input */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Subject Topic (e.g. Artificial Intelligence, Crypt, Time Travel)
            </label>
            <input
              type="text"
              placeholder="e.g. AI, Secrets, Quantum Computer"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') generateTitles();
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium"
            />
          </div>
          <button
            onClick={generateTitles}
            className="py-2.5 px-6 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-all font-semibold shadow-lg shadow-violet-500/25 flex items-center gap-2 text-sm h-[42px]"
          >
            <FaSync /> Blend
          </button>
        </div>
      </div>

      {/* Suggestion list table */}
      <div className="glass-effect rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Generated Titles</h3>
        </div>
        <div className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
          {results.map((title, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors gap-4"
            >
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 md:line-clamp-1">
                {title}
              </span>
              <button
                onClick={() => handleCopy(title, index)}
                className={`p-2 rounded-xl text-xs transition-colors flex-shrink-0 ${
                  copiedIndex === index
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-600'
                }`}
              >
                {copiedIndex === index ? <FaCheck className="text-xs" /> : <FaCopy className="text-xs" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryTitleGenerator;
