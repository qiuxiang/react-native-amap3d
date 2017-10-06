// @flow
import React from 'react'
import PropTypes from 'prop-types'
import {requireNativeComponent, ViewPropTypes} from 'react-native'
import {LatLng, Region} from '../PropTypes'
import BaseComponent from '../BaseComponent'

type Target = {
  zoomLevel?: number,
  coordinate?: LatLng,
  titl?: number,
  rotation?: number,
}

export default class MapView extends BaseComponent {
  static propTypes = {
    ...ViewPropTypes,

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
     * 定位间隔(ms)，默认 2000
     *
     * @platform android
     */
    locationInterval: PropTypes.number,

    /**
     * 定位的最小更新距离
     *
     * @platform ios
     */
    distanceFilter: PropTypes.number,

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
     * @platform android
     */
    showsZoomControls: PropTypes.bool,

    /**
     * 是否显示比例尺
     */
    showsScale: PropTypes.bool,

    /**
     * 是否显示定位按钮
     *
     * @platform android
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
     * 显示区域
     */
    region: Region,

    /**
     * 限制地图只能显示某个矩形区域
     */
    limitRegion: Region,

    /**
     * 倾斜角度，取值范围 [0, 60]
     */
    tilt: PropTypes.number,

    /**
     * 旋转角度
     */
    rotation: PropTypes.number,

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
    onPress: PropTypes.func,

    /**
     * 长按事件
     */
    onLongPress: PropTypes.func,

    /**
     * 定位事件
     */
    onLocation: PropTypes.func,

    /**
     * 动画完成事件
     */
    onAnimateFinish: PropTypes.func,

    /**
     * 动画取消事件
     */
    onAnimateCancel: PropTypes.func,

    /**
     * 地图状态变化事件
     */
    onStatusChange: PropTypes.func,

    /**
     * 地图状态变化完成事件
     */
    onStatusChangeComplete: PropTypes.func,
  }

  /**
   * 动画过渡到某个状态（坐标、缩放级别、倾斜度、旋转角度）
   */
  animateTo(target: Target, duration?: number = 500) {
    this._sendCommand('animateTo', [target, duration])
  }

  render() {
    return <AMapView {...this.props}/>
  }

  name = 'AMapView'
}

const AMapView = requireNativeComponent('AMapView', MapView)
