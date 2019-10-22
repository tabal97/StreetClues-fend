import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class CreateGame extends Component {
    state = {
        name: "",
        host: true
    }
    render() {
        const { name } = this.state;
        return (<View style={styles.container}>
            <Text style={styles.header}>Create Game</Text>
            <TextInput placeholder="Enter Name"
                style={styles.inputBox} onChangeText={this.handleNameChange} value={name} />
            <Button style={styles.button} disabled={!name} title="Create" onPress={this.handleCreateGame} />
        </View>);
    }
    componentDidMount() {

    }
    handleNameChange = (e) => {
        this.setState({ name: e })
    }

    handleCreateGame = () => {
        const { name } = this.state;
        this.props.navigation.setParams({ currentRound: 1 })
        this.props.navigation.navigate('WaitingRoom', { name })
    }
    addPlayer = () => {
        //function for adding new player object into the 

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

export default CreateGame;