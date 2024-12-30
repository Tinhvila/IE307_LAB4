import React from 'react';
import { View, Image } from 'react-native';

interface Props {
  rating: number;
  className?: string;
}

export default function StarList({ className, rating }: Props): JSX.Element {
  const totalStars = 5;

  return (
    <View className={`flex-row items-center  ${className}`}>
      {[...Array(totalStars)].map((_, index) => (
        <Image
          key={index}
          source={
            index < rating
              ? require('../assets/image/star.png')
              : require('../assets/image/star-empty.png')
          }
          className="h-full w-full mr-1"
          // style={{
          //   width: 12,
          //   height: 12,
          //   marginRight: 4,
          // }}
        />
      ))}
    </View>
  );
}
