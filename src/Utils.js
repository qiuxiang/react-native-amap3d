// @flow
import { NativeModules } from 'react-native'

const { AMapUtils } = NativeModules

export default {
  /**
   * 计算两点距离
   */
  distance: (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): Promise<number> => AMapUtils.distance(lat1, lng1, lat2, lng2),
}
