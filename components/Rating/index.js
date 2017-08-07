import React from 'react';
import { View } from 'react-native';
import Stars from 'react-native-stars';


export const Rating = (props) => {
  const rating = props.ratingObj && props.ratingObj.rating;
  const spacing = props.ratingObj && props.ratingObj.spacing;
  let starSize = props.ratingObj && props.ratingObj.starSize;
  // fixing stars => only respond to whole and half numbers
  let fixedRating = null;
  const decimal = rating - Math.floor(rating);
  if (decimal > 0.333 && decimal < 0.666) {
    fixedRating = rating - decimal + 0.5;
  } else if (decimal > 0.666) {
    fixedRating = Math.ceil(rating);
  }

    return (
      <View style={{alignItems: 'center'}}>
        <Stars
        half={true}
        rating={fixedRating || rating}
        //update={(val)=>{setState({stars: val})}}
        spacing={spacing || 2}
        starSize={starSize || 8}
        count={5}
        fullStar={require('../../assets/stars/starFilled.png')}
        emptyStar={require('../../assets/stars/starEmpty.png')}
        halfStar={require('../../assets/stars/starHalf.png')}
        />
      </View>

    );
}
