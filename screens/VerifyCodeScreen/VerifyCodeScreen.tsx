import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useClerk, useSignUp, useSession } from '@clerk/clerk-expo';
import { styles } from '../../components/SignInWithOAuth/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { sessionIdVar } from '../../variables/session';
import { useRegisterMutation } from '../../graphql/graphql';

export default function VerifyCodeScreen(props) {
  const { isLoaded, signUp, setSession } = useSignUp();
  const { session } = useSession();
  const [register] = useRegisterMutation();

  const [code, setCode] = useState<string>('');

  const onPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log('🧡completeSignUp', completeSignUp);
      await register({
        variables: {
          newUserInput: {
            email: completeSignUp.emailAddress,
            userName: completeSignUp.username,
            clerkId: completeSignUp.createdUserId,
          },
        },
      });
      await setSession(completeSignUp.createdSessionId);

      // sessionIdVar(completeSignUp.createdSessionId);

      const userToken = session;
      console.log('✨user', userToken);
    } catch (err: any) {
      console.log('Error:> ' + err?.status || '');
      console.log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  return (
    <LinearGradient
      colors={['#ccedcf', '#bee6c2', '#8CE795', '#8CE795', '#86E4A1', '#bee6c2']}
      className=' w-screen h-screen px-22'
    >
      <SafeAreaView>
        <View className='w-full h-full flex justify-center items-center	'>
          <View
            style={{
              position: 'relative',
              borderWidth: 0.5,
              borderColor: 'gray',
              borderRadius: 25,

              paddingLeft: 20,
              marginBottom: 30,
              width: 300,
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: -25,
                left: 10,
                backgroundColor: 'transparent',
                paddingHorizontal: 5,
              }}
            >
              <Text className='font-antipasto text-sm text-left text-xl  font-antipasto opacity-100'>
                Titre :
              </Text>
            </View>
            <TextInput
              style={{ height: 40, width: 240, fontSize: 15 }}
              value={code}
              onChangeText={(code) => setCode(code)}
              placeholder='Code...'
              placeholderTextColor='#000'
              secureTextEntry={true}
              keyboardType='numeric'
            />
          </View>

          <View className='flex justify-center items-center mt-10 mb-10'>
            <View
              style={{
                height: 40,
                width: 180,
                borderRadius: 25,
                backgroundColor: '#ccedcf',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#3FA96A',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 15.22,
                shadowRadius: 16.1,
              }}
            >
              <TouchableOpacity
                className='h-40 w-180 rounded-25 bg-ccedcf flex items-center justify-center shadow-lg hover:shadow-xl'
                onPress={onPress}
              >
                <Text className='font-antipasto  text-black text-xl font-bold'>
                  Vérifier l'e-mail
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
