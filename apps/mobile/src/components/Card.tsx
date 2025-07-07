import * as AC from "@bacons/apple-colors";
import { type Href, Link } from "expo-router";
import {
  type OpaqueColorValue,
  StyleSheet,
  type TextProps,
  TouchableHighlight,
  TouchableOpacity,
  View,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { IconSymbol, type IconSymbolName } from "./IconSymbol";
import { Footnote, Subheadline } from "./Title";

export function Section({ style, children, ...props }: ViewProps) {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
}

export function Content({ style, ...props }: ViewProps) {
  return <View style={[{ flex: 1 }, style]} {...props} />;
}

export function Item({
  style,
  href,
  onPress,
  children,
  ref,
  action,
}: Pick<ViewProps, "children"> & {
  href?: Href<any>;
  action?: "navigate" | "press";
  onPress?: (event: any) => void;
  style?: ViewStyle;
  ref?: React.Ref<View>;
}) {
  if (!action) {
    return <View style={[styles.item, style]}>{children}</View>;
  }

  if (action === "press") {
    return (
      <TouchableHighlight
        underlayColor={AC.opaqueSeparator}
        onPress={onPress}
        ref={ref}
      >
        <View style={[styles.item, style]}>{children}</View>
      </TouchableHighlight>
    );
  }

  if (!href) return null;
  return (
    <Link href={href} onPress={onPress} asChild>
      <TouchableHighlight ref={ref} underlayColor={AC.opaqueSeparator}>
        <View style={[styles.item, style]}>{children}</View>
      </TouchableHighlight>
    </Link>
  );
}

export function Title(props: Pick<TextProps, "children" | "style">) {
  return <Subheadline {...props} />;
}

export function Description({
  style,
  ...props
}: Pick<TextProps, "children" | "style">) {
  return <Footnote {...props} style={[styles.description, style]} />;
}

export function Separator({ marginStart = 54 }: { marginStart?: number }) {
  return <View style={[styles.separator, { marginStart: marginStart }]} />;
}

export function RightIcon({
  name,
  color = AC.secondaryLabel,
  size = 14,
  style,
}: {
  name: IconSymbolName;
  color?: OpaqueColorValue;
  size?: number;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.iconRigthContainer, style]}>
      <IconSymbol weight="medium" name={name} size={size} color={color} />
    </View>
  );
}

export function LeftIcon({
  name,
  color = AC.secondaryLabel,
  size = 20,
  style,
}: {
  name: IconSymbolName;
  color?: OpaqueColorValue | `#${string}`;
  size?: number;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.iconLeftContainer, style]}>
      <IconSymbol weight="medium" name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderCurve: "continuous",
    borderRadius: 16,
    backgroundColor: AC.secondarySystemBackground,
    overflow: "hidden",
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  separator: {
    backgroundColor: AC.separator,
    height: 0.5,
  },
  description: {
    fontSize: 12,
    color: AC.secondaryLabel,
    marginTop: 1.5,
  },
  iconRigthContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconLeftContainer: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: AC.systemBlue,
  },
});
