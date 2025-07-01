import * as Browser from "expo-web-browser";
import React from "react";

export function useWarmupBrowser() {
  React.useEffect(() => {
    Browser.warmUpAsync();
    return () => {
      Browser.coolDownAsync();
    };
  }, []);
}
