import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n.config';
import { AuthenticationContext } from '../context/context';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackNavigationProp } from '../types/navigation';

export default function Profile() {
  const { t } = useTranslation();
  const { setIsAuthenticated, setId } = React.useContext(AuthenticationContext);
  const { userData } = React.useContext(AuthenticationContext);
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { setLanguage } = React.useContext(AuthenticationContext);
  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage === 'en' ? 'English' : 'Vietnamese');
  };

  const handleLogout = () => {
    setId('');
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-xl font-bold text-black px-2 py-3">
        {t('main.profile')}
      </Text>
      <View className="bg-gray-200 w-full p-3">
        <View className={'flex-row items-center gap-3'}>
          <View
            className={
              'rounded-full bg-gray-400 w-24 h-24 items-center justify-center'
            }
          >
            <Text className={'font-bold text-5xl'}>
              {userData.username.at(0)?.toUpperCase()}
            </Text>
          </View>
          <View>
            <Text
              className={'text-2xl font-bold'}
            >{`${userData.firstName} ${userData.lastName}`}</Text>
            <Text className={'text-base'}>({userData.username})</Text>
          </View>
        </View>
        <View className={'px-3 py-3'}>
          <Text className={'text-base'}>
            <AntDesignIcon name="mail" size={20} color={'black'} />{' '}
            {userData.email}
          </Text>
          <Text className={'text-base'}>
            <AntDesignIcon name="phone" size={20} color={'black'} />{' '}
            {userData.phoneNumber}
          </Text>
          <Text className={'text-base'}>
            <AntDesignIcon name="home" size={20} color={'black'} />{' '}
            {userData.address}
          </Text>
        </View>
      </View>
      <View className={'flex justify-around items-start flex-row mt-1'}>
        <View className={'w-[50%]'}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Favorite')}
            className={'justify-center items-center bg-gray-300 p-5 m-1'}
          >
            {/* tagso */}
            <AntDesignIcon name="heart" size={32} />
            <Text className={'mt-1 text-lg'}>{t('profile.favorite')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changeLanguage}
            className={'justify-center items-center bg-gray-300 p-5 m-1'}
          >
            <IoniconsIcon name="language" size={32} />
            <Text className={'mt-1 text-lg'}>
              {t('profile.change-language')}
            </Text>
          </TouchableOpacity>
        </View>
        <View className={'w-[50%]'}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            className={'justify-center items-center bg-gray-300 p-5 m-1'}
          >
            <AntDesignIcon name="edit" size={32} />
            <Text className={'mt-1 text-lg'}>{t('profile.edit-profile')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className={'justify-center items-center bg-gray-300 p-5 m-1'}
          >
            <AntDesignIcon name="logout" size={32} />
            <Text className={'mt-1 text-lg'}>{t('profile.log-out')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
