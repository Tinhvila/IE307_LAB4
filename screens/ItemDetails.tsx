import { View, Text, Image, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { ItemProps } from '../types/types';

export default function ItemDetails() {
  const route = useRoute();
  const { productId } = route.params;
  const { t } = useTranslation();
  const [product, setProduct] = useState<ItemProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className="w-full">
      <View className="w-full">
        {product?.image && (
          <Image
            source={{ uri: product.image }}
            alt={`Source: ${product.image}`}
            className="bg-contain w-full aspect-square"
          />
        )}
      </View>
      <View className="w-full p-2 box-border flex-col gap-2">
        <View className="flex-row justify-between">
          <Text className="font-bold w-[90%] text-2xl">{product?.title}</Text>
        </View>
        <View className="flex flex-row items-center">
          <Text className="">{product?.description}</Text>
        </View>
        <View className="flex flex-row items-center justify-between ">
          <View className="flex flex-row">
            <Text className=" font-bold text-lg">Price: ${product?.price}</Text>
          </View>
        </View>
        <View>
          <View className="flex-row items-center ">
            <Text className="  font-bold text-lg mr-2">
              Rating: {product?.rating.rate}
            </Text>
            <Image
              source={require('../assets/image/star.png')}
              className="h-5 w-5 mr-1"
            />
            <Text className="text-lg font-bold mr-2">
              ({product?.rating.count} reviews)
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
