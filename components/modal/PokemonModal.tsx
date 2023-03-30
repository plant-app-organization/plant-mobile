import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Animated, Image } from 'react-native';
import { Modal, Center, Button, FormControl, Input } from 'native-base';

interface PokemonModalProps {
  progress: number;
}

const PokemonModal: React.FunctionComponent<PokemonModalProps> = (props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [nameEvo, setNameIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const images = [
    require('../../assets/avatar1.png'),
    require('../../assets/avatar2.png'),
    require('../../assets/avatar3.png'),
    require('../../assets/avatar4.png'),
  ];

  const name = ['Joliflor', 'Floraroma', 'Beautiflore', 'Melodiflore'];

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleButtonClick = () => {
    console.log('clicked', progress);
    if (progress < 25) {
      setProgress(progress + 5);
      setImageIndex(0);
      setNameIndex(0);
    } else if (progress < 50) {
      setProgress(progress + 5);
      setImageIndex(1);
      setNameIndex(1);
    } else if (progress < 75) {
      setProgress(progress + 5);
      setImageIndex(2);
      setNameIndex(2);
    } else if (progress <= 95) {
      setProgress(progress + 5);
      setImageIndex(3);
      setNameIndex(3);
    } else {
      setProgress(progress);
      setImageIndex(3);
      setNameIndex(3);
    }
  };

  return (
    <Center>
      <TouchableOpacity onPress={() => handleButtonClick()}>
        <Text className='text-black'>Progress</Text>
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content
          style={{ backgroundColor: '#f2fff3' }}
          className='justify-center item-center	bg-transparent'
          maxWidth='350'
        >
          <Modal.Body>
            <View className='items-center rounded'>
              <Text className='font-antipasto text-black text-4xl'>Felicitations !!!</Text>
              <Animated.Image
                source={images[imageIndex]}
                style={{
                  marginTop: 20,
                  width: imageIndex === 1 ? 170 : 200,
                  height: imageIndex === 1 ? 190 : 200,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 5,
                    height: 1,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 4.1,
                }}
              />
              <Text className='font-Roboto  text-black text-2xl'>
                Bravo, tu passes au niveau suivant, évolution en {name[nameEvo]}
              </Text>
              <TouchableOpacity
                className='rounded mt-10 p-3'
                style={{
                  backgroundColor: '#3FA96A',
                }}
                onPress={handleModalClose}
              >
                <Text className='text-white font-Roboto  align-center'>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PokemonModal;
