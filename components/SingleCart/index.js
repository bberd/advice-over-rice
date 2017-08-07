import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Platform, Linking, TouchableOpacity } from 'react-native';
import { Container, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
import geocoder from 'react-native-geocoding';
import { Rating } from '../Rating';

geocoder.setApiKey('AIzaSyDUYS-IQyMHmg4mvlxcKKHYj13MCwJqaB4');

export class SingleCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      cart: props.navigation.state.params.cart,
      position: props.navigation.state.params.position
    };
    this.openDirections = this.openDirections.bind(this)
  }

  componentDidMount() {
      geocoder.getFromLatLng(this.state.cart.location[0], this.state.cart.location[1])
        .then(
          json => {
            this.setState({address: json.results[0].formatted_address});
          },
          error => {
            console.log(error);
          }
      );
    }

   openDirections() {
      Platform.select({
          ios: () => {
              Linking.openURL(`http://maps.apple.com/maps?daddr=${this.state.position.latitude},${this.state.position.longitude}`);
          },
          android: () => {
              Linking.openURL(`http://maps.google.com/maps?daddr=${this.state.position.latitude},${this.state.position.longitude}`);
          }
      })();
    }

  render() {
    return (
      <ScrollView style={styles.main}>

        <Card>
          <CardItem
            header
            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Thumbnail source={require('../../assets/images/cart1.jpg')} />

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Text style={{ fontSize: 10, fontStyle: 'italic' }}>Rice by:</Text>
              <Text>
                {this.state.cart.name}
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
                Rice ({this.state.cart.ratingCount} ratings):
              </Text>
              <Rating
                ratingObj={{
                  rating: this.state.cart.avgRiceRating,
                  starSize: 14,
                  spacing: 6
                }}
              />
            </View>
          </CardItem>
        </Card>

        <Container style={{height: 230}}>
            <DeckSwiper
              dataSource={this.state.cart.cartPhotos}
              renderItem={item =>
                <Card style={{ elevation: 3 }}>
                  <CardItem>
                    <Image style={{ height: 200, flex: 1}} source={item.image} />
                  </CardItem>
                </Card>
              }
            />
        </Container>

        <Card>
          <CardItem>
            <View>
              <TouchableOpacity onPress={this.openDirections}>
                <View>
                  <Text>Address: {this.state.address && this.state.address}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <View>
              <Text>Hours: {this.state.cart.hoursOpen}-{this.state.cart.hoursClose}</Text>
            </View>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <View>
              { this.state.cart.hasGreenSauce
                ? <Text style={{color: 'green'}}>Has Green Sauce!</Text>
                : null
              }
            </View>
          </CardItem>
        </Card>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    main: {
      flex: 1
    },
    vendor: {
      flex: 1,

    }
})
