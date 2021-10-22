import { NativeModules, NativeEventEmitter } from "react-native";

const { AMapOffline } = NativeModules;
const eventEmitter = new NativeEventEmitter(AMapOffline);

export enum OfflineState {
  Waiting = "waiting",
  Downloading = "downloading",
  Downloaded = "downloaded",
  Expired = "expired",
  Unzip = "unzip"
}

export interface City {
  name: string;
  size: number;
  state: OfflineState;
}

export interface Province extends City {
  cities: City[];
}

/**
 * 下载监听器
 */
export type DownloadListener = (state: {
  name: string;
  progress: number;
  state: OfflineState;
}) => void;

export default class Offline {
  /**
   * 获取所有省份
   */
  static getProvinces(): Promise<Province[]> {
    return AMapOffline.getProvinces();
  }

  /**
   * 获取所有城市
   */
  static getCities(): Promise<City[]> {
    return AMapOffline.getCities();
  }

  /**
   * 下载离线地图
   *
   * @param name 城市名或省份名
   */
  static download(name: string) {
    AMapOffline.download(name);
  }

  /**
   * 移除离线地图
   *
   * @param name 城市名或省份名
   */
  static remove(name: string) {
    AMapOffline.remove(name);
  }

  /**
   * 添加下载监听器
   */
  static addDownloadListener(callback: DownloadListener) {
    return eventEmitter.addListener("download", callback);
  }
}
