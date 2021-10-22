import * as React from "react";
import { Platform, processColor, requireNativeComponent } from "react-native";
import { LatLng } from "../types";

export interface PolylineProps {
  /**
   * 节点坐标
   */
  coordinates: LatLng[];

  /**
   * 线段宽度
   */
  width?: number;

  /**
   * 线段颜色
   */
  color?: string;

  /**
   * 层级
   */
  zIndex?: number;

  /**
   * 多段颜色
   */
  colors: string[];

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
  dashed?: boolean;

  /**
   * 点击事件
   */
  onPress?: () => void;
}

export default class Polyline extends React.PureComponent<PolylineProps> {
  static defaultProps = { colors: [] };

  render() {
    const props = {
      ...this.props,
      ...Platform.select({
        android: {
          colors: this.props.colors.map(processColor),
        },
      }),
    };
    // @ts-ignore
    return <AMapPolyline {...props} />;
  }
}

const AMapPolyline = requireNativeComponent<PolylineProps>("AMapPolyline");
