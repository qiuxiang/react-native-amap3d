import { NativeModules, NativeEventEmitter, Platform } from "react-native";
const { AMapPOIPolygonSearch } = NativeModules;
const eventEmitter = new NativeEventEmitter(AMapPOIPolygonSearch);

export default {
  init: () => AMapPOIPolygonSearch.init(),
  onPOISearch: options => AMapPOIPolygonSearch.onPOISearch(options),
  addPOISearchListener: (listener) => eventEmitter.addListener('AMapPOIPolygonSearch', listener)
};
