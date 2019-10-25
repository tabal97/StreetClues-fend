import React, { Component } from "react";
import { StyleSheet, Button, BackHandler } from "react-native";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import WaitingRoom from "./components/WaitingRoom";
import Map from "./components/Map";
import StreetView from "./components/StreetView";
import Timer from "./components/Timer";
import RoundResult from "./components/RoundResult";
import EndGameScreen from "./components/EndGameScreen";
import SubmitButton from "./components/SubmitButton";
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
    EndGameScreen: {
      screen: EndGameScreen,
      navigationOptions: {
        headerLeft: null
      }
    },
    RoundResult: {
      screen: RoundResult,
      navigationOptions: {
        headerLeft: null
      }
    },
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        headerLeft: () => <Timer />,
        headerRight: () => <SubmitButton />
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
  state = {
    currentRound: 1
  };
  render() {
    const { currentRound } = this.state;
    const { incrRound } = this;
    return <AppContainer screenProps={{ currentRound, incrRound }} />;
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }
  incrRound = () => {
    this.setState(currState => {
      const { currentRound } = currState;
      return { currentRound: currentRound++ };
    });
  };
}

export default App;
