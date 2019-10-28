import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import axios from "axios";
import { convertArea } from "geolib";

class Home extends Component {
  state = {
    pin: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.img} />
        <Button title="Create Game" onPress={this.handleCreateGame} />
        <Button title="Join Game" onPress={this.handleJoinGame} />
      </View>
    );
  }

  handleCreateGame = () => {

    axios
      .get("http://192.168.230.192:5000/create_game")
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: 350,
    height: 350,
    resizeMode: 'contain'
  }
});

export default Home;
