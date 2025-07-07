import { arrayToObject } from "@capstone/utils/data";
import { type Metric, type Unit, metrics } from "@capstone/utils/enum";
import {
  and,
  avg,
  countDistinct,
  desc,
  eq,
  inArray,
  max,
  min,
} from "drizzle-orm";
import type { Database } from "..";
import { metric } from "../schema";

export async function addMetrics(
  db: Database,
  options: {
    data: {
      userId: string;
      id: string;
      date: string;
      value: number;
      type: Metric;
      unit: Unit;
      estimated: boolean;
    }[];
  },
) {
  await db.insert(metric).values(options.data);
}

export async function syncBatch(
  db: Database,
  options: {
    data: {
      id: string;
      value: number;
      type: Metric;
      unit: Unit;
      userId: string;
      estimated: boolean;
      date: string;
      providerId?: string;
    }[];
  },
) {
  await db
    .insert(metric)
    .values(options.data)
    .onConflictDoNothing({ target: [metric.userId, metric.providerId] });
}

export async function getDailyStats(
  db: Database,
  options: {
    userId: string;
    type: Metric;
    limit: number;
  },
) {
  return Promise.all([
    db
      .select({
        value: metric.value,
        date: metric.date,
      })
      .from(metric)
      .where(
        and(eq(metric.type, options.type), eq(metric.userId, options.userId)),
      )
      .orderBy(desc(metric.addedAt))
      .limit(1),
    db
      .select({
        date: metric.date,
        average: avg(metric.value).mapWith(Number),
        min: min(metric.value).mapWith(Number),
        max: max(metric.value).mapWith(Number),
      })
      .from(metric)
      .where(
        and(eq(metric.userId, options.userId), eq(metric.type, options.type)),
      )
      .limit(options.limit)
      .groupBy(metric.date),
  ]).then(([latest, dailyStats]) => ({
    latest: latest[0] ?? null,
    dailyStats,
  }));
}

export async function canMakePrediction(
  db: Database,
  options: { userId: string; metrics: Metric[] },
) {
  return db
    .select({ count: countDistinct(metric.type).mapWith(Number) })
    .from(metric)
    .where(
      and(
        eq(metric.userId, options.userId),
        inArray(metric.type, options.metrics),
      ),
    )
    .then((rows) => rows[0]?.count === options.metrics.length);
}

export async function getPredictionMetrics(
  db: Database,
  options: { userId: string },
) {
  return db
    .selectDistinctOn([metric.type], {
      value: metric.value,
      type: metric.type,
    })
    .from(metric)
    .where(
      and(
        eq(metric.userId, options.userId),
        inArray(metric.type, [
          metrics.BLOOD_GLUCOSE,
          metrics.BODY_TEMPERATURE,
          metrics.SYSTOLIC_BP,
          metrics.DIASTOLIC_BP,
          metrics.HEART_RATE,
        ]),
      ),
    )
    .orderBy(metric.type, desc(metric.addedAt))
    .then((rows) => arrayToObject(rows, (row) => row.type));
}
