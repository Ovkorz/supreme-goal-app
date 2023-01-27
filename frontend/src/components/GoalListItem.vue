<template>

<ion-item button class="goal-list-item">

  <div class="goal-description-card">
    <div class="goal-header">
      <ion-button :id="'open-goal-menu'+id" slot="end">
        <ion-icon  slot="icon-only" :icon="icons.ellipsisHorizontal" color="white"></ion-icon>
        <!-- <ion-icon  slot="icon-only" color="white"></ion-icon> -->
      </ion-button>
      <div id="title-wrapper"> 
        <i class="goal-type"><slot name="type"></slot></i>
        <h3><slot name="title"></slot></h3>
      </div>
    </div>

    <div class="goal-content">

      <p><slot name="description"></slot> </p>

      <div class="goal-progress-toolbar">
        <ion-button slot="start" @click="$emit('changeAmountDone', -1)">
          <ion-icon class="my-ion-icon" slot="icon-only" :icon="icons.remove" color="white"></ion-icon>
        </ion-button>

        <div class="goal-progress-bar-container">
          <i> <slot name="done-of-target"></slot> </i>
          <ion-progress-bar :value="progress"></ion-progress-bar>
        </div>

        <ion-button slot="end" @click="$emit('changeAmountDone', 1)">
          <ion-icon class="my-ion-icon" slot="icon-only" :icon="icons.add" color="white"></ion-icon>    
        </ion-button>
      </div>

    </div>
  </div>

  
</ion-item>
</template>

<script lang = "ts">
import { IonButton, IonItem, IonProgressBar, IonIcon,} from '@ionic/vue';

import { mapState } from 'pinia';
import { defineComponent } from 'vue';

import { useIconStore } from "@/stores/icons"


export default defineComponent({
  components:{
    IonItem, IonButton, IonIcon, IonProgressBar,
  },
  props:{
    colorCode: {
      type: String,
      required: false,
      default: "",
    },
    progress: {
      required: true,
    },
    id: {
      type: Number,
    }
  },
  computed:{
    ...mapState(useIconStore, ['icons']),
  },

})
</script>

<style scoped>
.goal-list-item{
  /* --inner-padding-end: 0px;
  --inner-padding-start: 0px; */
  --padding-end: 0px;
  width: 100%;
}

.my-ion-icon {
  --ionicon-stroke-width: 60px;
  color: white;
  margin-top: 5px;
  margin-bottom: 10px;
}

.goal-description-card{
  display: flex;
  flex-direction: column;

  max-height: 300px;
  width: 100%;
}

.goal-header{
  width: 100%;
}
.goal-header ion-button{
  float:right;
  margin-top: 20px;
  --background: transparent;
  --box-shadow: 0px;
}

.goal-header i{
  float: left ;
  line-break: anywhere;
}

#title-wrapper{
  
  max-width: 75%;
}

.goal-content p{
  font-size: 12px;
}

.goal-progress-toolbar{
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
}

.goal-progress-toolbar ion-button {
  width: 70px;
  height: 40px;
}

.goal-progress-bar-container{
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  width: fit-content;
}

.goal-progress-bar-container i {  
  text-align: center;
  padding-bottom: 5px;

}


</style>