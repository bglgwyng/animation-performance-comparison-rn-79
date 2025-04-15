import { Image, StyleSheet, Platform, View, Animated } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { times } from 'ramda';
import { useEffect } from 'react';

const positions = times(() => new Animated.ValueXY({x: 0, y: 0}))(100)
export default function HomeScreen() {

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.parallel(positions.map(position => Animated.timing(position, {
        toValue: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
        duration: 100,
        useNativeDriver: false,
      }))).start();
    
    }, 100);

    return () => clearInterval(interval);
  })
  
  
  return (
    <View style={{flex: 1}}>
      {positions.map((position, index) => (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: 'white',
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
