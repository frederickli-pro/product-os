/**
 * Integration tests for Environment Configuration.
 * Owner: Scenario 11 - Environment Configuration
 *
 * Tests environment variable loading, default values,
 * configurable company names, and analytics configuration.
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

// Store original env
const originalEnv = process.env

describe('Environment Configuration', () => {
  beforeEach(() => {
    // Reset modules to ensure fresh state
    jest.resetModules()
    // Reset to original env before each test
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
    jest.clearAllMocks()
  })

  describe('Test Case 1: Default Environment Values', () => {
    it("should display default values: '[PE Firm]', '[Portfolio Co]', '[Software]', 'developer', '[CEO Name]'", async () => {
      // Clear all company name env vars
      delete process.env.NEXT_PUBLIC_PE_FIRM_NAME
      delete process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME
      delete process.env.NEXT_PUBLIC_PRODUCT_NAME
      delete process.env.NEXT_PUBLIC_DEVELOPER_NAME
      delete process.env.NEXT_PUBLIC_CEO_NAME

      jest.resetModules()

      const {
        getPEFirmName,
        getPortfolioCoName,
        getProductName,
        getDeveloperName,
        getCEOName,
        ENV_DEFAULTS,
      } = await import('@/lib/utils/env-config')

      expect(getPEFirmName()).toBe('[PE Firm]')
      expect(getPortfolioCoName()).toBe('[Portfolio Co]')
      expect(getProductName()).toBe('[Software]')
      expect(getDeveloperName()).toBe('developer')
      expect(getCEOName()).toBe('[CEO Name]')

      // Verify these match the defined defaults
      expect(getPEFirmName()).toBe(ENV_DEFAULTS.PE_FIRM_NAME)
      expect(getPortfolioCoName()).toBe(ENV_DEFAULTS.PORTFOLIO_CO_NAME)
      expect(getProductName()).toBe(ENV_DEFAULTS.PRODUCT_NAME)
      expect(getDeveloperName()).toBe(ENV_DEFAULTS.DEVELOPER_NAME)
      expect(getCEOName()).toBe(ENV_DEFAULTS.CEO_NAME)
    })

    it('should return complete default config when no env vars are set', async () => {
      delete process.env.NEXT_PUBLIC_PE_FIRM_NAME
      delete process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME
      delete process.env.NEXT_PUBLIC_PRODUCT_NAME
      delete process.env.NEXT_PUBLIC_DEVELOPER_NAME
      delete process.env.NEXT_PUBLIC_CEO_NAME
      delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      delete process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
      delete process.env.MONGODB_URI
      delete process.env.NEXT_PUBLIC_DOMAIN

      jest.resetModules()

      const { getEnvConfig } = await import('@/lib/utils/env-config')

      const config = getEnvConfig()

      expect(config.peFirmName).toBe('[PE Firm]')
      expect(config.portfolioCoName).toBe('[Portfolio Co]')
      expect(config.productName).toBe('[Software]')
      expect(config.developerName).toBe('developer')
      expect(config.ceoName).toBe('[CEO Name]')
      expect(config.gaMeasurementId).toBeUndefined()
      expect(config.clarityProjectId).toBeUndefined()
      expect(config.mongodbUri).toBeUndefined()
      expect(config.domain).toBeUndefined()
    })
  })

  describe("Test Case 2: PE Firm Name Configuration (NEXT_PUBLIC_PE_FIRM_NAME='Test Firm')", () => {
    it("should display PE firm name as 'Test Firm' throughout interface", async () => {
      process.env.NEXT_PUBLIC_PE_FIRM_NAME = 'Test Firm'

      jest.resetModules()

      const { getPEFirmName, getEnvConfig, getCompanyNames } = await import(
        '@/lib/utils/env-config'
      )

      expect(getPEFirmName()).toBe('Test Firm')
      expect(getEnvConfig().peFirmName).toBe('Test Firm')
      expect(getCompanyNames().peFirm).toBe('Test Firm')
    })

    it('should use custom PE firm name in company name utilities', async () => {
      process.env.NEXT_PUBLIC_PE_FIRM_NAME = 'Test Firm'

      jest.resetModules()

      const { displayPEFirmName, getPEFirmPossessive, isDefaultPEFirmName } = await import(
        '@/lib/utils/company-names'
      )

      expect(displayPEFirmName()).toBe('Test Firm')
      expect(getPEFirmPossessive()).toBe("Test Firm's")
      expect(isDefaultPEFirmName()).toBe(false)
    })
  })

  describe("Test Case 3: Portfolio Company Name Configuration (NEXT_PUBLIC_PORTFOLIO_CO_NAME='Test Co')", () => {
    it("should display portfolio company name as 'Test Co' throughout interface", async () => {
      process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME = 'Test Co'

      jest.resetModules()

      const { getPortfolioCoName, getEnvConfig, getCompanyNames } = await import(
        '@/lib/utils/env-config'
      )

      expect(getPortfolioCoName()).toBe('Test Co')
      expect(getEnvConfig().portfolioCoName).toBe('Test Co')
      expect(getCompanyNames().portfolioCo).toBe('Test Co')
    })

    it('should use custom portfolio company name in company name utilities', async () => {
      process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME = 'Test Co'

      jest.resetModules()

      const { displayPortfolioCoName, getPortfolioCoPossessive, isDefaultPortfolioCoName } =
        await import('@/lib/utils/company-names')

      expect(displayPortfolioCoName()).toBe('Test Co')
      expect(getPortfolioCoPossessive()).toBe("Test Co's")
      expect(isDefaultPortfolioCoName()).toBe(false)
    })
  })

  describe("Test Case 4: Product Name Configuration (NEXT_PUBLIC_PRODUCT_NAME='Test Product')", () => {
    it("should display product name as 'Test Product' throughout interface", async () => {
      process.env.NEXT_PUBLIC_PRODUCT_NAME = 'Test Product'

      jest.resetModules()

      const { getProductName, getEnvConfig, getCompanyNames } = await import(
        '@/lib/utils/env-config'
      )

      expect(getProductName()).toBe('Test Product')
      expect(getEnvConfig().productName).toBe('Test Product')
      expect(getCompanyNames().product).toBe('Test Product')
    })

    it('should use custom product name in company name utilities', async () => {
      process.env.NEXT_PUBLIC_PRODUCT_NAME = 'Test Product'

      jest.resetModules()

      const { displayProductName, isDefaultProductName } = await import(
        '@/lib/utils/company-names'
      )

      expect(displayProductName()).toBe('Test Product')
      expect(isDefaultProductName()).toBe(false)
    })
  })

  describe('Test Case 5: Personal Names Configuration (NEXT_PUBLIC_DEVELOPER_NAME and NEXT_PUBLIC_CEO_NAME)', () => {
    it('should display personal names correctly in relevant sections', async () => {
      process.env.NEXT_PUBLIC_DEVELOPER_NAME = 'John Developer'
      process.env.NEXT_PUBLIC_CEO_NAME = 'Jane Executive'

      jest.resetModules()

      const { getDeveloperName, getCEOName, getEnvConfig, getCompanyNames } = await import(
        '@/lib/utils/env-config'
      )

      expect(getDeveloperName()).toBe('John Developer')
      expect(getCEOName()).toBe('Jane Executive')
      expect(getEnvConfig().developerName).toBe('John Developer')
      expect(getEnvConfig().ceoName).toBe('Jane Executive')
      expect(getCompanyNames().developer).toBe('John Developer')
      expect(getCompanyNames().ceo).toBe('Jane Executive')
    })

    it('should use custom personal names in company name utilities', async () => {
      process.env.NEXT_PUBLIC_DEVELOPER_NAME = 'John Developer'
      process.env.NEXT_PUBLIC_CEO_NAME = 'Jane Executive'

      jest.resetModules()

      const {
        displayDeveloperName,
        displayCEOName,
        isDefaultDeveloperName,
        isDefaultCEOName,
        companyContextMessages,
      } = await import('@/lib/utils/company-names')

      expect(displayDeveloperName()).toBe('John Developer')
      expect(displayCEOName()).toBe('Jane Executive')
      expect(isDefaultDeveloperName()).toBe(false)
      expect(isDefaultCEOName()).toBe(false)
      expect(companyContextMessages.getDeveloperMessage()).toBe('Built by John Developer.')
      expect(companyContextMessages.getCEOMessage()).toBe(
        'Jane Executive has been appointed CEO with a clear mandate for transformation.'
      )
    })
  })

  describe('Test Case 8: Google Analytics Measurement ID Configuration', () => {
    it('should initialize Google Analytics with provided measurement ID', async () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TESTMEASUREMENT'

      jest.resetModules()

      const { getGAMeasurementId, hasAnalyticsConfigured } = await import(
        '@/lib/utils/env-config'
      )

      expect(getGAMeasurementId()).toBe('G-TESTMEASUREMENT')
      expect(hasAnalyticsConfigured()).toBe(true)
    })

    it('should return undefined when GA measurement ID is not set', async () => {
      delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      delete process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

      jest.resetModules()

      const { getGAMeasurementId, hasAnalyticsConfigured } = await import(
        '@/lib/utils/env-config'
      )

      expect(getGAMeasurementId()).toBeUndefined()
      expect(hasAnalyticsConfigured()).toBe(false)
    })

    it('should return undefined when GA measurement ID is empty string', async () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = ''

      jest.resetModules()

      const { getGAMeasurementId } = await import('@/lib/utils/env-config')

      expect(getGAMeasurementId()).toBeUndefined()
    })

    it('should return undefined when GA measurement ID is whitespace only', async () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = '   '

      jest.resetModules()

      const { getGAMeasurementId } = await import('@/lib/utils/env-config')

      expect(getGAMeasurementId()).toBeUndefined()
    })
  })

  describe('Test Case 9: Microsoft Clarity Project ID Configuration', () => {
    it('should initialize Microsoft Clarity with provided project ID', async () => {
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = 'clarity-test-123'

      jest.resetModules()

      const { getClarityProjectId, hasAnalyticsConfigured } = await import(
        '@/lib/utils/env-config'
      )

      expect(getClarityProjectId()).toBe('clarity-test-123')
      expect(hasAnalyticsConfigured()).toBe(true)
    })

    it('should return undefined when Clarity project ID is not set', async () => {
      delete process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
      delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

      jest.resetModules()

      const { getClarityProjectId, hasAnalyticsConfigured } = await import(
        '@/lib/utils/env-config'
      )

      expect(getClarityProjectId()).toBeUndefined()
      expect(hasAnalyticsConfigured()).toBe(false)
    })

    it('should return undefined when Clarity project ID is empty string', async () => {
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID = ''

      jest.resetModules()

      const { getClarityProjectId } = await import('@/lib/utils/env-config')

      expect(getClarityProjectId()).toBeUndefined()
    })
  })

  describe('Helper Functions', () => {
    it('should check custom company names status correctly', async () => {
      // Test with all defaults
      delete process.env.NEXT_PUBLIC_PE_FIRM_NAME
      delete process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME
      delete process.env.NEXT_PUBLIC_PRODUCT_NAME

      jest.resetModules()

      const { hasCustomCompanyNames } = await import('@/lib/utils/env-config')

      expect(hasCustomCompanyNames()).toBe(false)

      // Now set custom values
      process.env.NEXT_PUBLIC_PE_FIRM_NAME = 'Custom Firm'
      process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME = 'Custom Co'
      process.env.NEXT_PUBLIC_PRODUCT_NAME = 'Custom Product'

      jest.resetModules()

      const { hasCustomCompanyNames: hasCustomNames2 } = await import('@/lib/utils/env-config')

      expect(hasCustomNames2()).toBe(true)
    })

    it('should check database configuration status correctly', async () => {
      delete process.env.MONGODB_URI

      jest.resetModules()

      const { hasDatabaseConfigured, getMongoDBUri } = await import('@/lib/utils/env-config')

      expect(getMongoDBUri()).toBeUndefined()
      expect(hasDatabaseConfigured()).toBe(false)

      // Now set database URI
      process.env.MONGODB_URI = 'mongodb+srv://test:test@cluster.mongodb.net/test'

      jest.resetModules()

      const { hasDatabaseConfigured: hasDb2, getMongoDBUri: getUri2 } = await import(
        '@/lib/utils/env-config'
      )

      expect(getUri2()).toBe('mongodb+srv://test:test@cluster.mongodb.net/test')
      expect(hasDb2()).toBe(true)
    })

    it('should return domain when configured', async () => {
      process.env.NEXT_PUBLIC_DOMAIN = 'product-os.example.com'

      jest.resetModules()

      const { getDomain } = await import('@/lib/utils/env-config')

      expect(getDomain()).toBe('product-os.example.com')
    })
  })

  describe('Company Names Utilities', () => {
    it('should replace company name placeholders in template strings', async () => {
      process.env.NEXT_PUBLIC_PE_FIRM_NAME = 'Acme Capital'
      process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME = 'TechCo'
      process.env.NEXT_PUBLIC_PRODUCT_NAME = 'CloudPlatform'
      process.env.NEXT_PUBLIC_DEVELOPER_NAME = 'Alice'
      process.env.NEXT_PUBLIC_CEO_NAME = 'Bob Smith'

      jest.resetModules()

      const { replaceCompanyNames, COMPANY_PLACEHOLDERS } = await import(
        '@/lib/utils/company-names'
      )

      const template = `Welcome to ${COMPANY_PLACEHOLDERS.PE_FIRM}'s ${COMPANY_PLACEHOLDERS.PRODUCT} demo featuring ${COMPANY_PLACEHOLDERS.PORTFOLIO_CO}, built by ${COMPANY_PLACEHOLDERS.DEVELOPER} for ${COMPANY_PLACEHOLDERS.CEO}.`

      const result = replaceCompanyNames(template)

      expect(result).toBe(
        "Welcome to Acme Capital's CloudPlatform demo featuring TechCo, built by Alice for Bob Smith."
      )
    })

    it('should get company name by key', async () => {
      process.env.NEXT_PUBLIC_PE_FIRM_NAME = 'Test PE'
      process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME = 'Test Portfolio'

      jest.resetModules()

      const { getCompanyNameByKey, getAllCompanyNames } = await import(
        '@/lib/utils/company-names'
      )

      expect(getCompanyNameByKey('peFirm')).toBe('Test PE')
      expect(getCompanyNameByKey('portfolioCo')).toBe('Test Portfolio')

      const allNames = getAllCompanyNames()
      expect(allNames.peFirm).toBe('Test PE')
      expect(allNames.portfolioCo).toBe('Test Portfolio')
    })

    it('should generate context messages with configured names', async () => {
      process.env.NEXT_PUBLIC_PE_FIRM_NAME = 'Investment Partners'
      process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME = 'StartupCo'
      process.env.NEXT_PUBLIC_PRODUCT_NAME = 'Enterprise Suite'

      jest.resetModules()

      const { companyContextMessages } = await import('@/lib/utils/company-names')

      // Note: "Investment Partners" ends with 's', so possessive is "Partners'" not "Partners's"
      expect(companyContextMessages.getDemoIntroduction()).toBe(
        "Welcome to Investment Partners' Product AI Operating System Demo"
      )
      expect(companyContextMessages.getScenarioDescription()).toContain('Investment Partners')
      expect(companyContextMessages.getScenarioDescription()).toContain('StartupCo')
      expect(companyContextMessages.getProductPlatformMessage()).toContain("StartupCo's")
      expect(companyContextMessages.getProductPlatformMessage()).toContain('Enterprise Suite')
    })

    it('should handle possessive forms for names ending in s', async () => {
      process.env.NEXT_PUBLIC_PE_FIRM_NAME = 'Atlas Partners'
      process.env.NEXT_PUBLIC_PORTFOLIO_CO_NAME = 'Express'

      jest.resetModules()

      const { getPEFirmPossessive, getPortfolioCoPossessive } = await import(
        '@/lib/utils/company-names'
      )

      // Names ending in 's' should use just apostrophe
      expect(getPEFirmPossessive()).toBe("Atlas Partners'")
      expect(getPortfolioCoPossessive()).toBe("Express'")
    })
  })
})
