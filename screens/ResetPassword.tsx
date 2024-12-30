import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import fetchUser, { patchUser } from '../api/fetchUser';
import { hashPassword } from '../utils/hashPassword';

export default function ResetPassword({ route }: { route: any }) {
  const { email } = route.params;
  const navigation = useNavigation();
  const [passwordData, setPasswordData] = React.useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPassword, setShowPassword] = React.useState({
    showNewPassword: false,
    showConfirmNewPassword: false,
  });

  const handleGoBack = () => {
    Alert.alert('Abort resetting password', 'Are you sure you want to abort resetting password?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        style: 'destructive',
        onPress: () => { navigation.goBack(); }
      }
    ]);
  };

  const handleResetPassword = async () => {
    // Check whether two passwords are the same
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      Alert.alert('Password mismatch', 'Password does not match, please try again');
      return;
    }

    // Get Id from the given email
    const params = { email };
    const checkData = await fetchUser(params);

    // Data does not exist or can't be fetched
    if (!checkData || checkData.length < 0) {
      Alert.alert("Fetch data failed", "Please try again later");
      return;
    }

    const id = checkData[0].id;
    const hashedPassword = await hashPassword(passwordData.newPassword);
    const result = await patchUser(String(id), {
      password: hashedPassword
    });

    if (result) {
      Alert.alert('Reset password successfully', 'You have reset your password successfully!');
      navigation.goBack();
    }
    else {
      console.log('Error while patching data');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className={'flex-1'}>
        <View className={'flex-row items-center'}>
          <TouchableOpacity
            className={'ml-3'}
            onPress={handleGoBack}
          >
            <AntDesignIcon name={'left'} size={20} />
          </TouchableOpacity>
          <Text className={'text-xl font-bold text-black px-2 py-3'}>Back</Text>
        </View>
        <View className={'flex flex-1 justify-center items-center'}>
          <Text className={'text-xl font-bold text-black px-2 py-3'}>Reset Password</Text>
          <Text>Enter your new password and retype password</Text>
          <View className={'mt-3 items-center justify-center'}>
            <AntDesignIcon
              name='lock'
              size={24}
              color={'gray'}
              className={'absolute left-2'}
            />
            <TextInput
              className={'border-2 rounded-xl border-gray-300 w-80 pl-[30px] pr-2 py-3'}
              placeholder='New Password'
              secureTextEntry={showPassword.showNewPassword ? false : true}
              value={passwordData.newPassword}
              onChangeText={(text) => setPasswordData((prev) => ({ ...prev, newPassword: text }))}
            />
            <FontAwesome5Icon
              name={showPassword.showNewPassword ? 'eye-slash' : 'eye'}
              size={20}
              color={'gray'}
              className={'absolute right-3'}
              onPress={() => setShowPassword((prev) => ({ ...prev, showNewPassword: !prev.showNewPassword }))}
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
              placeholder='Confirm Password'
              secureTextEntry={showPassword.showConfirmNewPassword ? false : true}
              value={passwordData.confirmNewPassword}
              onChangeText={(text) => setPasswordData((prev) => ({ ...prev, confirmNewPassword: text }))}
            />
            <FontAwesome5Icon
              name={showPassword.showConfirmNewPassword ? 'eye-slash' : 'eye'}
              size={20}
              color={'gray'}
              className={'absolute right-3'}
              onPress={() => setShowPassword((prev) => ({ ...prev, showConfirmNewPassword: !prev.showConfirmNewPassword }))}
            />
          </View>
          <TouchableOpacity
            className={`bg-[#0d3092] mt-5 py-3 px-10 rounded-full 
              ${passwordData.newPassword === '' || passwordData.confirmNewPassword === '' ? 'opacity-50' : ''}`}
            disabled={passwordData.newPassword === '' || passwordData.confirmNewPassword === '' ? true : false}
            onPress={handleResetPassword}
          >
            <Text className={'text-white text-xl font-bold'}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}