import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Item, Input, Text, Button, Thumbnail } from "native-base";
import AnimatedLinearGradient, {
  presetColors
} from "react-native-animated-linear-gradient";

class ResetPasswordScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <AnimatedLinearGradient customColor={presetColors.sunrise} speed={1500}>
        <View style={styles.ResetPassView}>
          <Thumbnail
            style={styles.loginImages}
            source={require("../assets/icons/logo_min.png")}
          />
          <Item stackedLabel style={styles.loginTextItem}>
            <Input style={styles.loginTextInput} placeholder="E-Posta" />
          </Item>
          <Button
            full
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigation("Login")}
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
    backgroundColor: "#006E5F"
  },
  loginImages: { width: 100, height: 100 }
});

export default ResetPasswordScreen;