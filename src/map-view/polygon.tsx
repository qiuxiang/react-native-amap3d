import * as PropTypes from "prop-types";
import { ColorPropType, requireNativeComponent, ViewPropTypes } from "react-native";
import { LatLng } from "../types";
import { LatLngPropType } from "../prop-types";

export interface Polygon {
  /**
   * 节点坐标
   */
  coordinates: LatLng[];

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
export default requireNativeComponent("AMapPolygon", {
  propTypes: {
    ...ViewPropTypes,
    coordinates: PropTypes.arrayOf(LatLngPropType).isRequired,
    strokeWidth: PropTypes.number,
    strokeColor: ColorPropType,
    fillColor: ColorPropType,
    zIndex: PropTypes.number
  }
});
