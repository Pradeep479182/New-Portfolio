import React, { useEffect, useMemo, useRef, useState } from 'react'
import './github-growth.css'
import { motion } from 'framer-motion'

const heatmapSample = () => {
  const weeks = 26
  const days = 7
  const data: number[][] = []
  for (let w = 0; w < weeks; w++) {
    const col: number[] = []
    for (let d = 0; d < days; d++) col.push(0)
    data.push(col)
  }

  const spikes = [
    { w: 10, d: 2, v: 2 },
    { w: 11, d: 3, v: 3 },
    { w: 13, d: 1, v: 1 },
    { w: 16, d: 4, v: 3 },
    { w: 17, d: 5, v: 5 },
    { w: 18, d: 2, v: 2 },
    { w: 22, d: 3, v: 3 },
    { w: 24, d: 6, v: 2 },
  ]

  spikes.forEach((s) => {
    if (data[s.w]) data[s.w][s.d] = s.v
  })

  return data
}

const lineData = [0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 3, 0, 0, 0, 4, 3, 1, 0, 5, 0, 0, 0, 3, 0, 0, 0, 0, 2, 1]

function CountUp({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const from = 0
    const to = value

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const cur = Math.round(from + (to - from) * eased)
      setDisplay(cur)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        // keep cursor blinking briefly then hide
        let blink = 0
        const bl = setInterval(() => {
          setCursorVisible((v) => !v)
          blink += 1
          if (blink > 5) {
            clearInterval(bl)
            setCursorVisible(false)
          }
        }, 300)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  return (
    <span className="inline-flex items-end text-3xl font-bold tracking-tight">
      {display}
      <span className={`ml-1 text-2xl text-cyan-300 transition-opacity ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  )
}

export function GithubGrowth() {
  const heat = useMemo(() => heatmapSample(), [])
  const delays = useMemo(() => {
    // precompute random delays and blink durations for each square
    return heat.flatMap((col) => col.map(() => ({ d: Math.random() * 3, s: 1 + Math.random() * 2 })))
  }, [heat])

  const heatmapShellRef = useRef<HTMLDivElement | null>(null)
  const heatmapContainerRef = useRef<HTMLDivElement | null>(null)

  const handleHeatmapMove = (e: React.MouseEvent) => {
    const el = heatmapShellRef.current || heatmapContainerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotX = -y * 10
    const rotY = x * 14
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
  }

  const handleHeatmapLeave = () => {
    const el = heatmapShellRef.current || heatmapContainerRef.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }

  const maxVal = Math.max(...lineData)
  const w = 760
  const h = 160
  const pad = 12

  const points = lineData.map((v, i) => {
    const x = pad + (i / (lineData.length - 1)) * (w - pad * 2)
    const y = h - pad - (v / (maxVal || 1)) * (h - pad * 2)
    return [x, y]
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')

  const buildSmoothPath = (pts: number[][]) => {
    if (pts.length < 2) return pathD
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
    for (let i = 1; i < pts.length - 1; i += 1) {
      const [x0, y0] = pts[i]
      const [x1, y1] = pts[i + 1]
      const mx = ((x0 + x1) / 2).toFixed(1)
      const my = ((y0 + y1) / 2).toFixed(1)
      d += ` Q ${x0.toFixed(1)} ${y0.toFixed(1)} ${mx} ${my}`
    }
    const last = pts[pts.length - 1]
    d += ` T ${last[0].toFixed(1)} ${last[1].toFixed(1)}`
    return d
  }

  const smoothPathD = buildSmoothPath(points)

  return (
    <section id="github-growth" className="section-band px-5 py-20 md:px-8 relative overflow-visible">
      <div className="particles pointer-events-none" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{ ['--r' as any]: Math.random(), ['--l' as any]: Math.random() }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="section-title">GitHub Growth & Activity</h2>
            <p className="text-slate-400 mt-1">Simulated from the provided contribution snapshot.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="neon-card relative rounded-2xl border border-white/6 bg-gradient-to-br from-[#07121a]/70 to-[#071028]/60 p-6 backdrop-blur-md"
          >
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="glass-stat p-4">
                <div className="text-xs uppercase text-slate-300">Total Contributions</div>
                <CountUp value={125} />
              </div>
              <div className="glass-stat p-4">
                <div className="text-xs uppercase text-slate-300">Current Streak</div>
                <CountUp value={1} />
              </div>
              <div className="glass-stat p-4">
                <div className="text-xs uppercase text-slate-300">Longest Streak</div>
                <CountUp value={4} />
              </div>
            </div>

            <div
              ref={heatmapContainerRef}
              onMouseMove={(e) => handleHeatmapMove(e)}
              onMouseLeave={() => handleHeatmapLeave()}
              className="mt-3 rounded-lg border border-white/6 bg-[#08121a]/60 p-4 overflow-hidden"
            >
              <div className="mb-3 text-sm text-slate-300">Contribution Graph (simulated)</div>
              <div className="heatmap-shell p-4 rounded-md" ref={heatmapShellRef}>
                <div className="heatmap-grid">
                  {heat.map((col, ci) => (
                    <div key={ci} className="heatmap-week" aria-hidden>
                      {col.map((v, ri) => {
                        const idx = ci * 7 + ri
                        const meta = delays[idx]
                        return (
                          <div
                            key={ri}
                            className={`hg-square ${v > 0 ? 'active' : 'inactive'}`}
                            title={`${v} contributions`}
                            style={{
                              animationDelay: `${meta.d}s`,
                              ['--blink-seconds' as any]: `${meta.s}s`,
                            }}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.08 }}
            className="neon-card rounded-2xl border border-white/6 bg-gradient-to-br from-[#07121a]/70 to-[#071028]/60 p-6 backdrop-blur-md"
          >
            <div className="mb-4 text-sm text-slate-300">Contributions — last 31 days</div>
            <div className="chart-shell rounded-lg border border-white/6 bg-[#08131b]/60 p-4 relative overflow-hidden">
              <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#56d8fe" />
                  </linearGradient>
                </defs>

                <path
                  id="chartPath"
                  d={`${smoothPathD}`}
                  fill="none"
                  stroke="url(#lineGlow)"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="glow-path"
                />

                {/* area fill */}
                <path d={`${smoothPathD} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z`} fill="url(#g)" opacity={0.6} />

                {/* points */}
                {points.map((p, i) => (
                  <circle key={i} cx={p[0]} cy={p[1]} r={3.2} className="data-point" />
                ))}

                {/* moving highlight using SMIL animateMotion */}
                <circle r={6} fill="#c084fc" className="highlight">
                  <animateMotion dur="6s" repeatCount="indefinite">
                    <mpath xlinkHref="#chartPath" />
                  </animateMotion>
                </circle>
              </svg>

              <div className="shimmer" />
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-400">
              <span>6</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
              <span>30</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GithubGrowth
