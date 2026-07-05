//Home screen
import Home from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type AppstackParamList = {
    Home:undefined
}

const Stack=createNativeStackNavigator<AppstackParamList>()

export default function AppStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name='Home' 
        component={Home} />
    </Stack.Navigator>
  )
}

