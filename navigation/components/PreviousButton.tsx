import React from 'react'
import { Button } from 'react-native'

const PreviousButton = ({ navigation }) => {
  return (
    <Button
      title='Previous'
      onPress={() => {
        // Add logic to navigate to the previous step
        navigation.goBack()
      }}
    />
  )
}

export default PreviousButton
