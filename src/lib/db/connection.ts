/**
 * Database connection utilities and helpers.
 * Owner: Scenario 12 - Mock Data Seeding and Database
 *
 * Re-exports core connection functions and adds utilities
 * for database operations in the Portfolio AI Playbook.
 */

export {
  connectToDatabase,
  getCollection,
  closeConnection,
  healthCheck,
  getDatabaseName,
  getMaskedUri,
  getClientPromise,
} from './mongodb'

// Collection names used throughout the application
export const COLLECTIONS = {
  INTERVIEWS: 'interviews',
  NPS_RESPONSES: 'nps_responses',
  SUPPORT_TICKETS: 'support_tickets',
  USAGE_ANALYTICS: 'usage_analytics',
  MATURITY_ASSESSMENTS: 'maturity_assessments',
  NPS_DISTRIBUTION: 'nps_distribution',
  SUPPORT_BREAKDOWN: 'support_breakdown',
  GAP_ANALYSIS: 'gap_analysis',
  BENCHMARKS: 'benchmarks',
} as const

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS]
