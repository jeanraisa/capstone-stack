import { Dimensions } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const HEADER_HEIGHT = 40;
export const TOP_PADDING = 20;
export const ITEM_GAP = 10;
export const ICON_HEIGHT = 30;
export const DUMMY_ITEM_HEIGHT = 50;
export const ANIMATED_HEADER_TOP_OFFSET =
  HEADER_HEIGHT +
  TOP_PADDING +
  ICON_HEIGHT +
  ITEM_GAP +
  DUMMY_ITEM_HEIGHT / 4.5;
