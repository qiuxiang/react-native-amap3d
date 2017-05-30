import {StackNavigator} from 'react-navigation'
import Examples from './examples'
import MapTypes from './map-types'
import Layers from './layers'
import Indoor from './indoor'
import Controls from './controls'
import Gestures from './gestures'
import Marker from './marker'

export default StackNavigator({
  Examples: {screen: Examples},
  MapTypes: {screen: MapTypes},
  Layers: {screen: Layers},
  Indoor: {screen: Indoor},
  Controls: {screen: Controls},
  Gestures: {screen: Gestures},
  Marker: {screen: Marker},
})
