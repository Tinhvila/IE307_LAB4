import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigationStack from './BottomTabNavigationStack';
import ItemDetails from '../screens/ItemDetails';
import { ShoppingStackNavigator } from '../types/navigation';

const Stack = createNativeStackNavigator<ShoppingStackNavigator>();

export default function ShoppingStack() {
  return (
    <Stack.Navigator initialRouteName="BottomScreen">
      <Stack.Screen
        name={'BottomScreen'}
        component={BottomTabNavigationStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'ItemDetails'}
        component={ItemDetails}
        options={({ route }) => ({
          headerBackTitle: 'Back',
          title: route.params?.productTitle,
        })}
      />
    </Stack.Navigator>
  );
}
