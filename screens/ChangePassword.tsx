import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthenticationContext } from '../context/context';
import fetchUser, { patchUser } from '../api/fetchUser';
import { comparePassword, hashPassword } from '../utils/hashPassword';
import { ProfileStackNavigationProp } from '../types/navigation';
import { useTranslation } from 'react-i18next';

export default function ChangePassword() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { id } = React.useContext(AuthenticationContext);
  const [passwordData, setPasswordData] = React.useState({
    oldPassword: '',
    newPassword: '',
    retypeNewPassword: '',
  });

  const [showPassword, setShowPassword] = React.useState({
    oldPassword: false,
    newPassword: false,
    retypeNewPassword: false,
  });

  const handleConfirm = async () => {
    // Missing field
    if (passwordData.newPassword === '' || passwordData.oldPassword === '' || passwordData.retypeNewPassword === '') {
      Alert.alert('Missing field', 'Please enter all field input.');
      return;
    }

    // New password mismatch
    if (passwordData.newPassword !== passwordData.retypeNewPassword) {
      Alert.alert('Password does not match', 'Please re-enter your new password and retype password correctly');
      return;
    }

    // Fetch the id to get password hashed
    const params = { id };
    const getData = await fetchUser(params);

    if (getData && getData.length > 0) {
      const oldHashedPassword = getData[0].password;
      // Check if the current password matches the old hashed password
      const isMatch = await comparePassword(passwordData.oldPassword, oldHashedPassword);
      if (!isMatch) {
        Alert.alert('Old password does not match', 'Please retype your old password again.');
        return;
      }
    }
    else {
      console.error('Error while fetching data');
      Alert.alert('Error while fetching data');
      return;
    }

    // After password matched, store a new password with PATCH update
    const newHashedPassword = await hashPassword(passwordData.newPassword);
    const result = await patchUser(String(id), {
      password: newHashedPassword,
    });
    if (result) {
      Alert.alert("Update successfully", "You have updated your new password.");
      navigation.replace('Profile');
    } else {
      console.error('Error while patching data');
    }
  }

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
          <Text className={'text-xl font-bold text-black px-2 py-3'}>{t('profile.change-password')}</Text>
        </View>
        <View className={'mx-6 gap-3'}>
          <View>
            <Text>{t('profile.current-password')}</Text>
            <View className={'flex-row items-center'}>
              <TextInput
                secureTextEntry={showPassword.oldPassword ? false : true}
                value={passwordData.oldPassword}
                onChangeText={(text) => setPasswordData((prev) => ({ ...prev, oldPassword: text }))}
                placeholder={t('profile.current-password')}
                className={'border-2 rounded-xl border-gray-300 w-80 p-3'} />
              <FontAwesome5Icon
                name={showPassword.oldPassword ? 'eye-slash' : 'eye'}
                size={20}
                color={'gray'}
                className={'right-10'}
                onPress={() => setShowPassword((prev) => ({ ...prev, oldPassword: !showPassword.oldPassword }))}
              />
            </View>
          </View>
          <View>
            <Text>{t('profile.new-password')}</Text>
            <View className={'flex-row items-center'}>
              <TextInput
                secureTextEntry={showPassword.newPassword ? false : true}
                value={passwordData.newPassword}
                onChangeText={(text) => setPasswordData((prev) => ({ ...prev, newPassword: text }))}
                placeholder={t('profile.new-password')}
                className={'border-2 rounded-xl border-gray-300 w-80 p-3'} />
              <FontAwesome5Icon
                name={showPassword.newPassword ? 'eye-slash' : 'eye'}
                size={20}
                color={'gray'}
                className={'right-10'}
                onPress={() => setShowPassword((prev) => ({ ...prev, newPassword: !showPassword.newPassword }))}
              />
            </View>
          </View>
          <View>
            <Text>{t('profile.retype-new-password')}</Text>
            <View className='flex-row items-center'>
              <TextInput
                secureTextEntry={showPassword.retypeNewPassword ? false : true}
                value={passwordData.retypeNewPassword}
                onChangeText={(text) => setPasswordData((prev) => ({ ...prev, retypeNewPassword: text }))}
                placeholder={t('profile.retype-new-password')}
                className={'border-2 rounded-xl border-gray-300 w-80 p-3'} />
              <FontAwesome5Icon
                name={showPassword.retypeNewPassword ? 'eye-slash' : 'eye'}
                size={20}
                color={'gray'}
                className={'right-10'}
                onPress={() => setShowPassword((prev) => ({ ...prev, retypeNewPassword: !showPassword.retypeNewPassword }))}
              />
            </View>
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