import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { Button } from "react-native";
import axios from "axios";
class GoBackToHomeButton extends Component {
  state = {};

  render() {
    return <Button onPress={this.handlePress} title="< Back" />;
  }

  handlePress = () => {
    const pin = this.props.navigation.getParam("pin");
    axios
      .post("HTTP://192.168.230.192:5000/delete_game", {
        pin: pin
      })
      .then(() => {
        console.log("this works");
        this.props.navigation.navigate("Home");
      });
  };
}

export default withNavigation(GoBackToHomeButton);
