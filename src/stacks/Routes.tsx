import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'


//Auth & App stacks
import Appstack from './AppStack'
import Authstack from './AuthStack'


//Context
import {AuthAppContext} from '../appwrite/appwriteContext'


//Loading Component
import Loading from '../components/Loading'
import { NavigationContainer } from '@react-navigation/native'






const Route = () => {
    const [isLoading, setIsLoading]=useState<boolean>(true)
    const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AuthAppContext)


    useEffect(() => {
      appwrite.getCurrentAcc()
      .then(response=>{
        setIsLoading(false)
            if(response){
                setIsLoggedIn(true)
            }
      })
      .catch(_=>{
        setIsLoading(false)
        setIsLoggedIn(false)
    })
    }, [appwrite, setIsLoggedIn])


    if(isLoading){
        return <Loading />
    }
   
  return (
    <NavigationContainer>
        {isLoggedIn ? <Appstack />: <Authstack />}
    </NavigationContainer>
  )
}


export default Route
