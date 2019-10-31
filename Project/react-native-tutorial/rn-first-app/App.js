import React, { Component } from "react";
import { BackHandler } from "react-native";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import WaitingRoom from "./components/WaitingRoom";
import Map from "./components/Map";
import StreetViewer from "./components/StreetView";
import Timer from "./components/Timer";
import RoundResult from "./components/RoundResult";
import EndGameScreen from "./components/EndGameScreen";
import SubmitButton from "./components/SubmitButton";
import GoBackToHomeButton from "./components/GoBackToHomeButton";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/Ionicons";

const TabNavigator = createBottomTabNavigator({
  StreetViewer: {
    screen: StreetViewer,
    navigationOptions: {
      tabBarIcon: () => <Icon name="ios-navigate" size={24} />
    }
  },
  Map: {
    screen: Map,
    navigationOptions: {
      tabBarIcon: () => <Icon name="ios-globe" size={24} />
    }
  }
});

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  CreateGame: {
    screen: CreateGame,
    navigationOptions: {
      headerLeft: <GoBackToHomeButton />,
      gesturesEnabled: false,
      headerTransparent: true
    }
  },
  JoinGame: {
    screen: JoinGame,
    navigationOptions: {
      headerLeft: <GoBackToHomeButton />,
      gesturesEnabled: false,
      headerTransparent: true
    }
  },
  WaitingRoom: {
    screen: WaitingRoom,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  EndGameScreen: {
    screen: EndGameScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  RoundResult: {
    screen: RoundResult,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: () => <Timer />,
      headerRight: () => <SubmitButton />,
      headerTransparent: true
    }
  }
});

const AppContainer = createAppContainer(RootStack);

class App extends Component {
  render() {
    return <AppContainer />;
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
}

export default App;
