#!/usr/bin/env node

/**
 * Generate CSS Variables from Design Tokens
 * 
 * This script generates a static CSS file containing all design token CSS variables
 * for both light and dark modes. The generated file is imported by index.css.
 * 
 * Run: npm run generate:css-vars
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Read the cssVariables.ts file and execute the generation function
const cssVariablesPath = resolve(__dirname, '../src/design-system/tokens/colors/cssVariables.ts')
const indexPath = resolve(__dirname, '../src/design-system/tokens/index.ts')

// Import the TypeScript files dynamically by reading and evaluating
// This is a workaround since we're in a JS script but importing TS modules
const { execSync } = await import('child_process')

try {
  // Use node to run TypeScript directly via import
  const scriptContent = `
    import { generateCompleteCSSString } from './src/design-system/tokens/colors/cssVariables.js';
    console.log(generateCompleteCSSString());
  `
  
  // Write temporary script
  const tempScriptPath = resolve(__dirname, '../temp-generate.mjs')
  writeFileSync(tempScriptPath, scriptContent, 'utf-8')
  
  // Run with node --loader to handle TS
  const cssString = execSync(`node --loader tsx ${tempScriptPath}`, { 
    cwd: resolve(__dirname, '..'),
    encoding: 'utf-8'
  })
  
  // Clean up temp file
  execSync(`rm ${tempScriptPath}`)
  
  const outputPath = resolve(__dirname, '../src/generated-css-variables.css')
  writeFileSync(outputPath, cssString, 'utf-8')
  
  console.log('✅ Generated CSS variables file:', outputPath)
  console.log('📝 Variables generated for light and dark modes')
} catch (error) {
  console.error('❌ Failed to generate CSS variables:', error.message)
  process.exit(1)
}
