import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { requireNativeComponent, ViewPropTypes } from "react-native";

export const Point = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string
});

export default class MultiPoint extends PureComponent {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 节点
     */
    points: PropTypes.arrayOf(Point).isRequired,

    /**
     * 图标，只接受原生图片名字
     */
    image: PropTypes.string,

    /**
     * 点击事件
     *
     * @param {Point}
     */
    onItemPress: PropTypes.func
  };

  onItemPress = ({ nativeEvent }) => {
    if (this.props.onItemPress) {
      this.props.onItemPress(this.props.points[nativeEvent.index]);
    }
  };

  render() {
    return <AMapMultiPoint {...this.props} onItemPress={this.onItemPress} />;
  }
}

const AMapMultiPoint = requireNativeComponent("AMapMultiPoint", MultiPoint);
