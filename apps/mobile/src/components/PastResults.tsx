import * as AC from "@bacons/apple-colors";
import { formatToHumanReadable, toIsoUtcDate } from "@capstone/utils/date";
import type { PredictionClass } from "@capstone/utils/enum";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import { type OpaqueColorValue, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { trpc } from "~/utils/trpc";
import { IconSymbol } from "./IconSymbol";
import { Footnote } from "./Title";

export function PastResults() {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const daysAgo = subDays(yesterday, 6);

  const results = useQuery(
    trpc.prediction.many.queryOptions({
      from: toIsoUtcDate(daysAgo),
      to: toIsoUtcDate(yesterday),
    }),
  );

  if (results.isPending || results.isError) return null;

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(16)}
      style={{ gap: 18 }}
    >
      {results.data.map((result) => (
        <Animated.View
          key={result.id}
          style={{
            borderCurve: "continuous",
            borderRadius: 16,
            backgroundColor: AC.secondarySystemBackground,
            overflow: "hidden",
            borderWidth: 0.5,
            borderColor: data[result.class as PredictionClass].color,
            padding: 12,
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Footnote>
                {formatToHumanReadable({ isoDate: result.date })}
              </Footnote>
              <Footnote>{localTimeFormat(result.createdAt)}</Footnote>
            </View>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: AC.tertiarySystemBackground,
                borderRadius: 10,
              }}
            >
              <Footnote
                style={{ color: data[result.class as PredictionClass].color }}
              >
                {result.label}
              </Footnote>
            </View>
          </View>

          <View>
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
                  <Footnote>{result.heartRate} bpm</Footnote>
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
                  <Footnote>{result.bloodGlucose} mg/gL</Footnote>
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
                  <Footnote>{result.bodyTemperature} °C</Footnote>
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
                    {result.systolicBloodPressure}/
                    {result.diastolicBloodPressure} mmHg
                  </Footnote>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      ))}
    </Animated.View>
  );
}

const data = {
  1: {
    color: AC.secondaryLabel,
  },
  2: {
    color: AC.systemOrange,
  },
  0: {
    color: AC.systemGreen,
  },
} as const satisfies Record<
  PredictionClass,
  {
    color: OpaqueColorValue;
  }
>;

function localTimeFormat(timestamp: string) {
  const cleaned = timestamp.replace(" ", "T").replace("+00", "Z");

  const date = new Date(cleaned);

  return format(date, "HH:mm a");
}
