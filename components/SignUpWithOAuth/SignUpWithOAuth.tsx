import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { log } from '../../logger'
import { styles } from './Styles'
import * as AuthSession from 'expo-auth-session'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

export function SignUpWithOAuth() {
  const { signUp, setSession, isLoaded } = useSignUp()

  const onPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      // Create a redirect url for the current platform and environment.
      //
      // This redirect URL needs to be whitelisted for your instance via
      // https://clerk.dev/docs/reference/backend-api/tag/Redirect-URLs
      //
      // For more information go to:
      // https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturi
      const redirectUrl = AuthSession.makeRedirectUri({
        path: '/oauth-native-callback',
      })

      await signUp.create({
        strategy: 'oauth_google',
        redirectUrl,
      })

      const {
        verifications: {
          externalAccount: { externalVerificationRedirectURL },
        },
      } = signUp

      const result = await AuthSession.startAsync({
        authUrl: externalVerificationRedirectURL!.toString(),
        returnUrl: redirectUrl,
      })

      // @ts-ignore
      const { type, params } = result || {}

      // Check all the possible AuthSession results
      // https://docs.expo.dev/versions/latest/sdk/auth-session/#returns-7
      if (type !== 'success') {
        throw 'Something went wrong during the OAuth flow. Try again.'
      }

      // Get the rotatingTokenNonce from the redirect URL parameters
      const { rotating_token_nonce: rotatingTokenNonce } = params

      // Use it once to reload the complete sign up object
      await signUp.reload({ rotatingTokenNonce })

      const { createdSessionId } = signUp

      if (!createdSessionId) {
        throw 'Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.'
      }

      await setSession(createdSessionId)
      return
    } catch (err: any) {
      log('Error:> ' + err?.status || '')
      log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err)
    }
  }, [])

  return (
    <TouchableOpacity
      className='h-[45px] w-[80%] flex flex-row rounded-full items-center justify-evenly bg-white shadow-sm border border-gray-300'
      onPress={onPress}
    >
      <View className='w-[25px] h-[25px] bg-red-500 items-center justify-center rounded-full'>
        <FontAwesomeIcon name='google' size={15} color='white' />
      </View>
      <Text className='text-md font-semibold tracking-widest'>Continuer avec Google</Text>
    </TouchableOpacity>
  )
}
