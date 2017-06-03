import React, {PropTypes, Component} from 'react'
import {requireNativeComponent, View, PixelRatio} from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import {CoordinatePropType} from './PropTypes'

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
     * 自定义图片
     * 可以是 uri 或者 require 引用的资源图片
     */
    image: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
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

  state = {}

  _handle(name) {
    return event => {
      if (this.props[name]) {
        this.props[name](event)
      }
    }
  }

  _handleLayout(calloutLayout) {
    this.setState({infoWindowLayout: {
      width: PixelRatio.getPixelSizeForLayoutSize(calloutLayout.width),
      height: PixelRatio.getPixelSizeForLayoutSize(calloutLayout.height),
    }})
  }

  render() {
    const props = {
      ...this.props,
      infoWindowLayout: this.state.infoWindowLayout,
      onMarkerClick: this._handle('onPress'),
      onMarkerDragStart: this._handle('onDragStart'),
      onMarkerDrag: this._handle('onDrag'),
      onMarkerDragEnd: this._handle('onDragEnd'),
    }

    if (typeof props.image === 'number') {
      props.image = resolveAssetSource(this.props.image).uri
    }

    if (props.children) {
      props.children = <View
        {...props.children.props}
        onLayout={event => this._handleLayout(event.nativeEvent.layout)}
        collapsable={false}/>
    }

    return <AMapMarker {...props}/>
  }
}

AMapMarker = requireNativeComponent('AMapMarker', Marker, {
  nativeOnly: {
    infoWindowLayout: true,
  },
})

export default Marker
