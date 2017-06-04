import React, {PropTypes, Component} from 'react'
import {requireNativeComponent, View, PixelRatio} from 'react-native'
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
     *
     * 可以是回调函数返回的自定义 View，需要注意的是，
     * Root View 必须是 Overlay，且需设置 style width
     */
    icon: PropTypes.oneOfType([
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

    /**
     * 是否显示信息窗体
     */
    showsInfoWindow: PropTypes.bool,

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
     */
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
      onInfoWindowClick: this._handle('onInfoWindowPress'),
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
