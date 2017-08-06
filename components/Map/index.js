import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { carts } from '../../Cart';
import { SingleCart } from '../SingleCart';

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
            selectedCart: {}
        };
        this.handleCartCalloutPress = this.handleCartCalloutPress.bind(this);
        this.handleMarkerPress = this.handleMarkerPress.bind(this);
        // this.returnTruckIcon = this.returnTruckIcon.bind(this);
    }

    static navigationOptions = {
        title: 'Advice Over Rice'
    };

    // watchID: ?number = null;

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
        // setTimeout(() => console.log(this.state), 100);
    }

    handleCartCalloutPress() {
        this.props.navigation.navigate('SingleCartScreen', this.state.selectedCart)
    }

    generateStars(rating) {
        //loop through and attach assets
    }

    // returnTruckIcon = (hasGreenSauce) => {
    //     if (hasGreenSauce) return 'require(`../../assets/images/cartIconGreen.png'
    //     return 'require(`../../assets/images/cartIcon.png'
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text> Filters Go Here </Text>
                <MapView style={styles.map} region={this.state.initialPosition}>
                    <MapView.Marker
                        coordinate={this.state.markerPosition}
                        image={require('../../assets/images/eatingIcon.png')}
                        >
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
                                    <Image
                                        source={require('../../assets/images/cart1.jpg')}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            marginRight: 0
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            flex: 3,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Text style={styles.calloutTextTitle}>
                                            {marker.name}
                                        </Text>
                                        <Text style={styles.calloutText}>
                                            {advRating}
                                        </Text>
                                        <Text style={styles.calloutText}>
                                            {riceRating}
                                        </Text>
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
        bottom: 100,
        position: 'absolute',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'flex-end',
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
        fontSize: 10,
        fontWeight: 'bold'
    },
    calloutTextTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'red'
    },
    iconRating: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        paddingLeft: 3
    }
});
