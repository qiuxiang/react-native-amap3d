import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {PixelRatio, Platform, requireNativeComponent, ViewPropTypes} from 'react-native'
import {LatLng} from '../PropTypes'

/**
 * 注意，热力图组件的 props 设置过一次之后便不能再更改
 */
export default class HeatMap extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 节点
     */
    coordinates: PropTypes.arrayOf(LatLng).isRequired,

    /**
     * 半径
     */
    radius: PropTypes.number,

    /**
     * 透明度
     */
    opacity: PropTypes.number,
  }

  render() {
    return <AMapHeatMap {...this.props}/>
  }
}

const AMapHeatMap = requireNativeComponent('AMapHeatMap', HeatMap)
