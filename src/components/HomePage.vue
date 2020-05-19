<template>
   <div > 
     <NavBar />
  <b-jumbotron header="Find convenient car" bg-variant="warning">  
  </b-jumbotron>

  <div class="div-search">
    <b-nav vertical >
      <b-card class="mb-4"  id="card" no-body  bg-variant="light" text-variant="dark" header-text-variant="dark" align="center" header-bg-variant="light" header="Find a car for you" >
       <b-card-text class="div-filter-card">
          <b-form @submit.prevent="search1">
          <b-form-group  align="left" id="input-group-1" label="Location:" label-for="location">
           <b-form-input class="col-12" id="location" v-model="location" type="text" required placeholder="Enter location"></b-form-input>
         </b-form-group>
         <b-form-group  align="left" id="input-group-2" label="Start date: (it has to be 48h from now)" label-for="startDate">
              <b-form-datepicker :min="minDate" v-model="startDate" locale="en" placeholder="Start date"></b-form-datepicker>
         </b-form-group>   
         <b-form-group  align="left" id="input-group-3" label="End date:" label-for="endDate" > 
            <b-form-datepicker :min="minDate" :max="maxDate" v-model="endDate" locale="en" placeholder="End date"></b-form-datepicker>
         </b-form-group>
         <b-button block pill  variant="outline-secondary" v-b-toggle.collapse-1 > More details </b-button>
         <b-button v-b-tooltip.hover title=" You need to select date" block type="submit" pill :disabled="!formIsValid">Search</b-button>
         <p v-if="showError"   class="p-error">Error</p>
        </b-form>
        </b-card-text>
      </b-card>
    </b-nav>
  </div>

 <div class="div-filter">
   <b-collapse id="collapse-1" >
     <b-card  id="card" no-body bg-variant="light" text-variant="dark" >
        <b-form @submit.prevent="search2">
    <b-card-text class="div-filter-card">
      <div class="containter mx-2 row">
        <div class="col">
          <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Car brand:" label-for="carBrand">
            <b-form-select id="carBrand" v-model="brand" :options="brands">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select brand</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Car model:" label-for="carModel">
            <b-form-select id="carModel" v-model="model" :options="models">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select model</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Car class:" label-for="carClass">
            <b-form-select id="carClass" v-model="cclass" :options="classes">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select class</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        
    </div>
    <div class="containter mx-2 row">
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Type of fuel:" label-for="carFuelType">
            <b-form-select id="carFuelType" v-model="fuelType" :options="fuelTypes">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select fuel type</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Children Seats:" label-for="childSeats">
              <b-form-input :min="0" :max="4" id="childSeats" size="sm" type="number" placeholder="Choose number" v-model="childSeats" ></b-form-input>
           </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Mileage:" label-for="mileage">
            <b-form-input id="mileage" :min="0" type="number" placeholder="Choose number" size="sm" v-model="mileage"></b-form-input>
           </b-form-group>
        </div>
        
    </div> 
    <div class="containter mx-2 row">
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Transmission type:" label-for="transmissionType">
            <b-form-select id="transmissionType" v-model="gearshift" :options="gearshifts">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select transmission type</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
          <div class="row">
            <div class="col"> 
                <b-form-group label-cols="4" label-size="sm" label="Price:" label-for="minPrice">
                  <b-form-input :min="0"  type="number" id="minPrice" size="sm" placeholder="Min" v-model="minPrice"></b-form-input>
                </b-form-group>
            </div>
            <div class="col"> 
              <b-form-group label-cols="4" label-size="sm" label="Price:" label-for="maxPrice">
                  <b-form-input :min="0" type="number" id="maxPrice" size="sm" placeholder="Max" v-model="maxPrice"></b-form-input>
                </b-form-group>
            </div>
          </div>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Planned mileage:" label-for="plannedMileage">
            <b-form-input id="plannedMileage" :min="0" type="number" placeholder="Unlimited" size="sm" v-model="plannedMileage"></b-form-input>
           </b-form-group>
        </div>
    </div> 
    <div class="containter mx-2 row">
      <div class="col">
          <b-form-group class="mt-custom">
              <b-form-checkbox  id="checkbox-1" size="sm" v-model="CDWProtection"  value="true" unchecked-value="false"> Collision Damage Waiver Protection </b-form-checkbox>
          </b-form-group> 
      </div>
    </div>
    </b-card-text>
  </b-form>
  </b-card>
</b-collapse>

  <div class="div-resault" v-if="showCars"> 
    <div class="container d-flex mt-1">
       <b-form-select v-model="sortSelected" :options="sortingOptions" class="col-2 ml-auto mr-custom">
          <template v-slot:first>
              <b-form-select-option :value="null">Sort By</b-form-select-option>
          </template>
      </b-form-select>  
    </div>

    <div v-for="item in items" :key="item.id"> 
       <b-card no-body class="overflow-hidden shadow mb-4 mt-2" header-bg-variant="warning">
          <template v-slot:header>
            <h2 class="sm-0 text-center"> {{item.car.carBrand.name}}  {{item.car.carModel.name}} </h2>
          </template>
          <b-row no-gutters>
            <b-col >
              <b-card-img :src="item.car.photos64[0]"  alt="Image" class="rounded-0 mt-2 mb-2 ml-2 "> </b-card-img>
            </b-col>
            <b-col >
              <b-card-body>
                <b-card-text>
                  <b-row class="mt-1">
                    <b-col>
                        <b> Available from: </b> {{format_date(item.startDate)}} <b> to </b> {{format_date(item.endDate)}}
                    </b-col>
                  </b-row>
                  <b-row class="mt-3"> 
                    <b-col>
                        <b> Rating: </b> {{item.car.rate}}
                       <b-icon icon="star-fill"></b-icon>                       
                  </b-col>
                  <b-col>
                        <b>Price per day:</b> {{item.priceList.pricePerDay}} <b> € </b>
                    </b-col>
                  </b-row>   
                <b-row class="mt-3">
                <b-col>
                  <b>Fuel type:</b> {{item.car.fuelType}}
                </b-col>
                <b-col>
                  <b>Car class:</b> {{item.car.carClass}}
                </b-col>
              </b-row>       
              <b-row class="mt-3">
                  <b-col>
                    <b>Transmission:</b> {{item.car.transType}}
                  </b-col>
                  <b-col>
                    <b>Children seats:</b> {{item.car.childrenSeats}}
                  </b-col>
              </b-row> 
              <b-row class="mt-3">
                  <b-col>
                    <b>Mileage:</b> {{item.car.mileage}} <b>km</b>
                  </b-col>
                  <b-col>
                    <b>Km limit:</b> {{item.limitKm}}
                  </b-col>
              </b-row>     
              <b-row class="mt-3">
                  <b-col >
                    <b>Location:</b> {{item.location}} 
                  </b-col>
                  <b-col>
                    <b>Collision Damage Waiver: </b> {{ item.cdw == true ? 'Yes' : 'No' }}
                  </b-col>
              </b-row>  
               <hr>
              <b-row>       
                <b-button class="ml-auto mr-3" @click="details(item.id)">Details</b-button>
              </b-row>   
          </b-card-text>       
        </b-card-body>
        
      </b-col>
    </b-row>
  </b-card>
     </div>
  </div>

  </div>
  
</div>

</template>


<script>

import NavBar from "../components/NavBar.vue";
import axios from "axios";
import moment from 'moment';
const baseUrl = "http://localhost:8080/api";

export default {
    name: "HomePage",
    components: {
       NavBar,
    },
    data() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+2);
      const minD = new Date(today);
      

      return {
            minDate: minD,
            maxDate: null,
            location: "",
            startDate: null,
            endDate: null,
            showError: false,
            showCars: false,
            brand: null,
            brands:[
                { value: 1, text: "BMW"},
                { value: 1, text: "Audi"},
                { value: 3, text: "Mercedes"},
                { value: 4, text: "Tesla"},
                { value: 5, text: "Opel"},
                { value: 6, text: "Alfa Romeo"},
                { value: 7, text: "Chevrolet"},
                { value: 8, text: "Ferrari"},
                { value: 9, text: "Fiat"},
                { value: 10, text: "Ford"},
                { value: 11, text: "Hyundai"},
                { value: 12, text: "Peugeot"},
                { value: 13, text: "Toyota"},      
            ],
            model: null,
            models:[
                { value: 1, text: "BMW"},
                { value: 1, text: "Audi"},
                { value: 3, text: "Mercedes"},
                { value: 4, text: "Tesla"},
                { value: 5, text: "Opel"},
                { value: 6, text: "Alfa Romeo"},
                { value: 7, text: "Chevrolet"},
                { value: 8, text: "Ferrari"},
                { value: 9, text: "Fiat"},
                { value: 10, text: "Ford"},
                { value: 11, text: "Hyundai"},
                { value: 12, text: "Peugeot"},
                { value: 13, text: "Toyota"},
            ],
            fuelType: null,
            fuelTypes:[
                { value: 1, text: "Petrol"},
                { value: 1, text: "Gas"},
                { value: 3, text: "Diesel"},
                { value: 4, text: "Hybrid"},
                { value: 5, text: "Electric"},
            ],
            gearshift: null,
           gearshifts:[
                { value: 1, text: "Manuel"},
                { value: 1, text: "Automatic"},
                { value: 3, text: "Semi-Automatic"},
            ],
            cclass: null,
            classes: [
              { value: 1, text: "SUV"},
              { value: 2, text: "Old Timer"},
              { value: 3, text: "Saloon"},
              { value: 4, text: "Sports Car"},     
              { value: 5, text: "Station Vagon"},
              { value: 5, text: "Van"},
              { value: 6, text: "Coupe"},       
            ],
            minPrice: null,
            maxPrice: null,
            childSeats: null,
            mileage: null,
            plannedMileage: null,
            CDWProtection: "false",
            sortSelected: null,
        sortingOptions: [
          { value: 'priceAsc', text: 'Price ascending' },
          { value: 'priceDesc', text: 'Price descendig' },
          { value: 'mileageAsc', text: 'Mileage ascending' },
          { value: 'mileageDesc', text: 'Mileage descending'},
          { value: 'rateAsc', text: 'Rate ascending'},
          { value: 'rateDesc', text: 'Rate descending'},
        ],
        items: [],
        /*{
          id: 1,
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-audi-a8-mmp-1-1573063953.jpeg?crop=0.704xw:1.00xh;0.208xw,0&resize=640:*",
          brand: "Audi",
          model: "A8",
          price: 75,
          fuelType: "Disel",
          vehicletype: "Saloon",
          transmission: "Manual",
          mileage: 15000,
          kilometerLimit: "Unlimited",
          childrenSeats: 0,
          cdw: true,
          rate: 4.5,
          location: "Novi Sad",
          startDate: "05.05.2020.",
          endDate: "05.05.2021."
        },

        {
          id: 2,
          image:
            "https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914",
          brand: "Audi",
          model: "A8",
          price: 75,
          fuelType: "Disel",
          vehicletype: "Saloon",
          transmission: "Manual",
          mileage: 15000,
          kilometerLimit: "Unlimited",
          childrenSeats: 0,
          cdw: true,
          rate: 4.5,
          location: "Novi Sad",
          startDate: "05.05.2020.",
          endDate: "05.05.2021."
        },
        {
          id: 3,
          image:
            "https://www.truck1-rs.com/img/Druga_masina_Automobil_Audi_A8_4_2_TDI_quattro-xxl-1761/1761_4868520394238.jpg",
          brand: "Audi",
          model: "A8",
          price: 75,
          fuelType: "Disel",
          vehicletype: "Saloon",
          transmission: "Manual",
          mileage: 15000,
          kilometerLimit: "Unlimited",
          childrenSeats: 0,
          cdw: true,
          rate: 4.5,
          location: "Novi Sad",
          startDate: "05.05.2020.",
          endDate: "05.05.2021."
        },*/
      
        }
    },
    methods: {
      search1: function()
      {
        axios.get(baseUrl + "/ads").then(response => {
          this.items = response.data;
        });
        this.showCars = true;

      },
      search2: function()
      {
        this.showCars = true;
      },
      details: function(id)
      {
        this.$router.push({ path: 'reserveCar', query: { id: id } });
      },
      format_date(value){
         if (value) {
           return moment(String(value)).format('DD-MMM-YYYY')
          }
      },
    },
    computed:{
      formIsValid: function()
      {
          if(this.startDate!=null && this.endDate!=null && this.startDate <= this.endDate)
          {
            return true;          
          }
          else return false;
      }
    }
  
};
</script>

<style scoped>
.badge-notify{
   background:red;
   position:relative;
   top: -15px;
   left: -15px;
}
  .div-search{
    width:20%;
    float:left;
    
  }
  .div-filter{
    float: left;
    width: 80%;
  }

  .div-resault{
    padding: 1em;
    margin-left: 7em;
    margin-right: 7em;
  }
  
  #card{
    padding: 1em;
  }
  
</style>