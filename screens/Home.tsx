import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomCarousel from '../components/CustomCarousel';
import { ItemProps } from '../types/types';
import { AuthenticationContext } from '../context/context';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import { fetchCartItems } from '../redux/cartSlice';
import { jwtDecode } from 'jwt-decode';

const { width: windowWidth } = Dimensions.get('window');
const CarouselItem = ({ item }: { item: any }) => {
  return (
    <View>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: windowWidth, height: 208 }}
      />
    </View>
  );
};

export default function Home() {
  const { t } = useTranslation();
  const [carouselData, setCarouselData] = React.useState<any>([]);
  const [hotDealData, setHotDealData] = React.useState<ItemProps[]>([]);
  const [newArrivalData, setNewArrivalData] = React.useState<ItemProps[]>([]);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useContext(AuthenticationContext);
  const decoded = jwtDecode(token);
  const id = Number(decoded.sub);

  useEffect(() => {
    if (id) {
      dispatch(fetchCartItems(id));
    }
  }, []);

  React.useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        setLoading(false);
        const getRandomItems = (items: any, count: any) => {
          return items.sort(() => 0.5 - Math.random()).slice(0, count);
        };
        setHotDealData(getRandomItems(data, 5));
        setNewArrivalData(getRandomItems(data, 5));
      } catch (error) {
        console.log('Error fetcing products:', error);
      }
    };

    fetchAllProduct();
    setCarouselData([
      {
        id: '1',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1661645473770-90d750452fa0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Electronics',
      },
      {
        id: '2',
        imageUrl:
          'https://images.unsplash.com/photo-1533632638678-bb4b484689a7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Jewelry',
      },
      {
        id: '3',
        imageUrl:
          'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: "Men's Clothing",
      },
      {
        id: '4',
        imageUrl:
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: "Women's Clothing",
      },
    ]);
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const combinedData = [
    { type: 'header', data: null },
    { type: 'carousel', data: carouselData },
    { type: 'hotDeals', data: hotDealData },
    { type: 'newArrivals', data: newArrivalData },
  ];

  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View className={'justify-between items-center flex-row '}>
          <Text className="text-xl font-bold mx-auto text-black px-2 py-3">
            Shop for quantity, Shop for style
          </Text>
        </View>
      );
    } else if (item.type === 'carousel') {
      return (
        <>
          <Text className={'text-2xl font-bold text-orange-500 px-4 py-3'}>
            {t('home.check-out')}
          </Text>
          <View className={'h-64'}>
            <CustomCarousel
              data={item.data}
              render={({ item }) => <CarouselItem item={item} />}
            />
          </View>
        </>
      );
    } else if (item.type === 'hotDeals') {
      return (
        <>
          <Text className="text-2xl font-bold text-orange-500 py-3">
            {t('home.hot-deals')}
          </Text>
          <FlatList
            data={item.data}
            numColumns={2}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={21}
            renderItem={({ item }) => (
              <View className="w-[50%]">
                <ProductItem props={item} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      );
    } else if (item.type === 'newArrivals') {
      return (
        <>
          <Text className="text-2xl font-bold text-orange-500 py-3">
            {t('home.new-arrival')}
          </Text>
          <FlatList
            data={item.data}
            numColumns={2}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={21}
            renderItem={({ item }) => (
              <View className="w-[50%]">
                <ProductItem props={item} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      );
    }
    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1">
        <FlatList
          data={combinedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
