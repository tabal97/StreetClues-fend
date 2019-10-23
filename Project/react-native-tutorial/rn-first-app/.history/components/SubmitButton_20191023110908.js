import React, { Component } from 'react';
import { withNavigation } from "react-navigation";
import { Button } from 'react-native'

class SubmitButton extends Component {
    render() {
        return (
            <Button onPress={this.handleSubmit} title="submit" />
        );
    }

    handleSubmit = (e) => {
        // const { latitude, longitude } = (this.props.navigation.state.routes[1].params.markers[0].coordinate)
        const name = this.props.navigation.getParam("name")
        const pin = this.props.navigation.getParam("pin")
        const latitude = this.props.navigation.getParam("latitude")
        console.log(name, pin, latitude)
        this.props.navigation.navigate("RoundResult", { latitude, longitude });
    }
}

export default withNavigation(SubmitButton);