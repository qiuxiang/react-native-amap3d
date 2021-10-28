import Animated from "./animated";
import Circle from "./circle";
import Controls from "./controls";
import Events from "./events";
import Gestures from "./gestures";
import HeatMap from "./heat-map";
import Layers from "./layers";
import MapTypes from "./map-types";
import Marker from "./marker";
import MultiPoint from "./multi-point";
import Polygon from "./polygon";
import Polyline from "./polyline";

export default {
  地图模式切换: MapTypes,
  "图层：3D 建筑、路况、室内地图": Layers,
  "控件：指南针、比例尺、缩放按钮、定位按钮": Controls,
  手势控制: Gestures,
  动画移动: Animated,
  地图事件: Events,
  "添加标记，支持拖拽": Marker,
  绘制折线: Polyline,
  绘制多边形: Polygon,
  绘制圆形: Circle,
  热力图: HeatMap,
  海量点: MultiPoint,
};
