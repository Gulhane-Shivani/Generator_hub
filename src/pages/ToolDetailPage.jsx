import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaChevronRight, FaArrowLeft, FaShieldAlt, FaStar, FaBolt, FaListUl, FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
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
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: `What is the ${currentTool.name}?`,
      a: `The ${currentTool.name} is a premium digital utility designed to ${currentTool.description.toLowerCase().replace(/\.$/, '')}. It runs 100% client-side in your browser, ensuring your inputs and data remain private and secure.`
    },
    {
      q: `How do I use the ${currentTool.name}?`,
      a: `Using the ${currentTool.name} is quick and simple:
      1. Configure your settings and preferences using the input fields on the screen.
      2. Click the generate button to process your inputs.
      3. Use the one-click copy option or download feature to save your outputs instantly.`
    },
    {
      q: `How does the ${currentTool.name} help me?`,
      a: `It eliminates manual effort and saves time by generating instant, optimized, and customizable results. Whether you need secure passwords, creative name concepts, or formatted codes, the ${currentTool.name} provides clean outputs that improve efficiency and productivity.`
    }
  ];

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

      {/* FAQ Section */}
      <div className="glass-effect p-6 md:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-6 mt-8">
        <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 font-display flex items-center gap-2 border-b border-slate-200/30 dark:border-slate-800/30 pb-4">
          <FaQuestionCircle className="text-violet-500 text-sm md:text-base" /> Frequently Asked Questions
        </h3>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-slate-200/30 dark:border-slate-800/30 pb-4 last:border-0 last:pb-0"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left py-2 text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <FaChevronUp className="text-violet-500 text-xs flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-slate-400 dark:text-slate-600 text-xs flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-line">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolDetailPage;
