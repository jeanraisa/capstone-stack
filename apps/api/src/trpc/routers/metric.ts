import { metricValues, unitValues } from "@capstone/utils/enum";
import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";
import { syncMetric } from "~api/db/queries/metric";
import { protectedProcedure } from "../init";

export const metricRouter = {
  add: protectedProcedure
    .input(
      z.object({
        type: z.enum(metricValues),
        value: z.number(),
        unit: z.enum(unitValues),
        date: z.iso.date(),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input }) => {
      await syncMetric(db, {
        type: input.type,
        userId: session.user.id,
        value: input.value,
        unit: input.unit,
        estimated: false,
        date: input.date,
      });
    }),
} satisfies TRPCRouterRecord;
