import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class JoinGame extends Component {
    state = {
        name: "",
        enteredPin: "",
        host: false
    }
    render() {
        const { name, enteredPin } = this.state;
        return (<View style={styles.container}>
            <Text style={styles.header}>Join Game</Text>
            <TextInput placeholder="Enter Name"
                style={styles.inputBox} onChangeText={this.handleNameChange} value={name} />
            <TextInput placeholder="Enter Pin"
                style={styles.inputBox} maxLength={4} keyboardType="numeric" onChangeText={this.handlePinChange} value={enteredPin} />
            <Button style={styles.button} disabled={!name || enteredPin.length !== 4} title="Join" onPress={this.handleJoinGame} />
        </View>);
    }

    componentDidMount() {
        //api request for the current pins available
        //.then(this.setState({pins}))
    }
    handleNameChange = (e) => {
        this.setState({ name: e })
    }
    handlePinChange = (e) => {
        this.setState({ enteredPin: e })
    }

    handleJoinGame = () => {
        this.props.navigation.navigate('WaitingRoom')
    }
    addPlayer = () => {
        //function for adding new player object into the array of players
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
        alignItems: 'center'
    },
    inputBox: {
        height: 50,
        width: 200,
        padding: 3,
        margin: 3,
        backgroundColor: 'whitesmoke',
        borderColor: "black",
        borderWidth: 1,
    },
    header: {
        fontSize: 50,
        paddingBottom: 100,
    },
    button: {
        height: 50,
        width: 200,
        padding: 3,
        margin: 3,
        backgroundColor: 'whitesmoke',
        borderColor: "black",
        borderWidth: 1,
    }
})

export default JoinGame;