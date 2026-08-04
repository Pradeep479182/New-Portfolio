/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { HeroScene } from './components/HeroScene'
import { Projects } from './components/Projects'
import { SkillsScene } from './components/SkillsScene'
import { PremiumLoader } from './components/PremiumLoader'
import { PortraitDisplay } from './components/PortraitDisplay'
import { Background } from './components/Background'
import { PremiumButton } from './components/PremiumButton'
import FloatingEmailButton from './components/FloatingEmailButton'
import { CVButton } from './components/CVButton'
import profilePhoto from './assets/Profile.jpeg'

const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const experiences = [
  {
    period: '2026',
    title: 'Full Stack Developer(hand-On Project)',
    body: 'Building immersive full-stack experiences with React, TypeScript, Next.js, Tailwind CSS, and cinematic motion systems.',
  },
  {
    period: '2025',
    title: 'Interface Systems Builder(hand-On Project)',
    body: 'Built responsive dashboards, portfolio systems, and reusable UI patterns focused on clarity, speed, and polish.',
  },
  {
    period: 'Now',
    title: 'Real-time Portfolio Lab(hand-On Project)',
    body: 'GitHub connected project cards, 3D skill scenes, and scroll-driven project storytelling for a premium web presence.',
  },
]

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

function TypingText({ text, speed = 70, loop = false }: { text: string; speed?: number; loop?: boolean }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let mounted = true
    let idx = 0
    let forward = true
    let timer: any = null

    const step = () => {
      if (!mounted) return
      setDisplay(text.slice(0, idx))

      if (forward) {
        if (idx < text.length) {
          idx++
          timer = setTimeout(step, speed)
        } else if (loop) {
          forward = false
          timer = setTimeout(step, 900)
        }
      } else {
        if (idx > 0) {
          idx--
          timer = setTimeout(step, Math.max(30, speed / 2))
        } else {
          forward = true
          timer = setTimeout(step, 500)
        }
      }
    }

    step()
    return () => {
      mounted = false
      if (timer) clearTimeout(timer)
    }
  }, [text, speed, loop])

  return (
    <span className="typing-text inline-flex items-center">
      <span>{display}</span>
      <span className="typing-cursor" aria-hidden="true" />
    </span>
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
        <a href="#home" className="group flex items-center gap-3" aria-label="Pradeepan Rakavi home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.22)]">
            PR
          </span>
          <span className="hidden text-sm font-semibold uppercase tracking-[0.32em] text-white sm:block">
            Pradeepan Rakavi
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
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pt-28 md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[0.94fr_1.06fr] relative z-10">
        {/* Left side: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: 'blur(18px)' }}
          animate={isHeroLoaded ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-left"
        >
          {/* Subtitle/Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isHeroLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="eyebrow mb-6 text-cyan-300/80"
          >
            Premium Portfolio Experience
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, x: -60, filter: 'blur(15px)' }}
            animate={isHeroLoaded ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="holo-title text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.88] text-white bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            Pradeepan Rakavi
          </motion.h1>

          {/* Subtitle: Job title */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={isHeroLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-[clamp(1.25rem,4vw,2.5rem)] font-bold text-cyan-200 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <TypingText text="Software Engineering Student | Frontend Developer" />
          </motion.p>

          {/* Professional description */}
          <motion.p
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={isHeroLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg"
          >
              <TypingText
                text="Passionate about building modern, scalable, and user-focused web applications. I craft immersive digital experiences combining elegant design, powerful functionality, and cinematic interactions that engage and inspire."
                speed={30}
              />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={isHeroLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <PremiumButton href="#projects" variant="primary">
              View Projects
            </PremiumButton>
            <PremiumButton href="#contact" variant="secondary">
              Contact Me
            </PremiumButton>
          </motion.div>

          {/* Stats/Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4"
          >
            {[
              { value: '10+', label: 'Projects Built' },
              { value: '3D', label: 'Interactive' },
              { value: 'Full', label: 'Stack' },
            ].map(({ value, label }) => (
              <motion.div
                key={value}
                className="metric-tile group relative rounded-lg border border-cyan-400/20 bg-cyan-900/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-900/10"
                whileHover={{ scale: 1.05 }}
              >
                <span className="block text-lg md:text-2xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {value}
                </span>
                <small className="text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {label}
                </small>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side: Portrait */}
        <motion.div
          className="relative h-[58vh] min-h-[390px] lg:h-[76vh] w-full"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isHeroLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <PortraitDisplay portraitSrc={profilePhoto} isLoaded={isHeroLoaded} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-slate-400 uppercase tracking-widest">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-cyan-400/40 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-cyan-400 rounded-full"
              animate={{ y: [0, 8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function About() {
  const speakPortfolioSummary = () => {
    const summary =
      "Welcome to our portfolio. I’m Rakavi, your AI voice assistant. This portfolio highlights full-stack development, immersive 3D motion, modern design systems, API-powered UI, and intelligent interactive experiences. Explore my work with AI-powered storytelling, intelligent UI guidance, and polished digital craftsmanship."

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()

      const speakWithVoice = (voice?: SpeechSynthesisVoice) => {
        const utterance = new SpeechSynthesisUtterance(summary)
        utterance.lang = 'en-US'
        utterance.rate = 1
        utterance.pitch = 1
        if (voice) utterance.voice = voice
        window.speechSynthesis.speak(utterance)
      }

      const voices = window.speechSynthesis.getVoices() || []
      const findFemale = (list: SpeechSynthesisVoice[]) =>
        list.find(
          (v) => /female|woman|samantha|karen|allison|zira|google/i.test(v.name)
        )

      const preferred = findFemale(voices) || voices.find((v) => v.lang?.startsWith('en')) || voices[0]

      if (voices.length === 0) {
        // Voices may not be loaded yet — wait for change event
        window.speechSynthesis.onvoiceschanged = () => {
          const vs = window.speechSynthesis.getVoices() || []
          const v = findFemale(vs) || vs.find((vv) => vv.lang?.startsWith('en')) || vs[0]
          speakWithVoice(v)
        }
      } else {
        speakWithVoice(preferred)
      }
    }
  }

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
            <div className="profile-core robot-shell">
              <div className="robot-antenna" />
              <div className="robot-head">
                <div className="robot-eye left" />
                <div className="robot-eye right" />
                <div className="robot-mouth" />
              </div>
              <div className="robot-body">
                <div className="robot-chest" />
                <div className="robot-wave" />
              </div>
            </div>
          </div>
          <div className="assistant-callout mt-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-slate-900/70 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
            <span className="assistant-dot" />
            <span>AI Voice Assistant active</span>
          </div>
          <div className="assistant-voice-panel mt-4 rounded-3xl border border-cyan-300/15 bg-[#08101f]/90 p-5 text-slate-200 shadow-[0_0_45px_rgba(14,165,233,0.12)]">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/90">Welcome to our portfolio</p>
            <h3 className="mt-2 text-xl font-semibold text-white">I’m Rakavi — your AI portfolio guide.</h3>
            <p className="mt-3 leading-7 text-slate-300">
              This AI assistant summarizes the portfolio features: full-stack development, immersive 3D motion, modern design systems, API-powered UI, and intelligent interactive experience design.
            </p>
            <p className="mt-3 text-cyan-100/95 italic">“Explore my work with AI-powered storytelling, intelligent UI guidance, and polished digital craftsmanship.”</p>
            <button
              type="button"
              onClick={speakPortfolioSummary}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_10px_35px_rgba(56,189,248,0.22)] transition hover:bg-cyan-300"
            >
              Play voice summary
            </button>
          </div>
          <h2 className="section-title mt-8">About Me</h2>
          <p className="mt-5 leading-8 text-slate-300">
            I am Pradeepan Rakavi, a Full Stack Developer creating immersive digital experiences with AI-powered interactions. I blend frontend interfaces with backend systems, 3D motion, and intelligent assistant experiences to bring premium products to life.
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
            A 3D constellation of the core tools behind the portfolio: React, TypeScript, Next.js, Tailwind CSS, and JavaScript.
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
          Open to full-stack projects, immersive web experiences, API integrations, and high-polish digital products with real motion, real structure, and a memorable first impression.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a className="glow-button" href="mailto:pradeeprakavi@gmail.com?subject=Let's%20Collaborate%20-%20Full%20Stack%20Project&body=Hi%20Pradeepan,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20project.%0A%0APlease%20share%20your%20availability.%0A%0ABest%20regards">
            Email Pradeepan Rakavi
          </a>
          <a className="glass-button" href="https://www.linkedin.com/in/pradeep-rakavi-27146b38b/" target="_blank" rel="noreferrer">
            LinkedIn
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
    const timer = window.setTimeout(() => setLoading(false), 2000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#02040b] text-white">
      <AnimatePresence>{loading && <PremiumLoader />}</AnimatePresence>
      <CustomCursor />
      <FloatingEmailButton />
      <CVButton />
      <Background />
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
