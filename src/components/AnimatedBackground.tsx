import { motion } from 'framer-motion'
import { useMemo } from 'react'

export function AnimatedBackground() {
  // Generate grid points dynamically
  const gridPoints = useMemo(() => {
    const points = []
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        points.push({ id: `${x}-${y}`, x, y })
      }
    }
    return points
  }, [])

  // Generate floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 0.5,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0f1838] to-[#1a0f35]" />

      {/* Subtle animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-96 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-96 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px]"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-3/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.15)" />
            </linearGradient>
          </defs>

          {/* Horizontal lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={`${(i / 12) * 100}%`}
              x2="100%"
              y2={`${(i / 12) * 100}%`}
              stroke="url(#gridGradient)"
              strokeWidth="1"
              opacity={0.3}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                strokeWidth: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}

          {/* Vertical lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${(i / 12) * 100}%`}
              y1="0"
              x2={`${(i / 12) * 100}%`}
              y2="100%"
              stroke="url(#gridGradient)"
              strokeWidth="1"
              opacity={0.3}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                strokeWidth: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.1 + 2,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full mix-blend-screen pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `radial-gradient(circle, rgba(34, 211, 238, 0.8), rgba(59, 130, 246, 0.4))`,
            boxShadow: `0 0 ${particle.size * 4}px rgba(34, 211, 238, 0.6)`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(particle.id) * 50, Math.cos(particle.id) * 50],
            opacity: [0.1, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Decorative futuristic shapes */}
      <motion.div
        className="absolute top-20 right-1/4 w-32 h-32 border border-cyan-400/30 rounded-lg"
        animate={{
          rotate: 360,
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-purple-400/25 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-10 w-20 h-20 border border-blue-400/30"
        style={{
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
        }}
        animate={{
          rotate: -360,
          y: [0, 20, 0],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Holographic lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-1 h-64 bg-gradient-to-b from-cyan-500/50 to-transparent"
        animate={{
          opacity: [0.2, 0.8, 0.2],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-0 w-1 h-56 bg-gradient-to-t from-purple-500/50 to-transparent"
        animate={{
          opacity: [0.2, 0.7, 0.2],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid corner highlights */}
      {gridPoints.map((point) => (
        <motion.div
          key={point.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${(point.x / 7) * 100}%`,
            top: `${(point.y / 7) * 100}%`,
            background:
              Math.random() > 0.7
                ? 'radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)',
            boxShadow:
              Math.random() > 0.7
                ? '0 0 10px rgba(34, 211, 238, 0.5)'
                : '0 0 8px rgba(168, 85, 247, 0.4)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            delay: Math.random() * 0.5,
          }}
        />
      ))}

      {/* Overlay to fade edges */}
      <div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 0%, rgba(10, 14, 39, 0.4) 100%)" />
    </div>
  )
}
