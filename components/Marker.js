import React, {PropTypes, Component} from 'react'
import {requireNativeComponent, View, PixelRatio} from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import {CoordinatePropType} from './PropTypes'
import InfoWindow from './InfoWindow'

class Marker extends Component {
  static propTypes = {
    ...View.propTypes,

    /**
     * 坐标
     */
    coordinate: CoordinatePropType.isRequired,

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
     * 可以是 uri 或者 require 引用的资源图片
     */
    icon: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.func,
    ]),

    /**
     * 透明度
     */
    opacity: PropTypes.number,

    /**
     * 是否可拖拽
     */
    draggable: PropTypes.bool,

    /**
     * 是否平贴地图
     */
    flat: PropTypes.bool,

    /**
     * 层级
     */
    zIndex: PropTypes.number,

    /**
     * 是否选中
     */
    selected: PropTypes.bool,

    onPress: React.PropTypes.func,
    onDragStart: React.PropTypes.func,
    onDrag: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
    onInfoWindowPress: React.PropTypes.func,
  }

  _handle(name) {
    return event => {
      if (this.props[name]) {
        this.props[name](event)
      }
    }
  }

  render() {
    const props = {
      ...this.props,
      onMarkerClick: this._handle('onPress'),
      onMarkerDragStart: this._handle('onDragStart'),
      onMarkerDrag: this._handle('onDrag'),
      onMarkerDragEnd: this._handle('onDragEnd'),
    }

    if (typeof props.icon === 'number') {
      props.icon = resolveAssetSource(this.props.icon).uri
    }

    let customInfoWindow = null
    let customMarker = null

    if (props.children) {
      customInfoWindow = props.children
    }

    if (typeof props.icon === 'function') {
      customMarker = props.icon()
      delete props.icon
    }

    return <AMapMarker {...props}>
      {customMarker}
      {customInfoWindow}
    </AMapMarker>
  }
}

AMapMarker = requireNativeComponent('AMapMarker', Marker)

export default Marker
