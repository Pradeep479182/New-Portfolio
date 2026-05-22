# Navbar Customization Cheat Sheet

Quick reference for common customizations. All code snippets can be applied directly to the components.

## 🎨 Color Customizations

### Change Primary Color (Cyan → Blue)
**In Navbar.tsx, replace all:**
```tsx
// FIND:                    // REPLACE WITH:
text-cyan-400              text-blue-400
text-cyan-300              text-blue-300
bg-cyan-400/20             bg-blue-400/20
border-cyan-400/40         border-blue-400/40
border-cyan-300/60         border-blue-300/60
from-cyan-400              from-blue-400
to-cyan-600                to-blue-600
rgba(34, 211, 238, 0.x)   rgba(59, 130, 246, 0.x)  // Blue RGB
```

### Change Primary Color (Cyan → Purple)
```tsx
text-cyan-400              text-purple-400
text-cyan-300              text-purple-300
from-cyan-400              from-purple-500
to-cyan-600                to-purple-700
rgba(34, 211, 238, 0.x)   rgba(168, 85, 247, 0.x)  // Purple RGB
```

### Change Primary Color (Cyan → Pink)
```tsx
text-cyan-400              text-pink-400
text-cyan-300              text-pink-300
from-cyan-400              from-pink-500
to-cyan-600                to-pink-600
rgba(34, 211, 238, 0.x)   rgba(236, 72, 153, 0.x)  // Pink RGB
```

### Quick Color Palette Reference
```tsx
// Tailwind colors (hue changes):
Cyan:    rgb(34, 211, 238)    // #22d3ee
Blue:    rgb(59, 130, 246)    // #3b82f6
Purple:  rgb(168, 85, 247)    // #a855f7
Pink:    rgb(236, 72, 153)    // #ec4899
Red:     rgb(239, 68, 68)     // #ef4444
Orange:  rgb(249, 115, 22)    // #f97316
Green:   rgb(34, 197, 94)     // #22c55e
Indigo:  rgb(99, 102, 241)    // #6366f1
```

## ⚡ Animation Customizations

### Make Animations Faster
```tsx
// FIND:                              REPLACE WITH:
transition={{ duration: 0.8 }}       transition={{ duration: 0.4 }}
transition={{ duration: 0.6 }}       transition={{ duration: 0.3 }}
transition={{ duration: 0.3 }}       transition={{ duration: 0.15 }}
```

### Make Animations Slower
```tsx
transition={{ duration: 0.3 }}       transition={{ duration: 0.6 }}
transition={{ duration: 0.6 }}       transition={{ duration: 1.2 }}
animate={{ rotate: 360 }}            animate={{ rotate: 360 }}
transition={{ duration: 8 }}         transition={{ duration: 16 }}
```

### Change Glow Pulsing Speed
```tsx
// Current (3 second cycle):
animate={{
  boxShadow: ['0 0 20px rgba(...', '0 0 40px rgba(...', '0 0 20px rgba(...'],
}}
transition={{ duration: 3, repeat: Infinity }}

// Faster (2 second cycle):
transition={{ duration: 2, repeat: Infinity }}

// Slower (5 second cycle):
transition={{ duration: 5, repeat: Infinity }}
```

### Change Easing Function
```tsx
// Smooth out:
ease: [0.23, 1, 0.32, 1]   // Default cubic-bezier
ease: 'easeOut'             // Starts fast, ends slow
ease: 'easeIn'              // Starts slow, ends fast
ease: 'easeInOut'           // Smooth both ends
ease: 'linear'              // Constant speed
```

## 📐 Spacing & Size Customizations

### Increase Navbar Height
```tsx
// Desktop navbar (in Header div):
className="py-4"     →     className="py-6"
className="h-16"     →     className="h-20"
padding: 0.85rem     →     padding: 1.25rem

// Mobile navbar:
className="h-16"     →     className="h-20"
```

### Adjust Gap Between Nav Items
```tsx
className="gap-2"    →     className="gap-1"   // Tighter
className="gap-2"    →     className="gap-4"   // Looser
className="gap-3"    →     className="gap-6"   // Much looser
```

### Adjust Mobile Radial Menu Radius
```tsx
const distance = 100   →   const distance = 80    // Smaller circle
const distance = 100   →   const distance = 120   // Larger circle
const distance = 100   →   const distance = 140   // Much larger
```

### Change Logo Size
```tsx
// Desktop logo:
className="h-10 w-10"  →   className="h-12 w-12"  // Bigger
className="h-10 w-10"  →   className="h-8 w-8"    // Smaller

// Mobile logo:
className="h-8 w-8"    →   className="h-10 w-10"  // Bigger
className="h-8 w-8"    →   className="h-6 w-6"    // Smaller

// Center radial menu logo:
className="h-20 w-20"  →   className="h-24 w-24"  // Bigger
className="h-20 w-20"  →   className="h-16 w-16"  // Smaller
```

## 🎯 Glow Effect Customizations

### Increase Glow Intensity
```tsx
boxShadow: ['0 0 20px rgba(..., 0.4)',     // Min
            '0 0 40px rgba(..., 0.6)',     // Max
            '0 0 20px rgba(..., 0.4)']

// Change to:
boxShadow: ['0 0 30px rgba(..., 0.6)',     // Min (more intense)
            '0 0 60px rgba(..., 0.8)',     // Max (very intense)
            '0 0 30px rgba(..., 0.6)']
```

### Decrease Glow Intensity
```tsx
// Change to:
boxShadow: ['0 0 15px rgba(..., 0.2)',     // Min (subtle)
            '0 0 30px rgba(..., 0.4)',     // Max (mild)
            '0 0 15px rgba(..., 0.2)']
```

### Change Blur Amount
```tsx
className="blur-lg"    →   className="blur-xl"    // More blur
className="blur-lg"    →   className="blur-md"    // Less blur
className="blur-lg"    →   className="blur"       // Minimal blur
```

### Change Backdrop Blur
```tsx
className="backdrop-blur-xl"   →   className="backdrop-blur-3xl"  // More blur
className="backdrop-blur-xl"   →   className="backdrop-blur-md"   // Less blur
className="backdrop-blur-xl"   →   className="backdrop-blur"      // Minimal blur
```

## 🔄 Menu Customizations

### Add More Nav Items
```tsx
const navItems: NavItem[] = [
  // ... existing items
  { label: 'Blog', href: '#blog', icon: <BookOpen size={18} /> },
  { label: 'Pricing', href: '#pricing', icon: <DollarSign size={18} /> },
  { label: 'Docs', href: '#docs', icon: <BookMarked size={18} /> },
]
```

### Remove Nav Items
Simply delete the items you don't want from the `navItems` array.

### Change Nav Item Order
Rearrange items in the `navItems` array:
```tsx
const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: <Home size={18} /> },
  { label: 'Contact', href: '#contact', icon: <MessageSquare size={18} /> },
  // ... rest of items in new order
]
```

### Change Nav Item Text
```tsx
{ label: 'About', href: '#about', icon: <User size={18} /> },
{ label: 'About Me', href: '#about', icon: <User size={18} /> },  // Changed text
```

## 🔗 Link & Button Customizations

### Change CTA Button Text
```tsx
// Find in navbar:
Get in Touch
// Replace with:
Let's Talk
Start Now
Contact Me
Schedule Call
```

### Change CTA Button Link
```tsx
// Find:
href="#contact"
// Replace with:
href="#your-section"
href="https://calendly.com/..."
href="mailto:your@email.com"
```

### Add More Social Links
```tsx
const socialLinks = [
  { icon: <Github size={20} />, href: '#', label: 'GitHub' },
  { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
  { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
  { icon: <Mail size={20} />, href: '#', label: 'Email' },      // New
  { icon: <Dribbble size={20} />, href: '#', label: 'Dribbble' }, // New
]
```

## 📱 Responsive Customizations

### Change Mobile Breakpoint
```tsx
// Current (shows desktop at 768px and up):
className="hidden md:block"

// Show desktop at 1024px and up:
className="hidden lg:block"

// Show desktop at 640px and up:
className="hidden sm:block"
```

### Different Navbar Height Per Screen
```tsx
// Use responsive Tailwind classes:
className="h-12 md:h-16"        // 48px mobile, 64px desktop
className="h-14 md:h-20"        // 56px mobile, 80px desktop
```

## 🎨 Background Customizations

### Change Navbar Background Color
```tsx
// Current:
bg-slate-950/40    →    bg-slate-900/40   (Darker)
bg-slate-950/40    →    bg-slate-950/60   (More opaque)
bg-slate-950/40    →    bg-slate-950/20   (More transparent)

// Custom color:
bg-slate-950/40    →    bg-blue-950/40    (Blue tint)
bg-slate-950/40    →    bg-purple-950/40  (Purple tint)
```

### Change Backdrop Blur
```tsx
className="backdrop-blur-xl"   →   className="backdrop-blur-2xl"  // Maximum blur
className="backdrop-blur-xl"   →   className="backdrop-blur-lg"   // Strong blur
className="backdrop-blur-xl"   →   className="backdrop-blur-md"   // Medium blur
className="backdrop-blur-xl"   →   className="backdrop-blur-sm"   // Light blur
```

### Add Border Colors
```tsx
// Current borders:
border-cyan-500/20    →    border-cyan-400/30   (More visible)
border-cyan-500/20    →    border-cyan-500/10   (Less visible)

// Different color:
border-cyan-500/20    →    border-blue-500/20
border-cyan-500/20    →    border-purple-500/20
```

## 📝 Text Customizations

### Change Logo Text
```tsx
// Find in Logo section:
<span>Natpu</span>
// Change to:
<span>Your Name</span>

// Or change the letter:
<div>N</div>
// Change to:
<div>Y</div>  // Your initial
```

### Change Eye
```tsx
// Find eyebrow element:
<div className="eyebrow mb-6">Real-time 3D portfolio interface</div>
// Change to:
<div className="eyebrow mb-6">Your tagline here</div>
```

### Change Font Size
```tsx
className="text-sm"    →    className="text-xs"    // Smaller
className="text-sm"    →    className="text-base"  // Bigger
className="text-lg"    →    className="text-xl"    // Bigger
className="text-lg"    →    className="text-sm"    // Smaller
```

### Change Font Weight
```tsx
className="font-semibold"    →    className="font-bold"      // Bolder
className="font-semibold"    →    className="font-medium"    // Lighter
className="font-bold"        →    className="font-black"     // Very bold
```

## 🔒 Shadow Customizations

### Increase Shadow
```tsx
// Current:
shadow-lg shadow-cyan-950/20

// More prominent:
shadow-2xl shadow-cyan-950/40

// Very prominent:
shadow-2xl shadow-cyan-950/60
```

### Decrease Shadow
```tsx
// Less prominent:
shadow-md shadow-cyan-950/10

// Minimal shadow:
shadow-sm shadow-cyan-950/5
```

### Change Shadow Color
```tsx
// Current (cyan):
shadow-cyan-950/20

// Blue shadow:
shadow-blue-950/20

// Purple shadow:
shadow-purple-950/20

// No color hint (gray):
shadow-slate-900/20
```

## ⚙️ Icon Customizations

### Change Icon Size
```tsx
size={18}    →    size={16}   // Smaller
size={18}    →    size={20}   // Bigger
size={18}    →    size={24}   // Much bigger
```

### Change Icon Style
```tsx
// Use different Lucide icons:
<User size={18} />           // About
<Code2 size={18} />          // Skills
<Briefcase size={18} />      // Projects
<Zap size={18} />            // Experience (alternative)
<Trophy size={18} />         // Certificates (alternative)
<Mail size={18} />           // Contact (alternative)
```

### Hide Icons
```tsx
// Remove the icon from display:
<span className="text-cyan-400/60">{item.icon}</span>
// Change to:
<span className="text-cyan-400/60 hidden"></span>
```

## 🎭 Advanced Customizations

### Combine Changes
```tsx
// Make nav more colorful and animated
// 1. Change cyan to purple
// 2. Make animations faster
// 3. Increase glow intensity
// 4. Add more nav items
```

### Create Custom Theme Hook
```tsx
import { useApplyNavbarTheme, useNavbarTheme } from './hooks/useNavbarCustomization'

function App() {
  const theme = useNavbarTheme('cyberpunk')  // Use preset
  useApplyNavbarTheme(theme)
  return <Navbar />
}
```

### Override Tailwind Classes
```tsx
// In index.css, add override:
@layer components {
  .navbar-brand {
    @apply text-xl font-bold text-blue-400;
  }
}

// Then use in component:
className="navbar-brand"
```

## 📊 Common Preset Changes

### "Minimal" Look
- Decrease glow intensity to 50%
- Change animation duration to 0.2s
- Reduce gap between items to gap-1
- Change blur to backdrop-blur-sm

### "Bold" Look
- Increase glow intensity to 150%
- Change animation duration to 0.8s
- Increase gap to gap-6
- Change blur to backdrop-blur-3xl

### "Dark" Look
- Change background to bg-slate-950/90
- Decrease opacity of text to text-white/70
- Keep glow intensity normal
- Reduce border opacity to /10

### "Light" Look
- Change background to bg-white/90
- Change text colors to dark equivalents
- Change primary color to dark color
- Reduce shadow intensity

## 🚀 Performance Tips

### Reduce Animation Count
Remove unnecessary animations:
```tsx
// Remove floating animation:
animate={{ y: [0, -8, 0] }}  →  animate={{ y: 0 }}
```

### Simplify Gradients
```tsx
// Complex:
bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600

// Simple:
bg-cyan-500
```

### Use Static Instead of Animated
```tsx
// Animated:
animate={{ rotate: 360 }}

// Static:
// (remove the animate prop)
```

## 🔍 Debugging Tips

### Check if Changes Applied
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Rebuild Tailwind: `npm run build`

### Test Changes
1. Change one thing at a time
2. Check browser DevTools for applied styles
3. Use console to inspect classes

---

**Note:** All hex color values can be found in the "Color Palette Reference" section above.
For more detailed explanations, see NAVBAR_IMPLEMENTATION_GUIDE.md or NAVBAR_DOCUMENTATION.md
