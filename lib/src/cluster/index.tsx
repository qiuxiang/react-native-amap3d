import * as React from "react";
import { ViewStyle } from "react-native";
import Supercluster from "supercluster";
import { ClusterFeature, ClusterProperties, PointFeature } from "supercluster";
import { CameraEvent } from "../map-view";
import { LatLng } from "../types";
import ClusterView from "./cluster-view";

export interface ClusterParams {
  id: number;
  count: number;
  position: LatLng;
}

interface MarkerItem {
  position: LatLng;
  extra?: any;
}

interface Props {
  radius?: number;
  clusterStyle?: ViewStyle;
  clusterTextStyle?: ViewStyle;
  points: MarkerItem[];
  renderMarker: (item: MarkerItem) => React.ReactNode;
  renderCluster?: (params: ClusterParams) => React.ComponentType<any>;
  onPress?: (params: ClusterParams) => void;
}

interface State {
  clusters: (ClusterFeature<ClusterProperties> | PointFeature<{}>)[];
}

export default class Cluster extends React.PureComponent<Props, State> {
  static defaultProps = { radius: 600 };

  state: State = { clusters: [] };

  componentDidMount() {
    this.init(this.props);
  }

  componentDidUpdate(props: Props) {
    this.init(props);
  }

  cluster?: Supercluster<{}, ClusterProperties>;

  init(props: Props) {
    const { radius } = props;
    this.cluster = new Supercluster<{}, ClusterProperties>({
      radius,
      minZoom: 3,
      maxZoom: 21,
    }).load(
      props.points.map((marker) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [marker.position.longitude, marker.position.latitude],
          extra: marker.extra,
        },
        properties: {},
      }))
    );
  }

  update({ cameraPosition, latLngBounds }: CameraEvent) {
    const clusters = this.cluster!.getClusters(
      [
        latLngBounds.southwest.longitude,
        latLngBounds.southwest.latitude,
        latLngBounds.northeast.longitude,
        latLngBounds.northeast.latitude,
      ],
      Math.round(cameraPosition.zoom!)
    );
    this.setState({ clusters });
  }

  renderCluster = (cluster: ClusterParams) => (
    <ClusterView
      key={cluster.id}
      cluster={cluster}
      onPress={this.props.onPress}
      style={this.props.clusterStyle}
      textStyle={this.props.clusterTextStyle}
    />
  );

  render() {
    return this.state.clusters.map((cluster) => {
      const { geometry, properties } = cluster;
      const { renderCluster, renderMarker } = this.props;
      const position = {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      };

      if (!properties) {
        const { cluster_id, point_count } = cluster.properties;
        const render = renderCluster || this.renderCluster;
        return render({ position, id: cluster_id, count: point_count });
      }

      return renderMarker({ position, extra: geometry.extra });
    });
  }
}
