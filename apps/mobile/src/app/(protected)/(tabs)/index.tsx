import type React from "react";
import { BodyScrollView } from "~/components/BodyScrollView";
import { HeartRateVital } from "~/components/vitals/HeartRate";

import { LatestMeasurement } from "~/components/LatestResult";
import { Headline } from "~/components/Title";
import { BloodGlucoseVital } from "~/components/vitals/BloodGlucose";
import { BloodPressureVital } from "~/components/vitals/BloodPressure";
import { BoodyTemperatureVital } from "~/components/vitals/BodyTemperature";

const Home: React.FC = () => {
  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingTop: 50,
        paddingHorizontal: 16,
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
