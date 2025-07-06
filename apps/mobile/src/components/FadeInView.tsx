import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

export function FadeInView({ children }: { children: React.ReactNode }) {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      layout={LinearTransition.damping(8)}
    >
      {children}
    </Animated.View>
  );
}
