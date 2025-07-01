import type { Metric, Unit } from "@capstone/utils/enum";
import type { Database } from "..";
import { generateMetricId } from "../id";
import { metric } from "../schema";

export async function syncMetric(
  db: Database,
  options: {
    value: number;
    type: Metric;
    unit: Unit;
    userId: string;
    estimated: boolean;
    date: string;
  },
) {
  await db.insert(metric).values({
    id: generateMetricId(),
    userId: options.userId,
    value: options.value,
    unit: options.unit,
    estimated: options.estimated,
    type: options.type,
    date: options.date,
  });
}
