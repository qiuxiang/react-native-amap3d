import MapView from './components/maps/MapView'
import Marker from './components/maps/Marker'
import Polyline from './components/maps/Polyline'
import Polygon from './components/maps/Polygon'
import Circle from './components/maps/Circle'
import Navigation from './components/navigation'
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
  Navigation,
  MapUtils,
}
