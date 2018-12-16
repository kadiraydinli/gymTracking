import React, { Component } from "react";
import { Platform, StyleSheet, Image, ScrollView, Alert, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Left,
  Icon,
  Body,
  Title,
  Right,
  Input,
  Item,
  Footer,
  FooterTab,
  List,
  ListItem
} from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import Api from "../api";

export class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: null,
      password: null,
      password_confirmation: null,
      name: null,
      email: null,
      startDate: null,
      endDate: null,
      days: null
    };
  }

  async cek() {
    let user = await this.api.get("mobile/user");
    this.setState({
      name: user.name,
      email: user.email,
      startDate: user.start_date,
      endDate: user.end_date,
      days: user.days
    });
  }

  componentDidMount() {
    this.cek();
  }

  async sifreDegis() {
    let durum = await this.api.post("passwordChange", {
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    });

    if (durum) {
      Alert.alert("Şifreniz değişti.");
    }
  }

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

  async _logout() {
    try {
      await this.api.get("logout");
      await this.clear();
    } catch (error) {
      await this.clear();
    }
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#E6E6E6" />
        <Api ref={ref => (this.api = ref)} />
        <Header style={styles.themeColor}>
          <Body>
            <Title style={styles.headerText}>Profil</Title>
          </Body>
        </Header>
        <Content style={styles.contentColor}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.userText}>{this.state.name}</Text>
            <Text style={styles.userText}>{this.state.email}</Text>
            <Text style={styles.userDate}>
              Başlangıç Tarihi: {this.state.startDate}
            </Text>
            <Text style={styles.userDate}>
              Bitiş Tarihi: {this.state.endDate}
            </Text>
            <Text style={styles.userDate}>
              Üyeliğin bitmesine {this.state.days} gün kaldı!
            </Text>
            <Text style={styles.infoText}>Şifre Yenileme</Text>
            <Item stackedLabel style={styles.loginTextItem}>
                <Input
                  placeholder="Mevcut Şifre"
                  placeholderTextColor="#fff"
                  style={styles.loginTextInput}
                  secureTextEntry={true}
                  onChangeText={oldPassword => this.setState({ oldPassword })}
                />
              </Item>
            <Item stackedLabel style={styles.loginTextItem}>
                <Input
                  placeholder="Yeni Şifre"
                  placeholderTextColor="#fff"
                  style={styles.loginTextInput}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
            <Item stackedLabel style={styles.loginTextItem}>
                <Input
                  placeholder="Yeni Şifre - Tekrar"
                  placeholderTextColor="#fff"
                  style={styles.loginTextInput}
                  secureTextEntry={true}
                  onChangeText={password_confirmation =>
                    this.setState({ password_confirmation })
                  }
                />
              </Item>
            <Button
              full
              style={styles.passwordButton}
              onPress={() => this.sifreDegis()}
            >
              <Text>Kaydet</Text>
            </Button>
            <Button
              full
              style={styles.logoutButton}
              onPress={() => this._logoutAlert()}
            >
              <Text>Çıkış Yap</Text>
            </Button>
          </ScrollView>
        </Content>
        <Footer style={styles.themeColor}>
          <FooterTab style={styles.themeColor}>
            <Button onPress={() => this.props.navigation.navigate("Home")}>
              <Image
                style={styles.footerButtonfalse}
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
  themeColor: { backgroundColor: "#E6E6E6" },
  contentContainer: { paddingVertical: 20 },
  contentColor: { backgroundColor: "#fff" },
  headerText: {
    fontSize: 25,
    alignContent: "center",
    fontWeight: "bold",
    color: "#ff7600"
  },
  userText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#000",
    textAlign: "center"
  },
  loginTextInput: { color: "#fff",backgroundColor: "rgba(0,0,0,0.01)"},
  loginTextItem: {
    backgroundColor: "rgba(0,0,0,0.3)",
    marginTop:10,
    marginRight:10,
    marginLeft:10
  },
  passwordButton: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    backgroundColor: "#ff7600"
  },
  userDate: { marginTop: 10, fontSize: 13, color: "#000", textAlign: "center" },
  logoutButton: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    backgroundColor: "#a11800"
  },
  footerButton:{width:25,height:25,tintColor:'#ff7600'},
  footerButtonfalse:{width:25,height:25,tintColor:'#b5b5b5'},
  infoText:{marginLeft:10,fontSize:12}
});
