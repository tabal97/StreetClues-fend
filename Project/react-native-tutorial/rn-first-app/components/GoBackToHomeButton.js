import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import axios from "axios";
class GoBackToHomeButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    );
  }

  handlePress = () => {
    const pin = this.props.navigation.getParam("pin");
    axios
      .post("https://streetclue1.herokuapp.com/delete_game", {
        pin: pin
      })
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch(this.props.navigation.navigate("Home"));
  };
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    backgroundColor: "whitesmoke",
    opacity: 0.8,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    marginLeft: 10
  }
});

export default withNavigation(GoBackToHomeButton);
