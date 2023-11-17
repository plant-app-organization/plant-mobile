import React, { useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Text, TouchableOpacity } from 'react-native'
import { useUser } from '@clerk/clerk-expo'

import { Modal } from 'native-base'
interface ConnectModalProps {}
//
const ConnectModal: React.FunctionComponent<ConnectModalProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true)
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const { isSignedIn } = useUser()

  const handleNavigation = () => {
    navigation.navigate('BottomTabs', { screen: 'Home' })
    setIsOpen(false)
  }
  useEffect(() => {
    !isSignedIn && isFocused && setIsOpen(true)
  }, [isSignedIn, isFocused])
  return (
    <Modal isOpen={isOpen} safeAreaTop={true}>
      <Modal.Content style={{ backgroundColor: '#f2fff3' }} maxWidth='350'>
        <Modal.Header style={{ backgroundColor: '#f2fff3' }}>
          <Text className='text-xl font-Roboto   ml-3 text-center'>
            Connectez-vous pour découvrir toutes les fonctionnalités
          </Text>
        </Modal.Header>
        <Modal.Body>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BottomTabs', { screen: 'Profile' })
            }}
          >
            <Text
              style={{ backgroundColor: '#f2fff3' }}
              className='text-md font-Roboto text-center  ml-3 '
            >
              Se connecter ou s'inscrire
            </Text>
          </TouchableOpacity>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f2fff3' }}>
          <TouchableOpacity onPress={() => handleNavigation()}>
            <Text className='text-xs   ml-3 text-center font-Roboto   '>Non merci</Text>
          </TouchableOpacity>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default ConnectModal
