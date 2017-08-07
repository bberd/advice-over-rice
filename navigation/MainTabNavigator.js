import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import { SingleCart } from '../components/SingleCart';
import { VendorBio } from '../components/VendorBio';

export default TabNavigator(
  {
    Cart: {
      screen: SingleCart,
      navigationOptions: ({navigation}) => ({
       title: navigation.state.params.name,
      }),
    },
    Vendor: {
      screen: VendorBio,
    },
    // Main: {
    //   screen: MainScreen
    // }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Cart':
            iconName = Platform.OS === 'ios'
              ? `ios-nutrition${focused ? '' : '-outline'}`
              : 'md-nutrition';
            break;
          case 'Vendor':
            iconName = Platform.OS === 'ios'
              ? `ios-body${focused ? '' : '-outline'}`
              : 'md-body';
            break;
          // case 'Settings':
          //   iconName = Platform.OS === 'ios'
          //     ? `ios-options${focused ? '' : '-outline'}`
          //     : 'md-options';
          //   break;
          // case 'Main':
          //   iconName = Platform.OS === 'ios'
          //     ? `ios-options${focused ? '' : '-outline'}`
          //     : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
