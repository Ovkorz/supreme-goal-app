import { defineStore } from "pinia";

import axios from 'axios'

import { useGlobalAuthToken } from "./authToken";
import {Goal, GoalData } from "@/util/types"

import { alarmOutline, glasses, list } from "ionicons/icons";


type GoalResponse = {
  data: GoalData;
};

const defaultState = {
  list: [] as Array<Goal>,
  list_name: "1st list",
  max_id: 1,
}

export const useGoalStore = defineStore({
    id: 'goalStore',
    // new Goal("come eat some of this cakey 🎂", "he look like he could gain a lil' weigthy", 50, 0.2, 1)
    
    state: () => ({...defaultState }),
    getters: {
      getGoals: (state) => {
        const authStore = useGlobalAuthToken()
        const host_adress = authStore.host_adress
        
        if (state.list.length == 0){


          const tokenStore = useGlobalAuthToken()

          axios.get<Array<GoalData>>(`http://${host_adress}:8000/goals`, tokenStore.restAuthHeader).then(response => {
            console.log('goal list from server:')
            console.log(response.data)

            for(const g of response.data){
              state.list.push(
                new Goal(g.title, g.description, g.target, g.amount_done, g.id)
              )
            }
          })           
        }

        return state.list;
      },
      getGoal: (state) => {
        return (index: number) => {
          return state.list[index]
        }
      },
      getGoalsNumber: (state) => {return state.list.length}
    },
    actions:{
      addGoal(goal: Goal){
        this.max_id++;
        goal.id=this.max_id;

        this.list.push(goal);

        type NewGoalData = {
          title:string,
          description: string,
        
          target:number,
          amount_done: number,   
        }

        const data: NewGoalData = {
          title: goal.name,
          description: goal.description,
          target: goal.target,
          amount_done: goal.done,
        }

        const tokenStore = useGlobalAuthToken()
        axios.post<GoalData>(`http://${tokenStore.host_adress}:8000/goals/`, data, tokenStore.restAuthHeader)
          .then(response => {
            console.log(response.data)
          })

        return this.list[-1];
      },
      removeGoal(id: number){
        const goal_i = this.list.findIndex(n => n.id == id)

        if(goal_i != -1){
          this.list.splice(goal_i, 1)
        }

        const tokenStore = useGlobalAuthToken()
        axios.delete(`http://${tokenStore.host_adress}:8000/goals/${id}`, tokenStore.restAuthHeader).then(r =>{
          console.log(r.data)
        })
      },
      changeDone(id: number, change: number){
        console.log(`id: ${id}, change: ${change}`)
        const goal = this.list.find((item) => item.id == id)

        if(goal == undefined){
          throw("Goal id not present.")
        }

        goal.done += change;
        if(goal.done > goal.target){
          goal.done = goal.target;
        }

        goal.progress = goal.done / goal.target;

        type goalData = {
          id: number,
          title: string,

        }

        const tokenStore = useGlobalAuthToken()
        const payload = {
          'id': goal.id,
          'amount_done': goal.done,
        }
        axios.patch(`http://${tokenStore.host_adress}:8000/goals/${id}/`, payload, tokenStore.restAuthHeader).then(r =>{
          console.log(r.data)
        })
      },
      reset(){
        Object.assign(this, defaultState)
        this.list = []
        console.log("goals reset")
      }
    }
})