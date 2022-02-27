<template>
  <div class="card mb-4">
    <div class="card-header pb-0 ">
      <h6>Vehicles</h6>
      <div class="row d-none">
        <div class="col-4">
          <div 
          class="text-secondary text-xxs 
          font-weight-bolder opacity-7">Search Text:</div>
        </div>
                   
      </div>
      <div class="row">
        <div class="col-4">
          <input type="text" v-model="search" class="form-control " placeholder="Search Text" />
        </div>
               
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-2">
        <table class="table align-items-left mb-0">
          <thead>
            <tr>
              <th class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Node id</th>
              <th
                class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Type</th>
              <th
                class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Vehicle Registration</th>
              <th
                class="text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Last Updated</th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, index) in filteredVehicles" :key="index">
              <td class="align-middle text-left">
                <p class="text-xs font-weight-bold mb-0">{{ v.NodeId }}</p>
              </td>

              <td class="align-middle text-left">
                <p class="text-xs font-weight-bold mb-0">{{ v.Type }}</p>
              </td>

              <td class="align-middle text-left">
                <p class="text-xs font-weight-bold mb-0">{{ v.VehicleRegistration }}</p>
              </td>

              <td class="align-middle text-left">
                <p class="text-xs font-weight-bold mb-0">{{ v.LastTime }}</p>
              </td>

           <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-primary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                   data-bs-toggle="modal" data-bs-target="#vehicleDetails"
                   @click="setVehicleDetail(v)"
                >Get last position</a>
              </td>

                   <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-primary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                   data-bs-toggle="modal" data-bs-target="#vehicleTrips"
                   @click="setVehicleTripDetail(v)"
                >View Trips</a>
              </td>
            </tr>
          </tbody>
        </table>

<nav class="mt-3">
  <ul class="pagination mx-1 flex-wrap pagination-sm">

    <li v-for="(v,i) in [...Array(Math.ceil(vehicles.length/this.pageLimit))]" :key="i" class="page-item" :class="((i+1)==this.pageNumber)?'active':''">
      <a @click="setPageNumber(i+1)" class="page-link" href="#">{{ i+1 }}</a>
      </li>
  </ul>
</nav>
        <div class="modal fade" id="vehicleDetails" tabindex="-1" aria-labelledby="vehicleDetailsLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="vehicleDetailsLabel">Last Position - Vehicle id: {{selectedVehicle.NodeId}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <div class="row">
         <div class="col-12">
 <GMapMap
 :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
  >
    <GMapCluster :styles="clusterIcon">
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
      >


      </GMapMarker>
    </GMapCluster>
  </GMapMap>
  </div></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>



        <div class="modal fade" id="vehicleTrips" tabindex="-1" aria-labelledby="vehicleTripsLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="vehicleTripsLabel">Vehicle Trips - Vehicle id: {{selectedVehicle.NodeId }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <div class="row">
         <div class="col-12">
           <select @change="selectTrip($event)" class="form-control mb-3">
             <option :value="i" v-for="(trip,i) in trips" :key="i">{{ trip.TripStartUTC }} - {{ trip.TripEndUTC }}</option>
             </select>
   <GMapMap
      :center="center"
      :zoom="20"
  >

        <GMapMarker
          :key="index"
          v-for="(m, index) in tripMarkers"
          :position="m.position"
          @click="openInfo(index,true)"
          :clickable="true"
          :draggable="true"
      >

           <GMapInfoWindow
          :closeclick="true"
           @closeclick="openInfo(index,false)"
          
          :opened="m.opened"
      >
      <div>
        <div v-if="index==0"><b>Start</b></div>
 <div v-if="index==1"><b>End</b></div>
        <div>{{m.location}}</div>
           <div>{{m.time}}</div>
        </div>
      </GMapInfoWindow>

  </GMapMarker>
    <GMapPolygon
        :paths="paths"
    />
  </GMapMap>
  </div></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
// import VsudAvatar from "@/components/VsudAvatar.vue";
// import VsudBadge from "@/components/VsudBadge.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";
import img3 from "../../assets/img/team-4.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-2.jpg";
import img6 from "../../assets/img/team-4.jpg";

export default {
  name: "vehicles-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      pageNumber:1,
      pageLimit:10,
      search:"",
      markers: [],
      trips:[],
      vehicles:[],
      tripMarkers:[],
      selectedVehicle:{},
      paths: [],
      loaded:false,
      center: {lat: -33.918861, lng: 18.423300},
    };
  },
    methods:{
      openInfo(index,open){
        this.tripMarkers[index].opened  = open;
      },
      async setVehicleDetail(selectedVehicle){
        this.selectedVehicle = selectedVehicle;
        var id = selectedVehicle.NodeId;
           var c_vehicles = await fetch("http://ctrack.echohive.net/ctrack.php", {
        method: "post",
        body: JSON.stringify({
          url:`https://tstapi.ctrackonline.co.za/DCTTPIEngine/TPIEngine/REST/Vehicles/${this.$store.state.user.SessionToken}/GetLastVehiclePositions?svehicleNodeIds=${id}`,
          method: 'get'
        }),
      });

      if(c_vehicles.ok){
        let response = await c_vehicles.json();
       
        if(response.ErrorCode > 0){
      //     this.$store.state.user = false;
      // localStorage.removeItem("user");
      // this.$router.push({name:'Login'}) 
        }
this.markers=[];
       let vehicles = response.LastVehiclePositions;
       for(var i=0;i<vehicles.length;i++){
         this.markers.push(
           {
          position: {
            lat: vehicles[i].Latitude, lng: vehicles[i].Longitude
          },
        }
         );
this.center = {lat: vehicles[i].Latitude, lng: vehicles[i].Longitude};
       }
      }
    },

    selectTrip(event){
      this.paths = [];
      this.tripMarkers = [];
      var trip = this.trips[event.target.value];
          this.paths.push(
             { lat: trip.StartLatitude, lng: trip.StartLongitude }
           );
            this.paths.push(
             { lat: trip.EndLatitude, lng: trip.EndLongitude }
           );


                 this.tripMarkers.push(
           {
             location:trip.StartLocation,
             opened:true,
             time:trip.TripStartUTC,
          position: { lat: trip.StartLatitude, lng: trip.StartLongitude },
        }
         );

               this.tripMarkers.push(
           {
             location:trip.EndLocation,opened:true,
             time:trip.TripEndUTC,
          position: { lat: trip.EndLatitude, lng: trip.EndLongitude },
        }
         );

           this.center = {lat: trip.EndLatitude, lng: trip.EndLongitude};
    },
          async setVehicleTripDetail(selectedVehicle){

var date = new Date();
date.setDate(date.getDate() - 5); 
var fromDateTimeUTC = date.toISOString();
var toDateTimeUTC = (new Date()).toISOString();

        this.selectedVehicle = selectedVehicle;
        var id = selectedVehicle.NodeId;
           var c_vehicles = await fetch("http://ctrack.echohive.net/ctrack.php", {
        method: "post",
        body: JSON.stringify({

          url:`https://tstapi.ctrackonline.co.za/DCTTPIEngine/TPIEngine/REST/Vehicles/${this.$store.state.user.SessionToken}/GetVehicleTripsDetailed?vehicleNodeId=${id}&fromDateTimeUTC=${fromDateTimeUTC}&toDateTimeUTC=${toDateTimeUTC}`,
          method: 'get'
        }),
      });

      if(c_vehicles.ok){
        let response = await c_vehicles.json();
       
        if(response.ErrorCode > 0){
      //     this.$store.state.user = false;
      // localStorage.removeItem("user");
      // this.$router.push({name:'Login'}) 
        }
this.paths = [];   this.tripMarkers = [];
       let vehicles = response.VehicleTripsDetailed;
       for(var i=1;i<vehicles.length;i++){
         if(i==1){
           this.paths.push(
             { lat: vehicles[i].StartLatitude, lng: vehicles[i].StartLongitude }
           );
            this.paths.push(
             { lat: vehicles[i].EndLatitude, lng: vehicles[i].EndLongitude }
           );
  this.center = {lat: vehicles[i].EndLatitude, lng: vehicles[i].EndLongitude};



      this.tripMarkers.push(
           {
             location:vehicles[i].StartLocation,opened:true,
             time:vehicles[i].TripStartUTC,
          position: { lat: vehicles[i].StartLatitude, lng: vehicles[i].StartLongitude },
        }
         );

               this.tripMarkers.push(
           {
             location:vehicles[i].EndLocation,opened:true,
             time:vehicles[i].TripEndUTC,
          position: { lat: vehicles[i].EndLatitude, lng: vehicles[i].EndLongitude },
        }
         );

         }
         this.trips.push(vehicles[i]);
         


//          this.markers.push(
//            {
//           position: {
//             lat: vehicles[i].Latitude, lng: vehicles[i].Longitude
//           },
//         }
//          );
       }
      }
      // this.center=  {lat: 25.774, lng: -80.19};
    },
    async getVehicles(){
      console.log("text")
           var c_vehicles = await fetch("http://ctrack.echohive.net/ctrack.php", {
        method: "post",
        body: JSON.stringify({
          url:`https://tstapi.ctrackonline.co.za/DCTTPIEngine/TPIEngine/REST/Vehicles/${this.$store.state.user.SessionToken}/GetVehicles`,
          method: 'get'
        }),
      });

      if(c_vehicles.ok){
        let response = await c_vehicles.json();
       
        if(response.ErrorCode > 0){
          this.$store.state.user = false;
      localStorage.removeItem("user");
      this.$router.push({name:'Login'}) 
        }

       let vehicles = response.VehicleList;
       for(var i=0;i<vehicles.length;i++){
         this.vehicles.push(vehicles[i]);

       }

       this.loaded=true;
        // if(response.ErrorCode == 0){
        
        // } else {
        
        // }
      }
    },
    setPageNumber(num){
      this.pageNumber = num;
    }
  },
    created(){
    this.getVehicles();
  },
  components: {
    // VsudAvatar,
    // VsudBadge,
  },
  computed:{
    filteredVehicles:function(){
      var vehicles = JSON.parse(JSON.stringify(this.vehicles));

      if(this.search != ""){
        vehicles = vehicles.filter((v)=>{
          return(
            v.VehicleRegistration.toString().toLowerCase().indexOf(this.search) >= 0 ||
            v.NodeId.toString().toLowerCase().indexOf(this.search) >= 0 ||
            v.Type.toString().toLowerCase().indexOf(this.search) >= 0 
          )
        });
        
      }

      var start = (this.pageNumber-1)*this.pageLimit;
      var end = start + this.pageLimit;
      end = end<=vehicles.length?end:vehicles.length;
      return vehicles.slice(start,end);
    }
  }
};
</script>

<style scoped>
.table thead th {
    padding: 0.5rem 0.5rem;
}
</style>