import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
} from 'react';
import { Dimensions, LayoutAnimation, Platform, Alert } from 'react-native';
import { MapView } from 'react-native-amap3d';
import SuperCluster from 'supercluster';
import ClusterMarker from './ClusteredMarker';
import {
  isMarker,
  markerToGeoJSONFeature,
  calculateBBox,
  returnMapZoom,
  generateSpiral,
} from './helpers';

const ClusteredMapView = forwardRef(
  (
    {
      radius,
      maxZoom,
      minZoom,
      minPoints,
      extent,
      nodeSize,
      children,
      onClusterPress,
      onRegionChangeComplete,
      onMarkersChange,
      preserveClusterPressBehavior,
      clusteringEnabled,
      clusterColor,
      clusterTextColor,
      clusterFontFamily,
      spiderLineColor,
      layoutAnimationConf,
      animationEnabled,
      renderCluster,
      tracksViewChanges,
      spiralEnabled,
      superClusterRef,
      ...restProps
    },
    ref,
  ) => {
    const [markers, updateMarkers] = useState([]);
    const [mapStatus, setMapStatus] = useState([]);
    const [spiderMarkers, updateSpiderMarker] = useState([]);
    const [otherChildren, updateChildren] = useState([]);
    const [superCluster, setSuperCluster] = useState(null);
    const [currentRegion, updateRegion] = useState(
      restProps.region || restProps.initialRegion,
    );
    const [mapZoom, setMapZoom] = useState(5);

    const [isSpiderfier, updateSpiderfier] = useState(false);
    const [clusterChildren, updateClusterChildren] = useState(null);
    const mapRef = useRef();

    const propsChildren = useMemo(() => React.Children.toArray(children), [
      children,
    ]);
    

    useEffect(() => {
      const rawData = [];
      const otherChildren = [];

      if (!clusteringEnabled) {
        updateSpiderMarker([]);
        updateMarkers([]);
        updateChildren(propsChildren);
        setSuperCluster(null);
        return;
      }

      propsChildren.forEach((child, index) => {
        if (isMarker(child)) {
          rawData.push(markerToGeoJSONFeature(child, index));
        } else {
          otherChildren.push(child);
        }
      });

      const superCluster = new SuperCluster({
        radius,
        maxZoom,
        minZoom,
        minPoints,
        extent,
        nodeSize,
      });

      superCluster.load(rawData);

      const bBox = calculateBBox(currentRegion);
      const zoom = returnMapZoom(currentRegion, bBox, minZoom);
      const markers = superCluster.getClusters(bBox, zoom);

      Alert.alert('marks www 数量', markers.length + '');
      updateMarkers(markers);
      updateChildren(otherChildren);
      setSuperCluster(superCluster);

      superClusterRef.current = superCluster;
    }, [propsChildren, clusteringEnabled]);

    useEffect(() => {
      if (!spiralEnabled) {
        return;
      }

      if (isSpiderfier && markers.length > 0) {
        let allSpiderMarkers = [];
        let spiralChildren = [];
        markers.map((marker, i) => {
          if (marker.properties.cluster) {
            spiralChildren = superCluster.getLeaves(
              marker.properties.cluster_id,
              Infinity,
            );
          }
          let positions = generateSpiral(marker, spiralChildren, markers, i);
          allSpiderMarkers.push(...positions);
        });

        updateSpiderMarker(allSpiderMarkers);
      } else {
        updateSpiderMarker([]);
      }
    }, [isSpiderfier, markers]);

    // const _onRegionChangeComplete = (region) => {
    //   if (superCluster && region) {
    //     const bBox = calculateBBox(region);
    //     const zoom = returnMapZoom(region, bBox, minZoom);
    //     const markers = superCluster.getClusters(bBox, zoom);
    //     if (animationEnabled && Platform.OS === 'ios') {
    //       LayoutAnimation.configureNext(layoutAnimationConf);
    //     }
    //     if (zoom >= 18 && markers.length > 0 && clusterChildren) {
    //       if (spiralEnabled) {
    //         updateSpiderfier(true);
    //       }
    //     } else {
    //       if (spiralEnabled) {
    //         updateSpiderfier(false);
    //       }
    //     }
    //     updateMarkers(markers);
    //     onMarkersChange(markers);
    //     onRegionChangeComplete(region, markers);
    //     updateRegion(region);
    //   } else {
    //     onRegionChangeComplete(region);
    //   }
    // };

    const _onClusterPress = (cluster) => () => {
      const children = superCluster.getLeaves(cluster.id, Infinity);
      updateClusterChildren(children);

      if (preserveClusterPressBehavior) {
        onClusterPress(cluster, children);
        return;
      }

      const coordinates = children.map(({ geometry }) => ({
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      }));

      //   mapRef.current.fitToCoordinates(coordinates, {
      //     edgePadding: restProps.edgePadding,
      //   });

      //   mapRef.current.setStatus({
      //     zoomLevel: mapStatus.zoomLevel + 3,
      //   });

      Alert.alert('cluster', JSON.stringify(cluster));
      onClusterPress(cluster, children);
      ///add
      //   superCluster.getClusters()

      //   const bBox = calculateBBox(region);
      //   const zoom = returnMapZoom(region, bBox, minZoom);
      //   const markers = superCluster.getClusters(bBox, zoom);
    };

    return (
      <MapView
        {...restProps}
        ref={(map) => {
          mapRef.current = map;
          if (ref) {
            ref.current = map;
          }
          restProps.mapRef(map);
        }}
        zoomLevel = {6}
        onStatusChangeComplete={(mapStatus) => {
          if (!mapStatus) {
            return;
          }

          const region = mapStatus.region;

          if (superCluster && region) {
            const bBox = calculateBBox(region);
            const zoom = returnMapZoom(region, bBox, minZoom);
            const markers = superCluster.getClusters(bBox, zoom);
            if (animationEnabled && Platform.OS === 'ios') {
              LayoutAnimation.configureNext(layoutAnimationConf);
            }
            if (zoom >= 18 && markers.length > 0 && clusterChildren) {
              if (spiralEnabled) {
                updateSpiderfier(true);
              }
            } else {
              if (spiralEnabled) {
                updateSpiderfier(false);
              }
            }

            if (mapRef) {
              const childArray = React.Children.toArray(
                mapRef.current.props.children,
              );
              let children = mapRef.current.props.children;
            }
            // Alert.alert('marks 数量', JSON.stringify(markers));
            setMapStatus(mapStatus);
            updateMarkers(markers);
            onMarkersChange(markers);
            onRegionChangeComplete(region, markers);
            updateRegion(region);
            // Alert.alert('marks 儿子', mapRef.current.children.length + '');
          } else {
            onRegionChangeComplete(region);
          }
        }}
      >
        {markers.map((marker) =>
          marker.properties.point_count === 0 ? (
            propsChildren[marker.properties.index]
          ) : !isSpiderfier ? (
            renderCluster ? (
              renderCluster({
                onPress: _onClusterPress(marker),
                clusterColor,
                clusterTextColor,
                clusterFontFamily,
                ...marker,
              })
            ) : (
              <ClusterMarker
                {...marker}
                onPress={() => {}}
                clusterColor={
                  restProps.selectedClusterId === marker.id
                    ? restProps.selectedClusterColor
                    : clusterColor
                }
                clusterTextColor={clusterTextColor}
                clusterFontFamily={clusterFontFamily}
                tracksViewChanges={tracksViewChanges}
              />
            )
          ) : null,
        )}
        {/* {otherChildren}
        {spiderMarkers.map((marker) => {
          return propsChildren[marker.index]
            ? React.cloneElement(propsChildren[marker.index], {
                coordinate: { ...marker },
              })
            : null;
        })}
        {spiderMarkers.map((marker, index) => (
          <MapView.Polyline
            key={index}
            coordinates={[marker.centerPoint, marker, marker.centerPoint]}
            strokeColor={spiderLineColor}
            strokeWidth={1}
          />
        ))} */}
      </MapView>
    );
  },
);

ClusteredMapView.defaultProps = {
  clusteringEnabled: true,
  spiralEnabled: true,
  animationEnabled: true,
  preserveClusterPressBehavior: false,
  layoutAnimationConf: LayoutAnimation.Presets.spring,
  tracksViewChanges: false,
  // SuperCluster parameters
  radius: Dimensions.get('window').width * 0.06,
  maxZoom: 20,
  minZoom: 1,
  minPoints: 2,
  extent: 512,
  nodeSize: 64,
  // Map parameters
  edgePadding: { top: 50, left: 50, right: 50, bottom: 50 },
  // Cluster styles
  clusterColor: '#00B386',
  clusterTextColor: '#FFFFFF',
  spiderLineColor: '#FF0000',
  // Callbacks
  onRegionChangeComplete: () => {},
  onClusterPress: () => {},
  onMarkersChange: () => {},
  superClusterRef: {},
  mapRef: () => {},
};

export default memo(ClusteredMapView);
