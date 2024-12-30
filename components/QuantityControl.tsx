import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const QuantityControl: React.FC<{
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <View className="flex-row items-center border border-gray-200 rounded-md">
      <TouchableOpacity
        onPress={onDecrease}
        disabled={quantity <= 1}
        className={`p-2 ${quantity <= 1 ? 'opacity-30' : ''}`}
      >
        <Icon name="remove" size={20} color="black" />
      </TouchableOpacity>
      <Text className="px-4 text-base font-semibold">{quantity}</Text>
      <TouchableOpacity onPress={onIncrease} className={`p-2 `}>
        <Icon name="add" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityControl;
