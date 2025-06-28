import type { ScrollViewProps } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabOverflow } from "./Tabs";

export function BodyScrollView(
  props: ScrollViewProps & { ref?: React.RefObject<Animated.ScrollView> },
) {
  const paddingBottom = useBottomTabOverflow();

  const { top: statusBarInset, bottom } = useSafeAreaInsets(); // inset of the status bar

  // const largeHeaderInset = statusBarInset + 92;

  // useScrollToTop(props.ref!, -largeHeaderInset);

  return (
    <Animated.ScrollView
      scrollToOverflowEnabled
      automaticallyAdjustsScrollIndicatorInsets
      scrollEventThrottle={16}
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{ bottom: paddingBottom }}
      scrollIndicatorInsets={{
        bottom: paddingBottom - bottom,
      }}
      {...props}
      style={[props.style]}
    />
  );
}
