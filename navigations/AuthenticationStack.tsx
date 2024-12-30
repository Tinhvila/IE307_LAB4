import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Intro from '../screens/Intro';
import { AuthenticationStackNavigationParamList } from '../types/navigation';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator<AuthenticationStackNavigationParamList>();
export default function AuthenticationStack() {
  return (
    <Stack.Navigator initialRouteName='Intro'>
      <Stack.Screen
        name={'Intro'}
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SignUp'}
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ForgotPassword'}
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'ResetPassword'}
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}