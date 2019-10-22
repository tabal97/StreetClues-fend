import React, { Component } from 'react';
import { View, Text } from 'react-native'

class RoundResult extends Component {
    render() {
        const coordinate = this.props.navigation.getParam('coordinate');
        return (
            <View>
                <Text>ROUND RESULTS!!</Text>
            </View>
        );
    }
}

export default RoundResult;