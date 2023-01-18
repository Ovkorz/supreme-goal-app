import { defineStore } from "pinia";

import { useDummyServer } from "@/stores/dummyServer"
import { UserCredentials } from "@/util/types"

export const useGlobalAuthToken = defineStore({
    id: 'authToken',
    // state: () => { 
        
    //     useLocalStorage("globalAuthToken", {
    //       username: "",
    //       token: "",
    //       success: false,
    //     })
      
      
    // },
    state: () => ({
      username: "",
      token: "",
      success: false,
    }),
    getters: {
      restAuthHeader(state){
        if(this.success){
          return{
            headers:{
              "Content-type": "application/json",
              "Authorization": "Token " + state.token
            }
          }
        }
        else return undefined
      },
      getUsername(state){
        return state.username
      },
      getToken(state){
        return state.token
      },
      isLoggedIn(state){
        return state.success
      }
    },
    actions:{
        setToken(usrnm: string, tok: string){

            if(usrnm && tok){
                this.username = usrnm
                this.token = tok
                this.success = true
                return true
            }
            else return false
        },
        logOut(){
          this.username = ""
          this.token = ""
          this.success = false
        },
        logIn(usrnm: string, pw: string){
            const requestBody = new UserCredentials (usrnm, pw)

            const token = this.dummyCredentialsChecker(requestBody)

            this.setToken(usrnm,token)
            return token
        },
        dummyCredentialsChecker(body: UserCredentials){
            const dserver = useDummyServer()

            const token = dserver.getToken(body.username, body.password)
            return token
        }
    }
  })