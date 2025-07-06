import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { curveBasis, line, scaleLinear, scalePoint } from "d3";
import React from "react";
import type { LayoutChangeEvent, OpaqueColorValue } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

type Props<T extends Record<string, any>> = {
  data: T[];
  xAxis: keyof T;
  yAxis: keyof T;
  color?: OpaqueColorValue | `#${string}`;
};

export function SimpleLineChart<T extends Record<string, any>>({
  data,
  xAxis,
  yAxis,
  color,
}: Props<T>) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const animatedLine = useSharedValue(0);

  const onLayout = React.useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setWidth(Math.round(layout.width));
      setHeight(Math.round(layout.height));
    },
    [],
  );

  React.useEffect(() => {
    animatedLine.value = withTiming(1, { duration: 1000 });
  }, [data, width, height]);

  const { curvedLine } = React.useMemo(() => {
    const x = data.map((d) => d[xAxis]);
    const y = data.map((d) => d[yAxis]);
    const max = Math.max(0, ...y);
    const min = Math.min(0, ...y);

    const xScale = scalePoint()
      .domain(x)
      .range([2, width - 2])
      .padding(0);
    const yScale = scaleLinear().domain([min, max]).range([height, 0]);
    const curvedLine = line<T>()
      .x((d) => xScale(d[xAxis])!)
      .y((d) => yScale(d[yAxis]))
      .curve(curveBasis)(data);
    return { xScale, yScale, curvedLine };
  }, [width, height, data]);

  const linePath = Skia.Path.MakeFromSVGString(curvedLine!);
  return (
    <Canvas style={{ flex: 1 }} onLayout={onLayout}>
      <Path
        path={linePath!}
        style="stroke"
        strokeWidth={4}
        start={0}
        end={animatedLine}
        strokeCap="round"
        color={color as any}
      />
    </Canvas>
  );
}
