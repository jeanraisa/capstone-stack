import { BodyScrollView } from "~/components/BodyScrollView";
import { PastResults } from "~/components/PastResults";
import { useBottomTabOverflow } from "~/components/Tabs";
import { Headline } from "~/components/Title";
import { TodayResults } from "~/components/TodaysResults";

export default function ResultTab() {
  const tabHeight = useBottomTabOverflow();

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingTop: 30,
        paddingHorizontal: 18,
        paddingBottom: tabHeight,
        gap: 18,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Headline>Today</Headline>
      <TodayResults />
      <Headline>Past 7 days</Headline>
      <PastResults />
    </BodyScrollView>
  );
}
