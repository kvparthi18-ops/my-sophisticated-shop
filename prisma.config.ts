import "dotenv/config"; // Forces loading of your .env.local
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // This will now correctly pull from your environment
    url: process.env.POSTGRES_PRISMA_URL,
  },
});