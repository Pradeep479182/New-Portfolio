import { motion } from 'framer-motion'

export function PremiumLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#0a0e27]"
      exit={{
        opacity: 0,
        backdropFilter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <div className="relative grid place-items-center w-full h-full">
        {/* Background gradient ambience */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px]" />
        </motion.div>

        {/* Main loader container */}
        <motion.div
          className="relative grid place-items-center z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute h-56 w-56 rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0"
            style={{
              backgroundClip: 'padding-box',
              borderImage: 'linear-gradient(45deg, #00d4ff, #0ea5e9, #a855f7) 1',
            }}
            animate={{
              rotate: 360,
              boxShadow: [
                '0 0 60px rgba(0, 212, 255, 0.4)',
                '0 0 80px rgba(168, 85, 247, 0.3)',
                '0 0 60px rgba(0, 212, 255, 0.4)',
              ],
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
              boxShadow: { duration: 2, repeat: Infinity },
            }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.3)] inset" />
          </motion.div>

          {/* Middle pulsing ring */}
          <motion.div
            className="absolute h-40 w-40 rounded-full border-2 border-blue-400/50"
            animate={{
              boxShadow: [
                '0 0 30px rgba(59, 130, 246, 0.5)',
                '0 0 50px rgba(59, 130, 246, 0.8)',
                '0 0 30px rgba(59, 130, 246, 0.5)',
              ],
              scale: [1, 1.05, 1],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
              scale: { duration: 2, repeat: Infinity },
            }}
          />

          {/* Inner glow core */}
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 opacity-40 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Text ring with animation */}
          <motion.div
            className="absolute inset-0 grid place-items-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute h-44 w-44" style={{ perspective: '1000px' }}>
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                    fill="none"
                  />
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Main text */}
          <motion.div
            className="relative z-20 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="block text-5xl md:text-6xl font-black tracking-[0.1em] bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              RAKAVI
            </span>
            <motion.p
              className="mt-3 text-sm md:text-base font-semibold text-cyan-200/70 tracking-widest uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing Experience
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-20 w-48 h-1 bg-slate-700/30 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 1.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </motion.div>

          {/* Decorative orbiting elements */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              animate={{
                x: Math.cos((index * Math.PI * 2) / 3) * 120,
                y: Math.sin((index * Math.PI * 2) / 3) * 120,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)',
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
