/**
 * Advanced Navbar Variant with Enhanced Features
 * 
 * This variant includes:
 * - Scroll progress indicator
 * - Animated gradient background
 * - Search functionality
 * - Submenu support
 * - Theme toggle
 * - Additional animations
 * 
 * Use this as inspiration or directly if you need these features
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  User,
  Code2,
  Briefcase,
  Award,
  MessageSquare,
  Search,
  Sun,
  Moon,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  submenu?: NavItem[]
}

export function AdvancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null)

  const navItems: NavItem[] = [
    { label: 'About', href: '#about', icon: <User size={18} /> },
    { label: 'Skills', href: '#skills', icon: <Code2 size={18} /> },
    { label: 'Projects', href: '#projects', icon: <Briefcase size={18} /> },
    { label: 'Experience', href: '#experience', icon: <Briefcase size={18} /> },
    { label: 'Certificates', href: '#certificates', icon: <Award size={18} /> },
    { label: 'Contact', href: '#contact', icon: <MessageSquare size={18} /> },
  ]

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setScrolled(scrollTop > 50)
      setScrollProgress(scrollPercent)

      // Detect active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certificates', 'contact']
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setIsSearchActive(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setActiveSection(href.replace('#', ''))
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Desktop Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block fixed top-0 left-0 right-0 z-40"
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          animate={{
            background: scrolled
              ? 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.90) 50%, rgba(15,23,42,0.95) 100%)'
              : 'linear-gradient(90deg, rgba(15,23,42,0.60) 0%, rgba(15,23,42,0.50) 50%, rgba(15,23,42,0.60) 100%)',
          }}
          transition={{ duration: 0.5 }}
        />

        <div
          className={`mx-auto max-w-7xl px-6 py-4 transition-all duration-300 ${
            scrolled ? 'backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20' : 'backdrop-blur-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={() => handleNavClick('#home')}
              className="group flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-10 w-10">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-cyan-600/30 border border-cyan-400/60"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(34, 211, 238, 0.4)',
                      '0 0 40px rgba(34, 211, 238, 0.6)',
                      '0 0 20px rgba(34, 211, 238, 0.4)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full border border-cyan-300/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-cyan-300">PR</div>
              </div>

              <div className="hidden lg:block">
                <h1 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Pradeepan Rakavi
                </h1>
                <p className="text-xs text-cyan-400/70">Portfolio</p>
              </div>
            </motion.a>

            {/* Center Menu Items */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')

                return (
                  <motion.div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => item.submenu && setHoveredSubmenu(item.label)}
                    onMouseLeave={() => setHoveredSubmenu(null)}
                  >
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="relative group px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400/60 group-hover:text-cyan-300/80 transition-colors">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>

                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600"
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? '100%' : 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>

                    {/* Submenu (if exists) */}
                    <AnimatePresence>
                      {item.submenu && hoveredSubmenu === item.label && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 min-w-max rounded-lg bg-slate-900/95 border border-cyan-400/30 backdrop-blur-md shadow-lg"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem.label}
                              href={subitem.href}
                              className="block px-4 py-2 text-sm text-white/80 hover:text-cyan-300 hover:bg-cyan-400/10 transition-colors"
                            >
                              {subitem.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <motion.input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className={`${
                    isSearchActive ? 'w-40' : 'w-10'
                  } h-10 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-white placeholder:text-white/40 pl-3 pr-3 transition-all duration-300 focus:outline-none`}
                  onFocus={() => setIsSearchActive(true)}
                  onBlur={() => {
                    if (!searchQuery) setIsSearchActive(false)
                  }}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/60 pointer-events-none" size={16} />
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="h-10 w-10 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 hover:bg-cyan-400/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                onClick={() => handleNavClick('#contact')}
                className="relative group px-6 py-2 text-sm font-semibold text-white overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-600 rounded-lg blur-lg opacity-70 group-hover:opacity-100"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(34, 211, 238, 0.4)',
                      '0 0 40px rgba(34, 211, 238, 0.6)',
                      '0 0 20px rgba(34, 211, 238, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <motion.div className="relative bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg px-6 py-2">
                  Get in Touch
                </motion.div>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden h-16 flex items-center justify-between px-4 bg-slate-950/40 backdrop-blur-lg border-b border-cyan-500/10">
        <motion.a
          href="#home"
          onClick={() => setActiveSection('home')}
          className="group flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative h-8 w-8">
            <motion.div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-cyan-600/30 border border-cyan-400/60" />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-cyan-300">
              PR
            </div>
          </div>
          <span className="text-sm font-bold text-white">Pradeepan Rakavi</span>
        </motion.a>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-12 w-12 rounded-full flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-400/40 backdrop-blur-md" />
          <motion.div className="relative z-10 text-cyan-300" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Radial Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Center Menu */}
            <div className="fixed inset-0 z-30 md:hidden flex items-center justify-center pointer-events-none">
              <div className="relative h-20 w-20 pointer-events-auto">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 to-cyan-600/40 border border-cyan-300/60"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(34, 211, 238, 0.4)',
                      '0 0 40px rgba(34, 211, 238, 0.8)',
                      '0 0 20px rgba(34, 211, 238, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full border-2 border-transparent border-t-cyan-300 border-r-cyan-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-cyan-300 font-bold text-xl">PR</div>
              </div>

              {/* Radial Menu Items */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                {navItems.map((item, index) => {
                  const angle = (index / navItems.length) * Math.PI * 2
                  const distance = 100

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="absolute group"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                      }}
                      exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.05,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      whileHover={{ scale: 1.15 }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, delay: index * 0.1, repeat: Infinity }}
                        className="relative"
                      >
                        <motion.div className="relative h-14 w-14 rounded-full flex items-center justify-center cursor-pointer">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-400/40 backdrop-blur-md" />
                          <motion.div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-lg" />
                          <motion.div className="relative z-10 text-cyan-300 group-hover:text-cyan-100 transition-colors">
                            {item.icon}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="hidden md:block h-16" />
    </>
  )
}

export default AdvancedNavbar
