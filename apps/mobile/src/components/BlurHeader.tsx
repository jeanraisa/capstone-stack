import * as AC from "@bacons/apple-colors";
import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { HEADER_HEIGHT } from "~/constants/AppConstants";
import { Footnote } from "./Title";

export const BlurHeader = ({ onClose }: { onClose?: () => void }) => {
  const theme = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <BlurView
        intensity={10}
        tint={"prominent"}
        style={StyleSheet.absoluteFill}
      />
      <Pressable onPress={onClose} style={[styles.closeButton]}>
        <Footnote style={{ color: AC.link, fontSize: 15 }}>Done</Footnote>
      </Pressable>
    </View>
  );
};

export default BlurHeader;

const styles = StyleSheet.create({
  closeButton: {
    top: 2,
    right: 5,
  },
  header: {
    height: HEADER_HEIGHT,
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    opacity: 0.95,
  },
});
