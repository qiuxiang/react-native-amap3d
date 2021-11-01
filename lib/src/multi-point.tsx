import * as React from "react";
import { ImageSourcePropType, NativeSyntheticEvent, requireNativeComponent } from "react-native";
// @ts-ignore
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { LatLng } from "./types";

const NativeMultiPoint = requireNativeComponent<MultiPointProps>("AMapMultiPoint");

export interface MultiPointProps {
  /**
   * 坐标点集合
   */
  items?: LatLng[];

  /**
   * 图标
   */
  icon?: ImageSourcePropType;

  /**
   * 点击事件
   */
  onPress?: (event: NativeSyntheticEvent<{ index: number }>) => void;
}

export default (props: MultiPointProps) => {
  return <NativeMultiPoint {...props} icon={resolveAssetSource(props.icon)} />;
};
