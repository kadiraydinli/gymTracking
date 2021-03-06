import React, { Component } from "react";
import { StyleSheet, Switch, StatusBar } from "react-native";
import {
  Item,
  Input,
  Text,
  Button,
  Thumbnail,
  View
} from "native-base";
import AnimatedLinearGradient, {
  presetColors
} from "react-native-animated-linear-gradient";
import { StackActions, NavigationActions } from "react-navigation";
import Api from "../api";

export class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      remember: true
    };
  }

  async componentDidMount() {
    try {
      let userSensetive = await this.api.getItem("userSensetive");
      this.setState({
        email: userSensetive.email,
        password: userSensetive.password,
        remember: userSensetive.remember,
        passwordHidden: userSensetive.passwordHidden
      });
    } catch (e) {}
  }

  async login() {
    //Validation - Giriş
    try {
      if (!this.state.email) {
        Alert.alert("Dikkat", "E-posta alanı boş bırakılamaz.");
      } else if (!this.state.password) {
        Alert.alert("Dikkat", "Şifre alanı boş olamaz.");
      } else {
        let response = await this.api.post("login", this.state);

        if (this.state.remember) {
          await this.api.setItem("userSensetive", {
            email: this.state.email,
            password: this.state.password,
            remember: this.state.remember
          });
        } else {
          await this.api.setItem("userSensetive", {
            email: null,
            password: null,
            remember: false
          });
        }

        if (response) {
          await this.api.setItem("tokens", response);

          let toHome = await StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Home" })]
          });
          this.props.navigation.dispatch(toHome);
        }
      }
    } catch (e) {
      await this.api.setItem("userSensetive", {
        email: null,
        password: null,
        remember: true
      });
    }
  }

  render() {
    return (
      <AnimatedLinearGradient customColor={presetColors.sunrise} speed={1500}>
        <Api ref={ref => (this.api = ref)} />
        <View style={styles.loginView}>
          <Thumbnail
            square
            style={styles.loginImages}
            source={require("../assets/icons/b_logo.fw.png")}
          />
          <Item stackedLabel style={styles.loginTextItem}>
            <Input
              style={styles.loginTextInput}
              value={this.state.email}
              placeholder="Kullanıcı Adı"
              placeholderTextColor="#fff"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item stackedLabel style={styles.loginTextItem}>
            <Input
              name="pass"
              placeholder="Parola"
              placeholderTextColor="#fff"
              style={styles.loginTextInput}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <View>
            <Item>
              <Text style={{ color: "#fff" }}>Beni Hatırla</Text>
              <Switch
                style={{ marginLeft: 10 }}
                value={this.state.remember}
                trackColor={{ true: "#ff7600" }}
                ios_backgroundColor="#afafaf"
                thumbColor="white"
                onValueChange={remember => this.setState({ remember })}
              />
            </Item>
          </View>
          <Button full style={styles.loginButton} onPress={() => this.login()}>
            <Text>GİRİŞ YAP</Text>
          </Button>
          <Text
            style={styles.forgotPasswordText}
            onPress={() => this.props.navigation.navigate("ResetPassword")}
          >
            Şifremi Unuttum?
          </Text>
        </View>
      </AnimatedLinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  loginView: { flex: 1, justifyContent: "center", alignItems: "center" },
  loginTextItem: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  loginTextInput: { color: "#fff" },
  forgotPasswordText: {
    color: "#fff",
    textAlign: "right",
    marginRight: 15,
    marginTop: 20
  },
  loginButton: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    backgroundColor: "#ff7600"
  },
  loginImages: { width: 250, height: 100 }
});
