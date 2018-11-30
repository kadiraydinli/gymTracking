import React, {Component} from 'react';
import {StyleSheet,Image,ScrollView} from 'react-native';
import {Button,Text,Container,Header, Content, Footer, FooterTab,Body} from 'native-base';


class HomeScreen extends React.Component{
    static navigationOptions = {
        header: null,
    };

    render(){
        return(
            <Container>
                    <Content padder style={styles.content}>
                        <Body style={styles.textBody}>
                            <Text style={styles.messageText}>"Ben sporcunun zeki çevik aynı zamanda ahkalı olanını severim."</Text>
                        </Body>
                    </Content>
                    <Button full success>
                            <Text>Ara</Text>
                    </Button>

                <Footer style={styles.themeColor}>
                    <FooterTab style={styles.themeColor}>
                        <Button onPress={()=>this.props.navigation.navigate("Profile")}>
                            <Image 
                                style={styles.footerButton}
                                source={require('../icons/profile.png')}
                            />
                        </Button>
                        <Button onPress={()=>this.props.navigation.navigate("Diet")} >
                            <Image 
                                style={styles.footerButton}
                                source={require('../icons/diet.png')}
                            />
                        </Button>
                        <Button onPress={()=>this.props.navigation.navigate("Activities")}>
                            <Image 
                                style={styles.footerButton}
                                source={require('../icons/gym.png')}
                            />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    content:{backgroundColor:'#C7CCCB'},
    themeColor:{backgroundColor:'#006E5F'},
    contentScroll: {paddingVertical: 10},
    messageText:{color:'black',fontSize:35,textAlign:'center'},
    textBody:{backgroundColor:'rgba(255,255,255,0.3)',marginTop:30},
    footerButton:{width:50,height:50,tintColor:'#fff'}
});

export default HomeScreen;