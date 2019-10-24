import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { Button } from "react-native";
import axios from "axios";
import * as util from "../utils/ScoreCalculator"

class SubmitButton extends Component {
  state = {
    submitted: false
  }

  render() {
    return <Button onPress={this.handleSubmit} title="submit" />;
  }
  componentDidMount() {
    window.setTimeout(this.handleTimeOut, 35000)
  }

  handleTimeOut = () => {
    const { submitted } = this.state;
    if (!submitted) {
      const targetLocation = this.props.navigation.state.routes[1].params
        .targetLocation;

      const name = this.props.navigation.getParam("name");
      const pin = this.props.navigation.getParam("pin");

      const targetLatitude = targetLocation[0];
      const targetLongitude = targetLocation[1];

      axios
        .post("http://192.168.230.176:5000/update_score", {
          pin: pin,
          name: name,
          score: 0
        })
        .then(({ data }) => {
          this.props.navigation.navigate("RoundResult", {
            latitude: "Nothing",
            longitude: "Nothing",
            name,
            pin,
            nextLat: data.locations[0],
            nextLong: data.locations[1],
            score: 0,
            nextRound: data.nextRound,
            targetLatitude,
            targetLongitude
          });
        })
        .catch(console.log);
    }
  }
  handleSubmit = () => {
    this.setState({ submitted: true })
    const targetLocation = this.props.navigation.state.routes[1].params
      .targetLocation;

    const name = this.props.navigation.getParam("name");
    const pin = this.props.navigation.getParam("pin");

    const targetLatitude = targetLocation[0];
    const targetLongitude = targetLocation[1];

    const {
      latitude,
      longitude
    } = this.props.navigation.state.routes[1].params.coordinate;

    const score = util.calculateScore(latitude, longitude, targetLatitude, targetLongitude)

    axios
      .post("http://192.168.230.176:5000/update_score", {
        pin: pin,
        name: name,
        score: score
      })
      .then(({ data }) => {
        console.log(data)
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
