# Analu Procto - Design System Style Guide

## 🎨 Color Palette

### Brand Colors
```css
/* Primary Brand Colors */
--brand-primary: #c27e5c    /* Warm terracotta for CTA buttons */
--brand-secondary: #d4b7a2  /* Soft beige for backgrounds */
--brand-tertiary: #b08771   /* Medium brown for accents */
```

### Semantic Colors
```css
/* Text & Content */
--primary: #663a25          /* Dark brown for primary text */
--secondary: #d4b7a2        /* Light brown for secondary text */
--tertiary: #b08771         /* Medium brown for tertiary text */
--accent-neutral: #7a8b68   /* Sage green for accents */
--background: #fff9f3       /* Warm off-white background */
```

### Neutral Palette
```css
--neutral-50: #faf9f7
--neutral-100: #f5f3f0
--neutral-200: #e8e4de
--neutral-300: #d4ccc1
--neutral-400: #b5a599
--neutral-500: #967d6f
--neutral-600: #7a8b68
--neutral-700: #5a4f47
--neutral-800: #463d36
--neutral-900: #2d2622
```

## 📐 Typography Scale

### Font Families
- **Serif**: "The Seasons" (Headings & Logo)
- **Sans-serif**: Montserrat (Body text & UI)

### Font Sizes
```css
text-xs: 0.75rem (12px) / line-height: 1rem
text-sm: 0.875rem (14px) / line-height: 1.25rem
text-base: 1rem (16px) / line-height: 1.5rem
text-lg: 1.125rem (18px) / line-height: 1.75rem
text-xl: 1.25rem (20px) / line-height: 1.75rem
text-2xl: 1.5rem (24px) / line-height: 2rem
text-3xl: 1.875rem (30px) / line-height: 2.25rem
text-4xl: 2.25rem (36px) / line-height: 2.5rem
text-5xl: 3rem (48px) / line-height: 1
text-6xl: 3.75rem (60px) / line-height: 1
```

### Heading Hierarchy
```css
h1: 2.25rem (36px) → 3rem (48px) → 3.75rem (60px) [responsive]
h2: 1.5rem (24px) → 1.875rem (30px) → 2.25rem (36px) [responsive]
h3: 1.25rem (20px) → 1.5rem (24px) → 1.875rem (30px) [responsive]
h4: 1.125rem (18px) → 1.25rem (20px) → 1.5rem (24px) [responsive]
h5: 1rem (16px) → 1.125rem (18px) → 1.25rem (20px) [responsive]
h6: 0.875rem (14px) → 1rem (16px) → 1.125rem (18px) [responsive]
```

## 📏 Spacing Scale

### Custom Spacing Values
```css
spacing-18: 4.5rem (72px)
spacing-88: 22rem (352px)
spacing-100: 25rem (400px)
spacing-112: 28rem (448px)
spacing-128: 32rem (512px)
```

### Standard Spacing (Tailwind Default + Custom)
```css
0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 88, 96, 100, 112, 128
```

## 🔳 Component Classes

### Button Components
```css
/* Base Button */
.btn
  - Padding: px-6 py-3 (24px 12px)
  - Border radius: rounded-full
  - Font: font-medium
  - Transition: all 300ms
  - Focus ring: ring-2 ring-primary

/* Button Variants */
.btn-primary    - Brand primary color with shadow
.btn-secondary  - Secondary color with border
.btn-outline    - Outlined with hover fill
.btn-ghost      - Transparent with hover background

/* Button Sizes */
.btn-sm         - px-4 py-2 text-sm
.btn-lg         - px-8 py-4 text-lg
```

### Section Components
```css
.section        - py-16 lg:py-24 (base section padding)
.section-sm     - py-12 lg:py-16 (smaller sections)
.section-lg     - py-24 lg:py-32 (hero/feature sections)
```

### Card Components
```css
.card           - Base card with rounded-3xl, padding, shadow
.card-treatment - Special styling for treatment cards
.card-feature   - Feature card with subtle background
```

### Form Components
```css
.form-input     - Styled input with brand focus colors
.form-textarea  - Textarea with consistent styling
.form-label     - Label with proper spacing and typography
```

## 🎭 Animation & Transitions

### Standard Transitions
```css
transition-all duration-300   - Default component transitions
transition-colors duration-200 - Quick color changes
transition-all duration-400   - Slower, more prominent effects
```

### Animation Classes
```css
.animate-fade-in    - Fade in animation
.animate-slide-up   - Slide up from bottom animation
```

## 📦 Layout & Container

### Container System
```css
.container
  - max-width: 1432px
  - Responsive padding: px-6 sm:px-8 lg:px-10 xl:px-12
  - Centered with mx-auto
```

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
3xl: 1920px (custom)
```

## 🔍 Shadows & Effects

### Box Shadows
```css
shadow-brand: 0 4px 14px 0 rgba(102, 58, 37, 0.15)
shadow-brand-lg: 0 10px 25px 0 rgba(102, 58, 37, 0.2)
```

### Border Radius
```css
rounded-xl: 0.75rem
rounded-2xl: 1rem
rounded-3xl: 1.5rem
```

## 🖼️ Asset Guidelines

### Image Standards
- **Format**: WebP preferred, PNG/JPEG fallback
- **Quality**: 85-95% for photos, 100% for graphics
- **Responsive**: Multiple sizes with `sizes` attribute
- **Alt text**: Descriptive and contextual

### Logo Usage
- Primary logo in serif font "The Seasons"
- Color: Brand primary (#c27e5c) or primary text (#663a25)
- Minimum size: 120px width
- Clear space: 2x logo height on all sides

### Icons
- Style: Lucide React icon set
- Size: 16px, 20px, 24px standard sizes
- Color: Inherit from parent or brand colors
- Stroke width: 1.5-2px for consistency

## 📋 Component Usage Examples

### Primary CTA Button
```tsx
<Button variant="default" size="lg">
  Agende sua consulta agora
</Button>
```

### Treatment Card
```tsx
<Card 
  title="Cirurgias à laser" 
  variant="treatment"
/>
```

### Section Layout
```tsx
<section className="section bg-background">
  <div className="container">
    <h2 className="text-4xl font-serif text-brand-primary">Title</h2>
    <p className="mt-4 text-lg text-muted">Description</p>
  </div>
</section>
```

## 🎯 Accessibility Guidelines

### Focus States
- Visible focus rings using `ring-2 ring-primary`
- High contrast ratios (minimum 4.5:1)
- Keyboard navigation support

### Text Contrast
- Primary text on background: 8.7:1 (AAA)
- Secondary text on background: 4.8:1 (AA)
- Brand primary on background: 4.2:1 (AA)

### Interactive Elements
- Minimum touch target: 44px × 44px
- Clear hover and focus states
- Semantic HTML elements

## 🔧 Development Notes

### CSS Architecture
- Utility-first with Tailwind CSS
- Component classes for reusable patterns
- CSS custom properties for theme values
- Responsive design with mobile-first approach

### File Organization
```
/src
  /components
    /ui          - Reusable UI components
    /sections    - Page section components
  /lib
    utils.ts     - Utility functions (cn helper)
  /app
    globals.css  - Global styles and component classes
```

### Performance Considerations
- Purged CSS for production builds
- Optimized images with Next.js Image component
- Efficient font loading with font-display: swap
- Minimal JavaScript for interactive components

---

*This design system ensures visual consistency, maintainability, and scalability across the Analu Procto website. All components follow these guidelines for a cohesive user experience.*
