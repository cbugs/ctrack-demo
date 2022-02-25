import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import VueGoogleMaps from '@fawmi/vue-google-maps';


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
  
        if (!store.state.user) {
            next({ name: 'Login' })
        } else {
            next() // go to wherever I'm going
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
})

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
appInstance.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCGT3y9Ne5SlcF-H8nQethfc4zDDEEPgvo',
    },
});
appInstance.mount("#app");
