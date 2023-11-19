import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FormStackNavigatorParamList } from './types'
import AddNewOfferStep1Screen from '../screens/AddNewOffer/AddNewOfferStep1Screen'
import AddNewOfferStep2Screen from '../screens/AddNewOffer/AddNewOfferStep2Screen'
import AddNewOfferStep3Screen from '../screens/AddNewOffer/AddNewOfferStep3Screen'
import AddNewOfferStep4Screen from '../screens/AddNewOffer/AddNewOfferStep4Screen'
import AddNewOfferStep5Screen from '../screens/AddNewOffer/AddNewOfferStep5Screen'
const FormStack = createNativeStackNavigator<FormStackNavigatorParamList>()
import NextButton from './components/NextButton'
import PreviousButton from './components/PreviousButton'
import GradientTitle from '../components/GradientTitle/GradientTitle'
import CameraScreen from '../screens/CameraScreen/CameraScreen'
export default function FormStackNavigator() {
  return (
    <FormStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <FormStack.Screen
        name='AddNewOfferStep1Screen'
        component={AddNewOfferStep1Screen}
        // options={{
        //   animationTypeForReplace: 'push',
        //   animation: 'slide_from_right',
        // }}

        options={({ navigation }) => ({
          headerTitle: () => <GradientTitle title='Vendez votre plante' align='left' />,

          headerLeft: () => null, // No 'Previous' button on the first step
          headerRight: () => (
            <NextButton navigation={navigation} nextScreenName='AddNewOfferStep2Screen' />
          ),
        })}
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <FormStack.Screen
        name='AddNewOfferStep2Screen'
        component={AddNewOfferStep2Screen}
        options={({ navigation }) => ({
          headerLeft: () => <PreviousButton navigation={navigation} />,
          headerRight: () => (
            <NextButton navigation={navigation} nextScreenName='AddNewOfferStep3Screen' />
          ),
        })}
      />
      <FormStack.Screen
        name='AddNewOfferStep3Screen'
        component={AddNewOfferStep3Screen}
        options={({ navigation }) => ({
          headerLeft: () => <PreviousButton navigation={navigation} />,
          headerRight: () => (
            <NextButton navigation={navigation} nextScreenName='AddNewOfferStep4Screen' />
          ),
        })}
      />
      <FormStack.Screen
        name='AddNewOfferStep4Screen'
        component={AddNewOfferStep4Screen}
        options={({ navigation }) => ({
          headerLeft: () => <PreviousButton navigation={navigation} />,
          headerRight: () => (
            <NextButton navigation={navigation} nextScreenName='AddNewOfferStep1Screen' />
          ),
        })}
      />
      <FormStack.Screen
        name='AddNewOfferStep5Screen'
        component={AddNewOfferStep5Screen}
        options={({ navigation }) => ({
          headerLeft: () => <PreviousButton navigation={navigation} />,
          headerRight: () => (
            <NextButton navigation={navigation} nextScreenName='AddNewOfferStep1Screen' />
          ),
        })}
      />
      {/* Camera Screen*/}

      <FormStack.Screen
        name='CameraScreen'
        component={CameraScreen}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_bottom',
        }}
      />
    </FormStack.Navigator>
  )
}
