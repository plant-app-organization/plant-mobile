import React from 'react'
import { Button } from 'react-native'

const NextButton = ({ navigation, nextScreenName }) => {
  return (
    <Button
      title='Next'
      onPress={() => {
        // Add logic to navigate to the next step
        navigation.navigate(nextScreenName)
      }}
    />
  )
}

export default NextButton
