import React, { useRef, useEffect } from 'react';
import { View, Animated, Text } from 'react-native';

interface Props {
  progress: number;
  height: number;
  color: string;
}

const ProgressBar: React.FC<Props> = ({ progress, height, color }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedValue]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const label = `${Math.round(progress)}%`;

  return (
    <View style={{ height }} className='rounded-xl'>
      <View
        className='w-full h-full relative rounded-xl '
        style={{
          borderRadius: height / 2,
          backgroundColor: '#ccedcf',
        }}
      >
        <Animated.View
          className='absolute h-full absolute '
          style={{
            width,
            borderRadius: height / 2,
            backgroundColor: color,
            zIndex: 1,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            textAlign: 'center',
            lineHeight: `${height}px`,
            fontSize: height * 0.7,
            fontWeight: 'bold',
            color: 'black',
            zIndex: 2,
          }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;
