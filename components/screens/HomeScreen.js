import React, {Component} from 'react';
import {AppState,StyleSheet,Image,ScrollView} from 'react-native';
import {Button,Text,Container,Header, Content, Footer, FooterTab,Body, View} from 'native-base';
import Communications from 'react-native-communications';
import PushNotification from 'react-native-push-notification';
import PushController from '../screens/PushController';



class HomeScreen extends React.Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {};
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
    };

    componentDidMount(){
        AppState.addEventListener('change',this.handleAppStateChange);
    };

    componentWillUnmount(){
        AppState.removeEventListener('change',this.handleAppStateChange);
    };

    handleAppStateChange(appState){
        if(appState === 'background'){
            PushNotification.localNotificationSchedule({
                message: 'Oldu laaan sonunda!',
                date: new Date(Date.now())
            });
        }
    };

    sendNotification(){
        PushNotification.localNotification({
            message: 'Butona bastın!'
        });
    };

    render(){
        return(
            <Container>
                <Content padder style={styles.content}>
                    <Body style={styles.textBody}>
                        <Text style={styles.messageText}>"Ben sporcunun zeki çevik aynı zamanda ahkalı olanını severim."</Text>
                    </Body>
                    <Button success onPress={this.sendNotification}>
                        <Text>Bildirim Gönder</Text>
                    </Button>
                    <PushController/>
                </Content>
                <Button full success onPress={()=>Communications.phonecall('05379952309',true)}>
                    <Text>Ara</Text>
                </Button>
                <Footer style={styles.themeColor}>
                    <FooterTab style={styles.themeColor}>
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
                        <Button onPress={()=>this.props.navigation.navigate("Settings")}>
                            <Image 
                                style={styles.footerButton}
                                source={require('../icons/settings.png')}
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
    textBody:{backgroundColor:'rgba(255,255,255,0.3)',marginTop:30},
    footerButton:{width:50,height:50,tintColor:'#fff'}
});

export default HomeScreen;