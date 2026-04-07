/**
 * Environment configuration utility.
 * Owner: Scenario 11 - Environment Configuration
 *
 * Provides centralized access to environment variables with defaults.
 * All configurable values are read from NEXT_PUBLIC_* environment variables.
 *
 * Expected exports:
 * - getEnvConfig(): EnvConfig
 * - getPEFirmName(): string
 * - getPortfolioCoName(): string
 * - getProductName(): string
 * - getDeveloperName(): string
 * - getCEOName(): string
 * - getGAMeasurementId(): string | undefined
 * - getClarityProjectId(): string | undefined
 * - getMongoDBUri(): string | undefined
 * - getDomain(): string | undefined
 */

/**
 * Environment configuration type definition.
 */
export interface EnvConfig {
  // Company names (configurable to avoid hardcoded company references)
  peFirmName: string
  portfolioCoName: string
  productName: string
  developerName: string
  ceoName: string

  // Analytics configuration
  gaMeasurementId: string | undefined
  clarityProjectId: string | undefined

  // Database configuration
  mongodbUri: string | undefined

  // Domain configuration
  domain: string | undefined
}

/**
 * Default values for environment variables.
 * These defaults ensure no actual company names appear when env vars are not set.
 */
export const ENV_DEFAULTS = {
  PE_FIRM_NAME: '[PE Firm]',
  PORTFOLIO_CO_NAME: '[Portfolio Co]',
  PRODUCT_NAME: '[Software]',
  DEVELOPER_NAME: 'developer',
  CEO_NAME: '[CEO Name]',
} as const

/**
 * Get the complete environment configuration object.
 * Returns an object with all configurable values and their current settings.
 */
export function getEnvConfig(): EnvConfig {
  return {
    peFirmName: getPEFirmName(),
    portfolioCoName: getPortfolioCoName(),
    productName: getProductName(),
    developerName: getDeveloperName(),
    ceoName: getCEOName(),
    gaMeasurementId: getGAMeasurementId(),
    clarityProjectId: getClarityProjectId(),
    mongodbUri: getMongoDBUri(),
    domain: getDomain(),
  }
}

/**
 * Get the PE (Private Equity) firm name.
 * Defaults to '[PE Firm]' to avoid hardcoding actual firm names.
 */
export function getPEFirmName(): string {
  return process.env.NEXT_PUBLIC_PE_FIRM_NAME || ENV_DEFAULTS.PE_FIRM_NAME
}

/**
 * Get the portfolio company name.
 * Defaults to '[Portfolio Co]' to avoid hardcoding actual company names.
 */
export function getPortfolioCoName(): string {
  return process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME || ENV_DEFAULTS.PORTFOLIO_CO_NAME
}

/**
 * Get the product/software name.
 * Defaults to '[Software]' to avoid hardcoding actual product names.
 */
export function getProductName(): string {
  return process.env.NEXT_PUBLIC_PRODUCT_NAME || ENV_DEFAULTS.PRODUCT_NAME
}

/**
 * Get the developer name.
 * Defaults to 'developer' to avoid hardcoding actual personal names.
 */
export function getDeveloperName(): string {
  return process.env.NEXT_PUBLIC_DEVELOPER_NAME || ENV_DEFAULTS.DEVELOPER_NAME
}

/**
 * Get the CEO name.
 * Defaults to '[CEO Name]' to avoid hardcoding actual personal names.
 */
export function getCEOName(): string {
  return process.env.NEXT_PUBLIC_CEO_NAME || ENV_DEFAULTS.CEO_NAME
}

/**
 * Get the Google Analytics measurement ID.
 * Returns undefined if not configured.
 */
export function getGAMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  return id && id.trim() !== '' ? id : undefined
}

/**
 * Get the Microsoft Clarity project ID.
 * Returns undefined if not configured.
 */
export function getClarityProjectId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
  return id && id.trim() !== '' ? id : undefined
}

/**
 * Get the MongoDB connection URI.
 * Returns undefined if not configured.
 * Note: This is NOT a NEXT_PUBLIC_ variable as it should not be exposed to the client.
 */
export function getMongoDBUri(): string | undefined {
  const uri = process.env.MONGODB_URI
  return uri && uri.trim() !== '' ? uri : undefined
}

/**
 * Get the application domain.
 * Returns undefined if not configured.
 */
export function getDomain(): string | undefined {
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  return domain && domain.trim() !== '' ? domain : undefined
}

/**
 * Check if all required company name environment variables are set.
 * Returns true only if all names are configured (not using defaults).
 */
export function hasCustomCompanyNames(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_PE_FIRM_NAME &&
    !!process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME &&
    !!process.env.NEXT_PUBLIC_PRODUCT_NAME
  )
}

/**
 * Check if analytics is configured.
 * Returns true if at least one analytics provider is configured.
 */
export function hasAnalyticsConfigured(): boolean {
  return !!getGAMeasurementId() || !!getClarityProjectId()
}

/**
 * Check if database is configured.
 * Returns true if MongoDB URI is set.
 */
export function hasDatabaseConfigured(): boolean {
  return !!getMongoDBUri()
}

/**
 * Get all company names as an object for convenience.
 */
export function getCompanyNames(): {
  peFirm: string
  portfolioCo: string
  product: string
  developer: string
  ceo: string
} {
  return {
    peFirm: getPEFirmName(),
    portfolioCo: getPortfolioCoName(),
    product: getProductName(),
    developer: getDeveloperName(),
    ceo: getCEOName(),
  }
}
