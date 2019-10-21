import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

class StreetView extends Component {
  render() {
    coordinates = [-30.7229747, 25.0958533];
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  video: {
    marginTop: 20,
    maxHeight: 200,
    width: 320
  }
});

export default StreetView;
