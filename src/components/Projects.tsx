/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import Tilt from 'react-parallax-tilt'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGithubRepos, type Repo } from '../hooks/useGithubRepos'

gsap.registerPlugin(ScrollTrigger)

const fallbackProjects: Repo[] = [
  {
    id: 101,
    name: 'cinematic-portfolio',
    description: 'A futuristic React, TypeScript, Three.js, GSAP, and Tailwind portfolio experience.',
    html_url: 'https://github.com/Pradeep479182',
    homepage: '',
    topics: ['react', 'threejs', 'gsap', 'tailwind'],
    language: 'TypeScript',
    updated_at: new Date().toISOString(),
  },
  {
    id: 102,
    name: 'ux-command-center',
    description: 'A glassmorphism dashboard concept for fast scanning, project tracking, and product decisions.',
    html_url: 'https://github.com/Pradeep479182',
    homepage: '',
    topics: ['ux-ui', 'figma', 'frontend'],
    language: 'React',
    updated_at: new Date().toISOString(),
  },
  {
    id: 103,
    name: 'developer-lab',
    description: 'An experimental frontend lab with animated components, API data, and interaction patterns.',
    html_url: 'https://github.com/Pradeep479182',
    homepage: '',
    topics: ['typescript', 'api', 'motion'],
    language: 'TypeScript',
    updated_at: new Date().toISOString(),
  },
]

function formatUpdated(date?: string) {
  if (!date) return 'Live sync'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

function repoImage(username: string, repo: Repo) {
  const forceLogo = Boolean(import.meta.env.VITE_FORCE_GITHUB_LOGO)

  // Generate a simple ash-colored 3D-style SVG placeholder with repo name
  function githubAshLogoSVG(name = '') {
    const bg = '#0b0f14'
    const ash = '#bfbfbf'
    const gradient = 'linearGradient(0 0 100% 100%,%23cfcfcf 0,%23a9a9a9 100%)'
    const label = name.replaceAll('-', ' ')
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'>
        <defs>
          <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0' stop-color='%23d9d9d9' stop-opacity='1'/>
            <stop offset='1' stop-color='%23a9a9a9' stop-opacity='1'/>
          </linearGradient>
          <filter id='f' x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='18' result='b' />
            <feBlend in='SourceGraphic' in2='b' mode='normal'/>
          </filter>
        </defs>
        <rect width='1200' height='630' fill='${bg}' />
        <g transform='translate(120,60)'>
          <rect x='0' y='0' rx='28' ry='28' width='960' height='510' fill='url(%23g)' filter='url(%23f)' />
          <g transform='translate(36,36)'>
            <rect x='0' y='0' width='180' height='180' rx='24' fill='${ash}' opacity='0.95' />
            <g transform='translate(24,24)'>
              <rect x='0' y='0' width='120' height='120' rx='12' fill='${bg}' stroke='%23ffffff' stroke-opacity='0.06' />
            </g>
          </g>
          <text x='260' y='120' font-family='Inter, Arial, sans-serif' font-size='56' fill='${ash}' font-weight='700'>${label}</text>
          <text x='260' y='180' font-family='Inter, Arial, sans-serif' font-size='22' fill='%23e6e6e6' opacity='0.6'>3D ash logo / GitHub synced</text>
        </g>
      </svg>`

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

  if (forceLogo) return githubAshLogoSVG(repo.name)

  // prefer previewImage provided by the hook, fallback to GitHub OpenGraph
  return (repo as any).previewImage ?? githubAshLogoSVG(repo.name)
}

function ProjectShowcaseScene({ project }: { project?: Repo }) {
  const groupRef = useRef(null)
  const label = project?.name?.replaceAll('-', ' ').slice(0, 24) || 'GitHub Projects'

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.3
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.08
  })

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[-3, 3, 4]} intensity={2.2} color="#22d3ee" />
      <pointLight position={[4, -1, 2]} intensity={2} color="#f472b6" />
      <group ref={groupRef}>
        <Float floatIntensity={1.1} rotationIntensity={0.35}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[3.4, 2.05, 0.16]} />
            <meshStandardMaterial color="#07101f" emissive="#0ea5e9" emissiveIntensity={0.25} metalness={0.74} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0.2, 0.09]}>
            <planeGeometry args={[3.08, 1.66]} />
            <meshBasicMaterial color="#0f172a" transparent opacity={0.76} />
          </mesh>
          <mesh position={[-0.7, 0.52, 0.105]}>
            <planeGeometry args={[1.24, 0.18]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.42} />
          </mesh>
          <mesh position={[0.62, 0.08, 0.11]}>
            <planeGeometry args={[1.52, 0.18]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.34} />
          </mesh>
          <mesh position={[0, -0.52, 0.115]}>
            <planeGeometry args={[2.4, 0.14]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.26} />
          </mesh>
          <Text position={[0, -1.28, 0.1]} fontSize={0.22} color="#f8fafc" anchorX="center" anchorY="middle">
            {label}
          </Text>
        </Float>
        {[0.95, 1.28, 1.62].map((radius, index) => (
          <mesh key={radius} rotation={[index * 0.5, index * 0.25, 0]}>
            <torusGeometry args={[radius, 0.012, 12, 128]} />
            <meshBasicMaterial color={index === 1 ? '#f472b6' : '#22d3ee'} transparent opacity={index === 1 ? 0.5 : 0.32} />
          </mesh>
        ))}
      </group>
    </>
  )
}

function ProjectCard({ repo, username, index }: { repo: Repo; username: string; index: number }) {
  const tech = useMemo(() => {
    const values = [...(repo.topics ?? []), repo.language].filter(Boolean).slice(0, 5)
    return values.length ? Array.from(new Set(values)) : ['React', 'TypeScript', 'UI']
  }, [repo.language, repo.topics])

  const hasLive = Boolean(repo.homepage && repo.homepage.startsWith('http'))

  return (
    <article className="project-card group">
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={10} perspective={1200} glareEnable glareMaxOpacity={0.18} glareColor="#67e8f9" className="h-full">
        <div className="project-card-inner">
          <div className="project-media">
            <img src={repoImage(username, repo)} alt={`${repo.name} project preview`} loading="lazy" />
            <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
          </div>

          <div className="p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="repo-sync">Updated {formatUpdated(repo.updated_at)}</span>
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
            </div>
            <h3 className="text-2xl font-bold text-white">{repo.name.replaceAll('-', ' ')}</h3>
            <p className="mt-3 min-h-[5.25rem] leading-7 text-slate-300">
              {repo.description || 'GitHub connected project with live repository metadata and deployment-ready structure.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tech.map((item) => (
                <span key={item} className="tech-pill">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {hasLive && (
                <a href={repo.homepage ?? '#'} target="_blank" rel="noreferrer" className="project-link primary">
                  Live Preview
                </a>
              )}
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="project-link">
                GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </Tilt>
    </article>
  )
}

export function Projects() {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Pradeep479182'
  const { repos, loading, error } = useGithubRepos(username, 9, 300000)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleRepos = repos.length ? repos : fallbackProjects
  const activeProject = visibleRepos[activeIndex] ?? visibleRepos[0]
  
  const initialCount = 4
  const displayedRepos = isExpanded ? visibleRepos : visibleRepos.slice(0, initialCount)
  const hasMore = visibleRepos.length > initialCount

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 140,
            z: -260,
            rotateX: 12,
            rotateY: index % 2 === 0 ? -18 : 18,
            scale: 0.86,
            filter: 'blur(18px)',
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              end: 'bottom 44%',
              scrub: 0.85,
              onEnter: () => setActiveIndex(index),
              onEnterBack: () => setActiveIndex(index),
            },
          },
        )
      })
    }, root)

    return () => context.revert()
  }, [displayedRepos.length])

  return (
    <section id="projects" ref={rootRef} className="section-band px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="text-left">
            <div className="eyebrow mb-4">Scroll showcase</div>
            <h2 className="section-title">Projects</h2>
          </div>
          <p className="max-w-3xl text-left leading-8 text-slate-300 lg:justify-self-end lg:text-right">
            Repository data updates from GitHub, then each project moves through a depth-based scroll reveal with rotation, scale, and cinematic blur.
          </p>
        </div>

        {loading && (
          <div className="mb-8 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm text-cyan-100">
            Syncing live projects from GitHub...
          </div>
        )}
        {error && (
          <div className="mb-8 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100">
            GitHub sync is using local showcase data right now. Add VITE_GITHUB_USERNAME or VITE_GITHUB_TOKEN for production.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="sticky top-28 hidden h-[calc(100vh-8rem)] lg:block">
            <div className="scene-shell h-full">
              <Canvas camera={{ position: [0, 0.45, 5.8], fov: 42 }} dpr={[1, 1.5]}>
                <Suspense fallback={null}>
                  <ProjectShowcaseScene project={activeProject} />
                </Suspense>
              </Canvas>
            </div>
          </div>

          <div className="project-stack">
            {displayedRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard repo={repo} username={username} index={index} />
              </motion.div>
            ))}
          </div>

          {/* More Button */}
          <AnimatePresence>
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-8 flex justify-center"
              >
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
                >
                  {isExpanded ? 'Show Less' : `Show More (${visibleRepos.length - initialCount} more)`}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Projects
