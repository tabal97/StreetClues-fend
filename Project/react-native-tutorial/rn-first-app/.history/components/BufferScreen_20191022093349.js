import React, { Component } from 'react';
import { View, Text } from 'react-native'

class BufferScreen extends Component {
    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                justifyContent: "center",
                backgroundColor: "black",
                hidden: "hidden"
            }}>
                <Text>HELLO</Text>
            </View>
        );
    }
}

export default BufferScreen;