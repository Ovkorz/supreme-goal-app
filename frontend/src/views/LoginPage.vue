<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title>Log-in</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Log-in page</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <div id="container">
          <strong>Login to your account:</strong>
          
          <ion-list>

              <ion-item>
                <ion-label position="stacked">Username</ion-label>
                <ion-input name="username-input" v-model="username" placeholder="Username"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Password</ion-label>
                <ion-input name="password-input" v-model="password" type="password" placeholder="123"></ion-input>
              </ion-item>

          </ion-list>

          <ion-label> just to check: {{ username }} </ion-label>
          <br><br>
          
          <ion-button @click="() => {attemptLogIn()}"> Log in </ion-button>
          <br><br>
          
          <ion-label> {{ specialMessage }} </ion-label>
          
        </div>
      </ion-content>
    </ion-page>
  </template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonList, IonItem, IonButtons, IonButton, IonBackButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapState } from 'pinia'

import { useGlobalAuthToken } from '@/stores/authToken';

export default defineComponent({
  components:{
    IonContent, IonHeader, IonPage, IonTitle, IonList, IonLabel, IonItem, IonToolbar, IonInput, IonButtons, IonButton, IonBackButton, 
  },
  data(){
    // const used_router = useRouter();

    return{
      username: "simon",
      password: "123",
      remember: true,
      specialMessage: "",
      // router: used_router,
    }
  },
  computed:{
    ...mapState(useGlobalAuthToken, {
      isLoggedIn: 'success',
    }),
    // ...mapWritableState(useGlobalAuthToken, ['success','token','username']),
  },
  methods:{
    attemptLogIn(){
      const authStore = useGlobalAuthToken()
      const token = authStore.logIn(this.username, this.password)
      console.log(token)

      if(this.isLoggedIn){
        this.specialMessage = "unable to log in :/"

        
        this.$router.push("/list")
      }
      else {
        this.specialMessage = "unable to log in :/"
      }
    }
  },
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
  
  color: #c3a6a6;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
