import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "expo-router";
import React from "react";
import { View } from "react-native";
import { WELCOME_SHEET_NAME } from "~/components/sheets/Welcome";
import { useSession } from "~/hooks/user";

export default function Welcome() {
  const session = useSession();

  useFocusEffect(
    React.useCallback(() => {
      if (!session.isPending && !session.data?.session) {
        TrueSheet.present(WELCOME_SHEET_NAME);
      }
    }, [session.isPending, session.data?.session]),
  );

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <BlurView
        intensity={80}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </View>
  );
}
