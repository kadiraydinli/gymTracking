import React, { Component } from "react";
import { Platform, StyleSheet, Image, ScrollView } from "react-native";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  ListItem,
  Body,
  Card,
  CardItem
} from "native-base";

class ExerciseDetailScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Header style={styles.themeColor}>
          <Text style={styles.headerText}>Hareket Adı</Text>
        </Header>
        <Content style={styles.contentBackground}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Image
              source={{
                uri:
                  "http://www.hayal-gucum.com/wp-content/uploads/2016/04/papatya-course.jpg"
              }}
              style={styles.activitiesImage}
            />
            <Card style={styles.activitiesCard}>
              <Body style={styles.contentBody}>
                <Text style={styles.contentText}>
                  Hareket Bilgileri sdfsdf f ds fds fsdf dsf sd fsd f ds fsd fsd
                  fsd fsdfsd sd dfsdfsd sdfdsfdsf dsfdsfdsfdsfdsfsd fsd fdskf
                  şsdfk şdsfkşsdş
                </Text>
              </Body>
            </Card>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  themeColor: { backgroundColor: "#ef5148" },
  contentContainer: { paddingVertical: 20 },
  contentBackground: { backgroundColor: "#0B2E5F" },
  contentBody: { backgroundColor: "#1A4079" },
  contentText: { color: "#fff", marginBottom: 10, marginTop: 10 },
  headerText: {
    fontSize: 25,
    marginTop: 10,
    alignContent: "center",
    fontWeight: "bold",
    color: "#fff"
  },
  activitiesImage: {
    height: 300,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    backgroundColor: "#1A4079"
  },
  activitiesCard: { marginLeft: 10, marginRight: 10 }
});

export default ExerciseDetailScreen;
