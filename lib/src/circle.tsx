import { requireNativeComponent } from "react-native";
import { LatLng } from "./types";

export interface CircleProps {
  /**
   * 圆点坐标
   */
  center: LatLng;

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

export default requireNativeComponent<CircleProps>("AMapCircle");
