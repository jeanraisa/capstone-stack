import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";
import { getLatestPrediction, getPreditions } from "~api/db/queries/prediction";
import { protectedProcedure } from "../init";

export const predictionRouter = {
  latest: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    return getLatestPrediction(db, { userId: session.user.id });
  }),
  many: protectedProcedure
    .input(
      z.object({
        from: z.iso.date(),
        to: z.iso.date(),
      }),
    )
    .query(async ({ ctx: { db, session }, input }) => {
      return getPreditions(db, {
        userId: session.user.id,
        ...input,
      });
    }),
} satisfies TRPCRouterRecord;
