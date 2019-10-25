import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
    });
  }

  render() {
    const latitude = this.props.navigation.getParam("latitude");
    const longitude = this.props.navigation.getParam("longitude");
    const targetLatitude = this.props.navigation.getParam("targetLatitude");
    const targetLongitude = this.props.navigation.getParam("targetLongitude");
    const name = this.props.navigation.getParam("name");
    const score = this.props.navigation.getParam("score");
    const { host } = this.state;
    return (
      <View style={styles.text}>
        <MapResult
          latitude={latitude}
          longitude={longitude}
          targetLatitude={targetLatitude}
          targetLongitude={targetLongitude}
        />
        <Text>{`Name: ${name}`} </Text>
        <Text>
          {`Your Guess: Latitude: ${latitude},Longitude ${longitude}`}{" "}
        </Text>
        <Text>
          {`Actual Answer: Latitude: ${targetLatitude},Longitude ${targetLongitude}`}{" "}
        </Text>
        <Text>{`Round Score: ${score}`} </Text>
        <Text>{`Host: ${host}`} </Text>
        {host && (
          /*everyoneAnswered*/ <Button
            title="Next Round"
            onPress={() => this.handleNextRound(true)}
          />
        )}
      </View>
    );
  }
  componentDidMount() {
    const host = this.props.navigation.getParam("host");
    if (host) {
      this.setState({ host });
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
    console.log(endGame);
    if (initialStart) {
      axios
        .post("http://192.168.230.176:5000/next_round", { pin: pin })
        .then(({ data }) => {})
        .catch(console.log);
    } else {
      if (endGame) {
        this.props.navigation.push("EndGameScreen", {
          name,
          pin
        });
      } else {
        this.props.navigation.push("TabNavigator", {
          name,
          pin,
          targetLocation: [nextLat, nextLong]
        });
      }
    }
  };
}
const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    padding: 20,
    backgroundColor: "skyblue"
  }
});
export default RoundResult;
