// @flow
import React from "react";
import PropTypes from "prop-types";
import { Platform, requireNativeComponent, StyleSheet, ViewPropTypes, View } from "react-native";
import { LatLng, Point } from "../PropTypes";
import Component from "../Component";

const style = StyleSheet.create({
  overlay: {
    position: "absolute"
  }
});

export default class Marker extends Component {
  static propTypes = {
    ...ViewPropTypes,

    /**
     * 坐标
     */
    coordinate: LatLng.isRequired,

    /**
     * 标题，作为默认的选中弹出显示
     */
    title: PropTypes.string,

    /**
     * 描述，显示在标题下方
     */
    description: PropTypes.string,

    /**
     * 默认图标颜色
     */
    color: Platform.select({
      android: PropTypes.oneOf([
        "azure",
        "blue",
        "cyan",
        "green",
        "magenta",
        "orange",
        "red",
        "rose",
        "violet",
        "yellow"
      ]),
      ios: PropTypes.oneOf(["red", "green", "purple"])
    }),

    /**
     * 自定义图标
     */
    icon: PropTypes.func,

    /**
     * 自定义图片，对应原生图片名称
     */
    image: PropTypes.string,

    /**
     * 透明度 [0, 1]
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

    /**
     * 覆盖物锚点比例
     *
     * @link http://a.amap.com/lbs/static/unzip/Android_Map_Doc/3D/com/amap/api/maps/model/Marker.html#setAnchor-float-float-
     * @platform android
     */
    anchor: Point,

    /**
     * 覆盖物偏移位置
     *
     * @link http://a.amap.com/lbs/static/unzip/iOS_Map_Doc/AMap_iOS_API_Doc_3D/interface_m_a_annotation_view.html#a78f23c1e6a6d92faf12a00877ac278a7
     * @platform ios
     */
    centerOffset: Point,

    /**
     * 是否选中，选中时将显示信息窗体，一个地图只能有一个正在选中的 marker
     */
    active: PropTypes.bool,

    /**
     * 是否禁用点击，默认不禁用
     */
    clickDisabled: PropTypes.bool,

    /**
     * 是否禁用弹出窗口，默认不禁用
     */
    infoWindowDisabled: PropTypes.bool,

    /**
     * 点击事件
     */
    onPress: PropTypes.func,

    /**
     * 拖放开始事件
     */
    onDragStart: PropTypes.func,

    /**
     * 拖放进行事件，类似于 mousemove，在结束之前会不断调用
     */
    onDrag: PropTypes.func,

    /**
     * 拖放结束事件，最终坐标将传入参数
     */
    onDragEnd: PropTypes.func,

    /**
     * 信息窗体点击事件
     *
     * 注意，对于自定义信息窗体，该事件是无效的
     */
    onInfoWindowPress: PropTypes.func
  };

  componentDidUpdate() {
    if (this.icon && Platform.OS === "android") {
      setTimeout(() => this.sendCommand("update"), 0);
    }
  }

  name = "AMapMarker";
  icon = null;

  active() {
    this.sendCommand("active");
  }

  lockToScreen(x, y) {
    this.sendCommand("lockToScreen", [x, y]);
  }

  renderCustomMarker(icon) {
    if (icon) {
      this.icon = <View style={style.overlay}>{icon()}</View>;
      return this.icon;
    }
    return null;
  }

  /* eslint-disable class-methods-use-this */
  renderInfoWindow(view) {
    if (view) {
      return <InfoWindow style={style.overlay}>{view}</InfoWindow>;
    }
    return null;
  }

  render() {
    return (
      <AMapMarker {...this.props}>
        {this.renderCustomMarker(this.props.icon)}
        {this.renderInfoWindow(this.props.children)}
      </AMapMarker>
    );
  }
}

const AMapMarker = requireNativeComponent("AMapMarker", Marker);
const InfoWindow = requireNativeComponent("AMapInfoWindow", { propTypes: { ...ViewPropTypes } });
