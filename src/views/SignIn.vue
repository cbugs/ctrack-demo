<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btnBackground="bg-gradient-success"
          v-bind:darkMode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-1 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">
                    CTrack Demo Dashboard
                  </h3>
                  <p class="mb-0">Enter your email and password</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <label>Username</label>
                    <vsud-input type="text"
                      :value="username"
                      @input="username = $event.target.value"
                      placeholder="Username" name="username" />
                    <label>Password</label>
                    <vsud-input
                      type="password"
                      placeholder="Password"
                      name="password"
                      :value="password"
                      @input="password = $event.target.value"
                    />
                    <vsud-switch class="d-none" id="rememberMe" checked>
                      Remember me
                    </vsud-switch>
                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        @click="login"
                        color="info"
                        fullWidth
                        >Sign in
                      </vsud-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2 d-none">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-info text-gradient font-weight-bold"
                      >Sign up</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/car.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudSwitch,
    VsudButton,
  },
  data() {
    return {
      submitting:false,
      username: "",
      password: ""
    };
  },
  methods: {
    async login(e) {
      this.submitting=true;
      e.preventDefault();

      var login = await fetch("http://localhost/ctrack.php", {
        method: "post",
        body: JSON.stringify({
          url:`https://tstapi.ctrackonline.co.za/DCTTPIEngine/TPIEngine/REST/Membership/Login?username=${this.username}&password=${this.password}`,
          method: 'get'
        }),
      });

      if(login.ok){
       let response = await login.json();
        if(response.ErrorCode == 0){
          console.log("UserInfo",response.UserId,response.SessionToken);
        } else {
          console.log("Wrong Login")
        }
      }
    }
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
