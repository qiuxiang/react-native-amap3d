import * as PropTypes from "prop-types";
import { ColorPropType, requireNativeComponent, ViewPropTypes } from "react-native";
import { LatLngPropType } from "../prop-types";

// @ts-ignore
export default requireNativeComponent("AMapPolygon", {
  propTypes: {
    ...ViewPropTypes,

    /**
     * 节点坐标
     */
    coordinates: PropTypes.arrayOf(LatLngPropType).isRequired,

    /**
     * 边线宽度
     */
    strokeWidth: PropTypes.number,

    /**
     * 边线颜色
     */
    strokeColor: ColorPropType,

    /**
     * 填充颜色
     */
    fillColor: ColorPropType,

    /**
     * 层级
     */
    zIndex: PropTypes.number
  }
});
