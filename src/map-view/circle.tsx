import * as PropTypes from "prop-types";
import { ColorPropType, requireNativeComponent, ViewPropTypes } from "react-native";
import { LatLng } from "../types";
import { LatLngPropType } from "../prop-types";

export interface CircleProps {
  /**
   * 圆点坐标
   */
  coordinate: LatLng;

  /**
   * 半径（米）
   */
  radius: number;

  /**
   * 边线宽度
   */
  strokeWidth?: number;

  /**
   * 边线颜色
   */
  strokeColor?: string;

  /**
   * 填充颜色
   */
  fillColor?: string;

  /**
   * 层级
   */
  zIndex?: number;
}

// @ts-ignore
export default requireNativeComponent("AMapCircle", {
  propTypes: {
    ...ViewPropTypes,
    coordinate: LatLngPropType.isRequired,
    radius: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number,
    strokeColor: ColorPropType,
    fillColor: ColorPropType,
    zIndex: PropTypes.number
  }
});
