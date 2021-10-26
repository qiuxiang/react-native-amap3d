import * as React from "react";
import { NativeSyntheticEvent, requireNativeComponent } from "react-native";
import { LatLng } from "./types";

const AMapMultiPoint = requireNativeComponent<MultiPointProps>("AMapMultiPoint");

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
  onPress?: (event: NativeSyntheticEvent<{ index: number }>) => void;
}

export default (props: MultiPointProps) => <AMapMultiPoint {...props} />;
