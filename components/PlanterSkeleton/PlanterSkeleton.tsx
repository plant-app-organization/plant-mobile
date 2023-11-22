import React from 'react'
import { View, useWindowDimensions, TouchableOpacity, Text } from 'react-native'
import { Box, Skeleton, VStack, Center, HStack } from 'native-base'

interface Props {}
const PlanterSkeleton: React.FC<Props> = () => {
  const { height, width } = useWindowDimensions()
  return (
    <TouchableOpacity className='mr-4 bg-white py-3 px-2 shadow-sm rounded-md w-22'>
      <Skeleton
        borderWidth={1}
        borderColor='coolGray.200'
        endColor='warmGray.50'
        size='12'
        rounded='full'
        alignSelf={'center'}
        mt='2'
        mb='2'
        ml='3'
        mr='3'
      />
      <Skeleton h='2' mb='1' />
      <Skeleton h='2' />
    </TouchableOpacity>
  )
}
export default PlanterSkeleton
