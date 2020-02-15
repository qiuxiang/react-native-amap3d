import * as PropTypes from "prop-types";
import { requireNativeComponent, ViewPropTypes } from "react-native";
import { LatLngPropType } from "../prop-types";

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
