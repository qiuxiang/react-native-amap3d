import * as React from "react";
import { LatLng, MapView, Marker } from "react-native-amap3d";

export default () => {
  const [markers, setMarkers] = React.useState(Array<LatLng>());
  React.useEffect(() => alert("点击地图添加 Marker，点击 Marker 移除"), []);
  console.log(markers);
  return (
    <MapView
      onPress={({ nativeEvent }) => {
        setMarkers([...markers, nativeEvent]);
      }}
    >
      {markers.map((position) => (
        <Marker
          key={`${position.latitude},${position.longitude}`}
          icon={require("../images/flag.png")}
          position={position}
          onPress={() => {
            markers.splice(markers.indexOf(position), 1);
            setMarkers([...markers]);
          }}
        />
      ))}
    </MapView>
  );
};
