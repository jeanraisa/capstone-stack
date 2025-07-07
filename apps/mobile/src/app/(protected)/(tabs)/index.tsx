import type React from "react";
import { BodyScrollView } from "~/components/BodyScrollView";
import { useBottomTabOverflow } from "~/components/Tabs";
import { HeartRateVital } from "~/components/vitals/HeartRate";

import { LatestMeasurement } from "~/components/LatestResult";
import { Headline } from "~/components/Title";
import { BloodGlucoseVital } from "~/components/vitals/BloodGlucose";
import { BloodPressureVital } from "~/components/vitals/BloodPressure";
import { BoodyTemperatureVital } from "~/components/vitals/BodyTemperature";

const Home: React.FC = () => {
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
      <Headline>Latest Result</Headline>
      <LatestMeasurement />
      <Headline>Latest measurements</Headline>
      <HeartRateVital />
      <BloodPressureVital />
      <BloodGlucoseVital />
      <BoodyTemperatureVital />

      {/* <Headline>Body Measurements</Headline> */}
      {/* <WeightVital /> */}
    </BodyScrollView>
  );
};

export default Home;
