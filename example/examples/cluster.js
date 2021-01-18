import React from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'react-native-amap3d';
import ClusteredMapView from './cluster/ClusteredMapView';

const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };

  //  latitude: 39.806901,
  // longitude: 116.29797
const marks = Array(5000)
  .join(',')
  .split(',')
  .map((v, index) => (
    <MapView.Marker
      key={index}
      coordinate={{
        longitude: 116.29797 + (index + 50) * 0.0001,
        latitude: 39.806901 + (index + 50) * 0.0001,
      }}
    />
  ))

  
export default Cluster = () => {
 
 
  return (
      <ClusteredMapView
        initialRegion={INITIAL_REGION}
        style={{ flex: 1 }}
        radius = {40}
        minPoints = {4}
        clusteringEnabled
        zoomGesturesEnabled={true}
  >{marks}</ClusteredMapView>
  );
};

