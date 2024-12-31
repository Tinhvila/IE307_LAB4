import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { updateCartItem, removeFromCart, clearCart } from '../redux/cartSlice';
import { AppDispatch, RootState } from '../redux/store';
import CartItem from '../components/CartItem';
import { HomeStackNavigationParamList } from '../types/navigation';

export default function Cart() {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeStackNavigationParamList>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: cartItems,
    totalAmount,
    loading,
  } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    dispatch(updateCartItem({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  function handleCheckout() {
    dispatch(clearCart());
    navigation.navigate('HomeStack');
    Alert.alert('Order placed', 'Your order has been placed successfully', [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  }
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            renderItem={({ item }) => (
              <CartItem
                product={item}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(item.id, newQuantity)
                }
                onRemove={() => handleRemoveItem(item.id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          <View className="absolute bottom-0 flex-row justify-between items-center left-0 right-0 bg-white p-4 border-t border-gray-200">
            <Text className="text-3xl text-red-600 font-bold">
              Total: ${totalAmount.toFixed(2)}
            </Text>
            <TouchableOpacity onPress={handleCheckout}>
              <Text className="text-base font-medium text-white bg-black px-4 py-2 rounded-md">
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center my-4 text-2xl">Cart empty! </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeStack');
            }}
          >
            <Text className="text-3xl font-medium text-white bg-black px-6 py-4 rounded-md">
              Shopping now
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
