// import {ref, watch } from "vue";
import { defineStore } from "pinia";

export const useDummyServer = defineStore({
    id: "dummyServer",
    state: () => ({
        // eslint-disable-next-line no-unused-labels
        users: [
            {
                credentials: {
                    username: "simon",
                    password: "123",
                },
                token: "bla",
            },
        ],
    }),
    getters:{
        getToken: (state) => {
            return (usrnm: string, pw: string) => {
                const matchingUser = state.users.find(user => user.credentials.username === usrnm );
                
                if(matchingUser == undefined) {
                    return "meh"
                }
                else if(matchingUser.credentials.password == pw){
                    return matchingUser.token;
                }
                else{
                    return "wrong password"
                }
            }
        }
    }
})