import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Stack as NativeStack } from "expo-router";
import React from "react";
import { type SharedValue, useSharedValue } from "react-native-reanimated";
import { AnimatedHeaderTitle } from "./AnimatedHeaderTitle";
import BlurHeader from "./BlurHeader";

type StackContextType = {
  scrollY: SharedValue<number> | null;
};
const StackContext = React.createContext<StackContextType>({ scrollY: null });

export function Stack({
  children,
  ...props
}: React.ComponentProps<typeof NativeStack>) {
  const scrollY = useSharedValue(0);

  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      //@ts-ignore
      const { animatedTitle, ...rest } = child.props;
      if (animatedTitle) {
        return React.cloneElement(child, {
          ...rest,
          options: {
            ...rest.options,
            header: (props: NativeStackHeaderProps) => (
              <>
                <BlurHeader />
                <AnimatedHeaderTitle
                  scrollY={scrollY}
                  title={props.options.title ?? ""}
                />
              </>
            ),
          },
        });
      }
    }
    return child;
  });
  return (
    <StackContext value={{ scrollY }}>
      <NativeStack {...props}>{processedChildren}</NativeStack>
    </StackContext>
  );
}

Stack.Screen = NativeStack.Screen as React.FC<
  React.ComponentProps<typeof NativeStack.Screen> & {
    animatedTitle?: boolean;
  }
>;

Stack.Protected = NativeStack.Protected;

export function useStackScrollPosition() {
  const value = React.use(StackContext);
  if (!value.scrollY) {
    throw new Error("Hook must be called inside Stack");
  }
  return value.scrollY;
}
