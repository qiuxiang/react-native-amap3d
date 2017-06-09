import {StackNavigator} from 'react-navigation'
import Examples from './examples'
import MapTypes from './examples/map-types'
import Layers from './examples/layers'
import Indoor from './examples/indoor'
import Controls from './examples/controls'
import Gestures from './examples/gestures'
import Marker from './examples/marker'
import Polyline from './examples/polyline'
import Polygon from './examples/polygon'
import Circle from './examples/circle'

export default StackNavigator({
  Examples: {screen: Examples},
  MapTypes: {screen: MapTypes},
  Layers: {screen: Layers},
  Indoor: {screen: Indoor},
  Controls: {screen: Controls},
  Gestures: {screen: Gestures},
  Marker: {screen: Marker},
  Polyline: {screen: Polyline},
  Polygon: {screen: Polygon},
  Circle: {screen: Circle},
}, {
  navigationOptions: {
    headerTintColor: '#212121',
    headerStyle: {
      backgroundColor: '#f5f5f5',
    },
  },
})
