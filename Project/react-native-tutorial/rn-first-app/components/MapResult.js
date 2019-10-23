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
    },
    markers: [
      {
        color: "#136148",
        coordinate: {
          latitude: 37.962804265661276,
          longitude: -121.96355252406137
        },
        key: 2
      }
    ],
    polylines: [],
    isLoading: true
  };
  render() {
    const { markers, isLoading } = this.state;
    console.log(markers);
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.mapStyle}
          initialRegion={this.state.region}
        >
          {!isLoading && (
            <Polyline
              coordinates={[markers[0].coordinate, markers[1].coordinate]}
            />
          )}
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
      </View>
    );
  }

  componentDidMount() {
    this.setState(currState => {
      const newState = { ...currState };
      return {
        isLoading: false,
        markers: [
          ...newState.markers,
          {
            coordinate: {
              latitude: 38.81207192203812,
              longitude: -121.94116384957164
            },
            key: 1,
            color: randomColor()
          }
        ]
      };
    });
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
