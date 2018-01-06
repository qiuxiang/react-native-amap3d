// @flow
import { NativeModules, NativeEventEmitter } from 'react-native'
import type EmitterSubscription from 'react-native/Libraries/vendor/emitter/EmitterSubscription'

const { AMapOffline } = NativeModules
const eventEmitter = new NativeEventEmitter(AMapOffline)

export type State = 'waiting' | 'downloading' | 'unzip' | 'downloaded' | 'expired' | ''

export type City = {
  name: string,
  size: number,
  state: State,
}

export type Province = {
  cities: City[],
} | City

export type Callback = (state: {
  name: string,
  progress: number,
  state: State,
}) => void

export default {
  getProvinces: (): Promise<Province[]> => AMapOffline.getProvinces(),
  getCities: (): Promise<City[]> => AMapOffline.getCities(),
  download: (name: string) => AMapOffline.download(name),
  remove: (name: string) => AMapOffline.remove(name),
  addDownloadListener: (callback: Callback): EmitterSubscription => eventEmitter.addListener('download', callback),
}
