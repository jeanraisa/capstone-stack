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
