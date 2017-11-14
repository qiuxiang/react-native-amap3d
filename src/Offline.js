import {NativeModules, NativeEventEmitter} from 'react-native'
const {AMapOffline} = NativeModules

export default {
  getProvinces: () => AMapOffline.getProvinces(),
  getCities: () => AMapOffline.getCities(),
  download: name => AMapOffline.getDownload(name),
}
