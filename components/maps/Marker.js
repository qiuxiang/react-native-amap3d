import React, {PropTypes} from 'react'
import {Platform, requireNativeComponent, StyleSheet, View, ViewPropTypes} from 'react-native'
import Overlay from './Overlay'
import InfoWindow from './InfoWindow'
import {LatLng} from '../PropTypes'
import BaseComponent from '../BaseComponent'

export default class Marker extends BaseComponent {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 坐标
     */
    coordinate: LatLng.isRequired,

    /**
     * 标题
     */
    title: PropTypes.string,

    /**
     * 描述
     */
    description: PropTypes.string,

    /**
     * 自定义图标
     */
    icon: PropTypes.oneOfType([
      Platform.select({
        android: PropTypes.oneOf([
          'azure',
          'blue',
          'cyan',
          'green',
          'magenta',
          'orange',
          'red',
          'rose',
          'violet',
          'yellow',
        ]),
        ios: PropTypes.oneOf([
          'red',
          'green',
          'purple',
        ]),
      }),
      PropTypes.func,
    ]),

    /**
     * 透明度 [0, 1]
     */
    opacity: PropTypes.number,

    /**
     * 是否可拖拽
     */
    draggable: PropTypes.bool,

    /**
     * 是否可点击
     */
    clickable: PropTypes.bool,

    /**
     * 是否平贴地图
     */
    flat: PropTypes.bool,

    /**
     * 层级
     */
    zIndex: PropTypes.number,

    /**
     * 是否选中，选中时将显示信息窗体，一个地图只能有一个正在选中的 marker
     */
    active: PropTypes.bool,

    /**
     * 是否启用信息窗体
     */
    infoWindowEnabled: PropTypes.bool,

    /**
     * 点击事件
     */
    onPress: React.PropTypes.func,

    /**
     * 拖放开始事件
     */
    onDragStart: React.PropTypes.func,

    /**
     * 拖放进行事件，类似于 mousemove，在结束之前会不断调用
     */
    onDrag: React.PropTypes.func,

    /**
     * 拖放结束事件，最终坐标将传入参数
     */
    onDragEnd: React.PropTypes.func,

    /**
     * 信息窗体点击事件
     *
     * Android 在使用自定义 View 时，该事件会失效，这时候可以用 Touchable* 代替
     */
    onInfoWindowPress: React.PropTypes.func,
  }

  _renderInfoWindow(view) {
    if (view) {
      return <InfoWindow style={style.overlay}>{view}</InfoWindow>
    }
  }

  componentDidUpdate() {
    if (this._customMarker && Platform.OS === 'android') {
      setTimeout(() => this._sendCommand('update'), 0)
    }
  }

  render() {
    const props = {...this.props}

    if (typeof props.icon === 'function') {
      this._customMarker = <Overlay style={style.overlay}>{props.icon()}</Overlay>
      delete props.icon
    }

    return <AMapMarker {...props}>
      {this._customMarker}
      {this._renderInfoWindow(props.children)}
    </AMapMarker>
  }

  name = 'AMapMarker'
}

const AMapMarker = requireNativeComponent('AMapMarker', Marker)

const style = StyleSheet.create({
  overlay: {
    position: 'absolute',
  },
})
