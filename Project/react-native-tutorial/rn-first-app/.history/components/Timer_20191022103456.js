import React from "react";
import CountDown from "react-native-countdown-component";
import { withNavigation } from "react-navigation";

class Timer extends React.Component {
  state = {
    timeStart: false
  }

  render() {
    const { timeStart } = this.state;
    return (
      timeStart && <CountDown
        until={10}
        onFinish={this.handleFinish}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "#1CC625" }}
        timeToShow={["S"]}
        timeLabels={{ s: null }}
      />
    );
  }
  componentDidMount() {
    window.setTimeout(this.startTimer, 5000)
  }
  startTimer = () => {

    this.setState({ timeStart: true })
  }
  handleFinish = () => {
    console.log(this.props, "timer");
    this.props.navigation.navigate("RoundResult");
  };
}

export default withNavigation(Timer);
