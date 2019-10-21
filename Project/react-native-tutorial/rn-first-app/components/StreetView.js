import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class StreetView extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View>
                <Text>StreetView</Text>
            </View>
        );
    }
}

export default StreetView;