import {PropTypes} from 'react'
import {requireNativeComponent, View} from 'react-native'

export default requireNativeComponent('AMapView', {
  name: 'AMapView',
  propTypes: {
    ...View.propTypes,
    showsUserLocation: PropTypes.bool,
    showsIndoorMap: PropTypes.bool,
    showsIndoorSwitch: PropTypes.bool,
    showsBuildings: PropTypes.bool,
    showsMapText: PropTypes.bool,
    showsCompass: PropTypes.bool,
    showsZoomControls: PropTypes.bool,
    showsScale: PropTypes.bool,
    showsMyLocationButton: PropTypes.bool,
    showsTraffic: PropTypes.bool,
    mapTextZIndex: PropTypes.number,
    maxZoomLevel: PropTypes.number,
    minZoomLevel: PropTypes.number,
    zoomLevel: PropTypes.number,
    mapType: PropTypes.string,
    zoomEnabled: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    rotateEnabled: PropTypes.bool,
    tiltEnabled: PropTypes.bool,
  },
})

