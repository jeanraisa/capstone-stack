import * as AC from "@bacons/apple-colors";
import React from "react";
import { type OpaqueColorValue, StyleSheet, View } from "react-native";
import {
  type SharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { BodyScrollView } from "~/components/BodyScrollView";
import * as Card from "~/components/Card";
import { IconSymbol, type IconSymbolName } from "~/components/IconSymbol";
import { Footnote, Headline } from "~/components/Title";
import {
  DUMMY_ITEM_HEIGHT,
  HEADER_HEIGHT,
  ICON_HEIGHT,
  TOP_PADDING,
} from "~/constants/AppConstants";

export function MainMenu({ scrollY }: { scrollY: SharedValue<number> }) {
  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <BodyScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <IconSymbol
        name="stethoscope"
        size={1.2 * ICON_HEIGHT}
        color={AC.label}
        style={styles.icon}
      />
      <View style={styles.headerTitleSpace} />
      <View style={styles.container}>
        <Footnote style={[styles.subtitle, { color: AC.label }]}>
          {"Customize your app experience and manage \nyour preferences"}
        </Footnote>
        {ADD_DATA.map((card) => {
          const { title, options: cards } = card;
          return (
            <View style={{ gap: 10 }} key={title}>
              <Headline>{title}</Headline>
              <Card.Section>
                {cards.map((card, cardIndex) => (
                  <Card.Content key={card.id}>
                    <Card.Item onPress={() => {}}>
                      <Card.LeftIcon
                        style={{ backgroundColor: card.background }}
                        name={card.icon}
                        color={card.color as any}
                      />
                      <View style={{ flex: 1 }}>
                        <Card.Title>{card.title}</Card.Title>
                        <Card.Description>{card.description}</Card.Description>
                      </View>
                      <Card.RightIcon name="chevron.right" />
                    </Card.Item>

                    {cardIndex !== cards.length - 1 && <Card.Separator />}
                  </Card.Content>
                ))}
              </Card.Section>
            </View>
          );
        })}
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingTop: HEADER_HEIGHT + TOP_PADDING,
    paddingHorizontal: 16,
    paddingBottom: 200,
  },
  headerTitleSpace: {
    height: DUMMY_ITEM_HEIGHT,
    alignSelf: "center",
    width: "100%",
  },
  container: {
    gap: 25,
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

export const ADD_DATA: {
  title: string;
  options: {
    id: string;
    title: string;
    icon: IconSymbolName;
    description?: string;
    background?: OpaqueColorValue | `#${string}`;
    color?: OpaqueColorValue | `#${string}`;
  }[];
}[] = [
  {
    title: "Providers",
    options: [
      {
        id: "0",
        icon: "watchface.applewatch.case",
        title: "Apple Health",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        color: "#fff",
        background: AC.systemRed,
      },
      {
        id: "1",
        icon: "suit.heart.fill",
        title: "Withings",
        description:
          "Lorem ipsum dolor sit amet,apple.logo consectetur adipiscing elit, sed do eiusmod",
        color: "#fff",
        background: AC.opaqueSeparator,
      },
    ],
  },
  {
    title: "Log Manually",
    options: [
      {
        id: "3",
        icon: "heart.fill",
        title: "Heart Rate",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        color: "#fff",
        background: AC.systemBlue,
      },
      {
        id: "4",
        icon: "flame.fill",
        title: "Blood Glucose",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        color: "#fff",
        background: AC.systemYellow,
      },
      {
        id: "5",
        icon: "waveform.path.ecg",
        title: "Systolic BP",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        color: "#fff",
        background: AC.systemIndigo,
      },
      {
        id: "6",
        icon: "waveform.path.ecg",
        title: "Diastolic BP",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        color: "#fff",
        background: AC.systemPurple,
      },
      {
        id: "7",
        icon: "thermometer.variable",
        title: "Body Temperature",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        color: "#fff",
        background: AC.systemOrange,
      },
      {
        id: "8",
        icon: "scalemass.fill",
        title: "Weight",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        color: "#fff",
        background: AC.systemGreen,
      },
    ],
  },
];
