import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class StreetView extends Component {
    static navigationOptions = {
        headerTitle: () => "StreetView",
        headerRight: () => (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
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