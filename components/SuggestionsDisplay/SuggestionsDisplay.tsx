import React, { useEffect } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import CardPlanter from '../planters/CardPlanter'
import { useGetSuggestionsQuery } from '../../graphql/graphql'
import { Box, Skeleton, VStack, Center, HStack } from 'native-base'
import PlanterSkeleton from '../PlanterSkeleton/PlanterSkeleton'
import CardSuggestion from '../../components/suggestions/CardSuggestion'

export default function SuggestionsDisplay() {
  const { data: suggestionsData, refetch, loading, error } = useGetSuggestionsQuery()
  console.log('suggestionsdata', suggestionsData)
  useEffect(() => {
    console.log('error', error)
  }, [error])
  console.log('suggestionsdisplau')
  return (
    <FlatList
      data={suggestionsData?.SuggestionsList}
      renderItem={({ item }) => <CardSuggestion search={item.title} />}
      keyExtractor={(item) => item.key}
      horizontal={true}
      contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
    />
  )
}

/* <FlatList
            data={suggestionData}
            renderItem={({ item }) => <CardSuggestion search={item.search} views={item.views} />}
            keyExtractor={(item) => item.key}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
          /> */
