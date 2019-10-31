import React from "react";
import CountDown from "react-native-countdown-component";
import { StyleSheet } from "react-native";
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
        style={styles.timer}
      />
    );
  }
}
const styles = StyleSheet.create({
  timer: {
    paddingLeft: 15
  }
});

export default withNavigation(Timer);
