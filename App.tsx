import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NativeBaseProvider, Spinner } from 'native-base'

export default function App() {
  // commetn
  //cx
  return (
    <NativeBaseProvider>
      <View className="bg-green-200 flex flex-column h-full justify-center items-center">
        <Text className="p-4">PLANT</Text>
        <Text className="bg-black p-4 ">🪴🪴🪴🪴🪴🪴🪴🪴🪴🪴🪴</Text>
        <Spinner className="mt-10" color="indigo.500" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  )
}
