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
        const { latitude, longitude } = this.props.navigation.state.routes[1].params.coordinate
        const name = this.props.navigation.getParam("name")
        const pin = this.props.navigation.getParam("pin")
        // const markers = this.props.navigation.getParam("markers")
        console.log(name, pin, latitude, longitude)
        // console.log(this.props.navigation)
        this.props.navigation.navigate("RoundResult", { latitude, longitude, name, pin });
    }
}

export default withNavigation(SubmitButton);