import * as AC from "@bacons/apple-colors";
import type { PredictionClass } from "@capstone/utils/enum";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { type OpaqueColorValue, TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { trpc } from "~/utils/trpc";
import { IconSymbol } from "./IconSymbol";
import { Caption, Footnote, Headline } from "./Title";

export function LatestMeasurement() {
  const prediction = useQuery(trpc.prediction.latest.queryOptions());

  if (prediction.isPending || prediction.isError) return null;

  if (!prediction.data) {
    return (
      <>
        <Animated.View
          layout={LinearTransition.springify().damping(16)}
          style={{
            backgroundColor: AC.secondarySystemBackground,
            borderCurve: "continuous",
            borderRadius: 16,
            overflow: "hidden",
            gap: 2,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconSymbol name="stethoscope" color={AC.systemBlue} size={34} />

          <Headline style={{ fontSize: 15 }}>
            Your latest test result will appear here
          </Headline>
          <Footnote style={{ color: AC.secondaryLabel }}>
            Add more measurements and run tests
          </Footnote>
        </Animated.View>

        <Link href="/measure" asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 12,
                borderRadius: 24,
                backgroundColor: AC.secondarySystemBackground,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 6,
                }}
              >
                <IconSymbol
                  weight="semibold"
                  name="waveform.path.ecg.rectangle.fill"
                  color={AC.systemBlue}
                  size={24}
                />
                <Footnote style={{ fontSize: 14 }}>
                  Add all necessary vital measures
                </Footnote>
              </View>
              <IconSymbol
                name="chevron.right"
                color={AC.opaqueSeparator}
                size={18}
              />
            </View>
          </TouchableOpacity>
        </Link>
      </>
    );
  }

  const status = data[prediction.data.class as PredictionClass];

  return (
    <>
      <Animated.View
        layout={LinearTransition.springify().damping(16)}
        style={{
          borderCurve: "continuous",
          borderRadius: 16,
          overflow: "hidden",
          gap: 2,
        }}
      >
        <View
          style={{
            backgroundColor: AC.secondarySystemBackground,
            paddingVertical: 12,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <IconSymbol name="flame.circle.fill" color={status.color} size={34} />

          <View>
            <Headline style={{ color: status.color, fontSize: 15 }}>
              {prediction.data.label}
            </Headline>
            <Caption>{status.description}</Caption>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 12,
            backgroundColor: AC.secondarySystemBackground,
            gap: 6,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <IconSymbol
              name="waveform.path.ecg"
              color={AC.systemBlue}
              size={18}
            />
            <Headline style={{ fontSize: 15, color: AC.systemBlue }}>
              Current Vital Signs
            </Headline>
          </View>

          <View style={{ gap: 6 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 6,
                }}
              >
                <IconSymbol
                  name="waveform.path"
                  color={AC.systemPink}
                  size={18}
                />
                <View>
                  <Footnote style={{ color: AC.systemPink }}>
                    Heart Rate
                  </Footnote>
                  <Footnote>{prediction.data.heartRate} bpm</Footnote>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 6,
                }}
              >
                <IconSymbol
                  name="waveform.path.ecg.rectangle"
                  color={AC.systemPink}
                  size={18}
                />
                <View>
                  <Footnote style={{ color: AC.systemPink }}>
                    Blood Glucose
                  </Footnote>
                  <Footnote>{prediction.data.bloodGlucose} mg/gL</Footnote>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 6,
                }}
              >
                <IconSymbol
                  name="waveform.path.ecg.rectangle"
                  color={AC.systemPink}
                  size={18}
                />
                <View>
                  <Footnote style={{ color: AC.systemPink }}>
                    Body Temperature
                  </Footnote>
                  <Footnote>{prediction.data.bodyTemperature} °C</Footnote>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 6,
                }}
              >
                <IconSymbol
                  name="waveform.path.ecg.rectangle"
                  color={AC.systemPink}
                  size={18}
                />
                <View>
                  <Footnote style={{ color: AC.systemPink }}>
                    Blood Pressure
                  </Footnote>
                  <Footnote>
                    {prediction.data.systolicBloodPressure}/
                    {prediction.data.diastolicBloodPressure} mmHg
                  </Footnote>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      <Link href="/result" asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 12,
              borderRadius: 24,
              backgroundColor: AC.secondarySystemBackground,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 6,
              }}
            >
              <IconSymbol
                weight="semibold"
                name="stethoscope"
                color={AC.systemBlue}
                size={24}
              />
              <Footnote style={{ fontSize: 14 }}>
                Show All Health Results
              </Footnote>
            </View>
            <IconSymbol
              name="chevron.right"
              color={AC.opaqueSeparator}
              size={18}
            />
          </View>
        </TouchableOpacity>
      </Link>
    </>
  );
}

const data = {
  1: {
    color: AC.opaqueSeparator,
    description:
      "Some of your health metrics are slightly outside the normal range",
  },
  2: {
    color: AC.systemOrange,
    description: "Your health data shows significant signs of concern",
  },
  0: {
    color: AC.systemGreen,
    description:
      "Your current health indicators are within the expected range.",
  },
} as const satisfies Record<
  PredictionClass,
  {
    color: OpaqueColorValue;
    description: string;
  }
>;
