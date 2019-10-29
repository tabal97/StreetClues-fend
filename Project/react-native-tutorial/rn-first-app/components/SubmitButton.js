import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { Button } from "react-native";
import axios from "axios";
import * as util from "../utils/ScoreCalculator";

class SubmitButton extends Component {
  state = {
    submitted: false,
    disabled: true
  };

  render() {
    const { disabled } = this.state;
    return (
      <Button onPress={this.handleSubmit} title="submit" disabled={disabled} />
    );
  }
  componentDidMount() {
    window.setTimeout(this.handleTimeOut, 65000);
    window.setTimeout(this.enableButton, 5000);
  }

  enableButton = () => {
    this.setState({ disabled: false });
  };

  handleTimeOut = () => {
    const { submitted } = this.state;
    if (!submitted) {
      const targetLocation = this.props.navigation.state.routes[1].params
        .targetLocation;

      const name = this.props.navigation.getParam("name");
      const pin = this.props.navigation.getParam("pin");
      const host = this.props.navigation.getParam("host");

      const targetLatitude = targetLocation[0];
      const targetLongitude = targetLocation[1];

      axios
        .post("http://192.168.230.176:5000/update_score", {
          pin: pin,
          name: name,
          score: 0
        })
        .then(({ data }) => {
          let endRound = false;
          if (data.msg === "End of Round" || data.msg === "End of Game") {
            endRound = true;
          }
          this.props.navigation.navigate("RoundResult", {
            latitude: 0,
            longitude: 0,
            name,
            pin,
            host,
            nextLat: data.locations[0],
            nextLong: data.locations[1],
            score: 0,
            nextRound: data.nextRound,
            targetLatitude,
            targetLongitude,
            endGame: data.endGame,
            endRound: endRound
          });
        })
        .catch(console.log);
    }
  };
  handleSubmit = () => {
    console.log("ran");
    this.setState({ submitted: true });
    const targetLocation = this.props.navigation.state.routes[1].params
      .targetLocation;

    const name = this.props.navigation.getParam("name");
    const pin = this.props.navigation.getParam("pin");
    const host = this.props.navigation.getParam("host");

    const targetLatitude = targetLocation[0];
    const targetLongitude = targetLocation[1];
    let latitude = targetLatitude;
    let longitude = targetLongitude;
    let score = 0;
    if (this.props.navigation.state.routes[1].params.coordinate) {
      console.log("ran2");
      latitude = this.props.navigation.state.routes[1].params.coordinate
        .longitude;
      longitude = this.props.navigation.state.routes[1].params.coordinate
        .longitude;
      score = util.calculateScore(
        latitude,
        longitude,
        targetLatitude,
        targetLongitude
      );
    } else {
      console.log("ran4");
    }
    console.log(latitude);
    console.log(longitude);

    axios
      .post("http://192.168.230.176:5000/update_score", {
        pin: pin,
        name: name,
        score: score
      })
      .then(({ data }) => {
        let endRound = false;
        if (data.msg === "End of Round" || data.msg === "End of Game") {
          endRound = true;
        }

        this.props.navigation.navigate("RoundResult", {
          latitude,
          longitude,
          name,
          pin,
          host,
          nextLat: data.locations[0],
          nextLong: data.locations[1],
          score,
          nextRound: data.nextRound,
          targetLatitude,
          targetLongitude,
          endGame: data.endGame,
          endRound: endRound
        });
      })
      .catch(console.log);
  };
}

export default withNavigation(SubmitButton);
