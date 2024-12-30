import { SafeAreaView, StyleSheet, Animated, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Video } from 'expo-av';
import { ResizeMode } from '../types/resizeEnum.type';

const { height } = Dimensions.get('window');

export default function Plash() {
  const video = React.useRef<Video>(null);
  const [imageAnimation] = useState(new Animated.Value(-200));
  const [videoAnimation] = useState(new Animated.Value(0));
  const [videoOpacity] = useState(new Animated.Value(0));
  const [finalImageAnimation] = useState(new Animated.Value(0));
  const [finalVideoAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    loadAndPlayVideo();
    startImageAnimation();
    startVideoAnimation();

    setTimeout(() => {
      finalAnimations();
    }, 3500);
  }, []);

  const startImageAnimation = () => {
    Animated.timing(imageAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const startVideoAnimation = () => {
    Animated.parallel([
      Animated.timing(videoAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(videoOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const finalAnimations = () => {
    Animated.parallel([
      Animated.timing(finalImageAnimation, {
        toValue: -height / 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(finalVideoAnimation, {
        toValue: height,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loadAndPlayVideo = async () => {
    try {
      if (video.current) {
        await video.current.loadAsync(
          require('../assets/video/plash_screen.mp4'),
          {},
          false
        );
        await video.current.playAsync();
      }
    } catch (error) {
      console.log('Error playing video:', error);
    }
  };

  const handlePlaybackStatusUpdate = (playbackStatus: any) => {
    if (playbackStatus.didJustFinish) {
      if (video.current) video.current.replayAsync();
    }
  };

  return (
    <SafeAreaView className="flex-1 pb-32 flex-col gap-5 items-center justify-center bg-white">
      <Animated.Image
        source={require('../assets/image/logo_4.png')}
        className="w-[150] h-[60]"
        resizeMode="contain"
        style={{
          transform: [
            {
              translateY: Animated.add(imageAnimation, finalImageAnimation),
            },
          ],
        }}
      />
      <Animated.View
        style={{
          width: '100%',
          height: 330,
          transform: [
            { scale: videoAnimation },
            { translateY: finalVideoAnimation },
          ],
          opacity: videoOpacity,
        }}
      >
        <Video
          ref={video}
          style={styles.video}
          source={require('../assets/video/plash_screen.mp4')}
          shouldPlay={true}
          isLooping={true}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          isMuted={true}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
