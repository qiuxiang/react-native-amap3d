import React, {PropTypes, Component} from 'react'
import {
  requireNativeComponent,
  findNodeHandle,
  View,
  UIManager,
} from 'react-native'
import {LatLng} from './PropTypes'
import Marker from './Marker'
import Overlay from './Overlay'
import Polyline from './Polyline'
import Polygon from './Polygon'
import Circle from './Circle'

class MapView extends Component {
  static propTypes = {
    ...View.propTypes,

    /**
     * 设置地图类型
     *
     * - standard: 标准地图
     * - satellite: 卫星地图
     * - navigation: 导航地图
     * - night: 夜间地图
     * - bus: 公交地图
     */
    mapType: PropTypes.oneOf(['standard', 'satellite', 'navigation', 'night', 'bus']),

    /**
     * 是否启用定位
     */
    locationEnabled: PropTypes.bool,

    /**
     * 是否显示室内地图
     */
    showsIndoorMap: PropTypes.bool,

    /**
     * 是否显示室内地图楼层切换控件
     */
    showsIndoorSwitch: PropTypes.bool,

    /**
     * 是否显示3D建筑
     */
    showsBuildings: PropTypes.bool,

    /**
     * 是否显示文本标签
     */
    showsLabels: PropTypes.bool,

    /**
     * 是否显示指南针
     */
    showsCompass: PropTypes.bool,

    /**
     * 是否显示放大缩小按钮
     */
    showsZoomControls: PropTypes.bool,

    /**
     * 是否显示比例尺
     */
    showsScale: PropTypes.bool,

    /**
     * 是否显示定位按钮
     */
    showsLocationButton: PropTypes.bool,

    /**
     * 是否显示路况
     */
    showsTraffic: PropTypes.bool,

    /**
     * 设置最大缩放级别
     */
    maxZoomLevel: PropTypes.number,

    /**
     * 设置最小缩放级别
     */
    minZoomLevel: PropTypes.number,

    /**
     * 设置当前缩放级别，取值范围 [3, 20]
     */
    zoomLevel: PropTypes.number,

    /**
     * 设置中心坐标
     */
    coordinate: LatLng,

    /**
     * 设置倾斜角度，取值范围 [0, 60]
     */
    tilt: PropTypes.number,

    /**
     * 是否启用缩放手势，用于放大缩小
     */
    zoomEnabled: PropTypes.bool,

    /**
     * 是否启用滑动手势，用于平移
     */
    scrollEnabled: PropTypes.bool,

    /**
     * 是否启用旋转手势，用于调整方向
     */
    rotateEnabled: PropTypes.bool,

    /**
     * 是否启用倾斜手势，用于改变视角
     */
    tiltEnabled: PropTypes.bool,

    /**
     * 点击事件
     */
    onPress: React.PropTypes.func,

    /**
     * 长按事件
     */
    onLongPress: React.PropTypes.func,

    /**
     * 定位事件
     */
    onLocation: React.PropTypes.func,

    /**
     * 动画完成事件
     */
    onAnimateFinish: React.PropTypes.func,

    /**
     * 动画取消事件
     */
    onAnimateCancel: React.PropTypes.func,
  }

  animateToCoordinate(coordinate, duration = 1000) {
    this._sendCommand('animateToCoordinate', [coordinate, duration])
  }

  animateToZoomLevel(zoomLevel, duration = 1000) {
    this._sendCommand('animateToZoomLevel', [zoomLevel, duration])
  }

  _sendCommand(command, params = null) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.AMapView.Commands[command],
      params,
    )
  }

  render() {
    return <AMapView {...this.props}/>
  }

  static Marker = Marker
  static Overlay = Overlay
  static Polyline = Polyline
  static Polygon = Polygon
  static Circle = Circle
}

AMapView = requireNativeComponent('AMapView', MapView)

export default MapView
export {MapView, Marker, Overlay, Polyline, Polygon, Circle}
