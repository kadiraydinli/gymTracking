import React, { Component } from "react";
import { StyleSheet, Image, Alert, ImageBackground } from "react-native";
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
        <Content>
          <Api ref={ref => (this.api = ref)} />
          <ImageBackground 
            source={require('../assets/icons/truesunset.png')}
            style={{width:null,height:null}}>
            <Card transparent style={styles.wordCard}>
              <Text style={styles.messageText}>{words.words[number]}</Text>
            </Card>
            <Card transparent style={styles.card}>
              <CardItem header style={styles.cardItem}>
                <Text style={{textAlign:'center'}}>GYM TRACKING</Text>
              </CardItem>
              <CardItem style={styles.cardItem}>
                <Left>
                  <ImageBackground
                    source={require('../assets/icons/circle.png')}
                    style={styles.cardImage}>
                    <Text style={styles.totalDayText}>55</Text>
                  </ImageBackground>
                </Left>
                <Body></Body>
                <Right>
                  <ImageBackground
                    source={require('../assets/icons/circle.png')}
                    style={styles.cardImage}>
                    <Text style={styles.totalExerciseText}>44</Text>
                  </ImageBackground>
                </Right>
              </CardItem>
              <CardItem footer style={styles.cardItem}>
                <Left><Text style={styles.totalDayFooter}>Üyelik Sayacı</Text></Left>
                <Right><Text style={styles.totalExerciseFooter}>Aktivite Sayacı</Text></Right>
              </CardItem>
            </Card>
          </ImageBackground>
        </Content>
        {/*<Button full success onPress={() => this.deneme()}>
          <Text>Tıkla</Text>
        </Button>*/}
        <Button full success onPress={() => Communications.phonecall("05379952309", true)}>
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
  content:{},
    themeColor:{backgroundColor:'#006E5F'},
    contentScroll: {paddingVertical: 10},
    messageText:{color:'black',fontSize:35,textAlign:'center'},
    footerButton:{width:50,height:50,tintColor:'#fff'},
    wordCard:{backgroundColor:'rgba(0,0,0,0)',marginTop:30,marginLeft:10,marginRight:10,padding:20},
    card:{backgroundColor:'rgba(0,0,0,0)',marginTop:20,marginLeft:10,marginRight:10},
    cardItem:{backgroundColor:'rgba(0,0,0,0)'},
    cardImage:{width:150,height:150},
    totalDayText:{justifyContent: 'center',alignItems: 'center' ,marginTop:40,marginRight:10,fontSize:50,fontWeight:'bold'},
    totalExerciseText:{justifyContent: 'center',alignItems: 'center',marginTop:40,marginLeft:50,fontSize:50,fontWeight:'bold'},
    totalDayFooter:{textAlign:'center',marginLeft:25},
    totalExerciseFooter:{textAlign:'center',marginRight:25}
});
