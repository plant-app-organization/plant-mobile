import React, { useState } from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

interface DropdownProps {
  title: string
  selectTitle: (params: string) => void
}

const Dropdown: React.FunctionComponent<DropdownProps> = (props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const onPressHandler = () => {
    setIsSelected(!isSelected)
    props.selectTitle(props.title)
  }

  const checkIconName = () => {
    if (props.title === 'Luminosité') {
      return <MaterialCommunityIcons name='lightbulb-on' size={20} color='#575757' />
    } else if (props.title === 'Température') {
      return <MaterialCommunityIcons name='thermometer' size={20} color='#575757' />
    } else if (props.title === 'Rempotage') {
      return <MaterialCommunityIcons name='shovel' size={20} color='#575757' />
    } else if (props.title === 'Arrosage') {
      return <MaterialCommunityIcons name='watering-can' size={20} color='black' />
    } else if (props.title === 'Feuilles jaunes') {
      return <MaterialCommunityIcons name='leaf' size={20} color='#575757' />
    } else if (props.title === 'Moucherons') {
      return <MaterialCommunityIcons name='bee' size={30} color='#575757' />
    } else if (props.title === 'Moisissures') {
      return <MaterialCommunityIcons name='billiards-rack' size={30} color='#575757' />
    } else if (props.title === 'Maladies') {
      return <MaterialCommunityIcons name='hospital-box' size={25} color='#575757' />
    }
  }

  return (
    <TouchableOpacity onPress={() => onPressHandler()}>
      <View
        className={`w-[140px] mx-2 rounded-lg py-3 flex flex-row items-center justify-center focus:bg-violet-700`}
      >
        <View className='flex flex-row items-center justify-center'>
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
      <Text
        className={`text-md font-semibold ml-2 ${isSelected ? 'text-black' : 'text-[#575757]'}`}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default Dropdown
