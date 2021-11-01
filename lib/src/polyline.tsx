import * as React from "react";
import { ColorValue, Platform, processColor, requireNativeComponent } from "react-native";
import { LatLng } from "./types";

export interface PolylineProps {
  /**
   * 节点坐标
   */
  points: LatLng[];

  /**
   * 线段宽度
   */
  width?: number;

  /**
   * 线段颜色
   */
  color?: ColorValue;

  /**
   * 层级
   */
  zIndex?: number;

  /**
   * 多段颜色
   */
  colors: ColorValue[];

  /**
   * 是否使用颜色渐变
   */
  gradient?: boolean;

  /**
   * 是否绘制大地线
   */
  geodesic?: boolean;

  /**
   * 是否绘制虚线
   */
  dotted?: boolean;

  /**
   * 点击事件
   */
  onPress?: () => void;
}

export default class extends React.PureComponent<PolylineProps> {
  static defaultProps = { colors: [] };

  render() {
    const props = {
      ...this.props,
      ...Platform.select({ android: { colors: this.props.colors.map(processColor) } }),
    };
    // @ts-ignore
    return <NativePolyline {...props} />;
  }
}

const NativePolyline = requireNativeComponent<PolylineProps>("AMapPolyline");
