import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ProductItem from './ProductItem';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigationParamList, ItemDetailsScreenRouteProp, ItemsListScreenNavigationProp, ItemsListScreenRouteProp } from '../types/navigation';
import { ItemProps } from '../types/types';

const ListView = ({ title, data, limitDisplay, idValue }: { title: string, data: ItemProps[], limitDisplay?: number, idValue?: number }) => {
  const navigation = useNavigation<ItemsListScreenNavigationProp>();

  return (
    <View>
      <View className={'mx-4 flex flex-row justify-between items-center'}>
        <Text className={"text-2xl font-bold text-orange-500 py-3"}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Categories', { value: idValue ? idValue : 0 })}
        >
          <AntDesignIcon name={'appstore1'} size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className={'flex'}>
        <View className={'flex flex-row mx-4'}>
          {limitDisplay || (typeof limitDisplay === 'number' && limitDisplay > 0)
            ? data.slice(0, limitDisplay).map((item, index, data) => {
              return (
                <View className={'w-52'} key={item.id}>
                  <ProductItem props={
                    {
                      id: item.id,
                      image: item.image,
                      title: item.title,
                      description: item.description,
                      initialPrice: item.initialPrice,
                      discountPrice: item.discountPrice,
                      rating: item.rating,
                    }
                  } />
                </View>
              );
            })
            :
            data.map((item, index, data) => {
              return (
                <View className={'w-52'} key={item.id}>
                  <ProductItem props={
                    {
                      id: item.id,
                      image: item.image,
                      title: item.title,
                      description: item.description,
                      initialPrice: item.initialPrice,
                      discountPrice: item.discountPrice,
                      rating: item.rating,
                    }
                  } />
                </View>
              );
            })
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default ListView;