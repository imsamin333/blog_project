import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId) 
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            })
            if(userAccount){
                return this.logIn({email, password})
            }else{
                return userAccount
            }
        }catch(err){
            console.log("account create error:", err)
            throw err
        }
    }

    async logIn({email, password}){
        try{
            return await this.account.createEmailPasswordSession({
                email,
                password
            })
        }catch(err){
            console.log("login error:", err)
            throw err
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(err){
            console.log("getCurrentUser error:", err)
            return null
        }
    }

    async logOut(){
        try{
            return await this.account.deleteSessions()
        }catch(err){
            console.log("logOut error:", err)
            return null
        }
    }
}

const authService = new AuthService()
export default authService