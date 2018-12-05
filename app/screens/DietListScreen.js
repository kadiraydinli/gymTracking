import React, { Component } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Accordion,
  Left,
  Icon,
  Title,
  Body,
  Right
} from "native-base";

const dataArray = [
  { title: "1. Öğün", content: "Yemek 1 - Yemek - 2 Yemek - 3" },
  { title: "2. Öğün", content: "Yemek 1 - Yemek - 2 Yemek - 3" },
  { title: "3. Öğün", content: "Yemek 1 - Yemek - 2 Yemek - 3" }
];

class DietListScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
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
            <Title style={styles.headerTitle}>Pazartesi</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={styles.content}>
          <ScrollView contentContainerStyle={styles.contentScroll}>
            <Accordion
              dataArray={dataArray}
              icon="add"
              headerStyle={styles.accordionHeader}
              contentStyle={styles.accordionContent}
              expandedIcon="remove"
              expanded={0}
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
  themeColor: { backgroundColor: "#006E5F" },
  contentScroll: { paddingVertical: 10 },
  accordionHeader: { backgroundColor: "#30A898", color: "#fff" },
  accordionContent: { backgroundColor: "#63908A", color: "#fff" },
  footerButton: { width: 50, height: 50, tintColor: "#fff" }
});

export default DietListScreen;
