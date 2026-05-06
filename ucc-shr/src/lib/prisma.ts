/**
 * Prisma Client initialization.
 * 
 * IMPORTANT: To use this in production, you must:
 * 1. Install @prisma/adapter-pg: npm install @prisma/adapter-pg
 * 2. Update DATABASE_URL in .env with your PostgreSQL connection string
 * 3. Optionally uncomment the adapter provider in the initPrisma function below
 * 
 * Alternatively, use Prisma Accelerate by providing ACCELERATE_URL env var.
 */

import { PrismaClient } from '@/generated/prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined
}

let _prisma: InstanceType<typeof PrismaClient> | undefined

export function initPrisma(): InstanceType<typeof PrismaClient> {
  if (_prisma) {
    return _prisma
  }

  try {
    // Step 1: Install @prisma/adapter-pg
    // npm install @prisma/adapter-pg
    //
    // Step 2: Uncomment the import below
    // import { PrismaPg } from '@prisma/adapter-pg'
    //
    // Step 3: Configure PrismaClient with adapter:
    // _prisma = new PrismaClient({
    //   adapter: new PrismaPg({
    //     connectionString: process.env.DATABASE_URL!,
    //   }),
    // })

    // For now, create without adapter while development database is configured
    const options: Record<string, unknown> = {}

    // Add accelerateUrl if available (Prisma Accelerate)
    if (process.env.ACCELERATE_URL) {
      options.accelerateUrl = process.env.ACCELERATE_URL
    }

    _prisma = new PrismaClient(options as never)

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = _prisma
    }

    return _prisma
  } catch (err) {
    console.error(
      '[Prisma] Initialization failed. Please configure DATABASE_URL and install @prisma/adapter-pg',
      err
    )
    throw err
  }
}



