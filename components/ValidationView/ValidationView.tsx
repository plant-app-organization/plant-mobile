import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import LottieView from 'lottie-react-native'

interface ValidationViewProps {}

const ValidationView: React.FunctionComponent<ValidationViewProps> = () => {
  const { height, width } = useWindowDimensions()

  return (
    <LottieView
      style={{ width: width * 0.4, marginBottom: 0 }}
      source={require('../../assets/animations/checkbox.json')}
      autoPlay
      loop
    />
  )
}
export default ValidationView
