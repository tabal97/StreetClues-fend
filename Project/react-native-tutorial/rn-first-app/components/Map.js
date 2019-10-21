import React, { Component } from "react";
import MapView, { Marker, ProviderPropType } from "react-native-maps";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}
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
    onMapPress(e) {
        console.log(this.state.markers);
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    color: randomColor()
                }
            ]
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.mapStyle}
                    initialRegion={this.state.region}
                    onPress={e => this.onMapPress(e)}
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