//Signin & Signup screen
import Signin from '../screens/Signin'
import Signup from '../screens/Signup'

//React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type AuthstackParamList = {
    Signin:undefined,
    Signup:undefined
}

const Stack=createNativeStackNavigator<AuthstackParamList>()

export default function AuthStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name='Signin' 
        component={Signin} />
        <Stack.Screen 
        name='Signup' 
        component={Signup} />
    </Stack.Navigator>
  )
}

