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

export type Mutation = {
  __typename?: 'Mutation';
  createNewOffer: Scalars['String'];
  register: Scalars['String'];
};


export type MutationCreateNewOfferArgs = {
  newOfferInput: OfferInput;
};


export type MutationRegisterArgs = {
  newUserInput: RegisterInput;
};

export type Offer = {
  __typename?: 'Offer';
  authorId: Scalars['String'];
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  health: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  maintenanceDifficultyLevel: Scalars['String'];
  pictures: Array<Scalars['String']>;
  plantHeight: Scalars['Int'];
  plantName: Scalars['String'];
  pot: Scalars['Boolean'];
  price: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type OfferInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  health: Scalars['String'];
  maintenanceDifficultyLevel: Scalars['String'];
  pictures: Array<Scalars['String']>;
  plantHeight: Scalars['Float'];
  plantName: Scalars['String'];
  pot: Scalars['Boolean'];
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  /** Get List of Offers */
  OffersList: Array<Offer>;
  hello: Scalars['String'];
  userDataById: UserModel;
};


export type QueryOffersListArgs = {
  filters: Array<Scalars['String']>;
};


export type QueryUserDataByIdArgs = {
  userId: Scalars['String'];
};

export type RegisterInput = {
  clerkId: Scalars['String'];
  email: Scalars['String'];
  userName: Scalars['String'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar: Scalars['String'];
  clerkId: Scalars['String'];
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

export type CreateNewOfferMutationVariables = Exact<{
  newOfferInput: OfferInput;
}>;


export type CreateNewOfferMutation = { __typename?: 'Mutation', createNewOffer: string };

export type GetOffersQueryVariables = Exact<{
  filters: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetOffersQuery = { __typename?: 'Query', OffersList: Array<{ __typename?: 'Offer', id: string, authorId: string, plantName: string, price: number, pictures: Array<string>, description: string, health: string, category: string, pot: boolean, isActive: boolean, createdAt: any, updatedAt: any, plantHeight: number, maintenanceDifficultyLevel: string }> };

export type GetUserDataByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserDataByIdQuery = { __typename?: 'Query', userDataById: { __typename?: 'UserModel', id: string, userName: string, userBio: string, avatar: string, isPro: boolean, createdAt: any, updatedAt: any } };

export type RegisterMutationVariables = Exact<{
  newUserInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };


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
    pot
    isActive
    createdAt
    updatedAt
    plantHeight
    maintenanceDifficultyLevel
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