/**
 * Domain configuration for CPACC topics
 * Contains domain titles, paths, and metadata
 */

export interface DomainConfig {
  id: number
  title: string
  path: string
}

/**
 * Domain titles mapped by domain number
 */
export const DOMAIN_TITLES: Record<number, string> = {
  1: 'Disabilities, challenges & assistive technologies',
  2: 'Accessibility & universal design',
  3: 'Standards, laws & management strategies'
}

/**
 * Domain URL paths mapped by domain number
 */
export const DOMAIN_PATHS: Record<number, string> = {
  1: 'disabilities-challenges-assistive-technology',
  2: 'accessibility-universal-design',
  3: 'standards-laws-management-strategies'
}

/**
 * Get domain configuration by domain number
 */
export function getDomainConfig(domainNumber: number): DomainConfig | null {
  const title = DOMAIN_TITLES[domainNumber]
  const path = DOMAIN_PATHS[domainNumber]
  
  if (!title || !path) return null
  
  return {
    id: domainNumber,
    title,
    path
  }
}

/**
 * Get all domain configurations
 */
export function getAllDomains(): DomainConfig[] {
  return [1, 2, 3].map(num => getDomainConfig(num)).filter(Boolean) as DomainConfig[]
}
