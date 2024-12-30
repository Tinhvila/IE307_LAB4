import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AuthenticationStackNavigationProp } from '../types/navigation';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import fetchUser from '../api/fetchUser';

export default function ForgotPassword() {
  const navigation = useNavigation<AuthenticationStackNavigationProp>();
  const emailInputRef = React.useRef<any | null>(null);
  const [email, setEmail] = React.useState<string>('');

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus(); // Automatically focus the search bar
        }
      }, 100);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleEmailSubmit = async () => {
    // Checking whether email exists on database
    const params = { email };
    const checkData = await fetchUser(params);
    // Data exists
    if (checkData && checkData.length > 0) {
      navigation.replace('ResetPassword', { email });
    }
    else {
      Alert.alert('Invalid email', 'Email does not exist or you type wrong email. Please try again');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className={'flex-1'}>
        <View className={'flex-row items-center'}>
          <TouchableOpacity
            className={'ml-3'}
            onPress={() => navigation.goBack()}
          >
            <AntDesignIcon name={'left'} size={20} />
          </TouchableOpacity>
          <Text className={'text-xl font-bold text-black px-2 py-3'}>Back</Text>
        </View>
        <View className={'flex flex-1 justify-center items-center'}>
          <Text className={'text-xl font-bold text-black px-2 py-3'}>Forgot Password</Text>
          <Text>Enter your email below to reset password</Text>
          <View className={'mt-3 items-center justify-center'}>
            <AntDesignIcon
              name='mail'
              size={24}
              color={'gray'}
              className={'absolute left-2'}
            />
            <TextInput
              className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
              placeholder='Email'
              ref={emailInputRef}
              returnKeyType='go'
              enablesReturnKeyAutomatically
              onSubmitEditing={handleEmailSubmit}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <TouchableOpacity
            onPress={handleEmailSubmit}
            className={`bg-[#0d3092] mt-5 py-3 px-10 rounded-full ${email === '' ? 'opacity-50' : ''}`}
            disabled={email === '' ? true : false}
          >
            <Text className={'text-white text-xl font-bold'}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}