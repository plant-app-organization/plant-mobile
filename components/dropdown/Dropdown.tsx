import React, { useState } from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import {
  CheckBadgeIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  EyeDropperIcon,
  FireIcon,
  LightBulbIcon,
  SparklesIcon,
  SpeakerWaveIcon,
} from 'react-native-heroicons/solid'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface DropdownProps {
  title: string
  description: string
}

const Dropdown: React.FunctionComponent<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const checkIconName = () => {
    if (props.title === 'La lumière') {
      return <MaterialCommunityIcons name='weather-sunny' size={30} color='black' />
    } else if (props.title === 'La température') {
      return <MaterialCommunityIcons name='thermometer' size={30} color='black' />
    } else if (props.title === "L'acceuillir") {
      return <MaterialCommunityIcons name='human-male-child' size={30} color='black' />
    } else if (props.title === 'Le rempotage') {
      return <MaterialCommunityIcons name='shovel' size={30} color='black' />
    } else if (props.title === "L'arrosage") {
      return <MaterialCommunityIcons name='watering-can' size={30} color='black' />
    } else if (props.title === 'La rouille') {
      return <MaterialCommunityIcons name='biohazard' size={30} color='black' />
    } else if (props.title === 'Moucherons') {
      return <MaterialCommunityIcons name='bee' size={35} color='black' />
    } else if (props.title === 'Les thrips') {
      return <MaterialCommunityIcons name='alien' size={30} color='black' />
    } else if (props.title === 'Les araignées rouges') {
      return <MaterialCommunityIcons name='spider-thread' size={30} color='black' />
    } else if (props.title === 'Les fourmis') {
      return <MaterialCommunityIcons name='google-downasaur' size={30} color='black' />
    } else if (props.title === 'Les cochenilles') {
      return <MaterialCommunityIcons name='butterfly' size={30} color='black' />
    } else if (props.title === 'Moisissures') {
      return <MaterialCommunityIcons name='mushroom' size={30} color='black' />
    } else if (props.title === 'L’oïdium') {
      return <MaterialCommunityIcons name='virus' size={30} color='black' />
    }
  }

  return (
    <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
      <View className={`w-full py-3 mb-2 ${isOpen ? 'h-auto' : 'h-fit'}`}>
        <View className='w-full flex flex-row items-center justify-between px-5'>
          <View className='w-[10%] flex flex-row items-center justify-center'>
            <Text>{checkIconName()}</Text>
          </View>
          <View className='w-[85%] flex flex-row justify-between items-center'>
            <Text className='text-lg'>{props.title}</Text>
            <ChevronDownIcon color={'gray'} />
          </View>
        </View>
        <View className={`w-full py-5 px-5 ${isOpen ? 'flex' : 'hidden'}`}>
          <Text className='text-justify text-sm text-left'>{props.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Dropdown
