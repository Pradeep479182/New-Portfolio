/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Background } from './components/Background'
import { HeroScene } from './components/HeroScene'
import { Projects } from './components/Projects'
import { SkillsScene } from './components/SkillsScene'
import profilePhoto from './assets/photo1.jpeg'

const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const experiences = [
  {
    period: '2026',
    title: 'UX/UI and Frontend Developer',
    body: 'Designing immersive product interfaces with React, TypeScript, Tailwind CSS, and cinematic motion systems.',
  },
  {
    period: '2025',
    title: 'Interface Systems Builder',
    body: 'Built responsive dashboards, portfolio systems, and reusable UI patterns focused on clarity, speed, and polish.',
  },
  {
    period: 'Now',
    title: 'Real-time Portfolio Lab',
    body: 'GitHub connected project cards, 3D skill scenes, and scroll-driven project storytelling for a premium web presence.',
  },
]

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#02040b]"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="relative grid place-items-center">
        <div className="h-28 w-28 rounded-full border border-cyan-300/20 bg-cyan-300/5 shadow-[0_0_80px_rgba(34,211,238,0.24)]" />
        <div className="absolute h-44 w-44 animate-spin rounded-full border-t border-violet-300/70" />
        <div className="absolute h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-400 blur-xl opacity-30" />
        <span className="absolute text-xs font-semibold uppercase tracking-[0.45em] text-cyan-100">Natpu</span>
      </div>
    </motion.div>
  )
}

function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 260, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 260, damping: 28 })

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener('pointermove', updatePosition)
    return () => window.removeEventListener('pointermove', updatePosition)
  }, [mouseX, mouseY])

  return (
    <>
      <motion.div className="cursor-ring" style={{ x: springX, y: springY }} />
      <motion.div className="cursor-core" style={{ x: mouseX, y: mouseY }} />
    </>
  )
}

function Header() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed left-1/2 top-4 z-50 w-[min(1120px,calc(100%-24px))] -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/45 px-4 py-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-3" aria-label="Natpu home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.22)]">
            N
          </span>
          <span className="hidden text-sm font-semibold uppercase tracking-[0.32em] text-white sm:block">
            Natpu
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-pill">
              {item}
            </a>
          ))}
        </nav>

        <a href="#contact" className="glow-button compact">
          Connect
        </a>
      </div>
    </motion.header>
  )
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pt-28 md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.94fr_1.06fr]">
        <motion.div
          initial={{ opacity: 0, y: 42, filter: 'blur(18px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-left"
        >
          <div className="eyebrow mb-6">Real-time 3D portfolio interface</div>
          <h1 className="holo-title text-[clamp(4.2rem,12vw,10.5rem)] font-black leading-[0.78] text-white">
            Natpu
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-6 max-w-2xl text-balance text-[clamp(1.35rem,3vw,3rem)] font-semibold leading-tight text-slate-100"
          >
            UX/UI Designer and Frontend Developer building cinematic digital products.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-5 max-w-xl text-base leading-8 text-slate-300 md:text-lg"
          >
            Dark glass interfaces, React systems, interactive 3D scenes, and scroll stories that make each project feel like a product launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a className="glow-button" href="#projects">
              View Projects
            </a>
            <a className="glass-button" href="#contact">
              Contact Natpu
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-3"
          >
            {[
              ['3D', 'Interfaces'],
              ['API', 'Synced'],
              ['Motion', 'Driven'],
            ].map(([value, label]) => (
              <div key={value} className="metric-tile">
                <span>{value}</span>
                <small>{label}</small>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateY: -18 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="scene-shell relative h-[58vh] min-h-[390px] lg:h-[76vh]"
        >
          <Canvas shadows camera={{ position: [0, 1.4, 6.3], fov: 42 }} dpr={[1, 1.6]}>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section-band px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
          className="glass-panel p-6 md:p-8"
        >
          <div className="profile-hologram">
            <div className="profile-orbit" />
            <div className="profile-core">
              <img src={profilePhoto} alt="Natpu profile" />
            </div>
          </div>
          <h2 className="section-title mt-8">About Me</h2>
          <p className="mt-5 leading-8 text-slate-300">
            I am Natpu, a UX/UI Designer and Frontend Developer focused on interfaces that feel precise, atmospheric, and usable. My work blends visual systems, responsive frontend engineering, and tasteful motion into polished product experiences.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['Design Systems', 'Glass UI, dark mode, responsive components, and reusable visual rules.'],
            ['Frontend Build', 'React, TypeScript, Tailwind CSS, API integrations, and production-ready Vite builds.'],
            ['3D Motion', 'React Three Fiber scenes, glowing particles, scroll animation, and depth transitions.'],
            ['Product Thinking', 'Interfaces designed around clarity, hierarchy, interaction, and conversion.'],
          ].map(([title, body], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 26, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
              className="glass-panel scan-card p-6 text-left"
            >
              <span className="card-index">0{index + 1}</span>
              <h3 className="mt-7 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section-band px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-4">Animated capability map</div>
            <h2 className="section-title">Skills</h2>
          </div>
          <p className="max-w-2xl text-left leading-8 text-slate-300 md:text-right">
            A 3D constellation of the core tools behind the portfolio: React, TypeScript, Figma, Tailwind CSS, C#, and SQL Server.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="scene-shell h-[520px]">
            <Canvas camera={{ position: [0, 0.6, 8], fov: 42 }} dpr={[1, 1.6]}>
              <Suspense fallback={null}>
                <SkillsScene />
              </Suspense>
            </Canvas>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {['React Three Fiber', 'Framer Motion', 'GSAP ScrollTrigger', 'GitHub API', 'Tailwind CSS', 'Vercel Ready'].map((item) => (
              <div key={item} className="skill-row">
                <span className="skill-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section-band px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-left">
          <div className="eyebrow mb-4">Timeline</div>
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="relative grid gap-5">
          {experiences.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="timeline-card"
            >
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section-band px-5 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 34, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-left shadow-[0_30px_110px_rgba(8,145,178,0.16)] backdrop-blur-2xl md:p-12"
      >
        <div className="eyebrow mb-5">Contact console</div>
        <h2 className="section-title">Let's Build Something Cinematic</h2>
        <p className="mt-6 max-w-3xl leading-8 text-slate-300">
          Open to frontend work, portfolio projects, UX/UI systems, and high-polish web experiences with real motion, real structure, and a memorable first impression.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a className="glow-button" href="mailto:natpu@example.com">
            Email Natpu
          </a>
          <a className="glass-button" href="https://github.com/Pradeep479182" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="glass-button" href="#home">
            Back To Top
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1300)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#02040b] text-white">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <CustomCursor />
      <Background />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}
