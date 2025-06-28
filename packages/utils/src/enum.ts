import { pgEnum } from "drizzle-orm/pg-core";

export const dataProvidersEnum = pgEnum("data_provider_enum", [
  "withings",
  "apple",
]);
export const dataProvidersValues = dataProvidersEnum.enumValues;
export type DataProvider = (typeof dataProvidersValues)[number];
export const dataProviders = {
  WITHINGS: "withings",
  APPLE: "apple",
} as const satisfies Record<string, DataProvider>;

export const metricEnum = pgEnum("metric_enum", [
  "heart rate",
  "systolic bp",
  "diastolic bp",
  "blood glucose",
  "weight",
  "body temperature",
]);
export const metricValues = metricEnum.enumValues;
export type Metric = (typeof metricValues)[number];
export const metrics = {
  HEART_RATE: "heart rate",
  SYSTOLIC_BP: "systolic bp",
  DIASTOLIC_BP: "diastolic bp",
  BLOOD_GLUCOSE: "blood glucose",
  WEIGHT: "weight",
  BODY_TEMPERATURE: "body temperature",
} as const satisfies Record<string, Metric>;

export const unitEnum = pgEnum("unit_enum", [
  "bpm",
  "mmHg",
  "mg/dL",
  "kg",
  "celsius",
]);
export const unitValues = unitEnum.enumValues;
export type Unit = (typeof unitValues)[number];
export const units = {
  BPM: "bpm",
  MMHG: "mmHg",
  MGDL: "mg/dL",
  KG: "kg",
  CELSIUS: "celsius",
} as const satisfies Record<string, Unit>;
