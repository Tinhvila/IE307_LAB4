import { useFocusEffect } from '@react-navigation/native';
import React, { JSXElementConstructor, ReactElement } from 'react'
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { ItemProps } from '../types/types';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function CustomCarousel(
  { data,
    render,
    autoSlideInterval = 3000,
  }: {
    data: any[],
    render: (item: any) => ReactElement,
    autoSlideInterval?: number
  }) {
  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef<number | null>(index);
  indexRef.current = index;

  const flatListRef = React.useRef<FlatList>(null);

  const onScroll = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  // Update index after a certain duration for automatic sliding
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;

        if (nextIndex === 0)
          flatListRef.current?.scrollToIndex({ index: 0, animated: true });
        return nextIndex;
      });
    }, autoSlideInterval); // Change slide every `autoSlideInterval` ms

    // Cleanup the interval on component unmount or change
    return () => clearInterval(interval);
  }, [autoSlideInterval, data.length]);

  // Sync FlatList scroll to the current index
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [index]);

  // Reset the carousel state when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Reset the index when the screen comes into focus
      setIndex(0);
    }, [])
  );

  // Optimize the slider
  const flatListOptimizationProps = {
    initialNumToRender: 5,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 5,
    keyExtractor: React.useCallback((e: { id: string; }) => e.id, []),
    getItemLayout: React.useCallback(
      (_: any, index: number) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      style={{ flex: 1 }}
      renderItem={render}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      {...flatListOptimizationProps}
    />
  );
}