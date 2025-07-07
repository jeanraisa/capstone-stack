import { toIsoUtcDate } from "@capstone/utils/date";
import {
  type PredictionClass,
  type PredictionLabel,
  metricValues,
  metrics,
  unitValues,
} from "@capstone/utils/enum";
import { celsiusToFahrenheit } from "@capstone/utils/format";
import { poundsToKg } from "@capstone/utils/format";
import type { TRPCRouterRecord } from "@trpc/server";
import { differenceInYears } from "date-fns";
import { z } from "zod/v4";
import { generateMetricId } from "~api/db/id";
import {
  addMetrics,
  canMakePrediction,
  getDailyStats,
  getPredictionMetrics,
  syncBatch,
} from "~api/db/queries/metric";
import { addPrediction } from "~api/db/queries/prediction";
import { getUserStatus } from "~api/db/queries/users";
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
        date: z.iso.date(),
        predict: z.boolean().default(true),
        data: z.array(
          z.object({
            type: z.enum(metricValues),
            value: z.number(),
            unit: z.enum(unitValues),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input }) => {
      await addMetrics(db, {
        data: input.data.map((row) => ({
          id: generateMetricId(),
          estimated: false,
          userId: session.user.id,
          date: input.date,
          ...row,
        })),
      });

      if (input.predict) {
        const [predictionsMetrics, userStatus] = await Promise.all([
          getPredictionMetrics(db, {
            userId: session.user.id,
          }),
          getUserStatus(db, { userId: session.user.id }),
        ]);

        if (
          Object.entries(predictionsMetrics).length < 5 ||
          !userStatus?.onboarded ||
          !userStatus?.dob
        )
          return;

        const heartRate = predictionsMetrics[metrics.HEART_RATE]?.value ?? 0;
        const bloodGlucose =
          predictionsMetrics[metrics.BLOOD_GLUCOSE]?.value ?? 0;
        const systolicBP = predictionsMetrics[metrics.SYSTOLIC_BP]?.value ?? 0;
        const diastolicBP =
          predictionsMetrics[metrics.DIASTOLIC_BP]?.value ?? 0;
        const bodyTemp =
          predictionsMetrics[metrics.BODY_TEMPERATURE]?.value ?? 0;
        const tempToFahrenheit = celsiusToFahrenheit(bodyTemp);

        // to be fixed
        const yearsOld = differenceInYears(new Date(), userStatus.dob);

        const predictionRequest = await fetch(
          `${process.env.HUGGING_FACE_SPACE}/predict`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Age: yearsOld,
              SystolicBP: systolicBP,
              DiastolicBP: diastolicBP,
              BS: bloodGlucose,
              BodyTemp: tempToFahrenheit,
              HeartRate: heartRate,
            }),
          },
        );

        if (!predictionRequest.ok) {
          return;
        }

        const prediction = (await predictionRequest.json()) as {
          predicted_class: PredictionClass;
          predicted_label: PredictionLabel;
        };

        await addPrediction(db, {
          userId: session.user.id,
          heartRate,
          bloodGlucose,
          systolicBloodPressure: systolicBP,
          diastolicBloodPressure: diastolicBP,
          date: input.date,
          bodyTemperature: bodyTemp,
          class: prediction.predicted_class,
          label: prediction.predicted_label,
        });
        console.log("ALL GOD");
      }
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
  getDailyStats: protectedProcedure
    .input(
      z.object({
        type: z.enum(metrics),
        limit: z.number().min(7).default(7),
      }),
    )
    .query(({ ctx: { db, session }, input }) => {
      return getDailyStats(db, { userId: session.user.id, ...input });
    }),

  canPredict: protectedProcedure
    .input(
      z.object({
        metrics: z.array(z.enum(metricValues)),
      }),
    )
    .query(async ({ ctx: { db, session }, input }) => {
      return canMakePrediction(db, {
        userId: session.user.id,
        metrics: input.metrics,
      });
    }),
} satisfies TRPCRouterRecord;
