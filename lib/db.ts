import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.POSTGRES_PRISMA_URL

// 1. Create a single pool and adapter instance
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// 2. Export the client as a singleton
export const db = 
  globalForPrisma.prisma || 
  new PrismaClient({ 
    adapter,
    // Optional: Log queries to see what's happening in your terminal
    log: ['query', 'error', 'warn'], 
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db