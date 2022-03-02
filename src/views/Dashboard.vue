<template>
<div>

  <div v-if="!loaded" class="text-center"><img :src="loader" class="w-10f0 m-auto text-center"/></div>
 <div v-if="loaded" class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          :title="'Ingnition Off'"
          :value="this.$store.state.ignitionoff"
          :iconClass="stats.money.iconClass"
          :iconBackground="stats.iconBackground"
          directionReverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          :title="'Driving'"
          :value="this.$store.state.driving"
          :iconClass="stats.users.iconClass"
          :iconBackground="stats.iconBackground"
          directionReverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <card
          :title="'Average Speed'"
          :value="Object.keys(this.$store.state.markers).length>0?Math.floor(this.$store.state.avgspeed/Object.keys(this.$store.state.markers).length):'0'"
          :iconClass="stats.clients.iconClass"
          :iconBackground="stats.iconBackground"
          :percentageColor="'text-danger'"
          directionReverse
        ></card>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0">
        <card
          :title="'Max Speed'"
          :value="this.$store.state.maxspeed"
          :iconClass="stats.sales.iconClass"
          :iconBackground="stats.iconBackground"
          directionReverse
        ></card>
      </div>
    </div>

<div class="row mb-3">

      <div class="col-12">
        <div>Companies:</div>


  <Multiselect
  @select="getPositions"
  @deselect="getPositions"
  @clear="getPositionsClear" 
    v-model="company"
    mode="tags"
    placeholder="Select companies"
    track-by="name"
    label="name"
    :close-on-select="false"
    :search="true"
    :options="companies"
  >
    <template v-slot:tag="{ option, handleTagRemove, disabled }">
      <div class="multiselect-tag is-user">
        <img :src="option.icon">
        {{ option.name }}
        <span
           v-if="!disabled"
           class="multiselect-tag-remove"
           @mousedown.prevent="handleTagRemove(option, $event)"
        >
          <span class="multiselect-tag-remove-icon"></span>
        </span>
      </div>
    </template>
 </Multiselect>


</div>
</div>

    <div class="row">

      <div class="col-12">
       <div class="card">
          <div class="card-body p-1">
            <div class="row">
         <div class="col-12">
 <GMapMap
 :center="center"
      :zoom="4"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
  >
    <GMapCluster :styles="clusterIcon">
      <GMapMarker
          :key="index"
          v-for="(m, index) in this.$store.state.markers"
          :position="m.position"
          :clickable="true"
          :icon="'https://dummyimage.com/22x22/'+companyColors[m.info.Company]+'/fff&text='+m.info.Company.toUpperCase()"
          :draggable="true"
         @click="openMarker(m.info.NodeId,true)" 
      >

           <GMapInfoWindow
          :closeclick="true"
          @closeclick="openMarker(m.info.NodeId,false)"
          :opened="openedMarkerID.indexOf(m.info.NodeId)>=0"
      >
      <div>Node id: {{ m.info.NodeId }} </div>
       <div>Date: {{ m.info.EventTimeUTC }} </div>
        <div>Driver id: {{ m.info.DriverId }} </div>
         <div>Status: {{ m.info.StatusText }} </div>
      </GMapInfoWindow>

      </GMapMarker>
    </GMapCluster>
  </GMapMap>
  </div></div></div></div>
        </div>

    </div>

    <div class="row d-none">
      <div class="col-lg-7 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex flex-column h-100">
                  <p class="mb-1 pt-2 text-bold">Built by developers</p>
                  <h5 class="font-weight-bolder">Soft UI Dashboard</h5>
                  <p class="mb-5">
                    From colors, cards, typography to complex elements, you will
                    find the full documentation.
                  </p>
                  <a
                    class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                    href="javascript:;"
                  >
                    Read More
                    <i
                      class="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                <div class="bg-gradient-success border-radius-lg h-100">
                  <img
                    src="../assets/img/shapes/waves-white.svg"
                    class="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                    alt="waves"
                  />
                  <div
                    class="position-relative d-flex align-items-center justify-content-center h-100"
                  >
                    <img
                      class="w-100 position-relative z-index-2 pt-4"
                      src="../assets/img/illustrations/rocket-white.png"
                      alt="rocket"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card h-100 p-3">
          <div
            class="overflow-hidden position-relative border-radius-lg bg-cover h-100"
            style="
              background-image: url('https://demos.creative-tim.com/soft-ui-dashboard/assets/img/ivancik.jpg');
            "
          >
            <span class="mask bg-gradient-dark"></span>
            <div
              class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3"
            >
              <h5 class="text-white font-weight-bolder mb-4 pt-2">
                Work with the rockets
              </h5>
              <p class="text-white">
                Wealth creation is an evolutionarily recent positive-sum game.
                It is all about who take the opportunity first.
              </p>
              <a
                class="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                href="javascript:;"
              >
                Read More
                <i
                  class="fas fa-arrow-right text-sm ms-1"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row d-none">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <!-- chart -->
            <active-users-chart />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart />
        </div>
      </div>
    </div>
    <div class="row my-4 d-none">
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <projects-card />
      </div>
      <div class="col-lg-4 col-md-6">
        <Orders-card />
      </div>
    </div>
  </div>
</div>
 
</template>

<style>
  .multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #35495e;
    margin: 3px 3px 8px;
  }

  .multiselect-tag.is-user img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    border: 1px solid #fff;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;;
  }

  .user-image {
    margin: 0 6px 0 0;
    border-radius: 50%;
    height: 22px;
  }
</style>

<script>
import Card from "@/examples/Cards/Card.vue";
import ActiveUsersChart from "@/examples/Charts/ActiveUsersChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import OrdersCard from "./components/OrdersCard.vue";
import ProjectsCard from "./components/ProjectsCard.vue";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import { mapActions } from "vuex";
import Multiselect from '@vueform/multiselect';
import loader from "@/assets/img/loader.gif";

// AIzaSyCGT3y9Ne5SlcF-H8nQethfc4zDDEEPgvo
export default {
  name: "dashboard-default",

  data() {
    return {
      loader,
       openedMarkerID: [],
               company: ['th','un','gr','cr','zi','ts'],
               companyColors:{
    'th': '005f73',
    'un': 'ee9b00',
    'gr': 'ae2012',
    'cr': 'fb8500',
    'zi': 'f72585',
    'ts': '2d6a4f'
  },
        companies: [
          { value: 'th', name: 'TH tankers', icon: 'https://dummyimage.com/16x16/005f73/fff&text=TH' },
          { value: 'un', name: 'Unitrans', icon: 'https://dummyimage.com/16x16/ee9b00/fff&text=UN' },
          { value: 'gr', name: 'Grindrod', icon: 'https://dummyimage.com/16x16/ae2012/fff&text=GR' },
          { value: 'cr', name: 'Cross Roads', icon: 'https://dummyimage.com/16x16/fb8500/fff&text=CR' },
          { value: 'zi', name: 'Zimbulk Tankers', icon: 'https://dummyimage.com/16x16/f72585/fff&text=ZI' },
          { value: 'ts', name: 'Tswana Fuel', icon: 'https://dummyimage.com/16x16/2d6a4f/fff&text=TS' }
        ],
  //      ignitionoff:0,
  //      driving:0,
  //       avgspeed:0,
  //     maxspeed:0,
  // deliveryTag:0,
  continueSearch:true,
    //  Cignitionoff:0,
    //    Cdriving:0,
    //     Cavgspeed:0,
    //   Cmaxspeed:0,

      loaded:false,
       center: {lat: -33.918861, lng: 18.423300},
  
        clusterIcon:[{
      height: 53,
      url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m1.png",
      width: 53
    },
    {
      height: 56,
      url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m2.png",
      width: 56
    },
    {
      height: 66,
      url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m3.png",
      width: 66
    },
    {
      height: 78,
      url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m4.png",
      width: 78
    },
    {
      height: 90,
      url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m5.png",
      width: 90
    }
  ],
      stats: {
        iconBackground: "bg-gradient-primary",
        money: {
          title: "Today's Money",
          value: "$53,000",
          percentage: "+55%",
          iconClass: "fa fa-toggle-off",
        },
        users: {
          title: "Today's Users",
          value: "2,300",
          percentage: "+3%",
          iconClass: "fa fa-car",
        },
        clients: {
          title: "New Clients",
          value: "+3,462",
          percentage: "-2%",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "fa fa-fast-forward",
        },
        sales: {
          title: "Sales",
          value: "$103,430",
          percentage: "+5%",
          iconClass: "fa fa-flash",
        },
      },
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  components: {
    Card,
    ActiveUsersChart,
    GradientLineChart,
    ProjectsCard,
    Multiselect,
    OrdersCard,
  },
  methods:{
    ...mapActions(["setMarkers"]),
      openMarker(id,add) {
        if(add){
          this.openedMarkerID.push(id);
        } else {
          this.openedMarkerID = this.openedMarkerID.filter(item => item !== id)
          // this.openedMarkerID.splice(this.openedMarkerID.indexOf(id),1);
        }
        console.log(this.openedMarkerID)
    },
    async getPositionsClear(){
      this.company = [];
      this.getPositions();
    },
    async getPositions(){
     
      this.setMarkers({});

      let response = false;
      var c_positions = {'ok':false};
      if(!this.$store.state.markersData){
          c_positions = await fetch("http://ctrack.echohive.net/ctrack.php", {
        method: "post",
        body: JSON.stringify({
          url:`https://tstapi.ctrackonline.co.za/DCTTPIEngine/TPIEngine/REST/Queues/${this.$store.state.user.SessionToken}/GetPositions?autoack=false&limit=500`,
          method: 'get'
        }),
        });
      } else {
        response = this.$store.state.markersData;
        c_positions = {'ok':true};
      }

      if(c_positions.ok){
        // this.$store.state.markers = {};
        if(!response){
          response = await c_positions.json();

        if(response.ErrorCode > 0){
          this.$store.state.user = false;
      localStorage.removeItem("user");
      this.$router.push({name:'Login'}) 
        }

        let positionsB = response.VehiclePositionsDetailed;
        let arrB = Object.keys(this.companies);
        for(var iB=0;iB<positionsB.length;iB++){
          response.VehiclePositionsDetailed[iB].Company = this.companies[arrB[Math.floor(Math.random() * arrB.length)]].value;
        }

        }
        localStorage.setItem("markersData",JSON.stringify(response));
       this.$store.state.markersData = response;


       let positions = response.VehiclePositionsDetailed;
       for(var i=0;i<positions.length;i++){
         if(this.company.indexOf(positions[i].Company) < 0 ){
           continue;
         }
        // console.log("COMPANY",this.company)

          if(this.$store.state.deliveryTag > positions[i].DeliveryTag && i==0){
            // this.continueSearch=false;
          }

         if(positions[i].StatusText == "Driving"){
           this.$store.state.driving  = this.$store.state.driving+1;
         }

        if(positions[i].StatusText == "Ignition off"){
           this.$store.state.ignitionoff  = this.$store.state.ignitionoff+1;
         }

         if(this.$store.state.maxspeed < positions[i].StreetMaxSpeed){
           this.$store.state.maxspeed = positions[i].StreetMaxSpeed;
         }

if(this.$store.state.markers[positions[i].NodeId] === undefined){
if(positions[i].StreetMaxSpeed !== undefined){
  this.$store.state.avgspeed = this.$store.state.avgspeed+positions[i].StreetMaxSpeed;

}
}

         this.$store.state.markers[positions[i].NodeId] = 
{
          info:positions[i],
          position: {
            lat: positions[i].Latitude, lng: positions[i].Longitude
          },
        }
         ;
  this.$store.state.deliveryTag = positions[i].DeliveryTag;
       }
// console.log("marker",this.markers)
       
       if(this.continueSearch){
        //  setTimeout(()=>{
        //    this.getPositions();
        //  },5000)
       }
        // if(response.ErrorCode == 0){
        
        // } else {
        
        // }
      }
    this.loaded=true;
    }
  },
  created(){
    
      this.getPositions();

  }
};
</script>


<style>
  .vue-map{
    height:400px!important;
    border-radius:1rem;
  }
</style>