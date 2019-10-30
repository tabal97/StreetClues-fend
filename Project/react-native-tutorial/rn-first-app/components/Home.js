import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import axios from "axios";
import { convertArea } from "geolib";

class Home extends Component {
  state = {
    pin: null
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/background-home.jpg")}
        style={styles.container}
      >
        <View style={styles.container}>
          <Image
            source={require("../assets/logo-transparent.png")}
            style={styles.img}
          />
          <TouchableOpacity onPress={this.handleCreateGame}>
            <Text style={styles.create}>Create Game</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleJoinGame}>
            <Text style={styles.join}>Join Game</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  handleCreateGame = () => {
    axios
      .get("https://streetclue1.herokuapp.com/create_game")
      .then(({ data }) => {
        this.setState({ pin: data.pin });

        this.props.navigation.navigate("CreateGame", { pin: data.pin });
      })
      .catch(console.log);
  };

  handleJoinGame = () => {
    const { pin } = this.state;
    this.props.navigation.navigate("JoinGame", { pin });
  };

  componentDidUpdate = () => {
    const name = this.props.navigation.getParam("test");
    console.log(name);
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  img: {
    width: 350,
    height: 350,
    resizeMode: "contain"
  },
  create: {
    fontSize: 30,
    backgroundColor: "whitesmoke",
    opacity: 0.7,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    fontFamily: "Raleway-Regular"
  },
  join: {
    fontSize: 30,
    backgroundColor: "whitesmoke",
    opacity: 0.8,
    marginBottom: 100,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    fontFamily: "Raleway-Regular"
  }
});

export default withNavigation(Home);
