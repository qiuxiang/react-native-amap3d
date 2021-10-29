import * as React from "react";
import {
  NativeMethods,
  NativeSyntheticEvent,
  Platform,
  requireNativeComponent,
  StyleSheet,
  ViewProps,
} from "react-native";
import Component from "./component";
import { CameraPosition, LatLng, MapType, Point } from "./types";

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
   * 点击事件
   */
  onPress?: (latLng: LatLng) => void;

  /**
   * 长按事件
   */
  onLongPress?: (latLng: LatLng) => void;

  /**
   * 地图状态改变事件，在动画结束后触发
   */
  onCameraIdle?: (position: CameraPosition) => void;

  /**
   * 地图初始化完成事件
   */
  onLoad?: (event: NativeSyntheticEvent<void>) => void;
}

const name = "AMapView";
const AMapView = requireNativeComponent<MapViewProps>(name);

export default class extends Component<MapViewProps> {
  static defaultProps = { style: StyleSheet.absoluteFill };

  name = name;
  ref?: (React.Component<MapViewProps> & NativeMethods) | null;
  state = { loaded: false };
  callbackMap: { [key: number]: (data: any) => void } = {};

  moveCamera(cameraPosition: CameraPosition, duration = 0) {
    this.invoke("moveCamera", [cameraPosition, duration]);
  }

  getLatLng(point: Point): Promise<LatLng> {
    return this.call("getLatLng", point);
  }

  callback = ({ nativeEvent }: NativeSyntheticEvent<{ id: number; data: any }>) => {
    this.callbackMap[nativeEvent.id]?.call(this, nativeEvent.data);
  };

  call(name: string, args: any): Promise<any> {
    const id = Math.random();
    this.invoke("call", [id, name, args]);
    return new Promise((resolve) => (this.callbackMap[id] = resolve));
  }

  render() {
    let { style, onLoad } = this.props;
    if (Platform.OS === "android" && !this.state.loaded) {
      style = [style, { width: 1, height: 1 }];
    }
    return (
      <AMapView
        {...this.props}
        ref={(ref) => (this.ref = ref)}
        style={style}
        // @ts-ignore
        callback={this.callback}
        onLoad={(event) => {
          // 部分控件不显示的问题在重新 layout 之后会恢复正常。
          this.setState({ loaded: true });
          onLoad?.call(this, event);
        }}
      />
    );
  }
}
