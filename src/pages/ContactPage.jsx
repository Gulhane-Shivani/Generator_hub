import React, { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaEnvelope, FaClock } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

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
    // Mock API request delay
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
    <div className="py-8 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Have feedback, feature requests, or encountered a bug? Send us a message and we'll reply shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Info Column (2/5 size) */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b border-slate-200/30 dark:border-slate-800/30 pb-3">
              Support Channels
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">support@genhubtoolkit.com</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Reply Time</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Usually responds within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            <strong>Important Privacy Notice:</strong> When submitting this form, only standard input fields are sent. None of your local browser storage, tools activity, or generated outputs are collected or attached to this message.
          </div>
        </div>

        {/* Form Column (3/5 size) */}
        <div className="md:col-span-3">
          {submitted ? (
            <div className="glass-effect p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center text-center space-y-4 h-full justify-center">
              <FaCheckCircle className="text-4xl text-emerald-500 animate-bounce" />
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Message Received!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  Thank you for reaching out. A support coordinator will check your submission soon.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer text-slate-700 dark:text-slate-300"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-effect p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Subject / Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs glass-input font-medium bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none cursor-pointer"
                >
                  <option value="Feedback">General Feedback</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Bug Report">Bug Report / Issue</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you need..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs glass-input font-medium resize-none bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-750 transition-all font-semibold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 text-xs text-white cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
