import { NativeModules } from "react-native";

const { AMapSdk } = NativeModules;

export function init(apiKey?: string) {
  AMapSdk.initSDK(apiKey);
}

export function getVersion(): Promise<string> {
  return AMapSdk.getVersion();
}
