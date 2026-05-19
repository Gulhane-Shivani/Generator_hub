import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaChevronRight, FaArrowLeft, FaShieldAlt, FaStar, FaBolt, FaListUl } from 'react-icons/fa';
import { categories, tools } from '../data/toolsData';

// Import Generator Widgets
import PasswordGenerator from '../tools/PasswordGenerator';
import OtpGenerator from '../tools/OtpGenerator';
import EncryptionKeyGenerator from '../tools/EncryptionKeyGenerator';
import NameGenerator from '../tools/NameGenerator';
import StoryTitleGenerator from '../tools/StoryTitleGenerator';
import IdeaGenerator from '../tools/IdeaGenerator';
import QrCodeGenerator from '../tools/QrCodeGenerator';
import BarcodeGenerator from '../tools/BarcodeGenerator';
import RandomNumberGenerator from '../tools/RandomNumberGenerator';
import UsernameGenerator from '../tools/UsernameGenerator';
import HashtagGenerator from '../tools/HashtagGenerator';
import SocialMediaNameGenerator from '../tools/SocialMediaNameGenerator';

const ToolDetailPage = () => {
  const { toolId } = useParams();

  const currentTool = tools.find((t) => t.id === toolId);
  if (!currentTool) {
    return <Navigate to="/" replace />;
  }

  const currentCategory = categories.find((cat) => cat.id === currentTool.category);

  // Component Map for generators
  const componentMap = {
    'password-generator': <PasswordGenerator />,
    'otp-generator': <OtpGenerator />,
    'encryption-key-generator': <EncryptionKeyGenerator />,
    'name-generator': <NameGenerator />,
    'story-title-generator': <StoryTitleGenerator />,
    'idea-generator': <IdeaGenerator />,
    'qr-code-generator': <QrCodeGenerator />,
    'barcode-generator': <BarcodeGenerator />,
    'random-number-generator': <RandomNumberGenerator />,
    'username-generator': <UsernameGenerator />,
    'hashtag-generator': <HashtagGenerator />,
    'social-media-name-generator': <SocialMediaNameGenerator />
  };

  const widget = componentMap[toolId] || <div className="text-slate-400">Tool widget coming soon.</div>;

  return (
    <div className="space-y-6 py-4">
      {/* Breadcrumb path */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
        <Link to="/" className="hover:text-violet-500 transition-colors">Home</Link>
        <FaChevronRight className="text-[10px]" />
        {currentCategory && (
          <>
            <Link to={`/${currentCategory.id}`} className="hover:text-violet-500 transition-colors">
              {currentCategory.name}
            </Link>
            <FaChevronRight className="text-[10px]" />
          </>
        )}
        <span className="text-slate-800 dark:text-slate-200">{currentTool.name}</span>
      </div>

      {/* Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              {currentTool.name}
            </h2>
            {currentTool.trending && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] font-extrabold uppercase">
                <FaStar className="text-[8px]" /> Popular
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 font-medium">
            {currentTool.description}
          </p>
        </div>

        <Link
          to={currentCategory ? `/${currentCategory.id}` : '/'}
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 px-4 py-2 rounded-xl transition-all self-start md:self-auto text-slate-600 dark:text-slate-400"
        >
          <FaArrowLeft className="text-[10px]" /> Back to {currentCategory ? currentCategory.name : 'Home'}
        </Link>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Interactive Tool Widget (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {widget}
        </div>

        {/* Feature Sidebar (Takes 1 column) */}
        <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200/30 dark:border-slate-800/30 pb-3">
            <FaListUl className="text-violet-500 text-xs" />
            Key Features
          </h3>

          <ul className="space-y-3">
            {currentTool.features.map((feature, index) => (
              <li key={index} className="flex gap-2.5 items-start text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-slate-200/30 dark:border-slate-800/30 text-[10px] text-slate-400 font-semibold flex items-center gap-1.5">
            <FaBolt className="text-violet-500 text-xs animate-pulse" />
            Runs client-side in sandboxed frame.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailPage;
