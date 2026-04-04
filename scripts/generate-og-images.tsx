/**
 * Generate per-page Open Graph images (1200 x 630) for social media sharing.
 *
 * Uses satori (JSX → SVG) + @resvg/resvg-js (SVG → PNG).
 * Runs at build time; outputs to public/og/.
 *
 * Design: dark navy background, CPACC Mastery branding, page title, subtitle.
 */

import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import React from 'react'
import { DOMAIN_PATHS, DOMAIN_PAGE_CONFIG } from '../src/config/domainConfig'
import { cpacc_topics } from '../src/data/topics'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.join(__dirname, '..')
const OUTPUT_DIR = path.join(ROOT, 'public', 'og')

// ---------------------------------------------------------------------------
// Font loading
// ---------------------------------------------------------------------------

const FONT_URLS = {
  regular: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf',
  semibold: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf',
}

async function loadFont(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch font: ${url}`)
  return response.arrayBuffer()
}

// ---------------------------------------------------------------------------
// Image template
// ---------------------------------------------------------------------------

const WIDTH = 1200
const HEIGHT = 630

// Colors (matching the site's dark mode palette)
const BG = '#0f172a'        // slate-900
const BRAND = '#38bdf8'     // sky-400
const TITLE = '#f1f5f9'     // slate-100
const SUBTITLE = '#94a3b8'  // slate-400
const ACCENT = '#0ea5e9'    // sky-500
const MUTED = '#64748b'     // slate-500

interface OgImageProps {
  title: string
  subtitle?: string
  label?: string
}

function OgImage({ title, subtitle, label }: OgImageProps) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: BG,
        padding: '60px 80px',
        fontFamily: 'Inter',
      }}
    >
      {/* Top: brand + optional label */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: ACCENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 600,
              color: '#fff',
            }}
          >
            C
          </div>
          <span style={{ fontSize: '22px', fontWeight: 600, color: BRAND }}>
            CPACC Mastery
          </span>
        </div>
        {label && (
          <span style={{ fontSize: '18px', color: MUTED, fontWeight: 400 }}>
            {label}
          </span>
        )}
      </div>

      {/* Middle: title + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
        <div
          style={{
            fontSize: title.length > 60 ? '38px' : title.length > 40 ? '44px' : '52px',
            fontWeight: 600,
            color: TITLE,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '22px', color: SUBTITLE, lineHeight: 1.4 }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Bottom: accent line + URL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '80px', height: '4px', backgroundColor: ACCENT, borderRadius: '2px' }} />
        <span style={{ fontSize: '18px', color: MUTED }}>
          cpaccmastery.com
        </span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page definitions
// ---------------------------------------------------------------------------

interface PageDef {
  slug: string
  title: string
  subtitle?: string
  label?: string
}

const DOMAIN_TITLES: Record<number, string> = {
  1: 'Disabilities, challenges & assistive technologies',
  2: 'Accessibility & universal design',
  3: 'Standards, laws & management strategies',
}

function getPages(): PageDef[] {
  const pages: PageDef[] = []

  // Home
  pages.push({
    slug: 'home',
    title: 'Free CPACC Study Guide & Practice Tests',
    subtitle: 'Prepare for your accessibility certification exam with expert content covering all 3 domains.',
  })

  // Practice hub
  pages.push({
    slug: 'cpacc-practice-test',
    title: 'CPACC Practice Tests',
    subtitle: 'Test your accessibility knowledge with exam-style questions. Quick, standard, or full-length formats.',
  })

  // About
  pages.push({
    slug: 'about',
    title: 'About the Creator',
    subtitle: 'Leo Bacevicius — product designer building accessible learning tools.',
  })

  // Domain overview pages
  for (const [num, domainPath] of Object.entries(DOMAIN_PATHS)) {
    const domainNumber = Number(num)
    const config = DOMAIN_PAGE_CONFIG[domainNumber]
    pages.push({
      slug: domainPath,
      title: config.seoTitle,
      subtitle: config.seoDescription,
    })
  }

  // Topic pages
  for (let i = 0; i < cpacc_topics.length; i++) {
    const domain = cpacc_topics[i]
    const domainNumber = i + 1
    const domainTitle = DOMAIN_TITLES[domainNumber]

    for (const topic of domain.topics) {
      if (topic.id.includes('-all')) continue
      pages.push({
        slug: topic.id,
        title: topic.title,
        subtitle: `Comprehensive study guide with examples and practice questions.`,
        label: `Domain ${domainNumber}: ${domainTitle}`,
      })
    }
  }

  // Legal pages
  pages.push({ slug: 'privacy', title: 'Privacy Policy' })
  pages.push({ slug: 'terms', title: 'Terms of Use' })
  pages.push({ slug: 'accessibility', title: 'Accessibility Statement' })

  return pages
}

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

async function generateImage(
  page: PageDef,
  fonts: { regular: ArrayBuffer; semibold: ArrayBuffer },
): Promise<void> {
  const element = React.createElement(OgImage, {
    title: page.title,
    subtitle: page.subtitle,
    label: page.label,
  })

  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Inter', data: fonts.regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: fonts.semibold, weight: 600, style: 'normal' },
    ],
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  })
  const png = resvg.render().asPng()

  const outputPath = path.join(OUTPUT_DIR, `${page.slug}.png`)
  fs.writeFileSync(outputPath, png)
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Load fonts
  console.log('Loading fonts...')
  const [regular, semibold] = await Promise.all([
    loadFont(FONT_URLS.regular),
    loadFont(FONT_URLS.semibold),
  ])
  const fonts = { regular, semibold }

  // Generate images
  const pages = getPages()
  console.log(`Generating ${pages.length} OG images...`)

  for (const page of pages) {
    await generateImage(page, fonts)
  }

  console.log(`OG images generated successfully!`)
  console.log(`Location: ${OUTPUT_DIR}`)
  console.log(`Total images: ${pages.length}`)
}

main().catch((err) => {
  console.error('Error generating OG images:', err)
  process.exit(1)
})
