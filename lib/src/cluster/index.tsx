import * as React from "react";
import { ViewStyle } from "react-native";
import Supercluster, { ClusterFeature, ClusterProperties } from "supercluster";
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
  properties?: any;
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
  clusters: ClusterFeature<ClusterProperties>[];
}

export default class Cluster extends React.PureComponent<Props, State> {
  static defaultProps = { radius: 200 };
  state: State = { clusters: [] };
  cluster?: Supercluster<any, ClusterProperties>;

  componentDidMount() {
    this.init(this.props);
  }

  componentDidUpdate(props: Props) {
    if (props.points != this.props.points) {
      this.init(props);
    }
  }

  init(props: Props) {
    // 如果主线程占用太多计算资源，会导致 ios onLoad 事件无法触发，非常蛋疼
    // 暂时想到的解决办法是丢到下一个事件循环，但这可能会导致 update 失败
    setTimeout(() => {
      const { radius } = props;
      const options = { radius, minZoom: 3, maxZoom: 21 };
      this.cluster = new Supercluster<any, ClusterProperties>(options).load(
        props.points.map((marker) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [marker.position.longitude, marker.position.latitude],
          },
          properties: marker.properties,
        }))
      );
    }, 0);
  }

  update({ cameraPosition, latLngBounds }: CameraEvent) {
    setTimeout(() => {
      const { southwest, northeast } = latLngBounds;
      const clusters = this.cluster!.getClusters(
        [southwest.longitude, southwest.latitude, northeast.longitude, northeast.latitude],
        Math.round(cameraPosition.zoom!)
      );
      this.setState({ clusters });
    }, 0);
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
    const { renderCluster, renderMarker } = this.props;
    const render = renderCluster || this.renderCluster;
    return this.state.clusters.map(({ geometry, properties }) => {
      const position = {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      };

      if (properties.point_count > 0) {
        const { cluster_id, point_count } = properties;
        return render({ position, id: cluster_id, count: point_count });
      }

      return renderMarker({ position, properties });
    });
  }
}
