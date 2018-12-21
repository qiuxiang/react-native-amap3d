import PropTypes from "prop-types";
import { ColorPropType, requireNativeComponent, ViewPropTypes } from "react-native";
import { LatLng } from "../PropTypes";

export default requireNativeComponent("AMapCircle", {
  propTypes: {
    ...ViewPropTypes,

    /**
     * 圆点坐标
     */
    coordinate: LatLng.isRequired,

    /**
     * 半径（米）
     */
    radius: PropTypes.number.isRequired,

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
