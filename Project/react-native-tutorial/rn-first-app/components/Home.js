import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";

const uri = `http://192.168.230.161:5000`;

class Home extends Component {
  state = {
    pin: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Street Clue!</Text>
        <Button title="Create Game" onPress={this.handleCreateGame} />
        <Button title="Join Game" onPress={this.handleJoinGame} />
      </View>
    );
  }
  componentDidMount() {
    //API request for all the pins
    //.then(this.setState({pins}))
  }
  handleCreateGame = () => {
    //API post new game instance with randomly generated pin

    let url = uri + "/create_game";

    axios
      .get("http://192.168.230.161:5000/create_game")
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 50,
    paddingBottom: 100
  }
});

export default Home;
