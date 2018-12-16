import React, { Component } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Body,
  Left,
  Icon,
  Right
} from "native-base";

export class ExerciseDetailScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let { params } = this.props.navigation.state;
    this.state = {
      exercise: params.exercise
    };
  }

  render() {
    return (
      <Container>
        <Header style={styles.themeColor}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Exercise")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.headerText}>{this.state.exercise_id}</Text>
          </Body>
          <Right />
        </Header>
        <Content style={styles.contentBackground}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Image
              source={{
                uri: this.state.exercise.image_link
              }}
              style={styles.activitiesImage}
            />
            <Text style={styles.contentText}>
              {this.state.exercise.explanation}
            </Text>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  themeColor: { backgroundColor: "#006E5F" },
  contentBackground: { backgroundColor: "#C7CCCB" },
  contentText: { marginBottom: 10, marginTop: 10, marginLeft: 5 },
  headerText: { fontSize: 25, color: "#fff", fontWeight: "bold" },
  activitiesImage: { height: 300, width: null }
});
