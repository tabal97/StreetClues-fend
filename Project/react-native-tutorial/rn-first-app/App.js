import React, { Component } from "react";
import { StyleSheet, Button } from "react-native";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import WaitingRoom from "./components/WaitingRoom";
import Map from "./components/Map";
import StreetView from "./components/StreetView";
import CountDown from "react-native-countdown-component";
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
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        headerLeft: () => (
          <CountDown
            until={30}
            onFinish={() => alert("Finished")}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: "#1CC625" }}
            timeToShow={["S"]}
            timeLabels={{ s: null }}
          />
        ),
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
