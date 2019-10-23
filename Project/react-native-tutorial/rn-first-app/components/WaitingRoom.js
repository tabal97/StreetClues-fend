import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Pusher from "pusher-js/react-native";
import axios from "axios";

//get a request for all the already joined users
class WaitingRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.pusher = new Pusher("e997856aae5ff49795fd", {
      cluster: "eu",
      forceTLS: true
    });

    const pin = this.props.navigation.getParam("pin");
    this.channel = this.pusher.subscribe(pin);
    this.channel.bind("pusher:subscription_succeeded", () => {
      this.channel.bind("playerJoin", data => {
        console.log(data.name);
        console.log(data.message);
        // this.handleMessage(data.name, data.message);
        this.handlePlayerJoin(data.name);
      });
      this.channel.bind("startGame", data => {
        this.handleGameStart();
      });
    });
  }

  handlePlayerJoin = name => {
    this.setState(prevState => {
      copiedStateUsers = prevState.users.map(user => user);
      copiedStateUsers.push(name);
      return { users: copiedStateUsers };
    });
  };

  state = {
    users: []
  };
  render() {
    console.log("rendered");
    const pin = this.props.navigation.getParam("pin");
    // console.log(this.props.navigation);
    const { users } = this.state;
    return (
      <View style={styles.container}>
        <Text>Waiting Room!</Text>
        <Text>{`Room Pin: ${pin}`}</Text>
        <View style={styles.playersList}>
          {users.map((user, i) => {
            return (
              <Text style={styles.playersList} key={user}>{`Player ${i +
                1}: ${user}`}</Text>
            );
          })}
        </View>
        <Button title="Start" onPress={() => this.handleGameStart(true)} />
      </View>
    );
  }
  componentDidMount() {
    console.log("mounted");
    const pin = this.props.navigation.getParam("pin");
    axios
      .post("http://192.168.230.176:5000/get_players", { pin: pin })
      .then(({ data }) => {
        this.setState({ users: data.players });
      })
      .catch(console.log);
  }
  componentDidUpdate(prevProps, prevState) {
    const { users } = this.state;
    const usersChanged = users.length !== prevState.users.length;
    if (usersChanged) {
      this.setState({ users });
    }
  }
  handleGameStart = initialStart => {
    const pin = this.props.navigation.getParam("pin");
const name = this.props.navigation.getParam("name");
const targetLocation = this.props.navigation.getParam("targetLocation")
    if (initialStart) {
      axios
        .post("http://192.168.230.176:5000/start_game", { pin: pin })
        .then(({ data }) => {})
        .catch(console.log);
    } else {
       this.props.navigation.navigate("TabNavigator", { name, pin, targetLocation });
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  playersList: {
    fontSize: 35
  }
});

export default WaitingRoom;
