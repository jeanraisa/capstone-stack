import { makeRedirectUri } from "expo-auth-session";
import Constants from "expo-constants";

export function generateURI(path: string) {
  return makeRedirectUri({
    scheme: Constants.expoConfig?.scheme as string,
    path,
  });
}

export const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const apiUrl = Constants.expoConfig?.extra?.app?.apiUrl as string;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    return apiUrl;
  }
  return `http://${localhost}:3000`;
};
