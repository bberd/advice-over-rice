import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Thumbnail } from 'native-base';
import { Rating } from '../Rating';

export class VendorBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: props.navigation.state.params.cart
    };
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <Container>
          <Content>
            <Card>
              <CardItem
                header
                style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                <Thumbnail source={require('../../assets/images/profile1.jpg')} />

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Text style={{ fontSize: 10, fontStyle: 'italic' }}>Advice by:</Text>
                  <Text>
                    {this.state.cart.vendorName}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Text style={{ fontSize: 10, fontStyle: 'italic', paddingBottom: 5 }}>
                    Advice ({this.state.cart.ratingCount} ratings):
                  </Text>
                  <Rating
                    ratingObj={{
                      rating: this.state.cart.avgAdviceRating,
                      starSize: 14,
                      spacing: 6
                    }}
                  />
                </View>
              </CardItem>
            </Card>

            <Card>
              <CardItem header>
                <Text>
                  {this.state.cart.vendorName}'s Life Story
                </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    {this.state.cart.vendorBio}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}
