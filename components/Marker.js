import React, {PropTypes, Component} from 'react'
import {requireNativeComponent, View} from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import merge from 'merge'
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
  }

  render() {
    if (this.props.image) {
      const source = resolveAssetSource(this.props.image)
      return <AMapMarker {...this.props} image={source.uri}/>
    } else {
      return <AMapMarker {...this.props}/>
    }
  }
}

AMapMarker = requireNativeComponent('AMapMarker', Marker)

export default Marker
