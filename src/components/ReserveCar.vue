<template>
    <div>
        <NavBar/>
        <div class="container"> 
        <b-card no-body class="overflow-hidden shadow mb-3 mt-3 mx-3" header-bg-variant="warning">
          <template v-slot:header>
            <h2 class="sm-0 text-center"> {{item.car.carBrand.name}}  {{item.car.carModel.name}} </h2>
          </template>
        </b-card>
        </div>
        <div class="container">
          <!-- prvi red-->
          <b-row class="px-3 mb-3">
            <!--leva kolona - slike-->          
            <b-col class="mx-2">
             <!-- <b-card-img :src="require('@/assets/audi_a8.jpeg')" alt="Image"  class="rounded-0 "></b-card-img>-->
             <b-carousel ref="myCarousel" v-model="currentImage" controls indicators interval="4000" class="mt-3 carousel-custom shadow" >
                <b-carousel-slide  v-for="img in images" :key="img" :img-src="img"></b-carousel-slide>
             </b-carousel>
            </b-col>
            
            <!--desna kolona - informacije-->
            <b-col >
              <b-card-body>
                <b-card-text>                
                  <b-row >
                    <b-col class="col-12">
                        <b> Available from: </b> {{item.startDate}} <b> to </b> {{item.endDate}}
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col class="col-12">
                      <b> Rating:  </b> {{item.car.rate}}
                      <b-icon icon="star-fill"></b-icon> 
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col class="col-12">
                        <b>Location:</b> {{item.location}} 
                    </b-col>
                  </b-row>
                  <b-row class="mt-3"> 
                    <b-col class="col-6">
                        <b>Car class:</b> {{item.car.carClass}}
                    </b-col>
                    <b-col class="col-6">
                        <b>Children seats:</b> {{item.car.childrenSeats}}
                    </b-col>
                  </b-row>   
                  <b-row class="mt-3">
                    <b-col class="col-6">
                        <b>Mileage:</b> {{item.car.mileage}} <b>km</b>
                    </b-col>
                    <b-col class="col-6">
                        <b>Km limit:</b> {{item.limitKm}}
                    </b-col>
                  </b-row>                        
                  <b-row class="mt-3">  
                    <b-col class="col-6">
                        <b>Fuel type:</b> {{item.car.fuelType}}
                    </b-col>
                    <b-col class="col-6">
                        <b>Transmission:</b> {{item.car.transType}}
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col class="col-6">
                        <b>Price per day:</b> {{item.priceList.pricePerDay}} <b>€</b>
                    </b-col>
                    <b-col class="col-6">
                        <b>Price per km:</b> {{item.priceList.pricePerKm}} <b>€</b>
                    </b-col>                   
                  </b-row>  
                  <b-row class="mt-3">  
                    <b-col class="col-6">
                        <b>Disscount over <b> 20 </b> days:</b> {{item.priceList.discount20Days}} <b>%</b> 
                    </b-col>
                    <b-col class="col-6">
                        <b> Disscount over <b> 30 </b> days:</b>  {{item.priceList.discount30Days}} <b>%</b>
                    </b-col>              
                  </b-row>                
                  <b-row class="mt-3">
                    <b-col class="col-6">
                        <b>Android app present:</b> {{ item.car.hasAndroidApp == true ? 'Yes' : 'No' }}
                    </b-col>
                    <b-col class="col-6">
                        <b>Collision Damage Waiver:</b> {{ item.cdw == true ? 'Yes' : 'No' }}
                    </b-col>
                  </b-row>               
                </b-card-text>       
              </b-card-body>
            </b-col>
          </b-row>
        
        
          <!-- drugi red -->
          <b-row>
            <!-- leva kolona - komentari-->
            <b-col class="col-6"> 
              <b-card id="comments-card" v-b-toggle.collapse-1  no-body class="overflow-hidden shadow mb-4  ml-4 mr-4" header-bg-variant="warning">
                <template v-slot:header>
                  <h2 class="sm-0 text-center">Show Comments </h2>
                </template>
              </b-card>
              <b-collapse id="collapse-1" class="mx-4 my-2">
                <b-card >
                <div v-for="comment in comments" :key="comment.id"> 
                  <b-form-group  align="left" :label="comment.user" label-for="comment">
                    <b-form-textarea id="comment"  type="text" disabled :placeholder="comment.text"></b-form-textarea>
                  </b-form-group>       
                 <!-- <b-form-group :v-show="!comment.isReplayed">
                    <b-form-textarea class="mx-4 my-2"  placeholder="Replay"> </b-form-textarea>
                  </b-form-group>  -->                                             
                </div>
                </b-card>
              </b-collapse>                     
            </b-col>
            <!--desna kolona - rezervacija-->
            <b-col class="col-6">
               <b-card id="reserve-card" v-b-toggle.collapse-2  no-body class="overflow-hidden shadow mb-4  ml-4 mr-4" header-bg-variant="warning">
                <template v-slot:header>
                  <h2 class="sm-0 text-center">Reserve Car </h2>
                </template>
              </b-card>
              <b-collapse id="collapse-2" class="mx-4 my-2">
                <b-card >
                    <b-form @submit.prevent="reserve">         
                        <b-row class="text-center" >
                          <b-col>
                            <h3> <b> Reserve car </b> </h3>
                          </b-col>
                        </b-row>
                        
                        <b-row >
                          <b-col>
                          <b-form-group  align="left" label="Name:" label-for="name">
                            <b-form-input class="col-12" id="name" v-model="name" type="text" required placeholder="Enter name"></b-form-input>
                          </b-form-group>
                          </b-col>
                          <b-col>
                          <b-form-group  align="left" label="Last name:" label-for="userLastname">
                            <b-form-input class="col-12" id="userLastname" v-model="userLastname" type="text" required placeholder="Enter lastname"></b-form-input>
                          </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row >
                          <b-col>
                          <b-form-group  align="left" label="Email:" label-for="email">
                            <b-form-input class="col-12" id="email" v-model="email" type="email" required placeholder="Enter email"></b-form-input>
                          </b-form-group>
                          </b-col>
                          <b-col>
                          <b-form-group  align="left" label="Phone number:" label-for="phoneNumber">
                            <b-form-input class="col-12" id="phoneNumber" v-model="phoneNumber" type="number" required placeholder="Enter phone number"></b-form-input>
                          </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row >
                          <b-col>
                            <b-form-group  align="left" label="Start date:" label-for="startDate">
                              <b-form-datepicker :min="minDate" v-model="startDate" locale="en" placeholder="Start date"></b-form-datepicker>
                            </b-form-group>         
                          </b-col>
                          <b-col>
                            <b-form-group  align="left" label="End date:" label-for="endDate" > 
                              <b-form-datepicker :min="minDate" :max="maxDate" v-model="endDate" locale="en" placeholder="End date"></b-form-datepicker>
                            </b-form-group>
                          </b-col>
                        </b-row>                    
                        <hr>
                  <b-row>       
                    <b-button type="submit" :disabled="!formIsValid" class=" ml-auto mr-3 mb-0" title=" You need to select date" >Reserve</b-button>
                  </b-row>
                    </b-form>
                </b-card>
              </b-collapse>                             
            </b-col>
          </b-row>
        </div>
        
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue";
import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export default {
    name: 'ReserveCar',
    components: {
        NavBar
    },
    data() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const minD = new Date(today);
      return {      
        item: [],
        images: [
        "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg",
        "https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914",
        "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg",
        
        ],
      currentImage: 0,
        comments: [
            {
                id: "1",
                user: "User1",
                text: "This car sucks!!!!!",
                isReplayed: true
            },
            {
                id: "2",
                user: "User2",
                text: "The best car ever",
                isReplayed: false
            }
        ],
        name: "",
        userLastname: "",
        email: "",
        phoneNumber: null,
        startDate: null,
        endDate: null,
        minDate: minD,
        maxDate: null,
        }
        
    },
    created() {
        var id = this.$route.fullPath;
        id = id.split('?')[1];
        id = id.split('=')[1];
        
        axios.get(baseUrl + "/ads/"+id).then(
            response=> {
                this.item = response.data;
            }
        )
              
    },
    methods: {
      
      reserve() {
          
      },
      prev() {
        this.currentImage = this.images.length - 1;
        this.$refs.imageCarousel.setSlide(this.images.length - 1);
      },
      next() {
        this.currentImage = this.images.length + 1;
        this.$refs.imageCarousel.setSlide(this.images.length + 1);
      }
  
    },
    computed:{
      formIsValid: function()
      {
          if(this.startDate!=null && this.endDate!=null  && this.startDate <= this.endDate)
          {
            return true;
          }
          else return false;
      }
    }

}
</script>

<style scoped>

#comments-card{
    cursor: grab;
}
#reserve-card{
    cursor: grab;
}
.container{
  width: 150em;
}

</style>