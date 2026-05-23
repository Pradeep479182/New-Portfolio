import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

export function CVButton() {
  return (
    <motion.a
      href="/Pradeepcv.pdf"
      download
      whileHover={{
        scale: 1.08,
        rotate: 2,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="fixed left-6 bottom-6 z-50 md:left-8 md:bottom-8"
    >
      {/* Rotating Glow Ring */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-md opacity-80"
      />

      {/* Button */}
      <div className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-slate-950 border border-cyan-400/40 backdrop-blur-md overflow-hidden">
        
        {/* Animated background */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        />

        {/* Icon */}
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <Download className="w-5 h-5 text-cyan-300" />
        </motion.div>

        {/* Text */}
        <span className="relative text-sm md:text-base font-semibold tracking-wide text-white">
          Download CV
        </span>
      </div>
    </motion.a>
  )
}