import React, {PropTypes, PureComponent} from 'react'
import {
  requireNativeComponent,
  View,
  ViewPropTypes,
  Platform,
  StyleSheet,
} from 'react-native'
import {LatLng} from './PropTypes'
import Overlay from './Overlay'

export default class Marker extends PureComponent {
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
     * 使用自定义 View 会使该事件失效，这时候可以用 Touchable* 代替
     */
    onInfoWindowPress: React.PropTypes.func,
  }

  _onPress = event => this.props.onPress && this.props.onPress(event)

  render() {
    const props = {
      ...this.props,
      ...Platform.select({
        android: {
          onMarkerClick: this._onPress,
        },
      })
    }

    let customInfoWindow = <View collapsable={false}/>
    let customMarker = <View collapsable={false}/>

    if (props.children) {
      customInfoWindow = <Overlay style={styles.overlay}>{props.children}</Overlay>
    }

    if (typeof props.icon === 'function') {
      customMarker = <Overlay style={styles.overlay}>{props.icon()}</Overlay>
      delete props.icon
    }

    return <AMapMarker {...props}>
      {customMarker}
      {customInfoWindow}
    </AMapMarker>
  }
}

const AMapMarker = requireNativeComponent('AMapMarker', Marker)

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
  },
})
