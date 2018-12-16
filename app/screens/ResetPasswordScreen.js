import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Item, Input, Text, Button, Thumbnail } from "native-base";
import AnimatedLinearGradient, {
  presetColors
} from "react-native-animated-linear-gradient";
import Api from "../api";

export class ResetPasswordScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }

  async sifreSıfırla() {
    let durum = await this.api.post("passwordReset", {
      email: this.state.email
    });

    if (durum) {
      Alert.alert("Şifreniz e-posta adresinize gönderildi.");
    }
  }

  render() {
    return (
      <AnimatedLinearGradient customColor={presetColors.sunrise} speed={1500}>
        <StatusBar barStyle="dark-content" backgroundColor="#E6E6E6" />
        <Api ref={ref => (this.api = ref)} />
        <View style={styles.ResetPassView}>
          <Thumbnail
            style={styles.loginImages}
            source={require("../assets/icons/b_logo.fw.png")}
          />
          <Item stackedLabel style={styles.loginTextItem}>
            <Input
              style={styles.loginTextInput}
              placeholder="E-Posta"
              placeholderTextColor="#fff"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Button
            full
            style={styles.loginButton}
            onPress={() => this.sifreSıfırla()}
          >
            <Text>Şifre Gönder</Text>
          </Button>
        </View>
      </AnimatedLinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  appBack: { backgroundColor: "#288c01" },
  loginBackground: { flex: 1, justifyContent: "center", alignItems: "center" },
  loginTextItem: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  ResetPassView: { flex: 1, justifyContent: "center", alignItems: "center" },
  loginTextInput: { color: "#fff" },
  loginButton: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    backgroundColor: "#ff7600"
  },
  loginImages: { width: 250, height: 100 }
});
