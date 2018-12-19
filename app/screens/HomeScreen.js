import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar
} from "react-native";
import {
  Button,
  Text,
  Container,
  Content,
  Footer,
  FooterTab,
  Body,
  Card,
  Left,
  Right,
  CardItem
} from "native-base";
import Communications from "react-native-communications";
import Api from "../api";

const words = require("../assets/json/words.json");
const number = Math.floor(Math.random() * 19);

export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    user: null
  };

  constructor(props) {
    super(props);
    this.state = {
      info: null,
      user: null,
      diet: null,
      exe: null
    };
  }

  componentDidMount() {
    this.getir();
  }

  async getir() {
    let response = await this.api.get("mobile/info");
    this.setState({
      user: JSON.stringify(response.user),
      diet: JSON.stringify(response.diet),
      exe: JSON.stringify(response.exercise)
    });
  }

  render() {
    return (
      <Container>
        <Content style={styles.contentColor}>
          <StatusBar barStyle="dark-content" backgroundColor="#E6E6E6" />
          <Api ref={ref => (this.api = ref)} />
          <Card style={styles.wordCard}>
            <Text style={styles.messageText}>{words.words[number]}</Text>
          </Card>
        </Content>
        <Card transparent style={styles.card}>
          <CardItem header style={styles.cardItem}>
            <Text style={{ textAlign: "center", color: "#ff7600" }}>
              GYM TRACKING
            </Text>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Left>
              <ImageBackground
                source={require("../assets/icons/circle2.png")}
                style={styles.cardImage}
              >
                <Text style={styles.totalDayText}>{this.state.user}</Text>
              </ImageBackground>
            </Left>
            <Body />
            <Right>
              <ImageBackground
                source={require("../assets/icons/circle2.png")}
                style={styles.cardImage}
              >
                <Text style={styles.totalDietText}>{this.state.diet}</Text>
              </ImageBackground>
            </Right>
          </CardItem>
          <CardItem footer style={styles.cardItem}>
            <Left>
              <Text style={styles.totalDayFooter}>Kalan Gün</Text>
            </Left>
            <Right>
              <Text style={styles.totalDietFooter}>Kalan Diyet Günü</Text>
            </Right>
          </CardItem>
        </Card>
        {/*<Button full success onPress={() => this.deneme()}>
          <Text>Tıkla</Text>
        </Button>*/}
        <Button
          full
          success
          onPress={() => Communications.phonecall("02847143050", true)}
        >
          <Text>BİZE ULAŞIN</Text>
        </Button>
        <Footer style={styles.themeColor}>
          <FooterTab style={styles.themeColor}>
            <Button onPress={() => this.props.navigation.navigate("Home")}>
              <Image
                style={styles.footerButton}
                source={require("../assets/icons/home.png")}
              />
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Diet")}>
              <Image
                style={styles.footerButtonfalse}
                source={require("../assets/icons/diet.png")}
              />
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Exercise")}>
              <Image
                style={styles.footerButtonfalse}
                source={require("../assets/icons/gym.png")}
              />
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Profile")}>
              <Image
                style={styles.footerButtonfalse}
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
  themeColor: { backgroundColor: "#E6E6E6" },
  contentColor: { backgroundColor: "#fff" },
  contentScroll: { paddingVertical: 10 },
  messageText: { color: "black", fontSize: 28, textAlign: "center" },
  footerButton: { width: 25, height: 25, tintColor: "#ff7600" },
  footerButtonfalse: { width: 25, height: 25, tintColor: "#b5b5b5" },
  wordCard: {
    backgroundColor: "rgba(230,230,230,0.5)",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    padding: 20
  },
  card: {
    backgroundColor: "rgba(0,0,0,0)",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  cardItem: { backgroundColor: "rgba(0,0,0,0)" },
  cardImage: { width: 150, height: 150, tintColor: "#ff7600" },
  totalDayText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 40,
    marginRight: 10,
    fontSize: 50,
    fontWeight: "bold"
  },
  totalDietText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    marginTop: 40,
    marginLeft: 50,
    fontSize: 50,
    fontWeight: "bold"
  },
  totalDayFooter: { textAlign: "center", marginLeft: 30 },
  totalDietFooter: { textAlign: "center", marginRight: 30 }
});
