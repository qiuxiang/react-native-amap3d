import { NativeModules } from "react-native";
const { AMapPOIKeywordsSearchManager } = NativeModules;

export default {
  keywordsSearchWithOptions: (options) => AMapPOIKeywordsSearchManager.keywordsSearchWithOptions(options),
};
