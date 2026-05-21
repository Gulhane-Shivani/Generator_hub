import React, { useState } from 'react';
import { FaCopy, FaCheck, FaSync, FaUserAlt, FaSmile, FaPaperPlane } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const BioGenerator = () => {
  const { showToast } = useApp();
  const [platform, setPlatform] = useState('twitter'); // twitter, linkedin, instagram, tiktok
  const [tone, setTone] = useState('creative'); // professional, funny, creative, minimalist, bold
  const [keywords, setKeywords] = useState('');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeCta, setIncludeCta] = useState(true);
  const [generatedBios, setGeneratedBios] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Pre-defined templates for generator logic
  const templates = {
    twitter: {
      professional: [
        "{role} passionate about {topic}. Building the future of {industry}. {cta}",
        "Focusing on {topic} & {industry}. Currently {role}. Let's connect. {cta}",
        "{role} specializing in {topic}. Sharing insights on {industry} and tech. {cta}"
      ],
      funny: [
        "Professional {role}. I run on coffee, {topic}, and bad jokes. {cta}",
        "Trying to explain {industry} to my parents. Part-time {role}, full-time {topic} enthusiast. {cta}",
        "Recovering {role}. Web surfer. My opinions on {topic} are highly subjective. {cta}"
      ],
      creative: [
        "Exploring the intersection of {topic} and {industry}. Crafting ideas as a {role}. {cta}",
        "Daydreamer. {role}. Believer in {topic}. Doing things that don't scale in {industry}. {cta}",
        "Designing experiences around {topic}. {role} by day, creator by night. {cta}"
      ],
      minimalist: [
        "{role} | {topic} | {industry}. {cta}",
        "{role} working on {topic}.",
        "Simply {role}. {topic} & {industry} builder. {cta}"
      ],
      bold: [
        "Redefining {industry}. Helping people master {topic} as a {role}. {cta}",
        "I build {industry} solutions. {role}. Disrupting the norm with {topic}. {cta}",
        "Zero fluff. Just {role} things. Scaling {topic} to the moon. {cta}"
      ]
    },
    linkedin: {
      professional: [
        "{role} with a focus on {topic} in the {industry} sector. Driven by solving complex problems. {cta}",
        "Experienced {role} helping teams grow. Specializing in {topic} and {industry} strategies. {cta}",
        "Passionate {role} dedicated to refining {industry} frameworks. Enthusiast of {topic}. {cta}"
      ],
      creative: [
        "Weaving code, design, and {topic} into impactful solutions. {role} inside the {industry} space. {cta}",
        "I help bridge the gap between technical {role} models and creative {topic} growth. {cta}",
        "{role} redefining what is possible in {industry}. Advocate for {topic}. {cta}"
      ],
      minimalist: [
        "{role} • {industry} • {topic}",
        "Building {industry} solutions centered on {topic}. {role}.",
        "{role} specializing in {topic}."
      ],
      funny: [
        "A {role} who actually enjoys long meetings. Focused on {topic} & {industry}. {cta}",
        "Solving {industry} problems you didn't know you had. {role} & {topic} enthusiast. {cta}",
        "Doing {role} stuff. Writing code, thinking about {topic}, and complaining about compile times. {cta}"
      ],
      bold: [
        "Driving ROI in {industry} through {topic}. Accomplished {role}. Let's scale together. {cta}",
        "Creating high-impact strategies for {industry}. Specialized {role} in {topic}. {cta}",
        "Transforming legacy {industry} operations. Lead {role} focused on {topic} innovation. {cta}"
      ]
    },
    instagram: {
      creative: [
        "✨ Creating magic through {topic}\n👩‍💻 {role} based in the {industry} world\n👇 {cta}",
        "🎨 {role} | Designing ideas\n💫 Powered by {topic} & coffee\n🔗 {cta}",
        "🌱 Just a {role} sharing my journey in {industry}.\n🧠 Obsessed with {topic}\n👇 {cta}"
      ],
      funny: [
        "Press copy: {role} 🤷‍♂️\nLiving life one {topic} post at a time\n{cta}",
        "Adulting is hard. Being a {role} is harder.\nFocusing on {topic} to stay sane.\n👇 {cta}",
        "I have 99 problems and {topic} is like 90 of them.\n💼 {role}\n👇 {cta}"
      ],
      minimalist: [
        "• {role}\n• {topic}\n• {industry}\n👇 {cta}",
        "Build. Create. {topic}.\n💼 {role}",
        "{role} exploring {topic}.\n🔗 {cta}"
      ],
      professional: [
        "💼 {role}\n📈 {industry} specialist\n💡 Sharing insights on {topic}\n👇 {cta}",
        "Official account of {role}\nFocusing on {topic} and {industry} solutions\n📩 DM for inquiries | {cta}",
        "Helping clients navigate {industry}.\n✨ {role} & Speaker | {topic}\n👇 {cta}"
      ],
      bold: [
        "🔥 Breaking boundaries in {industry}\n⚡ {role}\n💪 Hard work + {topic}\n👇 {cta}",
        "Making moves. Building {topic} assets.\n💼 {role}\n🔗 {cta}",
        "We don't settle. {role} driving {industry} forward.\n🧠 Focus: {topic}\n👇 {cta}"
      ]
    },
    tiktok: {
      creative: [
        "Creating daily vids about {topic} 🎬\n💼 {role}\n👇 {cta}",
        "Just a {role} showing behind-the-scenes of {industry} ✨\n🔗 {cta}",
        "Watch me build {topic} projects 🧠\n💼 {role}"
      ],
      funny: [
        "My boss thinks I'm working. I'm actually making {topic} TikToks.\n💼 {role}",
        "A {role} who decided to start posting on here. Expect {topic}.\n👇 {cta}",
        "Yes, I'm a {role}.\nNo, I can't hack your ex's account.\nJust {topic} content."
      ],
      minimalist: [
        "{role} | {topic}\n👇 {cta}",
        "Creating in the {industry} space.\n🧠 {topic}",
        "{role} stuff.\n🔗 {cta}"
      ],
      professional: [
        "💼 Professional {role}\n🧠 Educational {industry} content\n💡 Tips on {topic}\n👇 {cta}",
        "How to scale in {industry} as a {role}.\n📈 {topic} advice\n👇 {cta}",
        "Behind the scenes of a {role}.\n📩 Business inquiries: Bio link\n🔗 {cta}"
      ],
      bold: [
        "⚡ Stop scrolling, learn {topic}!\n💼 {role} sharing secrets\n👇 {cta}",
        "Building a empire in {industry}.\n🧠 {role} teaching {topic}\n🔗 {cta}",
        "Zero excuses. Only results.\n💼 {role} | {topic}\n👇 {cta}"
      ]
    }
  };

  const emojiList = {
    creative: ['✨', '🎨', '🚀', '🔮', '💡', '🌈'],
    funny: ['🤪', '☕', '🍕', '🙃', '🤷‍♂️', '🎮'],
    professional: ['💼', '📈', '🤝', '💡', '📊', '🌐'],
    minimalist: ['▪️', '▫️', '•', '▪️', '▫️', '•'],
    bold: ['🔥', '⚡', '💪', '👑', '💥', '🚀']
  };

  const ctaList = {
    twitter: "Read my latest thread 👇",
    linkedin: "Let's connect or DM me 📩",
    instagram: "Check my links below 🔗",
    tiktok: "Tap link for more details 🔗"
  };

  const generateBios = () => {
    // Standard inputs
    const keyArray = keywords ? keywords.split(',').map(k => k.trim()) : ['coding', 'coffee', 'creativity'];
    const role = keyArray[0] || 'Builder';
    const topic = keyArray[1] || 'design';
    const industry = keyArray[2] || 'tech';

    const selectedPlatformTemplates = templates[platform] || templates['twitter'];
    const selectedTemplates = selectedPlatformTemplates[tone] || selectedPlatformTemplates['creative'];

    const newBios = selectedTemplates.map((template) => {
      let bio = template
        .replace('{role}', role)
        .replace('{topic}', topic)
        .replace('{industry}', industry);

      // Add call to action
      if (includeCta) {
        bio = bio.replace('{cta}', ctaList[platform]);
      } else {
        bio = bio.replace('{cta}', '').replace('👇', '').replace('📩', '').replace('🔗', '');
      }

      // Add random emojis if includeEmojis is toggled and platform isn't minimalist
      if (includeEmojis && tone !== 'minimalist') {
        const emojis = emojiList[tone] || emojiList['creative'];
        const e1 = emojis[Math.floor(Math.random() * emojis.length)];
        const e2 = emojis[Math.floor(Math.random() * emojis.length)];
        bio = `${e1} ${bio} ${e2}`;
      }

      // Clean up multiple spaces or leading/trailing whitespace
      return bio.replace(/\s+/g, ' ').trim();
    });

    setGeneratedBios(newBios);
    setCopiedIndex(null);
    showToast('Bios generated successfully!', 'success');
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast('Bio copied to clipboard!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Settings Panel */}
      <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Options */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <FaUserAlt className="text-violet-500" /> Platform & Tone
          </h3>

          {/* Platform Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
              Social Platform
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'twitter', label: 'Twitter / X' },
                { id: 'linkedin', label: 'LinkedIn' },
                { id: 'instagram', label: 'Instagram' },
                { id: 'tiktok', label: 'TikTok' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    platform === p.id
                      ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
              Profile Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none"
            >
              <option value="creative">Creative & Quirky</option>
              <option value="professional">Professional & Neat</option>
              <option value="funny">Humorous & Witty</option>
              <option value="minimalist">Minimalist & Clean</option>
              <option value="bold">Bold & Confident</option>
            </select>
          </div>
        </div>

        {/* Right Options */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <FaSmile className="text-violet-500" /> Keywords & Customization
          </h3>

          {/* Keywords input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
              Keywords (Comma separated: Role, Hobby, Industry)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. Developer, gaming, open-source"
              className="w-full pl-4 pr-4 py-2.5 rounded-xl text-xs font-medium glass-input bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-850 dark:text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
            />
          </div>

          {/* Toggle buttons */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeEmojis}
                onChange={() => setIncludeEmojis(!includeEmojis)}
                className="w-4 h-4 rounded text-violet-600 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-violet-500"
              />
              <span className="text-xs font-bold text-slate-650 dark:text-slate-400">
                Include Platform Emojis
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeCta}
                onChange={() => setIncludeCta(!includeCta)}
                className="w-4 h-4 rounded text-violet-600 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-violet-500"
              />
              <span className="text-xs font-bold text-slate-650 dark:text-slate-400">
                Include Call-To-Action (CTA) Link Text
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <button
        onClick={generateBios}
        className="w-full py-3 px-6 rounded-2xl bg-violet-600 hover:bg-violet-750 text-white font-bold shadow-lg shadow-violet-500/25 transition-all text-xs md:text-sm flex items-center justify-center gap-2"
      >
        <FaSync /> Generate Bio Options
      </button>

      {/* Generated Results */}
      {generatedBios.length > 0 && (
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Generated Profile Bios
          </label>

          <div className="grid grid-cols-1 gap-4">
            {generatedBios.map((bio, idx) => (
              <div
                key={idx}
                className="glass-effect p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between space-y-4"
              >
                <p className="text-xs md:text-sm font-medium text-slate-850 dark:text-slate-250 whitespace-pre-line leading-relaxed font-sans select-all">
                  {bio}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/30 dark:border-slate-800/30">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Length: {bio.length} characters
                  </span>
                  <button
                    onClick={() => handleCopy(bio, idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <FaCheck /> Copied
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Bio
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BioGenerator;
