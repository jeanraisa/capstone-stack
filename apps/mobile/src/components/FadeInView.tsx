import type { ViewProps } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

export function FadeInView({
  children,
  style,
}: {
  children: React.ReactNode;
  style: ViewProps["style"];
}) {
  return (
    <Animated.View
      style={style}
      entering={FadeIn.duration(500)}
      layout={LinearTransition.damping(8)}
    >
      {children}
    </Animated.View>
  );
}
