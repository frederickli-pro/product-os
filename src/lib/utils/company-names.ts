/**
 * Company names utility for configurable display names.
 * Owner: Scenario 11 - Environment Configuration
 *
 * Provides utilities for handling configurable company names throughout the interface.
 * All actual company names (Vista, Portside, etc.) are replaced with configurable values.
 *
 * This module builds on env-config.ts to provide:
 * - Template string replacement for company names
 * - Display formatting utilities
 * - Type-safe company name access
 */

import {
  getPEFirmName,
  getPortfolioCoName,
  getProductName,
  getDeveloperName,
  getCEOName,
  ENV_DEFAULTS,
} from './env-config'

/**
 * Company name placeholder patterns for template replacement.
 * These are the patterns that can be replaced in template strings.
 */
export const COMPANY_PLACEHOLDERS = {
  PE_FIRM: '{{PE_FIRM}}',
  PORTFOLIO_CO: '{{PORTFOLIO_CO}}',
  PRODUCT: '{{PRODUCT}}',
  DEVELOPER: '{{DEVELOPER}}',
  CEO: '{{CEO}}',
} as const

/**
 * Replace company name placeholders in a template string.
 *
 * Example:
 * ```typescript
 * const template = "Welcome to {{PE_FIRM}}'s {{PRODUCT}} demo"
 * const result = replaceCompanyNames(template)
 * // Result: "Welcome to [PE Firm]'s [Software] demo"
 * ```
 */
export function replaceCompanyNames(template: string): string {
  return template
    .replace(new RegExp(COMPANY_PLACEHOLDERS.PE_FIRM, 'g'), getPEFirmName())
    .replace(new RegExp(COMPANY_PLACEHOLDERS.PORTFOLIO_CO, 'g'), getPortfolioCoName())
    .replace(new RegExp(COMPANY_PLACEHOLDERS.PRODUCT, 'g'), getProductName())
    .replace(new RegExp(COMPANY_PLACEHOLDERS.DEVELOPER, 'g'), getDeveloperName())
    .replace(new RegExp(COMPANY_PLACEHOLDERS.CEO, 'g'), getCEOName())
}

/**
 * Get the display name for the PE firm.
 * Use this in UI components for consistent company name display.
 */
export function displayPEFirmName(): string {
  return getPEFirmName()
}

/**
 * Get the display name for the portfolio company.
 * Use this in UI components for consistent company name display.
 */
export function displayPortfolioCoName(): string {
  return getPortfolioCoName()
}

/**
 * Get the display name for the product/software.
 * Use this in UI components for consistent product name display.
 */
export function displayProductName(): string {
  return getProductName()
}

/**
 * Get the display name for the developer.
 * Use this in UI components where developer name is shown.
 */
export function displayDeveloperName(): string {
  return getDeveloperName()
}

/**
 * Get the display name for the CEO.
 * Use this in UI components where CEO name is shown.
 */
export function displayCEOName(): string {
  return getCEOName()
}

/**
 * Check if the PE firm name is using the default value.
 */
export function isDefaultPEFirmName(): boolean {
  return getPEFirmName() === ENV_DEFAULTS.PE_FIRM_NAME
}

/**
 * Check if the portfolio company name is using the default value.
 */
export function isDefaultPortfolioCoName(): boolean {
  return getPortfolioCoName() === ENV_DEFAULTS.PORTFOLIO_CO_NAME
}

/**
 * Check if the product name is using the default value.
 */
export function isDefaultProductName(): boolean {
  return getProductName() === ENV_DEFAULTS.PRODUCT_NAME
}

/**
 * Check if the developer name is using the default value.
 */
export function isDefaultDeveloperName(): boolean {
  return getDeveloperName() === ENV_DEFAULTS.DEVELOPER_NAME
}

/**
 * Check if the CEO name is using the default value.
 */
export function isDefaultCEOName(): boolean {
  return getCEOName() === ENV_DEFAULTS.CEO_NAME
}

/**
 * Get a formatted possessive form of the PE firm name.
 * Example: "[PE Firm]'s" or "Vista's"
 */
export function getPEFirmPossessive(): string {
  const name = getPEFirmName()
  // Handle names ending in 's' correctly
  if (name.endsWith('s')) {
    return `${name}'`
  }
  return `${name}'s`
}

/**
 * Get a formatted possessive form of the portfolio company name.
 * Example: "[Portfolio Co]'s" or "Portside's"
 */
export function getPortfolioCoPossessive(): string {
  const name = getPortfolioCoName()
  if (name.endsWith('s')) {
    return `${name}'`
  }
  return `${name}'s`
}

/**
 * Context messages using configurable company names.
 */
export const companyContextMessages = {
  /**
   * Get the demo introduction message.
   */
  getDemoIntroduction(): string {
    return `Welcome to ${getPEFirmPossessive()} Product Operating System Demo`
  },

  /**
   * Get the portfolio scenario description.
   */
  getScenarioDescription(): string {
    return `${getPEFirmName()} just invested in ${getPortfolioCoName()}, installed a new CEO, and set an explicit mandate: unify the platform, ship AI, scale go-to-market.`
  },

  /**
   * Get the product platform message.
   */
  getProductPlatformMessage(): string {
    return `${getPortfolioCoPossessive()} ${getProductName()} platform powers operations across enterprise customers worldwide.`
  },

  /**
   * Get the CEO reference message.
   */
  getCEOMessage(): string {
    const ceoName = getCEOName()
    if (ceoName === ENV_DEFAULTS.CEO_NAME) {
      return 'The newly appointed CEO has a clear mandate for transformation.'
    }
    return `${ceoName} has been appointed CEO with a clear mandate for transformation.`
  },

  /**
   * Get the developer attribution message.
   */
  getDeveloperMessage(): string {
    const developerName = getDeveloperName()
    if (developerName === ENV_DEFAULTS.DEVELOPER_NAME) {
      return 'Built by the development team.'
    }
    return `Built by ${developerName}.`
  },
}

/**
 * Type for all displayable company name keys.
 */
export type CompanyNameKey = 'peFirm' | 'portfolioCo' | 'product' | 'developer' | 'ceo'

/**
 * Get a company name by key.
 */
export function getCompanyNameByKey(key: CompanyNameKey): string {
  switch (key) {
    case 'peFirm':
      return getPEFirmName()
    case 'portfolioCo':
      return getPortfolioCoName()
    case 'product':
      return getProductName()
    case 'developer':
      return getDeveloperName()
    case 'ceo':
      return getCEOName()
    default:
      return ''
  }
}

/**
 * All company names for iteration or bulk operations.
 */
export function getAllCompanyNames(): Record<CompanyNameKey, string> {
  return {
    peFirm: getPEFirmName(),
    portfolioCo: getPortfolioCoName(),
    product: getProductName(),
    developer: getDeveloperName(),
    ceo: getCEOName(),
  }
}
