import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Pusher from "pusher-js/react-native";

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
      <View style={styles.container}>
        <Text style={styles.header}>{`Final Scores`} </Text>
        {this.state.finalScores.map(user => {
          return (
            <Text key={user} style={styles.scoreList}>
              {user}
            </Text>
          );
        })}
        <TouchableOpacity onPress={this.handleLeaveGame}>
          <Text style={styles.leave}>Leave Game</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleLeaveGame = () => {
    this.props.navigation.navigate("Home");
  };

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
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  header: {
    fontSize: 50,
    textDecorationLine: "underline",
    fontFamily: "Raleway-SemiBold"
  },
  scoreList: {
    fontSize: 35,
    fontFamily: "Raleway-Regular"
  },
  leave: {
    fontSize: 30,
    backgroundColor: "whitesmoke",
    opacity: 0.8,
    marginBottom: 100,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    fontFamily: "Raleway-Regular"
  }
});

export default EndGameScreen;
