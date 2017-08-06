import React from 'react';
import { View } from 'react-native';
import Stars from 'react-native-stars';


export const Rating = (props) => {

  // fixing stars => only respond to whole and half numbers
  var fixedRating = null;
  const decimal = props.rating - Math.floor(props.rating);
  if (decimal > 0.333 && decimal < 0.666) {
    fixedRating = props.rating - decimal + 0.5;
  } else if (decimal > 0.666) {
    fixedRating = Math.ceil(props.rating);
  }

    return (
      <View style={{alignItems: 'center'}}>
        <Stars
        half={true}
        rating={fixedRating || props.rating}
        //update={(val)=>{setState({stars: val})}}
        spacing={2}
        starSize={8}
        count={5}
        fullStar={require('../../assets/stars/starFilled.png')}
        emptyStar={require('../../assets/stars/starEmpty.png')}
        halfStar={require('../../assets/stars/starHalf.png')}
        />
      </View>

    );
}
