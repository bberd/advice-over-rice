import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, Platform, Linking, TouchableOpacity } from 'react-native';
import geocoder from 'react-native-geocoding';

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
    console.log('here')
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
        <Image source={require('../../assets/images/cart1.jpg')} />
        <Text>Advice Rating: {this.state.cart.avgAdviceRating}</Text>
        <Text>Rice Rating: {this.state.cart.avgRiceRating}</Text>
        <Text>Total Ratings: {this.state.cart.ratingCount}</Text>
        <TouchableOpacity onPress={this.openDirections}>
        <View
          style={{backgroundColor: 'lightgray'}}
          >
          <Text>Address: {this.state.address && this.state.address}</Text>
        </View>
        </TouchableOpacity>
        <Text>Corner: {this.state.cart.corner}</Text>
        <Text>Hours: {this.state.cart.hoursOpen}-{this.state.cart.hoursClose}</Text>
        { this.state.cart.hasGreenSauce
          ? <Text style={{color: 'green'}}>Has Green Sauce!</Text>
          : null
        }
        <View style={styles.vendor}>
          <Image source={require('../../assets/images/profile1.jpg')} />
          <Text>Advice and Rice by: {this.state.cart.vendorName}</Text>
          <Text>{this.state.cart.vendorName}'s Life Story: {this.state.cart.vendorBio}</Text>
        </View>
        <Text>{this.state.cart.name}</Text>

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
