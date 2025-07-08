import * as AC from "@bacons/apple-colors";
import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const easing = Easing.bezier(0.4, 0, 0.6, 1);
const duration = 1000;

export function PulseView({ height = 100 }: { height?: number }) {
  const sv = useSharedValue(0.6);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: sv.value,
    };
  });
  React.useEffect(() => {
    sv.value = withRepeat(
      withSequence(
        withTiming(1, { duration, easing }),
        withTiming(0.6, { duration, easing }),
      ),
      -1,
    );
  }, []);
  return (
    <Animated.View
      style={[
        {
          backgroundColor: AC.secondarySystemBackground,
          borderCurve: "continuous",
          borderRadius: 16,
          overflow: "hidden",
          height,
        },
        animatedStyles,
      ]}
    />
  );
}
