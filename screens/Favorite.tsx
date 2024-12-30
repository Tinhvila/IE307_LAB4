import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { AuthenticationContext } from '../context/context';
import { useTranslation } from 'react-i18next';
import { clearFavorites } from '../redux/favoriteSlice';
import OverlayLoading from '../components/OverlayLoading';
import { useToast } from '../components/toastContext';
import { useNavigation } from '@react-navigation/native';
import FavoriteItem from '../components/FavoriteItem';

export default function Favorite() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = React.useContext(AuthenticationContext);
  const { items: favoriteItems, loading } = useSelector(
    (state: RootState) => state.favorite
  );
  const navigation = useNavigation();
  const { showToast } = useToast();

  function handleClearFavorites() {
    Alert.alert(t('alert.confirm'), t('alert.clear-favorites'), [
      {
        text: t('alert.no'),
        onPress: () => console.log('Cancel'),
      },
      {
        text: t('alert.yes'),
        onPress: () => {
          dispatch(clearFavorites(id));
          showToast(t('messages.clear-favorites'));
        },
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1">
      <OverlayLoading loading={loading} />
      {favoriteItems?.length > 0 ? (
        <>
          <TouchableOpacity
            onPress={handleClearFavorites}
            className={`my-4 rounded-md ml-auto mx-4 w-1/2 border-b border-2 border-black items-center
                     bg-black `}
          >
            <Text
              className={`px-4 py-2  text-base font-medium
                      text-white`}
            >
              {t('favorites.clear-favorites')}
            </Text>
          </TouchableOpacity>
          <ScrollView className="px-2 flex flex-col gap-2">
            {favoriteItems.map((item) => (
              <FavoriteItem key={item.id} product={item} />
            ))}
          </ScrollView>
        </>
      ) : (
        <View className="flex flex-col justify-start items-center">
          <Image
            source={require('../assets/image/8062127.webp')}
            className="w-48 h-48"
          />
          <Text>{t('favorites.favorites-empty-message')}</Text>
          <View className="px-3 border-b-gray-200 w-[50%] mt-3">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeStack');
              }}
              className={`mt-2 rounded-md border-2 border-black items-center
                    bg-black `}
            >
              <Text
                className={`px-4 py-2 text-base font-medium
                     text-white`}
              >
                {t('common.back-to-home')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
