import * as AC from "@bacons/apple-colors";
import { BlurView } from "expo-blur";
import type React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Link } from "expo-router";
import { IconSymbol } from "./IconSymbol";
import { Title } from "./Title";

export interface StickyHeaderProps {
  title: string;
}

export const HEADER_CONFIG = {
  MIN_HEIGHT: 40,
} as const;

export const StickyHeader: React.FC<StickyHeaderProps> = ({ title }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        zIndex: 999,
        height: HEADER_CONFIG.MIN_HEIGHT + insets.top,
      }}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: AC.systemBackground, opacity: 0.8 },
        ]}
      />
      <BlurView
        tint="systemThinMaterial"
        intensity={50}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          paddingHorizontal: 16,
          paddingTop: insets.top,
          paddingBottom: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Title style={{ fontSize: 22 }} numberOfLines={1}>
            {title}
          </Title>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/*  <TouchableOpacity activeOpacity={0.7}>
            <IconSymbol
              name="plus.circle.dashed"
              size={28}
              color={AC.systemBlue}
            />
          </TouchableOpacity> */}

          <Link href="/settings" asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <IconSymbol
                name="person.crop.circle.dashed"
                size={28}
                color={AC.link}
                weight="thin"
              />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: AC.separator,
          height: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
};
