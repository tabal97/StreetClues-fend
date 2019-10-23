import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'

class RoundResult extends Component {
    state = {
        targetLocations: [{
            latitude: 53.25502446013081,
            longititude: 29.653468877077103
        }, {
            latitude: 53.25502446013081,
            longititude: 29.653468877077103
        }, {
            latitude: 53.25502446013081,
            longititude: 29.653468877077103
        }, {
            latitude: 53.25502446013081,
            longititude: 29.653468877077103
        }, {
            latitude: 53.25502446013081,
            longititude: 29.653468877077103
        }]
    }
    render() {
        const { targetLocations } = this.state;
        const latitude = this.props.navigation.getParam('latitude');
        const longitude = this.props.navigation.getParam('longitude');
        return (
            <View>
                <Text>{`Latitude: ${latitude}, Longitude: ${longitude}`}</Text>
                <Button title="Next Round" onPress={this.handlePress} />
            </View>
        );
    }
    componentWillUnmount() {

    }
    handlePress = () => {
        const currentRound = this.props.navigation.getParam("currentRound");
        console.log(currentRound)
    }
}

export default RoundResult;