import React, { Component } from "react";
import { StyleSheet, Image, ScrollView, Dimensions, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Body,
  Left,
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
      <StatusBar barStyle="dark-content" backgroundColor="#E6E6E6" />
        <Header style={styles.themeColor}>
          <Left>
            <Button
              transparent
              style={styles.headerIcon}
              onPress={() => this.props.navigation.navigate("Exercise")}
            >
              <Image source={require('../assets/icons/back.png')} style={styles.headerIcon} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.headerText}>{this.state.exercise.exercise_name}</Text>
          </Body>
          <Right />
        </Header>
        <Content style={styles.contentColor}>
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
  themeColor: { backgroundColor: "#E6E6E6" },
  contentColor: { backgroundColor: "#fff" },
  contentText: { marginBottom: 10, marginTop: 10, marginLeft: 5 },
  headerText: { fontSize: 25, color: "#ff7600", fontWeight: "bold" },
  headerIcon:{tintColor:'#ff7600',width:25,height:25},
  activitiesImage: { height: 300, width: Dimensions.get('window').width,resizeMode: "stretch"},
  footerButton:{width:20,height:20,tintColor:'#ff7600'},
  footerButtonfalse:{width:25,height:25,tintColor:'#b5b5b5'}
});
