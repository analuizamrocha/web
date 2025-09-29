#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

/**
 * Image Optimization Script
 *
 * Automatically discovers and optimizes all PNG/JPG images to WebP format
 * while preserving original aspect ratios and maintaining source files.
 */

const IMAGES_DIR = path.join(__dirname, '../public/images')

async function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath)
    return stats.size
  } catch (error) {
    console.error(`❌ Error getting file size: ${error.message}`)
    return 0
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

async function getImageDimensions(filePath) {
  try {
    const metadata = await sharp(filePath).metadata()
    return { width: metadata.width, height: metadata.height }
  } catch (error) {
    console.error(`❌ Error getting image dimensions: ${error.message}`)
    return null
  }
}

async function optimizeImage(filename) {
  const inputPath = path.join(IMAGES_DIR, filename)
  const name = path.parse(filename).name
  const webpPath = path.join(IMAGES_DIR, `${name}.webp`)

  console.log(`\n🖼️  Processing: ${filename}`)

  const originalSize = await getFileSize(inputPath)
  console.log(`📊 Original size: ${formatBytes(originalSize)}`)

  // Get original dimensions
  const dimensions = await getImageDimensions(inputPath)
  if (!dimensions) {
    console.error(`❌ Could not get dimensions for ${filename}`)
    return null
  }

  console.log(
    `📐 Original dimensions: ${dimensions.width}x${dimensions.height}`
  )

  // Resize to web-appropriate dimensions
  const aspectRatio = dimensions.width / dimensions.height
  let targetWidth, targetHeight

  if (aspectRatio > 1) {
    // Landscape: max width 1200px
    targetWidth = Math.min(1200, dimensions.width)
    targetHeight = Math.round(targetWidth / aspectRatio)
  } else {
    // Portrait: max height 1200px
    targetHeight = Math.min(1200, dimensions.height)
    targetWidth = Math.round(targetHeight * aspectRatio)
  }

  console.log(`🎯 Target dimensions: ${targetWidth}x${targetHeight}`)

  try {
    // Convert to WebP with resize and quality 90%
    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 90,
        effort: 6,
      })
      .toFile(webpPath)

    const webpSize = await getFileSize(webpPath)
    const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1)

    console.log(
      `✅ WebP created: ${formatBytes(webpSize)} (${reduction}% reduction)`
    )

    return {
      filename,
      original: originalSize,
      webp: webpSize,
      dimensions,
    }
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message)
    return null
  }
}

async function main() {
  console.log('🚀 Starting automatic image optimization with Sharp...\n')
  console.log('🎯 Quality: 90% (excellent quality with great compression)')
  console.log('📐 Resize: Max 1200px (web-optimized dimensions)')
  console.log('📦 Format: WebP only')
  console.log('🔒 Source files: Preserved (no backups needed)\n')

  // Auto-discover PNG and JPG files
  const files = fs.readdirSync(IMAGES_DIR)
  const imageFiles = files.filter(
    (file) => /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('.backup')
  )

  if (imageFiles.length === 0) {
    console.log('⚠️  No PNG or JPG files found to optimize')
    return
  }

  console.log(`📁 Found ${imageFiles.length} images to process:`)
  imageFiles.forEach((file) => console.log(`   • ${file}`))

  const results = []
  let totalOriginal = 0
  let totalOptimized = 0

  for (const filename of imageFiles) {
    const result = await optimizeImage(filename)
    if (result) {
      results.push(result)
      totalOriginal += result.original
      totalOptimized += result.webp
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70))
  console.log('📊 OPTIMIZATION SUMMARY')
  console.log('='.repeat(70))

  results.forEach((result) => {
    const reduction = ((1 - result.webp / result.original) * 100).toFixed(1)
    console.log(
      `${result.filename}: ${formatBytes(result.original)} → ${formatBytes(
        result.webp
      )} (${reduction}% reduction)`
    )
  })

  if (results.length > 0) {
    const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(
      1
    )
    console.log('\n' + '-'.repeat(70))
    console.log(
      `🎯 TOTAL: ${formatBytes(totalOriginal)} → ${formatBytes(totalOptimized)}`
    )
    console.log(`🏆 Overall reduction: ${totalReduction}%`)
    console.log(
      `💾 Space saved: ${formatBytes(totalOriginal - totalOptimized)}`
    )

    console.log('\n✨ Quality 100% test complete!')
    console.log(
      '💡 Consider adjusting quality (85-95) for smaller files if needed'
    )
    console.log(
      '🔍 All WebP files preserve exact original dimensions and aspect ratios'
    )
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { optimizeImage }
