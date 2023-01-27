<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Hello!</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hello!</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <h1>This is Goals.</h1>
        <!-- <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p> -->
      
       
        
        <template v-if="connection">
          <ion-label color="success">Connected succesfully!</ion-label> <br>
          <ion-button @click="() => $router.push('/login')"> Go! </ion-button>
        </template>

        <template v-else>
          <ion-item class="ion-padding">
            <ion-label position="stacked">Enter server host IP adress:</ion-label>
            <ion-input v-model="host_adress"></ion-input>
          </ion-item>

          <ion-button @click="checkConnection">Check</ion-button>
        </template>

        
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useGlobalAuthToken } from '@/stores/authToken';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonInput, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';

import axios from 'axios';

export default defineComponent({
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonInput, IonLabel,
  },
  setup(){
    const authStore = useGlobalAuthToken()

    return { authStore }
  },
  data(){
    return{
      host_adress: "192.168.",
      connection: false,
    }
  },
  methods: {
    

    checkConnection(){
      
      type simpleMessage = {
        message: string,
      }
      
      axios.get<simpleMessage>(`http://${this.host_adress}:8000/hello`).then(r => {
        console.log(r.data)

        if (r.status != 200){
          return;
        }

        if(r.data.message == "hello!"){
          this.connection = true;
          this.authStore.host_adress = this.host_adress;
        }
        
      })
    }
  }
})

</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
