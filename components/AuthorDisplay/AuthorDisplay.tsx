import React from 'react';
import { View, useWindowDimensions, Text, TouchableOpacity } from 'react-native';
import { Avatar, ScrollView } from 'native-base';
import { StarIcon } from 'react-native-heroicons/solid';

import { useGetUserDataByIdQuery } from '../../graphql/graphql';
import { useNavigation } from '@react-navigation/native';

interface AuthorDisplayProps {
  userId: string;
}

const AuthorDisplay: React.FunctionComponent<AuthorDisplayProps> = (props) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  //   console.log('props.userId', props.userId);

  const { data: userData, refetch: refetchUserData } = useGetUserDataByIdQuery({
    variables: { userId: props.userId },
  });

  //   console.log('userData', userData?.userDataById);
  if (!userData) {
    return <Text>Loading...</Text>;
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserProfile', { userData: userData?.userDataById })}
      className='w-6/12 flex-row items-center'
    >
      <>
        <Avatar
          bg='green.900'
          source={{
            uri: userData?.userDataById.avatar,
          }}
        >
          LC
        </Avatar>
        <View className='ml-2'>
          <Text className='text-base'>{userData?.userDataById.userName}</Text>
          <View className='flex-row items-center mb-1'>
            <StarIcon color={'orange'} size={20} />
            <StarIcon color={'orange'} size={20} />
            <StarIcon color={'orange'} size={20} />
            <StarIcon color={'orange'} size={20} />
            <Text>(139)</Text>
          </View>
          <Text>Marseille, France</Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

export default AuthorDisplay;
