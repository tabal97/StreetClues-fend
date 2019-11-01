import React, { Component } from "react";
import MapView, { Marker, ProviderPropType, Polyline } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { getCenter } from "geolib";

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
  componentDidMount() {
    setTimeout(() => {
      this.map.fitToSuppliedMarkers(["guess", "target"], false);
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    const propsChanged =
      prevProps.latitude !== this.props.latitude ||
      prevProps.longitude !== this.props.longitude ||
      prevProps.targetLatitude !== this.props.targetLatitude ||
      prevProps.targetLongitude !== this.props.targetLongitude;
    if (propsChanged) {
      setTimeout(() => {
        this.map.fitToSuppliedMarkers(["guess", "target"], {
          edgePadding: { top: 1, right: 1, bottom: 1, left: 1 },
          animated: false
        });
      }, 1000);
    }
  }

  render() {
    const { latitude, longitude, targetLatitude, targetLongitude } = this.props;
    const midPoint = getCenter([
      { latitude, longitude },
      {
        latitude: parseFloat(targetLatitude),
        longitude: parseFloat(targetLongitude)
      }
    ]);
    // console.log(midPoint);
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.mapStyle}
          initialRegion={{
            latitude: midPoint.latitude,
            longitude: midPoint.longitude,
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
            image={require("../assets/marker.png")}
            style={{ width: 10, height: 10 }}
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
