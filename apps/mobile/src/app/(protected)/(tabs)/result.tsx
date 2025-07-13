import { BodyScrollView } from "~/components/BodyScrollView";
import { PastResults } from "~/components/PastResults";
import { Headline } from "~/components/Title";
import { TodayResults } from "~/components/TodaysResults";

export default function ResultTab() {
  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingTop: 50,
        paddingHorizontal: 16,
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
