import React, { Component } from 'react';
import { View, Text } from 'react-native'

class RoundResult extends Component {
    render() {
        const latitude = this.props.navigation.getParam('latitude');
        const longitude = this.props.navigation.getParam('longitude');
        return (
            <View>
                <Text>{`Latitude: ${latitude}, Longitude: ${longitude}`}</Text>
            </View>
        );
    }
}

export default RoundResult;