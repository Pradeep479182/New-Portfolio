# Futuristic Responsive Navbar Component

A premium, fully responsive navbar component built with React, TypeScript, Tailwind CSS, and Framer Motion. Features both desktop and mobile-optimized interfaces with glassmorphism design, neon glow effects, and smooth animations.

## Features

### Desktop Navigation
- **Horizontal Layout**: Clean, professional navigation bar at the top
- **Glassmorphism Design**: Transparent dark background with backdrop blur effects
- **Neon Glow Accents**: Cyan/blue gradient effects with smooth pulsing animations
- **Smooth Hover Effects**: Animated underline and icon color transitions
- **Active Section Highlighting**: Automatic detection and highlighting of current section
- **Futuristic Logo**: Animated circular logo with rotating rings and pulsing glow
- **CTA Button**: "Get in Touch" button with prominent neon glow effect

### Mobile Navigation
- **Floating Menu Button**: Circular button in top-right corner
- **Radial Circular Menu**: Menu items animate outward in a circular layout
- **Smooth Animations**: Staggered entrance/exit animations with ease curves
- **Neon Effects**: Full cyberpunk-inspired dark UI with glowing elements
- **Backdrop Blur**: Semi-transparent overlay with blur effect
- **Social Links**: Mobile-specific social media links in radial menu
- **Floating Animation**: Items gently bob up and down when menu is open

### General Features
- **React Hooks**: useState for menu state management
- **TypeScript**: Fully typed components and interfaces
- **Responsive Design**: Breakpoints at md (768px) for desktop/mobile switch
- **Scroll Detection**: Auto-detects active section based on scroll position
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Production Ready**: Clean code, proper error handling, reusable patterns
- **Performance Optimized**: Minimal re-renders with proper memoization

## Component Structure

```
Navbar (Main Component)
├── Desktop Navigation (hidden on md screens)
│   ├── Logo
│   ├── Nav Items (with DesktopNavItem sub-component)
│   └── CTA Button
├── Mobile Menu Toggle (hidden on md+ screens)
└── Mobile Radial Menu (AnimatePresence wrapper)
    ├── Backdrop
    ├── Center Logo
    ├── Radial Menu Items (RadialMenuItem sub-component)
    └── Social Links
```

## Styling Details

### Color Scheme
- **Primary**: Cyan (#22d3ee) - Main accent color
- **Secondary**: Slate (#0f172a) - Background tint
- **Tertiary**: White (#ffffff) - Text

### Effects
- **Glassmorphism**: `backdrop-blur-xl` with semi-transparent backgrounds
- **Neon Glow**: `box-shadow` with rgba cyan colors
- **Gradient Text**: `bg-gradient-to-r` backgrounds with color stops
- **Floating Animation**: Infinite Y-axis motion with staggered delays

## Usage

```tsx
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <div>
      <Navbar />
      {/* Rest of your app content */}
    </div>
  )
}
```

## Dependencies

Required packages:
- `react` - UI library
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS

Install with:
```bash
npm install lucide-react
```

## Customization

### Change Navigation Items
Edit the `navItems` array in the component:

```tsx
const navItems: NavItem[] = [
  { label: 'Custom', href: '#custom', icon: <SomeIcon size={18} /> },
  // ...
]
```

### Change Colors
Update Tailwind classes:
- Replace `cyan` with your preferred color (e.g., `blue`, `purple`)
- Update shadow colors: `shadow-cyan-950/20` → `shadow-blue-950/20`
- Change glow colors: `rgba(34, 211, 238, 0.4)` → `rgba(your-color)`

### Adjust Animation Timing
Modify transition durations in motion.animate/initial blocks:

```tsx
transition={{ duration: 0.6 }} // Change 0.6 to your value
```

### Mobile Menu Radius
Change the `distance` variable in RadialMenuItem:

```tsx
const distance = 100 // Increase/decrease for wider/narrower menu
```

## Active Section Detection

The component automatically detects the active section by:
1. Listening to scroll events
2. Checking which section element is in viewport
3. Highlighting the matching nav item

Ensure your section elements have matching IDs:
```html
<section id="about">...</section>
<section id="skills">...</section>
<!-- etc -->
```

## Accessibility

- Semantic HTML with proper `<nav>` and `<header>` elements
- ARIA labels on interactive elements
- Keyboard navigable (standard anchor behavior)
- High contrast text on backgrounds
- Focus states on buttons and links

## Performance Tips

1. **Memoization**: Consider wrapping nav items in `React.memo()` if re-renders occur
2. **Scroll Throttling**: The scroll listener is efficient but can be optimized with debouncing
3. **Image Optimization**: If adding images, use next/image or similar optimized loaders
4. **CSS Animations**: Tailwind animations are GPU-accelerated

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Mobile browsers: Optimized with touch events

## Troubleshooting

### Icons not showing
Make sure `lucide-react` is installed:
```bash
npm install lucide-react
```

### Navbar overlapping content
Ensure you have a spacer div:
```tsx
<div className="hidden md:block h-16" /> {/* Desktop spacer */}
```

Or add `pt-16` to your main content on desktop.

### Active section not updating
Check that your section IDs match the nav item `href` values (without #):
- Nav item: `href="#projects"`
- Section: `<section id="projects">`

### Mobile menu position issues
Verify viewport meta tag in index.html:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## Future Enhancements

- Sticky scroll progress indicator
- Submenu support with nested items
- Theme toggle (light/dark mode)
- Animated hamburger menu icon
- Search functionality
- Notification badge
- Language selector
- Mobile gesture support (swipe to close)

## License

This component is part of the Pradeepan Rakavi Portfolio and follows the main project license.
