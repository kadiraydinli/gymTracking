import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  RefreshControl,
  View,
  StatusBar
} from "react-native";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Left,
  Icon,
  Title,
  Body,
  Right,
  Separator,
  ListItem,
  CheckBox
} from "native-base";
import Api from "../api";


const d = new Date();
const days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];


export class DietListScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      diets: null,
      dietType: null,
      refreshing: false,
      loadingPage: true
    };
  }

  async control(id){
    let response = await this.api.get("mobile/diets/",id);
    this.getCredentials();
  }

  componentDidMount() {
    //sayfa açılınca yapılacak işlem
    this.getCredentials();
  }

  async getCredentials() {
    try {
      let response = await this.api.get("mobile/diets");
      if (response.length) {
        this.setState({
          diets: response,
          dietType: response[0].type,
          refreshing: false,
          loadingPage: false
        });
      } else {
        this.setState({
          diets: null,
          refreshing: false,
          loadingPage: false
        });
      }
    } catch (e) {
      this.setState({
        diets: null,
        refreshing: false,
        loadingPage: false
      });
    }
  }

  handleRefresh() {
    this.setState({ refreshing: true }, function() {
      this.getCredentials();
    });
  }

  noItemDisplay() {
    if (this.state.loadingPage) {
      return (
        <View style={styles.activityIndicator}>
          {/*<Progress.Bar
            width={scale(200)}
            color={"#3bd555"}
            indeterminate={true}
          />*/}
          <Text>Yükleniyor... </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.section}>
          <Text>Size atanmış bir diyet yok.</Text>
          <Text>Yenilemek için sayfayı aşağı doğru çekin.</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#E6E6E6" />
        <Api ref={ref => (this.api = ref)} />
        <Header style={styles.themeColor}>
          <Body>
          <Title style={styles.headerTitle}>1. Gün</Title>
          </Body>
        </Header>
        <Content style={styles.contentColor}>
          <ImageBackground
            source={require('../assets/icons/dietphoto.jpg')}
            style={styles.dayBackground}
          >
            <Text style={styles.typeText}>{this.state.dietType}</Text>
            <Text style={styles.dayText}>{days[d.getDay()]}</Text>
          </ImageBackground>
          <ScrollView contentContainerStyle={styles.contentScroll}>
            <FlatList
              ListEmptyComponent={() => this.noItemDisplay()}
              refreshControl={
                <RefreshControl
                  colors={["#3bd555"]}
                  tintColor={["#3bd555"]}
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.handleRefresh()}
                />
              }
              data={this.state.diets}
              keyExtractor={(item, index) => index.toString()} //her satıra index veriyo
              renderItem={({ item, index }) => (
                <View>
                  <ListItem style={styles.themeColor}>
                    <Left>
                      <Text style={{fontSize:20,marginLeft:10}}>
                        {item.meal} - {item.time}
                      </Text>
                    </Left>
                    <Body></Body>
                    <Right>
                    {item.control == 1 ? (
                      <CheckBox
                        checked={true}
                        color='#ff7600'
                      />
                    ) : (
                      <CheckBox
                        checked={false}
                        color='#fff'
                        style={{borderColor:'#ff7600'}}
                        onPress={()=>this.control(item.id)}
                      />
                    )}
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Text style={{justifyContent:"flex-start",marginLeft:10}}>{item.content}</Text>
                  </ListItem>
                </View>
              )}
            />
          </ScrollView>
        </Content>
        
        <Footer style={styles.themeColor}>
          <FooterTab style={styles.themeColor}>
            <Button onPress={() => this.props.navigation.navigate("Home")}>
              <Image
                style={styles.footerButtonfalse}
                source={require("../assets/icons/home.png")}
              />
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Diet")}>
              <Image
                style={styles.footerButton}
                source={require("../assets/icons/diet.png")}
              />
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Exercise")}>
              <Image
                style={styles.footerButtonfalse}
                source={require("../assets/icons/gym.png")}
              />
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Profile")}>
              <Image
                style={styles.footerButtonfalse}
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
  headerTitle: { fontSize: 25, color: '#ff7600', fontWeight: "bold",textAlign:'center' },
  contentColor: { backgroundColor: '#fff' },
  themeColor: { backgroundColor: '#E6E6E6' },
  contentScroll: { marginLeft:-20 },
  footerButton:{width:25,height:25,tintColor:'#ff7600'},
  footerButtonfalse:{width:25,height:25,tintColor:'#b5b5b5'},
  dayBackground: {
    resizeMode: "stretch",
    width: null,
    height: 150,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  dayText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 0,
    fontWeight: "bold"
  },
  typeText: {
    color: "#fff",
    fontSize: 35,
    textAlign: "center",
    marginTop: 40,
    fontWeight: "bold"
  }
});
