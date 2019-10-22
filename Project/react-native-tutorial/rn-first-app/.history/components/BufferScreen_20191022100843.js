import React, { Component } from 'react';
import { View } from 'react-native'

class BufferScreen extends Component {
    state = {
        isVisible: true
    }
    render() {
        const { isVisible } = this.state
        return (
            isVisible && <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                justifyContent: "center",
                backgroundColor: "skyblue"
            }}>
            </View>
        );
    }
    componentDidMount() {
        window.setTimeout(this.hideScreen, 5000)
    }
    hideScreen = () => {

        this.setState({ isVisible: false })
    }
}

export default BufferScreen;