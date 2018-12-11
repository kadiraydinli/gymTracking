import React, { Component } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import {
  Button,
  Text,
  Container,
  Content,
  Footer,
  FooterTab,
  Body,
  View
} from "native-base";
import Communications from "react-native-communications";
import Api from "../api";

const words = require("../assets/json/words.json");
const number = Math.floor(Math.random() * 4);

export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    user: null
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  async deneme() {
    this.setState({
      user: await this.api.get("mobile/user")
    });
    Alert.alert(this.state.user.name);
  }

  render() {
    return (
      <Container>
        <Content padder style={styles.content}>
          <Api ref={ref => (this.api = ref)} />
          <Body style={styles.textBody}>
            <Text style={styles.messageText}>{words.words[number]}</Text>
          </Body>
        </Content>
        {/*<Button full success onPress={() => this.deneme()}>
          <Text>Tıkla</Text>
        </Button>*/}
        <Button
          full
          success
          onPress={() => Communications.phonecall("05379952309", true)}
        >
          <Text>Ara</Text>
        </Button>
        <Footer style={styles.themeColor}>
          <FooterTab style={styles.themeColor}>
            <Button onPress={() => this.props.navigation.navigate("Diet")}>
              <Image
                style={styles.footerButton}
                source={require("../assets/icons/diet.png")}
              />
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Exercise")}>
              <Image
                style={styles.footerButton}
                source={require("../assets/icons/gym.png")}
              />
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Profile")}>
              <Image
                style={styles.footerButton}
                source={require("../assets/icons/profile.png")}
              />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {},
  themeColor: { backgroundColor: "#006E5F" },
  contentScroll: { paddingVertical: 10 },
  messageText: { color: "black", fontSize: 35, textAlign: "center" },
  textBody: { backgroundColor: "rgba(255,255,255,0.3)", marginTop: 30 },
  footerButton: { width: 50, height: 50, tintColor: "#fff" }
});
