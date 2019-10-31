import React from "react";
import CountDown from "react-native-countdown-component";
import { withNavigation } from "react-navigation";

class Timer extends React.Component {
  render() {
    return (
      <CountDown
        until={60}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "#1CC625" }}
        timeToShow={["S"]}
        timeLabels={{ s: null }}
      />
    );
  }
}

export default withNavigation(Timer);
