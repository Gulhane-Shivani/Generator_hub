import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import { categories, tools } from '../data/toolsData';
import ToolIcon from '../components/ToolIcon';

const CategoryPage = () => {
  const { categoryId } = useParams();

  const currentCategory = categories.find((cat) => cat.id === categoryId);
  const categoryTools = tools.filter((t) => t.category === categoryId);

  // Fallback redirect if invalid category
  if (!currentCategory) {
    return <Navigate to="/" replace />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
        <Link to="/" className="hover:text-violet-500 transition-colors">Home</Link>
        <FaChevronRight className="text-[10px]" />
        <span className="text-slate-800 dark:text-slate-200">{currentCategory.name}</span>
      </div>

      {/* Header Banner */}
      <div className={`p-8 rounded-3xl bg-gradient-to-r ${currentCategory.gradient} text-white shadow-xl relative overflow-hidden select-none`}>
        {/* Background shapes */}
        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 rounded-full bg-white/10 blur-xl"></div>
        
        <div className="relative z-10 space-y-3 max-w-2xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm transition-all"
          >
            <FaArrowLeft className="text-[10px]" /> Back to Dashboard
          </Link>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-display">
            {currentCategory.name}
          </h2>
          <p className="text-xs md:text-sm text-white/80 leading-relaxed font-medium">
            {currentCategory.description}
          </p>
        </div>
      </div>

      {/* Tools Grid List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Available Tools ({categoryTools.length})
        </h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {categoryTools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass-effect rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Tool Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${currentCategory.gradient} text-white flex items-center justify-center shadow`}>
                  <ToolIcon name={tool.icon} className="text-base" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="pt-6">
                <Link
                  to={`/tool/${tool.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Launch Tool <FaChevronRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
