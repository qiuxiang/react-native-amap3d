import React, {PropTypes, Component} from 'react'
import {requireNativeComponent, View, PixelRatio, Platform} from 'react-native'
import {LatLng} from './PropTypes'

class Polygon extends Component {
  static propTypes = {
    ...View.propTypes,

    coordinates: PropTypes.arrayOf(LatLng).isRequired,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    zIndex: PropTypes.number,
  }

  render() {
    const props = {
      ...this.props,
      ...Platform.select({
        android: {
          strokeWidth: PixelRatio.getPixelSizeForLayoutSize(this.props.strokeWidth),
        },
      }),
    }
    return <AMapPolygon {...props}/>
  }
}

AMapPolygon = requireNativeComponent('AMapPolygon', Polygon)

export default Polygon
