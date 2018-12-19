import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
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
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Title
} from "native-base";
import Api from "../api";

export class ExerciseScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      exercises: null,
      refreshing: false,
      loadingPage: true
    };
  }

  componentDidMount() {
    //sayfa açılınca yapılacak işlem
    this.getCredentials();
  }

  async control() {
    let response = await this.api.get(
      "mobile/exercise/" +
        this.state.exercises[0].user_id +
        "/" +
        this.state.exercises[0].exercise_day
    );
  }

  async getCredentials() {
    try {
      let response = await this.api.get("mobile/exercises");
      if (response.length) {
        this.setState({
          exercises: response,
          day: response.exercise_day,
          refreshing: false,
          loadingPage: false
        });
      } else {
        this.setState({
          exercises: null,
          refreshing: false,
          loadingPage: false
        });
      }
    } catch (e) {
      this.setState({
        exercises: null,
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
          <Text style={{marginLeft:10}}>Listeleniyor... </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.section}>
          <Text style={{marginLeft:10}}>Atanan egzersiziniz yok ya da tüm egzersizler tamamlanmış.</Text>
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
              data={this.state.exercises}
              keyExtractor={(item, index) => index.toString()} //her satıra index veriyo
              renderItem={({ item, index }) => (
                <List style={styles.listBackground}>
                  <ListItem thumbnail style={styles.listItem}>
                    <Left>
                      <Thumbnail
                        square
                        source={{
                          uri: item.exercise.image_link
                        }}
                      />
                    </Left>
                    <Body>
                      <Text style={styles.listHeader}>
                        {item.exercise.exercise_name}
                      </Text>
                      <Text style={styles.listText}>
                        Set: {item.sets} - Tekrar: {item.reps}
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text
                          style={styles.listButtonText}
                          onPress={() =>
                            this.props.navigation.navigate("ExerciseDetail", {
                              exercise: item.exercise
                            })
                          }
                        >
                          İncele
                        </Text>
                      </Button>
                    </Right>
                  </ListItem>
                </List>
              )}
            />
          </ScrollView>
        </Content>
        <Button full success style={styles.successButton} onPress={()=>
            this.control()
          }>
          <Text>Tamamla</Text>
        </Button>
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
                style={styles.footerButtonfalse}
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
  headerTitle: { fontSize: 25, color: "#ff7600", fontWeight: "bold" },
  contentColor: { backgroundColor: "#fff" },
  listItem: { marginTop: 10 },
  listBackground: { backgroundColor: "#d7d6d6" },
  listButtonText: { color: "#ff7600" },
  listHeader: { color: "#000", fontWeight: "bold" },
  listText: { color: "#000f" },
  themeColor: { backgroundColor: "#E6E6E6" },
  statusButton: { marginTop: 5 },
  statusText: { color: "#fff", fontWeight: "bold" },
  contentScroll: { paddingVertical: 10 },
  successButton: {backgroundColor: "#ff7600"},
  footerButton:{width:25,height:25,tintColor:'#ff7600'},
  footerButtonfalse:{width:25,height:25,tintColor:'#b5b5b5'}
});
