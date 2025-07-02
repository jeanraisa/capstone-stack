import AppleHealthKit, {
  type BloodPressureSampleValue,
  type HealthValue,
} from "react-native-health";

export function checkHealthKitAvailability(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    AppleHealthKit.isAvailable((error, available) => {
      if (error) {
        reject(error);
      } else {
        resolve(available);
      }
    });
  });
}

export function syncBodyTemperature({
  start,
  limit,
  callBack,
}: {
  start: Date;
  limit?: number;
  callBack: (result: Array<HealthValue>) => void;
}) {
  const options = {
    unit: AppleHealthKit.Constants.Units.celsius,
    startDate: start.toISOString(),
    ascending: false,
    limit,
  };
  try {
    AppleHealthKit.getBodyTemperatureSamples(options, (err, results) => {
      if (err) {
        return;
      }
      callBack(results);
    });
  } catch (e) {
    console.error("body temp sync error", e);
  }
}

export function syncHeartRate({
  start,
  limit,
  callBack,
}: {
  start: Date;
  limit?: number;
  callBack: (result: Array<HealthValue>) => void;
}) {
  const options = {
    unit: AppleHealthKit.Constants.Units.bpm,
    startDate: start.toISOString(),
    ascending: false,
    limit,
  };

  try {
    AppleHealthKit.getHeartRateSamples(options, (err, results) => {
      if (err) {
        return;
      }
      callBack(results);
    });
  } catch (e) {
    console.error("heart rate sync error", e);
  }
}

export function syncBloodGlucose({
  start,
  limit,
  callBack,
}: {
  start: Date;
  limit?: number;
  callBack: (result: Array<HealthValue>) => void;
}) {
  const options = {
    unit: AppleHealthKit.Constants.Units.mgPerdL,
    startDate: start.toISOString(),
    ascending: false,
    limit,
  };

  try {
    AppleHealthKit.getBloodGlucoseSamples(options, (err, results) => {
      if (err) {
        return;
      }
      callBack(results);
    });
  } catch (e) {
    console.error("blood glucose sync error", e);
  }
}

export function syncBloodPressure({
  start,
  limit,
  callBack,
}: {
  start: Date;
  limit?: number;
  callBack: (result: BloodPressureSampleValue[]) => void;
}) {
  const options = {
    unit: AppleHealthKit.Constants.Units.mmhg,
    startDate: start.toISOString(),
    ascending: false,
    limit,
  };

  try {
    AppleHealthKit.getBloodPressureSamples(options, (err, results) => {
      if (err) {
        return;
      }
      callBack(results);
    });
  } catch (e) {
    console.error("Blood Pressure sync error", e);
  }
}

export function syncWeight({
  start,
  limit,
  callBack,
}: {
  start: Date;
  limit?: number;
  callBack: (result: Array<HealthValue>) => void;
}) {
  const options = {
    unit: AppleHealthKit.Constants.Units.pound,
    startDate: start.toISOString(),
    ascending: false,
    limit,
  };

  try {
    AppleHealthKit.getWeightSamples(options, (err, results) => {
      if (err) {
        return;
      }
      callBack(results);
    });
  } catch (e) {
    console.error("weight sync error", e);
  }
}
