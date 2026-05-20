import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaBolt, FaCompass, FaHeart, FaGithub } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 items-center justify-center text-white shadow-xl shadow-violet-500/20 mb-2">
          <FaCompass className="text-3xl animate-spin-slow" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-900 via-slate-800 to-slate-750 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          About Generator Hub
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          A high-performance collection of instant generator utilities built specifically for developers, content creators, and privacy-conscious users.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center text-lg">
            <FaShieldAlt />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            100% Client-Side Privacy
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Unlike online converters that send your inputs to a cloud server, Generator Hub performs all cryptographic encoding, generation, and rendering directly inside your browser sandbox. None of your data ever leaves your device.
          </p>
        </div>

        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center text-lg">
            <FaBolt />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Instantaneous Performance
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            By running locally, operations happen in milliseconds. There are no API network delays, loading bars, or server downtime. Simply configure your preferences and get results instantly.
          </p>
        </div>
      </div>

      {/* Deep-dive details */}
      <div className="glass-effect p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-6">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 font-display">
          Our Philosophy
        </h2>
        <div className="space-y-4 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          <p>
            Generator Hub was created out of a need for clean, ad-free, and tracker-free digital utilities. Most utility sites on the web are cluttered with heavy pop-ups, slow page rendering, and invasive trackers that collect user statistics.
          </p>
          <p>
            We believe that basic utilities—like generating passwords, formatting QR codes, or brainstorming business ideas—should be beautiful, minimal, and secure. We focus on lightweight assets, sleek animations, and responsive structures to deliver a premium user interface.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-200/30 dark:border-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <FaHeart className="text-rose-500 animate-pulse" /> Created locally with absolute care.
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-750 transition-all text-xs shadow-lg shadow-violet-500/20"
          >
            Explore All Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
