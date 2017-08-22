import MapView from './components/MapView'
import Marker from './components/Marker'
import Polyline from './components/Polyline'
import Polygon from './components/Polygon'
import Circle from './components/Circle'
import Drive from './components/Drive'
import Walk from './components/Walk'
import Ride from './components/Ride'
import MapUtils from './components/Utils'

MapView.Marker = Marker
MapView.Polyline = Polyline
MapView.Polygon = Polygon
MapView.Circle = Circle

export default MapView
export {
  MapView,
  Marker,
  Polyline,
  Polygon,
  Circle,
  Drive,
  Walk,
  Ride,
  MapUtils,
}
