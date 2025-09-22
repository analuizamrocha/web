#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Image Optimization Script
 * 
 * Optimizes large images using Sharp to dramatically reduce file sizes
 * while maintaining visual quality.
 * 
 * Target reductions:
 * - hero.png: 19MB → ~150KB (99.2% reduction)
 * - front.jpg: 15MB → ~120KB (99.2% reduction) 
 * - side.jpg: 14MB → ~120KB (99.1% reduction)
 */

const IMAGES_DIR = path.join(__dirname, '../public/images');

const optimizationConfig = {
  'hero.png': {
    variants: [
      {
        suffix: '-mobile',
        width: 828,
        height: 828,
        webpQuality: 85,
        jpegQuality: 80,
        description: 'Hero section mobile image'
      },
      {
        suffix: '',
        width: 1200,
        height: 1200,
        webpQuality: 85,
        jpegQuality: 80,
        description: 'Hero section desktop image'
      }
    ]
  },
  'front.jpg': {
    width: 800,
    height: 1000, // 4:5 aspect ratio
    webpQuality: 85,
    jpegQuality: 80,
    description: 'Front profile photo'
  },
  'side.jpg': {
    width: 800,
    height: 1000, // 4:5 aspect ratio  
    webpQuality: 85,
    jpegQuality: 80,
    description: 'Side profile photo'
  }
};

async function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function optimizeImage(filename, config) {
  const inputPath = path.join(IMAGES_DIR, filename);
  const name = path.parse(filename).name;
  
  // Create backup if it doesn't exist
  const backupPath = path.join(IMAGES_DIR, `${filename}.backup`);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
    console.log(`✅ Created backup: ${filename}.backup`);
  }
  
  const originalSize = await getFileSize(inputPath);
  console.log(`\n🖼️  Processing: ${filename}`);
  console.log(`📊 Original size: ${formatBytes(originalSize)}`);
  
  // Handle single config or variants
  const variants = config.variants || [config];
  const results = [];
  
  try {
    for (const variant of variants) {
      const suffix = variant.suffix || '';
      const webpPath = path.join(IMAGES_DIR, `${name}${suffix}.webp`);
      const jpegPath = path.join(IMAGES_DIR, `${name}${suffix}-optimized.jpg`);
      
      console.log(`  🔄 Creating variant: ${variant.description}`);
      
      // Generate WebP version
      await sharp(inputPath)
        .resize(variant.width, variant.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: variant.webpQuality, effort: 6 })
        .toFile(webpPath);
      
      const webpSize = await getFileSize(webpPath);
      
      // Generate JPEG fallback
      await sharp(inputPath)
        .resize(variant.width, variant.height, {
          fit: 'cover', 
          position: 'center'
        })
        .jpeg({ 
          quality: variant.jpegQuality, 
          progressive: true,
          mozjpeg: true 
        })
        .toFile(jpegPath);
      
      const jpegSize = await getFileSize(jpegPath);
      
      console.log(`    ✅ WebP: ${formatBytes(webpSize)} (${((1 - webpSize/originalSize) * 100).toFixed(1)}% reduction)`);
      console.log(`    ✅ JPEG: ${formatBytes(jpegSize)} (${((1 - jpegSize/originalSize) * 100).toFixed(1)}% reduction)`);
      
      results.push({
        variant: suffix,
        webp: webpSize,
        jpeg: jpegSize
      });
    }
    
    return {
      original: originalSize,
      variants: results,
      filename
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting image optimization with Sharp...\n');
  
  const results = [];
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const [filename, config] of Object.entries(optimizationConfig)) {
    const filePath = path.join(IMAGES_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${filename} - file not found`);
      continue;
    }
    
    const result = await optimizeImage(filename, config);
    if (result) {
      results.push(result);
      totalOriginal += result.original;
      
      // For variants, sum the smallest format of each variant
      if (result.variants) {
        result.variants.forEach(variant => {
          totalOptimized += Math.min(variant.webp, variant.jpeg);
        });
      } else {
        totalOptimized += Math.min(result.webp, result.jpeg);
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  
  results.forEach(result => {
    const bestSize = Math.min(result.webp, result.jpeg);
    const reduction = ((1 - bestSize/result.original) * 100).toFixed(1);
    console.log(`${result.filename}: ${formatBytes(result.original)} → ${formatBytes(bestSize)} (${reduction}% reduction)`);
  });
  
  const totalReduction = ((1 - totalOptimized/totalOriginal) * 100).toFixed(1);
  console.log('\n' + '-'.repeat(60));
  console.log(`🎯 TOTAL: ${formatBytes(totalOriginal)} → ${formatBytes(totalOptimized)}`);
  console.log(`🏆 Overall reduction: ${totalReduction}%`);
  console.log(`💾 Space saved: ${formatBytes(totalOriginal - totalOptimized)}`);
  
  console.log('\n✨ Next steps:');
  console.log('1. Update components to use .webp format with .jpg fallback');
  console.log('2. Test the optimized images in your application');
  console.log('3. Remove .backup files once you\'re satisfied with results');
  console.log('4. Run lighthouse audit to verify Core Web Vitals improvement');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, optimizationConfig };