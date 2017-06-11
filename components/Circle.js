import React, {PropTypes, Component} from 'react'
import {requireNativeComponent, View, PixelRatio} from 'react-native'
import {LatLng} from './PropTypes'

class Circle extends Component {
  static propTypes = {
    ...View.propTypes,

    /**
     * 圆点
     */
    center: LatLng.isRequired,

    /**
     * 半径（米）
     */
    radius: PropTypes.number.isRequired,

    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    zIndex: PropTypes.number,
  }

  render() {
    const props = {
      ...this.props,
      strokeWidth: PixelRatio.getPixelSizeForLayoutSize(this.props.strokeWidth),
    }
    return <AMapCircle {...props}/>
  }
}

AMapCircle = requireNativeComponent('AMapCircle', Circle)

export default Circle
