import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { HeartIcon } from 'react-native-heroicons/solid';
import { Image } from 'expo-image';
import { useReactiveVar } from '@apollo/client';
import { bookmarksVar } from '../../variables/bookmarks';
import { useNavigation } from '@react-navigation/native';
import { useBookmarkOfferMutation } from '../../graphql/graphql';
import { useToast } from 'native-base';

interface CardProductProps {
  plantName: string;
  price: number;
  pictures: string[];
  id: string;
  isBookmarked: boolean;
  bookmarkedBy: string[] | null;
}

const CardProduct: React.FunctionComponent<CardProductProps> = (props) => {
  const { width, height } = useWindowDimensions();
  const [like, setLike] = useState(props.isBookmarked);
  console.log('PROPS', props);
  const [likesCounter, setLikesCounter] = useState<number | null>(
    props.bookmarkedBy != null && props.bookmarkedBy.length > 0 ? props.bookmarkedBy.length : null,
  );
  console.log('🔥like', like, 'likesCounter', likesCounter);

  // console.log('like', like);
  const [bookmarkOffer] = useBookmarkOfferMutation({
    variables: { offerId: props.id },
  });

  const toast = useToast();
  const bookmarksArray = useReactiveVar(bookmarksVar);
  console.log('🍔bookmarksArray ', bookmarksArray);

  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const handleLike = async () => {
    // console.log(bookmarksArray);

    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if ((like && likesCounter) || (like && !likesCounter)) {
      bookmarksVar(bookmarksArray.filter((e) => e.id !== props.id));
      setLikesCounter(likesCounter - 1);
      setLike(false);
    }
    if (!like && likesCounter) {
      // console.log('!like && likesCounter');
      bookmarksVar([...bookmarksArray, props]);
      setLikesCounter(likesCounter + 1);
      setLike(true);
    }
    if ((!like && !likesCounter) || (!like && likesCounter == 0)) {
      // console.log('!like && !likesCounter');

      bookmarksVar([...bookmarksArray, props]);
      setLikesCounter(likesCounter + 1);
      setLike(true);
    }

    !like &&
      toast.show({
        title: "L'annonce a été ajoutée à vos favoris !",
      });
    const response = await bookmarkOffer({
      variables: {
        offerId: props.id,
      },
    });
  };

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  console.log(
    '🪴.some ???',
    bookmarksArray.some((el) => el.id == props.id),
  );
  return (
    <TouchableOpacity
      style={{ width: width * 0.5 }}
      className=' px-2'
      onPress={() =>
        navigation.navigate('Listing', { listingData: props, likesCounter, like, handleLike })
      }
    >
      {props.pictures && (
        <Image
          className='rounded-lg bg-green-200 h-64'
          source={props.pictures[0]}
          // placeholder={blurHash}
          contentFit='cover'
          // transition={1000}
        />
      )}

      <View className='flex flex-row justify-between items-center pr-2'>
        <View className='flex flex-column'>
          <Text className='pl-2 pt-2 font-semibold'>{props.price},00 €</Text>
          <Text className='pl-2 pt-0'>{props.plantName}</Text>
        </View>
        <TouchableOpacity>
          <Animated.View
            style={[
              { transform: [{ scale: scaleAnimation }] },
              { flexDirection: 'row', alignItems: 'center' },
            ]}
          >
            {props.bookmarkedBy && (
              <Text className='text-center text-xs'>
                {likesCounter != null && likesCounter > 0 && likesCounter}
              </Text>
            )}
            <HeartIcon
              color={bookmarksArray.some((el) => el.id == props.id) ? '#e74c3c' : '#d8d8d8'}
              className='h-6 w-6 pr-2'
              onPress={() => handleLike()}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardProduct;
