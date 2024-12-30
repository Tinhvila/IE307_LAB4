import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ItemProps } from '../types/types'
import ProductItem from '../components/ProductItem'
import { useTranslation } from 'react-i18next'
import { ItemsListScreenRouteProp } from '../types/navigation'
import { useNavigation } from '@react-navigation/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import fetchProductData from '../api/fetchProductData'

export default function ItemsListScreen({ route }: { route: any }) {
  const { t } = useTranslation();
  const { value, id } = route.params;
  const ITEMS_PER_PAGE = 8;
  const navigation = useNavigation();
  const [allData, setAllData] = React.useState<ItemProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [displayedData, setDisplayedData] = React.useState<ItemProps[]>([]);
  const [hasMoreData, setHasMoreData] = React.useState(true);
  const [noResult, setNoResult] = React.useState(false);

  // Load data from searched product
  React.useEffect(() => {
    const getData = async () => {
      let params = {};
      if (id)
        params = { filterId: id };
      else
        params = { filterTitle: value };
      const filteredData = await fetchProductData(params);
      if (!filteredData.data || filteredData.data.length === 0) {
        setNoResult(true);
        return;
      }
      setAllData(filteredData.data);
      setDisplayedData(filteredData.data.slice(0, ITEMS_PER_PAGE));
    }

    getData();
  }, [value]);

  const loadMoreItems = () => {
    if (loading || !hasMoreData) return;

    const currentLength = displayedData.length;
    const nextItems = allData.slice(
      currentLength,
      currentLength + ITEMS_PER_PAGE
    );

    if (nextItems.length === 0) {
      setHasMoreData(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setDisplayedData((prev) => [...prev, ...nextItems]);
      setLoading(false);
    }, 500);
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isNearBottom) {
      loadMoreItems();
    }
  };

  if (noResult) {
    return (
      <SafeAreaView className={'flex'}>
        <View className={'flex flex-row items-center'}>
          <TouchableOpacity
            className={'pl-4'}
            onPress={() => navigation.goBack()}
          >
            <AntDesignIcon name={'left'} size={20} />
          </TouchableOpacity>
          <Text className="text-xl text-black pl-4 pr-6 py-3 line-clamp-1">
            Search result for <Text className={'font-bold'}>"{value}"</Text>
          </Text>
        </View>
        <View className={'justify-center items-center'}>
          <Text className={'font-bold text-xl'}>No result found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className={'flex flex-row items-center'}>
        <TouchableOpacity
          className={'pl-4'}
          onPress={() => navigation.goBack()}
        >
          <AntDesignIcon name={'left'} size={20} />
        </TouchableOpacity>
        <Text className="text-xl text-black pl-4 py-3 line-clamp-1">
          Search result for <Text className={'font-bold'}>"{value}"</Text>
        </Text>
      </View>
      {/* Display items here with map */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-2"
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
      >
        <View className="flex-column flex-wrap justify-between">
          <View className="flex-row flex-wrap justify-between">
            {displayedData.map((item, index) => (
              <View className="w-[50%]" key={index}>
                <ProductItem props={item} />
              </View>
            ))}

            {loading && (
              <View className="w-full items-center py-4">
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}

            {!hasMoreData && (
              <View className="w-full items-center py-4">
                <Text className="text-gray-500">No more items to load</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}