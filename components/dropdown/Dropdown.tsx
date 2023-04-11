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
      return <MaterialCommunityIcons name='lightbulb-on' size={25} color='black' />
    } else if (props.title === 'La température') {
      return <MaterialCommunityIcons name='thermometer' size={25} color='black' />
    } else if (props.title === 'Le rempotage') {
      return <MaterialCommunityIcons name='shovel' size={25} color='black' />
    } else if (props.title === "L'arrosage") {
      return <MaterialCommunityIcons name='watering-can' size={25} color='black' />
    } else if (props.title === 'Feuilles jaunes') {
      return <MaterialCommunityIcons name='leaf' size={25} color='black' />
    } else if (props.title === 'Moucherons') {
      return <MaterialCommunityIcons name='bee' size={30} color='black' />
    } else if (props.title === 'Moisissures') {
      return <MaterialCommunityIcons name='billiards-rack' size={30} color='black' />
    } else if (props.title === 'Maladies et nuisibles') {
      return <MaterialCommunityIcons name='hospital-box' size={25} color='black' />
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
          <Text className='text-justify text-sm'>{props.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Dropdown
