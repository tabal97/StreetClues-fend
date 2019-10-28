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
        until={60}
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
  componentDidUpdate() {
    const resumeTimerProp = this.props.navigation.getParam("resumeTimer")

    if (resumeTimerProp) {
      console.log("submitted...")
    }
  }
  startTimer = () => {
    this.setState({ timeStart: true })
  }
}

export default withNavigation(Timer);
