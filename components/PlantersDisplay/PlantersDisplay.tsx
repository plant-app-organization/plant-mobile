import React, { useEffect } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import CardPlanter from '../planters/CardPlanter'
import { useGetTopPlantersQuery } from '../../graphql/graphql'
import { Box, Skeleton, VStack, Center, HStack } from 'native-base'
import PlanterSkeleton from '../PlanterSkeleton/PlanterSkeleton'

export default function PlantersDisplay() {
  const { data: plantersData, refetch, loading, error } = useGetTopPlantersQuery()
  //   console.log('data', plantersData)
  //   useEffect(() => {
  //     console.log('error', error)
  //   }, [error])
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]
  if (loading) {
    return (
      <FlatList
        data={arr}
        renderItem={({ item }) => <PlanterSkeleton />}
        keyExtractor={(item) => item.key}
        horizontal={true}
        contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    )
  }
  return (
    <FlatList
      data={plantersData?.UsersList}
      renderItem={({ item }) => (
        <CardPlanter
          name={item.userName}
          image={item.avatar}
          deals={item.offerIds.length}
          loading={loading}
        />
      )}
      keyExtractor={(item) => item.key}
      horizontal={true}
      contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
      showsHorizontalScrollIndicator={false}
    />
  )
}
