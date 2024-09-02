
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// Save the db instance in globalThis to avoid duplicate instances
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
