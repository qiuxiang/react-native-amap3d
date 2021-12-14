import * as React from "react";
import {
  NativeMethods,
  NativeSyntheticEvent,
  requireNativeComponent,
  ViewProps,
} from "react-native";
import Component from "./component";
import { CameraPosition, LatLng, LatLngBounds, MapPoi, MapType, Point } from "./types";

export interface CameraEvent {
  cameraPosition: CameraPosition;
  latLngBounds: LatLngBounds;
}

export interface MapViewProps extends ViewProps {
  /**
   * 地图类型
   */
  mapType?: MapType;

  /**
   * 初始状态
   */
  initialCameraPosition?: CameraPosition;

  /**
   * 是否显示当前定位
   */
  myLocationEnabled?: boolean;

  /**
   * 是否显示室内地图
   */
  indoorViewEnabled?: boolean;

  /**
   * 是否显示3D建筑
   */
  buildingsEnabled?: boolean;

  /**
   * 是否显示标注
   */
  labelsEnabled?: boolean;

  /**
   * 是否显示指南针
   */
  compassEnabled?: boolean;

  /**
   * 是否显示放大缩小按钮
   *
   * @platform android
   */
  zoomControlsEnabled?: boolean;

  /**
   * 是否显示比例尺
   */
  scaleControlsEnabled?: boolean;

  /**
   * 是否显示定位按钮
   *
   * @platform android
   */
  myLocationButtonEnabled?: boolean;

  /**
   * 是否显示路况
   */
  trafficEnabled?: boolean;

  /**
   * 最大缩放级别
   */
  maxZoom?: number;

  /**
   * 最小缩放级别
   */
  minZoom?: number;

  /**
   * 是否启用缩放手势，用于放大缩小
   */
  zoomGesturesEnabled?: boolean;

  /**
   * 是否启用滑动手势，用于平移
   */
  scrollGesturesEnabled?: boolean;

  /**
   * 是否启用旋转手势，用于调整方向
   */
  rotateGesturesEnabled?: boolean;

  /**
   * 是否启用倾斜手势，用于改变视角
   */
  tiltGesturesEnabled?: boolean;

  /**
   * 设定定位的最小更新距离
   *
   * @platform ios
   */
  distanceFilter?: number;

  /**
   * 设定最小更新角度，默认为 1 度
   *
   * @platform ios
   */
  headingFilter?: number;

  /**
   * 点击事件
   */
  onPress?: (event: NativeSyntheticEvent<LatLng>) => void;

  /**
   * 标注点击事件
   */
  onPressPoi?: (event: NativeSyntheticEvent<MapPoi>) => void;

  /**
   * 长按事件
   */
  onLongPress?: (event: NativeSyntheticEvent<LatLng>) => void;

  /**
   * 地图状态改变事件，随地图状态变化不停地触发
   */
  onCameraMove?: (event: NativeSyntheticEvent<CameraEvent>) => void;

  /**
   * 地图状态改变事件，在停止变化后触发
   */
  onCameraIdle?: (event: NativeSyntheticEvent<CameraEvent>) => void;

  /**
   * 地图初始化完成事件
   */
  onLoad?: (event: NativeSyntheticEvent<void>) => void;

  /**
   * 地图定位更新事件
   */
  onLocation?: (event: NativeSyntheticEvent<GeolocationPosition>) => void;
}

const name = "AMapView";
const NativeMapView = requireNativeComponent<MapViewProps>(name);

export default class extends Component<MapViewProps> {
  static defaultProps = {
    style: { flex: 1 },
    compassEnabled: true,
    scaleControlsEnabled: true,
    distanceFilter: 1,
  };

  name = name;
  ref?: (React.Component<MapViewProps> & NativeMethods) | null;
  state = { loaded: false };
  callbackMap: { [key: number]: (data: any) => void } = {};

  /**
   * 移动视角
   */
  moveCamera(cameraPosition: CameraPosition, duration = 0) {
    this.invoke("moveCamera", [cameraPosition, duration]);
  }

  /**
   * 点坐标转地理坐标，主要用于地图选点
   */
  getLatLng(point: Point): Promise<LatLng> {
    return this.call("getLatLng", point);
  }

  callback = ({ nativeEvent }: NativeSyntheticEvent<{ id: number; data: any }>) => {
    this.callbackMap[nativeEvent.id]?.call(this, nativeEvent.data);
    delete this.callbackMap[nativeEvent.id];
  };

  call(name: string, args: any): Promise<any> {
    const id = Math.random();
    this.invoke("call", [id, name, args]);
    return new Promise((resolve) => (this.callbackMap[id] = resolve));
  }

  componentDidMount() {
    super.componentDidMount();
    // 无论如何也要在 1 秒后 setLoaded(true) ，防止 onLoad 事件不触发的情况下显示不正常
    // 目前只在 iOS 上低概率出现
    setTimeout(() => this.setState({ loaded: true }), 1000);
  }

  render() {
    let { style, onLoad } = this.props;
    if (!this.state.loaded) {
      style = [style, { width: 1, height: 1 }];
    }
    return (
      <NativeMapView
        {...this.props}
        ref={(ref) => (this.ref = ref)}
        style={style}
        // @ts-ignore: 内部接口
        onCallback={this.callback}
        onPress={(event) => {
          if (event.nativeEvent.latitude) {
            this.props.onPress?.call(this, event);
          }
        }}
        onLoad={(event) => {
          // android 地图部分控件不显示的问题在重新 layout 之后会恢复正常。
          // 同时也能修复 ios 地图偶尔出现的 layout 异常
          this.setState({ loaded: true });
          onLoad?.call(this, event);
        }}
      />
    );
  }
}
