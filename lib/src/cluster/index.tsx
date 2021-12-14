import * as React from "react";
import { ViewStyle } from "react-native";
import Supercluster, { ClusterFeature, ClusterProperties } from "supercluster";
import { CameraEvent } from "../map-view";
import { LatLng } from "../types";
import ClusterView from "./cluster-view";

export interface ClusterParams {
  /**
   * 唯一标识
   */
  id: number;

  /**
   * 包含的 Marker 数量
   */
  count: number;

  /**
   * 坐标
   */
  position: LatLng;
}

interface ClusterPoint {
  /**
   * 坐标
   */
  position: LatLng;

  /**
   * 携带的数据，可以是任意类型
   */
  properties?: any;
}

interface Props {
  /**
   * 聚合半径
   */
  radius?: number;

  /**
   * 聚合点样式
   */
  clusterStyle?: ViewStyle;

  /**
   * 聚合点文本样式
   */
  clusterTextStyle?: ViewStyle;

  /**
   * 坐标点列表
   */
  points: ClusterPoint[];

  /**
   * 渲染 Marker
   */
  renderMarker: (item: ClusterPoint) => React.ReactNode;

  /**
   * 渲染聚合点
   */
  renderCluster?: (params: ClusterParams) => React.ComponentType<any>;

  /**
   * 聚合点点击事件
   */
  onPress?: (params: ClusterParams) => void;
}

interface State {
  clusters: ClusterFeature<ClusterProperties>[];
}

export default class Cluster extends React.PureComponent<Props, State> {
  static defaultProps = { radius: 200 };
  state: State = { clusters: [] };
  status?: CameraEvent;
  cluster?: Supercluster<any, ClusterProperties>;

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(props: Props) {
    if (props.points != this.props.points) {
      this.init();
    }
  }

  async init() {
    const { radius, points } = this.props;
    // 如果主线程占用太多计算资源，会导致 ios onLoad 事件无法触发，非常蛋疼
    // 暂时想到的解决办法是等一个事件循环
    await new Promise((resolve) => setTimeout(resolve, 0));
    const options = { radius, minZoom: 3, maxZoom: 21 };
    this.cluster = new Supercluster<any, ClusterProperties>(options).load(
      points.map((marker) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [marker.position.longitude, marker.position.latitude],
        },
        properties: marker.properties,
      }))
    );
    if (this.status) {
      this.update(this.status);
    }
  }

  /**
   * 需要在 MapView.onCameraIdle({ nativeEvent }) 回调里调用，参数为 nativeEvent
   */
  async update(status: CameraEvent) {
    this.status = status;
    await new Promise((resolve) => setTimeout(resolve, 0));
    const { cameraPosition, latLngBounds } = status;
    const { southwest, northeast } = latLngBounds;
    const clusters = this.cluster!.getClusters(
      [southwest.longitude, southwest.latitude, northeast.longitude, northeast.latitude],
      Math.round(cameraPosition.zoom!)
    );
    this.setState({ clusters });
  }

  renderCluster = (cluster: ClusterParams) => {
    return (
      <ClusterView
        key={cluster.id}
        cluster={cluster}
        onPress={this.props.onPress}
        style={this.props.clusterStyle}
        textStyle={this.props.clusterTextStyle}
      />
    );
  };

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
