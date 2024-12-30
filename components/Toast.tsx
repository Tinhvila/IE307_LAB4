import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

interface ToastProps {
  message: string;
  duration?: number;
  isVisible: boolean;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  isVisible,
  onDismiss,
}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onDismiss();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View
      className="absolute self-center top-32 px-6 py-3 bg-gray-700 rounded-lg z-[10000]"
      style={{
        opacity: fadeAnim,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text className="text-white text-center text-lg">{message}</Text>
    </Animated.View>
  );
};

export default Toast;
