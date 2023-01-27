<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/login"></ion-back-button>
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
          <div id="login-form">
            <strong>Create new account:</strong>
            
            <ion-list>

                <ion-item>
                  <ion-label position="stacked">Username</ion-label>
                  <ion-input name="username-input" v-model="username" placeholder="Username"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Password</ion-label>
                  <ion-input name="password-input" v-model="password" type="password"></ion-input>
                </ion-item>

            </ion-list>

            <br><br>
            
            <ion-button @click="() => {attemptSignUp()}"> Sign Up </ion-button>
            <br><br>
            
          </div>
        </div>
      </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonInput,
   IonList, IonItem, IonButtons, IonButton, IonBackButton, toastController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapState } from 'pinia'

import { useGlobalAuthToken } from '@/stores/authToken';

export default defineComponent({
  components:{
    IonContent, IonHeader, IonPage, IonTitle, IonList, IonLabel, IonItem, IonToolbar, IonInput,
     IonButtons, IonButton, IonBackButton,
  },
  setup(){
    const authStore = useGlobalAuthToken()
    
    return { authStore }
  },
  data(){
    // const used_router = useRouter();

    return{
      username: "",
      password: "",
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
    async attemptSignUp(){

      type apiResponse = {
        status:number,
      }

      const authStore = useGlobalAuthToken()
      const resp:apiResponse = await authStore.createAccount(this.username, this.password)
      console.log(resp)

      this.username=""
      this.password=""

      this.$router.back();
      

    },
    
  },
})
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;

  place-content: center;
  vertical-align: middle;

}

#login-form {
  text-align: center;
  margin: auto;
  position: relative;

  top: 50%;
  transform: translateY(-50%);
  max-width: 400px;
}

#login-form strong {
  font-size: 20px;
  line-height: 26px;
}

#login-form p {
  font-size: 16px;
  line-height: 22px;
  
  color: #c3a6a6;
  
  margin: 0;
}

#login-form a {
  text-decoration: none;
}
</style>
