import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

type OverlayProps = {
  loading: boolean;
};

const OverlayLoading: React.FC<OverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="black" />
      <Text style={styles.loadingText}>Đang tải...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default OverlayLoading;
