import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { carts } from '../../Cart';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Mapping extends Component {
  constructor() {
    super();
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      selectedMarker: {

      }
    };
    this.handleCartMarkerPress = this.handleCartMarkerPress.bind(this)
    this.handleCartCalloutPress = this.handleCartCalloutPress.bind(this)
  }




  watch id = null // watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };

        this.setState({ initialPosition: initialRegion });
        this.setState({ markerPosition: initialRegion });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);

      var lastRegion = {
        latitude: lat,
        longitude: long,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA
      };

      this.setState({ initialPosition: lastRegion });
      this.setState({ markerPosition: lastRegion });
    });
  }

  componentWillUnmount() {
    navigator.geolocaiton.clearWatch(this.watchID);
  }

  handleCartMarkerPress(e, identifier) {
    this.state.selectedMarker = '' //figure out what's in e
    // what to do when user presses on a single cart's marker
  }

  handleCartCalloutPress(e, identifier) {
    // what to do when user presses on a single cart's marker's callout
  }

  generateStars(rating) {
    //loop through and attach assets
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.initialPosition}>


          <MapView.Marker coordinate={this.state.markerPosition}>
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>

          {carts.map(cart => {
            const desc = `ADVICE: ${cart.avgAdviceRating}/5   RICE: ${cart.avgRiceRating}/5`
            return (
              <MapView.Marker
                key={cart.id}
                coordinate={{
                  latitude: cart.location[0],
                  longitude: cart.location[1]
                }}
                identifier={toString(cart.id)}
                onPress={(e) => handleCartMarkerPress(e, identifier)}
                onCalloutPress={(e) => handleCartCalloutPress(e, identifier)}
                title={cart.name}
                description = {desc}
                // 'RICE: ' {cart.avgRiceRating}
                >
                <View style={styles.radius}>
                  <View style={styles.marker} />
                </View>
              </MapView.Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  radius: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,112,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007aff'
  }
});
