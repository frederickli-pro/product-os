/**
 * Database seeding script for Portside scenario data.
 * Owner: Scenario 12 - Mock Data Seeding and Database
 *
 * Run with: npm run seed
 *
 * This script:
 * - Connects to MongoDB Atlas
 * - Clears existing collections
 * - Populates collections with Portside scenario mock data:
 *   - interviews: 8-10 interview transcript excerpts with thematic tagging
 *   - nps_responses: NPS data with score distribution
 *   - support_tickets: Categorized ticket data with volume breakdown
 *   - usage_analytics: Usage metrics with adoption rates
 *   - maturity_assessments: Baseline scores with percentile rankings
 * - Logs progress and completion
 */

import { MongoClient, Db } from 'mongodb'

// Import mock data from engine-1-data
import {
  interviews,
  npsResponses,
  npsDistribution,
  supportTickets,
  supportBreakdown,
  usageAnalytics,
  maturityScores,
  gapAnalysisData,
  benchmarkData,
} from '../mock/engine-1-data'

// Collection names
const COLLECTIONS = {
  INTERVIEWS: 'interviews',
  NPS_RESPONSES: 'nps_responses',
  NPS_DISTRIBUTION: 'nps_distribution',
  SUPPORT_TICKETS: 'support_tickets',
  SUPPORT_BREAKDOWN: 'support_breakdown',
  USAGE_ANALYTICS: 'usage_analytics',
  MATURITY_ASSESSMENTS: 'maturity_assessments',
  GAP_ANALYSIS: 'gap_analysis',
  BENCHMARKS: 'benchmarks',
} as const

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
}

function log(message: string, color: keyof typeof colors = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSection(title: string): void {
  console.log('')
  log(`${'='.repeat(50)}`, 'cyan')
  log(`  ${title}`, 'bright')
  log(`${'='.repeat(50)}`, 'cyan')
}

function logSuccess(collection: string, count: number): void {
  log(`  ✓ ${collection}: ${count} documents inserted`, 'green')
}

async function clearCollections(db: Db): Promise<void> {
  logSection('Clearing Existing Data')

  const collectionNames = Object.values(COLLECTIONS)

  for (const name of collectionNames) {
    try {
      await db.collection(name).deleteMany({})
      log(`  - Cleared ${name}`, 'yellow')
    } catch {
      // Collection might not exist yet, which is fine
      log(`  - ${name} (already empty or doesn't exist)`, 'yellow')
    }
  }
}

async function seedInterviews(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.INTERVIEWS)

  // Add timestamps to interviews
  const interviewsWithTimestamps = interviews.map((interview) => ({
    ...interview,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  const result = await collection.insertMany(interviewsWithTimestamps)
  return result.insertedCount
}

async function seedNpsResponses(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.NPS_RESPONSES)

  const npsWithTimestamps = npsResponses.map((response) => ({
    ...response,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  const result = await collection.insertMany(npsWithTimestamps)
  return result.insertedCount
}

async function seedNpsDistribution(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.NPS_DISTRIBUTION)

  await collection.insertOne({
    ...npsDistribution,
    period: 'Q1-2024',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return 1
}

async function seedSupportTickets(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.SUPPORT_TICKETS)

  const ticketsWithTimestamps = supportTickets.map((ticket) => ({
    ...ticket,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  const result = await collection.insertMany(ticketsWithTimestamps)
  return result.insertedCount
}

async function seedSupportBreakdown(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.SUPPORT_BREAKDOWN)

  await collection.insertOne({
    ...supportBreakdown,
    period: 'Q1-2024',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return 1
}

async function seedUsageAnalytics(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.USAGE_ANALYTICS)

  await collection.insertOne({
    ...usageAnalytics,
    period: 'Q1-2024',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return 1
}

async function seedMaturityAssessments(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.MATURITY_ASSESSMENTS)

  await collection.insertOne({
    ...maturityScores,
    companyId: 'portside-001',
    companyName: '[Portfolio Co]',
    assessmentDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return 1
}

async function seedGapAnalysis(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.GAP_ANALYSIS)

  const gapsWithTimestamps = gapAnalysisData.map((gap) => ({
    ...gap,
    companyId: 'portside-001',
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  const result = await collection.insertMany(gapsWithTimestamps)
  return result.insertedCount
}

async function seedBenchmarks(db: Db): Promise<number> {
  const collection = db.collection(COLLECTIONS.BENCHMARKS)

  await collection.insertOne({
    ...benchmarkData,
    assessmentDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return 1
}

async function createIndexes(db: Db): Promise<void> {
  logSection('Creating Indexes')

  // Interviews indexes
  await db.collection(COLLECTIONS.INTERVIEWS).createIndex({ id: 1 }, { unique: true })
  await db.collection(COLLECTIONS.INTERVIEWS).createIndex({ date: 1 })
  log('  ✓ Interviews indexes created', 'green')

  // NPS responses indexes
  await db.collection(COLLECTIONS.NPS_RESPONSES).createIndex({ id: 1 }, { unique: true })
  await db.collection(COLLECTIONS.NPS_RESPONSES).createIndex({ score: 1 })
  await db.collection(COLLECTIONS.NPS_RESPONSES).createIndex({ category: 1 })
  log('  ✓ NPS responses indexes created', 'green')

  // Support tickets indexes
  await db.collection(COLLECTIONS.SUPPORT_TICKETS).createIndex({ id: 1 }, { unique: true })
  await db.collection(COLLECTIONS.SUPPORT_TICKETS).createIndex({ category: 1 })
  await db.collection(COLLECTIONS.SUPPORT_TICKETS).createIndex({ priority: 1 })
  log('  ✓ Support tickets indexes created', 'green')

  // Maturity assessments indexes
  await db.collection(COLLECTIONS.MATURITY_ASSESSMENTS).createIndex({ companyId: 1 })
  log('  ✓ Maturity assessments indexes created', 'green')
}

async function verifySeedData(db: Db): Promise<void> {
  logSection('Verifying Seeded Data')

  // Verify interviews
  const interviewCount = await db.collection(COLLECTIONS.INTERVIEWS).countDocuments()
  const expectedInterviews = interviews.length
  if (interviewCount >= 8 && interviewCount <= 10) {
    log(`  ✓ Interviews: ${interviewCount} documents (expected 8-10)`, 'green')
  } else {
    log(`  ⚠ Interviews: ${interviewCount} documents (expected 8-10)`, 'yellow')
  }

  // Verify NPS distribution
  const npsDoc = await db.collection(COLLECTIONS.NPS_DISTRIBUTION).findOne({})
  if (npsDoc && npsDoc.promoters === 34 && npsDoc.passives === 41 && npsDoc.detractors === 25) {
    log('  ✓ NPS Distribution: Correct (34% promoters, 41% passives, 25% detractors)', 'green')
  } else {
    log('  ⚠ NPS Distribution: Unexpected values', 'yellow')
  }

  // Verify support breakdown
  const supportDoc = await db.collection(COLLECTIONS.SUPPORT_BREAKDOWN).findOne({})
  if (
    supportDoc &&
    supportDoc.categories.scheduling_conflicts === 47 &&
    supportDoc.categories.compliance_reporting === 23 &&
    supportDoc.categories.mobile_access === 18 &&
    supportDoc.categories.other === 12
  ) {
    log('  ✓ Support Breakdown: Correct (scheduling 47%, compliance 23%, mobile 18%, other 12%)', 'green')
  } else {
    log('  ⚠ Support Breakdown: Unexpected values', 'yellow')
  }

  // Verify usage analytics
  const usageDoc = await db.collection(COLLECTIONS.USAGE_ANALYTICS).findOne({})
  if (
    usageDoc &&
    usageDoc.featureAdoption.scheduling === 89 &&
    usageDoc.featureAdoption.compliance === 67 &&
    usageDoc.featureAdoption.mobile_app === 45 &&
    usageDoc.featureAdoption.api_integrations === 23
  ) {
    log('  ✓ Usage Analytics: Correct (scheduling 89%, compliance 67%, mobile 45%, API 23%)', 'green')
  } else {
    log('  ⚠ Usage Analytics: Unexpected values', 'yellow')
  }

  // Verify maturity assessment
  const maturityDoc = await db.collection(COLLECTIONS.MATURITY_ASSESSMENTS).findOne({})
  if (maturityDoc && maturityDoc.percentileRanking !== undefined) {
    log(`  ✓ Maturity Assessment: Present with percentile ranking ${maturityDoc.percentileRanking}`, 'green')
  } else {
    log('  ⚠ Maturity Assessment: Missing or incomplete', 'yellow')
  }
}

async function seedDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const dbName = process.env.MONGODB_DB_NAME || 'portfolio-ai-playbook'

  log('\n🚀 Portfolio AI Accountability Playbook - Database Seeder', 'bright')
  log(`   Database: ${dbName}`, 'cyan')

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 10000,
  })

  try {
    log('\nConnecting to MongoDB...', 'blue')
    await client.connect()
    log('  ✓ Connected successfully', 'green')

    const db = client.db(dbName)

    // Clear existing data
    await clearCollections(db)

    // Seed all collections
    logSection('Seeding Portside Scenario Data')

    const interviewCount = await seedInterviews(db)
    logSuccess('Interviews', interviewCount)

    const npsCount = await seedNpsResponses(db)
    logSuccess('NPS Responses', npsCount)

    const npsDistCount = await seedNpsDistribution(db)
    logSuccess('NPS Distribution', npsDistCount)

    const ticketCount = await seedSupportTickets(db)
    logSuccess('Support Tickets', ticketCount)

    const breakdownCount = await seedSupportBreakdown(db)
    logSuccess('Support Breakdown', breakdownCount)

    const analyticsCount = await seedUsageAnalytics(db)
    logSuccess('Usage Analytics', analyticsCount)

    const maturityCount = await seedMaturityAssessments(db)
    logSuccess('Maturity Assessments', maturityCount)

    const gapCount = await seedGapAnalysis(db)
    logSuccess('Gap Analysis', gapCount)

    const benchmarkCount = await seedBenchmarks(db)
    logSuccess('Benchmarks', benchmarkCount)

    // Create indexes
    await createIndexes(db)

    // Verify seeded data
    await verifySeedData(db)

    // Summary
    logSection('Seed Complete!')
    const totalDocs =
      interviewCount + npsCount + npsDistCount + ticketCount + breakdownCount + analyticsCount + maturityCount + gapCount + benchmarkCount
    log(`  Total documents: ${totalDocs}`, 'green')
    log(`  Collections: ${Object.keys(COLLECTIONS).length}`, 'green')
    console.log('')
  } catch (error) {
    log(`\n❌ Seed failed: ${error}`, 'red')
    throw error
  } finally {
    await client.close()
    log('  ✓ Connection closed', 'blue')
  }
}

// Export for testing and programmatic use
export { seedDatabase, COLLECTIONS }

// Only run when executed directly (not when imported)
const isMainModule = require.main === module || process.argv[1]?.includes('seed-database')
if (isMainModule && process.env.NODE_ENV !== 'test') {
  seedDatabase()
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seed failed:', error)
      process.exit(1)
    })
}
