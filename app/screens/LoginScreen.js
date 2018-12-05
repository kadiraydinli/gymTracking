import React, { Component } from "react";
import { StyleSheet, Switch } from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Text,
  Button,
  Image,
  Thumbnail,
  View
} from "native-base";
import AnimatedLinearGradient, {
  presetColors
} from "react-native-animated-linear-gradient";
import { StackActions, NavigationActions } from "react-navigation";
import Api from "../api";

class LoginScreen extends React.Component {
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
    //try {
    if (!this.state.email) {
      Alert.alert("Dikkat", "E-posta alanı boş bırakılamaz.");
    } else if (!this.state.password) {
      Alert.alert("Dikkat", "Şifre alanı boş olamaz.");
    } else {
      let response = await this.api.post("/api/login", this.state);
      if (response) {
        await this.api.setItem("tokens", response);
      }

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
      //this.props.navigation.navigate("Home");
      alert("oldu");
      let toHome = await StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      });
      this.props.navigation.dispatch(toHome);
    }
    /*} catch (e) {
      await this.api.setItem("userSensetive", {
        email: null,
        password: null,
        remember: true
      });
    }*/
  }

  render() {
    return (
      <AnimatedLinearGradient customColor={presetColors.sunrise} speed={1500}>
        <Api ref={ref => (this.api = ref)} />
        <View style={styles.loginView}>
          <Thumbnail
            style={styles.loginImages}
            source={require("../assets/icons/logo_min.png")}
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
            <Text style={{ color: "#fff" }}>Beni Hatırla</Text>
            <Item>
              <Switch
                style={styles.switch}
                value={this.state.remember}
                trackColor={{ true: "#288c01" }}
                ios_backgroundColor="#afafaf"
                thumbColor="white"
                onValueChange={remember => this.setState({ remember })}
              />
            </Item>
          </View>
          <Button full style={styles.loginButton} onPress={() => this.login()}>
            <Text>Giriş Yap</Text>
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
  appBack: { backgroundColor: "#288c01" },
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
    backgroundColor: "#006E5F"
  },
  registerText: {
    textAlign: "center",
    color: "#187305",
    fontSize: 15,
    marginTop: 15
  },
  loginImages: { width: 100, height: 100 }
});

export default LoginScreen;
