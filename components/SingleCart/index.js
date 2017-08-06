import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
//import geocoder from 'geocoder';



export class SingleCart extends Component {
  render() {
    const cart = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.main}>
        { console.log(cart) }
        <Image source={require('../../assets/images/cart1.jpg')} />
        <Text>Advice Rating: {cart.avgAdviceRating}</Text>
        <Text>Rice Rating: {cart.avgRiceRating}</Text>
        <Text>Total Ratings: {cart.ratingCount}</Text>
        { // <Text>
          //   {geocoder.reverseGeocode(
          //     arr.location[0],
          //     arr.location[1],
          //     function (err, data) {
          //       console.log(data)
          //     }, { sensor: true }
          //   )}
          // </Text>
        }
        <Text>Corner: {cart.corner}</Text>
        <Text>Hours: {cart.hoursOpen}-{cart.hoursClose}</Text>
        { cart.hasGreenSauce
          ? <Text style={{color: 'green'}}>Has Green Sauce!</Text>
          : null
        }
        <View style={styles.vendor}>
          <Image source={require('../../assets/images/profile1.jpg')} />
          <Text>Advice and Rice by: {cart.vendorName}</Text>
          <Text>{cart.vendorName}'s Life Story: {cart.vendorBio}</Text>
        </View>
        <Text>{cart.name}</Text>

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
