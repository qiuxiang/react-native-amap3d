import {StackNavigator} from 'react-navigation'
import Examples from './examples'
import MapTypes from './map-types'
import Layers from './layers'
import Indoor from './indoor'
import Controls from './controls'
import Gestures from './gestures'
import Marker from './marker'
import Polyline from './polyline'

export default StackNavigator({
  Examples: {screen: Examples},
  MapTypes: {screen: MapTypes},
  Layers: {screen: Layers},
  Indoor: {screen: Indoor},
  Controls: {screen: Controls},
  Gestures: {screen: Gestures},
  Marker: {screen: Marker},
  Polyline: {screen: Polyline},
}, {
  navigationOptions: {
    headerTintColor: '#212121',
    headerStyle: {
      backgroundColor: '#f5f5f5',
    },
  },
})
