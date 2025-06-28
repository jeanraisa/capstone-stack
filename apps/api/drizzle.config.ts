import type { Config } from "drizzle-kit";

export default {
  schema: ["./src/db/schema.ts", "../../packages/utils/src/enum.ts"],
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_SESSION_POOLER!,
  },
  casing: "snake_case",
} satisfies Config;
