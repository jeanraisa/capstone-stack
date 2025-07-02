import { dataProviders, dataProvidersValues } from "@capstone/utils/enum";
import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";
import { Withings } from "~api/auth/withings";
import {
  addDataProvider,
  getAppleHealthPermissions,
  getDataProvider,
  syncAppleHealthPermissions,
} from "~api/db/queries/data-provider";
import { protectedProcedure } from "../init";

export const dataProviderRouter = {
  get: protectedProcedure
    .input(
      z.object({
        provider: z.enum(dataProvidersValues),
      }),
    )
    .query(async ({ ctx: { db, session }, input }) => {
      return getDataProvider(db, {
        userId: session.user.id,
        provider: input.provider,
      });
    }),
  registerWithings: protectedProcedure
    .input(
      z.object({
        code: z.string(),
        redirectURI: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input }) => {
      const withings = new Withings(
        process.env.WITHINGS_CLIENT_ID!,
        process.env.WITHINGS_CLIENT_SECRET!,
        input.redirectURI,
      );

      const tokens = await withings.validateAuthorizationCode(input.code);
      let withingsUserId: string | null = null;
      if ("userid" in tokens.data) {
        withingsUserId = tokens.data.userid as string;
      }

      if (!withingsUserId) return;

      await addDataProvider(db, {
        userId: session.user.id,
        provider: dataProviders.WITHINGS,
        providerUserId: withingsUserId,
        accessToken: tokens.accessToken(),
        refreshToken: tokens.refreshToken(),
        expiresAt: tokens.accessTokenExpiresAt(),
      });
    }),
  syncAppleHealth: protectedProcedure
    .input(
      z.object({
        heartRate: z.boolean().optional(),
        bloodGlucose: z.boolean().optional(),
        bodyTemperature: z.boolean().optional(),
        diastolicBp: z.boolean().optional(),
        systolicBp: z.boolean().optional(),
        weight: z.boolean().optional(),
        steps: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input }) => {
      await syncAppleHealthPermissions(db, {
        userId: session.user.id,
        ...input,
      });
    }),
  getAppleHealthPermissions: protectedProcedure.query(
    async ({ ctx: { db, session } }) => {
      return getAppleHealthPermissions(db, { userId: session.user.id });
    },
  ),
} satisfies TRPCRouterRecord;
