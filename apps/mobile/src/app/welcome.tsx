import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "expo-router";
import React from "react";
import { View } from "react-native";
import { WELCOME_SHEET_NAME } from "~/components/sheets/Welcome";
import { useSession } from "~/hooks/user";
import { trpc } from "~/utils/trpc";

export default function Welcome() {
  const session = useSession();
  const userStatus = useQuery(
    trpc.user.status.queryOptions(undefined, { retry: false }),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (
        !session.isPending &&
        !session.data?.session &&
        !userStatus.isPending
      ) {
        TrueSheet.present(WELCOME_SHEET_NAME);
      }
    }, [session.isPending, session.data?.session, userStatus.isPending]),
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
