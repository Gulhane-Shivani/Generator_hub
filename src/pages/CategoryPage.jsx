import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronRight, FaArrowLeft, FaCheckCircle, FaStar, FaInfoCircle, FaListOl } from 'react-icons/fa';
import { categories, tools } from '../data/toolsData';
import ToolIcon from '../components/ToolIcon';

const pageVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } }
};

const CategoryPage = () => {
  const { categoryId } = useParams();

  const currentCategory = categories.find((cat) => cat.id === categoryId);
  const categoryTools = tools.filter((t) => t.category === categoryId);

  // Fallback redirect if invalid category
  if (!currentCategory) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="space-y-12 py-4"
    >
      {/* Breadcrumbs Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500"
      >
        <Link to="/" className="hover:text-violet-500 transition-colors">Home</Link>
        <FaChevronRight className="text-[10px]" />
        <span className="text-slate-800 dark:text-slate-200">{currentCategory.name}</span>
      </motion.div>

      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`p-8 md:p-12 rounded-3xl bg-gradient-to-r ${currentCategory.gradient} text-white shadow-xl relative overflow-hidden select-none`}
      >
        {/* Background shapes */}
        <div className="absolute right-[-20px] top-[-20px] w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute left-[-20px] bottom-[-20px] w-48 h-48 rounded-full bg-black/5 blur-2xl"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm transition-all"
          >
            <FaArrowLeft className="text-[10px]" /> Back to Dashboard
          </Link>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
              {currentCategory.name}
            </h2>
            <p className="text-sm md:text-lg text-white/90 leading-relaxed font-medium max-w-2xl">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tools Grid List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest"
          >
            Available Tools ({categoryTools.length})
          </motion.h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categoryTools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-effect rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Tool Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentCategory.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <ToolIcon name={tool.icon} className="text-xl" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="pt-6">
                <Link
                  to={`/tool/${tool.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline group-hover:gap-2 transition-all"
                >
                  Launch Tool <FaChevronRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 1. Who is this for? (Use Cases) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
          <FaStar className="text-sm" />
          <h3 className="text-lg font-bold font-display uppercase tracking-wider">Who is this for?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentCategory.useCases.map((useCase, idx) => (
            <div key={idx} className="glass-effect rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm space-y-3 hover:border-violet-500/30 transition-colors">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {useCase.for}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {useCase.context}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 2. Detailed About & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/50 space-y-6"
        >
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
            <FaInfoCircle className="text-lg" />
            <h3 className="text-lg font-bold font-display">Deep Dive: {currentCategory.name}</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {currentCategory.longDescription}
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentCategory.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  <FaCheckCircle className="text-emerald-500 shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 3. Quick Start Guide */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/50 space-y-6"
        >
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
            <FaListOl className="text-lg" />
            <h3 className="text-lg font-bold font-display">Quick Start Guide</h3>
          </div>
          <div className="space-y-5">
            {currentCategory.usageSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="shrink-0 w-8 h-8 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold border border-violet-500/20 group-hover:bg-violet-600 group-hover:text-white transition-all">
                  {idx + 1}
                </div>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed self-center">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* 4. Features Checklist */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-8 border-t border-slate-200/30 dark:border-slate-800/30"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {currentCategory.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FaCheckCircle className="text-violet-500 text-xs" />
              <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{feature}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default CategoryPage;
