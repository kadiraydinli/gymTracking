import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
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
  Left,
  Icon,
  Title,
  Body,
  Right,
  Separator,
  ListItem
} from "native-base";
import Api from "../api";

export class DietListScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      diets: null,
      refreshing: false,
      loadingPage: true
    };
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
          <Text>There is no certificate of yours at the moment. </Text>
          <Text>Pull down the page to refresh. </Text>
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
          <ImageBackground
            source={{
              uri:
                "https://i.nefisyemektarifleri.com/2018/01/23/cindeki-yemekler-ve-cin-yemek-tarifleri-uzerine.jpg"
            }}
            style={styles.dayBackground}
          >
            <Text style={styles.typeText}>DEFİNASYON</Text>
            <Text style={styles.dayText}>Pazartesi</Text>
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
                  <Separator bordered>
                    <Text>
                      {item.meal} - {item.time}
                    </Text>
                  </Separator>
                  <ListItem>
                    <Text>{item.content}</Text>
                  </ListItem>
                </View>
              )}
            />
          </ScrollView>
        </Content>
        <Footer style={styles.themeColor}>
          <FooterTab style={styles.themeColor}>
            <Button>
              <Text>Tamamla</Text>
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
  themeColor: { backgroundColor: "#006E5F" },
  contentScroll: { paddingVertical: 10 },
  footerButton: { width: 50, height: 50, tintColor: "#fff" },
  dayBackground: {
    resizeMode: "stretch",
    width: null,
    height: 150,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  dayText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold"
  },
  typeText: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    marginTop: 60,
    fontWeight: "bold"
  }
});
