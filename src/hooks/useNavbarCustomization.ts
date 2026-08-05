/**
 * Navbar Theme & Customization Utilities
 * 
 * Provides easy-to-use hooks and utilities for customizing the Navbar appearance,
 * animations, and behavior without modifying the main component.
 */

import { useEffect, useState } from 'react'

// Theme Configuration Type
export interface NavbarTheme {
  primary: string // Primary color for glows (hex/rgb)
  secondary: string // Secondary color for accents
  background: string // Background overlay color
  text: string // Text color
  glow: {
    color: string
    intensity: 'low' | 'medium' | 'high'
  }
  animation: {
    duration: number
    easing: string
  }
}

// Default Theme
export const defaultTheme: NavbarTheme = {
  primary: '#22d3ee', // cyan-400
  secondary: '#ffffff',
  background: '#0f172a', // slate-900
  text: '#ffffff',
  glow: {
    color: 'rgba(34, 211, 238, 0.4)',
    intensity: 'medium',
  },
  animation: {
    duration: 0.3,
    easing: 'ease-out',
  },
}

// Pre-configured Themes
export const themes = {
  default: defaultTheme,
  cyberpunk: {
    primary: '#00ff88', // Neon green
    secondary: '#ff006e', // Neon pink
    background: '#0a0e27',
    text: '#ffffff',
    glow: {
      color: 'rgba(0, 255, 136, 0.4)',
      intensity: 'high',
    },
    animation: {
      duration: 0.4,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    },
  },
  synthwave: {
    primary: '#ff006e', // Hot pink
    secondary: '#00d9ff', // Cyan
    background: '#16213e',
    text: '#f5f5f5',
    glow: {
      color: 'rgba(255, 0, 110, 0.4)',
      intensity: 'high',
    },
    animation: {
      duration: 0.35,
      easing: 'ease-in-out',
    },
  },
  minimalist: {
    primary: '#3b82f6', // blue-500
    secondary: '#1e293b', // slate-800
    background: '#f8fafc', // slate-50
    text: '#1e293b',
    glow: {
      color: 'rgba(59, 130, 246, 0.2)',
      intensity: 'low',
    },
    animation: {
      duration: 0.25,
      easing: 'ease-out',
    },
  },
  dark_minimal: {
    primary: '#6366f1', // indigo-500
    secondary: '#4f46e5', // indigo-600
    background: '#1f2937', // gray-800
    text: '#f3f4f6', // gray-100
    glow: {
      color: 'rgba(99, 102, 241, 0.3)',
      intensity: 'low',
    },
    animation: {
      duration: 0.28,
      easing: 'ease-out',
    },
  },
} satisfies Record<string, NavbarTheme>

/**
 * Hook to use a predefined theme
 * Usage: const theme = useNavbarTheme('cyberpunk')
 */
export function useNavbarTheme(themeName: keyof typeof themes): NavbarTheme {
  return themes[themeName]
}

/**
 * Hook to manage navbar scroll state
 * Returns information about scroll position and navbar visibility state
 */
export function useNavbarScrollState() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0

      setIsScrolled(currentScrollY > 50)
      setScrollProgress(progress)
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return {
    isScrolled,
    scrollProgress,
    scrollDirection,
  }
}

/**
 * Hook to detect active section from URL hash or scroll position
 * Useful for syncing navbar with page sections
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    // Check URL hash first
    const hash = window.location.hash.slice(1)
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash)
      return
    }

    // Fallback to scroll detection
    const handleScroll = () => {
      let current = ''

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = id
          break
        }
      }

      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.slice(1)
      if (newHash && sectionIds.includes(newHash)) {
        setActiveSection(newHash)
      }
    })

    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', () => {})
    }
  }, [sectionIds])

  return activeSection
}

/**
 * Hook for managing mobile menu state with keyboard support (ESC to close)
 */
export function useMobileMenuState() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return [isOpen, setIsOpen] as const
}

/**
 * Utility to generate responsive navbar configuration
 * Customize breakpoints and behavior per screen size
 */
export interface NavbarResponsiveConfig {
  desktopBreakpoint: number // px value
  mobileMenuDistance: number // radial menu radius
  logoSize: {
    desktop: number
    mobile: number
  }
  menuItemCount: number
}

export const defaultResponsiveConfig: NavbarResponsiveConfig = {
  desktopBreakpoint: 768, // md breakpoint
  mobileMenuDistance: 100,
  logoSize: {
    desktop: 40,
    mobile: 32,
  },
  menuItemCount: 6,
}

/**
 * Utility to convert CSS colors to RGB values for dynamic styling
 */
export function colorToRgb(
  color: string,
): { r: number; g: number; b: number } | null {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const num = parseInt(hex, 16)
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    }
  }

  // Handle rgb/rgba colors
  const match = color.match(/\d+/g)
  if (match && match.length >= 3) {
    return {
      r: parseInt(match[0]),
      g: parseInt(match[1]),
      b: parseInt(match[2]),
    }
  }

  return null
}

/**
 * Utility to generate CSS variables for navbar theming
 * Can be injected into document.documentElement.style
 */
export function generateNavbarCSSVariables(theme: NavbarTheme): Record<string, string> {
  return {
    '--navbar-primary': theme.primary,
    '--navbar-secondary': theme.secondary,
    '--navbar-background': theme.background,
    '--navbar-text': theme.text,
    '--navbar-glow': theme.glow.color,
    '--navbar-animation-duration': `${theme.animation.duration}s`,
    '--navbar-animation-easing': theme.animation.easing,
  }
}

/**
 * Hook to apply theme CSS variables to the document
 * Usage: useApplyNavbarTheme(myTheme)
 */
export function useApplyNavbarTheme(theme: NavbarTheme) {
  useEffect(() => {
    const variables = generateNavbarCSSVariables(theme)
    Object.entries(variables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    return () => {
      Object.keys(variables).forEach((key) => {
        document.documentElement.style.removeProperty(key)
      })
    }
  }, [theme])
}

/**
 * Utility to smooth scroll to a section
 */
export function smoothScrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

/**
 * Hook for prefetch navbar resources (icons, animations)
 * Improves perceived performance
 */
export function usePrefetchNavbarResources() {
  useEffect(() => {
    // Preload fonts if needed
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'font'
    document.head.appendChild(link)

    // Preload critical images
    const images = ['logo.svg', 'icon.svg']
    images.forEach((img) => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = 'image'
      link.href = `/assets/${img}`
      document.head.appendChild(link)
    })
  }, [])
}

export default {
  useNavbarTheme,
  useNavbarScrollState,
  useActiveSection,
  useMobileMenuState,
  colorToRgb,
  generateNavbarCSSVariables,
  useApplyNavbarTheme,
  smoothScrollToSection,
  usePrefetchNavbarResources,
  themes,
  defaultTheme,
  defaultResponsiveConfig,
}
