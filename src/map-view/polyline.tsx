import * as React from "react";
import * as PropTypes from "prop-types";
import {
  ColorPropType,
  Platform,
  processColor,
  requireNativeComponent,
  ViewPropTypes
} from "react-native";
import { LatLngPropType } from "../prop-types";

interface PolylineProps {
  colors?: string[];
}

export default class Polyline extends React.PureComponent<PolylineProps> {
  static propTypes = {
    ...ViewPropTypes,
    coordinates: PropTypes.arrayOf(LatLngPropType).isRequired,
    width: PropTypes.number,
    color: ColorPropType,
    zIndex: PropTypes.number,
    colors: PropTypes.arrayOf(ColorPropType),
    gradient: PropTypes.bool,
    geodesic: PropTypes.bool,
    dashed: PropTypes.bool,
    onPress: PropTypes.func
  };

  static defaultProps = {
    colors: []
  };

  render() {
    const props = {
      ...this.props,
      ...Platform.select({
        android: {
          colors: this.props.colors.map(processColor)
        }
      })
    };
    return <AMapPolyline {...props} />;
  }
}

// @ts-ignore
const AMapPolyline = requireNativeComponent("AMapPolyline", Polyline);
