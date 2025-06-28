import * as AC from "@bacons/apple-colors";
import { Text, type TextProps } from "react-native";
import Animated from "react-native-reanimated";
import { Outfit } from "~/constants/font";

interface FontProps extends TextProps {
  weight?: keyof typeof Outfit;
}

export function LargeTitle({ weight = "bold", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 34,
          lineHeight: 41,
          letterSpacing: 0.4,
        },
        props.style,
      ]}
    />
  );
}

// Title1
export function Title({ weight = "bold", ...props }: FontProps) {
  return (
    <Animated.Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 28,
          lineHeight: 34,
          letterSpacing: 0.3,
        },
        props.style,
      ]}
    />
  );
}

// Title2
export function Title2({ weight = "bold", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 22,
          fontWeight: "bold",
          lineHeight: 28,
          letterSpacing: 0.2,
        },
        props.style,
      ]}
    />
  );
}

// Title3
export function Title3({ weight = "regular", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 20,
          lineHeight: 26,
          letterSpacing: 0.2,
        },
        props.style,
      ]}
    />
  );
}

// Headline
export function Headline({ weight = "semiBold", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: 0.1,
        },
        props.style,
      ]}
    />
  );
}

// Subheadline
export function Subheadline({ weight = "regular", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 15,
          lineHeight: 20,
          letterSpacing: 0.1,
        },
        props.style,
      ]}
    />
  );
}

// Body
export function Body({ weight = "regular", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: 0.1,
        },
        props.style,
      ]}
    />
  );
}

// Callout
export function Callout({ weight = "regular", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 16,
          lineHeight: 21,
          letterSpacing: 0.1,
        },
        props.style,
      ]}
    />
  );
}

// Footnote
export function Footnote({ weight = "regular", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 13,
          lineHeight: 18,
          letterSpacing: 0.0,
        },
        props.style,
      ]}
    />
  );
}

// Caption1
export function Caption({ weight = "regular", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 0.0,
        },
        props.style,
      ]}
    />
  );
}

// Caption2
export function Caption2({ weight = "regular", ...props }: FontProps) {
  return (
    <Text
      allowFontScaling
      {...props}
      style={[
        {
          fontFamily: Outfit[weight],
          color: AC.label,
          fontSize: 11,
          lineHeight: 15,
          letterSpacing: 0.0,
        },
        props.style,
      ]}
    />
  );
}
