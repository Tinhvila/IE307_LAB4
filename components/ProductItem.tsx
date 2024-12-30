import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ItemProps } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { CartItem as CartItemType } from '../types/cartItem.type';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useToast } from '../components/toastContext';
import { addItemToCart } from '../redux/cartSlice';
import { useTranslation } from 'react-i18next';

const ProductItem: React.FC<{ props: ItemProps }> = ({ props }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const isInCart = cartItems.some((item) => item.id === props.id);

  const { showToast } = useToast();
  const handleAddToCart = async () => {
    if (isInCart) {
      showToast('Item already in cart');
      return;
    }

    const cartItem: CartItemType = {
      id: props.id,
      name: props.title,
      price: props.price,
      image: props.image,
      quantity: 1,
    };

    dispatch(addItemToCart(cartItem));
    showToast(t('messages.add-to-cart'));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ItemDetails', {
          productId: props.id,
          productTitle: props.title,
        });
      }}
      className="bg-white rounded-sm shadow-sm mx-1 my-1"
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: props.image }}
        className="w-full rounded-t-sm aspect-square"
      />
      <View className="p-2">
        <Text className="text-lg line-clamp-2 text-black font-semibold mb-1">
          {props.title}
        </Text>

        <Text className="text-2xl font-bold text-purple-700">
          ${props.price}
        </Text>

        <View className="flex-row items-center">
          <View className="flex-1 flex-row items-center">
            <Text className=" text-2xl font-bold mr-2">
              {props.rating.rate}
            </Text>
            <Image
              source={require('../assets/image/star.png')}
              className="h-5 w-5 mr-1"
            />
            <Text className=" text-2xl  mr-2">({props.rating.count})</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="absolute right-0 bottom-0 rounded-full p-2"
        onPress={handleAddToCart}
      >
        <Ionicons
          name={isInCart ? 'cart' : 'cart-outline'}
          size={30}
          color={isInCart ? '#03168f' : ''}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;
