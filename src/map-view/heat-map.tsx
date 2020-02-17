import * as PropTypes from "prop-types";
import { requireNativeComponent, ViewPropTypes } from "react-native";
import { LatLng } from "../types";
import { LatLngPropType } from "../prop-types";

export interface HeatMapProps {
  /**
   * 节点坐标
   */
  coordinates: LatLng[];

  /**
   * 半径（米）
   */
  radius?: number;

  /**
   * 透明度
   */
  opacity?: number;
}

// @ts-ignore
export default requireNativeComponent("AMapHeatMap", {
  propTypes: {
    ...ViewPropTypes,

    /**
     * 节点坐标
     */
    coordinates: PropTypes.arrayOf(LatLngPropType).isRequired,

    /**
     * 半径（米）
     */
    radius: PropTypes.number,

    /**
     * 透明度
     */
    opacity: PropTypes.number
  }
});
