import {ID, Account, Client} from 'react-native-appwrite'
import Config from "react-native-config";


//SnackBar
import { Snackbar } from 'react-native-snackbar';


const appClient = new Client()


const APP_ENDPOINT : string=Config.APP_ENDPOINT!;
const APP_ID : string=Config.APP_ID!;


//Signup User Type
type SignupUser={
    name:string,
    email:string,
    password:string
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
        .setEndpoint(APP_ENDPOINT )
        .setProject(APP_ID ) 




        this.account=new Account(appClient)
    }


    //Create New Account
    async SignupAcc({name,email,password}:SignupUser){
        try {
            await this.account.create(
                ID.unique(),
                name,
                email,
                password
            )
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
            await this.account.createEmailPasswordSession(email,password)
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
            await this.account.get()
        } catch (error) {
            console.log("getCurrentAcc::Error= ",error)
        }
    }


    async logoutAcc(){
         try {
            await this.account.deleteSession('current')
        } catch (error) {
            Snackbar.show({
                text:"Account Logged Out Successfully!",
                duration:Snackbar.LENGTH_SHORT
            })
            console.log("logoutAcc::Error= ",error)
        }
    }
}


export default AppwriteService
