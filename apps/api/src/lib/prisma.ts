import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      });
    }
    return PrismaSingleton.instance;
  }

  public static async disconnect(): Promise<void> {
    if (PrismaSingleton.instance) {
      await PrismaSingleton.instance.$disconnect();
    }
  }
}

export const prisma = PrismaSingleton.getInstance();
export const disconnectPrisma = PrismaSingleton.disconnect;
