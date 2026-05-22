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
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about', icon: <User size={18} /> },
  { label: 'Skills', href: '#skills', icon: <Code2 size={18} /> },
  { label: 'Projects', href: '#projects', icon: <Briefcase size={18} /> },
  { label: 'Experience', href: '#experience', icon: <Briefcase size={18} /> },
  { label: 'Certificates', href: '#certificates', icon: <Award size={18} /> },
  { label: 'Contact', href: '#contact', icon: <MessageSquare size={18} /> },
]

const socialLinks = [
  { icon: <Github size={20} />, href: '#', label: 'GitHub' },
  { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
  { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position to set active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section based on scroll position
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

  // Close menu when clicking on a nav item
  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const sectionId = href.replace('#', '')
    setActiveSection(sectionId)
  }

  // Desktop Navigation Item Component
  const DesktopNavItem = ({ item }: { item: NavItem }) => {
    const isActive = activeSection === item.href.replace('#', '')

    return (
      <motion.a
        href={item.href}
        onClick={() => handleNavClick(item.href)}
        className="relative group px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
        whileHover={{ y: -2 }}
      >
        {/* Neon Glow Background */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-400/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-md -z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main Link Content */}
        <div className="relative flex items-center gap-2">
          <span className="text-cyan-400/60 group-hover:text-cyan-300/80 transition-colors">{item.icon}</span>
          <span>{item.label}</span>
        </div>

        {/* Animated Underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600"
          initial={{ width: 0 }}
          animate={{ width: isActive ? '100%' : 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    )
  }

  // Mobile Radial Menu Item
  const RadialMenuItem = ({ item, index, total }: { item: NavItem; index: number; total: number }) => {
    const angle = (index / total) * Math.PI * 2
    const distance = 100

    return (
      <motion.a
        href={item.href}
        onClick={() => handleNavClick(item.href)}
        className="absolute group"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isOpen
            ? {
                scale: 1,
                opacity: 1,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
              }
            : { scale: 0, opacity: 0, x: 0, y: 0 }
        }
        exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.23, 1, 0.32, 1],
        }}
        whileHover={{ scale: 1.15 }}
      >
        {/* Floating Animation */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, delay: index * 0.1, repeat: Infinity }}
          className="relative"
        >
          {/* Neon Glow Container */}
          <motion.div
            className="relative h-14 w-14 rounded-full flex items-center justify-center cursor-pointer"
            whileHover={{
              boxShadow: '0 0 24px rgba(34, 211, 238, 0.8), 0 0 48px rgba(34, 211, 238, 0.4)',
            }}
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-400/40 backdrop-blur-md shadow-lg" />

            {/* Core Glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-400/10 blur-lg"
              whileHover={{ opacity: 0.2 }}
            />

            {/* Icon */}
            <motion.div
              className="relative z-10 text-cyan-300 group-hover:text-cyan-100 transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              {item.icon}
            </motion.div>
          </motion.div>

          {/* Tooltip Label */}
          <motion.div
            className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            initial={{ opacity: 0, y: -5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {item.label}
          </motion.div>
        </motion.div>
      </motion.a>
    )
  }

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden fixed top-0 left-0 right-0 z-50 md:block"
      >
        <div
          className={`mx-auto max-w-7xl px-6 py-4 transition-all duration-300 ${
            scrolled ? 'backdrop-blur-xl bg-slate-950/70 border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20' : 'backdrop-blur-sm bg-slate-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={() => {
                setActiveSection('home')
              }}
              className="group flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Futuristic Logo Circle */}
              <div className="relative h-10 w-10">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-cyan-600/30 border border-cyan-400/60"
                  animate={{
                    boxShadow: ['0 0 20px rgba(34, 211, 238, 0.4)', '0 0 40px rgba(34, 211, 238, 0.6)', '0 0 20px rgba(34, 211, 238, 0.4)'],
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
                <h1 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">Pradeepan Rakavi</h1>
                <p className="text-xs text-cyan-400/70">Portfolio</p>
              </div>
            </motion.a>

            {/* Desktop Menu Items */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </nav>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              onClick={() => handleNavClick('#contact')}
              className="relative group px-6 py-2 text-sm font-semibold text-white overflow-hidden rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Neon Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-600 rounded-lg blur-lg opacity-70 group-hover:opacity-100"
                animate={{
                  boxShadow: ['0 0 20px rgba(34, 211, 238, 0.4)', '0 0 40px rgba(34, 211, 238, 0.6)', '0 0 20px rgba(34, 211, 238, 0.4)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Main Button */}
              <motion.div
                className="relative bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg px-6 py-2"
                whileHover={{ backgroundImage: 'linear-gradient(to right, rgb(6, 182, 212), rgb(14, 165, 233))' }}
              >
                Get in Touch
              </motion.div>
            </motion.a>
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
          {/* Mobile Logo */}
          <div className="relative h-8 w-8">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-cyan-600/30 border border-cyan-400/60"
              animate={{
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-cyan-300">
              PR
            </div>
          </div>
          <span className="text-sm font-bold text-white">Pradeepan Rakavi</span>
        </motion.a>

        {/* Mobile Menu Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-12 w-12 rounded-full flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          {/* Button Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg"
            animate={isOpen ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0.2 }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Button Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-400/40 backdrop-blur-md" />

          {/* Icon */}
          <motion.div
            className="relative z-10 text-cyan-300"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
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

            {/* Center Radial Menu */}
            <div className="fixed inset-0 z-30 md:hidden flex items-center justify-center pointer-events-none">
              {/* Center Logo */}
              <motion.div
                className="relative h-20 w-20 pointer-events-auto"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Pulsing Core */}
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

                {/* Rotating Ring */}
                <motion.div
                  className="absolute inset-1 rounded-full border-2 border-transparent border-t-cyan-300 border-r-cyan-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-cyan-300 font-bold text-xl">
                  PR
                </div>
              </motion.div>

              {/* Radial Menu Items */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                {navItems.map((item, index) => (
                  <RadialMenuItem key={item.label} item={item} index={index} total={navItems.length} />
                ))}
              </div>
            </div>

            {/* Social Links - Mobile */}
            <motion.div
              className="fixed bottom-6 left-1/2 z-30 md:hidden flex gap-4 -translate-x-1/2 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="relative group h-10 w-10 rounded-full flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg"
                    whileHover={{ opacity: 0.5 }}
                  />

                  {/* Background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-400/40 backdrop-blur-md" />

                  {/* Icon */}
                  <div className="relative z-10 text-cyan-300 group-hover:text-cyan-100 transition-colors">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for desktop navbar */}
      <div className="hidden md:block h-16" />
    </>
  )
}
