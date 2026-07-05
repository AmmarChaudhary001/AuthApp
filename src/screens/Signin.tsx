import { 
    StyleSheet, 
    Text, 
    View,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Platform,
     } from 'react-native'
import React, { useContext, useState } from 'react'

//Snackbar
import { Snackbar } from 'react-native-snackbar'

import { AuthstackParamList } from '../stacks/AuthStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

//Context Api
import { AuthAppContext } from '../appwrite/appwriteContext'

type SigninProps=NativeStackScreenProps<AuthstackParamList,'Signin'>


export default function Signin() {

    const {appwrite, setIsLoggedIn}=useContext(AuthAppContext)

    const [error, setError]=useState<string>('')
    const [email, setEmail]=useState<string>('')
    const [password, setPassword]=useState<string>('')

    const manageLogin=()=>{
        if(email.length<1 || password.length<1){
            setError('All Fields are required!')
            }else{
                const user={
                    email,
                    password
                }
                appwrite.loginAcc(user)
                .then(Response=>{
                    if(Response){
                        setIsLoggedIn(true);
                    }else{
                        Snackbar.show({
                            text:'Please Try Again Later!',
                            duration:Snackbar.LENGTH_SHORT
                        })
                    }
                }).catch(e=>{
                    console.log("manageLogin() :: Error: ",e)
                    setError(e);
                })
            }
        }

    
  return (
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Email */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login button */}
        <Pressable
          onPress={manageLogin}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        {/* Sign up navigation */}
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account?{'  '}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
})