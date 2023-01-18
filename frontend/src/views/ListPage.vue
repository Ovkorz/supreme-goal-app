<template>
  <ion-page>
    <ion-header slot="start" :translucent="true">
      <ion-toolbar>
        <ion-title>Your goals</ion-title>
        
        <ion-buttons slot="end">
          <ion-button slot="end">
            <ion-icon slot="icon-only" :icon="icons.ellipsisHorizontal" color="white"></ion-icon>
          </ion-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>

    <ion-content>


    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';

import { useIconStore } from "@/stores/icons"


export default defineComponent({
  components: {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon},
  data(){
    return { }
  },
  computed:{
    ...mapState(useIconStore, ['icons']),
  },
})

</script>
