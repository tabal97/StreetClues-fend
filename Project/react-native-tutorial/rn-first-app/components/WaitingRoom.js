import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class WaitingRoom extends Component {
    state = {
        users: []
    }
    render() {
        const pin = this.props.navigation.getParam('pin');
        const { users } = this.state;
        return (<View style={styles.container}>
            <Text>Waiting Room!</Text>
            <Text>{`Room Pin: ${pin}`}</Text>
            <View style={styles.playersList}>{users.map((user, i) => {
                return <Text style={styles.playersList} key={user}>{`Player ${i + 1}: ${user}`}</Text>
            })}</View>
            <Button title="Start" onPress={this.handleGameStart} />
        </View>);
    }
    componentDidMount() {
        const users = ["You", "Mo", "Will", "waiting..."]; //this would be taken from an api request
        this.setState({ users })
    }
    componentDidUpdate(prevProps, prevState) {
        const { users } = this.state;
        const usersChanged = users.length !== prevState.users.length
        if (usersChanged) {
            this.setState({ users })
        }
    }
    handleGameStart = () => {
        this.props.navigation.navigate('TabNavigator')
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    playersList: {
        fontSize: 35
    }
})

export default WaitingRoom;