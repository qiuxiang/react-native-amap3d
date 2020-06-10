import * as React from "react";
import * as PropTypes from "prop-types";
import { requireNativeComponent, ViewPropTypes } from "react-native";
import { Point } from "../types";

const PointPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
});

export interface MultiPointProps {
  /**
   * 节点
   */
  points?: Point[];

  /**
   * 图标，只接受原生图片名字
   */
  image?: string;

  /**
   * 点击事件
   */
  onItemPress?: (item: Point) => void;
}

/**
 * @ignore
 */
export default class MultiPoint extends React.PureComponent<MultiPointProps> {
  static propTypes = {
    ...ViewPropTypes,
    points: PropTypes.arrayOf(PointPropType).isRequired,
    image: PropTypes.string,
    onItemPress: PropTypes.func,
  };

  onItemPress = ({ nativeEvent }) => {
    if (this.props.onItemPress) {
      this.props.onItemPress(this.props.points[nativeEvent.index]);
    }
  };

  render() {
    // @ts-ignore
    return <AMapMultiPoint {...this.props} onItemPress={this.onItemPress} />;
  }
}

// @ts-ignore
const AMapMultiPoint = requireNativeComponent("AMapMultiPoint", MultiPoint);
