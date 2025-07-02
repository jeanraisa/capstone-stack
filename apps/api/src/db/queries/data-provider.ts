import type { DataProvider } from "@capstone/utils/enum";
import type { Database } from "..";
import { generateDataProviderId } from "../id";
import { appleHealthPermissions, dataProviderAccount } from "../schema";

export async function addDataProvider(
  db: Database,
  options: {
    provider: DataProvider;
    userId: string;
    providerUserId: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
  },
) {
  await db
    .insert(dataProviderAccount)
    .values({
      id: generateDataProviderId(),
      provider: options.provider,
      providerUserId: options.providerUserId,
      userId: options.userId,
      accessToken: options.accessToken,
      refreshToken: options.refreshToken,
      expiresAt: options.expiresAt,
    })
    .onConflictDoUpdate({
      target: [
        dataProviderAccount.provider,
        dataProviderAccount.providerUserId,
      ],
      set: {
        accessToken: options.accessToken,
        refreshToken: options.refreshToken,
        expiresAt: options.expiresAt,
        isActive: true,
      },
    });
}

export async function getDataProvider(
  db: Database,
  options: { provider: DataProvider; userId: string },
) {
  return db.query.dataProviderAccount
    .findFirst({
      where: (row, { eq, and }) =>
        and(eq(row.userId, options.userId), eq(row.provider, options.provider)),
      columns: {
        provider: true,
        isActive: true,
        refreshToken: true,
      },
    })
    .then((row) => row ?? null);
}

export async function syncAppleHealthPermissions(
  db: Database,
  options: {
    userId: string;
    heartRate?: boolean;
    bloodGlucose?: boolean;
    bodyTemperature?: boolean;
    diastolicBp?: boolean;
    systolicBp?: boolean;
    weight?: boolean;
    steps?: boolean;
  },
) {
  await db
    .insert(appleHealthPermissions)
    .values({
      userId: options.userId,
      heartRate: options.heartRate,
      bloodGlucose: options.bloodGlucose,
      bodyTemperature: options.bodyTemperature,
      diastolicBp: options.diastolicBp,
      systolicBp: options.systolicBp,
      weight: options.weight,
      steps: options.weight,
    })
    .onConflictDoUpdate({
      target: [appleHealthPermissions.userId],
      set: {
        heartRate: options.heartRate,
        bloodGlucose: options.bloodGlucose,
        bodyTemperature: options.bodyTemperature,
        diastolicBp: options.diastolicBp,
        systolicBp: options.systolicBp,
        weight: options.weight,
        steps: options.weight,
      },
    });
}

export async function getAppleHealthPermissions(
  db: Database,
  options: {
    userId: string;
  },
) {
  return db.query.appleHealthPermissions
    .findFirst({
      where: (row, { eq }) => eq(row.userId, options.userId),
      columns: {
        userId: false,
      },
    })
    .then((row) => row ?? null);
}
