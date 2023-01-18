import { defineStore } from "pinia";
import * as icons from "ionicons/icons";

export const useIconStore = defineStore({
    id: "icons",

    getters:{
        icons: () => icons,
    }
})