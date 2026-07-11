import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface PortraitDisplayProps {
  portraitSrc: string
  isLoaded: boolean
}

export function PortraitDisplay({ portraitSrc, isLoaded }: PortraitDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), {
    stiffness: 100,
    damping: 30,
  })

  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), {
    stiffness: 100,
    damping: 30,
  })

  const x = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), {
    stiffness: 120,
    damping: 35,
  })

  const y = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), {
    stiffness: 120,
    damping: 35,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const normalizedX = (event.clientX - centerX) / (rect.width / 2)
      const normalizedY = (event.clientY - centerY) / (rect.height / 2)

      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={containerRef}
      className="relative h-full w-full"
      initial={{ opacity: 0 }}
      animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        perspective: 1200,
      }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{
          boxShadow: [
            '0 0 60px rgba(34, 211, 238, 0.2), inset 0 0 60px rgba(99, 102, 241, 0.1)',
            '0 0 100px rgba(168, 85, 247, 0.25), inset 0 0 60px rgba(99, 102, 241, 0.15)',
            '0 0 60px rgba(34, 211, 238, 0.2), inset 0 0 60px rgba(99, 102, 241, 0.1)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Neon rim light glow */}
      <motion.div
        className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main portrait container with parallax */}
      <motion.div
        className="relative h-full w-full origin-center rounded-3xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          x,
          y,
        }}
      >
        {/* Glassmorphism overlay frame */}
        <div className="absolute inset-0 z-10 rounded-3xl border border-white/10 backdrop-blur-[0.5px] pointer-events-none" />

        {/* Portrait entrance animation */}
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-3xl"
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 100,
            filter: 'blur(10px)',
          }}
          animate={
            isLoaded
              ? {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }
              : {}
          }
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Image with gradient overlay */}
          <img
            ref={imageRef}
            src={portraitSrc}
            alt="Pradeepan Rakavi Portrait"
            className="h-full w-full object-cover object-center"
            loading="eager"
            style={{
              filter: 'saturate(1.05) brightness(1.02)',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />

          {/* Subtle rim lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-transparent to-blue-500/0" />

          {/* Enhanced rim light from edges */}
          <div className="absolute inset-0">
            {/* Left rim */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cyan-400/10 to-transparent" />
            {/* Top rim */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-400/8 to-transparent" />
            {/* Right subtle glow */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-purple-500/5 to-transparent" />
          </div>

          {/* Soft floating animation overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/5"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Floating particles around portrait */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${15 + (i % 3) * 25}%`,
              boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              x: [0, Math.sin(i) * 10, 0],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>

      {/* Gentle floating animation for entire container */}
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Holographic frame decorations */}
      <motion.div
        className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-3xl"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-purple-400/50 rounded-br-3xl"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />
    </motion.div>
  )
}
