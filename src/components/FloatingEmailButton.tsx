import { useState } from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';

export default function FloatingEmailButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Main button with glassmorphism */}
        <div className="relative h-16 w-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden group-hover:bg-white/20 transition-all duration-300">
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating particles */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1 left-1/2 w-1 h-1 bg-cyan-400 rounded-full blur-sm" />
            <div className="absolute bottom-2 right-2 w-0.5 h-0.5 bg-blue-400 rounded-full blur-sm" />
          </motion.div>

          {/* Mail icon */}
          <motion.div
            className="relative z-10 text-white"
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Mail size={24} />
          </motion.div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 rounded-full"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute bottom-20 right-0 bg-slate-900/95 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap pointer-events-none"
        >
          Send me a message
        </motion.div>
      </motion.button>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
