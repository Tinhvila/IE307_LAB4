import { View, Text, Image, ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AuthenticationStackNavigationProp } from '../types/navigation'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'react-native-element-dropdown'
import { AuthenticationContext } from '../context/context'
import i18n from '../utils/i18n.config'


const languageLabel = [
  { label: '🇬🇧 EN', value: 'en' },
  { label: '🇻🇳 VI', value: 'vi' },
];

export default function Intro() {
  const navigation = useNavigation<AuthenticationStackNavigationProp>();
  const { t } = useTranslation();
  const { language, setLanguage } = React.useContext(AuthenticationContext);
  const [, setIsFocusLanguage] = React.useState(false);

  return (
    <ImageBackground
      source={require('../assets/image/background.png')}
      className={'flex-1'}
    >
      <SafeAreaView className={'flex-1 items-center'}>
        <View className={'w-full items-end mr-10'}>
          <Dropdown
            data={languageLabel}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Choose language"
            value={language === 'English' ? 'en' : 'vi'}
            onChange={(item) => {
              i18n.changeLanguage(item.value);
              setLanguage(item.value === 'en' ? 'English' : 'Vietnamese');
              setIsFocusLanguage(false);
            }}
          />
        </View>
        <View className={'flex-1 items-center mt-20'}>
          <Image
            className={'w-52 h-24 object-contain'}
            source={require('../assets/image/logo_2.png')}
          />
          <Text className={'mb-10 text-white text-center font-medium text-2xl'}>{t('authentication.intro-title')}</Text>
        </View>
        <View className={'flex-1 justify-end mb-20 w-full px-10'}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className={'bg-white px-5 py-3 items-center rounded-full'}
          >
            <Text className={'text-3xl text-[#0d3092]'}>{t('authentication.login')}</Text>
          </TouchableOpacity>
          <View className={'mt-5'} />
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className={'border-white border-2 px-5 py-3 items-center rounded-full'}
          >
            <Text className={'text-3xl text-white'}>{t('authentication.sign-up')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  dropdown: {
    width: 90,
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 4,
    backgroundColor: '#fafafa',
    fontSize: 14,
    borderRadius: 20,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});