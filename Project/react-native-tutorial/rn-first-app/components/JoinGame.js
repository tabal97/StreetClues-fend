import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";

class JoinGame extends Component {
  state = {
    name: "",
    enteredPin: "",
    host: false
  };
  render() {
    const { name, enteredPin } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Join Game</Text>
        <TextInput
          placeholder="Enter Name"
          style={styles.inputBox}
          onChangeText={this.handleNameChange}
          value={name}
        />
        <TextInput
          placeholder="Enter Pin"
          style={styles.inputBox}
          maxLength={4}
          keyboardType="numeric"
          onChangeText={this.handlePinChange}
          value={enteredPin}
        />
        <TouchableOpacity onPress={this.handleJoinGame} disabled={!name || enteredPin.length !== 4}><Text style={styles.button}>Join Game</Text></TouchableOpacity>

      </View>
    );
  }
  handleNameChange = e => {
    this.setState({ name: e });
  };
  handlePinChange = e => {
    this.setState({ enteredPin: e });
  };

  handleJoinGame = () => {
    axios
      .post("http://192.168.230.192:5000/add_player", {
        name: this.state.name,
        pin: this.state.enteredPin
      })
      .then(({ data }) => {
        this.props.navigation.navigate("WaitingRoom", {
          name: this.state.name,
          pin: this.state.enteredPin,
          targetLocation: data.locations,
          host: false
        });
      });
  };
  addPlayer = () => {
    //function for adding new player object into the array of players
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "space-between"
  },
  inputBox: {
    height: 50,
    width: 200,
    padding: 3,
    margin: 3,
    borderRadius: 20,
    backgroundColor: "whitesmoke"
  },
  header: {
    fontSize: 50,
    textDecorationLine: "underline"
  },
  button: {
    fontSize: 30,
    backgroundColor: "whitesmoke",
    opacity: 0.8,
    marginBottom: 250,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10
  }
});

export default JoinGame;
