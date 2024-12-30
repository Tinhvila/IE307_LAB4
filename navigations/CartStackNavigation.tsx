import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/Cart';
import Payment from '../screens/Payment';
import { CartStackNavigationParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<CartStackNavigationParamList>();

export default function CartStackNavigation() {
  const navigation = useNavigation();

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e: any) => {
  //     const state = navigation.getState();

  //     if (state?.routes[state.index].name !== 'Cart') {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'CartStack' }],
  //       });

  //       e.preventDefault();
  //     }
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
