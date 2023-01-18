import { defineStore } from "pinia";
import {Goal} from "@/util/types"

export const useGoalStore = defineStore({
    id: 'authToken',
   
    state: () => ({
      list: [
        new Goal("be awesome", "just stay as you are ✨", 1, 0),
        new Goal("come eat some of this cakey 🎂", "he look like he could gain a lil' weigthy", 0.2, 1)
      ],
      list_name: "1st list",
      max_id: 1,
    }),
    getters: {
      getGoals: (state) => {return state.list;},
      getGoal: (state) => {
        return (index: number) => {
          return state.list[index]
        }
      },
      getGoalsNumber: (state) => {return state.list.length}
    },
    actions:{
      addGoal(goal: Goal){
        this.list.push(goal);
        return this.list[-1];
      }
    }
})