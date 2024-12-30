import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../utils/formatPrice';
import { useNavigation } from '@react-navigation/native';
import { CartStackNavigationProp } from '../types/navigation';
import { useTranslation } from 'react-i18next';

interface Checkout {
  subtotal: number;
}

export default function Checkout({ subtotal }: Checkout) {
  const { t } = useTranslation();

  const navigation = useNavigation<CartStackNavigationProp>();
  const total = subtotal;

  return (
    <View className="bg-white rounded-t-xl shadow-md p-4">
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg font-bold">{t('cart.total')}</Text>
        <Text className="text-lg font-bold text-red-500">
          {formatPrice(total)}
        </Text>
        <TouchableOpacity
          className="bg-black rounded-lg py-3 items-center"
          onPress={() => navigation.navigate('Payment')}
        >
          <Text className="text-white text-base font-bold">Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
