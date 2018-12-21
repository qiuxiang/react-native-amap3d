import PropTypes from "prop-types";
import { requireNativeComponent, ViewPropTypes } from "react-native";
import { LatLng } from "../PropTypes";

/**
 * 注意，热力图组件的 props 设置过一次之后便不能再更改
 */
export default requireNativeComponent("AMapHeatMap", {
  propTypes: {
    ...ViewPropTypes,

    /**
     * 节点坐标
     */
    coordinates: PropTypes.arrayOf(LatLng).isRequired,

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
