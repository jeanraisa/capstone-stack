import { makeRedirectUri } from "expo-auth-session";
import Constants from "expo-constants";

export function generateURI(path: string) {
  return makeRedirectUri({
    scheme: Constants.expoConfig?.scheme as string,
    path,
  });
}
