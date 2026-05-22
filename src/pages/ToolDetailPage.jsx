import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronRight, FaArrowLeft, FaShieldAlt, FaStar, FaBolt, FaListUl, FaQuestionCircle, FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
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
import PasswordStrengthChecker from '../tools/PasswordStrengthChecker';
import TextEncryptDecrypt from '../tools/TextEncryptDecrypt';
import JsonFormatter from '../tools/JsonFormatter';
import Base64EncoderDecoder from '../tools/Base64EncoderDecoder';
import ApiKeyGenerator from '../tools/ApiKeyGenerator';
import BioGenerator from '../tools/BioGenerator';
import ColorPaletteGenerator from '../tools/ColorPaletteGenerator';

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
    'password-strength-checker': <PasswordStrengthChecker />,
    'text-encrypt-decrypt': <TextEncryptDecrypt />,
    'name-generator': <NameGenerator />,
    'story-title-generator': <StoryTitleGenerator />,
    'idea-generator': <IdeaGenerator />,
    'qr-code-generator': <QrCodeGenerator />,
    'barcode-generator': <BarcodeGenerator />,
    'random-number-generator': <RandomNumberGenerator />,
    'username-generator': <UsernameGenerator />,
    'hashtag-generator': <HashtagGenerator />,
    'social-media-name-generator': <SocialMediaNameGenerator />,
    'json-formatter': <JsonFormatter />,
    'base64-encoder-decoder': <Base64EncoderDecoder />,
    'api-key-generator': <ApiKeyGenerator />,
    'bio-generator': <BioGenerator />,
    'color-palette-generator': <ColorPaletteGenerator />
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
    },
    {
      q: `Is my data secure when using the ${currentTool.name}?`,
      a: `Yes, absolutely. The ${currentTool.name} operates 100% locally inside your web browser. None of your input configurations, key parameters, or generated results are ever sent to, stored in, or processed by external databases or servers.`
    },
    {
      q: `Do I need to install any software to use the ${currentTool.name}?`,
      a: `No installation, registration, or browser extension is required. The generator is a fully sandboxed, web-based utility that runs instantly on any desktop, tablet, or smartphone device.`
    }
  ];

  const specificInfoMap = {
    'password-generator': [
      { title: 'Cryptographic Security', text: 'Generated passwords use secure pseudo-random number generator APIs. Including uppercase, lowercase, numbers, and symbols yields over 95 bits of entropy, making them virtually uncrackable.' },
      { title: 'Recommended Standards', text: 'For general user accounts, we recommend a minimum length of 12-16 characters containing mixed classes. For administration access, use at least 24 characters.' },
      { title: 'Zero-Trust Architecture', text: 'Built on zero-trust principles, all generation happens strictly in your browser. Passwords never traverse the internet or get cached in server logs.' }
    ],
    'otp-generator': [
      { title: 'Digit Formats', text: 'Standardized 4-digit and 6-digit options cater to general verification mockups and high-security authentication workflows.' },
      { title: 'Entropy & Uniqueness', text: 'Random numerical distribution ensures that every code is distinct, reducing collision rates for simulators and mock tests.' },
      { title: 'Testing Use Cases', text: 'Perfect for sandboxed manual QA testing, backend verification mockups, database seed data, and training simulation environments.' }
    ],
    'encryption-key-generator': [
      { title: 'Entropy Bit Lengths', text: 'Supports standard key sizes of 128-bit (AES-128), 256-bit (industry-standard military grade AES-256), and 512-bit (ultra-high entropy) key configurations.' },
      { title: 'Output Encoding', text: 'Instantly encodes generated key files into Hexadecimal format (for code integrations) or Base64 (ideal for config files and SSH key chains).' },
      { title: 'Random Seed Density', text: 'Uses high-entropy browser security modules to generate non-predictable cryptographic seeds safe for production database variables.' }
    ],
    'password-strength-checker': [
      { title: 'Entropy Bits', text: 'Entropy evaluates the mathematical complexity of a password based on character pool size and length. A higher entropy value (e.g. > 60 bits) is extremely difficult to compromise.' },
      { title: 'Pattern Recognition', text: 'Scans text patterns to flag repeating values, keyboard sequences (e.g. qwer), or incremental series (e.g. 123), which attackers check first.' },
      { title: 'Estimated Crack Time', text: 'Calculates brute-force times based on high-end computer setups testing 100 billion checks per second, giving you a real-world perspective on safety.' }
    ],
    'text-encrypt-decrypt': [
      { title: 'AES-256 GCM Standard', text: 'Uses Advanced Encryption Standard (AES) with a 256-bit key in Galois/Counter Mode, a highly secure, authenticated cipher suitable for sensitive details.' },
      { title: 'PBKDF2 Key Derivation', text: 'Uses PBKDF2 with SHA-256 and 100,000 iterations to securely convert your plain password into a strong cryptographic key, defending against precomputed attacks.' },
      { title: 'Base64 Packing', text: 'Packs the randomized salt, IV, and cipher bytes into a single base64 string, allowing you to easily share and decrypt it on any browser running Generator Hub.' }
    ],
    'name-generator': [
      { title: 'Naming Formulas', text: 'Uses smart algorithms combining prefix databases, suffix terms, and industry keywords to build memorable, brandable titles.' },
      { title: 'Brand Identity', text: 'Creates names aligned with modern digital companies, ensuring a short, catchy, and professional online presence.' },
      { title: 'Creative Versatility', text: 'Switches algorithms easily to generate fantasy names, gaming handles, or personal business concepts.' }
    ],
    'story-title-generator': [
      { title: 'Genre Formats', text: 'Offers specialized titles matching classic genre rules (e.g. dramatic fantasy hooks, suspenseful mystery plots, or informative tech headlines).' },
      { title: 'SEO-Optimized Titles', text: 'Blog and technology titles focus on CTR (click-through-rate), viral reach, search intent, and trending layout structures.' },
      { title: 'Overcoming Writer Block', text: 'Acts as an interactive prompt deck to inspire content creators, novelists, and blog authors with fresh story directions.' }
    ],
    'idea-generator': [
      { title: 'Startup Concepts', text: 'Synthesizes modern market niches, consumer demographics, and software models to pitch innovative business ideas.' },
      { title: 'Marketing Angles', text: 'Formulates launch methods, referral mechanics, and content ideas designed to expand target user acquisition channels.' },
      { title: 'Content Themes', text: 'Recommends video themes, blog series, or course content structures customized to build digital authority.' }
    ],
    'qr-code-generator': [
      { title: 'Multi-Data Support', text: 'Generates standard scan matrix cards from web URLs, plaintext, emails, SMS formats, and WiFi login configurations.' },
      { title: 'Brand Alignment', text: 'Lets you set foreground and background colors to customize the QR style to match corporate presentation guidelines.' },
      { title: 'Vector Quality (SVG)', text: 'Outputs crisp, responsive vector graphics (SVG/Canvas) preventing scan errors when scaled up or printed.' }
    ],
    'barcode-generator': [
      { title: 'Symbology Standard', text: 'Implements the high-density CODE128 barcode format, the global standard for logistics, shipping labels, and asset tracking.' },
      { title: 'Alphanumeric Codes', text: 'Encodes letters, numbers, and common symbols, allowing flexible indexing structures matching stock systems.' },
      { title: 'Canvas Exporters', text: 'Uses hardware-accelerated canvas renders for crisp pixel lines, ensuring clean scans on commercial hand scanners.' }
    ],
    'random-number-generator': [
      { title: 'Uniform Distribution', text: 'Uses uniform distribution algorithms (PRNG) to ensure every digit has an identical selection probability.' },
      { title: 'Duplicate Filtering', text: 'Features a unique list selector filtering out duplicates, ideal for picking lotteries, raffles, and survey samples.' },
      { title: 'Dice & Coins', text: 'Includes simulations for standard dice and coin tosses, serving as virtual tools for board game players.' }
    ],
    'username-generator': [
      { title: 'Platform Sanitization', text: 'Strips prohibited characters automatically based on selected networks (e.g. letters and numbers only for Twitter/Twitch).' },
      { title: 'Styling Modifications', text: 'Applies options like leet-speak swaps (e.g. swapping E to 3) and gamer decor tags (e.g. xX_ _Xx) to fit gaming profiles.' },
      { title: 'Tag Blends', text: 'Integrates category terms and keywords to construct unique handles that feel personalized and professional.' }
    ],
    'hashtag-generator': [
      { title: 'Keyword Association', text: 'Maps search keywords directly to high-performing hashtag datasets to boost video and post visibility.' },
      { title: 'Tier Distribution', text: 'Categorizes tags by volume (Popular, Niche, and Trending) to build balanced metadata structures that feed algorithms.' },
      { title: 'Clipboard Copying', text: 'Compiles all generated tags into a single space-separated string for fast pasting into caption inputs.' }
    ],
    'social-media-name-generator': [
      { title: 'Niche Specialization', text: 'Styles suggestions around high-growth channels (Tech, Gaming, Vlogs, Food) to establish immediate target authority.' },
      { title: 'Character Constraints', text: 'Ensures name recommendations adhere to strict username character limits enforced by YouTube, Instagram, and Twitch.' },
      { title: 'Compare Matrix', text: 'Renders results in clean, organized tables with copy features to easily bookmark your top selections.' }
    ],
    'bio-generator': [
      { title: 'Multi-platform support', text: 'Tailors templates specifically to constraints of Twitter, LinkedIn, Instagram, and TikTok.' },
      { title: 'Tone variations', text: 'Supports 5 tones including professional, creative, funny, minimalist, and bold templates.' },
      { title: 'Interactive keywords', text: 'Incorporates custom roles and skills into generated suggestions dynamically.' }
    ],
    'color-palette-generator': [
      { title: 'Color harmonies', text: 'Calculates monochromatic, analogous, complementary, triadic, and compound patterns.' },
      { title: 'Live preview mockups', text: 'Includes a preview widget showing how active colors map to a real UI design.' },
      { title: 'Multiple export formats', text: 'Outputs code snippets directly as CSS, SCSS, Tailwind config, or raw JSON arrays.' }
    ],
    'json-formatter': [
      { title: 'JSON Validation', text: 'Uses standard browser JSON parses. Any validation error shows descriptive parser reports, pointing exactly to where parsing failed.' },
      { title: 'Offline Formatting', text: 'All operations execute locally in-memory. None of your API payloads, credentials, or data structures ever leave the device.' },
      { title: 'Minification Benefits', text: 'Minified output strips out carriage returns, line feeds, and spacing indentations, optimizing string sizes to save network bandwidth.' }
    ],
    'base64-encoder-decoder': [
      { title: 'Safe UTF-8 Encoding', text: 'Uses pre-processing mapping algorithms to encode multi-byte Unicode/UTF-8 strings without encountering common DOMException crashes.' },
      { title: 'URL-Safe Standards', text: 'Substitutes standard Base64 characters "+" with "-" and "/" with "_", and trims trailing "=" padding for clean HTTP query parameters.' },
      { title: 'Memory Isolation', text: 'Computations run on sandboxed client processes. Decoded payload streams are kept transient in memory and never logged.' }
    ],
    'api-key-generator': [
      { title: 'Cryptographic Entropy', text: 'Generates secure keys derived from window.crypto.getRandomValues. This supplies high-grade security entropy resilient to brute-force attacks.' },
      { title: 'Prefix Customization', text: 'Integrates custom application prefixes (e.g. sk_live_, app_) into credentials to aid scanning tools and source control alerts.' },
      { title: 'UUID v4 Compliance', text: 'Provides RFC4122-compliant UUIDs, formatting 122 bits of random data into a standard 36-character hexadecimal group template.' }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-6 py-4"
    >
      {/* Breadcrumb path */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500"
      >
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
      </motion.div>

      {/* Action Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
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
      </motion.div>

      {/* Main Layout Grid */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.45 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
      >
        {/* Interactive Tool Widget (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {widget}
        </div>

        {/* Feature Sidebar (Takes 1 column) */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4"
        >
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
        </motion.div>
      </motion.div>

      {/* Specific Information Section */}
      {specificInfoMap[toolId] && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass-effect p-6 md:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-6 mt-8"
        >
          <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 font-display flex items-center gap-2 border-b border-slate-200/30 dark:border-slate-800/30 pb-4">
            <FaInfoCircle className="text-violet-500 text-sm md:text-base" /> Specific Information & Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specificInfoMap[toolId].map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                className="space-y-2 p-5 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/30 dark:border-slate-800/30 transition-all duration-200 hover:border-violet-500/30 dark:hover:border-violet-500/30"
              >
                <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {info.title}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {info.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="glass-effect p-6 md:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-6 mt-8"
      >
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
      </motion.div>
    </motion.div>
  );
};

export default ToolDetailPage;
