import * as AC from "@bacons/apple-colors";
import { formatToHumanReadable, toIsoUtcDate } from "@capstone/utils/date";
import type { PredictionClass } from "@capstone/utils/enum";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import { type OpaqueColorValue, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { trpc } from "~/utils/trpc";
import { IconSymbol } from "./IconSymbol";
import { PulseView } from "./PulseView";
import { Footnote, Headline } from "./Title";

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

  if (results.isPending || results.isError) {
    return (
      <Animated.View
        layout={LinearTransition.springify().damping(16)}
        exiting={FadeOut.springify().damping(16)}
        style={{ gap: 18 }}
      >
        <PulseView height={140} />
      </Animated.View>
    );
  }

  if (!results.data.length) {
    return (
      <Animated.View
        layout={LinearTransition.springify().damping(16)}
        entering={FadeIn.springify().damping(16)}
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
        <IconSymbol name="externaldrive.fill" color={AC.systemBlue} size={34} />

        <Headline style={{ fontSize: 15 }}>Past Seven Days Results</Headline>
        <Footnote
          style={{ color: AC.secondaryLabel, textAlign: "center", width: 250 }}
        >
          No past results yet because there’s no recent vital data. Log your
          health metrics to enable predictions.
        </Footnote>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(16)}
      entering={FadeIn.springify().damping(16)}
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
