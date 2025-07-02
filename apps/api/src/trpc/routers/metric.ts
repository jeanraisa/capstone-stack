import { toIsoUtcDate } from "@capstone/utils/date";
import { metricValues, metrics, unitValues } from "@capstone/utils/enum";
import { poundsToKg } from "@capstone/utils/format";
import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";
import { generateMetricId } from "~api/db/id";
import { syncBatch, syncMetric } from "~api/db/queries/metric";
import { protectedProcedure } from "../init";

const singleMetric = z.object({
  kind: z.literal("single"),
  unit: z.enum(unitValues),
  type: z.enum(metricValues),
  estimated: z.boolean(),
  data: z.array(
    z.object({
      value: z.number(),
      startDate: z.string(),
      id: z.string().optional(),
    }),
  ),
});

const bloodPressureMetric = z.object({
  kind: z.literal("blood_pressure"),
  unit: z.literal("mmHg"),
  estimated: z.boolean(),
  data: z.array(
    z.object({
      bloodPressureSystolicValue: z.number(),
      bloodPressureDiastolicValue: z.number(),
      startDate: z.string(),
    }),
  ),
});

const batchInput = z.discriminatedUnion("kind", [
  singleMetric,
  bloodPressureMetric,
]);

export const metricRouter = {
  add: protectedProcedure
    .input(
      z.object({
        type: z.enum(metricValues),
        value: z.number(),
        unit: z.enum(unitValues),
        date: z.iso.date(),
        providerId: z.string().optional(),
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
        providerId: input.providerId,
      });
    }),

  addBatch: protectedProcedure
    .input(batchInput)
    .mutation(async ({ ctx: { db, session }, input }) => {
      const userId = session.user.id;
      const rows =
        input.kind === "single"
          ? input.data.map((row) => ({
              id: generateMetricId(),
              userId,
              type: input.type,
              unit: input.unit,
              estimated: input.estimated,
              date: toIsoUtcDate(new Date(row.startDate)),
              value:
                input.type === metrics.WEIGHT
                  ? poundsToKg(row.value)
                  : row.value,
              providerId: row.id,
            }))
          : input.data.flatMap((row) => {
              const isoDate = toIsoUtcDate(new Date(row.startDate));
              return [
                {
                  id: generateMetricId(),
                  userId,
                  type: metrics.SYSTOLIC_BP,
                  unit: input.unit,
                  estimated: input.estimated,
                  date: isoDate,
                  value: row.bloodPressureSystolicValue,
                  providerId: `bp-${row.startDate}-systolic`,
                },
                {
                  id: generateMetricId(),
                  userId,
                  type: metrics.DIASTOLIC_BP,
                  unit: input.unit,
                  estimated: input.estimated,
                  date: isoDate,
                  value: row.bloodPressureDiastolicValue,
                  providerId: `bp-${row.startDate}-diastolic`,
                },
              ];
            });

      if (!rows.length) return;

      await syncBatch(db, { data: rows });
    }),
} satisfies TRPCRouterRecord;
