import React, { Component } from "react";
import { StyleSheet, ImageBackground, View, Button, Image } from "react-native";
import { withNavigation } from "react-navigation";
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
        <View>
          <Image
            source={require("../assets/logo-transparent.png")}
            style={styles.img}
          />
          <Button title="Create Game" onPress={this.handleCreateGame} />
          <Button title="Join Game" onPress={this.handleJoinGame} />
        </View>
      </ImageBackground>
    );
  }

  handleCreateGame = () => {
    axios
      .get("http://192.168.230.176:5000/create_game")
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
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "space-between"
  },
  img: {
    width: 350,
    height: 350,
    resizeMode: "contain"
  }
});

export default withNavigation(Home);
