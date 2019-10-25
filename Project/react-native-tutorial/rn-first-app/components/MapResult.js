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
  render() {
    const { latitude, longitude, targetLatitude, targetLongitude } = this.props;
    console.log(latitude, longitude, targetLatitude, targetLongitude);
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.mapStyle}
          initialRegion={this.state.region}
        >
          <Polyline
            coordinates={[
              { latitude, longitude },
              { latitude: targetLatitude, longitude: targetLongitude }
            ]}
          />
          <Marker coordinate={{ latitude, longitude }} />
          <Marker
            coordinate={{
              latitude: targetLatitude,
              longitude: targetLongitude
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
