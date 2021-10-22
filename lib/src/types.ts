/**
 * 点座标
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 地理座标
 */
export interface LatLng {
  /**
   * 纬度
   */
  latitude: number;

  /**
   * 经度
   */
  longitude: number;
}

/**
 * 区域
 */
export interface Region extends LatLng {
  /**
   * 纬度范围
   */
  latitudeDelta: number;

  /**
   * 经度范围
   */
  longitudeDelta: number;
}

/**
 * 地图状态
 */
export interface MapStatus {
  /**
   * 中心坐标
   */
  center: LatLng;

  /**
   * 缩放级别
   */
  zoomLevel: number;

  /**
   * 朝向、旋转角度
   */
  rotation: number;

  /**
   * 倾斜角度
   */
  tilt: number;

  /**
   * 显示区域
   */
  region: Region;
}

/**
 * 定位
 */
export interface Location extends LatLng {
  /**
   * 精度
   */
  accuracy: number;

  /**
   * 朝向
   */
  heading: number;

  /**
   * 海拔
   */
  altitude: number;

  /**
   * 运动速度
   */
  speed: number;
}

/**
 * 地图类型
 */
export enum MapType {
  /**
   * 标准地图
   */
  Standard,

  /**
   * 卫星地图
   */
  Satellite,

  /**
   * 夜间地图
   */
  Night,

  /**
   * 导航地图
   */
  Navi,

  /**
   * 公交地图
   */
  Bus
}
