import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import LottieView from 'lottie-react-native'

interface LoadingViewProps {}

const LoadingView: React.FunctionComponent<LoadingViewProps> = () => {
  const { height, width } = useWindowDimensions()

  return (
    <LottieView
      style={{ width: width * 1.5, marginBottom: 900 }}
      source={require('../../assets/animations/plant_loader.json')}
      autoPlay
      loop
    />
  )
}
export default LoadingView
