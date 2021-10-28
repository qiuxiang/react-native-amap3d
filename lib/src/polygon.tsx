import { requireNativeComponent } from "react-native";
import { LatLng } from "./types";

export interface Polygon {
  /**
   * 节点坐标
   */
  points: LatLng[];

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

export default requireNativeComponent<Polygon>("AMapPolygon");
