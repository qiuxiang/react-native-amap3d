import * as React from "react";
import * as PropTypes from "prop-types";
import {
  ColorPropType,
  Platform,
  processColor,
  requireNativeComponent,
  ViewPropTypes
} from "react-native";
import { LatLng } from "../types";
import { LatLngPropType } from "../prop-types";

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
  colors?: string[];

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

/**
 * @ignore
 */
export default class Polyline extends React.PureComponent<PolylineProps> {
  static propTypes = {
    ...ViewPropTypes,
    coordinates: PropTypes.arrayOf(LatLngPropType).isRequired,
    width: PropTypes.number,
    color: ColorPropType,
    zIndex: PropTypes.number,
    colors: PropTypes.arrayOf(ColorPropType),
    gradient: PropTypes.bool,
    geodesic: PropTypes.bool,
    dashed: PropTypes.bool,
    onPress: PropTypes.func
  };

  static defaultProps = {
    colors: []
  };

  render() {
    const props = {
      ...this.props,
      ...Platform.select({
        android: {
          colors: this.props.colors.map(processColor)
        }
      })
    };
    return <AMapPolyline {...props} />;
  }
}

// @ts-ignore
const AMapPolyline = requireNativeComponent("AMapPolyline", Polyline);
