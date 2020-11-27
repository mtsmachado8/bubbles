import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient
// Ensure the prisma instance is re-used during hot-reloading
// Otherwise, a new client will be created on every reload
// Track progress of this issue here https://github.com/prisma-labs/next-prisma-plugin/issues/20
globalThis["prisma"] = globalThis["prisma"] || new PrismaClient()
prisma = globalThis["prisma"]

export default prisma