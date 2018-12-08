import React, { Component } from "react";
import { StyleSheet, ScrollView, ImageBackground} from "react-native";
import {Button,Text,Container,Header,Content,Footer,FooterTab,Left,Icon,Title,Body,Right,Separator,ListItem } from "native-base";



class DietListScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Header style={styles.themeColor}>
          <Left>
            <Button transparent onPress={()=> this.props.navigation.navigate("Home")}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTitle}>1. Gün</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content style={styles.content}>
          <ImageBackground
            source={{uri:'https://i.nefisyemektarifleri.com/2018/01/23/cindeki-yemekler-ve-cin-yemek-tarifleri-uzerine.jpg'}}
            style={styles.dayBackground}>
            <Text style={styles.typeText}>DEFİNASYON</Text>
            <Text style={styles.dayText}>Pazartesi</Text>
          </ImageBackground>
          <ScrollView contentContainerStyle={styles.contentScroll}>
            <Separator bordered>
              <Text>1. Öğün - 08:30</Text>
            </Separator>
            <ListItem>
              <Text>Yemek</Text>
            </ListItem>
            <ListItem>
              <Text>Yemek</Text>
            </ListItem>
            <ListItem>
              <Text>Yemek</Text>
            </ListItem>
            <Separator bordered>
              <Text>1. Öğün - 08:30</Text>
            </Separator>
            <ListItem>
              <Text>Yemek</Text>
            </ListItem>
            <ListItem>
              <Text>Yemek</Text>
            </ListItem>
            <ListItem>
              <Text>Yemek</Text>
            </ListItem>
          </ScrollView>
        </Content>
        <Footer style={styles.themeColor}>
          <FooterTab style={styles.themeColor}>
            <Button>
              <Text>Tamamla</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle:{fontSize:25,color:'#fff',fontWeight:'bold'},
  content:{backgroundColor:'#C7CCCB'},
  themeColor:{backgroundColor:'#006E5F'},
  contentScroll: {paddingVertical: 10},
  footerButton:{width:50,height:50,tintColor:'#fff'},
  dayBackground:{resizeMode:'stretch',width:null,height:150,backgroundColor:'rgba(0,0,0,0.7)'},
  dayText:{color:'#fff',fontSize:14,textAlign:'center',marginTop:10,fontWeight:'bold'},
  typeText:{color:'#fff',fontSize:30,textAlign:'center',marginTop:60,fontWeight:'bold'}
});

export default DietListScreen;
