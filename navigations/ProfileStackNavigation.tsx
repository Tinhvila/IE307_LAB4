import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Order from '../screens/Order';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import Favorite from '../screens/Favorite';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();
export default function ProfileStackNavigation() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
