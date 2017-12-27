import {NativeModules} from 'react-native'
const {AMapUtils} = NativeModules

export default {
  distance: (lat1, lng1, lat2, lng2) => AMapUtils.distance(lat1, lng1, lat2, lng2)
}
