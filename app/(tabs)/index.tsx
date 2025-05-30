import { Button, StyleSheet, View } from 'react-native';
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming, SharedValue, makeMutable, SlideInDown, SlideOutLeft, LayoutAnimationFunction, EntryExitAnimationFunction, SlideOutRight } from 'react-native-reanimated';

import { times } from 'ramda';
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';

// Create an array of 100 position o
export default function HomeScreen() {  
  const [state, setState] = useState(true);
  const animationState = useSharedValue(true);

  
  return (
    <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
      {state && <Animated.View exiting={createConditionalLayoutAnimation(SlideOutLeft.build(), SlideOutRight.build(), animationState)} style={{width:100,height: 100, backgroundColor:"red"}} />}
      <Button
        title="toggle render"
        onPress={() => {
          setState((x) => !x);
        }}
      />
      <Button
        title="toggle animation"
        onPress={() => {
          animationState.value = !animationState.value;
        }}
      />
    </View>
  );
}

function createConditionalLayoutAnimation(
  animation1: EntryExitAnimationFunction,
  animation2: EntryExitAnimationFunction,
  condition: SharedValue<boolean>,
): EntryExitAnimationFunction {
  return (values) => {
    "worklet";

    return condition.value ? animation1(values) : animation2(values);
  };
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
