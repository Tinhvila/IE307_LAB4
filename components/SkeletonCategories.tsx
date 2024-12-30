import React from 'react';
import { View, Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const SkeletonLoader = () => {
  const { width } = Dimensions.get('window');

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-3 py-3">
        <ContentLoader
          width={120}
          height={24}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="120" height="24" />
        </ContentLoader>

        <ContentLoader
          width={24}
          height={24}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <Rect x="0" y="0" rx="4" ry="4" width="24" height="24" />
        </ContentLoader>
      </View>

      <View className="flex-row px-3 mb-2">
        <ContentLoader
          width={width - 24}
          height={40}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {[0, 1, 2, 3].map((item, index) => (
            <Rect
              key={index}
              x={`${index * (width / 4 + 10)}`}
              y="0"
              rx="4"
              ry="4"
              width={width / 4}
              height="40"
            />
          ))}
        </ContentLoader>
      </View>

      <View className="flex-row flex-wrap px-2 justify-between">
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <View key={index} className="w-[50%] p-1">
            <ContentLoader
              width={width / 2 - 20}
              height={300}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <Rect x="0" y="0" rx="4" ry="4" width="100%" height="200" />

              <Rect x="10" y="210" rx="4" ry="4" width="80%" height="16" />

              <Rect x="10" y="240" rx="4" ry="4" width="50%" height="20" />

              <Rect x="10" y="270" rx="4" ry="4" width="100" height="16" />
            </ContentLoader>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SkeletonLoader;
