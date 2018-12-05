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

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  async _logoutAlert() {
    try {
      Alert.alert(
        "Oturumu Kapat",
        "Oturumu kapatmak istediğinden emin misin?",
        [
          {
            text: "İptal",
            style: "cancel"
          },
          {
            text: "Oturumu Kapat",
            onPress: () => this._logout()
          }
        ]
      );
    } catch (e) {}
  }

  async _logout() {
    try {
      await this.api.get("/api/logout");
      await this.clear();
    } catch (error) {
      await this.clear();
    }
  }

  async clear() {
    try {
      await this.api.clearItems();
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })],
        key: null
      });
      this.props.navigation.dispatch(resetAction);
    } catch (e) {}
  }

  render() {
    return (
      <Container>
        <Content padder style={styles.content}>
          <Api ref={ref => (this.api = ref)} />
          <Body style={styles.textBody}>
            <Text style={styles.messageText}>
              "Ben sporcunun zeki çevik aynı zamanda ahkalı olanını severim."
            </Text>
          </Body>
        </Content>
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

export default HomeScreen;
