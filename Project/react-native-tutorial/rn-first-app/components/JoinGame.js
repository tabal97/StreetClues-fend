import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ImageBackground
} from "react-native";
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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>Join Game</Text>
        <TextInput
          placeholder="Enter Nickname"
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
        <TouchableOpacity
          onPress={this.handleJoinGame}
          disabled={!name || enteredPin.length !== 4}
        >
          <Text style={styles.button}>Join</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
      .post("HTTP://192.168.230.192:5000/add_player", {
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
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "skyblue"
  },
  inputBox: {
    height: 50,
    width: 200,
    padding: 3,
    margin: 3,
    borderRadius: 20,
    backgroundColor: "whitesmoke",
    fontFamily: "Raleway-Regular"
  },
  header: {
    backgroundColor: "whitesmoke",
    padding: 10,
    marginTop: 10,
    fontSize: 50,
    opacity: 0.8,
    textDecorationLine: "underline",
    fontFamily: "Raleway-SemiBold"
  },
  button: {
    fontSize: 30,
    backgroundColor: "whitesmoke",
    opacity: 0.8,
    marginBottom: 250,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    fontFamily: "Raleway-Regular"
  }
});

export default JoinGame;
