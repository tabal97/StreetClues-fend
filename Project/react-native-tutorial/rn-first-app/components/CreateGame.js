import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import { withNavigation } from "react-navigation";

class CreateGame extends Component {
  state = {
    name: "",
    host: true,
    currentRound: 1
  };
  render() {
    const { name } = this.state;
    return (
      <ImageBackground
        source={require("../assets/background-home-blur.jpg")}
        style={styles.container}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.header}>Create Game</Text>
          <TextInput
            placeholder="Enter Nickname"
            style={styles.inputBox}
            onChangeText={this.handleNameChange}
            value={name}
          />
          <TouchableOpacity onPress={this.handleCreateGame} disabled={!name}>
            <Text style={styles.button}>Create</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  handleNameChange = e => {
    this.setState({ name: e });
  };

  handleCreateGame = () => {
    const { name, host } = this.state;
    const pin = this.props.navigation.getParam("pin");
    // this.props.navigation.setParams({ params: { currentRound: 1 }, key: "currentRound" });
    axios
      .post("https://streetclue1.herokuapp.com/add_player", { name, pin })
      .then(({ data }) => {
        this.props.navigation.navigate("WaitingRoom", {
          name,
          pin,
          player_id: data.player_id,
          targetLocation: data.locations,
          host
        });
      });

    //axios request to add the host goes here
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
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
    marginTop: 70,
    fontSize: 50,
    opacity: 0.8,
    fontFamily: "Raleway-SemiBold",
    borderRadius: 10,
    overflow: "hidden"
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

export default withNavigation(CreateGame);
