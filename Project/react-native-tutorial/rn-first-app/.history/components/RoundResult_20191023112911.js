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
        currentRound: 0
    }
    render() {
        const { targetLocations } = this.state;
        const latitude = this.props.navigation.getParam('latitude');
        const longitude = this.props.navigation.getParam('longitude');
        const name = this.props.navigation.getParam('name');
        // console.log(this.props.navigation)
        return (
            <View>
                <Text>{`Name: ${name}, Latitude: ${latitude}, Longitude: ${longitude}`}</Text>
                <Button title="Next Round" onPress={this.handlePress} />
            </View>
        );
    }
    componentDidMount() {
        // axios post updateRound(); this will respond with an object 
        //containing an array of all the target locations and adding one to the currentRound value
    }
    handlePress = () => {
        const { currentRound } = this.state
        console.log(currentRound)
    }

}

export default RoundResult;