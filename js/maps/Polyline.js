import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {PixelRatio, Platform, processColor, requireNativeComponent, ViewPropTypes} from 'react-native'
import {LatLng} from '../PropTypes'

export default class Polyline extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 节点
     */
    coordinates: PropTypes.arrayOf(LatLng).isRequired,

    /**
     * 线段宽度
     */
    width: PropTypes.number,

    /**
     * 线段颜色
     */
    color: PropTypes.string,

    /**
     * 层级
     */
    zIndex: PropTypes.number,

    /**
     * 多段颜色
     */
    colors: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.string),
    ]),

    /**
     * 是否使用颜色渐变
     */
    gradient: PropTypes.bool,

    /**
     * 是否绘制大地线
     */
    geodesic: PropTypes.bool,

    /**
     * 是否绘制虚线
     */
    dashed: PropTypes.bool,

    /**
     * 点击事件
     */
    onPress: PropTypes.func,
  }

  static defaultProps = {
    colors: [],
  }

  render() {
    const props = {
      ...this.props,
      ...Platform.select({
        android: {
          width: PixelRatio.getPixelSizeForLayoutSize(this.props.width),
          colors: this.props.colors.map(processColor),
        },
      }),
    }
    return <AMapPolyline {...props}/>
  }
}

const AMapPolyline = requireNativeComponent('AMapPolyline', Polyline)
