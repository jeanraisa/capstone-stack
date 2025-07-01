import Constants from "expo-constants";
import * as Updates from "expo-updates";

const debuggerHost = Constants.expoConfig?.hostUri;
const localhost = debuggerHost?.split(":")[0];

const Config = {
  apiUrl: `http://${localhost ?? "localhost"}:3000`,
  withingsClientId:
    "db309d72266db335627275e3dc08cb6d26f9f9cf9e18ff83e439f25a139df80b",
};

if (Updates.channel === "preview") {
  Config.apiUrl = "https://mamacare-api-preview.fly.dev";
  Config.withingsClientId =
    "1aff2bdb000773a37a446a75be5a47764268641f7183b7d4206e488cf279f261";
}

if (Updates.channel === "production") {
  Config.apiUrl = "https://mamacare-api.fly.dev";
  Config.withingsClientId =
    "58d74854da60cd18d555404228ac119dffae58443acfeb7d1a4aeb56ac25d087";
}

export default Config;
