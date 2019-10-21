import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import WaitingRoom from "./components/WaitingRoom";
import PlayGame from "./components/PlayGame";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator({
  Home, CreateGame, JoinGame, WaitingRoom, PlayGame
})
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