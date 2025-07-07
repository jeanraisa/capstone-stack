import * as AC from "@bacons/apple-colors";
import type { LinkProps } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  type OpaqueColorValue,
  StyleSheet,
  View,
} from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";
import * as Card from "~/components/Card";
import type { IconSymbolName } from "~/components/IconSymbol";
import { useSession, useSignOutMutation } from "~/hooks/user";

export default function Settings() {
  const userQuery = useSession();
  const signOutMutation = useSignOutMutation();

  if (userQuery.isPending || signOutMutation.isPending) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (userQuery.isError) return null;

  return (
    <BodyScrollView
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.container}>
        {ADD_DATA.map((row) => {
          return (
            <Card.Section key={`section-${row.id}`}>
              {row.options.map((card, cardIndex) => (
                <Card.Content key={card.id}>
                  <Card.Item
                    action={card.action}
                    onPress={async () => {
                      if (card.signOut) {
                        signOutMutation.mutate();
                      }
                    }}
                    href={card.route}
                  >
                    <Card.LeftIcon
                      style={{ backgroundColor: card.background }}
                      name={card.icon}
                      color={card.color as any}
                    />
                    <View style={{ flex: 1 }}>
                      <Card.Title>{card.title}</Card.Title>
                    </View>
                    <Card.RightIcon name="chevron.right" />
                  </Card.Item>

                  {cardIndex !== row.options.length - 1 && <Card.Separator />}
                </Card.Content>
              ))}
            </Card.Section>
          );
        })}
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 200,
  },
  container: {
    gap: 25,
    marginTop: 80,
  },
  subtitle: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 13,
    opacity: 0.7,
  },
  icon: {
    alignSelf: "center",
  },
});

type Action = "navigate" | "press";

export const ADD_DATA: {
  id: string;
  options: {
    id: string;
    title: string;
    icon: IconSymbolName;
    background?: OpaqueColorValue | `#${string}`;
    color?: OpaqueColorValue | `#${string}`;
    action: Action;
    route?: LinkProps["href"];
    signOut?: boolean;
  }[];
}[] = [
  {
    id: "01",
    options: [
      {
        id: "0",
        icon: "person.crop.circle",
        title: "My Profile",
        color: "#fff",
        background: AC.systemRed,
        action: "navigate",
        route: "/settings/profile",
      },
    ],
  },
  // {
  //   id: "02",
  //   options: [
  //     {
  //       id: "1",
  //       icon: "bell.badge.fill",
  //       title: "Notifications",
  //       color: "#fff",
  //       background: AC.systemBlue,
  //       action: "navigate",
  //     },
  //     {
  //       id: "2",
  //       icon: "moonphase.last.quarter",
  //       title: "Appearance",
  //       color: "#fff",
  //       background: AC.systemCyan,
  //       action: "navigate",
  //     },
  //   ],
  //},
  {
    id: "03",
    options: [
      {
        id: "3",
        icon: "door.left.hand.open",
        title: "Log Out",
        action: "press",
        signOut: true,
      },
    ],
  },
];
