import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor() {
    // 2. Initialize the Pool with your connection string
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL as string,
      max: 10,
      connectionTimeoutMillis: 15_000, // fail with a real error instead of hanging
      idleTimeoutMillis: 60_000, // keep connections warm between requests
      keepAlive: true, // stop the network or host dropping idle sockets
    });

    // Without this, a dropped idle connection can crash the process
    pool.on('error', (err) =>
      console.error('Postgres pool error:', err.message),
    );

    super({
      adapter: new PrismaPg(pool),
      // Default is maxWait 2s / timeout 5s, which is too tight for a remote DB
      transactionOptions: { maxWait: 15_000, timeout: 20_000 },
    });

    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect(); // open the first connection at startup
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
