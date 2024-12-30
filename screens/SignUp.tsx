import { View, Text, Image, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationStackNavigationProp } from '../types/navigation';
import fetchUser, { postUser } from '../api/fetchUser';
import * as Yup from 'yup';
import { hashPassword } from '../utils/hashPassword';
import { AuthenticationContext } from '../context/context';
import { useTranslation } from 'react-i18next';


export default function SignUp() {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthenticationStackNavigationProp>();
  const [signUpAuthen, setSignUpAuthen] = React.useState({
    username: '',
    email: '',
    password: '',
    retypePassword: '',
  });
  const [revealPassword, setRevealPassword] = React.useState({
    password: false,
    retypePassword: false,
  });

  const { setIsAuthenticated, setId, setUserData } = React.useContext(AuthenticationContext);
  const handleSignUp = async () => {
    // Handle empty field
    if (
      signUpAuthen.username === ''
      || signUpAuthen.email === ''
      || signUpAuthen.password === ''
      || signUpAuthen.retypePassword === '') {
      Alert.alert("Detected empty field", 'Please fill all the sign up field.');
      return;
    }

    // Check if the email is valid or not
    const emailSchema = Yup.string().email('Invalid email format');
    const validateEmail = async () => {
      try {
        // Attempt to validate the email
        await emailSchema.validate(signUpAuthen.email);
        // If validation passes, set validEmail to true
        return true;
      } catch (error) {
        console.log('Error while validating email: ', error);
        // If validation fails, return false
        return false;
      }
    };

    const validEmail = await validateEmail();
    if (!validEmail) {
      Alert.alert('Email does not exist, please try again');
      return;
    }


    // Handle valid password and retype password
    if (signUpAuthen.password !== signUpAuthen.retypePassword) {
      Alert.alert("Password mismatch", 'Please enter password in Password and Confirm Password field correctly.');
      return;
    }

    const params = { email: signUpAuthen.email };
    // Call the JSON server to validate
    // Check whether the user exists
    const checkData = await fetchUser(params);
    if (checkData) //Data already exists
    {
      Alert.alert("Email existed", "Please choose another email or sign in with this email.");
      return;
    }

    const hashedPassword = await hashPassword(signUpAuthen.password);
    // If data does not exist, add into the json database
    // If validate successfully, direct the user to Home
    const result = await postUser({
      firstName: '',
      lastName: '',
      username: signUpAuthen.username,
      email: signUpAuthen.email,
      password: hashedPassword,
      address: '',
      phoneNumber: '',
      cart: [],
      order: [],
      favorite: [],
      searchHistory: [],
    });
    if (result) {
      Alert.alert("Sign up successfully", "Congratulations, you have signed up successfully.");
      // Refetch the data to get id
      const params = { email: signUpAuthen.email };
      const getLatestData = await fetchUser(params);
      if (getLatestData && getLatestData.length > 0) {
        setId(getLatestData[0].id);
        setUserData({
          username: getLatestData[0].username,
          firstName: getLatestData[0].firstName,
          lastName: getLatestData[0].lastName,
          address: getLatestData[0].address,
          phoneNumber: getLatestData[0].phoneNumber,
          email: getLatestData[0].email,
        });
        setIsAuthenticated(true);
      }
    } else {
      console.error("Error while inserting data.");
    }
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={'flex flex-1'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView className={'flex flex-1 justify-center items-center'}>
            <View className={'items-center'}>
              <Image
                className={'w-52 h-24 object-contain'}
                source={require('../assets/image/logo_2.png')}
              />
              <Text className={'text-2xl font-medium'}>{t('authentication.sign-up')}</Text>
              <View className={'mt-3 items-center justify-center'}>
                <AntDesignIcon
                  name='user'
                  size={24}
                  color={'gray'}
                  className={'absolute left-2'}
                />
                <TextInput
                  className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                  placeholder={t('authentication.username')}
                  value={signUpAuthen.username}
                  onChangeText={(text) => setSignUpAuthen(prev => ({ ...prev, username: text }))}
                  autoComplete='username'
                />
              </View>
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
                  value={signUpAuthen.email}
                  onChangeText={(text) => setSignUpAuthen(prev => ({ ...prev, email: text }))}
                  autoComplete='email'
                  inputMode='email'
                />
              </View>
              <View className={'mt-3 items-center justify-center'}>
                <AntDesignIcon
                  name='lock'
                  size={24}
                  color={'gray'}
                  className={'absolute left-2'}
                />
                <TextInput
                  className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                  placeholder={t('authentication.password')}
                  secureTextEntry={revealPassword.password ? false : true}
                  value={signUpAuthen.password}
                  onChangeText={(text) => setSignUpAuthen(prev => ({ ...prev, password: text }))}
                />
                <FontAwesome5Icon
                  name={revealPassword.password ? 'eye-slash' : 'eye'}
                  size={20}
                  color={'gray'}
                  className={'absolute right-3'}
                  onPress={() => setRevealPassword((prev) => ({ ...prev, password: !prev.password }))}
                />
              </View>
              <View className={'mt-3 items-center justify-center'}>
                <AntDesignIcon
                  name='lock'
                  size={24}
                  color={'gray'}
                  className={'absolute left-2'}
                />
                <TextInput
                  className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
                  placeholder={t('authentication.confirm-password')}
                  secureTextEntry={revealPassword.retypePassword ? false : true}
                  value={signUpAuthen.retypePassword}
                  onChangeText={(text) => setSignUpAuthen(prev => ({ ...prev, retypePassword: text }))}
                />
                <FontAwesome5Icon
                  name={revealPassword.retypePassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color={'gray'}
                  className={'absolute right-3'}
                  onPress={() => setRevealPassword((prev) => ({ ...prev, retypePassword: !prev.retypePassword }))}
                />
              </View>
              <TouchableOpacity
                onPress={handleSignUp}
                className={'bg-[#0d3092] mt-5 py-3 px-10 rounded-full'}
              >
                <Text className={'text-white text-xl font-bold'}>{t('authentication.create-account')}</Text>
              </TouchableOpacity>
              <Text className={'text-base mt-5'}>{t('authentication.has-account')}
                <Text
                  className={'text-blue-500 font-bold'}
                  onPress={() => {
                    navigation.replace('Login')
                  }}
                > {t('authentication.sign-in')}
                </Text>
              </Text>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}