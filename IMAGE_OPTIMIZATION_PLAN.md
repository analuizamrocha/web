# Image Optimization Plan

## Critical Issues Found

Current image sizes are severely impacting performance:

- `hero.png`: **19MB**
- `front.jpg`: **15MB**
- `side.jpg`: **14MB**
- Total: **48MB** of critical images

## Target Optimizations

### 1. Hero Image (`hero.png` - 19MB)

- **Target size**: < 200KB
- **Recommended format**: WebP with JPEG fallback
- **Optimization strategy**:
  - Resize to appropriate display dimensions
  - Compress to 85% quality WebP
  - Implement responsive images with `next/image`

### 2. Front & Side Images (`front.jpg`, `side.jpg` - 15MB, 14MB)

- **Target size**: < 150KB each
- **Recommended format**: WebP with JPEG fallback
- **Optimization strategy**:
  - Resize for actual display context
  - Use progressive JPEG as fallback
  - Implement lazy loading

## Implementation Steps

1. **Analyze actual display dimensions** in components
2. **Use image optimization tools**:
   - `sharp` for Node.js automation
   - `imagemin` for build-time optimization
   - Online tools like TinyPNG as backup
3. **Implement Next.js Image Optimization**:
   - Configure `next.config.js` for WebP
   - Add responsive `sizes` attribute
   - Enable blur placeholder for UX
4. **Validate Core Web Vitals improvement**:
   - Test LCP (Largest Contentful Paint)
   - Monitor CLS (Cumulative Layout Shift)

## Expected Results

- **Performance**: 95%+ reduction in image payload
- **LCP improvement**: Sub-2.5s loading
- **SEO boost**: Better Core Web Vitals scores
- **User experience**: Faster page loads on mobile

## Priority: CRITICAL

These optimizations should be the next major performance improvement task.
