import React, {PropTypes} from 'react'
import {Platform, requireNativeComponent, StyleSheet, ViewPropTypes} from 'react-native'
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
     * 默认图标颜色
     */
    color: Platform.select({
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

    /**
     * 自定义图标
     */
    icon: PropTypes.func,

    /**
     * 自定义图片
     */
    image: PropTypes.string,

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

  _renderCustomMarker(icon) {
    if (icon) {
      this._icon = <Overlay style={style.overlay}>{icon()}</Overlay>
      return this._icon
    }
  }

  componentDidUpdate() {
    if (this._icon && Platform.OS === 'android') {
      setTimeout(() => this._sendCommand('update'), 0)
    }
  }

  render() {
    return <AMapMarker {...this.props}>
      {this._renderCustomMarker(this.props.icon)}
      {this._renderInfoWindow(this.props.children)}
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
