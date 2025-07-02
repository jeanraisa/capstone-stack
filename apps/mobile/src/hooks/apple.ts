import { metrics, units } from "@capstone/utils/enum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import AppleHealthKit, { type HealthKitPermissions } from "react-native-health";
import {
  syncBloodGlucose,
  syncBloodPressure,
  syncBodyTemperature,
  syncHeartRate,
  syncWeight,
} from "~/utils/apple";
import { trpc } from "~/utils/trpc";

export const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.BloodGlucose,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.Steps,
    ],
    write: [],
  },
} as const satisfies HealthKitPermissions;

export const permissionsIndexes = {
  heartRate: 0,
  bloodGlucose: 1,
  bodyTemperature: 2,
  diastolicBp: 3,
  systolicBp: 4,
  weight: 5,
  steps: 6,
} as const satisfies Record<string, number>;

export function useSyncAppleHealthMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    trpc.dataProvider.syncAppleHealth.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.dataProvider.getAppleHealthPermissions.queryFilter(),
        );
      },
    }),
  );
  return mutation;
}

export function useSyncHealthData() {
  const { data: applePermissions } = useQuery(
    trpc.dataProvider.getAppleHealthPermissions.queryOptions(),
  );

  const addBatchMutation = useMutation(
    trpc.metric.addBatch.mutationOptions({}),
  );

  React.useEffect(() => {
    if (applePermissions) {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      syncBodyTemperature({
        start: startOfToday,
        callBack: (results) => {
          addBatchMutation.mutate({
            kind: "single",
            unit: units.CELSIUS,
            type: metrics.BODY_TEMPERATURE,
            estimated: true,
            data: results,
          });
        },
      });

      syncHeartRate({
        start: startOfToday,
        callBack: (results) => {
          addBatchMutation.mutate({
            kind: "single",
            unit: units.BPM,
            type: metrics.HEART_RATE,
            estimated: true,
            data: results,
          });
        },
      });

      syncBloodGlucose({
        start: startOfToday,
        callBack: (results) => {
          addBatchMutation.mutate({
            kind: "single",
            unit: units.MGDL,
            type: metrics.BLOOD_GLUCOSE,
            estimated: true,
            data: results,
          });
        },
      });

      syncBloodPressure({
        start: startOfToday,
        callBack: (results) => {
          addBatchMutation.mutate({
            estimated: true,
            kind: "blood_pressure",
            data: results,
            unit: units.MMHG,
          });
        },
      });

      syncWeight({
        start: startOfToday,
        callBack: (results) => {
          addBatchMutation.mutate({
            estimated: true,
            kind: "single",
            data: results,
            unit: units.KG,
            type: metrics.WEIGHT,
          });
        },
      });
    }
  }, [applePermissions]);
}
