import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');
  }, []);

  // Email validation regex
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form validation
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      // Send email using EmailJS
      const templateParams = {
        to_email: 'pradeeprakavi@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
        });

        // Auto close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        'Failed to send message. Please try again or email directly to pradeeprakavi@gmail.com'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl" />

            {/* Modal content */}
            <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400" />

              {/* Success State */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, repeat: 2 }}
                  >
                    <CheckCircle size={64} className="text-emerald-400 mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-300 text-center">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              )}

              {/* Error State */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-12"
                >
                  <AlertCircle size={64} className="text-red-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Oops!</h3>
                  <p className="text-slate-300 text-center mb-4">{errorMessage}</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {/* Form State */}
              {submitStatus === 'idle' && (
                <>
                  {/* Header */}
                  <div className="p-8 pb-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                          <Mail size={24} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                          <p className="text-sm text-slate-400">Send me a message</p>
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <X size={20} className="text-slate-400 hover:text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <User size={16} className="text-cyan-400" />
                          Full Name
                        </div>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg outline-none transition-all ${
                          errors.fullName
                            ? 'border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                            : 'border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20'
                        } text-white placeholder-slate-500`}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-400">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail size={16} className="text-cyan-400" />
                          Email Address
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg outline-none transition-all ${
                          errors.email
                            ? 'border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                            : 'border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20'
                        } text-white placeholder-slate-500`}
                      />
                      {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare size={16} className="text-cyan-400" />
                          Subject
                        </div>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg outline-none transition-all ${
                          errors.subject
                            ? 'border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                            : 'border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20'
                        } text-white placeholder-slate-500`}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-400">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare size={16} className="text-cyan-400" />
                          Message
                        </div>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, opportunity, or feedback..."
                        rows={5}
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-lg outline-none transition-all resize-none ${
                          errors.message
                            ? 'border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                            : 'border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20'
                        } text-white placeholder-slate-500`}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-400">{errors.message}</p>
                      )}
                      <p className="text-xs text-slate-500">
                        {formData.message.length} / 1000 characters
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all font-medium"
                      >
                        Cancel
                      </button>
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Send size={18} />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
