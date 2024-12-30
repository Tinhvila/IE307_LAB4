import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RatingCount } from '../types/rating.type';
import StarList from './StarList';

interface Props {
  ratingNumber: RatingCount[];
  ratingSelected: number[];
  onSetRatingSelected: (rating: number) => void;
}

export default function Rating({
  ratingNumber,
  ratingSelected,
  onSetRatingSelected,
}: Props) {
  const isRatingSelected = (rating: number) => ratingSelected.includes(rating);

  const handleRatingToggle = (rating: number) => {
    onSetRatingSelected(rating);
  };

  return (
    <View>
      <View>
        {ratingNumber.map((item) => (
          <TouchableOpacity
            key={item.stars}
            className="flex-row items-center pb-4"
            onPress={() => handleRatingToggle(item.stars)}
          >
            <View
              className={`
                w-5 h-5 rounded-[4px] border-2 mr-3
                ${
                  isRatingSelected(item.stars)
                    ? 'bg-[#21243d] border-[#21243d]'
                    : 'border-gray-300 bg-white'
                }
              `}
            >
              {isRatingSelected(item.stars) && (
                <View className="items-center justify-center flex-1">
                  <View className="w-2.5 h-1.5 border-b-2 border-r-2 border-white transform rotate-[135deg] -translate-y-0.5 scale-y-[-1] -translate-x-0.2" />
                </View>
              )}
            </View>
            <StarList
              rating={item.stars}
              className={
                isRatingSelected(item.stars)
                  ? 'opacity-100 w-5 h-5 '
                  : 'opacity-50 w-5 h-5 '
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
