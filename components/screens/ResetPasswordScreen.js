import React, {Component} from 'react';
import {StyleSheet,ImageBackground} from 'react-native';
import {Item,Input,Text, Button,Thumbnail} from 'native-base';

class ResetPasswordScreen extends React.Component{
    static navigationOptions = {
        header: null,
    };

    render(){
        return(
            <ImageBackground 
                    source={require('../images/loginbackground.jpg')}
                    style={styles.loginBackground}
            >
            <Thumbnail 
            style={styles.loginImages}
            source={require('../icons/logo_min.png')} />
            <Item stackedLabel style={styles.loginTextItem}>
                <Input style={styles.loginTextInput} placeholder='E-Posta'/>
            </Item>
            <Button full  style={styles.loginButton}
                onPress={()=> this.props.navigation.navigate("Home")}>
                    <Text>Şifre Gönder</Text>
            </Button>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    appBack:{backgroundColor:'#288c01'},
    loginBackground:{flex:1,justifyContent:'center',alignItems: 'center'},
    loginTextItem:{marginLeft:15,marginRight:15,marginTop:20,backgroundColor:'rgba(0,0,0,0.6)'},
    loginTextInput:{color:'#fff'},
    loginButton:{marginLeft:15,marginRight:15,marginTop:20,backgroundColor:'#006E5F'},
    loginImages:{width:100,height:100}
});

export default ResetPasswordScreen;