import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import BufferScreen from "./BufferScreen"

class StreetView extends Component {
  state = {
    targetLocation: { latitude: "", longitude: "" }
  }
  render() {
    coordinates = [-30.7229747, 25.0958533];
    const { latitude, longitude } = this.state.targetLocation
    return (
      <View
        style={{
          width: "100%",
          height: "120%",
          display: "flex",
          marginTop: "-10%",
          justifyContent: "center"
        }}
      >
        <WebView
          source={{
            uri: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${
              coordinates[0]
              },${coordinates[1]}`
          }}
          scalesPageToFit={true}
        />
        <BufferScreen />
      </View>
    );
  }
  componentDidMount() {
    const targetLocation = this.props.navigation.getParam("targetLocation");
    this.setState({ targetLocation })
  }
}

export default StreetView;
