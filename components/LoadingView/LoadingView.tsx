import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingViewProps {}

const LoadingView: React.FunctionComponent<LoadingViewProps> = () => {
  const { height, width } = useWindowDimensions();

  return (
    <View className='flex-1 items-center justify-center max-h-screen'>
      <LottieView
        style={{ width: width * 0.2 }}
        source={require('../../assets/animations/faster_loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};
export default LoadingView;
