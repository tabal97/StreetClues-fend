import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Pusher from "pusher-js/react-native";
import axios from "axios";

class RoundResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRound: 0
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
    // const { targetLocations, currentRound } = this.state;
    // const targetLatitude = targetLocations[currentRound][0];
    // const targetLongitude = targetLocations[currentRound][1];
    const latitude = this.props.navigation.getParam("latitude");
    const longitude = this.props.navigation.getParam("longitude");
    const name = this.props.navigation.getParam("name");
    // console.log(this.props.navigation)
    return (
      <View>
        {/* <Text>{`Name: ${name}, Latitude: ${latitude}, Longitude: ${longitude},Target Latitude: ${targetLatitude}, Target Longitude: ${targetLongitude}`}</Text> */}
        <Button title="Next Round" onPress={() => this.handleNextRound(true)} />
      </View>
    );
  }

  componentDidMount() {
    // axios post updateRound(); this will respond with an object
    //containing an array of all the target locations and adding one to the currentRound value
    // this.setState({currentRound})
  }
  handleNextRound = initialStart => {
    // const { currentRound, targetLocations } = this.state;
    const pin = this.props.navigation.getParam("pin");
    const name = this.props.navigation.getParam("name");
    // const targetLocation = targetLocations[3];
    // console.log(targetLocation);

    if (initialStart) {
      axios
        .post("http://192.168.230.176:5000/next_round", { pin: pin })
        .then(({ data }) => {})
        .catch(console.log);
    } else {
      this.props.navigation.push("TabNavigator", {
        name,
        pin,
        targetLocation: [40.7156726, -73.7387184]
      });
    }
  };
}

export default RoundResult;
