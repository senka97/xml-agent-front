<template>
    <div>
        <NavBar/>
        <div > 
        <b-card no-body class="overflow-hidden shadow mb-1 mt-3 mx-5" header-bg-variant="warning">
          <template v-slot:header>
            <h2 class="sm-0 text-center"> {{item.car.carBrand.name}}  {{item.car.carModel.name}} </h2>
          </template>
        </b-card>
        </div>
        <div >
          <!-- prvi red-->
          <b-row class="mb-3 mx-5">
            <!--leva kolona - slike-->          
            <b-col >
            <!-- <b-card-img :src="require('@/assets/audi_a8.jpeg')" alt="Image"  class="rounded-0 "></b-card-img>-->
             <b-carousel ref="myCarousel" v-model="currentImage" controls indicators  class="mt-3 mr-5 carousel-custom shadow" >
                <b-carousel-slide  v-for="img in item.car.photos64" :key="img" :img-src="img"></b-carousel-slide>
             </b-carousel>
            </b-col>
            
            <!--desna kolona - informacije-->
            <b-col >
              <b-card-body class= "mt-5 ml-5">
                <b-card-text>                
                  <b-row >
                    <b-col class="col-12">
                        <b> Available from: </b> {{format_date(item.startDate)}} <b> to </b> {{format_date(item.endDate)}}
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
              <b-card id="comments-card" v-b-toggle.collapse-1  no-body class="overflow-hidden shadow mb-3 ml-5 mr-5" header-bg-variant="warning">
                <template v-slot:header>
                  <h2 class="sm-0 text-center">Show Comments </h2>
                </template>
              </b-card>
              <b-collapse id="collapse-1" class="mx-5 my-2">
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
               <b-card id="reserve-card" v-b-toggle.collapse-2  no-body class="overflow-hidden shadow mb-3  ml-5 mr-5" header-bg-variant="warning">
                <template v-slot:header>
                  <h2 class="sm-0 text-center">Reserve Car </h2>
                </template>
              </b-card>
              <b-collapse id="collapse-2" class="mx-5 my-3">
                <b-card >
                  <validation-observer ref="observer" v-slot="{ handleSubmit }">
                    <b-form @submit.prevent="handleSubmit(reserve)">         
                        <b-row class="text-center" >
                          <b-col>
                            <h3> <b> User information </b> </h3>
                          </b-col>
                        </b-row>
                        
                        <b-row >
                          <b-col>
                            <validation-provider name="First name" :rules="{ required: true,alpha_spaces: true, min: 2, max: 20 }" v-slot="validationContext">
                              <b-form-group  align="left" label="Name:" label-for="name">
                                <b-form-input class="col-12" id="name" v-model="name" type="text" placeholder="Enter name" :state="getValidationState(validationContext)"></b-form-input>
                                <b-form-invalid-feedback id="name">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                          </b-col>
                          <b-col>
                            <validation-provider name="Last name" :rules="{ required: true, alpha_spaces: true, min: 2, max: 20 }" v-slot="validationContext" >
                              <b-form-group  align="left" label="Last name:" label-for="userLastname">
                                <b-form-input class="col-12" id="userLastname" v-model="userLastname" type="text" placeholder="Enter lastname" :state="getValidationState(validationContext)"></b-form-input>
                                <b-form-invalid-feedback id="userLastname">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                          </b-col>
                        </b-row>
                        <b-row >
                          <b-col>
                            <validation-provider name="Email" rules="required|email" v-slot="validationContext" >
                              <b-form-group  align="left" label="Email:" label-for="email">
                                <b-form-input class="col-12" id="email" v-model="email" type="email" placeholder="Enter email" :state="getValidationState(validationContext)"></b-form-input>
                                <b-form-invalid-feedback id="email">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                          </b-col>
                          <b-col>
                            <validation-provider name="Phone number" :rules="{required: true, numeric: true, min: 9, max: 11}" v-slot="validationContext" >
                              <b-form-group  align="left" label="Phone number:" label-for="phoneNumber" > 
                                <b-form-input class="col-12" id="phoneNumber" v-model="phoneNumber" type="number" placeholder="Enter phone number" :state="getValidationState(validationContext)"></b-form-input>
                                <b-form-invalid-feedback id="phoneNumber">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                              </b-form-group>
                            </validation-provider>
                           </b-col>
                        </b-row>
                        <b-row >
                          <b-col>                           
                            <b-form-group  align="left" label="Start date:" label-for="startDate">
                              <b-form-datepicker :min="minDate" :max="maxDate" id="startDate" v-model="startDate" locale="en" placeholder="Start date"></b-form-datepicker>                            
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
                  </validation-observer>
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
import moment from 'moment'

const baseUrl = "http://localhost:8080/api";

export default {
    name: 'ReserveCar',
    components: {
        NavBar
    },
    data() {
          
      return {      
        item: {
          priceList: [],
          car: {
            carBrand: [],
            carModel: []
          }
        },
        images: [
        "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg",
        "https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914",
        ],
      currentImage: 0,
        comments: [],
        name: "",
        userLastname: "",
        email: "",
        phoneNumber: null,
        startDate: null,
        endDate: null,
        minDate: null,
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
                
                var x = new Date(this.item.endDate[0], this.item.endDate[1]-1, this.item.endDate[2]);
                var maxD = new Date(x);
                this.maxDate = maxD;

                var y = new Date(this.item.startDate[0], this.item.startDate[1]-1, this.item.startDate[2]);
                var minD = new Date(y);
                this.minDate = minD;

                // za sada moze da se rezervise u proslosti, ako je pocetni datum manji od danasnjeg datuma jer ovo ne radi

               /* var now = new Date();
                var z = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                var today = new Date(z);

                if(moment(today).format("DD-MMM-YYYY") > moment(minD).format("DD-MMM-YYYY"))
                {
                  this.minDate = today;
                  console.log("today je vece");
                  console.log("min date: " + minD);
                  console.log("today date: "+ today);
                }
                else
                {
                  this.minDate = minD;
                  console.log(this.minDate)
                }*/              
            }
        );
        axios.get(baseUrl+'/ad/'+id+'/car/comments')
          .then(response => {
            this.comments = response.data;
        });          
    },
    methods: {
      
      reserve() {
        axios.post(baseUrl+'/reservations',{
                startDate: this.startDate,
                endDate: this.endDate,
                clientFirstName: this.name,
                clientLastName: this.userLastname,
                clientPhoneNumber:this.phoneNumber,
                clientEmail: this.email,
                adId: this.item.id
            })
           .then(() => {
                 this.$bvToast.toast('Car reserved from '+ this.startDate + ' to '+ this.endDate, {
                title: 'Reservation Successful',
                variant: 'success',
                solid: true
                });                        
          })
          .catch(error => {
          if (error.response && error.response.status === 400) {
              this.$bvToast.toast(error.response.data, {
                title: 'Bad Request',
                variant: 'danger',
                solid: true
                });
          }
          else if(error.response && error.response.status === 417)
          {
              this.$bvToast.toast(error.response.data, {
                title: 'Reservation failed',
                variant: 'danger',
                solid: true
                });
          }
          
          });
      },
      prev() {
        this.currentImage = this.images.length - 1;
        this.$refs.imageCarousel.setSlide(this.images.length - 1);
      },
      next() {
        this.currentImage = this.images.length + 1;
        this.$refs.imageCarousel.setSlide(this.images.length + 1);
      },
      format_date(value){
         if (value) {
           return moment(String(value)).format("DD-MMM-YYYY")
          }
      },
      getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
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
      },
      
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