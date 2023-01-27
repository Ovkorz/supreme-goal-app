<template>
    <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>New Goal</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content  :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <p>Just fill in some details and kick off with the new procrastination adventure!</p>
      
        <ion-list>
            <ion-item>
                <ion-label position="floating"> Title </ion-label>
                <ion-input :clear-input="true" v-model="title" placeholder="Just please not Live, Laugh, Love..."></ion-input>
            </ion-item>

            <ion-item >
                <ion-label position="floating">Description</ion-label>
                <ion-input :clear-input="true" v-model="description" placeholder="Speak your truth or whatever"></ion-input>
            </ion-item>

            <ion-item ref="numInputItem" :class="{'ion-invalid':isInvalidNum, 'ion-valid': () => !isInvalidNum}">
                <ion-label position="floating">Amount</ion-label>
                <ion-input type="number" :clear-input="true" v-model="amount" placeholder="Cause the world is all about numbers"></ion-input>
                <ion-note slot="helper">Enter a number</ion-note>
                <ion-note slot="error">Not a number! Only numbers count 😠</ion-note>
            </ion-item>
        </ion-list>

        <div id="buttons">
            <ion-button @click="addNewGoal">Ready, steady, go!</ion-button>
        </div>
      </div>

    </ion-content>
  </ion-page>

</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
     IonButtons, IonButton, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonNote, toastController } from '@ionic/vue';
import { defineComponent } from 'vue';

import { useGoalStore } from '@/stores/goals';
import { Goal } from '@/util/types';

export default defineComponent({
    components:{ IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonBackButton, 
        IonList, IonLabel, IonInput, IonItem, IonNote, },
    setup(){
        const goalStore = useGoalStore()

        return { goalStore }
    },
    data(){
        return{
            title: "",
            description: "",
            amount: "",
        }
    },
    computed:{
        isInvalidNum(){
            
            const value = this.amount
            if (value === '') return;

            if( isNaN( Number(value) ) ){
                // this.$refs.numInputItem.$el.classList.add('ion-invalid')
                return true;
            }
            
            return false;

        },
    },
    methods:{
        addNewGoal(){
            console.log("add")
            if(this.title == "" || this.description == "" || this.amount == ""){
                this.presentToast('bottom', "Please fill in all the fields.")
            }
            else if(this.isInvalidNum){
                this.presentToast('bottom', "Can't create goal: there are some invalid fields.")
            }
            else {
                const goal = new Goal(this.title, this.description, Number(this.amount))

                const goalCheck = this.goalStore.addGoal(goal)

                this.$router.back()

                // if(goal == goalCheck){
                //     this.$router.back()
                // }
                // else{
                //     console.log(`goal: ${goal}`)
                //     console.log(`goalCheck: ${goalCheck}`)
                // }
            }
        },
        async presentToast(position: 'top' | 'middle' | 'bottom', msg: string) {
        const toast = await toastController.create({
          message: msg,
          duration: 1500,
          position: position
        });

        await toast.present();
      },
    }
})
</script>

<style scoped>
#container{
    align-content: center;
}

#container ion-item{
    padding-bottom: 10px;
    padding: 10px;
}

#container p{
    padding: 10px;
}

#container ion-button{
    text-align: center;
}

#buttons{
    margin: 15px;
    display: block;
    text-align: center;
}
</style>