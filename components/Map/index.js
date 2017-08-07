import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions, Image, Switch } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { Container, Card, CardItem, Text, Thumbnail, DeckSwiper } from 'native-base';
import moment from 'moment';
import { carts } from '../../Cart';
import { SingleCart } from '../SingleCart';
import { Rating } from '../Rating';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const currentTime = new moment().format("HH:mma");

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
            selectedCart: {},
            greenSauceSwitchIsOn: false,
            openNowSwitchIsOn: false,
        };
        this.handleCartCalloutPress = this.handleCartCalloutPress.bind(this);
        this.handleMarkerPress = this.handleMarkerPress.bind(this);
        this.returnFilteredArray = this.returnFilteredArray.bind(this);
        this.isOpen = this.isOpen.bind(this);
    }

    static navigationOptions = {
        title: 'Advice Over Rice'
    };

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

                this.setState({
                    initialPosition: initialRegion
                });
                this.setState({
                    markerPosition: initialRegion
                });
            },
            error => console.log(JSON.stringify(error)),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
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

            this.setState({
                initialPosition: lastRegion
            });
            this.setState({
                markerPosition: lastRegion
            });
        });
    }

    componentWillUnmount() {
        navigator.geolocaiton.clearWatch(this.watchID);
    }

    handleMarkerPress(marker) {
        this.setState({
            selectedCart: marker,
            initialPosition: {
                latitude: marker.location[0],
                longitude: marker.location[1],
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        });
    }

    handleCartCalloutPress() {
        this.props.navigation.navigate('TabNavScreen', { cart: this.state.selectedCart, position: this.state.initialPosition} )
    }

    returnFilteredArray(cart) {
        return (
                (
                 (
                  this.state.greenSauceSwitchIsOn && cart.hasGreenSauce)
                  || !this.state.greenSauceSwitchIsOn
                 )
                 &&
                 (
                  (
                   this.state.openNowSwitchIsOn && this.isOpen(cart))
                  || !this.state.openNowSwitchIsOn
                 )
                )
    }

    isOpen(cart) {
        // if moment(cart.hoursClose, "HH:mma") > moment('12:00am', 'HH:mma') &&
        // return ((moment(cart.hoursOpen, "HH:mma") < currentTime) && (currentTime < moment(cart.hoursClose, "HH:mma")))
    }

    render() {

        return (
            <View style={styles.container}>

                <Card>
                  <View style={{flexDirection: 'column'}} >
                    <CardItem>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1}}>
                                Open Now?
                            </Text>
                            <View style={{flex: 1}}>
                                <Switch
                                    onValueChange={(value) => this.setState({openNowSwitchIsOn: value})}
                                    value={this.state.openNowSwitchIsOn}
                                />
                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1}}>
                                Green Sauce Only!
                            </Text>
                            <View style={{flex: 1}}>
                                <Switch
                                    onValueChange={(value) => this.setState({greenSauceSwitchIsOn: value})}
                                    value={this.state.greenSauceSwitchIsOn}
                                />
                            </View>
                        </View>
                    </CardItem>
                  </View>
                </Card>




                <MapView style={styles.map} region={this.state.initialPosition}>
                    <MapView.Marker
                        coordinate={this.state.markerPosition}
                        image={require('../../assets/images/eatingIcon.png')}
                        >
                    </MapView.Marker>

                    { carts
                        .filter(this.returnFilteredArray)
                        .map(marker => {
                        // console.log(moment())
                        // console.log(marker.hoursOpen)
                        // console.log(moment(marker.hoursOpen, "HH:mma"))
                        return (
                            <MapView.Marker
                                key={marker.id}
                                coordinate={{
                                    latitude: marker.location[0],
                                    longitude: marker.location[1]
                                }}
                                identifier={toString(marker.id)}
                                onPress={() => this.handleMarkerPress(marker)}
                                image={marker.hasGreenSauce
                                    ? require('../../assets/images/cartIconGreen.png')
                                    : require('../../assets/images/cartIcon.png')
                                }
                                >

                                <Text style={styles.iconRating}>
                                    {((marker.avgAdviceRating + marker.avgRiceRating) / 2).toFixed(1)}
                                </Text>

                                <MapView.Callout
                                    style={styles.callout}
                                    onPress={() => this.handleCartCalloutPress(marker)}
                                    >
                                    <View style={{flex: 2}}>
                                        <Image
                                            source={require('../../assets/images/cart1.jpg')}
                                            style={{
                                                width: 70,
                                                height: 70,
                                            }}
                                        />
                                    </View>
                                    <View style={{
                                        flexDirection: 'column',
                                        flex: 3,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                        }}>
                                        <Text style={styles.calloutTextTitle}>
                                            {marker.name}
                                        </Text>

                                        <View style={{
                                            flexDirection: 'column',
                                            paddingLeft: 4,
                                            flex: 1,
                                            justifyContent: 'center'
                                            }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                                }}>
                                                <Text style={{paddingRight: 4, fontSize: 12}}>
                                                    Advice
                                                </Text>
                                                <Rating ratingObj={{rating: marker.avgAdviceRating}} />
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                                }}>
                                                <Text style={{paddingRight: 17, fontSize: 12}}>
                                                    Rice
                                                </Text>
                                                <Rating ratingObj={{rating: marker.avgRiceRating}} />
                                            </View>
                                        </View>
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
        position: 'relative',
        flex: 3.5
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    callout: {
        flexDirection: 'row',
        flex: 4,
        height: 70,
        width: 170,
        overflow: 'hidden',
        backgroundColor: 'red'
    },
    calloutText: {
        fontSize: 200,
        fontWeight: 'bold'
    },
    calloutTextTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'red',
        paddingTop: 5
    },
    iconRating: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        paddingLeft: 3
    }
});
