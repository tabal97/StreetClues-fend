import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Home extends Component {
    state = {
        pins: []
    }
    render() {
        return (<View style={styles.container}>
            <Text style={styles.header}>Street Clue!</Text>
            <Button title="Create Game" onPress={this.handleCreateGame} />
            <Button title="Join Game" onPress={this.handleJoinGame} />
        </View>);
    }
    componentDidMount() {
        //API request for all the pins
        //.then(this.setState({pins}))
    }
    handleCreateGame = () => {
        //API post new game instance with randomly generated pin
        this.props.navigation.navigate('CreateGame')
    }
    handleJoinGame = () => {
        const { pins } = this.state;
        this.props.navigation.navigate('JoinGame', { pins })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 50,
        paddingBottom: 100,
    }
})


export default Home;
