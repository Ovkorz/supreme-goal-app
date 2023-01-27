import { defineStore } from "pinia";

import axios from 'axios'

import { UserCredentials } from "@/util/types"
import { useGoalStore } from "./goals";

type apiResponse = {
  status:number,
}

export const useGlobalAuthToken = defineStore({
    id: 'authStore',
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
      host_adress: "192.168.0.143",
      connection: false,
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
      setHost(addr: string){
        this.host_adress = addr;
      },
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

          const goalStore = useGoalStore()
          goalStore.reset()
        },
        async logIn(usrnm: string, pw: string){
            const requestBody: UserCredentials = {
              username: usrnm,
              password: pw,
              token: ""
            }

            axios.post<UserCredentials>(`http://${this.host_adress}:8000/auth/`, requestBody).then( response =>{

              console.log(response)
              
              if(response.status == 200){
                this.setToken(requestBody.username, response.data.token)
                return response.data.token;
              }
            })
        },
        async createAccount(usrnm: string, pswd: string): Promise<apiResponse>{
          console.log("Attempting sign up")
          const user: UserCredentials = {
            username: usrnm,
            password: pswd,
            token: "",
          }

          axios.post<UserCredentials>(`http://${this.host_adress}:8000/goals/users/`, user).then(r =>{
            console.log(r.data)
            return r
          })

          return {
            status: 201,
          }
        },
        checkConnection(){
          axios.get<string>(`http://${this.host_adress}:8000/hello`).then(r => {
            console.log(r.data)
    
            if (r.status != 200){
              return;
            }
    
            if(r.data == "hello!"){
              this.connection = true;
            }
            
          })
        }

  }
})