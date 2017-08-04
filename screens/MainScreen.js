import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Mapping } from '../components/Map';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main',
  };

  render() {
    return (
      //<ScrollView style={styles.container}>
        <Mapping />
      //</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
