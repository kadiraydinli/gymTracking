import React, {Component} from 'react';
import {StyleSheet,ImageBackground} from 'react-native';
import {Container,Content,Item,Input,Text, Button,Image,Thumbnail, View} from 'native-base';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';

class LoginScreen extends React.Component{
    static navigationOptions = {
        header: null,
    };

    render(){
        return(
            <AnimatedLinearGradient 
            customColor={presetColors.sunrise} 
            speed={1000}>
            <View style={styles.loginView}>
            <Thumbnail 
            style={styles.loginImages}
            source={require('../icons/logo_min.png')} />
            <Item stackedLabel style={styles.loginTextItem}>
                <Input style={styles.loginTextInput} placeholder='Kullanıcı Adı' placeholderTextColor='#fff'/>
            </Item>
            <Item stackedLabel style={styles.loginTextItem}>
                <Input placeholder='Parola'
                    placeholderTextColor='#fff'
                    style={styles.loginTextInput}
                    secureTextEntry={true}
                />
            </Item>
            <Button full  style={styles.loginButton}
                onPress={()=> this.props.navigation.navigate("Home")}>
                    <Text>Giriş Yap</Text>
            </Button>
            <Text style={styles.forgotPasswordText}
                onPress={()=>this.props.navigation.navigate("ResetPassword")}>Şifremi Unuttum?</Text>
            </View>
        </AnimatedLinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    appBack:{backgroundColor:'#288c01'},
    loginView:{flex:1,justifyContent:'center',alignItems: 'center'},
    loginTextItem:{marginLeft:15,marginRight:15,marginTop:20,backgroundColor:'rgba(0,0,0,0.3)'},
    loginTextInput:{color:'#fff'},
    forgotPasswordText:{color:'#fff',textAlign:'right',marginRight:15,marginTop:20},
    loginButton:{marginLeft:15,marginRight:15,marginTop:20,backgroundColor:'#006E5F'},
    registerText:{textAlign:'center',color:'#187305',fontSize:15,marginTop:15},
    loginImages:{width:100,height:100}
});

export default LoginScreen;