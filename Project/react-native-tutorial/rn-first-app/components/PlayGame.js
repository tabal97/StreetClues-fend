import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StreetView from "./StreetView";
import Map from "./Map"

const TabNavigator = createBottomTabNavigator({ Map, StreetView })

const PlayGameTabNavigator = createAppContainer(TabNavigator)

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