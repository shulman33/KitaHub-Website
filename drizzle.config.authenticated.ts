import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/app/db/schema.ts",
  out: "./src/app/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_AUTHENTICATED_URL!,
  },
  verbose: true,
  strict: true,
});
