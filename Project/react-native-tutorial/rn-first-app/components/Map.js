import React, { Component } from "react";
import MapView, { Marker, ProviderPropType } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 180;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

export default class Map extends Component {
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    markers: []
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.mapStyle}
          initialRegion={this.state.region}
          onPress={e => {
            // console.log(this.props.navigation)
            this.onMapPress(e);
          }}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap to create a marker of random color</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  componentDidMount() {
    const name = this.props.navigation.getParam("name");
    const pin = this.props.navigation.getParam("pin");
    this.setState({ name, pin });
  }
  onMapPress(e) {
    this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          key: 1,
          color: randomColor()
        }
      ]
    });

    // console.log(this.props.navigation.state, 'hello')
    this.props.navigation.setParams({
      coordinate: e.nativeEvent.coordinate
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
