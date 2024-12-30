import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Stack = createMaterialTopTabNavigator();
export default function CategoriesStack() {
  return (
    <View>
      <Text>CategoriesStack</Text>
    </View>
  )
}