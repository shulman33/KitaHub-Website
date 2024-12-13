import { Redis } from "@upstash/redis"
import { config } from "dotenv";

config({ path: ".env.local" });

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
})
