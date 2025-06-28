import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  baseURL: process.env.BASE_URL!,
  secret: process.env.AUTH_SECRET!,
  plugins: [expo(), bearer()],
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  socialProviders: {
    apple: {
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      appBundleIdentifier: process.env.MOBILE_BUNDLE_ID as string,
    },
  },
  trustedOrigins: [
    "mamacare://",
    "mamacare-dev://",
    "mamacare-preview://",
    "https://appleid.apple.com",
  ],
});

export type Auth = typeof auth;
export type Session = Auth["$Infer"]["Session"];
