import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'

interface ParticleConfig {
  id: number
  left: number
  top: number
  size: number
  duration: number
  delay: number
  drift: number
}

export function AnimatedBackground() {
  const scanRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId = 0
    let offset = 0

    const animate = () => {
      offset = (offset + 0.32) % 100
      if (scanRef.current) {
        scanRef.current.style.setProperty('--scan-position', `${offset}%`)
        scanRef.current.style.setProperty('--scan-alpha', `${0.12 + 0.06 * Math.sin((offset / 100) * Math.PI * 2)}`)
      }
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: 14 }, (_, index) => ({
      id: index,
      left: 6 + (index * 9) % 84,
      top: 12 + (index * 7) % 72,
      size: 6 + (index % 5) * 2,
      duration: 10 + (index % 5) * 1.4,
      delay: (index * 0.6) % 4,
      drift: (index % 5) * 8 - 16,
    }))
  }, [])

  const floatingShapes = useMemo(
    () => [
      {
        id: 'triangle',
        className: 'animated-background__shape animated-background__shape--triangle',
        style: { top: '18%', left: '72%', width: 92, height: 92, opacity: 0.22 },
        animate: { rotate: [0, 360] as const, y: [0, -18, 0] as const },
        transition: { duration: 18, repeat: Infinity, ease: 'linear' },
      },
      {
        id: 'circle',
        className: 'animated-background__shape animated-background__shape--circle',
        style: { top: '35%', left: '15%', width: 76, height: 76, opacity: 0.18 },
        animate: { scale: [1, 1.18, 1] as const, opacity: [0.16, 0.48, 0.16] as const },
        transition: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
      },
      {
        id: 'square',
        className: 'animated-background__shape animated-background__shape--square',
        style: { bottom: '18%', right: '18%', width: 108, height: 108, opacity: 0.2 },
        animate: { rotate: [0, -360] as const, x: [0, 12, 0] as const },
        transition: { duration: 22, repeat: Infinity, ease: 'linear' },
      },
    ],
    [],
  )

  return (
    <div className="animated-background" aria-hidden="true">
      <div className="absolute inset-0 bg-[#0b0b0b]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(0,255,153,0.14),transparent_24%),radial-gradient(circle_at_80%_78%,rgba(0,255,153,0.06),transparent_18%)] mix-blend-screen pointer-events-none" />
      <div className="animated-background__grid" />
      <div ref={scanRef} className="animated-background__scanlines" />
      <div className="animated-background__pulse" />
      <div className="animated-background__halo" />
      <div className="animated-background__hud-panel">
        <div className="animated-background__hud-grid" />
        <div className="absolute left-5 top-5 right-5 grid gap-1 text-[0.69rem] uppercase tracking-[0.36em] text-[#8cffb7] opacity-80">
          <span>SECURE GRID</span>
          <span className="text-[0.65rem] opacity-60">AI MONITOR | 60 FPS | 00:00:12</span>
        </div>
      </div>
      <div className="animated-background__corner animated-background__corner--left" />
      <div className="animated-background__corner animated-background__corner--right" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-[#00ff99]/40 shadow-[0_0_18px_rgba(0,255,153,0.28)] mix-blend-screen"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -148, -310],
            x: [0, particle.drift, particle.drift / 2],
            opacity: [0.06, 0.42, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={shape.className}
          style={shape.style}
          animate={shape.animate}
          transition={shape.transition}
        />
      ))}

      <motion.div
        className="absolute left-10 top-[42%] h-0.5 w-24 bg-[#00ff99]/20"
        animate={{ x: [0, 16, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute right-10 top-[28%] h-24 w-0.5 bg-[#00ff99]/18"
        animate={{ y: [0, 16, 0], opacity: [0.16, 0.6, 0.16] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff99]/40 to-transparent"
        animate={{ opacity: [0.24, 0.86, 0.24] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,11,11,0.8)_65%)] pointer-events-none" />
    </div>
  )
}
