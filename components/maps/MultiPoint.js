import React, {PropTypes, PureComponent} from 'react'
import {requireNativeComponent, resolveAssetSource, ViewPropTypes} from 'react-native'

export default class MultiPoint extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 节点
     */
    points: PropTypes.arrayOf(
      PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        title: PropTypes.string,
        subtitle: PropTypes.string,
      })
    ).isRequired,

    /**
     * 图标
     */
    image: PropTypes.string,

    /**
     * 点击事件
     */
    onItemPress: React.PropTypes.func,
  }

  _onItemPress = event => {
    if (this.props.onItemPress) {
      this.props.onItemPress(this.props.points[event.nativeEvent.index])
    }
  }

  render() {
    return <AMapMultiPoint {...this.props} onItemPress={this._onItemPress}/>
  }
}

const AMapMultiPoint = requireNativeComponent('AMapMultiPoint', MultiPoint)
