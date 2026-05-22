import React, { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaEnvelope, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
};

const ContactPage = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill out all fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Your message has been sent successfully!', 'success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="py-10 max-w-5xl mx-auto space-y-10 select-none"
    >
      {/* Background glow */}
      <div className="fixed top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* Title */}
      <motion.div variants={itemVariants} className="text-center space-y-2 relative z-10">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 items-center justify-center text-white shadow-xl shadow-violet-500/20 mb-2">
          <FaEnvelope className="text-2xl" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
          Have feedback, feature requests, or encountered a bug? Send us a message and we'll reply shortly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start relative z-10">
        {/* Info Column */}
        <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
          <div className="glass-effect p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-6">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b border-slate-200/30 dark:border-slate-800/30 pb-4">
              Support Channels
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0 text-base">
                  <FaEnvelope />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</h4>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">support@genhubtoolkit.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0 text-base">
                  <FaClock />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Reply Time</h4>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">Usually responds within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            <strong className="text-slate-700 dark:text-slate-350">Important Privacy Notice:</strong> When submitting this form, only standard input fields are sent. None of your local browser storage, tools activity, or generated outputs are collected or attached to this message.
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-effect p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center space-y-6 h-full justify-center min-h-[400px]"
            >
              <FaCheckCircle className="text-5xl text-emerald-500 animate-bounce" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Message Received!</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A support coordinator will check your submission soon.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-bold transition-all cursor-pointer text-slate-700 dark:text-slate-300 shadow-sm"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-xs md:text-sm glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-xs md:text-sm glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Subject / Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-xs md:text-sm glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer transition-all"
                >
                  <option value="Feedback">General Feedback</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Bug Report">Bug Report / Issue</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Your Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you need..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-xs md:text-sm glass-input font-medium resize-none bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition-all font-bold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 text-xs md:text-sm text-white cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? <span>Sending Message...</span> : <><FaPaperPlane /> Send Message</>}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
