import React from "react";
import {
  View,
  Text,
  Alert,
  AsyncStorage,
  NetInfo,
  Dimensions,
  StyleSheet
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
const { width } = Dimensions.get("window");

export default class Api extends React.Component {
  constructor(props) {
    super(props);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);

    this.setItem = this.setItem.bind(this);
    this.getItem = this.getItem.bind(this);

    this.state = {
      isConnected: true,
      tokens: null,
      access_token: null,
      refresh_token: null
    };
  }

  async componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    await this.tokens();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  async setItem(name, data) {
    await AsyncStorage.setItem(name, JSON.stringify(data));
  }

  async getItem(name) {
    return JSON.parse(await AsyncStorage.getItem(name));
  }

  async clearItems() {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("tokens");
  }

  async tokens() {
    try {
      await AsyncStorage.getItem("tokens").then(tokens => {
        if (tokens) {
          let jsonToken = JSON.parse(tokens);

          this.setState({
            tokens: jsonToken,
            access_token: jsonToken.access_token,
            refresh_token: jsonToken.refresh_token
          });
        }
      });
    } catch (e) {}
  }

  async error(error) {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
    });

    if (!this.state.isConnected) {
      Alert.alert(
        "Dikkat",
        "Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin!"
      );
    } else if (error.message == "Kimlik doğrulanmamış!") {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("tokens");

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })],
        key: null
      });

      this.props.navigation.dispatch(resetAction);
      Alert.alert("Dikkat", "Bir şeyler yanlış gitti.");
    } else if (error.error) {
      Alert.alert("Dikkat", error.message);
    } else if (error.errors) {
      let alerts = "";
      Object.keys(error.errors).map(function(keyName, keyIndex) {
        if (alerts) {
          alerts = alerts + "\n" + String(error.errors[keyName]);
        }
        alerts = String(error.errors[keyName]);
      });
      Alert.alert(error.message, alerts);
    } else {
      Alert.alert(JSON.stringify(error));

      Alert.alert("Dikkat", "Bir şeyler yanlış gitti.");
    }
  }

  async get(url, data = "") {
    try {
      await this.tokens();

      let response = await fetch(global.url + url + data, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.state.access_token
        }
      });

      let res = await response.json();
      if (response.status >= 200 && response.status < 300) {
        return res;
      } else {
        let error = res;
        throw error;
      }
    } catch (error) {
      await this.error(error);
    }
  }

  async post(url, data) {
    try {
      await this.tokens();

      let response = await fetch(global.url + url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token
        },
        body: JSON.stringify(data)
      });

      let res = await response.json();
      if (response.status >= 200 && response.status < 300) {
        return res;
      } else {
        let error = res;
        throw error;
      }
    } catch (error) {
      await this.error(error);
    }
  }

  render() {
    if (!this.state.isConnected) {
      return (
        <View style={[styles.offlineContainer, this.props.style]}>
          <Text style={styles.offlineText}>İnternet bağlantısı yok</Text>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute",
    zIndex: 99999
  },
  offlineText: { color: "#fff" }
});
