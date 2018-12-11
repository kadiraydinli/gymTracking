import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  View
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
  Icon,
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
      loadingPage: true,
      gun: 1
    };
  }

  componentDidMount() {
    //sayfa açılınca yapılacak işlem
    this.getCredentials();
  }

  async getCredentials() {
    try {
      let response = await this.api.get("mobile/exercises/" + this.state.gun);
      if (response.length) {
        this.setState({
          exercises: response,
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
          <Text>Yükleniyor... </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.section}>
          <Text>Size atanan egzersiz yok</Text>
          <Text>Yenilemek için sayfayı aşağı doğru çekin.</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Container>
        <Api ref={ref => (this.api = ref)} />
        <Header style={styles.themeColor}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTitle}>1. Gün</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
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
                          uri:
                            "https://im.hthayat.com/2017/03/02/ver1523873494/1047159_d58fa4ab8966c79cbfbd584d45a7570c.jpg"
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
                      <Button rounded success>
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
        <Footer style={styles.themeColor}>
          <FooterTab style={styles.themeColor}>
            <Button>
              <Image
                style={styles.footerButton}
                source={require("../assets/icons/backButton.png")}
              />
            </Button>
            <Button success style={styles.statusButton}>
              <Text style={styles.statusText}>Tamamlandı</Text>
            </Button>
            <Button>
              <Image
                style={styles.footerButton}
                source={require("../assets/icons/nextButton.png")}
              />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: { fontSize: 25, color: "#fff", fontWeight: "bold" },
  content: { backgroundColor: "#C7CCCB" },
  listItem: { marginTop: 10 },
  listBackground: { backgroundColor: "#30A898" },
  listButtonText: { color: "#fff" },
  listHeader: { color: "#fff", fontWeight: "bold" },
  listText: { color: "#fff" },
  themeColor: { backgroundColor: "#006E5F" },
  statusButton: { marginTop: 5 },
  statusText: { color: "#fff", fontWeight: "bold" },
  contentScroll: { paddingVertical: 10 },
  footerButton: { width: 50, height: 50, tintColor: "#fff" }
});
