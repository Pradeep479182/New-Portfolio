import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function Avatar() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Add more interactive bounce on hover
    const handleMouseEnter = () => {
      containerRef.current?.classList.add('hover-active')
    }
    const handleMouseLeave = () => {
      containerRef.current?.classList.remove('hover-active')
    }

    containerRef.current.addEventListener('mouseenter', handleMouseEnter)
    containerRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter)
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.8,
      }}
      className="avatar-container fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
    >
      <motion.div
        animate={{
          y: [0, -12, -8, -14, -6, -10, 0],
          rotate: [0, 2, -2, 3, -3, 1, 0],
          scale: [1, 1.08, 1.05, 1.1, 1.04, 1.07, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
        className="avatar-inner"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(34, 211, 238, 0.4)',
              '0 0 40px rgba(34, 211, 238, 0.6)',
              '0 0 20px rgba(192, 132, 252, 0.4)',
              '0 0 30px rgba(34, 211, 238, 0.5)',
              '0 0 20px rgba(34, 211, 238, 0.4)',
            ],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-cyan-400/30 overflow-hidden backdrop-blur-sm bg-gradient-to-br from-cyan-900/20 to-purple-900/20 p-1"
        >
          {/* Profile Image - Placeholder */}
          <div className="w-full h-full rounded-full overflow-hidden border border-cyan-400/40 bg-gradient-to-br from-cyan-400/10 to-purple-400/10" />

          {/* Animated border */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-400 pointer-events-none"
          />
        </motion.div>

        {/* Floating particles */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="absolute -inset-8 rounded-full border border-dashed border-cyan-400/20 pointer-events-none"
        />

        {/* Status indicator */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 shadow-lg shadow-emerald-400/50"
        />
      </motion.div>

      {/* Hover tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-slate-950/90 border border-cyan-400/30 rounded-lg whitespace-nowrap text-xs font-medium text-cyan-300 backdrop-blur-md pointer-events-none"
      >
        Software Engineering Student | Frontend Developer
      </motion.div>
    </motion.div>
  )
}
