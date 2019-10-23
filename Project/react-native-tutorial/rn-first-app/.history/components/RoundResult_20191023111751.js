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
        }],
        currentRound: null
    }
    render() {
        const { targetLocations } = this.state;
        const latitude = this.props.navigation.getParam('latitude');
        const longitude = this.props.navigation.getParam('longitude');
        const name = this.props.navigation.getParam('name');
        // console.log(this.props.navigation)
        return (
            <View>
                <Text>{`Name: ${name}Latitude: ${latitude}, Longitude: ${longitude}`}</Text>
                <Button title="Next Round" onPress={this.handlePress} />
            </View>
        );
    }
    componentDidMount() {
        this.getParams().then(currentRound => console.log(currentRound, "CURRENT ROUND"))
    }
    componentWillUnmount() {

    }
    handlePress = () => {
        const { currentRound } = this.state
        console.log(currentRound)
    }

    getParams = async () => {
        const currentRound = await this.props.navigation.getParam("currentRound");
        return currentRound
    }
}

export default RoundResult;