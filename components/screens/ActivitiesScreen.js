import React, {Component} from 'react';
import {StyleSheet,Image,ScrollView} from 'react-native';
import {Button,Text,Container,Header, Content, Footer, FooterTab, List, ListItem, Left, Thumbnail, Body, Right, Icon, Title} from 'native-base';

class ActivitiesScreen extends React.Component{
    static navigationOptions = {
        header: null,
    };

    render(){
        return(
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
                        <ScrollView contentContainerStyle={styles.contentScroll}>
                        <List style={styles.listBackground}>
                            <ListItem thumbnail style={styles.listItem}>
                                <Left>
                                    <Thumbnail square source={{uri: 'https://im.hthayat.com/2017/03/02/ver1523873494/1047159_d58fa4ab8966c79cbfbd584d45a7570c.jpg'}}/>
                                </Left>
                                <Body>
                                    <Text style={styles.listHeader}>Hareket</Text>
                                    <Text style={styles.listText}>Hareket detayı</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Text style={styles.listButtonText}>İncele</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        </List>
                        </ScrollView>
                    </Content>
                <Footer style={styles.themeColor}>
                    <FooterTab style={styles.themeColor}>
                        <Button>
                            <Image 
                                style={styles.footerButton}
                                source={require('../icons/backButton.png')}
                            />
                        </Button>
                        <Button bordered success style={styles.statusButton}>
                            <Text style={styles.statusText}>Tamamlandı</Text>
                        </Button>
                        <Button>
                            <Image
                                style={styles.footerButton}
                                source={require('../icons/nextButton.png')}
                            />
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
    listItem:{marginTop:10},
    listBackground:{backgroundColor:'#30A898'},
    listButtonText:{color:'#fff'},
    listHeader:{color:'#fff',fontWeight:'bold'},
    listText:{color:'#fff'},
    themeColor:{backgroundColor:'#006E5F'},
    statusButton:{marginTop:5},
    statusText:{color:'#fff',fontWeight:'bold'},
    contentScroll: {paddingVertical: 10},
    footerButton:{width:50,height:50,tintColor:'#fff'}
});

export default ActivitiesScreen;