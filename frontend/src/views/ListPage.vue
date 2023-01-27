<template>
  <ion-page>
    <ion-header slot="start" :translucent="true">
      <ion-toolbar>
        <ion-title>Your goals</ion-title>
        
        <ion-buttons slot="end">
          <ion-button id="open-menu-icon" slot="end">
            <ion-icon  slot="icon-only" :icon="icons.ellipsisHorizontal" color="white"></ion-icon>
            <!-- <ion-icon  slot="icon-only" color="white"></ion-icon> -->
          </ion-button>
        </ion-buttons>
        
      </ion-toolbar>
      <ion-popover trigger="open-menu-icon" trigger-action="click" dismiss-on-select="true">
          <ion-button @click="() => logOutAndExit()" color="white">Log out </ion-button>
      </ion-popover>
    </ion-header>

    <ion-content>

      <div id="list-container">
        <ion-list id="goal-list">
          <ion-item v-for="goal in goalList" v-bind:key="goal.id" >
            <goal-list-item :id="goal.id" :progress="goal.progress" @changeAmountDone="(n) => goalStore.changeDone(goal.id, n)">
              <template #title> {{ goal.name }}</template>
              <template #description> {{ goal.description }} </template>
              <template #done-of-target> {{ goal.done }} / {{ goal.target }}</template>
            </goal-list-item>
            <ion-popover :trigger="'open-goal-menu'+goal.id" dismiss-on-select="true">
              <ion-button @click="() => goalStore.removeGoal(goal.id)" color="white">Delete </ion-button>
            </ion-popover>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="$router.push('/new')">
        <ion-icon :icon="icons.add"></ion-icon>
      </ion-fab-button>
    </ion-fab>


  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonPopover,
  IonList, IonItem, IonFab, IonFabButton,} from '@ionic/vue';

import { mapState } from 'pinia';
import {defineComponent } from 'vue';

import { useIconStore } from "@/stores/icons"
import { useGlobalAuthToken } from '@/stores/authToken';
import { useGoalStore } from '@/stores/goals';

import goalListItem from "@/components/GoalListItem.vue"
import { Goal } from "@/util/types"
import axios from 'axios'

type UserCredentials = {
  username: string,
  password: string,
}

export default defineComponent({
  components: {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonPopover,
    IonList, IonItem, goalListItem, IonFab, IonFabButton,},
  setup(){
    const goalStore = useGoalStore()
    const authStore = useGlobalAuthToken()

    goalStore.removeGoal(0)

    return { 
      goalStore,
      authStore,
    }
  },
  data(){
    return { 
    }
  },
  computed:{
    ...mapState(useIconStore, ['icons']),
    // ...mapState(useGlobalAuthToken, {
    //     isLoggedIn: 'success',
    //   }),
    goalList(){
      return this.goalStore.getGoals
    }
  },
  methods:{
    logOutAndExit(){
      this.goalStore.reset()
      this.authStore.logOut()

      console.log("Logging out in list view")
      
      this.$router.push("/")
    },
  },
  created(){
    if(!this.authStore.success){
      this.$router.back()
    }
  },

})

</script>

<style scoped>
#list-container{
  justify-content: center;
  display: flex;
}

#goal-list{
  max-width: 600px;
}
</style>