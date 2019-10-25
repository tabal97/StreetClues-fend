import React, { Component } from "react";
import MapView, { Marker, ProviderPropType, Polyline } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

export default class MapResult extends Component {
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.map.fitToSuppliedMarkers(["guess", "target"], false);
    }, 1000);
  }

  render() {
    const { latitude, longitude, targetLatitude, targetLongitude } = this.props;
    const midLat = (latitude + parseFloat(targetLatitude)) / 2;
    const midLong = (longitude + parseFloat(targetLongitude)) / 2;
    console.log(midLat);
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.mapStyle}
          initialRegion={{
            latitude: midLat,
            longitude: midLong,
            latitudeDelta: 90,
            longitudeDelta: 90 * ASPECT_RATIO
          }}
        >
          <Polyline
            coordinates={[
              { latitude, longitude },
              {
                latitude: parseFloat(targetLatitude),
                longitude: parseFloat(targetLongitude)
              }
            ]}
          />
          <Marker identifier="guess" coordinate={{ latitude, longitude }} />
          <Marker
            identifier="target"
            coordinate={{
              latitude: parseFloat(targetLatitude),
              longitude: parseFloat(targetLongitude)
            }}
          />
        </MapView>
      </View>
    );
  }
}
Map.propTypes = {
  provider: ProviderPropType
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width,
    height
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  }
});
