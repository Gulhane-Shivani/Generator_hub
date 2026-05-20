import React, { useState, useEffect } from 'react';
import { FaCopy, FaCheck, FaSync, FaYoutube, FaInstagram, FaTwitch } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const SocialMediaNameGenerator = () => {
  const { showToast } = useApp();
  const [platform, setPlatform] = useState('youtube'); // youtube, instagram, twitch
  const [niche, setNiche] = useState('tech'); // tech, gaming, vlog, cooking, fitness
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const platformIcons = {
    youtube: <FaYoutube className="text-rose-500" />,
    instagram: <FaInstagram className="text-pink-500" />,
    twitch: <FaTwitch className="text-violet-500" />
  };

  const templates = {
    tech: [
      '[Key] Tech', 'Tech with [Key]', 'The [Key] Byte', '[Key] Dev Insights', 
      'Legacy [Key]', '[Key] Systemics', 'Future [Key]', '[Key] Codes'
    ],
    gaming: [
      '[Key] Gaming', '[Key] Playz', 'xX_[Key]_Xx', 'Slayer [Key]',
      'The Real [Key]', '[Key] Knight', 'Glitch [Key]', '[Key] Respawn'
    ],
    vlog: [
      'Life of [Key]', 'Vlogs by [Key]', 'The [Key] Experience', 'Daily [Key]',
      '[Key] Unfiltered', 'Meet [Key]', '[Key] Adventure', 'Journeys of [Key]'
    ],
    cooking: [
      'Chef [Key]', 'Cooking with [Key]', '[Key]\'s Kitchen', 'The Tasty [Key]',
      'Spiced [Key]', '[Key] Bites', 'Gourmet [Key]', '[Key] Eats'
    ],
    fitness: [
      'Fit [Key]', '[Key] Workout', '[Key] Strength', 'Active [Key]',
      'The [Key] Lift', '[Key] Grind', 'Iron [Key]', '[Key] Physique'
    ]
  };

  const generateNames = () => {
    const rawKey = keyword.trim();
    let key = rawKey || 'Alpha';
    
    // Capitalize first letter
    key = key.charAt(0).toUpperCase() + key.slice(1);

    const platformPrefixes = {
      youtube: ['', 'TV', 'Channel'],
      instagram: ['Official', 'TheReal', 'Daily'],
      twitch: ['Live', 'Stream', 'Playz']
    };

    const currentNicheTemplates = templates[niche] || templates.tech;
    const compiled = currentNicheTemplates.map((t) => {
      let baseName = t.replace(/\[Key\]/g, key);
      
      // Randomly append platform decorations occasionally
      const prefix = platformPrefixes[platform][Math.floor(Math.random() * 3)];
      const rand = Math.random();
      
      if (rand < 0.3 && prefix) {
        if (platform === 'instagram') {
          baseName = `${prefix}.${baseName.replace(/\s+/g, '').toLowerCase()}`;
        } else {
          baseName = `${baseName} ${prefix}`;
        }
      }
      
      // Format based on platform
      if (platform === 'instagram') {
        return baseName.replace(/\s+/g, '_').toLowerCase();
      } else if (platform === 'twitch') {
        return baseName.replace(/\s+/g, '');
      }
      return baseName;
    });

    setSuggestions(compiled);
    setCopiedIndex(null);
  };

  useEffect(() => {
    generateNames();
  }, [platform, niche]);

  const handleCopy = (name, index) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    showToast(`Name "${name}" copied!`, 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Parameter config */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Platform Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Target Social Platform
            </label>
            <div className="flex gap-2">
              {[
                { id: 'youtube', label: 'YouTube', icon: 'youtube' },
                { id: 'instagram', label: 'Instagram', icon: 'instagram' },
                { id: 'twitch', label: 'Twitch/Gaming', icon: 'twitch' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPlatform(item.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    platform === item.id
                      ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {platformIcons[item.icon]}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Niche Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Content Category / Niche
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-4 py-2 rounded-xl text-sm glass-input font-semibold h-[38px] text-slate-700 dark:text-slate-300"
            >
              <option value="tech">Technology & Dev</option>
              <option value="gaming">Gaming & Esports</option>
              <option value="vlog">Vlogs & Lifestyle</option>
              <option value="cooking">Cooking & Food</option>
              <option value="fitness">Fitness & Gym</option>
            </select>
          </div>
        </div>

        {/* Keyword input */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Brand Keyword (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. byte, vortex, kitchen, lift"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') generateNames();
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium"
            />
          </div>
          <button
            onClick={generateNames}
            className="py-2.5 px-6 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-all font-semibold shadow-lg shadow-violet-500/25 flex items-center gap-2 text-sm h-[42px]"
          >
            <FaSync /> Blend
          </button>
        </div>
      </div>

      {/* Suggestion list table */}
      <div className="glass-effect rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <table className="w-full border-collapse text-left text-xs md:text-sm">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <th className="p-4">Suggested Handle</th>
              <th className="p-4">Platform Format</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50 font-medium">
            {suggestions.map((name, index) => (
              <tr key={index} className="hover:bg-slate-50/20 dark:hover:bg-slate-900/20 transition-colors">
                <td className="p-4 font-semibold text-slate-800 dark:text-slate-100">{name}</td>
                <td className="p-4 text-[10px] uppercase font-bold text-slate-400">
                  {platform}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleCopy(name, index)}
                    className={`p-2 rounded-lg text-xs transition-colors ${
                      copiedIndex === index
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-600'
                    }`}
                  >
                    {copiedIndex === index ? <FaCheck className="text-[10px]" /> : <FaCopy className="text-[10px]" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SocialMediaNameGenerator;
