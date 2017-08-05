import React, { Component } from 'react';

class SingleCart extends Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>{this.props.selectedCart}</Text>
      </View>
    );
  }
}
