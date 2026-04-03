import { DOMAIN_TITLES, DOMAIN_PATHS, DOMAIN_PAGE_CONFIG } from '../domainConfig'
import type { DomainPageConfig } from '../domainConfig'

describe('DOMAIN_TITLES', () => {
  it('has entries for domains 1, 2, and 3', () => {
    expect(DOMAIN_TITLES[1]).toBeDefined()
    expect(DOMAIN_TITLES[2]).toBeDefined()
    expect(DOMAIN_TITLES[3]).toBeDefined()
  })

  it('has non-empty string values', () => {
    expect(typeof DOMAIN_TITLES[1]).toBe('string')
    expect(DOMAIN_TITLES[1].length).toBeGreaterThan(0)
    expect(typeof DOMAIN_TITLES[2]).toBe('string')
    expect(DOMAIN_TITLES[2].length).toBeGreaterThan(0)
    expect(typeof DOMAIN_TITLES[3]).toBe('string')
    expect(DOMAIN_TITLES[3].length).toBeGreaterThan(0)
  })
})

describe('DOMAIN_PATHS', () => {
  it('has entries for domains 1, 2, and 3', () => {
    expect(DOMAIN_PATHS[1]).toBeDefined()
    expect(DOMAIN_PATHS[2]).toBeDefined()
    expect(DOMAIN_PATHS[3]).toBeDefined()
  })

  it('has URL-safe paths (lowercase, no spaces)', () => {
    Object.values(DOMAIN_PATHS).forEach(path => {
      expect(path).toBe(path.toLowerCase())
      expect(path).not.toMatch(/\s/)
    })
  })

  it('uses only lowercase letters and hyphens', () => {
    Object.values(DOMAIN_PATHS).forEach(path => {
      expect(path).toMatch(/^[a-z-]+$/)
    })
  })
})

describe('DOMAIN_PAGE_CONFIG', () => {
  it('has entries for domains 1, 2, and 3', () => {
    expect(DOMAIN_PAGE_CONFIG[1]).toBeDefined()
    expect(DOMAIN_PAGE_CONFIG[2]).toBeDefined()
    expect(DOMAIN_PAGE_CONFIG[3]).toBeDefined()
  })

  const requiredFields: (keyof DomainPageConfig)[] = [
    'pageTrackingName',
    'seoTitle',
    'seoDescription',
    'examWeight',
    'introParagraphs',
  ]

  it.each([1, 2, 3])('domain %i config has all required fields', (domain) => {
    const config = DOMAIN_PAGE_CONFIG[domain]
    requiredFields.forEach(field => {
      expect(config[field]).toBeDefined()
    })
  })

  it.each([1, 2, 3])('domain %i has non-empty string fields', (domain) => {
    const config = DOMAIN_PAGE_CONFIG[domain]
    expect(config.pageTrackingName.length).toBeGreaterThan(0)
    expect(config.seoTitle.length).toBeGreaterThan(0)
    expect(config.seoDescription.length).toBeGreaterThan(0)
    expect(config.examWeight.length).toBeGreaterThan(0)
  })

  it.each([1, 2, 3])('domain %i introParagraphs has exactly 3 entries', (domain) => {
    const config = DOMAIN_PAGE_CONFIG[domain]
    expect(config.introParagraphs).toHaveLength(3)
  })

  it.each([1, 2, 3])('domain %i introParagraphs are all non-empty strings', (domain) => {
    const config = DOMAIN_PAGE_CONFIG[domain]
    config.introParagraphs.forEach(paragraph => {
      expect(typeof paragraph).toBe('string')
      expect(paragraph.length).toBeGreaterThan(0)
    })
  })

  it('domain 1 and 2 have ~40% exam weight, domain 3 has ~20%', () => {
    expect(DOMAIN_PAGE_CONFIG[1].examWeight).toContain('40%')
    expect(DOMAIN_PAGE_CONFIG[2].examWeight).toContain('40%')
    expect(DOMAIN_PAGE_CONFIG[3].examWeight).toContain('20%')
  })
})
