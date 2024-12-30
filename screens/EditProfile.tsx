import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../context/context';
import { patchUser } from '../api/fetchUser';
import * as Yup from 'yup';
import { ProfileStackNavigationProp } from '../types/navigation';
import { useTranslation } from 'react-i18next';

export default function EditProfile() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { id } = React.useContext(AuthenticationContext);
  const { userData, setUserData } = React.useContext(AuthenticationContext);
  const [data, setData] = React.useState(userData);


  const handleConfirm = async () => {
    // Handle empty field
    if (
      data.firstName === ''
      || data.lastName === ''
      || data.username === ''
      || data.phoneNumber === ''
      || data.address === ''
      || data.email === '') {
      Alert.alert("Detected empty field", 'Please fill all the sign up field.');
      return;
    }

    // Check if the email is valid or not
    const emailSchema = Yup.string().email('Invalid email format');
    const validateEmail = async () => {
      try {
        // Attempt to validate the email
        await emailSchema.validate(data.email);
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

    // Update the data
    const result = await patchUser(String(id), {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
    });
    if (result) {
      Alert.alert("Update successfully", "You have updated profile.");
      setUserData(data);
      navigation.goBack();
    } else {
      console.error('Error while patching data');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className={'flex-1'}>
        <View className={'flex-row items-center justify-between'}>
          <View className={'flex-row items-center'}>
            <TouchableOpacity
              className={'ml-3'}
              onPress={() => navigation.goBack()}
            >
              <AntDesignIcon name={'left'} size={20} />
            </TouchableOpacity>
            <Text className={'text-xl font-bold text-black px-2 py-3'}>{t('profile.edit-profile')}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <Text className={'text-xl font-bold text-blue-500 px-2 py-3'}>{t('profile.change-password')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className={'mx-6 gap-3'}>
          <View>
            <Text>{t('profile.username')}</Text>
            <TextInput
              value={data.username}
              onChangeText={(text) => setData((prev) => ({ ...prev, username: text }))}
              placeholder='Username'
              className={'border-2 rounded-xl border-gray-300 w-80 p-3'}
              autoComplete='username'
            />
          </View>
          <View className={'flex-row gap-5'}>
            <View>
              <Text>{t('profile.first-name')}</Text>
              <TextInput
                value={data.firstName}
                onChangeText={(text) => setData((prev) => ({ ...prev, firstName: text }))}
                placeholder='First name'
                className={'border-2 rounded-xl border-gray-300 w-36 p-3'}
                autoComplete='given-name'
              />
            </View>
            <View>
              <Text>{t('profile.last-name')}</Text>
              <TextInput
                value={data.lastName}
                onChangeText={(text) => setData((prev) => ({ ...prev, lastName: text }))}
                placeholder='Last name'
                className={'border-2 rounded-xl border-gray-300 w-36 p-3'}
                autoComplete='family-name'
              />
            </View>
          </View>
          <View>
            <Text>{t('profile.email')}</Text>
            <TextInput
              value={data.email}
              onChangeText={(text) => setData((prev) => ({ ...prev, email: text }))}
              placeholder='Email'
              className={'border-2 rounded-xl border-gray-300 w-80 p-3'}
              autoComplete='email'
              inputMode='email'
            />
          </View>
          <View>
            <Text>{t('profile.address')}</Text>
            <TextInput
              value={data.address}
              onChangeText={(text) => setData((prev) => ({ ...prev, address: text }))}
              placeholder='Address'
              className={'border-2 rounded-xl border-gray-300 w-80 p-3'}
            />
          </View>
          <View>
            <Text>{t('profile.phone-number')}</Text>
            <TextInput
              value={data.phoneNumber}
              onChangeText={(text) => setData((prev) => ({ ...prev, phoneNumber: text }))}
              placeholder='Phone number'
              inputMode='numeric'
              className={'border-2 rounded-xl border-gray-300 w-80 p-3'}
              autoComplete='tel'
            />
          </View>
          <TouchableOpacity
            onPress={handleConfirm}
            className={'bg-black items-center rounded-lg mt-5'}>
            <Text className={'text-white p-3 font-bold'}>{t('button.confirm')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}