import * as AC from "@bacons/apple-colors";
import { metrics } from "@capstone/utils/enum";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { trpc } from "~/utils/trpc";
import { IconSymbol } from "../IconSymbol";
import { Footnote } from "../Title";

export function BloodPressureVital() {
  const diastolicstats = useQuery(
    trpc.metric.getDailyStats.queryOptions({
      type: metrics.DIASTOLIC_BP,
    }),
  );

  const systolicStats = useQuery(
    trpc.metric.getDailyStats.queryOptions({
      type: metrics.SYSTOLIC_BP,
    }),
  );

  if (
    diastolicstats.isPending ||
    diastolicstats.isError ||
    systolicStats.isPending ||
    systolicStats.isError
  )
    return null;

  return (
    <Animated.View
      style={{
        gap: 24,
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 18,
        padding: 12,
      }}
      layout={LinearTransition.damping(8)}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <IconSymbol name="drop.fill" color={AC.systemPink} size={18} />
          <Footnote style={{ fontSize: 15, color: AC.systemPink }}>
            Blood Pressure
          </Footnote>
        </View>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          {/* <Footnote style={{ color: AC.tertiaryLabel }}>Jul 13</Footnote> */}
          <IconSymbol name="chevron.right" color={AC.tertiaryLabel} size={12} />
        </View>
      </View>

      {systolicStats.data.latest || diastolicstats.data.latest ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "flex-end", gap: 2 }}
          >
            <Footnote weight="semiBold">
              {systolicStats.data.latest?.value
                ? systolicStats.data.latest?.value
                : "-"}
              /
              {diastolicstats.data.latest?.value
                ? diastolicstats.data.latest?.value
                : "-"}
            </Footnote>
            <Footnote weight="semiBold" style={{ color: AC.tertiaryLabel }}>
              mmHg
            </Footnote>
          </View>
        </View>
      ) : (
        <Footnote>No Data</Footnote>
      )}
    </Animated.View>
  );
}
