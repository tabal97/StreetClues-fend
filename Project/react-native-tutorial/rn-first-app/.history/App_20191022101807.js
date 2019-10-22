import React, { Component } from "react";
import { StyleSheet, Button } from "react-native";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import WaitingRoom from "./components/WaitingRoom";
import Map from "./components/Map";
import StreetView from "./components/StreetView";
import Timer from "./components/Timer";
// import RoundResult from "./components/RoundResult";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

const TabNavigator = createBottomTabNavigator({ StreetView, Map });

const RootStack = createStackNavigator(
  {
    Home,
    CreateGame,
    JoinGame,
    WaitingRoom,
    // RoundResult,
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        headerLeft: () => <Timer />,
        headerRight: () => (
          <Button
            onPress={() => alert("Submitted!")}
            title="Submit"
            color="#a65c98"
          />
        )
      }
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const AppContainer = createAppContainer(RootStack);

class App extends Component {
  render() {
    return <AppContainer />;
  }


  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

};

export default App;
