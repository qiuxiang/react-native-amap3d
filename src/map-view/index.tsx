import * as React from "react";
import { bool, number } from "prop-types";
import { requireNativeComponent, ViewPropTypes } from "react-native";
import {
  LatLngPropType,
  LocationStylePropType,
  RegionPropType,
  mapEventsPropType
} from "../prop-types";
import { MapStatus, MapType, Region, LatLng, Location } from "../types";
import Component from "./component";
import Marker from "./marker";
import Polyline from "./polyline";
import Polygon from "./polygon";
import Circle from "./circle";
import HeatMap from "./heat-map";
import MultiPoint from "./multi-point";

export interface MapViewProps {
  /**
   * 地图类型
   */
  mapType?: MapType;

  /**
   * 地图中心
   */
  center?: LatLng;

  /**
   * 地图显示区域
   */
  region?: Region;

  /**
   * 缩放级别
   */
  zoomLevel?: number;

  /**
   * 倾斜角度，取值范围 [0, 60]
   */
  rotation?: number;

  /**
   * 倾斜角度
   */
  tilt?: number;

  /**
   * 是否启用定位
   */
  locationEnabled?: boolean;

  /**
   * 定位间隔(ms)，默认 2000
   *
   * @platform android
   */
  locationInterval?: number;

  /**
   * 定位的最小更新距离
   *
   * @platform ios
   */
  distanceFilter?: number;

  /**
   * 是否显示室内地图
   */
  showsIndoorMap?: boolean;

  /**
   * 是否显示室内地图楼层切换控件
   *
   * TODO: 似乎并不能正常显示
   */
  showsIndoorSwitch?: boolean;

  /**
   * 是否显示3D建筑
   */
  showsBuildings?: boolean;

  /**
   * 是否显示文本标签
   */
  showsLabels?: boolean;

  /**
   * 是否显示指南针
   */
  showsCompass?: boolean;

  /**
   * 是否显示放大缩小按钮
   *
   * @platform android
   */
  showsZoomControls?: boolean;

  /**
   * 是否显示比例尺
   */
  showsScale?: boolean;

  /**
   * 是否显示定位按钮
   *
   * @platform android
   */
  showsLocationButton?: boolean;

  /**
   * 是否显示路况
   */
  showsTraffic?: boolean;

  /**
   * 最大缩放级别
   */
  maxZoomLevel?: number;

  /**
   * 最小缩放级别
   */
  minZoomLevel?: number;

  /**
   * 限制地图只能显示某个矩形区域
   */
  limitRegion?: Region;

  /**
   * 是否启用缩放手势，用于放大缩小
   */
  zoomEnabled?: boolean;

  /**
   * 是否启用滑动手势，用于平移
   */
  scrollEnabled?: boolean;

  /**
   * 是否启用旋转手势，用于调整方向
   */
  rotateEnabled?: boolean;

  /**
   * 是否启用倾斜手势，用于改变视角
   */
  tiltEnabled?: boolean;

  /**
   * 点击事件
   */
  onClick?: (coordnate: LatLng) => void;

  /**
   * 长按事件
   */
  onLongClick?: (coordnate: LatLng) => void;

  /**
   * 地图状态改变事件，在动画结束后触发
   */
  onStatusChangeComplete?: (status: MapStatus) => void;

  /**
   * 定位事件
   */
  onLocation?: (location: Location) => void;

  /**
   * 动画取消事件
   */
  onAnimateCancel?: () => void;

  /**
   * 动画完成事件
   */
  onAnimateFinish?: () => void;
}

const events = [
  "onClick",
  "onLongClick",
  "onStatusChange",
  "onStatusChangeComplete",
  "onLocation",
  "onAnimateCancel",
  "onAnimateFinish"
];

/**
 * @ignore
 */
export default class MapView extends Component<MapViewProps> {
  static propTypes = {
    ...ViewPropTypes,
    ...mapEventsPropType(events),
    mapType: number,
    locationEnabled: bool,
    locationInterval: number,
    locationStyle: LocationStylePropType,
    distanceFilter: number,
    showsIndoorMap: bool,
    showsIndoorSwitch: bool,
    showsBuildings: bool,
    showsLabels: bool,
    showsCompass: bool,
    showsZoomControls: bool,
    showsScale: bool,
    showsLocationButton: bool,
    showsTraffic: bool,
    maxZoomLevel: number,
    minZoomLevel: number,
    zoomLevel: number,
    center: LatLngPropType,
    region: RegionPropType,
    limitRegion: RegionPropType,
    tilt: number,
    rotation: number,
    zoomEnabled: bool,
    scrollEnabled: bool,
    rotateEnabled: bool,
    tiltEnabled: bool
  };

  nativeComponent = "AMapView";

  /**
   * 设置地图状态（坐标、缩放级别、倾斜度、旋转角度），支持动画过度
   *
   * @param status
   * @param duration
   */
  setStatus(status: MapStatus, duration = 0) {
    this.call("setStatus", [status, duration]);
  }

  render() {
    const props = {
      ...this.props,
      ...this.handlers(events)
    };
    return <AMapView {...props} />;
  }

  static Marker = Marker;
  static Polyline = Polyline;
  static Polygon = Polygon;
  static Circle = Circle;
  static HeatMap = HeatMap;
  static MultiPoint = MultiPoint;
}

// @ts-ignore
const AMapView = requireNativeComponent("AMapView", MapView);
