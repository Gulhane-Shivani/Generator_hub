import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaCheck, FaSync, FaCompass, FaLightbulb, FaBullhorn, FaVideo } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const startupBases = [
  { text: 'An AI-powered scheduler that coordinates meetings based on the team\'s actual energy peaks.', icon: <FaLightbulb /> },
  { text: 'A browser extension that automatically summarizes privacy policies into a 3-bullet rating system.', icon: <FaLightbulb /> },
  { text: 'An Uber-for-x style platform matching certified urban gardeners with flat owners wanting balconies landscaped.', icon: <FaLightbulb /> },
  { text: 'A micro-SaaS tool that tracks SaaS subscriptions and suggests shared accounts for small agencies.', icon: <FaLightbulb /> },
  { text: 'A gamified recycling app where citizens earn local store vouchers by scanning plastic drop-offs.', icon: <FaLightbulb /> },
  { text: 'A platform helping remote companies host VR team-building challenges that feel like escape rooms.', icon: <FaLightbulb /> },
  { text: 'A personalized subscription box for pet mental-stimulation puzzles and organic treats.', icon: <FaLightbulb /> }
];

const marketingBases = [
  { text: 'Host a "bug bounty" where customers find flaws in your landing copy, and the funniest submissions win credit.', icon: <FaBullhorn /> },
  { text: 'Create a interactive calculator comparing the "cost of procrastination" versus using your product.', icon: <FaBullhorn /> },
  { text: 'Launch a 5-day email mini-course teaching a single highly valuable micro-skill in your industry.', icon: <FaBullhorn /> },
  { text: 'Release a custom retro pixel mini-game hosted on your sub-domain that reveals discount codes upon completion.', icon: <FaBullhorn /> },
  { text: 'Partner with micro-influencers to do a "takeover" day, sharing their raw, unedited work routines.', icon: <FaBullhorn /> },
  { text: 'Write a public transparent breakdown post detailing exactly how your product failed once, and how it was resolved.', icon: <FaBullhorn /> }
];

const contentBases = [
  { text: 'YouTube: "I tried rebuilding a popular SaaS app in 12 hours under a coffee shop budget. Here\'s what happened."', icon: <FaVideo /> },
  { text: 'Blog: "10 Anti-Patterns in Modern Dev Teams that are Killing Engineering Culture."', icon: <FaVideo /> },
  { text: 'TikTok/Reels: "The exact configuration file that boosted my build speed by 40% (Tutorial)."', icon: <FaVideo /> },
  { text: 'LinkedIn: "Why we decided to stop using standard resumes and hired our next designer based on a 1-hour live test."', icon: <FaVideo /> },
  { text: 'Newsletter: "A weekly breakdown of 3 micro-tools that make $5k+ MRR with zero employees."', icon: <FaVideo /> }
];

const IdeaGenerator = () => {
  const { showToast } = () => useApp();
  const app = useApp();
  const toastTrigger = app ? app.showToast : () => { };

  const [category, setCategory] = useState('startup');
  const [currentIdea, setCurrentIdea] = useState({ text: '', icon: null });
  const [copied, setCopied] = useState(false);

  const drawIdea = () => {
    let list = startupBases;
    if (category === 'marketing') list = marketingBases;
    if (category === 'content') list = contentBases;

    // Pick random, avoid picking the same one consecutively if list has elements
    let chosen = currentIdea;
    if (list.length > 1) {
      do {
        chosen = list[Math.floor(Math.random() * list.length)];
      } while (chosen.text === currentIdea.text);
    } else {
      chosen = list[0];
    }

    setCurrentIdea(chosen);
    setCopied(false);
  };

  useEffect(() => {
    drawIdea();
  }, [category]);

  const handleCopy = () => {
    if (!currentIdea.text) return;
    navigator.clipboard.writeText(currentIdea.text);
    setCopied(true);
    toastTrigger('Idea copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="glass-effect p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-wrap gap-2 justify-center">
        {[
          { id: 'startup', label: 'Startup Ideas', icon: <FaLightbulb className="text-amber-500" /> },
          { id: 'marketing', label: 'Marketing Strategies', icon: <FaBullhorn className="text-blue-500" /> },
          { id: 'content', label: 'Content Themes', icon: <FaVideo className="text-pink-500" /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCategory(item.id)}
            className={`py-2 px-4 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${category === item.id
                ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Flashcard display */}
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdea.text}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg min-h-[250px] glass-effect p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl flex flex-col justify-between items-center text-center relative overflow-hidden"
          >
            {/* Background absolute graphic */}
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-violet-500/5 dark:bg-violet-500/10 pointer-events-none flex items-center justify-center">
              <FaCompass className="text-5xl text-violet-500/10 dark:text-violet-500/20" />
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 dark:bg-violet-500/20 text-violet-500 flex items-center justify-center text-xl mb-4">
              {currentIdea.icon}
            </div>

            {/* Description Text */}
            <p className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 flex-1 flex items-center justify-center max-w-sm px-2">
              "{currentIdea.text}"
            </p>

            {/* Action Bar */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleCopy}
                className="py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-600 transition-all font-semibold flex items-center gap-2 text-xs"
              >
                {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
                {copied ? 'Copied' : 'Copy Idea'}
              </button>

              <button
                onClick={drawIdea}
                className="py-2 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-2 text-xs shadow shadow-violet-500/25 transition-all"
              >
                <FaSync />
                Draw Card
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IdeaGenerator;
