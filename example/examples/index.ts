import Animated from "./animated";
import Circle from "./circle";
import Controls from "./controls";
import Events from "./events";
import Gestures from "./gestures";
import HeatMap from "./heat-map";
import Indoor from "./indoor";
import Layers from "./layers";
import MapTypes from "./map-types";
import Marker from "./marker";
import MultiPoint from "./multi-point";
import Polygon from "./polygon";
import Polyline from "./polyline";

export default {
  地图模式: MapTypes,
  基本图层: Layers,
  室内地图: Indoor,
  地图控件: Controls,
  手势交互: Gestures,
  动画移动: Animated,
  地图事件: Events,
  添加标记: Marker,
  绘制折线: Polyline,
  绘制多边形: Polygon,
  绘制圆形: Circle,
  热力图: HeatMap,
  海量点: MultiPoint,
};
