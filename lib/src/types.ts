/**
 * 点坐标
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 地理坐标
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
 * 地图标注点
 */
export interface MapPoi {
  /**
   * 标注点 ID
   */
  id: string;

  /**
   * 标注点名称
   */
  name: string;

  /**
   * 标注点坐标
   */
  position: LatLng;
}

/**
 * 矩形坐标边界
 */
export interface LatLngBounds {
  /**
   * 西南坐标
   */
  southwest: LatLng;

  /**
   * 东北坐标
   */
  northeast: LatLng;
}

/**
 * 地图状态
 */
export interface CameraPosition {
  /**
   * 中心坐标
   */
  target?: LatLng;

  /**
   * 缩放级别
   */
  zoom?: number;

  /**
   * 朝向、旋转角度
   */
  bearing?: number;

  /**
   * 倾斜角度
   */
  tilt?: number;
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
  Bus,
}
