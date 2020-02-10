import MapTypes from "./map-types";
import Layers from "./layers";
import Indoor from "./indoor";
import Animated from "./animated";
import Controls from "./controls";
import Gestures from "./gestures";
import Marker from "./marker";
import Polyline from "./polyline";
import Polygon from "./polygon";
import Circle from "./circle";
import Events from "./events";
import HeatMap from "./heat-map";
import MultiPoint from "./multi-point";
import Offline from "./offline";

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
  海量点: MultiPoint
  // 离线地图: Offline
};
