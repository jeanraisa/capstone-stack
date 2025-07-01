import * as AC from "@bacons/apple-colors";
import { dataProviders } from "@capstone/utils/enum";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";
import { IconSymbol } from "~/components/IconSymbol";
import { Footnote } from "~/components/Title";
import { useWarmupBrowser } from "~/hooks/browser";
import { useWithingsAuth } from "~/utils/oauth";
import { trpc } from "~/utils/trpc";

export default function () {
  const providerQuery = useQuery(
    trpc.dataProvider.get.queryOptions({ provider: dataProviders.WITHINGS }),
  );

  useWarmupBrowser();
  const { handleWithingsAuth, isPending } = useWithingsAuth("menu/withings");

  if (providerQuery.isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (providerQuery.isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Footnote>Sorry an error as occured</Footnote>
      </View>
    );
  }

  return (
    <BodyScrollView contentContainerStyle={{ paddingTop: 50, gap: 100 }}>
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
              backgroundColor: AC.opaqueSeparator,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconSymbol size={32} name="suit.heart.fill" color="#fff" />
          </View>
          <Footnote style={{ fontSize: 18 }}>Withings</Footnote>
        </View>
        <View style={{ marginBottom: 2 }}>
          <IconSymbol
            size={16}
            name="checkmark.seal.fill"
            color={
              providerQuery.data?.isActive ? AC.systemBlue : AC.opaqueSeparator
            }
          />
        </View>
      </View>

      <View style={{ width: 260, marginHorizontal: "auto" }}>
        <Footnote style={{ textAlign: "center" }}>
          Smart Scales, Watches and Health Monitoring Devices
        </Footnote>

        <Link href="https://www.withings.com/">
          <Footnote style={{ color: AC.systemBlue, textAlign: "center" }}>
            Learn more
          </Footnote>
        </Link>
      </View>

      <View style={{ width: 200, marginHorizontal: "auto" }}>
        <TouchableOpacity
          onPress={async () => {
            handleWithingsAuth();
          }}
          disabled={isPending || providerQuery.data?.isActive}
          style={{
            backgroundColor: providerQuery.data?.isActive
              ? AC.systemBrown
              : AC.systemBlue,
            padding: 12,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
          activeOpacity={0.8}
        >
          {isPending ? (
            <ActivityIndicator size="small" />
          ) : (
            <Footnote style={{ fontSize: 15, color: "white" }}>
              {providerQuery.data?.isActive ? "Connected" : "Connect"}
            </Footnote>
          )}
        </TouchableOpacity>
      </View>
    </BodyScrollView>
  );
}
