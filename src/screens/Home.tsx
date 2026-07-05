import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    SafeAreaView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'

//SnackBar
import { Snackbar } from 'react-native-snackbar'

//Appwrite Context
import { AuthAppContext } from '../appwrite/appwriteContext'


//FAB
import { FAB } from '@rn-vui/themed'

export type userObj = {
    name:string,    
    email:string
}


export default function Home() {

    const [userData, setUserData]=useState<userObj>()
    const {appwrite, setIsLoggedIn}=useContext(AuthAppContext)

    const manageLogout=()=>{
        appwrite.logoutAcc()
        .then(()=>{
            setIsLoggedIn(false);
            Snackbar.show({
                text:'Account Logged out successfully!',
                duration:Snackbar.LENGTH_SHORT
            })
        })
    }


    useEffect(() => {
      appwrite.getCurrentAcc()
      .then(response=>{
        if(response){
            const user:userObj={
                name:response.name,
                email:response.email
            }
            setUserData(user)
        }
      })
    }, [appwrite])
    
  return (
     <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{
              uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
              width: 400,
              height: 300,
              cache: 'default',
            }}
            resizeMode="contain"
          />
          <Text style={styles.message}>
            Build Fast. Scale Big. All in One Place.
          </Text>
          {userData && (
            <View style={styles.userContainer}>
              <Text style={styles.userDetails}>Name: {userData.name}</Text>
              <Text style={styles.userDetails}>Email: {userData.email}</Text>
            </View>
          )}
        </View>
        <FAB
          placement="right"
          color="#f02e65"
          size="large"
          title="Logout"
          icon={{name: 'logout', color: '#FFFFFF'}}
          onPress={manageLogout}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
})