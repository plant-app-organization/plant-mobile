import React from 'react'
import { Spinner } from 'native-base'
import { TouchableOpacity, Text } from 'react-native'
interface MainButtonProps {
  title: string
  action: any
  disabled: boolean
  loading: boolean
}

const MainButton: React.FunctionComponent<MainButtonProps> = (props) => {
  const { title, action, disabled, loading } = props
  return (
    <TouchableOpacity
      className={`mt-4 w-[95%]  rounded-md flex items-center justify-center  shadow-lg px-2 py-1  ${
        disabled ? 'opacity-60' : 'opacity-100'
      } `}
      style={{ backgroundColor: '#223726' }}
      onPress={action}
      disabled={disabled}
    >
      {!loading ? (
        <Text className='text-white text-lg font-manropeBold'>{title}</Text>
      ) : (
        <Spinner color='white' />
      )}
    </TouchableOpacity>
  )
}

export default MainButton
