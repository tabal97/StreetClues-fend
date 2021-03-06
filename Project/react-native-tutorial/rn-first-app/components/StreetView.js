import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import BufferScreen from "./BufferScreen";

class StreetView extends Component {
  state = {
    coordinates: [],
    isLoading: true
  };
  render() {
    // coordinates = [-30.7229747, 25.0958533];
    const { coordinates, isLoading } = this.state;

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
        {!isLoading && (
          <WebView
            source={{
              uri: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${
                coordinates[0]
                },${coordinates[1]}`
            }}
            scalesPageToFit={true}
          />
        )}
        <BufferScreen />
      </View>
    );
  }
  componentDidMount() {
    //this needs to be redone, u cant apply props to the state
    const targetLocation = this.props.navigation.getParam("targetLocation");
    this.setState({ coordinates: targetLocation, isLoading: false });
  }

}

export default StreetView;
