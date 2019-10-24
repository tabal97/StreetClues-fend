import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { Button } from "react-native";
import axios from "axios";
import * as util from "../utils/ScoreCalculator"

class SubmitButton extends Component {
  render() {
    return <Button onPress={this.handleSubmit} title="submit" />;
  }

  handleSubmit = e => {
    const {
      latitude,
      longitude
    } = this.props.navigation.state.routes[1].params.coordinate;

    const targetLocation = this.props.navigation.state.routes[1].params
      .targetLocation;

    const name = this.props.navigation.getParam("name");
    const pin = this.props.navigation.getParam("pin");

    const targetLatitude = targetLocation[0];
    const targetLongitude = targetLocation[1];

    let score = 50;
    //TODO hook this up to the calculation

    console.log(name, pin, latitude, longitude);

    axios
      .post("http://192.168.230.176:5000/update_score", {
        pin: pin,
        name: name,
        score: score
      })
      .then(({ data }) => {
        // let message = "Waiting for other answers...";
        // if (data.msg === "End of Round") message = "End of Round";
        this.props.navigation.navigate("RoundResult", {
          latitude,
          longitude,
          name,
          pin,
          nextLat: data.locations[0],
          nextLong: data.locations[1],
          score,
          nextRound: data.nextRound,
          targetLatitude,
          targetLongitude
        });
      })
      .catch(console.log);
  };
}

export default withNavigation(SubmitButton);
