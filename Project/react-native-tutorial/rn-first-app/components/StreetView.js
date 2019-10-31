import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import StreetView from "react-native-streetview";

class StreetViewer extends Component {
  render() {
    // coordinates = [-30.7229747, 25.0958533];
    const targetLocation = this.props.navigation.getParam("targetLocation");

    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <StreetView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          allGesturesEnabled={true}
          coordinate={{
            latitude: targetLocation[0],
            longitude: targetLocation[1]
          }}
          pov={{
            tilt: parseFloat(0),
            bearing: parseFloat(0),
            zoom: parseInt(1)
          }}
        />
      </View>
    );
  }
}

export default StreetViewer;
