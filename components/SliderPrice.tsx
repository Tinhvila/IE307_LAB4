import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ItemProps } from '../types/types';
import { formatPrice } from '../utils/formatPrice';

interface Props {
  data: ItemProps[];
  priceRange: number[];
  handleSetPriceRange: (values: number[]) => void;
}

const PriceSlider: React.FC<Props> = ({
  data,
  priceRange,
  handleSetPriceRange,
}) => {
  const { minPrice, maxPrice } =
    data.length > 0
      ? data.reduce(
          (acc, product) => ({
            minPrice: Math.min(acc.minPrice, product.discountPrice),
            maxPrice: Math.max(acc.maxPrice, product.discountPrice),
          }),
          { minPrice: Infinity, maxPrice: -Infinity }
        )
      : { minPrice: 0, maxPrice: 5000 };

  const min = minPrice;
  const max = maxPrice;

  const [values, setValues] = useState<number[]>([min, max]);
  const [isSliding, setIsSliding] = useState(false);
  const tempValues = useRef<number[]>([min, max]);

  useEffect(() => {
    setValues(priceRange);
    tempValues.current = priceRange;
  }, [priceRange]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    tempValues.current = newValues;
    setIsSliding(true);
  };

  const handleValuesChangeFinish = () => {
    if (isSliding) {
      handleSetPriceRange(tempValues.current);
      setIsSliding(false);
    }
  };

  return (
    <View className="box-border border-gray-300 items-center w-full">
      <View className="flex-row justify-between w-[100%]">
        <Text className="text-[#21243d] text-xs font-semibold">
          {formatPrice(values[0])}
        </Text>
        <Text className="text-[#21243d] text-xs font-semibold">
          {formatPrice(values[1])}
        </Text>
      </View>
      <View className="w-full items-center">
        <MultiSlider
          values={values}
          min={min}
          max={max}
          step={1000}
          onValuesChange={handleChange}
          onValuesChangeFinish={handleValuesChangeFinish}
          sliderLength={260}
          customMarker={() => (
            <View
              className="w-8 h-8 bg-white border border-gray-300 rounded-full shadow-md"
              style={{
                shadowColor: '#252c61',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 4 },
              }}
            />
          )}
          selectedStyle={{ backgroundColor: 'black' }}
          unselectedStyle={{ backgroundColor: 'rgba(65, 66, 71, 0.08)' }}
          trackStyle={{ height: 4 }}
        />
      </View>
    </View>
  );
};

export default PriceSlider;
