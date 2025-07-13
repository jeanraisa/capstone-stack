import * as AC from "@bacons/apple-colors";
import { metrics, units } from "@capstone/utils/enum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import AppleHealthKit from "react-native-health";
import { BodyScrollView } from "~/components/BodyScrollView";
import * as Card from "~/components/Card";
import { IconSymbol } from "~/components/IconSymbol";
import { Footnote } from "~/components/Title";
import { permissions, useSyncAppleHealthMutation } from "~/hooks/apple";
import {
  checkHealthKitAvailability,
  syncBloodGlucose,
  syncBloodPressure,
  syncBodyTemperature,
  syncHeartRate,
  syncWeight,
} from "~/utils/apple";
import { trpc } from "~/utils/trpc";

// type Variable = NonNullable<
//   RouterOutputs["dataProvider"]["getAppleHealthPermissions"]
// >;

export default function AppleScreen() {
  const syncMutation = useSyncAppleHealthMutation();
  const applePermissions = useQuery(
    trpc.dataProvider.getAppleHealthPermissions.queryOptions(),
  );
  const addBatchMutation = useMutation(
    trpc.metric.addBatch.mutationOptions({}),
  );

  // const optmisticVariables = useMutationState({
  //   filters: {
  //     mutationKey: trpc.dataProvider.syncAppleHealth.mutationKey(),
  //     status: "pending",
  //   },
  //   select: (mutation) => mutation.state.variables as Variable,
  // });

  if (applePermissions.isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (applePermissions.isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Footnote>Sorry an error as occured</Footnote>
      </View>
    );
  }

  return (
    <BodyScrollView
      contentContainerStyle={{ paddingTop: 50, gap: 16, paddingHorizontal: 16 }}
    >
      <View
        style={{
          marginHorizontal: "auto",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 4,
        }}
      >
        <View style={{ gap: 8, alignItems: "center" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconSymbol size={32} name="apple.logo" color={AC.label} />
          </View>
        </View>
      </View>

      <View style={{ width: 260, marginHorizontal: "auto" }}>
        <Footnote style={{ textAlign: "center" }}>
          Collects health data from Apple devices and connected apps.
        </Footnote>

        <Link href="https://www.apple.com/health/">
          <Footnote style={{ color: AC.systemBlue, textAlign: "center" }}>
            Learn more
          </Footnote>
        </Link>
      </View>

      <Card.Section style={{ marginTop: 24 }}>
        <Card.Content>
          <Card.Item action="press">
            <Card.LeftIcon
              style={{ backgroundColor: AC.systemBlue }}
              name="heart.fill"
              color="#fff"
            />
            <View style={{ flex: 1 }}>
              <Card.Title>Heart Rate</Card.Title>
            </View>
            <Card.RightIcon
              name="checkmark.seal.fill"
              color={
                applePermissions.data?.heartRate ? AC.systemBlue : AC.systemRed
              }
            />
          </Card.Item>
          <Card.Separator />
          <Card.Item action="press">
            <Card.LeftIcon
              style={{ backgroundColor: AC.systemYellow }}
              name="flame.fill"
              color="#fff"
            />
            <View style={{ flex: 1 }}>
              <Card.Title>Blood Glucose</Card.Title>
            </View>
            <Card.RightIcon
              name="checkmark.seal.fill"
              color={
                applePermissions.data?.bloodGlucose
                  ? AC.systemBlue
                  : AC.systemRed
              }
            />
          </Card.Item>
          <Card.Separator />
          <Card.Item action="press">
            <Card.LeftIcon
              style={{ backgroundColor: AC.systemIndigo }}
              name="waveform.path.ecg"
              color="#fff"
            />
            <View style={{ flex: 1 }}>
              <Card.Title>Systolic BP</Card.Title>
            </View>
            <Card.RightIcon
              name="checkmark.seal.fill"
              color={
                applePermissions.data?.systolicBp ? AC.systemBlue : AC.systemRed
              }
            />
          </Card.Item>
          <Card.Separator />
          <Card.Item action="press">
            <Card.LeftIcon
              style={{ backgroundColor: AC.systemPurple }}
              name="waveform.path.ecg"
              color="#fff"
            />
            <View style={{ flex: 1 }}>
              <Card.Title>Diastolic BP</Card.Title>
            </View>
            <Card.RightIcon
              name="checkmark.seal.fill"
              color={
                applePermissions.data?.diastolicBp
                  ? AC.systemBlue
                  : AC.systemRed
              }
            />
          </Card.Item>
          <Card.Separator />
          <Card.Item action="press">
            <Card.LeftIcon
              style={{ backgroundColor: AC.systemOrange }}
              name="thermometer.variable"
              color="#fff"
            />
            <View style={{ flex: 1 }}>
              <Card.Title>Body Temperature</Card.Title>
            </View>
            <Card.RightIcon
              name="checkmark.seal.fill"
              color={
                applePermissions.data?.bodyTemperature
                  ? AC.systemBlue
                  : AC.systemRed
              }
            />
          </Card.Item>
          <Card.Separator />
          <Card.Item action="press">
            <Card.LeftIcon
              style={{ backgroundColor: AC.systemGreen }}
              name="scalemass.fill"
              color="#fff"
            />
            <View style={{ flex: 1 }}>
              <Card.Title>Weight</Card.Title>
            </View>
            <Card.RightIcon
              name="checkmark.seal.fill"
              color={
                applePermissions.data?.weight ? AC.systemBlue : AC.systemRed
              }
            />
          </Card.Item>
        </Card.Content>
      </Card.Section>

      <TouchableOpacity
        onPress={async () => {
          const isAvailable = await checkHealthKitAvailability();
          if (!isAvailable) return;
          AppleHealthKit.initHealthKit(permissions, (error, healthValue) => {
            if (error) {
              console.log("APPLE CONNECTION ERROR", error);
              return;
            }

            if (healthValue) {
              syncMutation.mutate({
                heartRate: true,
                bloodGlucose: true,
                bodyTemperature: true,
                diastolicBp: true,
                systolicBp: true,
                weight: true,
                steps: true,
              });

              const startDate = new Date();
              startDate.setMonth(startDate.getMonth() - 2);

              syncBodyTemperature({
                start: startDate,
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
                start: startDate,
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
                start: startDate,
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
                start: startDate,
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
                start: startDate,
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
          });
        }}
        style={{
          backgroundColor: AC.systemBlue,
          padding: 12,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
        activeOpacity={0.8}
        disabled={
          syncMutation.isPending ||
          addBatchMutation.isPending ||
          !!applePermissions.data
        }
      >
        <Footnote style={{ fontSize: 15, color: "white" }}>
          {syncMutation.isPending || addBatchMutation.isPending ? (
            <ActivityIndicator size="small" color="white" />
          ) : applePermissions.data ? (
            "Connected"
          ) : (
            "Connect"
          )}
        </Footnote>
      </TouchableOpacity>
    </BodyScrollView>
  );
}
