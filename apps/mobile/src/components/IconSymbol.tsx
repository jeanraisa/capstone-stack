import {
  SymbolView,
  type SymbolViewProps,
  type SymbolWeight,
} from "expo-symbols";
import type { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
  animationSpec,
}: {
  name: SymbolViewProps["name"];
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
  animationSpec?: SymbolViewProps["animationSpec"];
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      animationSpec={animationSpec}
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}

export type IconSymbolName = SymbolViewProps["name"];
