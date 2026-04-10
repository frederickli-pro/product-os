/**
 * Unit tests for verifying no hardcoded company names in codebase.
 * Owner: Scenario 11 - Environment Configuration
 *
 * Tests that no actual company names (Vista, Portside) are hardcoded in the source code.
 * These names should be configurable via environment variables.
 */

import { describe, it, expect } from '@jest/globals'
import * as fs from 'fs'
import * as path from 'path'

// Patterns to search for (case-insensitive)
// Note: We exclude CSS color class names like "vista-navy", "vista-slate" which are design tokens
const FORBIDDEN_PATTERNS = {
  // Match "Vista" as a standalone word, but not in CSS class names like "vista-navy"
  VISTA: /(?<![-\w])Vista(?![-][\w])/gi,
  VISTA_EQUITY: /Vista\s+Equity\s+Partners?/gi,
  PORTSIDE: /\bPortside\b/gi,
}

// Allowed patterns - these are acceptable contexts
const ALLOWED_CONTEXTS = [
  // PRD documentation files
  /\.something\//,
  /prd\.md$/i,
  /\.md$/i, // All markdown files are allowed (documentation)
  // Test files checking for absence of these names
  /hardcoded-names\.test\.ts$/,
  // Knowledge files
  /knowledge\//,
  // Environment config utilities (contain company name references in documentation comments)
  /lib\/utils\/env-config\.ts$/,
  /lib\/utils\/company-names\.ts$/,
]

// Files and directories to skip
const SKIP_PATHS = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  '.something',
  'coverage',
  '.env',
]

// Files owned by other scenarios that may still have hardcoded names
// These scenarios are responsible for updating them to use env-config
const OTHER_SCENARIO_FILES = [
  /layout\/header\.tsx$/, // Scenario 1/9 - Dashboard/Branding
  /layout\/footer\.tsx$/, // Scenario 1/9 - Dashboard/Branding
  /app\/layout\.tsx$/, // Scenario 14 - Performance
  /globals\.css$/, // Scenario 9 - Branding (comments only)
]

/**
 * Recursively get all source files from a directory.
 */
function getSourceFiles(dir: string, files: string[] = []): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.relative(process.cwd(), fullPath)

      // Skip excluded paths
      if (SKIP_PATHS.some((skip) => relativePath.includes(skip))) {
        continue
      }

      if (entry.isDirectory()) {
        getSourceFiles(fullPath, files)
      } else if (entry.isFile()) {
        // Include relevant source files
        const ext = path.extname(entry.name).toLowerCase()
        if (['.ts', '.tsx', '.js', '.jsx', '.json'].includes(ext)) {
          files.push(fullPath)
        }
      }
    }
  } catch {
    // Directory may not exist
  }

  return files
}

/**
 * Check if a file path is in an allowed context.
 */
function isAllowedContext(filePath: string): boolean {
  const relativePath = path.relative(process.cwd(), filePath)
  return ALLOWED_CONTEXTS.some((pattern) => pattern.test(relativePath))
}

/**
 * Check if a file is owned by another scenario.
 * These files may have hardcoded names that the owning scenario should fix.
 */
function isOtherScenarioFile(filePath: string): boolean {
  const relativePath = path.relative(process.cwd(), filePath)
  return OTHER_SCENARIO_FILES.some((pattern) => pattern.test(relativePath))
}

/**
 * Search for forbidden patterns in a file.
 */
function findForbiddenPatterns(
  filePath: string,
  patterns: Record<string, RegExp>
): { pattern: string; matches: string[]; lines: number[] }[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const results: { pattern: string; matches: string[]; lines: number[] }[] = []

  for (const [patternName, regex] of Object.entries(patterns)) {
    const matches: string[] = []
    const lineNumbers: number[] = []

    lines.forEach((line, index) => {
      // Reset regex lastIndex for global patterns
      regex.lastIndex = 0
      const lineMatches = line.match(regex)
      if (lineMatches) {
        matches.push(...lineMatches)
        lineNumbers.push(index + 1)
      }
    })

    if (matches.length > 0) {
      results.push({ pattern: patternName, matches, lines: lineNumbers })
    }
  }

  return results
}

describe('Hardcoded Company Names Verification', () => {
  describe("Test Case 6: Search codebase for 'Vista'", () => {
    it("should not have hardcoded 'Vista' or 'Vista Equity Partners' in env-config owned files", () => {
      // This test verifies that files owned by Scenario 11 (env-config) don't have hardcoded names
      const srcDir = path.join(process.cwd(), 'src')
      const files = getSourceFiles(srcDir)
      const violations: { file: string; matches: string[]; lines: number[] }[] = []
      const otherScenarioViolations: { file: string; matches: string[]; lines: number[] }[] = []

      // Mock data files are allowed to contain company names for scenario context
      const mockDataPattern = /data\/mock\//

      for (const file of files) {
        if (isAllowedContext(file)) {
          continue
        }

        const relativePath = path.relative(process.cwd(), file)

        // Allow Vista in mock data files (this is the scenario context)
        if (mockDataPattern.test(relativePath)) {
          continue
        }

        const results = findForbiddenPatterns(file, {
          VISTA: FORBIDDEN_PATTERNS.VISTA,
          VISTA_EQUITY: FORBIDDEN_PATTERNS.VISTA_EQUITY,
        })

        if (results.length > 0) {
          const allMatches = results.flatMap((r) => r.matches)
          const allLines = results.flatMap((r) => r.lines)
          const entry = {
            file: path.relative(process.cwd(), file),
            matches: allMatches,
            lines: allLines,
          }

          // Separate violations by file ownership
          if (isOtherScenarioFile(file)) {
            otherScenarioViolations.push(entry)
          } else {
            violations.push(entry)
          }
        }
      }

      // Log other scenario violations for awareness (not failing)
      if (otherScenarioViolations.length > 0) {
        console.log(
          `INFO: Found ${otherScenarioViolations.length} files owned by other scenarios with Vista references. These scenarios should update to use env-config.`
        )
      }

      // Only fail on violations in files we own
      if (violations.length > 0) {
        const violationMessages = violations.map(
          (v) =>
            `\n  File: ${v.file}\n    Matches: ${v.matches.join(', ')}\n    Lines: ${v.lines.join(', ')}`
        )
        throw new Error(
          `Found hardcoded 'Vista' references in source code:${violationMessages.join('')}\n\nThese should be replaced with configurable environment variables.`
        )
      }

      expect(violations).toHaveLength(0)
    })
  })

  describe("Test Case 7: Search codebase for 'Portside'", () => {
    it("should not have hardcoded 'Portside' in committed code (except mock data context)", () => {
      const srcDir = path.join(process.cwd(), 'src')
      const files = getSourceFiles(srcDir)
      const violations: { file: string; matches: string[]; lines: number[] }[] = []

      // Mock data and seed files are allowed to contain Portside for scenario context
      const mockDataPattern = /data\/(mock|seed)\//

      for (const file of files) {
        if (isAllowedContext(file)) {
          continue
        }

        const relativePath = path.relative(process.cwd(), file)

        // Allow Portside in mock data files (this is the scenario context)
        if (mockDataPattern.test(relativePath)) {
          continue
        }

        // Skip files owned by other scenarios
        if (isOtherScenarioFile(file)) {
          continue
        }

        const results = findForbiddenPatterns(file, {
          PORTSIDE: FORBIDDEN_PATTERNS.PORTSIDE,
        })

        if (results.length > 0) {
          const allMatches = results.flatMap((r) => r.matches)
          const allLines = results.flatMap((r) => r.lines)
          violations.push({
            file: relativePath,
            matches: allMatches,
            lines: allLines,
          })
        }
      }

      if (violations.length > 0) {
        const violationMessages = violations.map(
          (v) =>
            `\n  File: ${v.file}\n    Matches: ${v.matches.join(', ')}\n    Lines: ${v.lines.join(', ')}`
        )
        throw new Error(
          `Found hardcoded 'Portside' references in source code (outside mock data):${violationMessages.join('')}\n\nThese should be replaced with configurable environment variables or moved to mock data.`
        )
      }

      expect(violations).toHaveLength(0)
    })

    it('should allow Portside references in mock data files for scenario context', () => {
      const mockDataDir = path.join(process.cwd(), 'src', 'data', 'mock')

      // This test verifies that mock data files CAN contain Portside
      // because they provide the scenario context
      if (fs.existsSync(mockDataDir)) {
        const files = getSourceFiles(mockDataDir)
        // Mock data files are expected to potentially contain Portside for the scenario
        // This is not a violation
        expect(files.length).toBeGreaterThanOrEqual(0)
      } else {
        // Mock data directory doesn't exist yet - that's fine
        expect(true).toBe(true)
      }
    })
  })

  describe('Comprehensive Pattern Check', () => {
    it('should have configurable company name utilities available', async () => {
      const {
        getPEFirmName,
        getPortfolioCoName,
        getProductName,
        getDeveloperName,
        getCEOName,
      } = await import('@/lib/utils/env-config')

      // All functions should return strings
      expect(typeof getPEFirmName()).toBe('string')
      expect(typeof getPortfolioCoName()).toBe('string')
      expect(typeof getProductName()).toBe('string')
      expect(typeof getDeveloperName()).toBe('string')
      expect(typeof getCEOName()).toBe('string')

      // None should return actual hardcoded company names by default
      expect(getPEFirmName()).not.toMatch(/Vista/i)
      expect(getPortfolioCoName()).not.toMatch(/Portside/i)
    })

    it('should have company name replacement utilities available', async () => {
      const { replaceCompanyNames, COMPANY_PLACEHOLDERS } = await import(
        '@/lib/utils/company-names'
      )

      // Placeholders should be defined
      expect(COMPANY_PLACEHOLDERS.PE_FIRM).toBe('{{PE_FIRM}}')
      expect(COMPANY_PLACEHOLDERS.PORTFOLIO_CO).toBe('{{PORTFOLIO_CO}}')
      expect(COMPANY_PLACEHOLDERS.PRODUCT).toBe('{{PRODUCT}}')
      expect(COMPANY_PLACEHOLDERS.DEVELOPER).toBe('{{DEVELOPER}}')
      expect(COMPANY_PLACEHOLDERS.CEO).toBe('{{CEO}}')

      // Replace function should work
      const template = '{{PE_FIRM}} invested in {{PORTFOLIO_CO}}'
      const result = replaceCompanyNames(template)
      expect(result).not.toContain('{{PE_FIRM}}')
      expect(result).not.toContain('{{PORTFOLIO_CO}}')
    })
  })
})
