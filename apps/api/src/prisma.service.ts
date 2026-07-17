import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // 2. Initialize the Pool with your connection string
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL as string,
    });

    // 3. Pass the pool instance to the PrismaPg adapter
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }
}
