import React, {Component} from 'react';
import {Platform, StyleSheet, Image, ScrollView} from 'react-native';
import {Button,Text,Container,Header, Content, Left, Icon, Body, Title, Right, ListItem, Switch, Footer, FooterTab} from 'native-base';

class SettingsScreen extends React.Component {
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
            <Title style={styles.headerText}>Ayarlar</Title>
        </Body>
        <Right></Right>
      </Header>
        <Content style={styles.contentBackground}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon active name="plane" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Uçak Modu</Text>
                    </Body>
                    <Right>
                        <Switch value={false} />
                    </Right>
                </ListItem>        
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

export default SettingsScreen;