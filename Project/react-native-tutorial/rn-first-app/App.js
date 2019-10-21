import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import WaitingRoom from "./components/WaitingRoom";
import Map from "./components/Map";
import StreetView from "./components/StreetView"
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from "react-navigation-stack";

const TabNavigator = createBottomTabNavigator({ Map, StreetView })

const RootStack = createStackNavigator({
  Home, CreateGame, JoinGame, WaitingRoom, TabNavigator
});

const AppContainer = createAppContainer(RootStack)

class App extends Component {
  render() {
    return (<AppContainer />);
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})


export default App;