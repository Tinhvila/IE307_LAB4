import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '../utils/formatPrice';
import { FavoriteItem as FavoriteItemType } from '../types/favoriteItem.type';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { removeFromFavorites } from '../redux/favoriteSlice';
import { AuthenticationContext } from '../context/context';
import { useTranslation } from 'react-i18next';
import { useToast } from '../components/toastContext';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { useSelector } from 'react-redux';

interface Props {
  product: FavoriteItemType;
}

export default function FavoriteItem({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { id } = React.useContext(AuthenticationContext);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleRemoveItem = () => {
    dispatch(removeFromFavorites({ id, itemId: product.id }));
    setTimeout(() => {
      showToast(t('messages.remove-from-favorites'));
    }, 0);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id, item: { ...product, quantity: 1 } }));
    setTimeout(() => {
      showToast(t('messages.add-to-cart'));
    }, 0);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ id, itemId: product.id }));
    setTimeout(() => {
      showToast(t('messages.remove-from-cart'));
    }, 0);
  };

  return (
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
                <Text className="font-bold text-red-500">
                  {formatPrice(product.price)}
                </Text>
              ) : null}
            </View>
          </View>

          <TouchableOpacity
            onPress={!isInCart ? handleAddToCart : handleRemoveFromCart}
            className="bg-black rounded-md py-2 px-4 mt-2"
          >
            <Text className="text-white text-center font-medium">
              {!isInCart
                ? t('favorites.add-to-cart')
                : t('favorites.remove-from-cart')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
