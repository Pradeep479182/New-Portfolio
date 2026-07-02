import { motion } from 'framer-motion'
import React from 'react'

interface PremiumButtonProps {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export function PremiumButton({
  children,
  href,
  variant = 'primary',
  className = '',
}: PremiumButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <motion.a
      href={href}
      className={`relative group inline-block ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`relative overflow-hidden px-8 py-3.5 md:px-10 md:py-4 rounded-full font-semibold text-sm md:text-base tracking-wide transition-all duration-300 ${
          isPrimary
            ? 'text-white bg-gradient-to-r from-cyan-500/90 to-blue-600/90 border border-cyan-400/50'
            : 'text-slate-100 bg-slate-900/40 border border-slate-700/60 backdrop-blur-xl hover:border-slate-500/80'
        }`}
        animate={{
          boxShadow: isPrimary
            ? [
                '0 0 20px rgba(34, 211, 238, 0.3)',
                '0 0 40px rgba(59, 130, 246, 0.4)',
                '0 0 20px rgba(34, 211, 238, 0.3)',
              ]
            : ['0 0 0px rgba(255, 255, 255, 0)', '0 0 15px rgba(148, 163, 184, 0.2)', '0 0 0px rgba(255, 255, 255, 0)'],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        whileHover={{
          boxShadow: isPrimary
            ? '0 0 50px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)'
            : '0 0 30px rgba(148, 163, 184, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 rounded-full blur-lg"
          transition={{ duration: 0.3 }}
        />

        {/* Border glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full border ${
            isPrimary ? 'border-cyan-300' : 'border-slate-400'
          } opacity-0 group-hover:opacity-100`}
          transition={{ duration: 0.3 }}
          animate={{
            boxShadow: [
              `inset 0 0 0px ${isPrimary ? 'rgba(34, 211, 238, 0)' : 'rgba(148, 163, 184, 0)'}`,
              `inset 0 0 20px ${isPrimary ? 'rgba(34, 211, 238, 0.2)' : 'rgba(148, 163, 184, 0.1)'}`,
              `inset 0 0 0px ${isPrimary ? 'rgba(34, 211, 238, 0)' : 'rgba(148, 163, 184, 0)'}`,
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />

        {/* Content */}
        <motion.span
          className="relative z-10 flex items-center justify-center gap-2 text-white font-medium"
          whileHover={{ letterSpacing: '0.1em' }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.span>

        {/* Particle effects on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-300 rounded-full"
              style={{
                left: `${30 + i * 20}%`,
                top: '50%',
              }}
              animate={{
                y: [-10, -40],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
              initial={{ opacity: 0 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Glow behind button */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-2xl ${isPrimary ? 'bg-cyan-500/30' : 'bg-slate-400/10'} -z-10`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.a>
  )
}
