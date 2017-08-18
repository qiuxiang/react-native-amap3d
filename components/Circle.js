import React, {PropTypes, Component} from 'react'
import {
  requireNativeComponent,
  ViewPropTypes,
  PixelRatio,
  Platform,
} from 'react-native'
import {LatLng} from './PropTypes'

export default class Circle extends Component {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 圆点
     */
    coordinate: LatLng.isRequired,

    /**
     * 半径（米）
     */
    radius: PropTypes.number.isRequired,

    /**
     * 边线宽度
     */
    strokeWidth: PropTypes.number,

    /**
     * 边线颜色
     */
    strokeColor: PropTypes.string,

    /**
     * 填充颜色
     */
    fillColor: PropTypes.string,

    /**
     * 层级
     */
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
    return <AMapCircle {...props}/>
  }
}

const AMapCircle = requireNativeComponent('AMapCircle', Circle)
