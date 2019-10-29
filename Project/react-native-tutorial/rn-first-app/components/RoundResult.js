import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Pusher from "pusher-js/react-native";
import axios from "axios";
import CountDown from "react-native-countdown-component";
import MapResult from "./MapResult.js";

class RoundResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRound: 0,
      host: null
    };

    this.pusher = new Pusher("e997856aae5ff49795fd", {
      cluster: "eu",
      forceTLS: true
    });

    const pin = this.props.navigation.getParam("pin");
    this.channel = this.pusher.subscribe(pin);
    this.channel.bind("pusher:subscription_succeeded", () => {
      this.channel.bind("nextRound", data => {
        this.handleNextRound();
      });
      this.channel.bind("endRound", data => {
        this.setState({ everyoneAnswered: true });
      });
      this.channel.bind("endGame", data => {
        this.handleFinalResults(data.message);
      });
    });
  }

  render() {
    const latitude = this.props.navigation.getParam("latitude");
    const longitude = this.props.navigation.getParam("longitude");
    const targetLatitude = this.props.navigation.getParam("targetLatitude");
    const targetLongitude = this.props.navigation.getParam("targetLongitude");
    const nextRound = this.props.navigation.getParam("nextRound");
    const score = this.props.navigation.getParam("score");
    const { host, everyoneAnswered } = this.state;
    return (
      <View style={styles.container}>
        <MapResult
          latitude={latitude}
          longitude={longitude}
          targetLatitude={targetLatitude}
          targetLongitude={targetLongitude}
        />
        <Text style={styles.text}>{`End of Round ${nextRound}`} </Text>
        <Text style={styles.text}>{`Score: ${score}`} </Text>
        {host && everyoneAnswered && (
          <TouchableOpacity
            title="Next Round"
            onPress={() => this.handleNextRound(true)}
          >
            <Text style={styles.button}>Next Round</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  componentDidMount() {
    const host = this.props.navigation.getParam("host");
    const everyoneAnswered = this.props.navigation.getParam("endRound");
    console.log(host);
    console.log(everyoneAnswered);
    if (host) {
      this.setState({ host });
      this.setState({ everyoneAnswered });
    }
  }

  handleNextRound = initialStart => {
    // const { currentRound, targetLocations } = this.state;
    const pin = this.props.navigation.getParam("pin");
    const name = this.props.navigation.getParam("name");
    // const targetLocation = targetLocations[3];
    const nextLat = this.props.navigation.getParam("nextLat");
    const nextLong = this.props.navigation.getParam("nextLong");
    const endGame = this.props.navigation.getParam("endGame");

    this.setState({ everyoneAnswered: false });
    finalScores = this.state.finalScores;
    // console.log(finalScores);

    if (initialStart) {
      axios
        .post("http://192.168.230.192:5000/next_round", { pin: pin })
        .then(({ data }) => { })
        .catch(console.log);
    } else if (endGame) {
      this.props.navigation.push("EndGameScreen", {
        name,
        pin,
        finalScores
      });
    } else {
      this.props.navigation.push("TabNavigator", {
        name,
        pin,
        targetLocation: [nextLat, nextLong]
      });
    }
  };

  handleFinalResults = scores => {
    let playerScoresArray = [];
    for (let player in scores) {
      playerScoresArray.push([player, scores[player]]);
    }
    // console.log(playerScoresArray);

    playerScoresArray = playerScoresArray.sort((a, b) => {
      return b[1] - a[1];
    });

    playerScoresArray = playerScoresArray.map(x => {
      let y = "";
      y = x[0] + ": " + x[1];

      return y;
    });

    this.setState({ finalScores: playerScoresArray });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 40,
    padding: 5,
    backgroundColor: "skyblue",
    opacity: 0.6
  },
  button: {
    fontSize: 30,
    marginTop: 20,
    paddingBottom: 20
  }
});
export default RoundResult;
