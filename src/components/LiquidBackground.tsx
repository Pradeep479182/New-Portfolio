import { motion } from 'framer-motion'

export function LiquidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#02040b] via-[#0a1628] to-[#0f0a1a]" />

      {/* Wave 1 - Cyan flowing from top */}
      <motion.div
        className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-500/30 via-cyan-500/15 to-transparent"
        style={{
          borderRadius: '0 0 50% 50%',
        }}
        animate={{
          y: [0, -40, 0],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Wave 2 - Blue flowing from bottom */}
      <motion.div
        className="absolute bottom-0 right-0 w-full h-80 bg-gradient-to-t from-blue-500/25 via-blue-500/10 to-transparent"
        style={{
          borderRadius: '50% 50% 0 0',
        }}
        animate={{
          y: [0, 50, 0],
          scaleX: [1, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Wave 3 - Purple from left */}
      <motion.div
        className="absolute left-0 top-1/3 w-full h-72 bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent"
        animate={{
          x: [-100, 50, -100],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Wave 4 - Indigo from right */}
      <motion.div
        className="absolute right-0 bottom-1/4 w-full h-64 bg-gradient-to-l from-indigo-500/15 via-indigo-500/5 to-transparent"
        animate={{
          x: [100, -50, 100],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Central glowing orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
        style={{
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Right side orb */}
      <motion.div
        className="absolute right-0 top-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Floating particles with glow */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-300"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${Math.random() * 15 + 8}px rgba(34, 211, 238, 0.8)`,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
    </div>
  )
}
