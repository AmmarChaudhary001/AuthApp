import {ID, Account, Client} from 'react-native-appwrite'
import Config from "react-native-config";


//SnackBar
import { Snackbar } from 'react-native-snackbar';


const appClient = new Client()


const APP_ENDPOINT : string=Config.APP_ENDPOINT!;
const APP_ID : string=Config.APP_ID!;


//Signup User Type
type SignupUser={
    email:string,
    password:string,
    name:string
}


//Login User Type
type loginUser={
    email:string,
    password:string
}


class AppwriteService{
    account;


    constructor(){
        appClient
        .setEndpoint(APP_ENDPOINT)
        .setProject(APP_ID) 




        this.account=new Account(appClient)
    }


    //Create New Account
    async SignupAcc({email, password, name}:SignupUser){
        try {
            const userAcc=await this.account.create(
                {
                userId:ID.unique(),
                email,
                password,
                name
                }
            )
            if(userAcc){
                return this.loginAcc({email, password});
            }else{
                return userAcc
            }
        } catch (error) {
            Snackbar.show({
                text:"Please Try again in a while!",
                duration:Snackbar.LENGTH_LONG
            })
            console.log("SignupAcc::Error= ",error)
        }
    }
    async loginAcc({email,password}:loginUser){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            Snackbar.show({
                text:"Please Try again in a while!",
                duration:Snackbar.LENGTH_SHORT
            })
            console.log("loginAcc::Error= ",error)
        }
    }


    async getCurrentAcc(){
         try {
            return await this.account.get()
        } catch (error) {
            console.log("getCurrentAcc::Error= ",error)
        }
    }


    async logoutAcc(){
         try {
            return await this.account.deleteSession('current')
             Snackbar.show({
                text:"Account Logged Out Successfully!",
                duration:Snackbar.LENGTH_SHORT
            })
        } catch (error) {
            console.log("logoutAcc::Error= ",error)
        }
    }
}


export default AppwriteService
