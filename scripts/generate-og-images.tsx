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
          {/* CPACC Mastery logo SVG */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Person head */}
            <path
              d="M17.9475 0.868025C14.0901 2.77765 14.3193 8.35374 18.2913 10.4161C20.5064 11.5619 23.4854 10.6835 24.9368 8.43012C25.8152 7.09339 25.8152 4.11438 24.9368 2.77765C23.4473 0.447909 20.4301 -0.354132 17.9475 0.868025Z"
              fill="#F39C52"
            />
            {/* Person body/shoulders */}
            <path
              d="M17.4511 12.0957C14.3193 12.5159 12.1423 13.2033 9.77438 14.4637C7.29188 15.7622 4.12191 18.7794 4.6566 19.3141C5.11491 19.7342 10.1945 21.2619 11.1493 21.2619C11.493 21.2619 12.3333 20.8418 12.9444 20.3071C15.4269 18.2065 17.0309 17.6336 20.5065 17.6336C23.982 17.6336 25.1659 18.0538 27.763 20.1543C28.4887 20.7654 29.3289 21.2619 29.6726 21.2619C30.5129 21.2619 35.898 19.6578 36.3563 19.2759C36.891 18.8176 33.1481 15.4949 30.7038 14.2727C26.8082 12.4013 21.5376 11.5228 17.4511 12.0957Z"
              fill="#F39C52"
            />
            {/* Left book page */}
            <path
              d="M3.1289 22.4844C3.01432 22.79 2.97613 25.7308 3.01432 29.0917L3.1289 35.1643L10.3855 37.3795C14.3957 38.6016 17.9476 39.5946 18.3295 39.5946C18.9024 39.5946 18.9788 39.0599 18.9788 33.6748C18.9788 28.0223 18.9406 27.6786 18.1385 26.8766C17.5274 26.2655 15.2359 25.4252 10.7674 24.1649C7.21549 23.1337 4.04552 22.2171 3.81636 22.1407C3.54902 22.0261 3.24348 22.1789 3.1289 22.4844Z"
              fill="#6B7399"
            />
            {/* Right book page */}
            <path
              d="M35.2105 22.5993C34.3703 22.9049 31.4677 23.7833 28.7178 24.5472C25.0132 25.6165 23.4855 26.2658 22.7216 27.0297L21.6522 28.0609V33.8279C21.6522 36.9597 21.805 39.6332 21.9578 39.7477C22.1105 39.8241 25.7006 38.8311 29.8636 37.5326L37.5021 35.1646V28.7101C37.5021 24.7381 37.3493 22.2556 37.1202 22.1792C36.9292 22.141 36.0508 22.332 35.2105 22.5993Z"
              fill="#92C5CC"
            />
          </svg>
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
