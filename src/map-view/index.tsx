import * as React from "react";
import { number, bool, string, oneOf } from "prop-types";
import { requireNativeComponent, ViewProps, ViewPropTypes } from "react-native";
import { LatLngPropType, RegionPropType, mapEventsPropType } from "../prop-types";
import { MapType, MapStatus } from "../types";
import Component from "./component";

export interface MapViewProps extends ViewProps, MapStatus {
  mapType: MapType;
}

const events = ["onPress", "onLongPress", "onStatusChange"];

export default class MapView extends Component<MapViewProps> {
  protected nativeComponent = "AMapView";
  private static propTypes = {
    ...ViewPropTypes,
    ...mapEventsPropType(events),
    mapType: number,
    center: LatLngPropType,
    zoomLevel: number,
    heading: number,
    tilt: number,
    region: RegionPropType,
    maxZoomLevel: number,
    minZoomLevel: number,
    zoomDisabled: bool,
    scrollDisabled: bool,
    rotateDisabled: bool,
    tiltDisabled: bool,
    locationEnabled: bool,
    indoorEnabled: bool,
    trafficEnabled: bool,
    buildingsDisabled: bool,
    labelsDisabled: bool,
    indoorSwitchDisabled: bool,
    compassDisabled: bool,
    zoomControlsDisabled: bool,
    scaleBarDisabled: bool
  };

  private render() {
    const props = {
      ...this.props,
      ...this.handlers(events)
    };
    return <AMapView {...props} />;
  }
}

const AMapView = requireNativeComponent("AMapView", MapView);
