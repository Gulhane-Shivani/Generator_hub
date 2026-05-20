import React, { useState } from 'react';
import { FaCopy, FaCheck, FaSync, FaInfoCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const UsernameGenerator = () => {
  const { showToast } = useApp();
  const [network, setNetwork] = useState('General');
  const [accountType, setAccountType] = useState('Personal');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [seed, setSeed] = useState('');
  const [leetSpeak, setLeetSpeak] = useState(false);
  const [addNumbers, setAddNumbers] = useState(true);
  const [gamerStyle, setGamerStyle] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const categoryWords = {
    General: ['Vortex', 'Alpha', 'Phantom', 'Neo', 'Nova', 'Cyber', 'Zephyr', 'Rogue', 'Apex', 'Omega', 'Matrix', 'Titan', 'Zenith', 'Echo', 'Frost', 'Shadow'],
    Tech: ['Byte', 'Tech', 'Code', 'Dev', 'Pixel', 'Cyber', 'Data', 'Cloud', 'Logic', 'Crypt', 'Bit', 'Web', 'Net', 'System', 'Algorithm', 'Stack'],
    Gaming: ['Gamer', 'Play', 'Slayer', 'Pro', 'GG', 'Quest', 'XP', 'Viper', 'Rage', 'Claw', 'Blade', 'Boss', 'Level', 'Stream', 'Frag', 'Nexus'],
    Fashion: ['Chic', 'Vogue', 'Style', 'Glam', 'Couture', 'Look', 'Trend', 'Wear', 'Fit', 'Silk', 'Luxe', 'Gold', 'Silver', 'Aura', 'Grace', 'Moda'],
    Travel: ['Wander', 'Nomad', 'Globe', 'Voyage', 'Trip', 'Path', 'Map', 'Roam', 'Wild', 'Sky', 'Zen', 'Coast', 'Trail', 'Summit', 'Peak', 'Compass'],
    Food: ['Chef', 'Bite', 'Cook', 'Taste', 'Yum', 'Sweet', 'Dine', 'Dish', 'Eats', 'Fork', 'Salty', 'Spice', 'Bake', 'Grill', 'Kitchen', 'Feast'],
    Fitness: ['Fit', 'Gym', 'Lift', 'Run', 'Strong', 'Iron', 'Flex', 'Power', 'Beast', 'Pulse', 'Sweat', 'Pace', 'Active', 'Athletic', 'Tough', 'Form'],
    Art: ['Art', 'Draw', 'Paint', 'Ink', 'Sketch', 'Muse', 'Craft', 'Lens', 'Vivid', 'Pixel', 'Hue', 'Canvas', 'Design', 'Palette', 'Glow', 'Vision'],
    Music: ['Beat', 'Tune', 'Sound', 'Chord', 'Song', 'Rhythm', 'Bass', 'Lyric', 'Audio', 'Voice', 'Melody', 'Vibe', 'Harmonic', 'Echo', 'Solo', 'Band'],
    Business: ['Hub', 'Biz', 'Growth', 'Mindset', 'Ventures', 'Lead', 'Boss', 'Smart', 'Strategy', 'Capital', 'Asset', 'Equity', 'Market', 'Trade', 'Scale', 'Firm'],
    Comedy: ['HaHa', 'Joke', 'Laugh', 'Gag', 'Meme', 'Fun', 'Humor', 'Wit', 'Jester', 'Smile', 'Silly', 'Chuckle', 'Comical', 'Quip', 'Prank', 'Goofy']
  };

  const networkStyles = {
    General: { prefixes: [], suffixes: [] },
    Instagram: { prefixes: ['the', 'real', 'its', 'iam'], suffixes: ['official', 'lifestyle'] },
    TikTok: { prefixes: ['its', 'iam', 'hereis', 'heyits'], suffixes: ['tok', 'vibe'] },
    Twitter: { prefixes: ['ask', 'real', 'the'], suffixes: ['hq', 'dev', 'status', 'write'] },
    YouTube: { prefixes: ['the', 'watch'], suffixes: ['tv', 'channel', 'media', 'show', 'vlogs'] },
    Twitch: { prefixes: ['ttv', 'live', 'play'], suffixes: ['gg', 'stream', 'plays'] },
    Pinterest: { prefixes: ['pin', 'my'], suffixes: ['pins', 'board', 'creations', 'studio'] },
    Facebook: { prefixes: ['real', 'official'], suffixes: ['page', 'profile', 'community'] }
  };

  const accountTypeWords = {
    Personal: { prefixes: ['its', 'iam', 'just', 'only', 'me'], suffixes: [] },
    Business: { prefixes: [], suffixes: ['co', 'inc', 'agency', 'group', 'solutions', 'consulting', 'global', 'brands', 'associates'] },
    Creator: { prefixes: ['creative', 'studio'], suffixes: ['maker', 'design', 'works', 'creative', 'studio', 'art', 'pro'] },
    FanPage: { prefixes: ['fan', 'daily'], suffixes: ['fan', 'updates', 'club', 'hub', 'daily', 'world'] },
    Community: { prefixes: [], suffixes: ['club', 'hub', 'network', 'circle', 'world', 'society', 'community', 'collective'] }
  };

  const convertToLeet = (str) => {
    return str
      .replace(/e/gi, '3')
      .replace(/a/gi, '4')
      .replace(/o/gi, '0')
      .replace(/i/gi, '1')
      .replace(/s/gi, '5')
      .replace(/t/gi, '7');
  };

  const generateUsernames = () => {
    const results = [];
    const used = new Set();

    // 1. Gather potential base keywords
    const seedWord = seed.trim().replace(/\s+/g, '');

    // Extract words from description
    const fillerWords = new Set(['the', 'and', 'for', 'with', 'you', 'this', 'that', 'from', 'have', 'your', 'about', 'like', 'love', 'page']);
    const descWords = description
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length >= 3 && !fillerWords.has(w))
      .map(w => w.charAt(0).toUpperCase() + w.slice(1)); // Capitalize

    const catList = categoryWords[category] || categoryWords['General'];
    const netStyle = networkStyles[network] || networkStyles['General'];
    const accStyle = accountTypeWords[accountType] || accountTypeWords['Personal'];

    while (results.length < 15) {
      let base = 'User';
      const rollBase = Math.random();

      if (seedWord) {
        if (rollBase < 0.7) {
          base = seedWord;
        } else if (descWords.length > 0) {
          base = Math.random() < 0.5 ? `${seedWord}${descWords[0]}` : `${descWords[0]}${seedWord}`;
        } else {
          const randomCat = catList[Math.floor(Math.random() * catList.length)];
          base = Math.random() < 0.5 ? `${seedWord}${randomCat}` : `${randomCat}${seedWord}`;
        }
      } else if (descWords.length > 0) {
        if (descWords.length === 1) {
          base = descWords[0];
        } else if (descWords.length > 1) {
          base = Math.random() < 0.6 ? `${descWords[0]}${descWords[1]}` : descWords[0];
        }
      } else {
        base = catList[Math.floor(Math.random() * catList.length)];
      }

      if (!seedWord && descWords.length > 0 && Math.random() < 0.4) {
        const randomCat = catList[Math.floor(Math.random() * catList.length)];
        base = Math.random() < 0.5 ? `${base}${randomCat}` : `${randomCat}${base}`;
      }

      // Prepend/append network or account type flairs
      let prefix = '';
      let suffix = '';

      if (netStyle.prefixes.length > 0 && Math.random() < 0.4) {
        prefix = netStyle.prefixes[Math.floor(Math.random() * netStyle.prefixes.length)];
      }
      if (netStyle.suffixes.length > 0 && Math.random() < 0.4) {
        suffix = netStyle.suffixes[Math.floor(Math.random() * netStyle.suffixes.length)];
      }

      if (accStyle.prefixes.length > 0 && Math.random() < 0.3 && !prefix) {
        prefix = accStyle.prefixes[Math.floor(Math.random() * accStyle.prefixes.length)];
      }
      if (accStyle.suffixes.length > 0 && Math.random() < 0.3 && !suffix) {
        suffix = accStyle.suffixes[Math.floor(Math.random() * accStyle.suffixes.length)];
      }

      const separator = (network === 'Instagram' || network === 'Twitter' || network === 'Twitch')
        ? (Math.random() < 0.5 ? '_' : (network === 'Instagram' ? '.' : ''))
        : '';

      const parts = [prefix, base, suffix].filter(Boolean);
      let current = parts.join(separator);

      if (gamerStyle) {
        current = `xX_${current}_Xx`;
      }

      if (addNumbers) {
        const num = Math.random() < 0.5 ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * 10);
        current = `${current}${num}`;
      }

      if (leetSpeak) {
        current = convertToLeet(current);
      }

      // Sanitize username by network rules
      if (network === 'Instagram' || network === 'TikTok') {
        current = current.replace(/[^a-zA-Z0-9._]/g, '');
      } else if (network === 'Twitter' || network === 'Twitch') {
        current = current.replace(/[^a-zA-Z0-9_]/g, '');
      } else {
        current = current.replace(/[^a-zA-Z0-9._-]/g, '');
      }

      current = current.replace(/[._-]{2,}/g, separator || '_');
      current = current.replace(/^[._-]+|[._-]+$/g, '');

      if (current.length >= 3 && !used.has(current)) {
        results.push(current);
        used.add(current);
      }

      if (used.size > 50) break;
    }

    while (results.length < 12) {
      const fallback = `User_${Math.floor(Math.random() * 10000)}`;
      if (!used.has(fallback)) {
        results.push(fallback);
        used.add(fallback);
      }
    }

    setUsernames(results.slice(0, 12));
    setCopiedIndex(null);
  };

  React.useEffect(() => {
    generateUsernames();
  }, [leetSpeak, addNumbers, gamerStyle, network, accountType, category]);

  const handleCopy = (name, index) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    showToast(`Username "${name}" copied!`, 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Form */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">

        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Network */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Network
            </label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer"
            >
              <option value="General" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Select Network</option>
              <option value="Instagram" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Instagram</option>
              <option value="TikTok" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">TikTok</option>
              <option value="Twitter" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Twitter / X</option>
              <option value="YouTube" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">YouTube</option>
              <option value="Twitch" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Twitch</option>
              <option value="Pinterest" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Pinterest</option>
              <option value="Facebook" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Facebook</option>
              <option value="Other" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Other</option>
            </select>
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer"
            >
              <option value="Personal" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Select Account Type</option>
              <option value="Personal" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Personal</option>
              <option value="Business" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Business / Brand</option>
              <option value="Creator" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Creator / Influencer</option>
              <option value="FanPage" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Fan Page</option>
              <option value="Community" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Community / Group</option>
              <option value="Other" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Other</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer"
            >
              <option value="General" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Select Category</option>
              <option value="General" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">General</option>
              <option value="Tech" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Tech & Coding</option>
              <option value="Gaming" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Gaming</option>
              <option value="Fashion" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Fashion & Beauty</option>
              <option value="Travel" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Travel & Adventure</option>
              <option value="Food" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Food & Cooking</option>
              <option value="Fitness" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Fitness & Health</option>
              <option value="Art" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Art & Design</option>
              <option value="Music" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Music & Performance</option>
              <option value="Business" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Business & Finance</option>
              <option value="Comedy" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Comedy & Entertainment</option>
              <option value="Other" className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">Other</option>
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Short Description
            </label>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
              {description.length}/200
            </span>
          </div>
          <textarea
            maxLength={200}
            rows={2}
            placeholder="Type Your Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium resize-none bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none"
          />
        </div>

        {/* Keyword & Generate Button */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Keyword (e.g. hunter, sam, zero)
            </label>
            <input
              type="text"
              placeholder="e.g. spark, alpha, shadow"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') generateUsernames();
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>
          <button
            onClick={generateUsernames}
            className="py-2.5 px-6 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-all font-semibold shadow-lg shadow-violet-500/25 flex items-center gap-2 text-sm h-[42px] cursor-pointer"
          >
            <FaSync /> Generate
          </button>
        </div>

        {/* Toggle switches grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Leet-Speak (l33t)</span>
              <span className="text-[10px] text-slate-400">Swap vowels with numbers</span>
            </div>
            <input
              type="checkbox"
              checked={leetSpeak}
              onChange={(e) => setLeetSpeak(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Append Numbers</span>
              <span className="text-[10px] text-slate-400">Append random digits</span>
            </div>
            <input
              type="checkbox"
              checked={addNumbers}
              onChange={(e) => setAddNumbers(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all">
            <div>
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Gaming Decors</span>
              <span className="text-[10px] text-slate-400">Prepend/Append xX_ _Xx</span>
            </div>
            <input
              type="checkbox"
              checked={gamerStyle}
              onChange={(e) => setGamerStyle(e.target.checked)}
              className="w-4 h-4 text-violet-600 bg-slate-100 border-slate-300 rounded focus:ring-violet-500 accent-violet-500 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Suggestion list */}
      {usernames.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Recommended Handles
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {usernames.map((name, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(name, idx)}
                className="group relative overflow-hidden glass-effect p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:border-violet-500 dark:hover:border-violet-500 text-left transition-all duration-200 flex items-center justify-between cursor-pointer"
              >
                <span className="block text-sm md:text-base font-mono font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {name}
                </span>

                <div>
                  {copiedIndex === idx ? (
                    <FaCheck className="text-emerald-500 text-xs" />
                  ) : (
                    <FaCopy className="text-slate-400 dark:text-slate-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsernameGenerator;

