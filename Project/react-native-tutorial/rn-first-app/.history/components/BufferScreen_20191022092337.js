import React, { Component } from 'react';
import { View, Text } from 'react-native'

class BufferScreen extends Component {
    render() {
        return (
            <View style={{
                width: "100%",
                height: "120%",
                position: "absolute",
                marginTop: "-10%",
                justifyContent: "center",
                backgroundColor: "black"
            }}>
                <Text>HELLO</Text>
            </View>
        );
    }
}

export default BufferScreen;