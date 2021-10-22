import * as React from "react";
import { NativeSyntheticEvent, requireNativeComponent } from "react-native";
import { LatLng } from "./types";

export interface MultiPointProps {
  /**
   * 节点
   */
  points?: LatLng[];

  /**
   * 图标，只接受原生图片名字
   */
  image?: string;

  /**
   * 点击事件
   */
  onItemPress?: (item: LatLng) => void;
}

interface MultiPointEvent {
  index: number;
}

/**
 * @ignore
 */
export default class MultiPoint extends React.PureComponent<MultiPointProps> {
  onItemPress = ({ nativeEvent }: NativeSyntheticEvent<MultiPointEvent>) => {
    if (this.props.onItemPress) {
      const { points = [] } = this.props;
      this.props.onItemPress(points[nativeEvent.index]);
    }
  };

  render() {
    // @ts-ignore
    return <AMapMultiPoint {...this.props} onItemPress={this.onItemPress} />;
  }
}

const AMapMultiPoint = requireNativeComponent<MultiPointProps>("AMapMultiPoint");
