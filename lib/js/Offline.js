import { NativeModules, NativeEventEmitter } from "react-native";

const { AMapOffline } = NativeModules;
const eventEmitter = new NativeEventEmitter(AMapOffline);

export default {
  getProvinces: () => AMapOffline.getProvinces(),
  getCities: () => AMapOffline.getCities(),
  download: name => AMapOffline.download(name),
  remove: name => AMapOffline.remove(name),
  addDownloadListener: callback => eventEmitter.addListener("download", callback)
};
