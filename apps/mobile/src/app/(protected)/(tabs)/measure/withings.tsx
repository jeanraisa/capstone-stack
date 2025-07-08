import * as AC from "@bacons/apple-colors";
import { dataProviders } from "@capstone/utils/enum";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";
import * as Card from "~/components/Card";
import { Footnote } from "~/components/Title";
import { useWarmupBrowser } from "~/hooks/browser";
import { useWithingsAuth } from "~/utils/oauth";
import { trpc } from "~/utils/trpc";

export default function () {
  const providerQuery = useQuery(
    trpc.dataProvider.get.queryOptions({ provider: dataProviders.WITHINGS }),
  );

  useWarmupBrowser();
  const { handleWithingsAuth, isPending } = useWithingsAuth("measure/withings");

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
            <Image
              source={require("../../../../../assets/logos/withings.jpg")}
              style={{ width: 35, height: 35, borderRadius: 5 }}
            />
          </View>
          <Footnote style={{ fontSize: 18 }}>Withings</Footnote>
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

      <Card.Section style={{ marginTop: 16 }}>
        {DATA.map((row, idx) => (
          <Card.Content key={row.id}>
            <Card.Item action="press">
              <Card.LeftIcon
                style={{ backgroundColor: row.background }}
                name={row.icon as any}
                color={row.color as any}
              />
              <View style={{ flex: 1 }}>
                <Card.Title>{row.title}</Card.Title>
              </View>
              <Card.RightIcon
                name="checkmark.seal.fill"
                color={
                  providerQuery.data?.isActive ? AC.systemBlue : AC.systemRed
                }
              />
            </Card.Item>
            {idx !== DATA.length - 1 && <Card.Separator />}
          </Card.Content>
        ))}
      </Card.Section>

      <TouchableOpacity
        onPress={async () => {
          handleWithingsAuth();
        }}
        disabled={isPending || providerQuery.data?.isActive}
        style={{
          backgroundColor: AC.systemBlue,
          padding: 12,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
        activeOpacity={0.8}
      >
        {isPending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Footnote style={{ fontSize: 15, color: "white" }}>
            {providerQuery.data?.isActive ? "Connected" : "Connect"}
          </Footnote>
        )}
      </TouchableOpacity>
    </BodyScrollView>
  );
}

const DATA = [
  {
    id: "3",
    icon: "heart.fill",
    title: "Heart Rate",
    color: "#fff",
    background: AC.systemBlue,
  },
  {
    id: "4",
    icon: "flame.fill",
    title: "Blood Glucose",
    color: "#fff",
    background: AC.systemYellow,
  },
  {
    id: "5",
    icon: "waveform.path.ecg",
    title: "Systolic BP",
    color: "#fff",
    background: AC.systemIndigo,
  },
  {
    id: "6",
    icon: "waveform.path.ecg",
    title: "Diastolic BP",
    color: "#fff",
    background: AC.systemPurple,
  },
  {
    id: "7",
    icon: "thermometer.variable",
    title: "Body Temperature",
    color: "#fff",
    background: AC.systemOrange,
  },
  {
    id: "8",
    icon: "scalemass.fill",
    title: "Weight",
    color: "#fff",
    background: AC.systemGreen,
  },
];
