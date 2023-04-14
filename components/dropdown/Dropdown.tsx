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
    } else if (props.title === 'Les thrips') {
      return <MaterialCommunityIcons name='alien' size={30} color='#575757' />
    } else if (props.title === 'Les moucherons') {
      return <MaterialCommunityIcons name='bee' size={35} color='#575757' />
    } else if (props.title === 'Les araignées rouges') {
      return <MaterialCommunityIcons name='spider-thread' size={30} color='#575757' />
    } else if (props.title === 'Les fourmis') {
      return <MaterialCommunityIcons name='google-downasaur' size={30} color='#575757' />
    } else if (props.title === 'Les cochenilles') {
      return <MaterialCommunityIcons name='space-invaders' size={30} color='#575757' />
    } else if (props.title === 'La rouille') {
      return <MaterialCommunityIcons name='virus' size={30} color='#575757' />
    } else if (props.title === 'L’oïdium') {
      return <MaterialCommunityIcons name='bacteria' size={30} color='#575757' />
    } else if (props.title === 'Pourriture des racines') {
      return <MaterialCommunityIcons name='skull' size={30} color='#575757' />
    }
  }

  return (
    <TouchableOpacity onPress={() => onPressHandler()}>
      <View className='w-[140px] mx-2 rounded-lg py-3 flex flex-row items-center justify-center focus:bg-violet-700'>
        <View className='flex flex-row items-center justify-center'>
          <Text>{checkIconName()}</Text>
        </View>
        <Text
          className={`text-md font-semibold ml-2 ${isSelected ? 'text-black' : 'text-[#575757]'}`}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Dropdown
