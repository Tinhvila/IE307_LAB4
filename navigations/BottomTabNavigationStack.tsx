import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Categories from '../screens/Categories';
import Cart from '../screens/Cart';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomTabNavigationStackParamList } from '../types/navigation';
import HomeStackNavigation from './HomeStackNavigation';
import ProfileStackNavigation from './ProfileStackNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CartStackNavigation from './CartStackNavigation';

const Tab = createBottomTabNavigator<BottomTabNavigationStackParamList>();

export default function BottomTabNavigationStack() {
  const { t } = useTranslation();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={{
          tabBarLabel: t('main.home'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" size={size} color={focused ? color : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: t('main.categories'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="appstore1"
              size={size}
              color={focused ? color : 'gray'}
            />
          ),
          headerShown: true,
        }}
      />

      <Tab.Screen
        name="CartStack"
        component={CartStackNavigation}
        options={{
          tabBarLabel: t('main.cart'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="shoppingcart"
              size={size}
              color={focused ? color : 'gray'}
            />
          ),
          tabBarBadgeStyle: {
            fontSize: 12,
            top: -4,
          },
          tabBarBadge:
            cartItems.length > 0
              ? cartItems.length > 10
                ? '10+'
                : cartItems.length
              : undefined,
          headerShown: false,
          headerTitleAlign: 'left',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigation}
        options={{
          tabBarLabel: t('main.profile'),
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="user" size={size} color={focused ? color : 'gray'} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  searchIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48, // Adjusted size for a more consistent look
    height: 48, // Adjusted size for a more consistent look
    borderRadius: 24, // Circular shape for the wrapper
    top: 0,
    borderWidth: 2, // Optional: add border for better visibility of the icon
  },
  searchIconWrapperFocused: {
    backgroundColor: '#3b82f6', // bg-blue-400
  },
});
