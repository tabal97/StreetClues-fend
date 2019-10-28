import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Pusher from "pusher-js/react-native";
import CountDown from "react-native-countdown-component";

class EndGameScreen extends Component {
  constructor(props) {
    super(props);

    const finalScores = this.props.navigation.getParam("finalScores");
    console.log(finalScores);
    this.state = {
      currentRound: 0,
      host: null,
      finalScores: finalScores
    };

    this.pusher = new Pusher("e997856aae5ff49795fd", {
      cluster: "eu",
      forceTLS: true
    });

    const pin = this.props.navigation.getParam("pin");

    this.channel = this.pusher.subscribe(pin);
    this.channel.bind("pusher:subscription_succeeded", () => {
      this.channel.bind("endGame", data => {
        console.log("here");
      });
    });
  }

  render() {
    const name = this.props.navigation.getParam("name");
    return (
      <View style={styles.text}>
        <Text>{`LeaderBoard`} </Text>
        {this.state.finalScores.map(user => {
          return <Text key={user}>{user}</Text>;
        })}
        <Button title="Leave Game" onPress={this.handleLeaveGame} />
      </View>
    );
  }

  handleLeaveGame = () => {
    this.props.navigation.push("Home")
  }

  handleFinalResults = scores => {
    let playerScoresArray = [];
    for (let player in scores) {
      playerScoresArray.push([player, scores[player]]);
    }

    playerScoresArray = playerScoresArray.sort((a, b) => {
      return b[1] - a[1];
    });

    playerScoresArray = playerScoresArray.map(x => {
      let y = [];
      y[0] = x[0] + ": " + x[1];

      return y;
    });

    this.setState({ finalScores: playerScoresArray });
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    padding: 20,
    backgroundColor: "skyblue"
  }
});

export default EndGameScreen;
