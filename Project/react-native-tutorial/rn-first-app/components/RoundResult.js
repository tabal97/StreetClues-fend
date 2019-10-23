import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'

class RoundResult extends Component {
    state = {
        targetLocations: [
            [40.7156726, -73.7387184],
            [38.2451849, -122.4805853],
            [53.25502446013081, 29.653468877077103],
            [40.6568454, -73.9277459],
            [38.5376282, -75.1013835]
        ],
        currentRound: 0
    }
    render() {
        const { targetLocations, currentRound } = this.state;
        const targetLatitude = targetLocations[currentRound][0];
        const targetLongitude = targetLocations[currentRound][1];
        const latitude = this.props.navigation.getParam('latitude');
        const longitude = this.props.navigation.getParam('longitude');
        const name = this.props.navigation.getParam('name');
        // console.log(this.props.navigation)
        return (
            <View>
                <Text>{`Name: ${name}, Latitude: ${latitude}, Longitude: ${longitude},Target Latitude: ${targetLatitude}, Target Longitude: ${targetLongitude}`}</Text>
                <Button title="Next Round" onPress={this.handlePress} />
            </View>
        );
    }

    componentDidMount() {
        // axios post updateRound(); this will respond with an object 
        //containing an array of all the target locations and adding one to the currentRound value

        // this.setState({currentRound})
    }
    handlePress = () => {
        const { currentRound, targetLocations } = this.state
        const pin = this.props.navigation.getParam("pin");
        const name = this.props.navigation.getParam("name");
        const targetLocation = targetLocations[3]
        console.log(targetLocation)
        this.props.navigation.push("TabNavigator", { name, pin, targetLocation })
    }

}

export default RoundResult;