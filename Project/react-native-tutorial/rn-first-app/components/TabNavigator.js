import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StreetView from "./StreetView";
import Map from "./Map";

class PlayGame extends Component {
    render() {
        return (
            <View>
                <PlayGameTabNavigator />
            </View>
        );
    }
}

export default PlayGame;