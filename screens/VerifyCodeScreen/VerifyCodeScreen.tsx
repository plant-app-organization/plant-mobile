import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useClerk, useSignUp } from '@clerk/clerk-expo';
import { styles } from '../../components/SignInWithOAuth/Styles';

export default function VerifyCodeScreen(props) {
  const { isLoaded, signUp, setSession } = useSignUp();

  const [code, setCode] = React.useState('');

  const onPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setSession(completeSignUp.createdSessionId);
    } catch (err: any) {
      console.log('Error:> ' + err?.status || '');
      console.log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={code}
          style={styles.textInput}
          placeholder='Code...'
          placeholderTextColor='#000'
          onChangeText={(code) => setCode(code)}
        />
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
        <Text style={styles.primaryButtonText}>Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
}
