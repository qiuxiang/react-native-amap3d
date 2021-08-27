export declare enum OfflineState {
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
export declare type DownloadListener = (state: {
    name: string;
    progress: number;
    state: OfflineState;
}) => void;
export default class Offline {
    /**
     * 获取所有省份
     */
    static getProvinces(): Promise<Province[]>;
    /**
     * 获取所有城市
     */
    static getCities(): Promise<City[]>;
    /**
     * 下载离线地图
     *
     * @param name 城市名或省份名
     */
    static download(name: string): void;
    /**
     * 移除离线地图
     *
     * @param name 城市名或省份名
     */
    static remove(name: string): void;
    /**
     * 添加下载监听器
     */
    static addDownloadListener(callback: DownloadListener): import("react-native").EmitterSubscription;
}
