import * as AC from "@bacons/apple-colors";
import type { LinkProps } from "expo-router";
import React from "react";
import {
  Image,
  type ImageRequireSource,
  type OpaqueColorValue,
  StyleSheet,
  View,
} from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";
import * as Card from "~/components/Card";
import { FadeInView } from "~/components/FadeInView";
import { IconSymbol, type IconSymbolName } from "~/components/IconSymbol";
import { Footnote, Headline } from "~/components/Title";

export default function Measure() {
  return (
    <BodyScrollView
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <FadeInView style={styles.container}>
        <View style={{ marginHorizontal: "auto" }}>
          <IconSymbol
            name="waveform.path.ecg.rectangle.fill"
            size={32}
            color={AC.systemBlue}
          />
        </View>
        <Footnote style={[styles.subtitle, { color: AC.label }]}>
          {"Track your health with connected devices \n or manual input."}
        </Footnote>
        {ADD_DATA.map((card) => {
          const { title, options: cards } = card;
          return (
            <View style={{ gap: 10 }} key={title}>
              <Headline>{title}</Headline>
              <Card.Section>
                {cards.map((card, cardIndex) => (
                  <Card.Content key={card.id}>
                    <Card.Item action="navigate" href={card.route}>
                      {card.image ? (
                        <Image
                          source={card.image}
                          style={{ width: 25, height: 25, borderRadius: 5 }}
                        />
                      ) : (
                        <Card.LeftIcon
                          style={{ backgroundColor: card.background }}
                          name={card.icon}
                          color={card.color as any}
                        />
                      )}

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
      </FadeInView>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 200,
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
});

export const ADD_DATA: {
  title: string;
  options: {
    id: string;
    title: string;
    icon: IconSymbolName;
    description?: string;
    image?: ImageRequireSource;
    background?: OpaqueColorValue | `#${string}`;
    color?: OpaqueColorValue | `#${string}`;
    route: LinkProps["href"];
  }[];
}[] = [
  {
    title: "Providers",
    options: [
      {
        id: "0",
        icon: "applelogo",
        title: "Apple Health",
        description:
          "Collects health data from Apple devices and connected apps.",
        color: AC.label,
        route: "/measure/apple",
      },
      {
        id: "1",
        icon: "suit.heart.fill",
        title: "Withings",
        description:
          "Smart health devices like scales, watches, and BP monitors.",
        color: AC.label,
        route: "/measure/withings",
        image: require("../../../../../assets/logos/withings.jpg"),
      },
    ],
  },
  {
    title: "Log Manually",
    options: [
      {
        id: "3",
        icon: "waveform.path",
        title: "Heart Rate",
        description:
          "Beats per minute (BPM), indicating cardiovascular activity.",
        color: AC.systemPink,
        route: "/measure/heart-rate",
      },
      {
        id: "4",
        icon: "waveform.path.ecg.rectangle",
        title: "Blood Glucose",
        description:
          "Concentration of glucose in the blood, measured in mg/dL.",
        color: AC.systemPink,
        route: "/measure/blood-glucose",
      },
      {
        id: "6",
        icon: "drop.fill",
        title: "Blood Pressure",
        description: "Bottom number in BP; pressure between beats (mmHg).",
        color: AC.systemPink,
        route: "/measure/blood-pressure",
      },
      {
        id: "7",
        icon: "waveform.path.ecg.rectangle",
        title: "Body Temperature",
        description: "Core body temperature, usually around 36.5–37.5°C.",
        color: AC.systemPink,
        route: "/measure/body-temperature",
      },
      /* {
        id: "8",
        icon: "figure.mixed.cardio",
        title: "Weight",
        description: "Body mass, commonly measured in kilograms (kg).",
        color: AC.systemPurple,
        route: "/menu/weight",
      }, */
    ],
  },
];
