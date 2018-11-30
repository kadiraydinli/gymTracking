import React, {Component} from 'react';
import {Platform, StyleSheet, Image, ScrollView} from 'react-native';
import {Button,Text,Container,Header, Content, Left, Icon, Body, Title, Right,Footer,FooterTab} from 'native-base';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
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
            <Title style={styles.headerText}>Samet Emiroğlu</Title>
        </Body>
        <Right>
          <Button transparent onPress={()=>this.props.navigation.navigate("Settings")}>
            <Icon name='cog' />
          </Button>
        </Right>
      </Header>
        <Content style={styles.contentBackground}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text>Birşeyler</Text>
        </ScrollView>
        </Content>
        <Footer>
            <FooterTab style={styles.themeColor}></FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({  
  themeColor:{backgroundColor:'#006E5F'},
  contentContainer: {paddingVertical: 20},
  contentBackground:{backgroundColor:'#C7CCCB'},
  headerText:{fontSize:25,alignContent:'center',fontWeight:'bold',color:'#fff'}
});

export default ProfileScreen;