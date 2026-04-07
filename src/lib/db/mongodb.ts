/**
 * MongoDB Atlas connection management.
 * Owner: Scenario 12 - Mock Data Seeding and Database
 *
 * Provides connection pooling for Next.js runtime with
 * MONGODB_URI configuration from environment variables.
 *
 * Collections:
 * - interviews: Customer interview transcripts with thematic tagging
 * - nps_responses: NPS survey responses with verbatim comments
 * - support_tickets: Categorized support ticket data
 * - usage_analytics: Product usage metrics and adoption rates
 * - maturity_assessments: Baseline scores with percentile rankings
 */

import { MongoClient, Db, Collection, Document, MongoClientOptions } from 'mongodb'

// Connection state management for Next.js hot reload
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

// Database configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio-ai-playbook'

// Connection options with connection pooling
const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  retryWrites: true,
  retryReads: true,
}

// Test mode uses faster timeouts
if (process.env.NODE_ENV === 'test') {
  options.serverSelectionTimeoutMS = 3000
  options.connectTimeoutMS = 5000
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

/**
 * Get the MongoDB client promise with connection pooling.
 * Uses a cached connection in development to preserve connections across hot reloads.
 */
function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the client across hot reloads
    if (!global._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI, options)
      global._mongoClientPromise = client.connect()
    }
    return global._mongoClientPromise
  }

  // In production/test mode, create a new client for each request cycle
  if (!clientPromise) {
    client = new MongoClient(MONGODB_URI, options)
    clientPromise = client.connect()
  }
  return clientPromise
}

/**
 * Connect to the MongoDB database.
 * Returns the database instance configured for the playbook.
 *
 * @returns Promise<Db> - MongoDB database instance
 * @throws Error if connection fails
 *
 * @example
 * ```typescript
 * const db = await connectToDatabase()
 * const collection = db.collection('interviews')
 * ```
 */
export async function connectToDatabase(): Promise<Db> {
  const client = await getClientPromise()
  return client.db(MONGODB_DB_NAME)
}

/**
 * Get a typed collection from the database.
 * Provides type-safe access to MongoDB collections.
 *
 * @param name - Name of the collection
 * @returns Promise<Collection<T>> - Typed MongoDB collection
 *
 * @example
 * ```typescript
 * import { Interview } from '@/types/evidence'
 * const interviews = await getCollection<Interview>('interviews')
 * const all = await interviews.find({}).toArray()
 * ```
 */
export async function getCollection<T extends Document>(
  name: string
): Promise<Collection<T>> {
  const db = await connectToDatabase()
  return db.collection<T>(name)
}

/**
 * Close the MongoDB connection.
 * Should be called when shutting down the application or after seed operations.
 *
 * @returns Promise<void>
 */
export async function closeConnection(): Promise<void> {
  const clientToClose = await getClientPromise()
  await clientToClose.close()

  // Reset the global promise in development mode
  if (process.env.NODE_ENV === 'development') {
    global._mongoClientPromise = undefined
  }
  clientPromise = undefined as unknown as Promise<MongoClient>
}

/**
 * Check database connection health.
 * Useful for API health check endpoints.
 *
 * @returns Promise<boolean> - true if connected, false otherwise
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const db = await connectToDatabase()
    await db.command({ ping: 1 })
    return true
  } catch {
    return false
  }
}

/**
 * Get the database name being used.
 * Useful for logging and debugging.
 */
export function getDatabaseName(): string {
  return MONGODB_DB_NAME
}

/**
 * Get the MongoDB URI (masked for security in logs).
 * Returns a masked version of the connection string.
 */
export function getMaskedUri(): string {
  if (!MONGODB_URI) return 'Not configured'
  try {
    const url = new URL(MONGODB_URI)
    if (url.password) {
      url.password = '****'
    }
    return url.toString()
  } catch {
    // For non-URL format URIs
    return MONGODB_URI.replace(/:[^:@]+@/, ':****@')
  }
}

// Export client promise for advanced use cases
export { getClientPromise }
