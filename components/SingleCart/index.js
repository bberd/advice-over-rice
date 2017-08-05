import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
//import geocoder from 'geocoder';



export class SingleCart extends Component {
  render() {
    const cart = this.props.navigation.state.params;

    return (
      <ScrollView>
        { console.log(cart) }
        <Text>{cart.name}</Text>
        <Text>{cart.avgAdviceRating}</Text>
        <Text>{cart.avgRiceRating}</Text>
        <Text>{cart.ratingCount}</Text>
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
        <Text>{cart.corner}</Text>
        <Text>{cart.open}</Text>
        <Text>{cart.closed}</Text>
        <Text>{cart.hasGreenSauce}</Text>
        <View style={styles.vendor}>
          <Image source={require('../../assets/images/cart1.jpg')} />
          <Text>{cart.vendorName}</Text>
          <Text>{cart.vendorBio}</Text>
        </View>
        <Text>{cart.name}</Text>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    vendor: {
      flex: 1,

    }
})
