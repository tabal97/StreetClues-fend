import React from "react";
import CountDown from "react-native-countdown-component";
import { withNavigation } from "react-navigation";

class Timer extends React.Component {
  state = {
    timeStart: false
  }
  handleFinish = () => {
    console.log(this.props, "timer");
    // this.props.navigation.navigate("RoundResult");
  };
  render() {
    return (
      <CountDown
        until={30}
        onFinish={this.handleFinish}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "#1CC625" }}
        timeToShow={["S"]}
        timeLabels={{ s: null }}
      />
    );
  }

}

export default withNavigation(Timer);
