import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import * as util from "../utils/ScoreCalculator";
import Icon from "react-native-vector-icons/Ionicons";

class SubmitButton extends Component {
  state = {
    submitted: false
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleSubmit}>
        <Icon style={styles.submit} name="ios-checkmark-circle" size={30} />
      </TouchableOpacity>
    );
  }
  componentDidMount() {
    window.setTimeout(this.handleTimeOut, 60000);
  }

  handleTimeOut = () => {
    const { submitted } = this.state;
    if (!submitted) {
      const targetLocation = this.props.navigation.state.routes[1].params
        .targetLocation;

      const name = this.props.navigation.getParam("name");
      const pin = this.props.navigation.getParam("pin");
      const host = this.props.navigation.getParam("host");
      const player_id = this.props.navigation.getParam("player_id");

      const targetLatitude = targetLocation[0];
      const targetLongitude = targetLocation[1];
      let latitude = targetLatitude;
      let longitude = targetLongitude;
      let score = 0;
      if (this.props.navigation.state.routes[1].params.coordinate) {
        latitude = this.props.navigation.state.routes[1].params.coordinate
          .latitude;
        longitude = this.props.navigation.state.routes[1].params.coordinate
          .longitude;
        score = util.calculateScore(
          latitude,
          longitude,
          targetLatitude,
          targetLongitude
        );
      }

      axios
        .post("https://streetclue1.herokuapp.com/update_score", {
          pin: pin,
          name: name,
          score,
          player_id
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
    }
  };
  handleSubmit = () => {
    this.setState({ submitted: true });
    const targetLocation = this.props.navigation.state.routes[1].params
      .targetLocation;

    const name = this.props.navigation.getParam("name");
    const pin = this.props.navigation.getParam("pin");
    const host = this.props.navigation.getParam("host");
    const player_id = this.props.navigation.getParam("player_id");

    const targetLatitude = targetLocation[0];
    const targetLongitude = targetLocation[1];
    let latitude = targetLatitude;
    let longitude = targetLongitude;
    let score = 0;
    if (this.props.navigation.state.routes[1].params.coordinate) {
      latitude = this.props.navigation.state.routes[1].params.coordinate
        .latitude;
      longitude = this.props.navigation.state.routes[1].params.coordinate
        .longitude;
      score = util.calculateScore(
        latitude,
        longitude,
        targetLatitude,
        targetLongitude
      );
    }

    axios
      .post("https://streetclue1.herokuapp.com/update_score", {
        pin: pin,
        name: name,
        score: score,
        player_id
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
          endRound: endRound,
          player_id
        });
      })
      .catch(console.log);
  };
}

const styles = StyleSheet.create({
  submit: {
    paddingRight: 15
  }
});

export default withNavigation(SubmitButton);
