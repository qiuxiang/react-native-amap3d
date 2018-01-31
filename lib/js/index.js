import MapView from './maps/MapView'
import Marker from './maps/Marker'
import Polyline from './maps/Polyline'
import Polygon from './maps/Polygon'
import Circle from './maps/Circle'
import HeatMap from './maps/HeatMap'
import MultiPoint from './maps/MultiPoint'
import Navigation from './navigation'
import Utils from './Utils'
import Offline from './Offline'

MapView.Marker = Marker
MapView.Polyline = Polyline
MapView.Polygon = Polygon
MapView.Circle = Circle
MapView.HeatMap = HeatMap
MapView.MultiPoint = MultiPoint

export default MapView
export {
  MapView,
  Marker,
  Polyline,
  Polygon,
  Circle,
  HeatMap,
  MultiPoint,
  Navigation,
  Utils,
  Offline,
}
