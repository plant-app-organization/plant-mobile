import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, View } from 'react-native'

interface GradientTitleProps {
  title: string
  align: string
}

const GradientTitle: React.FunctionComponent<GradientTitleProps> = (props) => {
  const { title, align } = props
  return (
    <View className='bg-white w-4/5 flex bg-transparent'>
      <MaskedView
        style={{ height: 27 }}
        maskElement={
          <Text
            className={`mx-auto text-xl text-center ${align === 'right' ? 'text-right' : ''}`}
            style={{ fontFamily: 'manrope_extra_bold' }}
          >
            {title}
          </Text>
        }
      >
        <LinearGradient
          colors={['#709045', '#6AB2DF', '#81BBA1']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0.33 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </View>
  )
}

export default GradientTitle
