import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Text, View, StyleSheet, Dimensions, Card, Image } from 'react-native';
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
    this.handleCartMarkerPress = this.handleCartMarkerPress.bind(this);
    this.handleCartCalloutPress = this.handleCartCalloutPress.bind(this);
  }


  //watchID: ?number = null;

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
      (error) => console.log(JSON.stringify(error)),
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

  handleCartMarkerPress(event, identifier) {
    this.setState({selectedMarker: ''}); //figure out what's in event
    // what to do when user presses on a single cart's marker
  }

  handleCartCalloutPress(event, identifier) {
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
            <View style={styles.radiusGeoLoc}>
              <View style={styles.markerGeoLoc} />
            </View>
          </MapView.Marker>

          {carts.map(marker => {
            const advRating = `ADVICE: ${marker.avgAdviceRating}/5`;
            const riceRating = `RICE: ${marker.avgRiceRating}/5`;

            return (
              <MapView.Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.location[0],
                  longitude: marker.location[1]
                }}
                identifier={toString(marker.id)}
                onPress={(event) => this.handleCartMarkerPress(event, this.identifier)}
                onCalloutPress={(event) => this.handleCartCalloutPress(event, this.identifier)}
                // title={marker.name}
                // description = {desc}
                image={require('../../assets/images/cartIcon.png')}
                >

                <MapView.Callout style={styles.callout}>
                    <Image style={{ flexDirection: 'row' }}
                        source={require('../../assets/images/cart1.jpg')}
                        style={{ width: 70, height: 70, marginRight: 10 }}
                    />
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                          <Text style={styles.calloutTextTitle}>{marker.name}</Text>
                          <Text style={styles.calloutText}>{advRating}</Text>
                          <Text style={styles.calloutText}>{riceRating}</Text>
                    </View>
                </MapView.Callout>

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
  radiusGeoLoc: {
    height: 20,
    width: 20,
    borderRadius: 1 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(100, 18, 254, 0.6509803921568628)',
    borderWidth: 3,
    borderColor: '#0230B5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerGeoLoc: {
    height: 5,
    width: 5,
    borderWidth: 3,
    borderColor: 'rgba(251,0,6,1.0)',
    borderRadius: 1,
    overflow: 'hidden',
    backgroundColor: '#0230B5'
  },
  callout: {
    flexDirection: 'row',
    height: 70,
    width: 200,
    // borderWidth: 0,
    // borderColor: 'white',
    // borderRadius: 1 / 2,
    overflow: 'hidden',
    backgroundColor: '#007aff'
  },
  calloutText: {
        fontSize: 10,
        fontWeight: 'bold'
  },
  calloutTextTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'red'
  }
});
