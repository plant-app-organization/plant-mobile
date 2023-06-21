import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type MessageInput = {
  offerId: Scalars['String'];
  text: Scalars['String'];
};

export type MessageModel = {
  __typename?: 'MessageModel';
  conversationId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  senderId: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkOffer: Scalars['String'];
  createNewOffer: Scalars['String'];
  register: Scalars['String'];
  sendMessage: Scalars['String'];
};


export type MutationBookmarkOfferArgs = {
  offerId: Scalars['String'];
};


export type MutationCreateNewOfferArgs = {
  newOfferInput: OfferInput;
};


export type MutationRegisterArgs = {
  newUserInput: RegisterInput;
};


export type MutationSendMessageArgs = {
  newMessageInput: MessageInput;
};

export type Offer = {
  __typename?: 'Offer';
  authorId: Scalars['String'];
  bookmarkedBy: Array<Scalars['String']>;
  category: Scalars['String'];
  city: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  environment: Scalars['String'];
  health: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isBookmarked?: Maybe<Scalars['Boolean']>;
  latitude: Scalars['Float'];
  location: Scalars['String'];
  longitude: Scalars['Float'];
  maintenanceDifficultyLevel: Scalars['String'];
  pictures: Array<Scalars['String']>;
  plantHeight: Scalars['Int'];
  plantName: Scalars['String'];
  postcode: Scalars['String'];
  pot: Scalars['Boolean'];
  price: Scalars['Int'];
  region: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type OfferInput = {
  category: Scalars['String'];
  city: Scalars['String'];
  description: Scalars['String'];
  environment: Scalars['String'];
  health: Scalars['String'];
  latitude: Scalars['Float'];
  location: Scalars['String'];
  longitude: Scalars['Float'];
  maintenanceDifficultyLevel: Scalars['String'];
  pictures: Array<Scalars['String']>;
  plantHeight: Scalars['Float'];
  plantName: Scalars['String'];
  postcode: Scalars['String'];
  pot: Scalars['Boolean'];
  price: Scalars['Float'];
  region: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Get List of Messages for a given conversation */
  MessagesList: Array<MessageModel>;
  /** Get List of Offers */
  OffersList: Array<Offer>;
  /** Get List of Offers and data By Ids */
  OffersListByIds: Array<Offer>;
  /** Get List of Offers Searched */
  OffersListSearch: Array<Offer>;
  /** Get List of Suggestions */
  SuggestionsList: Array<SuggestionModel>;
  /** Get List of Users with the largest amount of active offers */
  UsersList: Array<UserModel>;
  getBookmarksByUserId: Scalars['String'];
  hello: Scalars['String'];
  userBookmarks: Array<Offer>;
  userData: UserModel;
  userDataById: UserModel;
};


export type QueryMessagesListArgs = {
  conversationId: Scalars['String'];
};


export type QueryOffersListArgs = {
  filters: Array<Scalars['String']>;
};


export type QueryOffersListByIdsArgs = {
  offerIds: Array<Scalars['String']>;
};


export type QueryOffersListSearchArgs = {
  environment: Scalars['String'];
  filters: Array<Scalars['String']>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  searchInput: Scalars['String'];
};


export type QueryGetBookmarksByUserIdArgs = {
  offerId: Scalars['String'];
};


export type QueryUserDataByIdArgs = {
  userId: Scalars['String'];
};

export type RegisterInput = {
  avatar: Scalars['String'];
  clerkId: Scalars['String'];
  email: Scalars['String'];
  isPro: Scalars['Boolean'];
  userBio: Scalars['String'];
  userName: Scalars['String'];
};

export type SuggestionModel = {
  __typename?: 'SuggestionModel';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar: Scalars['String'];
  bookmarks: Array<Scalars['String']>;
  clerkId: Scalars['String'];
  conversations: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isPro: Scalars['Boolean'];
  lastName: Scalars['String'];
  offerIds: Array<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userBio: Scalars['String'];
  userName: Scalars['String'];
};

export type BookmarkOfferMutationVariables = Exact<{
  offerId: Scalars['String'];
}>;


export type BookmarkOfferMutation = { __typename?: 'Mutation', bookmarkOffer: string };

export type CreateNewOfferMutationVariables = Exact<{
  newOfferInput: OfferInput;
}>;


export type CreateNewOfferMutation = { __typename?: 'Mutation', createNewOffer: string };

export type GetConversationMessagesQueryVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type GetConversationMessagesQuery = { __typename?: 'Query', MessagesList: Array<{ __typename?: 'MessageModel', id: string, senderId: string, text: string, createdAt: any }> };

export type GetOffersQueryVariables = Exact<{
  filters: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetOffersQuery = { __typename?: 'Query', OffersList: Array<{ __typename?: 'Offer', id: string, authorId: string, plantName: string, price: number, pictures: Array<string>, description: string, health: string, category: string, environment: string, pot: boolean, isActive: boolean, createdAt: any, updatedAt: any, plantHeight: number, maintenanceDifficultyLevel: string, latitude: number, longitude: number, location: string }> };

export type GetOffersDataByIdsQueryVariables = Exact<{
  offerIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetOffersDataByIdsQuery = { __typename?: 'Query', OffersListByIds: Array<{ __typename?: 'Offer', id: string, authorId: string, plantName: string, pictures: Array<string>, description: string, price: number, health: string, category: string, environment: string, pot: boolean, isActive: boolean, createdAt: any, updatedAt: any, plantHeight: number, maintenanceDifficultyLevel: string, bookmarkedBy: Array<string>, isBookmarked?: boolean | null, latitude: number, longitude: number, location: string, city: string, postcode: string, region: string }> };

export type GetSuggestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuggestionsQuery = { __typename?: 'Query', SuggestionsList: Array<{ __typename?: 'SuggestionModel', id: string, title: string }> };

export type GetTopPlantersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopPlantersQuery = { __typename?: 'Query', UsersList: Array<{ __typename?: 'UserModel', id: string, userName: string, avatar: string, offerIds: Array<string>, userBio: string, isPro: boolean, createdAt: any }> };

export type GetUserBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserBookmarksQuery = { __typename?: 'Query', userBookmarks: Array<{ __typename?: 'Offer', id: string, price: number, plantName: string, pictures: Array<string>, bookmarkedBy: Array<string>, description: string, category: string, health: string, pot: boolean, isBookmarked?: boolean | null, plantHeight: number, maintenanceDifficultyLevel: string, isActive: boolean, createdAt: any, updatedAt: any }> };

export type GetUserDataByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserDataByIdQuery = { __typename?: 'Query', userDataById: { __typename?: 'UserModel', id: string, userName: string, userBio: string, avatar: string, isPro: boolean, createdAt: any, updatedAt: any, offerIds: Array<string> } };

export type RegisterMutationVariables = Exact<{
  newUserInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type SearchOffersQueryVariables = Exact<{
  searchInput: Scalars['String'];
  filters: Array<Scalars['String']> | Scalars['String'];
  environment: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SearchOffersQuery = { __typename?: 'Query', OffersListSearch: Array<{ __typename?: 'Offer', id: string, authorId: string, plantName: string, price: number, pictures: Array<string>, description: string, health: string, category: string, environment: string, pot: boolean, isActive: boolean, createdAt: any, updatedAt: any, plantHeight: number, maintenanceDifficultyLevel: string, bookmarkedBy: Array<string>, isBookmarked?: boolean | null, latitude: number, longitude: number, location: string, city: string, postcode: string, region: string }> };

export type SendMessageMutationVariables = Exact<{
  newMessageInput: MessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: string };


export const BookmarkOfferDocument = gql`
    mutation bookmarkOffer($offerId: String!) {
  bookmarkOffer(offerId: $offerId)
}
    `;
export type BookmarkOfferMutationFn = Apollo.MutationFunction<BookmarkOfferMutation, BookmarkOfferMutationVariables>;

/**
 * __useBookmarkOfferMutation__
 *
 * To run a mutation, you first call `useBookmarkOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkOfferMutation, { data, loading, error }] = useBookmarkOfferMutation({
 *   variables: {
 *      offerId: // value for 'offerId'
 *   },
 * });
 */
export function useBookmarkOfferMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BookmarkOfferMutation, BookmarkOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<BookmarkOfferMutation, BookmarkOfferMutationVariables>(BookmarkOfferDocument, options);
      }
export type BookmarkOfferMutationHookResult = ReturnType<typeof useBookmarkOfferMutation>;
export type BookmarkOfferMutationResult = Apollo.MutationResult<BookmarkOfferMutation>;
export type BookmarkOfferMutationOptions = Apollo.BaseMutationOptions<BookmarkOfferMutation, BookmarkOfferMutationVariables>;
export const CreateNewOfferDocument = gql`
    mutation createNewOffer($newOfferInput: OfferInput!) {
  createNewOffer(newOfferInput: $newOfferInput)
}
    `;
export type CreateNewOfferMutationFn = Apollo.MutationFunction<CreateNewOfferMutation, CreateNewOfferMutationVariables>;

/**
 * __useCreateNewOfferMutation__
 *
 * To run a mutation, you first call `useCreateNewOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewOfferMutation, { data, loading, error }] = useCreateNewOfferMutation({
 *   variables: {
 *      newOfferInput: // value for 'newOfferInput'
 *   },
 * });
 */
export function useCreateNewOfferMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNewOfferMutation, CreateNewOfferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateNewOfferMutation, CreateNewOfferMutationVariables>(CreateNewOfferDocument, options);
      }
export type CreateNewOfferMutationHookResult = ReturnType<typeof useCreateNewOfferMutation>;
export type CreateNewOfferMutationResult = Apollo.MutationResult<CreateNewOfferMutation>;
export type CreateNewOfferMutationOptions = Apollo.BaseMutationOptions<CreateNewOfferMutation, CreateNewOfferMutationVariables>;
export const GetConversationMessagesDocument = gql`
    query getConversationMessages($conversationId: String!) {
  MessagesList(conversationId: $conversationId) {
    id
    senderId
    text
    createdAt
  }
}
    `;

/**
 * __useGetConversationMessagesQuery__
 *
 * To run a query within a React component, call `useGetConversationMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationMessagesQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetConversationMessagesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetConversationMessagesQuery, GetConversationMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetConversationMessagesQuery, GetConversationMessagesQueryVariables>(GetConversationMessagesDocument, options);
      }
export function useGetConversationMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetConversationMessagesQuery, GetConversationMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetConversationMessagesQuery, GetConversationMessagesQueryVariables>(GetConversationMessagesDocument, options);
        }
export type GetConversationMessagesQueryHookResult = ReturnType<typeof useGetConversationMessagesQuery>;
export type GetConversationMessagesLazyQueryHookResult = ReturnType<typeof useGetConversationMessagesLazyQuery>;
export type GetConversationMessagesQueryResult = Apollo.QueryResult<GetConversationMessagesQuery, GetConversationMessagesQueryVariables>;
export const GetOffersDocument = gql`
    query getOffers($filters: [String!]!) {
  OffersList(filters: $filters) {
    id
    authorId
    plantName
    price
    pictures
    description
    price
    health
    category
    environment
    pot
    isActive
    createdAt
    updatedAt
    plantHeight
    maintenanceDifficultyLevel
    latitude
    longitude
    location
  }
}
    `;

/**
 * __useGetOffersQuery__
 *
 * To run a query within a React component, call `useGetOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOffersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetOffersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetOffersQuery, GetOffersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOffersQuery, GetOffersQueryVariables>(GetOffersDocument, options);
      }
export function useGetOffersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOffersQuery, GetOffersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOffersQuery, GetOffersQueryVariables>(GetOffersDocument, options);
        }
export type GetOffersQueryHookResult = ReturnType<typeof useGetOffersQuery>;
export type GetOffersLazyQueryHookResult = ReturnType<typeof useGetOffersLazyQuery>;
export type GetOffersQueryResult = Apollo.QueryResult<GetOffersQuery, GetOffersQueryVariables>;
export const GetOffersDataByIdsDocument = gql`
    query getOffersDataByIds($offerIds: [String!]!) {
  OffersListByIds(offerIds: $offerIds) {
    id
    authorId
    plantName
    pictures
    description
    price
    health
    category
    environment
    pot
    isActive
    createdAt
    updatedAt
    plantHeight
    maintenanceDifficultyLevel
    bookmarkedBy
    isBookmarked
    latitude
    longitude
    location
    city
    postcode
    region
  }
}
    `;

/**
 * __useGetOffersDataByIdsQuery__
 *
 * To run a query within a React component, call `useGetOffersDataByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOffersDataByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOffersDataByIdsQuery({
 *   variables: {
 *      offerIds: // value for 'offerIds'
 *   },
 * });
 */
export function useGetOffersDataByIdsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetOffersDataByIdsQuery, GetOffersDataByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOffersDataByIdsQuery, GetOffersDataByIdsQueryVariables>(GetOffersDataByIdsDocument, options);
      }
export function useGetOffersDataByIdsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOffersDataByIdsQuery, GetOffersDataByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOffersDataByIdsQuery, GetOffersDataByIdsQueryVariables>(GetOffersDataByIdsDocument, options);
        }
export type GetOffersDataByIdsQueryHookResult = ReturnType<typeof useGetOffersDataByIdsQuery>;
export type GetOffersDataByIdsLazyQueryHookResult = ReturnType<typeof useGetOffersDataByIdsLazyQuery>;
export type GetOffersDataByIdsQueryResult = Apollo.QueryResult<GetOffersDataByIdsQuery, GetOffersDataByIdsQueryVariables>;
export const GetSuggestionsDocument = gql`
    query getSuggestions {
  SuggestionsList {
    id
    title
  }
}
    `;

/**
 * __useGetSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuggestionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSuggestionsQuery, GetSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSuggestionsQuery, GetSuggestionsQueryVariables>(GetSuggestionsDocument, options);
      }
export function useGetSuggestionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSuggestionsQuery, GetSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSuggestionsQuery, GetSuggestionsQueryVariables>(GetSuggestionsDocument, options);
        }
export type GetSuggestionsQueryHookResult = ReturnType<typeof useGetSuggestionsQuery>;
export type GetSuggestionsLazyQueryHookResult = ReturnType<typeof useGetSuggestionsLazyQuery>;
export type GetSuggestionsQueryResult = Apollo.QueryResult<GetSuggestionsQuery, GetSuggestionsQueryVariables>;
export const GetTopPlantersDocument = gql`
    query getTopPlanters {
  UsersList {
    id
    userName
    avatar
    offerIds
    userBio
    isPro
    createdAt
  }
}
    `;

/**
 * __useGetTopPlantersQuery__
 *
 * To run a query within a React component, call `useGetTopPlantersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopPlantersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopPlantersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopPlantersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTopPlantersQuery, GetTopPlantersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetTopPlantersQuery, GetTopPlantersQueryVariables>(GetTopPlantersDocument, options);
      }
export function useGetTopPlantersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTopPlantersQuery, GetTopPlantersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetTopPlantersQuery, GetTopPlantersQueryVariables>(GetTopPlantersDocument, options);
        }
export type GetTopPlantersQueryHookResult = ReturnType<typeof useGetTopPlantersQuery>;
export type GetTopPlantersLazyQueryHookResult = ReturnType<typeof useGetTopPlantersLazyQuery>;
export type GetTopPlantersQueryResult = Apollo.QueryResult<GetTopPlantersQuery, GetTopPlantersQueryVariables>;
export const GetUserBookmarksDocument = gql`
    query getUserBookmarks {
  userBookmarks {
    id
    price
    plantName
    pictures
    bookmarkedBy
    description
    category
    health
    pot
    isBookmarked
    plantHeight
    maintenanceDifficultyLevel
    isActive
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserBookmarksQuery__
 *
 * To run a query within a React component, call `useGetUserBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBookmarksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserBookmarksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserBookmarksQuery, GetUserBookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserBookmarksQuery, GetUserBookmarksQueryVariables>(GetUserBookmarksDocument, options);
      }
export function useGetUserBookmarksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserBookmarksQuery, GetUserBookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserBookmarksQuery, GetUserBookmarksQueryVariables>(GetUserBookmarksDocument, options);
        }
export type GetUserBookmarksQueryHookResult = ReturnType<typeof useGetUserBookmarksQuery>;
export type GetUserBookmarksLazyQueryHookResult = ReturnType<typeof useGetUserBookmarksLazyQuery>;
export type GetUserBookmarksQueryResult = Apollo.QueryResult<GetUserBookmarksQuery, GetUserBookmarksQueryVariables>;
export const GetUserDataByIdDocument = gql`
    query getUserDataById($userId: String!) {
  userDataById(userId: $userId) {
    id
    userName
    userBio
    avatar
    isPro
    createdAt
    updatedAt
    offerIds
  }
}
    `;

/**
 * __useGetUserDataByIdQuery__
 *
 * To run a query within a React component, call `useGetUserDataByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserDataByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserDataByIdQuery, GetUserDataByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserDataByIdQuery, GetUserDataByIdQueryVariables>(GetUserDataByIdDocument, options);
      }
export function useGetUserDataByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserDataByIdQuery, GetUserDataByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserDataByIdQuery, GetUserDataByIdQueryVariables>(GetUserDataByIdDocument, options);
        }
export type GetUserDataByIdQueryHookResult = ReturnType<typeof useGetUserDataByIdQuery>;
export type GetUserDataByIdLazyQueryHookResult = ReturnType<typeof useGetUserDataByIdLazyQuery>;
export type GetUserDataByIdQueryResult = Apollo.QueryResult<GetUserDataByIdQuery, GetUserDataByIdQueryVariables>;
export const RegisterDocument = gql`
    mutation register($newUserInput: RegisterInput!) {
  register(newUserInput: $newUserInput)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      newUserInput: // value for 'newUserInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SearchOffersDocument = gql`
    query searchOffers($searchInput: String!, $filters: [String!]!, $environment: String!, $limit: Int, $offset: Int) {
  OffersListSearch(
    searchInput: $searchInput
    filters: $filters
    environment: $environment
    limit: $limit
    offset: $offset
  ) {
    id
    authorId
    plantName
    price
    pictures
    description
    price
    health
    category
    environment
    pot
    isActive
    createdAt
    updatedAt
    plantHeight
    maintenanceDifficultyLevel
    bookmarkedBy
    isBookmarked
    latitude
    longitude
    location
    city
    postcode
    region
  }
}
    `;

/**
 * __useSearchOffersQuery__
 *
 * To run a query within a React component, call `useSearchOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOffersQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *      filters: // value for 'filters'
 *      environment: // value for 'environment'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchOffersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SearchOffersQuery, SearchOffersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SearchOffersQuery, SearchOffersQueryVariables>(SearchOffersDocument, options);
      }
export function useSearchOffersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchOffersQuery, SearchOffersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SearchOffersQuery, SearchOffersQueryVariables>(SearchOffersDocument, options);
        }
export type SearchOffersQueryHookResult = ReturnType<typeof useSearchOffersQuery>;
export type SearchOffersLazyQueryHookResult = ReturnType<typeof useSearchOffersLazyQuery>;
export type SearchOffersQueryResult = Apollo.QueryResult<SearchOffersQuery, SearchOffersQueryVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($newMessageInput: MessageInput!) {
  sendMessage(newMessageInput: $newMessageInput)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      newMessageInput: // value for 'newMessageInput'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;