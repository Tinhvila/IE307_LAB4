import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { ProfileStackNavigationProp } from '../types/navigation';

export default function Order() {
  const navigation = useNavigation<ProfileStackNavigationProp>();
  return (
    <SafeAreaView className={'flex-1'}>
      <View className={'flex-row items-center'}>
        <TouchableOpacity
          className={'ml-3'}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0, // Index of the route you want to focus on
                routes: [{ name: 'Profile' }], // The route(s) to keep in the stack
              })
            )
          }
        >
          <AntDesignIcon name={'left'} size={20} />
        </TouchableOpacity>
        <Text className={'text-xl font-bold text-black px-2 py-3'}>Order</Text>
      </View>
    </SafeAreaView>
  );
}
