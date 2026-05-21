import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShieldAlt, FaLightbulb, FaSlidersH, FaShareAlt, FaCode,
  FaSearch, FaFire, FaBolt, FaLock, FaMobile, FaHandSparkles, FaArrowRight,
  FaQuestionCircle, FaUserCheck, FaChevronDown, FaCheckCircle, FaLaptopCode,
  FaUserEdit, FaGamepad, FaBriefcase
} from 'react-icons/fa';
import { categories, tools } from '../data/toolsData';
import ToolIcon from '../components/ToolIcon';

const LandingPage = () => {
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const trendingTools = tools.filter(tool => tool.trending);

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(localSearch.toLowerCase()) ||
    tool.description.toLowerCase().includes(localSearch.toLowerCase())
  );

  const categoryIcons = {
    security: <FaShieldAlt className="text-2xl" />,
    creative: <FaLightbulb className="text-2xl" />,
    utility: <FaSlidersH className="text-2xl" />,
    social: <FaShareAlt className="text-2xl" />,
    developer: <FaCode className="text-2xl" />
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="space-y-16 py-4 relative">
      
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-6 relative select-none">
        
        {/* Floating gradient orb backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2"
        >
          <FaBolt className="text-[10px] animate-bounce" /> Completely Client-Side & Secure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-[1.1]"
        >
          The Ultimate Hub of <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Smart Generator Tools
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium"
        >
          Generate cryptographically secure passwords, barcode labels, hashtags, brand names, and more. 100% private, free, and instantly rendered in your browser.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-4 flex justify-center gap-4"
        >
          <Link
            to="/tools"
            className="py-3 px-8 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-500/30 transition-all flex items-center gap-2 text-sm cursor-pointer"
          >
            Explore Tools <FaArrowRight className="text-xs" />
          </Link>
        </motion.div>
      </section>

      {/* 2. SEARCH TOOL SECTION */}
      <section className="max-w-xl mx-auto space-y-4 -mt-6 md:-mt-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-slate-400 text-sm" />
          </div>
          <input
            type="text"
            placeholder="Search generators instantly (e.g. Password, QR)..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm glass-input font-medium shadow-md placeholder-slate-400"
          />
        </div>

        {/* Real-time search filter display */}
        {localSearch && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-4 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 space-y-2 max-h-80 overflow-y-auto"
          >
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                      <ToolIcon name={tool.icon} className="text-xs" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                        {tool.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200/20">
                    {tool.category}
                  </span>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                No tools match "{localSearch}"
              </div>
            )}
          </motion.div>
        )}
      </section>
      
      {/* 5. FEATURES / WHY US */}
      <section className="glass-effect rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow grid grid-cols-1 md:grid-cols-4 gap-6 text-center select-none">
        <div className="space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
            <FaLock className="text-base" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">100% Private & Secure</h4>
          <p className="text-xs text-slate-400 max-w-[200px]">All generation runs client-side. No tracking APIs.</p>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
            <FaBolt className="text-base" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Ultra Fast Speed</h4>
          <p className="text-xs text-slate-400 max-w-[200px]">Instant rendering with zero server roundtrips.</p>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
            <FaMobile className="text-base" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Fully Responsive UI</h4>
          <p className="text-xs text-slate-400 max-w-[200px]">Beautiful layouts tested on mobile and desktops.</p>
        </div>

        <div className="space-y-2 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-2">
            <FaHandSparkles className="text-base" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Zero Configuration</h4>
          <p className="text-xs text-slate-400 max-w-[200px]">Intuitive controls, sliders, and copy toggles.</p>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section id="categories" className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display">
            Browse by Category
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            Choose from one of our curated tool groups below.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className={`glass-effect rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow flex flex-col justify-between group transition-shadow ${cat.hoverGradient}`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {categoryIcons[cat.id]}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-display">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to={`/${cat.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  View Tools <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. TRENDING TOOLS SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight font-display flex items-center gap-2">
            <FaFire className="text-orange-500 text-lg animate-pulse" /> Popular Generators
          </h2>
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Most Visited
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTools.map((tool) => {
            const catInfo = categories.find(c => c.id === tool.category);
            return (
              <Link
                key={tool.id}
                to={`/tool/${tool.id}`}
                className="glass-effect p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:border-violet-500/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                      <ToolIcon name={tool.icon} className="text-base" />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded text-white bg-gradient-to-r ${catInfo?.gradient || 'from-violet-500 to-indigo-500'}`}>
                      {tool.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      

      {/* 6. WHO CAN USE THIS TOOL SECTION */}
      <section className="space-y-8 select-none">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            Who Can Use Generator Hub?
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-medium max-w-xl mx-auto">
            Tailored generation tools custom-built to accelerate workflows for all creators, builders, and professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaLaptopCode className="text-xl" />,
              title: "Developers & Architects",
              desc: "Instantly prettify/validate JSON, run Base64 transformations, and safely compile cryptographically strong Hex/Base64 keys.",
              gradient: "from-blue-500/10 to-indigo-500/10 hover:border-indigo-500/40 text-indigo-500"
            },
            {
              icon: <FaUserEdit className="text-xl" />,
              title: "Creators & Influencers",
              desc: "Accelerate your social growth with high-performing hashtags, creative profile bios, channel names, and viral titles.",
              gradient: "from-pink-500/10 to-rose-500/10 hover:border-rose-500/40 text-rose-500"
            },
            {
              icon: <FaGamepad className="text-xl" />,
              title: "Gamers & Enthusiasts",
              desc: "Roll cool styled gamer handles, leet speak conversions, custom tags, or check the security score of your online accounts.",
              gradient: "from-emerald-500/10 to-teal-500/10 hover:border-teal-500/40 text-teal-500"
            },
            {
              icon: <FaBriefcase className="text-xl" />,
              title: "Professionals & Teams",
              desc: "Seamlessly generate standard barcodes, customizable download-ready QR codes, and random seed inputs for presentations.",
              gradient: "from-amber-500/10 to-orange-500/10 hover:border-orange-500/40 text-orange-500"
            }
          ].map((persona, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className={`glass-effect p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between transition-all bg-gradient-to-tr ${persona.gradient} shadow-sm hover:shadow-md`}
            >
              <div className="space-y-4">
                <div className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/30 flex items-center justify-center shadow-sm ${persona.text}`}>
                  {persona.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-display">
                    {persona.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 dark:text-slate-400 leading-relaxed font-semibold">
                    {persona.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. TRUST & FEATURES DETAIL SHOWCASE (ATTRACT PEOPLE) */}
      <section className="glass-effect rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow relative overflow-hidden select-none">
        <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-sm font-bold uppercase tracking-wider">
              <FaShieldAlt className="text-xs" /> Engineered for absolute privacy
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-[1.15]">
              Generations you can <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">trust implicitly</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              We believe online security shouldn't require sending data to distant clouds. All computation, key-derivation, encoding, and random generations run instantly in your browser sandbox. 
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                "Web Crypto API (window.crypto) high-entropy standard",
                "Completely offline capability with zero server log caching",
                "Fully open, free, zero tracking trackers, zero ads"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-350">
                  <FaCheckCircle className="text-emerald-500 text-sm flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Graphical Mock UI showing live trust factors */}
          <div className="p-6 rounded-2xl border border-slate-200/30 dark:border-slate-800/30 bg-slate-50 dark:bg-slate-950/60 space-y-4 shadow-inner text-left font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/30 dark:border-slate-800/30">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-500 bg-slate-200/30 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200/20">
                sandbox_agent.log
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed select-all">
              <p className="text-emerald-500 font-bold">✔ [SYSTEM] Web Cryptography Engine successfully initiated</p>
              <p>ℹ [API] entropy_pool: cryptographically secure window.crypto</p>
              <p>ℹ [TRANSIT] remote_endpoint: NULL (No data packages sent over network)</p>
              <p className="text-violet-500 font-bold">ℹ [PRIVACY] sandbox state: 100% safe client isolation</p>
              <div className="pt-2 w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-pink-500" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="space-y-8 select-none max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-violet-500" /> Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-medium">
            Got questions? We've got answers. Explore how our tools provide absolute privacy and speed.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "Is my generated data sent to any remote servers?",
              answer: "Absolutely not! Every single generator tool (passwords, OTPs, QR codes, name generators, JSON formatters) runs entirely client-side inside your browser sandbox. No input or output data is ever transmitted, ensuring 100% absolute privacy."
            },
            {
              question: "How are the generated values secured?",
              answer: "We utilize the modern Web Cryptography API (window.crypto) where cryptographic-level outputs are required. This ensures maximum high-entropy values that are completely random and virtually impossible for supercomputers to predict."
            },
            {
              question: "Can I use the outputs commercially?",
              answer: "Yes, completely! All generated names, passwords, code snippets, barcodes, and dynamic color palettes are 100% royalty-free and yours to use for personal or commercial projects without any limitations."
            },
            {
              question: "Why is the rendering and execution so instant?",
              answer: "Since all generations are processed inside your local browser virtual machine, there are zero server round-trip network lags. You get light-speed generations instantly."
            },
            {
              question: "Do I need to sign up or create an account to use the tools?",
              answer: "No! All our generators and developer toolkits are fully accessible without registration, email verification, or subscription hurdles. Enjoy a friction-free experience."
            },
            {
              question: "Do the tools support offline mode?",
              answer: "Yes! Since all files and logic are compiled client-side, once the web application loads, you can safely disconnect from the internet and continue using all generation, validation, and encoding functionalities offline."
            },
            {
              question: "Is there any limit to the number of items I can generate?",
              answer: "No. You can perform as many generations, copies, format runs, and downloads as your device resources allow. There are absolutely no request throttling or quota limits."
            },
            {
              question: "How can I suggest features or report bugs?",
              answer: "We love feedback! You can reach out directly via our Contact page or look up our official GitHub repository link in the sidebar/footer to submit issues and suggest new features."
            }
          ].map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="glass-effect rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden transition-all duration-300 hover:border-violet-500/30"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/10 transition-colors"
                >
                  <span className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 font-display pr-4">
                    {faq.question}
                  </span>
                  <FaChevronDown 
                    className={`text-slate-400 text-xs transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-violet-500' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold border-t border-slate-200/20 dark:border-slate-800/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
