import { createStore } from "vuex";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    user: localStorage.getItem("user")!=null?JSON.parse(localStorage.getItem("user")):false,
    mcolor: "",
    markers:{},
    markersData: localStorage.getItem("markersData")!=null?JSON.parse(localStorage.getItem("markersData")):false,
    vehiclesData: localStorage.getItem("vehiclesData")!=null?JSON.parse(localStorage.getItem("vehiclesData")):false,
    ignitionoff:0,
    driving:0,
     avgspeed:0,
   maxspeed:0,
    deliveryTag:0,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    setMarkers(state,payload){
      console.log("BEFORE",state.markers,payload)
      state.markers = payload;

      state.ignitionoff=0;
      state.driving=0;
      state.avgspeed=0;
      state.maxspeed=0;
      state.deliveryTag=0;

      console.log("AFTER",state.markers)
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setMarkers({ commit }, payload) {
      commit("setMarkers", payload);
    },
  },
  getters: {},
});
