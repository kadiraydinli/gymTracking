import React, { Component } from "react";
import { Platform, StyleSheet, Image, ScrollView, Alert } from "react-native";
import {Button,Text,Container,Header,Content,Left,Icon,Body,Title,Right,Input,Item} from "native-base";
import {StackActions,NavigationActions} from 'react-navigation';
import Api from "../api";

class ProfileScreen extends React.Component {
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
      await this.api.get("/api/logout");
      await this.clear();
    } catch (error) {
      await this.clear();
    }
  }

  render() {
    return (
      <Container>
        <Header style={styles.themeColor}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerText}>Profil</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.contentBackground}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
          <Api ref={ref => (this.api = ref)} />
            <Text style={styles.userText}>Sado Aydınlı</Text>
            <Text style={styles.userText}>fdk@ds.sd</Text>
            <Item stackedLabel style={styles.loginTextItem}>
              <Input
                placeholder="Mevcut Şifre"
                placeholderTextColor="#fff"
                style={styles.loginTextInput}
                secureTextEntry={true}
              />
            </Item>
            <Item stackedLabel style={styles.loginTextItem}>
              <Input
                placeholder="Yeni Şifre"
                placeholderTextColor="#fff"
                style={styles.loginTextInput}
                secureTextEntry={true}
              />
            </Item>
            <Item stackedLabel style={styles.loginTextItem}>
            <Input
              placeholder="Yeni Şifre - Tekrar"
              placeholderTextColor="#fff"
              style={styles.loginTextInput}
              secureTextEntry={true}
            />
            </Item>
            <Button full style={styles.passwordButton}>
            <Text>Kaydet</Text>
            </Button>
            <Text style={styles.userDate}>Başlangıç Tarihi: 06.12.2018</Text>
            <Text style={styles.userDate}>Bitiş Tarihi: 06.06.2019</Text>
            <Button full style={styles.logoutButton} onPress={()=>this._logoutAlert()}>
            <Text>Çıkış Yap</Text>
            </Button>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  themeColor: { backgroundColor: "#006E5F" },
  contentContainer: { paddingVertical: 20 },
  contentBackground: { backgroundColor: "#C7CCCB" },
  headerText: {fontSize: 25,alignContent: "center",fontWeight: "bold",color: "#fff"},
  userText: {fontWeight:'bold',fontSize:22,color:'#fff',textAlign:'center'},
  loginTextInput: { color: "#fff" },
  loginTextItem: {marginLeft: 15,marginRight: 15,marginTop: 20,backgroundColor: "rgba(0,0,0,0.3)"},
  passwordButton: {marginLeft: 15,marginRight: 15,marginTop: 20,backgroundColor: "#006E5F"},
  userDate:{marginTop:10,fontSize:18,color:'#fff',textAlign:'center'},
  logoutButton:{marginLeft: 15,marginRight: 15,marginTop: 20,backgroundColor: "#a11800"}
});

export default ProfileScreen;
