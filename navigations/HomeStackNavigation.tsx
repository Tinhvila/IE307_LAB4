import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ItemsListScreen from '../screens/ItemsListScreen';
import { HomeStackNavigationParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<HomeStackNavigationParamList>();

export default function HomeStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{ headerShown: true, headerTitleAlign: 'left' }}
      />
    </Stack.Navigator>
  );
}
