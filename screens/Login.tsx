import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationStackNavigationProp } from '../types/navigation';
import { AuthenticationContext } from '../context/context';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthenticationStackNavigationProp>();
  const [loginAuthen, setLoginAuthen] = React.useState({
    email: '',
    password: '',
  });
  const [revealPassword, setRevealPassword] = React.useState(false);

  const { setToken } = React.useContext(AuthenticationContext);
  // Handle the login state with JSON server later

  const handleLogin = async () => {
    // Check if the field is empty
    if (loginAuthen.email === '' || loginAuthen.password === '') {
      Alert.alert('Detected empty field', 'Please fill all login field');
      return;
    }

    try {
      // Call login API endpoint
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginAuthen.email,
          password: loginAuthen.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Login Failed', 'Invalid username or password');
        return;
      }
      setToken(data.token);
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while logging in. Please try again.'
      );
    }
  };

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className={'flex flex-1 justify-center items-center'}>
          <View className={'items-center'}>
            <Image
              className={'w-52 h-24 object-contain'}
              source={require('../assets/image/logo_2.png')}
            />
            <Text className={'text-2xl font-medium'}>
              {t('authentication.login')}
            </Text>
            <View className={'mt-3 items-center justify-center'}>
              <AntDesignIcon
                name="mail"
                size={24}
                color={'gray'}
                className={'absolute left-2'}
              />
              <TextInput
                className={
                  'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'
                }
                placeholder="Email"
                value={loginAuthen.email}
                onChangeText={(text) =>
                  setLoginAuthen((prev) => ({ ...prev, email: text }))
                }
                autoComplete="email"
                inputMode="email"
              />
            </View>
            <View className={'mt-3 items-center justify-center'}>
              <AntDesignIcon
                name="lock"
                size={24}
                color={'gray'}
                className={'absolute left-2'}
              />
              <TextInput
                className={
                  'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'
                }
                placeholder={t('authentication.password')}
                secureTextEntry={revealPassword ? false : true}
                value={loginAuthen.password}
                onChangeText={(text) =>
                  setLoginAuthen((prev) => ({ ...prev, password: text }))
                }
              />
              <FontAwesome5Icon
                name={revealPassword ? 'eye-slash' : 'eye'}
                size={20}
                color={'gray'}
                className={'absolute right-3'}
                onPress={() => setRevealPassword((prev) => !prev)}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text className={'text-right w-80 mt-2 text-blue-500'}>
                {t('authentication.forgot-password')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={'bg-[#0d3092] mt-5 py-3 px-10 rounded-full'}
              onPress={handleLogin}
            >
              <Text className={'text-white text-xl font-bold'}>
                {t('authentication.sign-in-upper')}
              </Text>
            </TouchableOpacity>
            <Text className={'text-base mt-5'}>
              {t('authentication.no-account')}
              <Text
                className={'text-blue-500 font-bold'}
                onPress={() => {
                  navigation.replace('SignUp');
                }}
              >
                {' '}
                {t('authentication.sign-up')}
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}
