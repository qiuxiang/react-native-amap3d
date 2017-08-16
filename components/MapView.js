import React, {PropTypes, Component} from 'react'
import {
  View,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'
import {LatLng, Region} from './PropTypes'

export default class MapView extends Component {
  static propTypes = {
    ...View.propTypes,

    /**
     * 地图类型
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
     *
     * TODO: 似乎并不能正常显示
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
     *
     * Android only
     */
    showsZoomControls: PropTypes.bool,

    /**
     * 是否显示比例尺
     */
    showsScale: PropTypes.bool,

    /**
     * 是否显示定位按钮
     *
     * Android only
     */
    showsLocationButton: PropTypes.bool,

    /**
     * 是否显示路况
     */
    showsTraffic: PropTypes.bool,

    /**
     * 最大缩放级别
     */
    maxZoomLevel: PropTypes.number,

    /**
     * 最小缩放级别
     */
    minZoomLevel: PropTypes.number,

    /**
     * 当前缩放级别，取值范围 [3, 20]
     */
    zoomLevel: PropTypes.number,

    /**
     * 中心坐标
     */
    coordinate: LatLng,

    /**
     * 限制地图只能显示某个矩形区域
     */
    limitRegion: Region,

    /**
     * 倾斜角度，取值范围 [0, 60]
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

    /**
     * 地图状态变化(包括移动、缩放、倾斜、旋转)事件
     */
    onStatusChange: React.PropTypes.func,

    /**
     * 地图状态变化完成事件
     */
    onStatusChangeComplete: React.PropTypes.func,
  }

  /**
   * 动画过渡到某个位置（坐标、缩放级别、倾斜度）
   *
   * @param {{zoomLevel: ?number, coordinate: ?LatLng, titl: ?number}} target
   * @param duration
   */
  animateTo(target, duration = 500) {
    this._sendCommand('animateTo', [target, duration])
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
}

AMapView = requireNativeComponent('AMapView', MapView)
