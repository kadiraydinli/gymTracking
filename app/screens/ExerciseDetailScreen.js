import React, { Component } from "react";
import {StyleSheet, Image, ScrollView } from "react-native";
import {Button,Text,Container,Header,Content,Body,Left,Icon, Right} from "native-base";

class ExerciseDetailScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Header style={styles.themeColor}>
          <Left>
            <Button transparent onPress={()=> this.props.navigation.navigate("Exercise")}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Text style={styles.headerText}>Hareket Adı</Text>
          </Body>
          <Right></Right>
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
            <Text style={styles.contentText}>
                  Hareket Bilgileri sdfsdf f ds fds fsdf dsf sd fsd f ds fsd fsd
                  fsd fsdfsd sd dfsdfsd sdfdsfdsf dsfdsfdsfdsfdsfsd fsd fdskf
                  şsdfk şdsfkşsdş
            </Text>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({  
  themeColor:{backgroundColor:'#006E5F'},
  contentBackground:{backgroundColor:'#C7CCCB'},
  contentText:{marginBottom:10,marginTop:10,marginLeft:5},
  headerText:{fontSize:25,color:'#fff',fontWeight:'bold'},
  activitiesImage:{height: 300,width:null}
});

export default ExerciseDetailScreen;
