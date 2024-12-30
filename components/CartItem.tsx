import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import QuantityControl from './QuantityControl';
import { formatPrice } from '../utils/formatPrice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { removeFromCart, updateCartItem } from '../redux/cartSlice';
import { useTranslation } from 'react-i18next';
import { useToast } from '../components/toastContext';
import { ItemProps } from '../types/types';
import { CartItem as CartItemType } from '../types/cartItem.type';

interface Props {
  product: CartItemType;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({
  product,
  onQuantityChange,
  onRemove,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { showToast } = useToast();

  const handleRemoveItem = () => {
    dispatch(removeFromCart(product.id));
    setTimeout(() => {
      showToast(t('messages.remove-from-cart'));
    }, 0);
    onRemove();
  };

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateCartItem({ itemId: product.id, quantity: newQuantity }));
    onQuantityChange(newQuantity);
  };
  const calculateSubtotal = () => {
    return product.quantity * product.price;
  };

  return (
    <TouchableOpacity onPress={() => {}}>
      <View className="bg-white rounded-md shadow-sm m-2 p-4">
        <View className="flex-row">
          <View className="w-1/3 mr-4">
            <Image
              source={{ uri: product.image }}
              className="w-full aspect-square rounded-sm"
              resizeMode="cover"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="flex-1 pr-4 text-base font-bold line-clamp-2">
                {product.name}
              </Text>
              <TouchableOpacity onPress={handleRemoveItem}>
                <Icon name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center mb-2">
              <View>
                {product.price ? (
                  <Text className="font-bold ">
                    {formatPrice(product.price)}
                  </Text>
                ) : null}
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <QuantityControl
                quantity={product.quantity}
                onIncrease={() => handleQuantityChange(product.quantity + 1)}
                onDecrease={() =>
                  handleQuantityChange(
                    product.quantity > 1 ? product.quantity - 1 : 1
                  )
                }
              />
              <Text className="font-bold text-xl">
                {formatPrice(calculateSubtotal())}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
