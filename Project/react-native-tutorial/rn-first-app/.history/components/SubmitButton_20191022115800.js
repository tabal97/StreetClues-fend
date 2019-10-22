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
        const { coordinate } = (this.props.navigation.state.routes[1].params.markers[0])
        this.props.navigation.navigate("RoundResult");
    }
}

export default withNavigation(SubmitButton);