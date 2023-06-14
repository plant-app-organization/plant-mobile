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
    <View className='items-start justify-start pt-0'>
      <View className='w-full'>
        <Text className='p-4 pl-6'>{offerIds?.length} Annonces publiées par le user</Text>
        <View className='w-screen'>
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
          />
        </View>
      </View>
    </View>
  )
}

export default UserOffersDisplay
