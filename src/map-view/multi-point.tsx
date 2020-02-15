import * as React from "react";
import * as PropTypes from "prop-types";
import { requireNativeComponent, ViewPropTypes } from "react-native";
import { Point } from "../types";

export const PointPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string
});

interface MultiPointProps {
  points?: Point[];
  onItemPress?: (item: Point) => void;
}

export default class MultiPoint extends React.PureComponent<MultiPointProps> {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 节点
     */
    points: PropTypes.arrayOf(PointPropType).isRequired,

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

// @ts-ignore
const AMapMultiPoint = requireNativeComponent("AMapMultiPoint", MultiPoint);
