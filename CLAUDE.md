# Portfolio Website Implementation

## Overview
A unique, creative portfolio website built with Astro 5, React 19, and Tailwind CSS 4, inspired by modern developer portfolio best practices but with original design and implementation.

## Design System

### Color Palette
The website uses a deep purple/violet theme for uniqueness while maintaining professional aesthetics:

- **Background Colors:**
  - Primary: `#0a0a1a` (Deep dark blue-black)
  - Secondary: `#12122a` (Slightly lighter dark)
  - Tertiary: `#1a1a3a` (Card/section backgrounds)

- **Accent Colors:**
  - Primary: `#a78bfa` (Soft purple/violet)
  - Secondary: `#c4b5fd` (Lighter violet)
  - Glow: `rgba(167, 139, 250, 0.4)` (For hover effects)

- **Text Colors:**
  - Primary: `#e2e8f0` (Light slate)
  - Secondary: `#94a3b8` (Medium slate)
  - Muted: `#64748b` (Darker slate)

### Typography
- **Body:** Sans-serif system fonts for readability
- **Monospace:** For code-like elements (section numbers, tech stack)
- **Sizes:** Responsive scale from mobile to desktop

## Component Architecture

### Layout Components
- **Layout.astro:** Main layout wrapper with header, footer, and sidebars
  - Sticky navigation with backdrop blur
  - Left sidebar: Social media links
  - Right sidebar: Email contact (vertical text)
  - Skip to content link for accessibility

### Section Components
1. **Hero.astro:** Landing section with staggered fade-in animations
2. **About.astro:** Bio, skills grid, and profile image with hover effects
3. **Experience.astro:** Container for the tabs component
4. **ExperienceTabs.tsx:** Interactive React component with tabbed work history
5. **Projects.astro:** Featured projects with alternating layouts
6. **Contact.astro:** Call-to-action with email link

### Interactive Components (React)
- **ExperienceTabs.tsx:** Manages state for job history display with ARIA support
- **MobileMenu.tsx:** Hamburger menu for mobile navigation with smooth transitions

## Key Features

### Accessibility
- Skip to content link
- ARIA labels and roles
- Semantic HTML throughout
- Keyboard navigation support
- Focus-visible styles
- Reduced motion support (respects `prefers-reduced-motion`)

### Performance
- Static site generation with Astro
- React components loaded only where needed (`client:load`)
- Optimized CSS with Tailwind CSS 4
- Minimal JavaScript for core functionality

### Responsiveness
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile hamburger menu
- Adaptive layouts for all sections
- Hidden sidebars on mobile/tablet

### Animations & Interactions
- Fade-in-up animation for Hero section elements
- Hover effects on links, buttons, and project cards
- Smooth scrolling to anchor sections
- Custom scrollbar styling
- Glow effects on interactive elements

## Unique Design Elements

1. **Logo:** Custom HTML entity brackets `<PS/>` instead of traditional logo
2. **Section Numbers:** Monospace numbered prefixes (01., 02., etc.)
3. **Color Scheme:** Purple/violet theme instead of common teal/green
4. **Project Layout:** Alternating left/right featured project cards
5. **Profile Image:** Decorative border with offset background effect

## File Structure
```
pawel-portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── ExperienceTabs.tsx
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   └── MobileMenu.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── CLAUDE.md (this file)
```

## Technologies Used
- **Astro 5.14.1:** Static site generation and routing
- **React 19.2.0:** Interactive components
- **Tailwind CSS 4.1.14:** Utility-first styling
- **TypeScript:** Type safety for React components

## Customization Guide

### Updating Content
1. **Hero:** Edit `src/components/Hero.astro` for intro text
2. **About:** Update bio and skills in `src/components/About.astro`
3. **Experience:** Modify jobs array in `src/components/ExperienceTabs.tsx`
4. **Projects:** Edit project data in `src/components/Projects.astro`
5. **Contact:** Change email in `src/components/Contact.astro` and Layout sidebar

### Changing Colors
Update CSS variables in `src/styles/global.css` under `:root`

### Adding Sections
1. Create new component in `src/components/`
2. Import and add to `src/pages/index.astro`
3. Add navigation link to header and mobile menu

## Accessibility Compliance
- **WCAG 2.1 AA compliant** color contrast ratios
- **Keyboard navigation** fully supported
- **Screen reader friendly** with semantic HTML and ARIA labels
- **Focus indicators** visible on all interactive elements
- **Skip links** for easy navigation
- **Responsive to motion preferences**

## Next Steps / Enhancements
- Add actual profile image (replace placeholder)
- Create resume PDF
- Add real project screenshots/images
- Implement scroll-triggered animations with Intersection Observer
- Add blog section (optional)
- Set up analytics
- Add dark/light mode toggle (optional)
- Implement project filtering by technology

## Running Locally
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Notes
- All social media and project links are placeholders and should be updated
- Email address should be changed to actual contact email
- Resume link points to `/resume.pdf` (needs to be added to `public/`)
- Color system uses CSS custom properties for easy theming
- Mobile menu uses React state to manage open/close behavior
