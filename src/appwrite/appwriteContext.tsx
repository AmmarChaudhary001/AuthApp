import React, { createContext, FC, PropsWithChildren, useState } from 'react'

import AuthAppService from './service'

type AuthAppType={
    appwrite:AuthAppService;
    isLoggedIn:Boolean;
    setIsLoggedIn:(isLoggedIn:boolean)=>(void)
}


export const AuthAppContext=createContext<AuthAppType>({
    appwrite: new AuthAppService(),
    isLoggedIn:false,
    setIsLoggedIn:()=>{}
})


export const AuthAppProvider:FC<PropsWithChildren> = ({children}) => {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const defaultValue={
        appwrite: new AuthAppService(),
        isLoggedIn,
        setIsLoggedIn,
    }


  return (
    <AuthAppContext.Provider value={defaultValue}>
        {children}
    </AuthAppContext.Provider>
  )
}


export default AuthAppProvider
