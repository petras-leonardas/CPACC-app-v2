#!/usr/bin/env tsx

/**
 * Generate CSS Variables from Design Tokens
 * 
 * This script generates a static CSS file containing all design token CSS variables
 * for both light and dark modes. The generated file is imported by index.css.
 * 
 * Run: npm run generate:css-vars
 */

import { generateCompleteCSSString } from '../src/design-system/tokens/colors/cssVariables'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const cssString = generateCompleteCSSString()
const outputPath = resolve(__dirname, '../src/generated-css-variables.css')

writeFileSync(outputPath, cssString, 'utf-8')

console.log('✅ Generated CSS variables file:', outputPath)
console.log('📝 Variables generated for light and dark modes')
