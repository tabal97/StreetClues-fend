import React, { Component } from 'react';
import { View } from 'react-native'
import CountDown, { Countdown } from "react-native-countdown-component"

class BufferScreen extends Component {
    state = {
        isVisible: true
    }
    render() {
        const { isVisible } = this.state
        return (
            isVisible && <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                justifyContent: "center",
                backgroundColor: "skyblue"
            }}><CountDown
                    until={5}
                    digitStyle={{ backgroundColor: "blue" }}
                    digitTxtStyle={{ color: "#1CC625" }}
                    timeToShow={["S"]}
                    timeLabels={{ s: null }}
                    size={100}
                />
            </View>
        );
    }
    componentDidMount() {
        window.setTimeout(this.hideScreen, 5000)
    }
    hideScreen = () => {

        this.setState({ isVisible: false })
    }
}

export default BufferScreen;