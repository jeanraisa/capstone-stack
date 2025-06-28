import * as AC from "@bacons/apple-colors";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  ANIMATED_HEADER_TOP_OFFSET,
  DUMMY_ITEM_HEIGHT,
  HEADER_HEIGHT,
  SCREEN_HEIGHT,
  TOP_PADDING,
} from "~/constants/AppConstants";
import { Title2 } from "./Title";

export const AnimatedHeaderTitle = ({
  scrollY,
  title,
}: {
  scrollY: SharedValue<number>;
  title: string;
}) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useDerivedValue(() => {
    translateY.value = interpolate(
      scrollY.value,
      [-SCREEN_HEIGHT, 0, ANIMATED_HEADER_TOP_OFFSET],
      [SCREEN_HEIGHT, 0, -ANIMATED_HEADER_TOP_OFFSET * 0.9],
      Extrapolation.CLAMP,
    );
    scale.value = withSpring(
      interpolate(
        scrollY.value,
        [0, ANIMATED_HEADER_TOP_OFFSET * 0.5, ANIMATED_HEADER_TOP_OFFSET],
        [1, 0.8, 0.6],
        Extrapolation.CLAMP,
      ),
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: ANIMATED_HEADER_TOP_OFFSET,
      transform: [
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Title2 style={[styles.textStyle, { color: AC.label }]}>{title}</Title2>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 2,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  scrollViewContent: {
    paddingTop: HEADER_HEIGHT + TOP_PADDING,
    paddingBottom: 50,
  },
  headerTitleSpace: {
    height: DUMMY_ITEM_HEIGHT,
    alignSelf: "center",
    width: "100%",
  },
  icon: {
    alignSelf: "center",
  },
});
