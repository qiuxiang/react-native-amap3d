import * as React from "react";
import { bool, number } from "prop-types";
import { requireNativeComponent, ViewProps, ViewPropTypes } from "react-native";
import {
  LatLngPropType,
  LocationStylePropType,
  RegionPropType,
  mapEventsPropType
} from "../prop-types";
import { MapStatus, MapType, Region } from "../types";
import Component from "./component";

export interface MapViewProps extends ViewProps, MapStatus {
  /**
   * 地图类型
   */
  mapType: MapType;

  /**
   * 是否启用定位
   */
  locationEnabled: boolean;

  /**
   * 定位间隔(ms)，默认 2000
   *
   * @platform android
   */
  locationInterval: number;

  /**
   * 定位的最小更新距离
   *
   * @platform ios
   */
  distanceFilter: number;

  /**
   * 是否显示室内地图
   */
  showsIndoorMap: boolean;

  /**
   * 是否显示室内地图楼层切换控件
   *
   * TODO: 似乎并不能正常显示
   */
  showsIndoorSwitch: boolean;

  /**
   * 是否显示3D建筑
   */
  showsBuildings: boolean;

  /**
   * 是否显示文本标签
   */
  showsLabels: boolean;

  /**
   * 是否显示指南针
   */
  showsCompass: boolean;

  /**
   * 是否显示放大缩小按钮
   *
   * @platform android
   */
  showsZoomControls: boolean;

  /**
   * 是否显示比例尺
   */
  showsScale: boolean;

  /**
   * 是否显示定位按钮
   *
   * @platform android
   */
  showsLocationButton: boolean;

  /**
   * 是否显示路况
   */
  showsTraffic: boolean;

  /**
   * 最大缩放级别
   */
  maxZoomLevel: number;

  /**
   * 最小缩放级别
   */
  minZoomLevel: number;

  /**
   * 限制地图只能显示某个矩形区域
   */
  limitRegion: Region;

  /**
   * 是否启用缩放手势，用于放大缩小
   */
  zoomEnabled: bool;

  /**
   * 是否启用滑动手势，用于平移
   */
  scrollEnabled: bool;

  /**
   * 是否启用旋转手势，用于调整方向
   */
  rotateEnabled: bool;

  /**
   * 是否启用倾斜手势，用于改变视角
   */
  tiltEnabled: bool;
}

const events = [
  "onClick",
  "onLongClick",
  "onStatusChange",
  "onStatusChangeComplete",
  "onLocation",
  "onAnimateCancel",
  "onAnimateFinished"
];

export default class MapView extends Component<MapViewProps> {
  private static propTypes = {
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

  protected nativeComponent = "AMapView";

  /**
   * @deprecated
   * @ignore
   */
  animateTo(target, duration = 500) {
    this.setStatus(target, duration);
  }

  /**
   * 设置地图状态（坐标、缩放级别、倾斜度、旋转角度），支持动画过度
   *
   * @param status
   * @param duration
   */
  setStatus(status, duration = 0) {
    this.call("setStatus", [status, duration]);
  }

  private render() {
    const props = {
      ...this.props,
      ...this.handlers(events)
    };
    return <AMapView {...props} />;
  }
}

const AMapView = requireNativeComponent("AMapView", MapView);
