import { StyleSheet, View } from 'react-native';
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming, SharedValue, makeMutable } from 'react-native-reanimated';

import { times } from 'ramda';
import { useEffect } from 'react';

// Create an array of 100 position objects, each with shared values for x and y
const positions = times(() => ({
  x: makeMutable(0),
  y: makeMutable(0)
}))(200)
export default function HomeScreen() {

  useEffect(() => {
    const interval = setInterval(() => {
      // Update each position with new random values
      positions.forEach(position => {
        position.x.value = withTiming(Math.random() * 500, { duration: 100 });
        position.y.value = withTiming(Math.random() * 500, { duration: 100 });
      });
    }, 100);

    return () => clearInterval(interval);
  }, [])
  
  
  return (
    <View style={{flex: 1}}>
      {positions.map((position, index) => (
        <AnimatedBox 
          key={index} 
          x={position.x} 
          y={position.y} 
        />
      ))}
    </View>
  );
}

// Animated Box Component
type AnimatedBoxProps = {
  x: SharedValue<number>;
  y: SharedValue<number>;
};

const AnimatedBox = ({ x, y }: AnimatedBoxProps) => {
  // Create animated style for the box
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: x.value,
      top: y.value,
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: 'red',
    };
  });

  return <Reanimated.View style={animatedStyle} />;
};

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
