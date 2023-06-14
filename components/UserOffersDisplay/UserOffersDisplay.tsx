import React, { useCallback } from 'react'
import CardProduct from '../../components/product/CardProduct'
import { View, Text, FlatList } from 'react-native'
import { useGetOffersDataByIdsQuery } from '../../graphql/graphql'

interface UserOffersDisplayProps {
  offerIds: string[]
}

const UserOffersDisplay: React.FunctionComponent<UserOffersDisplayProps> = ({ offerIds }) => {
  console.log('offerIds in UserOffersDisplay', offerIds)
  //requeter avec un tableau d'id l'ensemble des données des offres avec isActive à true.
  const { data: userOffersData, refetch: refetchUserOffersData } = useGetOffersDataByIdsQuery({
    variables: { offerIds: offerIds },
  })

  console.log('userOffersData in UserOffersDisplay', userOffersData)
  const renderItem = useCallback(({ item }) => <CardProduct {...item} />, [])

  return (
    <View className='items-start justify-start pt-0 '>
      <Text className=' px-2 my-2'>{offerIds?.length} annonces en ligne</Text>
      <FlatList
        numColumns={2}
        horizontal={false}
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        ItemSeparatorComponent={() => <View className='h-4' />}
        columnWrapperStyle={{
          flex: 1,
          alignItems: 'flex-start',
        }}
        data={userOffersData?.OffersListByIds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      {/* <FlatList
          style={Platform.OS == 'ios' ? { marginBottom: 450 } : null}
          numColumns={2}
          // contentContainerStyle={{
          //   alignItems: 'flex-start',
          // }}
          onEndReached={fetchMoreData}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor='#87BC23'
              colors={['#87BC23', '#139DB8']}
            />
          }
          onEndReachedThreshold={0.7} // The threshold at which the fetchMoreData function should be called. 0.5 means "when half of the list is remaining".
          horizontal={false}
          initialNumToRender={4}
          maxToRenderPerBatch={8}
          ItemSeparatorComponent={() => <View className='h-4' />}
          columnWrapperStyle={{
            flex: 1,
            alignItems: 'flex-start',
          }}
          data={searchOffersData?.OffersListSearch}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        /> */}
    </View>
  )
}

export default UserOffersDisplay
