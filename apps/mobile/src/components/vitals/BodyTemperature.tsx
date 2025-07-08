import * as AC from "@bacons/apple-colors";
import { formatToHumanReadable } from "@capstone/utils/date";
import { metrics } from "@capstone/utils/enum";
import { useTheme } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { CartesianChart, Line } from "victory-native";
import { trpc } from "~/utils/trpc";
import { IconSymbol } from "../IconSymbol";
import { PulseView } from "../PulseView";
import { Footnote } from "../Title";

export function BoodyTemperatureVital() {
  const theme = useTheme();
  const stats = useQuery(
    trpc.metric.getDailyStats.queryOptions({
      type: metrics.BODY_TEMPERATURE,
    }),
  );

  if (stats.isPending || stats.isError) {
    return <PulseView />;
  }

  return (
    <Animated.View
      style={{
        gap: 20,
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 18,
        padding: 12,
      }}
      layout={LinearTransition.springify().damping(16)}
      entering={FadeIn.springify().damping(16)}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <IconSymbol
            name="waveform.path.ecg.rectangle"
            color={AC.systemPink}
            size={18}
          />
          <Footnote style={{ fontSize: 15, color: AC.systemPink }}>
            Body Temperature
          </Footnote>
        </View>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <Footnote style={{ color: AC.tertiaryLabel }}>
            {formatToHumanReadable({ isoDate: stats.data.latest?.date })}
          </Footnote>
          <IconSymbol name="chevron.right" color={AC.tertiaryLabel} size={12} />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {stats.data.latest ? (
          <View
            style={{ flexDirection: "row", alignItems: "flex-end", gap: 2 }}
          >
            <Footnote weight="semiBold">{stats.data.latest.value}</Footnote>
            <Footnote weight="semiBold" style={{ color: AC.tertiaryLabel }}>
              °C
            </Footnote>
          </View>
        ) : (
          <Footnote>No data</Footnote>
        )}

        <View
          style={{
            width: 60,
            height: 30,
          }}
        >
          <CartesianChart
            data={stats.data.dailyStats}
            xKey="date"
            yKeys={["max"]}
            domainPadding={2}
          >
            {({ points }) => (
              <Line
                points={points.max}
                curveType="natural"
                color="rgba(255, 55, 95, 1)"
                strokeWidth={2}
                strokeCap="round"
              />
            )}
          </CartesianChart>
        </View>
      </View>
    </Animated.View>
  );
}
