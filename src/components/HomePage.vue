<template>
   <div > 
     <NavBar />
       
  <div class="div-search">
    <b-nav vertical >
      <b-card class="shadow" id="card" no-body  bg-variant="light" text-variant="dark" header-text-variant="dark" align="center" header-bg-variant="light" header="Find a car for you" >
       <b-card-text class="div-filter-card">
          <b-form @submit.prevent="search1">
          <b-form-group  align="left" id="input-group-1" label="Location:" label-for="location">
           <b-form-input id="location" v-model="location" type="text" required placeholder="Enter location"></b-form-input>
         </b-form-group>
         <b-form-group  align="left" id="input-group-2" label="Start date: (it has to be 48h from now)" label-for="startDate">
              <b-form-datepicker :min="minDate" v-model="startDate" locale="en" placeholder="Start date"></b-form-datepicker>
         </b-form-group>   
         <b-form-group  align="left" id="input-group-3" label="End date:" label-for="endDate" > 
            <b-form-datepicker :min="minDate" :max="maxDate" v-model="endDate" locale="en" placeholder="End date"></b-form-datepicker>
         </b-form-group>
         <b-button v-b-tooltip.hover title=" You need to fill form fields" type="submit" pill :disabled="!formIsValid">Search</b-button>
         <p v-if="showError"  class="p-error">Error</p>
        </b-form>
        </b-card-text>
      </b-card>
    </b-nav>
  </div>

 <div class="div-filter">
    <div >
     <b-card class="shadow" id="card" no-body  bg-variant="light" header-bg-variant="light" header-text-variant="dark" text-variant="dark" header="Advanced search">
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
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Child Seats:" label-for="childSeats">
              <b-form-input :min="0" :max="4" id="childSeats" size="sm" type="number" placeholder="Choose number" v-model="childSeats" ></b-form-input>
           </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="6" label-size="sm" label="Mileage:" label-for="mileage">
            <b-form-input id="mileage" :min="0" type="number" placeholder="Choose number" size="sm" v-model="mileage"></b-form-input>
           </b-form-group>
        </div>
        
    </div> 
    <div class="containter mx-2 row">
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Gearshift type:" label-for="gearshiftType">
            <b-form-select id="gearshiftType" v-model="gearshift" :options="gearshifts">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select gearshift type</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
          <div class="containter mx-2 row">
            <div class="col"> 
                <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label="Price:" label-for="minPrice">
                  <b-form-input :min="0"  type="number" id="minPrice" size="sm" placeholder="Min" v-model="minPrice"></b-form-input>
                </b-form-group>
            </div>
            <div class="col"> 
              <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label="Price:" label-for="maxPrice">
                  <b-form-input :min="0" type="number" id="maxPrice" size="sm" placeholder="Max" v-model="maxPrice"></b-form-input>
                </b-form-group>
            </div>
          </div>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="6" label-size="sm" label="Planned mileage:" label-for="plannedMileage">
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
      <div class="col"> 
        <b-button pill type="submit" style="margin-left: 20em; width:20em" > Advanced search </b-button>
      </div>
    </div>
   
    </b-card-text>
      </b-form>
  </b-card>
  </div>

  <div class="div-resault" v-if="showCars"> 
     <div v-for="item in items" :key="item"> 
       <b-card  class="shadow" img-src="https://www.strongcar.rs/pub/catalog/crop/skoda-superb-rent-a-car.jpg" 
       alt="Card image" img-height="200px" img-width="250px" img-left  style="background-color:azure">
      <b-card-text>
        Information about the car.
      </b-card-text>
    </b-card>
     </div>
  </div>

  </div>
  
</div>

</template>


<script>

import NavBar from "../components/NavBar.vue";
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
            items: [{}],
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
            CDWProtection: "false"
        }
    },
    methods: {
      search1: function()
      {
        this.showCars = true;
      },
      search2: function()
      {
        this.showCars = true;
      }
    },
    computed:{
      formIsValid: function()
      {
          if(this.startDate!=null && this.endDate!=null)
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
/*#base-div{
  background-image: url('../assets/img3.jpg');
  background-attachment: scroll;
  background-size: cover;
  height:100vh;
}*/

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
  }
  
  .div-filter-card{
    padding-top: 1em;
  }

  #card{
    padding: 1em;
  }
    
</style>