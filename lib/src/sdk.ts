import { NativeModules } from "react-native";

const { AMapSdk } = NativeModules;

export function setApiKey(apiKey?: string) {
  AMapSdk.setApiKey(apiKey);
}

export function getVersion(): Promise<string> {
  return AMapSdk.getVersion();
}
