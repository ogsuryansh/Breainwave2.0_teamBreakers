# BrainWave 2.0 - Theme Design System

## Theme Name: "Midnight Engineer"
**Mode:** Dark Mode by default

---

## Color Palette

| Color Name | Hex Code | Purpose | Usage |
|-----------|----------|---------|-------|
| Primary | #00D1FF | Electric Blue - Energy ke liye | Main CTAs, buttons, highlights |
| Secondary | #7000FF | Deep Purple - Premium feel ke liye | Accents, hover states, secondary elements |
| Background | #0A0A0B | Jet Black - Modern look | Main background, base color |
| Accent | #FFD700 | Gold - Hustle/Winning milestones | Achievements, progress indicators, special highlights |

---

## Layout & Components

### 1. Bento Grid Layout
- **Purpose:** Dashboard-style layout for organizing content
- **Inspiration:** Apple, Notion
- **Content Sections:**
  - Roadmap (Skill Tree style)
  - Society Updates
  - CGPA Tracker

### 2. The "Hustle Meter"
- **Type:** Dynamic gauge/meter component
- **Behavior:** Moves based on user activity
- **Range:** "Chilling" → "Extreme Hustle"
- **Animation:** Smooth transitions, real-time updates

### 3. Interactive Roadmap
- **Style:** Gaming-style Skill Tree (NOT static list)
- **Mechanics:**
  - Unlock levels progressively
  - Level completion reveals next level
  - Visual progression tracking
  - Interactive nodes/milestones

### 4. Glassmorphism Design
- **Card Effect:** Transparent with blur
- **Backdrop:** Subtle transparency
- **Animations:** 
  - Purple/Blue gradient blobs moving in background
  - Smooth, fluid motion
  - Parallax effects optional

---

## Design Principles

1. **Modern & Energetic:** Electric blue primary color creates high energy
2. **Premium Feel:** Deep purple secondary adds sophistication
3. **Achievement Focused:** Gold accent highlights milestones and wins
4. **Dark Mode First:** Better for focus, eye-friendly for long sessions
5. **Gamification:** Skill trees, hustle meter, and levels make learning engaging
6. **Frosted Glass:** Glassmorphism gives depth and premium look

---

## Implementation Checklist

- [ ] Tailwind CSS custom color configuration
- [ ] Bento grid component structure
- [ ] Hustle Meter component with animations
- [ ] Interactive Roadmap/Skill Tree component
- [ ] Glassmorphism card component
- [ ] Background blob animations
- [ ] Dark mode variables
- [ ] Responsive design for mobile

---

## Tailwind Configuration Extension

```javascript
// In tailwind.config.js extend theme:
theme: {
  extend: {
    colors: {
      'midnight-primary': '#00D1FF',
      'midnight-secondary': '#7000FF',
      'midnight-bg': '#0A0A0B',
      'midnight-accent': '#FFD700',
    },
    animation: {
      'blob-float': 'blob-float 8s infinite',
      'hustle-pulse': 'hustle-pulse 2s ease-in-out',
    },
  }
}
```

---

## References & Inspiration

- **Bento Grid:** Apple.com, Notion dashboards
- **Skill Tree:** Gaming RPG progression systems
- **Glassmorphism:** Modern UI trend, frosted glass effect
- **Color Psychology:**
  - Electric Blue (#00D1FF): Energy, trust, innovation
  - Deep Purple (#7000FF): Luxury, creativity, wisdom
  - Jet Black (#0A0A0B): Sophistication, focus
  - Gold (#FFD700): Achievement, success, premium quality
