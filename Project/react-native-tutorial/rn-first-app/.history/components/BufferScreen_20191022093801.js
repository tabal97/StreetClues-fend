import React, { Component } from 'react';
import { View, Text } from 'react-native'

class BufferScreen extends Component {
    state = {
        isVisible: true
    }
    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                justifyContent: "center",
                backgroundColor: "black",
                visibility: "hidden"
            }}>
                <Text>HELLO</Text>
            </View>
        );
    }
    hideScreen = () => {
        this.setState({ isVisible: false })
    }
}

export default BufferScreen;