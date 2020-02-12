import * as React from "react";
import * as PropTypes from "prop-types";
import { Platform, requireNativeComponent, StyleSheet, ViewPropTypes, View } from "react-native";
import { LatLngPropType, PointPropType, mapEventsPropType } from "../prop-types";
import Component from "./component";

const style = StyleSheet.create({
  overlay: {
    position: "absolute"
  }
});

export interface MarkerProps {
  icon?: () => React.ReactElement;
  children?: React.ReactChild;
}

const events = ["onInfoWindowPress", "onPress", "onDrag", "onDragEnd", "onDragStart"];

export default class Marker extends Component<MarkerProps> {
  static propTypes = {
    ...ViewPropTypes,
    ...mapEventsPropType(events),
    coordinate: LatLngPropType.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
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
    icon: PropTypes.func,
    image: PropTypes.string,
    opacity: PropTypes.number,
    draggable: PropTypes.bool,
    flat: PropTypes.bool,
    zIndex: PropTypes.number,
    anchor: PointPropType,
    centerOffset: PointPropType,
    active: PropTypes.bool,
    clickDisabled: PropTypes.bool,
    infoWindowDisabled: PropTypes.bool
  };

  nativeComponent = "AMapMarker";
  icon = null;

  componentDidUpdate() {
    if (this.icon && Platform.OS === "android") {
      setTimeout(() => this.call("update"), 0);
    }
  }

  active() {
    this.call("active");
  }

  update() {
    this.call("update");
  }

  lockToScreen(x: number, y: number) {
    this.call("lockToScreen", [x, y]);
  }

  renderCustomMarker(icon: () => React.ReactElement) {
    if (icon) {
      this.icon = <View style={style.overlay}>{icon()}</View>;
      return this.icon;
    }
    return null;
  }

  /* eslint-disable class-methods-use-this */
  renderInfoWindow(view: React.ReactChild) {
    if (view) {
      return <InfoWindow style={style.overlay}>{view}</InfoWindow>;
    }
    return null;
  }

  render() {
    const props = {
      ...this.props,
      ...this.handlers(events)
    };
    return (
      <AMapMarker {...props}>
        {this.renderCustomMarker(this.props.icon)}
        {this.renderInfoWindow(this.props.children)}
      </AMapMarker>
    );
  }
}

// @ts-ignore
const AMapMarker = requireNativeComponent("AMapMarker", Marker);
// @ts-ignore
const InfoWindow = requireNativeComponent("AMapInfoWindow", { propTypes: { ...ViewPropTypes } });
