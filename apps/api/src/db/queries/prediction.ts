import type { PredictionClass, PredictionLabel } from "@capstone/utils/enum";
import type { Database } from "..";
import { generatePredictionId } from "../id";
import { prediction } from "../schema";

export async function addPrediction(
  db: Database,
  options: {
    userId: string;
    heartRate: number;
    bodyTemperature: number;
    diastolicBloodPressure: number;
    systolicBloodPressure: number;
    bloodGlucose: number;
    date: string;
    class: PredictionClass;
    label: PredictionLabel;
  },
) {
  await db.insert(prediction).values({
    id: generatePredictionId(),
    ...options,
  });
}

export async function getLatestPrediction(
  db: Database,
  options: { userId: string },
) {
  return db.query.prediction
    .findFirst({
      where: (row, { eq }) => eq(row.userId, options.userId),
      orderBy: (row, { desc }) => [desc(row.createdAt)],
    })
    .then((row) => row ?? null);
}

export async function getPreditions(
  db: Database,
  options: {
    userId: string;
    from: string;
    to: string;
  },
) {
  return db.query.prediction.findMany({
    where: (row, { eq, and, between }) =>
      and(
        eq(row.userId, options.userId),
        between(row.date, options.from, options.to),
      ),
    orderBy: (row, { desc }) => [desc(row.createdAt)],
  });
}
